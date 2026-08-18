const db = require("../config/db");

function taoMaGiaoDich(phuongthuc) {
  const prefix = phuongthuc === "tienmat" ? "TM" : "GD";
  return `${prefix}${Date.now()}`;
}

async function capNhatTonKhoTheoSanPham(conn, masanpham, soLuongGiam) {
  await conn.query(
    "UPDATE tonkho SET soluongton = GREATEST(soluongton - ?, 0) WHERE masanpham = ?",
    [soLuongGiam, masanpham]
  );
  try {
    await conn.query(
      "UPDATE sanpham SET soluongton = GREATEST(soluongton - ?, 0) WHERE masanpham = ?",
      [soLuongGiam, masanpham]
    );
  } catch (e) {}
}


async function coBangLuachon(conn) {
  const [rows] = await conn.query("SHOW TABLES LIKE 'luachon_sanpham'");
  return rows.length > 0;
}

async function coCot(conn, bang, cot) {
  const [rows] = await conn.query(
    `SHOW COLUMNS FROM ${bang} LIKE ?`,
    [cot]
  );
  return rows.length > 0;
}

const OrderController = {
  async index(req, res) {
    try {
      const [rows] = await db.query(
        `SELECT d.*, nd.hoten
         FROM donhang d
         JOIN nguoidung nd ON nd.manguoidung = d.manguoidung
         ORDER BY d.madonhang DESC`
      );
      res.json(rows);
    } catch (error) {
      res.status(500).json({ message: "Khong the lay danh sach don hang.", error: error.message });
    }
  },
  async getByUser(req, res) {
    try {
      const { userId } = req.params;
      const [rows] = await db.query(
        `SELECT d.*
         FROM donhang d
         WHERE d.manguoidung = ?
         ORDER BY d.madonhang DESC`,
         [userId]
      );
      res.json(rows);
    } catch (error) {
      res.status(500).json({ message: "Khong the lay danh sach don hang.", error: error.message });
    }
  },

  async detail(req, res) {
    try {
      const { id } = req.params;
      const [orderRows] = await db.query(
        `SELECT d.*, nd.hoten, nd.email, nd.sodienthoai
         FROM donhang d
         JOIN nguoidung nd ON nd.manguoidung = d.manguoidung
         WHERE d.madonhang = ?`,
        [id]
      );

      if (!orderRows.length) {
        return res.status(404).json({ message: "Khong tim thay don hang." });
      }

      const [rows] = await db.query(
        `SELECT ct.*, p.tensanpham, p.hinhanh, bt.mausac, bt.loai, bt.dungtich
         FROM chitietdonhang ct
         JOIN sanpham p ON p.masanpham = ct.masanpham
         LEFT JOIN luachon_sanpham bt ON bt.maluachon = ct.maluachon
         WHERE ct.madonhang = ?
         ORDER BY ct.machitietdon`,
        [id]
      );

      const [paymentRows] = await db.query(
        "SELECT * FROM thanhtoan WHERE madonhang = ? LIMIT 1",
        [id]
      );

      const [historyRows] = await db.query(
        "SELECT * FROM lichsutrangthaidon WHERE madonhang = ? ORDER BY thoigian",
        [id]
      );

      res.json({
        donhang: orderRows[0],
        chitiet: rows,
        thanhtoan: paymentRows[0] || null,
        lichsu: historyRows
      });
    } catch (error) {
      res.status(500).json({ message: "Khong the lay chi tiet don hang.", error: error.message });
    }
  },

  async create(req, res) {
    const conn = await db.getConnection();

    try {
      const {
        manguoidung,
        tennguoinhan,
        sodienthoainhan,
        diachigiaohang,
        ghichu,
        phuongthuc = "tienmat",
        items = [],
        isDemo = false,
        ma_serial = null
      } = req.body;

      if (!manguoidung || !tennguoinhan || !sodienthoainhan || !diachigiaohang) {
        return res.status(400).json({ message: "Thieu thong tin dat hang." });
      }

      if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "Gio hang khong duoc rong." });
      }

      await conn.beginTransaction();

      // Lấy email người mua
      const [userRows] = await conn.query(
        "SELECT email FROM nguoidung WHERE manguoidung = ? LIMIT 1",
        [manguoidung]
      );
      const userEmail = userRows.length ? userRows[0].email : null;

      const coLuachonTable = await coBangLuachon(conn);
      const coCotLuachon = await coCot(conn, "chitietdonhang", "maluachon");

      const trangthaiThanhToan = (phuongthuc !== "tienmat" && isDemo) ? "dathanhtoan" : "chuathanhtoan";
      const magiaodich = (phuongthuc !== "tienmat" && isDemo) ? taoMaGiaoDich(phuongthuc) : null;

      const coCotGhichu = await coCot(conn, "donhang", "ghichu");
      let orderResult;
      if (coCotGhichu) {
        [orderResult] = await conn.query(
          `INSERT INTO donhang (
            manguoidung, tennguoinhan, sodienthoainhan, diachigiaohang,
            tongtien, trangthaidonhang, trangthaithanhtoan, ghichu
          ) VALUES (?, ?, ?, ?, 0, 'choxacnhan', ?, ?)`,
          [manguoidung, tennguoinhan, sodienthoainhan, diachigiaohang, trangthaiThanhToan, ghichu || null]
        );
      } else {
        [orderResult] = await conn.query(
          `INSERT INTO donhang (
            manguoidung, tennguoinhan, sodienthoainhan, diachigiaohang,
            tongtien, trangthaidonhang, trangthaithanhtoan
          ) VALUES (?, ?, ?, ?, 0, 'choxacnhan', ?)`,
          [manguoidung, tennguoinhan, sodienthoainhan, diachigiaohang, trangthaiThanhToan]
        );
      }

      const madonhang = orderResult.insertId;

      let tongtien = 0;

      for (const item of items) {
        const soLuong = Number(item.soluong || 1);
        if (!soLuong || soLuong < 1) {
          throw new Error("So luong san pham khong hop le.");
        }

        if (coLuachonTable && item.maluachon) {
          const [variantRows] = await conn.query(
            `SELECT bt.*, p.masanpham, p.tensanpham
             FROM luachon_sanpham bt
             JOIN sanpham p ON p.masanpham = bt.masanpham
             WHERE bt.maluachon = ?
             FOR UPDATE`,
            [item.maluachon]
          );

          if (!variantRows.length) {
            throw new Error(`Khong tim thay lua chon ${item.maluachon}.`);
          }

          const luachon = variantRows[0];
          if (luachon.soluongton < soLuong) {
            throw new Error(`Lua chon ${luachon.tensanpham} khong du ton kho.`);
          }

          const donGia = Number(luachon.giaban);
          const thanhTien = donGia * soLuong;
          tongtien += thanhTien;

          const maluachon_value = (coLuachonTable && coCotLuachon && item.maluachon) ? item.maluachon : null;

          if (coCotLuachon) {
            await conn.query(
              `INSERT INTO chitietdonhang (madonhang, masanpham, maluachon, soluong, dongia, thanhtien)
               VALUES (?, ?, ?, ?, ?, ?)`,
              [madonhang, luachon.masanpham, maluachon_value, soLuong, donGia, thanhTien]
            );
          } else {
            await conn.query(
              `INSERT INTO chitietdonhang (madonhang, masanpham, soluong, dongia, thanhtien)
               VALUES (?, ?, ?, ?, ?)`,
              [madonhang, luachon.masanpham, soLuong, donGia, thanhTien]
            );
          }

          if (coLuachonTable && maluachon_value) {
            await conn.query(
              "UPDATE luachon_sanpham SET soluongton = GREATEST(soluongton - ?, 0) WHERE maluachon = ?",
              [soLuong, maluachon_value]
            );
          }
          await capNhatTonKhoTheoSanPham(conn, luachon.masanpham, soLuong);
        } else {
          const [productRows] = await conn.query(
            `SELECT p.*, tk.soluongton
             FROM sanpham p
             LEFT JOIN tonkho tk ON tk.masanpham = p.masanpham
             WHERE p.masanpham = ?
             FOR UPDATE`,
            [item.masanpham]
          );

          if (!productRows.length) {
            throw new Error(`Khong tim thay san pham ${item.masanpham}.`);
          }

          const sanPham = productRows[0];
          const tonHienTai = Number(sanPham.soluongton || 0);
          if (tonHienTai < soLuong) {
            throw new Error(`San pham ${sanPham.tensanpham} khong du ton kho.`);
          }

          const donGia = Number(sanPham.giaban);
          const thanhTien = donGia * soLuong;
          tongtien += thanhTien;

          if (coCotLuachon) {
            await conn.query(
              `INSERT INTO chitietdonhang (madonhang, masanpham, maluachon, soluong, dongia, thanhtien)
               VALUES (?, ?, NULL, ?, ?, ?)`,
              [madonhang, sanPham.masanpham, soLuong, donGia, thanhTien]
            );
          } else {
            await conn.query(
              `INSERT INTO chitietdonhang (madonhang, masanpham, soluong, dongia, thanhtien)
               VALUES (?, ?, ?, ?, ?)`,
              [madonhang, sanPham.masanpham, soLuong, donGia, thanhTien]
            );
          }

          await capNhatTonKhoTheoSanPham(conn, sanPham.masanpham, soLuong);
        }
      }

      // Kiểm tra và áp dụng voucher theo ma_serial hoặc macode
      let giamgia = 0;
      let matched_voucher_nd = null;
      if (ma_serial) {
        const [vRows] = await conn.query(
          `SELECT v.*, vn.mavoucher_nd, vn.sudung
           FROM voucher_nguoidung vn
           JOIN voucher v ON v.mavoucher = vn.mavoucher
           WHERE (vn.ma_serial = ? OR v.macode = ?) AND vn.manguoidung = ? AND vn.sudung = 0
             AND v.trangthai = 'hoatdong' AND v.ngayhethan >= NOW()`,
          [ma_serial, ma_serial, manguoidung]
        );
        if (vRows.length) {
          const voucher = vRows[0];
          matched_voucher_nd = voucher.mavoucher_nd;
          if (Number(voucher.giatri) <= tongtien * 0.5) {
            giamgia = Number(voucher.giatri);
          }
        }
      }

      const tongtienSauGiam = Math.max(0, tongtien - giamgia);

      await conn.query(
        "UPDATE donhang SET tongtien = ?, trangthaithanhtoan = ? WHERE madonhang = ?",
        [tongtienSauGiam, trangthaiThanhToan, madonhang]
      );

      const queryThanhtoan = (trangthaiThanhToan === "dathanhtoan")
        ? `INSERT INTO thanhtoan (madonhang, phuongthuc, magiaodich, sotien, trangthaithanhtoan, ngaythanhtoan) VALUES (?, ?, ?, ?, ?, NOW())`
        : `INSERT INTO thanhtoan (madonhang, phuongthuc, magiaodich, sotien, trangthaithanhtoan, ngaythanhtoan) VALUES (?, ?, ?, ?, ?, NULL)`;

      await conn.query(queryThanhtoan, [madonhang, phuongthuc, magiaodich, tongtienSauGiam, trangthaiThanhToan]);

      if (matched_voucher_nd && giamgia > 0) {
        await conn.query(
          "UPDATE voucher_nguoidung SET sudung = 1, madonhang_sudung = ? WHERE mavoucher_nd = ?",
          [madonhang, matched_voucher_nd]
        );
      }

      await conn.query(
        `INSERT INTO lichsutrangthaidon (madonhang, trangthai, ghichu, thoigian)
         VALUES (?, 'choxacnhan', 'Đơn hàng mới được tạo thành công', NOW())`,
        [madonhang]
      );

      await conn.commit();

      // Gửi email xác nhận đặt hàng thực tế/offline trong nền
      const targetMail = userEmail || req.body.email || process.env.EMAIL_USER;
      if (targetMail) {
        try {
          const { sendOrderConfirmationEmail } = require("../utils/email");
          const orderObj = {
            madonhang,
            tennguoinhan,
            sodienthoainhan,
            diachigiaohang,
            tongtien: tongtienSauGiam,
            ngaydat: new Date()
          };
          sendOrderConfirmationEmail(orderObj, items, targetMail).catch(e => console.error("[OrderEmail Error]", e.message));
        } catch (e) {
          console.error("[OrderEmail Error]", e.message);
        }
      }

      // Tự động kiểm tra và tặng voucher nếu đủ điều kiện chi tiêu
      try {
        const VoucherController = require("./voucher.controller");
        await VoucherController.checkAndGrantAutoVoucher(manguoidung);
      } catch (err) {
        console.error("Lỗi tự động kiểm tra voucher:", err);
      }

      res.status(201).json({
        message: "Tao don hang thanh cong.",
        madonhang,
        tongtien: tongtienSauGiam,
        trangthaithanhtoan: trangthaiThanhToan
      });
    } catch (error) {
      await conn.rollback();
      res.status(400).json({
        message: "Khong the tao don hang.",
        error: error.message
      });
    } finally {
      conn.release();
    }
  },

  async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { trangthaidonhang, lydo_huy } = req.body;

      if (!trangthaidonhang) {
        return res.status(400).json({ message: "Thieu trang thai don hang." });
      }

      const TRANG_THAI_HOP_LE = ["choxacnhan", "cholayhang", "chogiaohhang", "hoanthanh", "trahang", "dahuy"];
      if (!TRANG_THAI_HOP_LE.includes(trangthaidonhang)) {
        return res.status(400).json({
          message: "Trang thai khong hop le. Chi chap nhan: " + TRANG_THAI_HOP_LE.join(", ")
        });
      }

      const [oldOrder] = await db.query("SELECT trangthaidonhang FROM donhang WHERE madonhang = ?", [id]);
      if (!oldOrder.length) {
        return res.status(404).json({ message: "Khong tim thay don hang." });
      }
      const oldTrangThai = oldOrder[0].trangthaidonhang;

      const [result] = await db.query(
        "UPDATE donhang SET trangthaidonhang = ?, lydo_huy = COALESCE(?, lydo_huy) WHERE madonhang = ?",
        [trangthaidonhang, lydo_huy || null, id]
      );

      if ((trangthaidonhang === "dahuy" || trangthaidonhang === "trahang") && oldTrangThai !== "dahuy" && oldTrangThai !== "trahang") {
        const [chitiet] = await db.query("SELECT * FROM chitietdonhang WHERE madonhang = ?", [id]);
        for (const item of chitiet) {
          await db.query("UPDATE tonkho SET soluongton = soluongton + ? WHERE masanpham = ?", [item.soluong, item.masanpham]);
          if (item.maluachon) {
            await db.query("UPDATE luachon_sanpham SET soluongton = soluongton + ? WHERE maluachon = ?", [item.soluong, item.maluachon]);
          }
        }
        await db.query("UPDATE voucher_nguoidung SET sudung = 0, madonhang_sudung = NULL WHERE madonhang_sudung = ?", [id]);
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Khong tim thay don hang." });
      }

      const NHAN_TRANG_THAI = {
        choxacnhan: "Chờ xác nhận",
        cholayhang: "Admin đã xác nhận - chờ lấy hàng",
        chogiaohhang: "Đơn hàng đang được giao",
        hoanthanh: "Giao hàng hoàn thành",
        trahang: "Yêu cầu trả hàng được duyệt",
        dahuy: lydo_huy ? `Hủy bởi quản trị viên: ${lydo_huy}` : "Hủy bởi quản trị viên"
      };

      await db.query(
        `INSERT INTO lichsutrangthaidon (madonhang, trangthai, ghichu, thoigian)
         VALUES (?, ?, ?, NOW())`,
        [id, trangthaidonhang, NHAN_TRANG_THAI[trangthaidonhang] || "Cập nhật từ trang quản trị"]
      );

      res.json({ message: "Da cap nhat trang thai don hang.", affectedRows: result.affectedRows });
    } catch (error) {
      res.status(500).json({ message: "Khong the cap nhat trang thai don hang.", error: error.message });
    }
  },

  // Khách hàng hủy đơn (chỉ được hủy khi đơn còn choxacnhan)
  async cancelOrder(req, res) {
    try {
      const { id } = req.params;
      const { manguoidung, lydo } = req.body;

      const [rows] = await db.query(
        "SELECT * FROM donhang WHERE madonhang = ? AND manguoidung = ?",
        [id, manguoidung]
      );

      if (!rows.length) {
        return res.status(404).json({ message: "Không tìm thấy đơn hàng." });
      }

      const donhang = rows[0];
      if (donhang.trangthaidonhang !== "choxacnhan") {
        return res.status(400).json({
          message: `Không thể hủy đơn ở trạng thái “${donhang.trangthaidonhang}”. Chỉ được hủy khi đơn đang “Chờ xác nhận”.`
        });
      }

      await db.query(
        "UPDATE donhang SET trangthaidonhang = 'dahuy', lydo_huy = ? WHERE madonhang = ?",
        [lydo || "Khách hàng hủy đơn", id]
      );

      // Hoàn lại tồn kho
      const [chitiet] = await db.query(
        "SELECT * FROM chitietdonhang WHERE madonhang = ?",
        [id]
      );
      for (const item of chitiet) {
        await db.query(
          "UPDATE tonkho SET soluongton = soluongton + ? WHERE masanpham = ?",
          [item.soluong, item.masanpham]
        );
        if (item.maluachon) {
          await db.query("UPDATE luachon_sanpham SET soluongton = soluongton + ? WHERE maluachon = ?", [item.soluong, item.maluachon]);
        }
      }

      // Hoàn lại voucher (nếu có sử dụng)
      await db.query(
        "UPDATE voucher_nguoidung SET sudung = 0, madonhang_sudung = NULL WHERE madonhang_sudung = ?",
        [id]
      );

      await db.query(
        `INSERT INTO lichsutrangthaidon (madonhang, trangthai, ghichu, thoigian)
         VALUES (?, 'dahuy', ?, NOW())`,
        [id, lydo || "Khách hàng hủy đơn"]
      );

      res.json({ message: "Hủy đơn hàng thành công." });
    } catch (error) {
      res.status(500).json({ message: "Không thể hủy đơn hàng.", error: error.message });
    }
  },

  // Lấy thông tin đầy đủ cho in hóa đơn
  async getInvoice(req, res) {
    try {
      const { id } = req.params;
      const [orderRows] = await db.query(
        `SELECT d.*, nd.hoten, nd.email, nd.sodienthoai
         FROM donhang d
         JOIN nguoidung nd ON nd.manguoidung = d.manguoidung
         WHERE d.madonhang = ?`, [id]
      );
      if (!orderRows.length) return res.status(404).json({ message: "Không tìm thấy đơn." });

      const [chitiet] = await db.query(
        `SELECT ct.*, p.tensanpham, p.hinhanh, bt.mausac, bt.loai, bt.dungtich
         FROM chitietdonhang ct
         JOIN sanpham p ON p.masanpham = ct.masanpham
         LEFT JOIN luachon_sanpham bt ON bt.maluachon = ct.maluachon
         WHERE ct.madonhang = ?`, [id]
      );

      const [tt] = await db.query("SELECT * FROM thanhtoan WHERE madonhang = ? LIMIT 1", [id]);

      res.json({
        donhang: orderRows[0],
        chitiet,
        thanhtoan: tt[0] || null
      });
    } catch (error) {
      res.status(500).json({ message: "Không thể xuất hóa đơn.", error: error.message });
    }
  },

  // Job tự động duyệt đơn sau 10 phút
  async autoApproveOrders() {
    try {
      const [rows] = await db.query(
        `SELECT madonhang FROM donhang
         WHERE trangthaidonhang = 'choxacnhan'
         AND TIMESTAMPDIFF(MINUTE, ngaydat, NOW()) >= 10`
      );

      for (const don of rows) {
        await db.query(
          "UPDATE donhang SET trangthaidonhang = 'cholayhang' WHERE madonhang = ?",
          [don.madonhang]
        );
        await db.query(
          `INSERT INTO lichsutrangthaidon (madonhang, trangthai, ghichu, thoigian)
           VALUES (?, 'cholayhang', 'Tự động duyệt sau 10 phút', NOW())`,
          [don.madonhang]
        );
      }

      if (rows.length > 0) {
        console.log(`[AutoApprove] Đã tự động duyệt ${rows.length} đơn hàng.`);
      }
    } catch (error) {
      console.error('[AutoApprove] Lỗi:', error.message);
    }
  }
};

module.exports = OrderController;
