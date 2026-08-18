const db = require("../config/db");

const CategoryController = {
  async index(req, res) {
    try {
      const [rows] = await db.query(
        "SELECT * FROM danhmuc ORDER BY madanhmuc"
      );
      res.json(rows);
    } catch (error) {
      res.status(500).json({ message: "Khong the lay danh muc.", error: error.message });
    }
  },

  async create(req, res) {
    try {
      const { tendanhmuc, mota = "" } = req.body;
      if (!tendanhmuc) {
        return res.status(400).json({ message: "Thieu ten danh muc." });
      }
      const [result] = await db.query(
        "INSERT INTO danhmuc (tendanhmuc, mota) VALUES (?, ?)",
        [tendanhmuc, mota]
      );
      res.status(201).json({ message: "Da them danh muc.", madanhmuc: result.insertId });
    } catch (error) {
      res.status(500).json({ message: "Khong the them danh muc.", error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { tendanhmuc, mota = "", trangthai = "hoatdong" } = req.body;
      const [result] = await db.query(
        "UPDATE danhmuc SET tendanhmuc = ?, mota = ?, trangthai = ? WHERE madanhmuc = ?",
        [tendanhmuc, mota, trangthai, id]
      );
      res.json({ message: "Da cap nhat danh muc.", affectedRows: result.affectedRows });
    } catch (error) {
      res.status(500).json({ message: "Khong the cap nhat danh muc.", error: error.message });
    }
  },

  async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { trangthai } = req.body;
      const [result] = await db.query(
        "UPDATE danhmuc SET trangthai = ? WHERE madanhmuc = ?",
        [trangthai, id]
      );
      res.json({ message: "Da cap nhat trang thai danh muc.", affectedRows: result.affectedRows });
    } catch (error) {
      res.status(500).json({ message: "Khong the cap nhat trang thai danh muc.", error: error.message });
    }
  }
};

module.exports = CategoryController;
