const db = require("../config/db");

function nhanDangSanPham(row, luachon = []) {
  let giaban_thucte = Number(row.giaban);
  let giagoc_hienthi = null;

  // Tinh gia sau khi ap dung khuyen mai (phantramgiam theo SQL goc)
  if (row.makhuyenmai && Number(row.phantramgiam) > 0) {
    giagoc_hienthi = Number(row.giaban);
    giaban_thucte = Math.round(giagoc_hienthi * (1 - Number(row.phantramgiam) / 100));

    luachon = luachon.map(lc => ({
      ...lc,
      giagoc: Number(lc.giaban),
      giaban: Math.round(Number(lc.giaban) * (1 - Number(row.phantramgiam) / 100))
    }));
  }

  return {
    masanpham: row.masanpham,
    madanhmuc: row.madanhmuc,
    mathuonghieu: row.mathuonghieu,
    tensanpham: row.tensanpham,
    giaban: giaban_thucte,
    giagoc: giagoc_hienthi,
    hinhanh: row.hinhanh,
    mota: row.mota,
    thongso: row.thongso || "",
    thanhphan: row.thanhphan || "",
    hdsd: row.hdsd || "",
    tileban: row.tileban || 30,
    khuyenmai: row.khuyenmai || "",
    trangthai: row.trangthai,
    ngaytao: row.ngaytao,
    tendanhmuc: row.tendanhmuc,
    tenthuonghieu: row.tenthuonghieu,
    soluongton: row.soluongton ?? 0,
    makhuyenmai: row.makhuyenmai || null,
    tenkhuyenmai: row.tenkhuyenmai || "",
    phantramgiam: row.phantramgiam || 0,
    luachon
  };
}

function nhanDangLuachon(row) {
  return {
    maluachon: row.maluachon,
    masanpham: row.masanpham,
    mausac: row.mausac || "Mặc định",
    loai: row.loai || "",
    dungtich: row.dungtich || "",
    giaban: Number(row.giaban),
    giagoc: null,
    soluongton: row.soluongton,
    hinhanh: row.hinhanh,
    trangthai: row.trangthai
  };
}

async function layDanhSachSanPham() {
  // Thu query voi khuyenmai JOIN, neu loi (bang chua ton tai) thi fallback
  let sanPhamRows;
  try {
    [sanPhamRows] = await db.query(
      `SELECT p.*, dm.tendanhmuc, th.tenthuonghieu, tk.soluongton,
              k.makhuyenmai, k.tenkhuyenmai, k.phantramgiam
       FROM sanpham p
       JOIN danhmuc dm ON dm.madanhmuc = p.madanhmuc
       LEFT JOIN thuonghieu th ON th.mathuonghieu = p.mathuonghieu
       LEFT JOIN tonkho tk ON tk.masanpham = p.masanpham
       LEFT JOIN sanpham_khuyenmai ks ON p.masanpham = ks.masanpham
       LEFT JOIN khuyenmai k ON ks.makhuyenmai = k.makhuyenmai
         AND k.trangthai = 'hoatdong'
         AND NOW() BETWEEN k.ngaybatdau AND k.ngayketthuc
       ORDER BY p.masanpham ASC`
    );
  } catch (e1) {
    // Fallback: thu voi ten bang cu (khuyenmai_sanpham - local MySQL)
    try {
      [sanPhamRows] = await db.query(
        `SELECT p.*, dm.tendanhmuc, th.tenthuonghieu, tk.soluongton,
                k.makhuyenmai, k.tenkhuyenmai, k.phantramgiam
         FROM sanpham p
         JOIN danhmuc dm ON dm.madanhmuc = p.madanhmuc
         LEFT JOIN thuonghieu th ON th.mathuonghieu = p.mathuonghieu
         LEFT JOIN tonkho tk ON tk.masanpham = p.masanpham
         LEFT JOIN khuyenmai_sanpham ks ON p.masanpham = ks.masanpham
         LEFT JOIN khuyenmai k ON ks.makhuyenmai = k.makhuyenmai
           AND k.trangthai = 'hoatdong'
           AND NOW() BETWEEN k.ngaybatdau AND k.ngayketthuc
         ORDER BY p.masanpham ASC`
      );
    } catch (e2) {
      // Fallback cuoi: khong co khuyenmai
      [sanPhamRows] = await db.query(
        `SELECT p.*, dm.tendanhmuc, th.tenthuonghieu, tk.soluongton
         FROM sanpham p
         JOIN danhmuc dm ON dm.madanhmuc = p.madanhmuc
         LEFT JOIN thuonghieu th ON th.mathuonghieu = p.mathuonghieu
         LEFT JOIN tonkho tk ON tk.masanpham = p.masanpham
         ORDER BY p.masanpham ASC`
      );
    }
  }

  let variantRows = [];
  try {
    const [checkRows] = await db.query("SHOW TABLES LIKE 'luachon_sanpham'");
    if (checkRows.length) {
      [variantRows] = await db.query(
        `SELECT *
         FROM luachon_sanpham
         ORDER BY masanpham, maluachon`
      );
    }
  } catch (error) {
    variantRows = [];
  }

  const variantMap = new Map();
  for (const row of variantRows) {
    const item = nhanDangLuachon(row);
    if (!variantMap.has(item.masanpham)) {
      variantMap.set(item.masanpham, []);
    }
    variantMap.get(item.masanpham).push(item);
  }

  return sanPhamRows.map((row) => nhanDangSanPham(row, variantMap.get(row.masanpham) || []));
}

const ProductController = {
  async index(req, res) {
    try {
      const sanPhams = await layDanhSachSanPham();
      res.json(sanPhams);
    } catch (error) {
      res.status(500).json({ message: "Khong the lay danh sach san pham.", error: error.message });
    }
  },

  async detail(req, res) {
    try {
      const { id } = req.params;
      const [rows] = await db.query(
        `SELECT p.*, dm.tendanhmuc, th.tenthuonghieu, tk.soluongton,
                k.makhuyenmai, k.tenkhuyenmai, k.phantramgiam
         FROM sanpham p
         JOIN danhmuc dm ON dm.madanhmuc = p.madanhmuc
         LEFT JOIN thuonghieu th ON th.mathuonghieu = p.mathuonghieu
         LEFT JOIN tonkho tk ON tk.masanpham = p.masanpham
         LEFT JOIN sanpham_khuyenmai ks ON p.masanpham = ks.masanpham
         LEFT JOIN khuyenmai k ON ks.makhuyenmai = k.makhuyenmai
           AND k.trangthai = 'hoatdong'
           AND NOW() BETWEEN k.ngaybatdau AND k.ngayketthuc
         WHERE p.masanpham = ?`,
        [id]
      );

      if (!rows.length) {
        return res.status(404).json({ message: "Khong tim thay san pham." });
      }

      const [variantRows] = await db.query(
        `SELECT * FROM luachon_sanpham WHERE masanpham = ? AND trangthai = 'dangban'`,
        [id]
      ).catch(() => [[]]);

      res.json(nhanDangSanPham(rows[0], variantRows.map(nhanDangLuachon)));
    } catch (error) {
      res.status(500).json({ message: "Khong the lay chi tiet san pham.", error: error.message });
    }
  },

  async create(req, res) {
    try {
      const {
        madanhmuc,
        mathuonghieu = null,
        tensanpham,
        giaban,
        hinhanh = "",
        mota = "",
        trangthai = "dangban"
      } = req.body;

      if (!madanhmuc || !tensanpham || giaban === undefined) {
        return res.status(400).json({ message: "Thieu thong tin san pham." });
      }

      const [result] = await db.query(
        `INSERT INTO sanpham (madanhmuc, mathuonghieu, tensanpham, giaban, hinhanh, mota, trangthai)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [madanhmuc, mathuonghieu, tensanpham, giaban, hinhanh, mota, trangthai]
      );

      res.status(201).json({ message: "Da them san pham.", masanpham: result.insertId });
    } catch (error) {
      res.status(500).json({ message: "Khong the them san pham.", error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const {
        madanhmuc,
        mathuonghieu = null,
        tensanpham,
        giaban,
        hinhanh = "",
        mota = "",
        trangthai = "dangban"
      } = req.body;

      const [result] = await db.query(
        `UPDATE sanpham
         SET madanhmuc = ?, mathuonghieu = ?, tensanpham = ?, giaban = ?, hinhanh = ?, mota = ?, trangthai = ?
         WHERE masanpham = ?`,
        [madanhmuc, mathuonghieu, tensanpham, giaban, hinhanh, mota, trangthai, id]
      );

      res.json({ message: "Da cap nhat san pham.", affectedRows: result.affectedRows });
    } catch (error) {
      res.status(500).json({ message: "Khong the cap nhat san pham.", error: error.message });
    }
  },

  async updateStock(req, res) {
    try {
      const { id } = req.params;
      const { soluongton } = req.body;
      const [result] = await db.query(
        "UPDATE tonkho SET soluongton = ? WHERE masanpham = ?",
        [soluongton, id]
      );
      res.json({ message: "Da cap nhat ton kho.", affectedRows: result.affectedRows });
    } catch (error) {
      res.status(500).json({ message: "Khong the cap nhat ton kho.", error: error.message });
    }
  },

  async layReviews(req, res) {
    try {
      const { id } = req.params;
      const [rows] = await db.query(
        `SELECT dg.*, nd.hoten 
         FROM danhgia dg 
         JOIN nguoidung nd ON nd.manguoidung = dg.manguoidung 
         WHERE dg.masanpham = ? 
         ORDER BY dg.ngaytao DESC`,
        [id]
      );
      res.json(rows);
    } catch (error) {
      res.status(500).json({ message: "Không thể lấy đánh giá.", error: error.message });
    }
  },

  async guiReview(req, res) {
    try {
      const { id } = req.params;
      const { manguoidung, sosao, noidung } = req.body;
      if (!manguoidung || !sosao) {
        return res.status(400).json({ message: "Thiếu thông tin đánh giá." });
      }
      await db.query(
        `INSERT INTO danhgia (masanpham, manguoidung, sosao, noidung) VALUES (?, ?, ?, ?)`,
        [id, manguoidung, sosao, noidung]
      );
      res.status(201).json({ message: "Gửi đánh giá thành công." });
    } catch (error) {
      res.status(500).json({ message: "Không thể gửi đánh giá.", error: error.message });
    }
  },

  async layQA(req, res) {
    try {
      const { id } = req.params;
      const [rows] = await db.query(
        `SELECT hd.*, nd.hoten 
         FROM hoidap hd 
         JOIN nguoidung nd ON nd.manguoidung = hd.manguoidung 
         WHERE hd.masanpham = ? 
         ORDER BY hd.ngaytao DESC`,
        [id]
      );
      res.json(rows);
    } catch (error) {
      res.status(500).json({ message: "Không thể lấy câu hỏi.", error: error.message });
    }
  },

  async guiCauHoi(req, res) {
    try {
      const { id } = req.params;
      const { manguoidung, cauhoi } = req.body;
      if (!manguoidung || !cauhoi) {
        return res.status(400).json({ message: "Thiếu nội dung câu hỏi." });
      }
      await db.query(
        `INSERT INTO hoidap (masanpham, manguoidung, cauhoi) VALUES (?, ?, ?)`,
        [id, manguoidung, cauhoi]
      );
      res.status(201).json({ message: "Gửi câu hỏi thành công." });
    } catch (error) {
      res.status(500).json({ message: "Không thể gửi câu hỏi.", error: error.message });
    }
  },

  async traloiQA(req, res) {
    try {
      const { qaId } = req.params;
      const { cautraloi } = req.body;
      if (!cautraloi) {
        return res.status(400).json({ message: "Thiếu nội dung câu trả lời." });
      }
      await db.query(
        `UPDATE hoidap SET cautraloi = ?, ngaytraloi = NOW() WHERE mahoidap = ?`,
        [cautraloi, qaId]
      );
      res.json({ message: "Trả lời câu hỏi thành công." });
    } catch (error) {
      res.status(500).json({ message: "Không thể trả lời câu hỏi.", error: error.message });
    }
  }
};

module.exports = ProductController;
module.exports.layDanhSachSanPham = layDanhSachSanPham;
