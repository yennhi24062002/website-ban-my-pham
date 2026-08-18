const db = require("../config/db");

const ReturnController = {
  // Khách hàng gửi yêu cầu trả hàng
  async createRequest(req, res) {
    try {
      const { madonhang, manguoidung, lydo } = req.body;

      if (!madonhang || !manguoidung || !lydo) {
        return res.status(400).json({ message: "Thiếu thông tin yêu cầu trả hàng." });
      }

      // Kiểm tra đơn hàng phải là "hoanthanh" và thuộc về user
      const [rows] = await db.query(
        "SELECT * FROM donhang WHERE madonhang = ? AND manguoidung = ?",
        [madonhang, manguoidung]
      );

      if (!rows.length) {
        return res.status(404).json({ message: "Không tìm thấy đơn hàng." });
      }

      if (rows[0].trangthaidonhang !== "hoanthanh") {
        return res.status(400).json({ message: "Chỉ có thể yêu cầu trả hàng khi đơn đã hoàn thành." });
      }

      // Kiểm tra đã có yêu cầu chưa
      const [existing] = await db.query(
        "SELECT * FROM yeucautranhang WHERE madonhang = ? AND trangthai NOT IN ('tuchoi')",
        [madonhang]
      );
      if (existing.length > 0) {
        return res.status(400).json({ message: "Đơn hàng này đã có yêu cầu trả hàng đang xử lý." });
      }

      const [result] = await db.query(
        `INSERT INTO yeucautranhang (madonhang, manguoidung, lydo, trangthai, ngayyeucau)
         VALUES (?, ?, ?, 'choxuly', NOW())`,
        [madonhang, manguoidung, lydo]
      );

      // Cập nhật trạng thái đơn hàng sang "trahang"
      await db.query(
        "UPDATE donhang SET trangthaidonhang = 'trahang' WHERE madonhang = ?",
        [madonhang]
      );
      await db.query(
        `INSERT INTO lichsutrangthaidon (madonhang, trangthai, ghichu, thoigian)
         VALUES (?, 'trahang', ?, NOW())`,
        [madonhang, `Khách gửi yêu cầu trả hàng: ${lydo}`]
      );

      res.status(201).json({ message: "Gửi yêu cầu trả hàng thành công.", mayeucau: result.insertId });
    } catch (error) {
      res.status(500).json({ message: "Không thể gửi yêu cầu trả hàng.", error: error.message });
    }
  },

  // Admin lấy danh sách yêu cầu trả hàng
  async getAll(req, res) {
    try {
      const [rows] = await db.query(
        `SELECT y.*, nd.hoten, nd.sodienthoai, d.tongtien, d.trangthaidonhang
         FROM yeucautranhang y
         JOIN nguoidung nd ON nd.manguoidung = y.manguoidung
         JOIN donhang d ON d.madonhang = y.madonhang
         ORDER BY y.ngayyeucau DESC`
      );
      res.json(rows);
    } catch (error) {
      res.status(500).json({ message: "Không thể lấy danh sách yêu cầu.", error: error.message });
    }
  },

  // Admin duyệt yêu cầu (chuyển sang chờ hàng hồi)
  async approveRequest(req, res) {
    try {
      const { id } = req.params;
      const { ghichu_admin } = req.body;

      await db.query(
        `UPDATE yeucautranhang SET trangthai = 'duyet_chohanghoi', ghichu_admin = ?, ngayxuly = NOW()
         WHERE mayeucau = ?`,
        [ghichu_admin || null, id]
      );

      res.json({ message: "Đã duyệt yêu cầu. Chờ khách gửi hàng về." });
    } catch (error) {
      res.status(500).json({ message: "Lỗi xử lý yêu cầu.", error: error.message });
    }
  },

  // Admin xác nhận đã nhận hàng → hoàn tồn kho
  async confirmReceived(req, res) {
    try {
      const { id } = req.params;

      const [rows] = await db.query(
        "SELECT * FROM yeucautranhang WHERE mayeucau = ?", [id]
      );
      if (!rows.length) return res.status(404).json({ message: "Không tìm thấy yêu cầu." });

      const yeucau = rows[0];

      // Hoàn lại tồn kho
      const [chitiet] = await db.query(
        "SELECT masanpham, soluong FROM chitietdonhang WHERE madonhang = ?",
        [yeucau.madonhang]
      );
      for (const item of chitiet) {
        await db.query(
          "UPDATE tonkho SET soluongton = soluongton + ? WHERE masanpham = ?",
          [item.soluong, item.masanpham]
        );
      }

      // Cập nhật trạng thái yêu cầu
      await db.query(
        "UPDATE yeucautranhang SET trangthai = 'danhan', ngayxuly = NOW() WHERE mayeucau = ?",
        [id]
      );

      // Ghi lịch sử
      await db.query(
        `INSERT INTO lichsutrangthaidon (madonhang, trangthai, ghichu, thoigian)
         VALUES (?, 'trahang', 'Admin đã nhận hàng trả, hoàn tồn kho', NOW())`,
        [yeucau.madonhang]
      );

      res.json({ message: "Đã xác nhận nhận hàng và hoàn tồn kho thành công." });
    } catch (error) {
      res.status(500).json({ message: "Lỗi xử lý.", error: error.message });
    }
  },

  // Admin từ chối yêu cầu
  async rejectRequest(req, res) {
    try {
      const { id } = req.params;
      const { ghichu_admin } = req.body;

      const [rows] = await db.query("SELECT * FROM yeucautranhang WHERE mayeucau = ?", [id]);
      if (!rows.length) return res.status(404).json({ message: "Không tìm thấy yêu cầu." });

      const yeucau = rows[0];

      await db.query(
        `UPDATE yeucautranhang SET trangthai = 'tuchoi', ghichu_admin = ?, ngayxuly = NOW()
         WHERE mayeucau = ?`,
        [ghichu_admin || "Yêu cầu không hợp lệ", id]
      );

      // Trả đơn về trạng thái hoàn thành
      await db.query(
        "UPDATE donhang SET trangthaidonhang = 'hoanthanh' WHERE madonhang = ?",
        [yeucau.madonhang]
      );
      await db.query(
        `INSERT INTO lichsutrangthaidon (madonhang, trangthai, ghichu, thoigian)
         VALUES (?, 'hoanthanh', 'Từ chối yêu cầu trả hàng', NOW())`,
        [yeucau.madonhang]
      );

      res.json({ message: "Đã từ chối yêu cầu trả hàng." });
    } catch (error) {
      res.status(500).json({ message: "Lỗi xử lý.", error: error.message });
    }
  },

  // Lấy yêu cầu trả hàng của user
  async getByUser(req, res) {
    try {
      const { userId } = req.params;
      const [rows] = await db.query(
        `SELECT y.*, d.tongtien, d.ngaydat
         FROM yeucautranhang y
         JOIN donhang d ON d.madonhang = y.madonhang
         WHERE y.manguoidung = ?
         ORDER BY y.ngayyeucau DESC`,
        [userId]
      );
      res.json(rows);
    } catch (error) {
      res.status(500).json({ message: "Lỗi.", error: error.message });
    }
  }
};

module.exports = ReturnController;
