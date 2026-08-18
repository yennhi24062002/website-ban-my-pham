const db = require("../config/db");

async function layGioHangTheoNguoiDung(manguoidung) {
  const [giohangRows] = await db.query(
    "SELECT * FROM giohang WHERE manguoidung = ? LIMIT 1",
    [manguoidung]
  );

  if (!giohangRows.length) {
    const [inserted] = await db.query(
      "INSERT INTO giohang (manguoidung) VALUES (?)",
      [manguoidung]
    );
    return inserted.insertId;
  }

  return giohangRows[0].magiohang;
}

async function layChiTietGioHang(magiohang) {
  const [rows] = await db.query(
    `SELECT ct.*, p.tensanpham, p.hinhanh, bt.mausac, bt.loai, bt.dungtich
     FROM chitietgiohang ct
     JOIN sanpham p ON p.masanpham = ct.masanpham
     LEFT JOIN luachon_sanpham bt ON bt.maluachon = ct.maluachon
     WHERE ct.magiohang = ?
     ORDER BY ct.machitietgio`,
    [magiohang]
  );

  return rows.map((row) => ({
    machitietgio: row.machitietgio,
    magiohang: row.magiohang,
    masanpham: row.masanpham,
    maluachon: row.maluachon,
    tensanpham: row.tensanpham,
    hinh: row.hinhanh,
    mausac: row.mausac || "Mặc định",
    loai: row.loai || "",
    dungtich: row.dungtich || "",
    soluong: row.soluong,
    dongia: Number(row.dongia),
    thanhtien: Number(row.dongia) * Number(row.soluong)
  }));
}

const CartController = {
  async index(req, res) {
    try {
      const { manguoidung } = req.query;
      if (!manguoidung) {
        return res.status(400).json({ message: "Thieu manguoidung." });
      }

      const magiohang = await layGioHangTheoNguoiDung(manguoidung);
      const items = await layChiTietGioHang(magiohang);
      const tongtien = items.reduce((tong, item) => tong + item.thanhtien, 0);

      res.json({
        magiohang,
        manguoidung: Number(manguoidung),
        items,
        tongtien
      });
    } catch (error) {
      res.status(500).json({ message: "Khong the lay gio hang.", error: error.message });
    }
  },

  async addItem(req, res) {
    try {
      const { manguoidung, masanpham, maluachon = null, soluong = 1, dongia = 0 } = req.body;
      if (!manguoidung || !masanpham) {
        return res.status(400).json({ message: "Thieu thong tin san pham." });
      }

      const magiohang = await layGioHangTheoNguoiDung(manguoidung);
      const [existRows] = await db.query(
        `SELECT machitietgio, soluong
         FROM chitietgiohang
         WHERE magiohang = ? AND masanpham = ? AND (maluachon <=> ?)`,
        [magiohang, masanpham, maluachon]
      );

      if (existRows.length) {
        await db.query(
          "UPDATE chitietgiohang SET soluong = soluong + ? WHERE machitietgio = ?",
          [soluong, existRows[0].machitietgio]
        );
      } else {
        await db.query(
          `INSERT INTO chitietgiohang (magiohang, masanpham, maluachon, soluong, dongia)
           VALUES (?, ?, ?, ?, ?)`,
          [magiohang, masanpham, maluachon, soluong, dongia]
        );
      }

      const items = await layChiTietGioHang(magiohang);
      const tongtien = items.reduce((tong, item) => tong + item.thanhtien, 0);
      res.status(201).json({ message: "Da them vao gio hang.", magiohang, items, tongtien });
    } catch (error) {
      res.status(500).json({ message: "Khong the them vao gio hang.", error: error.message });
    }
  },

  async updateItem(req, res) {
    try {
      const { id } = req.params;
      const { soluong } = req.body;
      const [result] = await db.query(
        "UPDATE chitietgiohang SET soluong = ? WHERE machitietgio = ?",
        [soluong, id]
      );
      res.json({ message: "Da cap nhat so luong.", affectedRows: result.affectedRows });
    } catch (error) {
      res.status(500).json({ message: "Khong the cap nhat item.", error: error.message });
    }
  },

  async removeItem(req, res) {
    try {
      const { id } = req.params;
      const [result] = await db.query(
        "DELETE FROM chitietgiohang WHERE machitietgio = ?",
        [id]
      );
      res.json({ message: "Da xoa item.", affectedRows: result.affectedRows });
    } catch (error) {
      res.status(500).json({ message: "Khong the xoa item.", error: error.message });
    }
  }
};

module.exports = CartController;
