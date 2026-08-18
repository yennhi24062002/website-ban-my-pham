const db = require("../config/db");

// Khuyenmai controller — bam sat schema SQL goc:
// bang khuyenmai: makhuyenmai, tenkhuyenmai, phantramgiam, ngaybatdau, ngayketthuc, trangthai
// bang sanpham_khuyenmai: masanpham, makhuyenmai

const KhuyenMaiController = {
  // Lấy danh sách tất cả khuyến mãi + sản phẩm áp dụng
  async getAll(req, res) {
    try {
      const [rows] = await db.query(
        "SELECT * FROM khuyenmai ORDER BY ngaybatdau DESC"
      );

      for (let km of rows) {
        const [spRows] = await db.query(
          `SELECT sp.masanpham, sp.tensanpham, sp.giaban
           FROM sanpham_khuyenmai ks
           JOIN sanpham sp ON ks.masanpham = sp.masanpham
           WHERE ks.makhuyenmai = ?`,
          [km.makhuyenmai]
        );
        km.sanpham = spRows;
      }

      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi khi lấy danh sách khuyến mãi" });
    }
  },

  // Tạo khuyến mãi mới
  async create(req, res) {
    try {
      const { tenkhuyenmai, phantramgiam, ngaybatdau, ngayketthuc, sanphamIds } = req.body;

      const [result] = await db.query(
        "INSERT INTO khuyenmai (tenkhuyenmai, phantramgiam, ngaybatdau, ngayketthuc, trangthai) VALUES (?, ?, COALESCE(?, NOW()), COALESCE(?, DATE_ADD(NOW(), INTERVAL 30 DAY)), 'hoatdong')",
        [tenkhuyenmai, phantramgiam || 0, ngaybatdau || null, ngayketthuc || null]
      );

      const makhuyenmai = result.insertId;

      if (sanphamIds && sanphamIds.length > 0) {
        for (const masp of sanphamIds) {
          await db.query(
            "INSERT INTO sanpham_khuyenmai (masanpham, makhuyenmai) VALUES (?, ?)",
            [masp, makhuyenmai]
          );
        }
      }

      res.status(201).json({ message: "Tạo khuyến mãi thành công", makhuyenmai });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi khi tạo khuyến mãi" });
    }
  },

  // Xóa khuyến mãi
  async delete(req, res) {
    try {
      const { id } = req.params;
      await db.query("DELETE FROM khuyenmai WHERE makhuyenmai = ?", [id]);
      res.json({ message: "Đã xóa khuyến mãi" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi khi xóa khuyến mãi" });
    }
  }
};

module.exports = KhuyenMaiController;
