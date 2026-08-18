const db = require("../config/db");

function anToanNguoiDung(row) {
  return {
    manguoidung: row.manguoidung,
    hoten: row.hoten,
    sodienthoai: row.sodienthoai,
    email: row.email,
    trangthai: row.trangthai,
    tenvaitro: row.tenvaitro
  };
}

const AuthController = {
  async login(req, res) {
    try {
      const { taikhoan = "", matkhau = "" } = req.body;
      if (!taikhoan.trim() || !matkhau.trim()) {
        return res.status(400).json({ message: "Vui long nhap tai khoan va mat khau." });
      }

      const [rows] = await db.query(
        `SELECT nd.*, vt.tenvaitro
         FROM nguoidung nd
         JOIN vaitro vt ON vt.mavaitro = nd.mavaitro
         WHERE nd.email = ? OR nd.sodienthoai = ?
         LIMIT 1`,
        [taikhoan.trim(), taikhoan.trim()]
      );

      if (!rows.length) {
        return res.status(404).json({ message: "Tai khoan khong ton tai." });
      }

      const user = rows[0];
      if (user.matkhau !== matkhau.trim()) {
        return res.status(401).json({ message: "Sai mat khau." });
      }

      res.json({
        message: "Dang nhap thanh cong.",
        user: anToanNguoiDung(user)
      });
    } catch (error) {
      res.status(500).json({ message: "Khong the dang nhap.", error: error.message });
    }
  },

  async register(req, res) {
    try {
      const { hoten = "", sodienthoai = "", email = "", matkhau = "" } = req.body;
      if (!hoten.trim() || !sodienthoai.trim() || !email.trim() || !matkhau.trim()) {
        return res.status(400).json({ message: "Vui long nhap day du thong tin." });
      }

      const [roleRows] = await db.query(
        "SELECT mavaitro FROM vaitro WHERE tenvaitro = 'khachhang' LIMIT 1"
      );
      const mavaitro = roleRows.length ? roleRows[0].mavaitro : 1;

      const [existRows] = await db.query(
        "SELECT manguoidung FROM nguoidung WHERE email = ? OR sodienthoai = ? LIMIT 1",
        [email.trim(), sodienthoai.trim()]
      );

      if (existRows.length) {
        return res.status(409).json({ message: "Tai khoan da ton tai." });
      }

      const [result] = await db.query(
        `INSERT INTO nguoidung (mavaitro, hoten, sodienthoai, email, matkhau, trangthai)
         VALUES (?, ?, ?, ?, ?, 'hoatdong')`,
        [mavaitro, hoten.trim(), sodienthoai.trim(), email.trim(), matkhau.trim()]
      );

      res.status(201).json({
        message: "Dang ky thanh cong.",
        user: {
          manguoidung: result.insertId,
          hoten: hoten.trim(),
          sodienthoai: sodienthoai.trim(),
          email: email.trim(),
          tenvaitro: "khachhang"
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Khong the dang ky.", error: error.message });
    }
  },

  async logout(req, res) {
    res.json({ message: "Da dang xuat." });
  }
};

module.exports = AuthController;
