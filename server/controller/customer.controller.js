const db = require("../config/db");

const CustomerController = {
  async index(req, res) {
    try {
      const [rows] = await db.query(
        `SELECT nd.manguoidung, nd.hoten, nd.sodienthoai, nd.email, nd.trangthai, vt.tenvaitro
         FROM nguoidung nd
         JOIN vaitro vt ON vt.mavaitro = nd.mavaitro
         ORDER BY nd.manguoidung DESC`
      );
      res.json(rows);
    } catch (error) {
      res.status(500).json({ message: "Khong the lay danh sach nguoi dung.", error: error.message });
    }
  },

  async detail(req, res) {
    try {
      const { id } = req.params;
      const [userRows] = await db.query(
        `SELECT nd.manguoidung, nd.hoten, nd.sodienthoai, nd.email, nd.trangthai, vt.tenvaitro, nd.ngaytao
         FROM nguoidung nd
         JOIN vaitro vt ON vt.mavaitro = nd.mavaitro
         WHERE nd.manguoidung = ?`,
        [id]
      );

      if (!userRows.length) {
        return res.status(404).json({ message: "Khong tim thay nguoi dung." });
      }

      const [addressRows] = await db.query(
        "SELECT * FROM diachi WHERE manguoidung = ? ORDER BY macdinh DESC, madiachi DESC",
        [id]
      );

      const [orderRows] = await db.query(
        "SELECT * FROM donhang WHERE manguoidung = ? ORDER BY madonhang DESC",
        [id]
      );

      res.json({
        nguoidung: userRows[0],
        diachi: addressRows,
        donhang: orderRows
      });
    } catch (error) {
      res.status(500).json({ message: "Khong the lay chi tiet nguoi dung.", error: error.message });
    }
  },

  async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { trangthai } = req.body;
      const [result] = await db.query(
        "UPDATE nguoidung SET trangthai = ? WHERE manguoidung = ?",
        [trangthai, id]
      );
      res.json({ message: "Da cap nhat trang thai nguoi dung.", affectedRows: result.affectedRows });
    } catch (error) {
      res.status(500).json({ message: "Khong the cap nhat trang thai nguoi dung.", error: error.message });
    }
  }
};

module.exports = CustomerController;
