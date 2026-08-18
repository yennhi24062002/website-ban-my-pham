const db = require("../config/db");

const KhuyenMaiController = {
  // Lấy danh sách tất cả khuyến mãi
  async getAll(req, res) {
    try {
      const [rows] = await db.query("SELECT * FROM khuyenmai ORDER BY ngaybatdau DESC");
      
      // Lấy thêm danh sách sản phẩm cho mỗi khuyến mãi
      for (let km of rows) {
        const [spRows] = await db.query(
          `SELECT sp.masanpham, sp.tensanpham, sp.giaban 
           FROM sanpham_khuyenmai ks 
           JOIN sanpham sp ON ks.masanpham = sp.masanpham 
           WHERE ks.makm = ?`,
          [km.makm]
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
      const { tenkm, loai_giamgia, mucgiam, ngaybatdau, ngayketthuc, sanphamIds } = req.body;
      
      const [result] = await db.query(
        "INSERT INTO khuyenmai (tenkm, loai_giamgia, mucgiam, ngaybatdau, ngayketthuc) VALUES (?, ?, ?, ?, ?)",
        [tenkm, loai_giamgia, mucgiam, ngaybatdau, ngayketthuc]
      );
      
      const makm = result.insertId;
      
      // Thêm sản phẩm vào khuyến mãi
      if (sanphamIds && sanphamIds.length > 0) {
        for (const masp of sanphamIds) {
          await db.query(
            "INSERT INTO sanpham_khuyenmai (masanpham, makm) VALUES (?, ?)",
            [masp, makm]
          );
        }
      }
      
      res.status(201).json({ message: "Tạo khuyến mãi thành công", makm });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi khi tạo khuyến mãi" });
    }
  },

  // Xóa khuyến mãi
  async delete(req, res) {
    try {
      const { id } = req.params;
      await db.query("DELETE FROM khuyenmai WHERE makm = ?", [id]);
      res.json({ message: "Đã xóa khuyến mãi" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi khi xóa khuyến mãi" });
    }
  }
};

module.exports = KhuyenMaiController;
