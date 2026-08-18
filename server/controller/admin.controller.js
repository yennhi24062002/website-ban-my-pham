const db = require("../config/db");

// ─── Helper: tạo mảng đủ các nhãn thời gian, fill 0 nếu thiếu ───────────────
function fillNgay(rows) {
  const map = {};
  rows.forEach(r => { map[r.label] = Number(r.revenue); });

  const result = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    // Format DD/MM thủ công để đảm bảo khớp hoàn toàn với SQL DATE_FORMAT '%d/%m'
    const label = `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
    result.push({ label, revenue: map[label] || 0 });
  }
  return result;
}

function fillTuan(rows) {
  // Tạo nhãn tuần theo format "Tuần xx" cho 8 tuần gần nhất
  const map = {};
  rows.forEach(r => { map[r.sortKey] = Number(r.revenue); });

  const result = [];
  for (let i = 7; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i * 7);
    // Tính số tuần trong năm
    const startOfYear = new Date(d.getFullYear(), 0, 1);
    const weekNum = Math.ceil(((d - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7);
    const sortKey = `${d.getFullYear()}-${String(weekNum).padStart(2, "0")}`;
    const label = `T${weekNum}/${d.getFullYear() % 100}`;
    result.push({ label, revenue: map[sortKey] || 0 });
  }
  return result;
}

function fillThang(rows) {
  // Tạo đủ 12 tháng gần nhất (kể cả tháng = 0)
  const map = {};
  rows.forEach(r => { map[r.sortKey] = Number(r.revenue); });

  const result = [];
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const sortKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = `Tháng ${d.getMonth() + 1}/${String(d.getFullYear()).slice(-2)}`;
    result.push({ label, revenue: map[sortKey] || 0 });
  }
  return result;
}

function fillNam(rows) {
  // Tạo đủ 5 năm gần nhất (kể cả năm = 0)
  const map = {};
  rows.forEach(r => { map[r.sortKey] = Number(r.revenue); });

  const result = [];
  const currentYear = new Date().getFullYear();
  for (let y = currentYear - 4; y <= currentYear; y++) {
    result.push({ label: `Năm ${y}`, revenue: map[String(y)] || 0 });
  }
  return result;
}

const AdminController = {
  async getStatistics(req, res) {
    try {
      // 1. Doanh thu theo ngày – 7 ngày gần nhất
      const [rawDay] = await db.query(`
        SELECT DATE_FORMAT(ngaydat, '%d/%m') as label, SUM(tongtien) as revenue
        FROM donhang
        WHERE trangthaidonhang = 'hoanthanh' AND ngaydat >= DATE_SUB(NOW(), INTERVAL 7 DAY)
        GROUP BY DATE_FORMAT(ngaydat, '%Y-%m-%d'), DATE_FORMAT(ngaydat, '%d/%m')
        ORDER BY DATE_FORMAT(ngaydat, '%Y-%m-%d') ASC
      `);

      // 2. Doanh thu theo tuần – 8 tuần gần nhất
      const [rawWeek] = await db.query(`
        SELECT
          DATE_FORMAT(ngaydat, '%Y-%u') as sortKey,
          SUM(tongtien) as revenue
        FROM donhang
        WHERE trangthaidonhang = 'hoanthanh' AND ngaydat >= DATE_SUB(NOW(), INTERVAL 8 WEEK)
        GROUP BY DATE_FORMAT(ngaydat, '%Y-%u')
        ORDER BY DATE_FORMAT(ngaydat, '%Y-%u') ASC
      `);

      // 3. Doanh thu theo tháng – 12 tháng gần nhất (LUÔN ĐỦ 12)
      const [rawMonth] = await db.query(`
        SELECT
          DATE_FORMAT(ngaydat, '%Y-%m') as sortKey,
          SUM(tongtien) as revenue
        FROM donhang
        WHERE trangthaidonhang = 'hoanthanh' AND ngaydat >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
        GROUP BY DATE_FORMAT(ngaydat, '%Y-%m')
        ORDER BY DATE_FORMAT(ngaydat, '%Y-%m') ASC
      `);

      // 4. Doanh thu theo năm – 5 năm gần nhất (LUÔN ĐỦ 5)
      const [rawYear] = await db.query(`
        SELECT
          DATE_FORMAT(ngaydat, '%Y') as sortKey,
          SUM(tongtien) as revenue
        FROM donhang
        WHERE trangthaidonhang = 'hoanthanh' AND ngaydat >= DATE_SUB(NOW(), INTERVAL 5 YEAR)
        GROUP BY DATE_FORMAT(ngaydat, '%Y')
        ORDER BY DATE_FORMAT(ngaydat, '%Y') ASC
      `);

      // 5. Mặt hàng bán chạy nhất (Top 5)
      const [bestSellers] = await db.query(`
        SELECT p.masanpham, p.tensanpham as name, SUM(ct.soluong) as quantity, SUM(ct.thanhtien) as totalRevenue
        FROM chitietdonhang ct
        JOIN donhang d ON d.madonhang = ct.madonhang
        JOIN sanpham p ON p.masanpham = ct.masanpham
        WHERE d.trangthaidonhang = 'hoanthanh'
        GROUP BY p.masanpham, p.tensanpham
        ORDER BY quantity DESC
        LIMIT 5
      `);

      // 6. Mặt hàng bán chậm (Top 5)
      const [slowSellers] = await db.query(`
        SELECT p.masanpham, p.tensanpham as name, COALESCE(SUM(ct.soluong), 0) as quantity
        FROM sanpham p
        LEFT JOIN chitietdonhang ct ON ct.masanpham = p.masanpham
        LEFT JOIN donhang d ON d.madonhang = ct.madonhang AND d.trangthaidonhang = 'hoanthanh'
        GROUP BY p.masanpham, p.tensanpham
        ORDER BY quantity ASC
        LIMIT 5
      `);

      // 7. Tổng hợp nhanh – bổ sung totalProducts
      const [[summary]] = await db.query(`
        SELECT
          COALESCE(SUM(CASE WHEN trangthaidonhang = 'hoanthanh' THEN tongtien ELSE 0 END), 0) as totalRevenue,
          COUNT(*) as totalOrders,
          COUNT(DISTINCT manguoidung) as totalUsers
        FROM donhang
      `);
      const [[{ totalProducts }]] = await db.query(`SELECT COUNT(*) as totalProducts FROM sanpham`);

      res.json({
        revenueByDay:   fillNgay(rawDay),
        revenueByWeek:  fillTuan(rawWeek),
        revenueByMonth: fillThang(rawMonth),
        revenueByYear:  fillNam(rawYear),
        bestSellers,
        slowSellers,
        summary: { ...summary, totalProducts }
      });
    } catch (error) {
      res.status(500).json({ message: "Không thể lấy số liệu thống kê.", error: error.message });
    }
  },

  // ─── Nhập thêm hàng: cập nhật cho biến thể hoặc sản phẩm mặc định ──
  async nhapHang(req, res) {
    const { maluachon } = req.params;
    const { soLuongNhap } = req.body;
    if (!soLuongNhap || isNaN(soLuongNhap) || Number(soLuongNhap) <= 0) {
      return res.status(400).json({ message: "Số lượng nhập phải là số dương." });
    }
    try {
      if (String(maluachon).startsWith("sp-")) {
        // Sản phẩm mặc định (không có biến thể) → cập nhật bảng tonkho
        const masanpham = Number(maluachon.replace("sp-", ""));
        await db.query(
          `INSERT INTO tonkho (masanpham, soluongton, soluongtoithieu)
           VALUES (?, ?, 5)
           ON DUPLICATE KEY UPDATE soluongton = soluongton + ?`,
          [masanpham, Number(soLuongNhap), Number(soLuongNhap)]
        );
        const [[row]] = await db.query(
          `SELECT soluongton FROM tonkho WHERE masanpham = ?`,
          [masanpham]
        );
        return res.json({ message: "Nhập hàng thành công!", soluongtonMoi: row ? row.soluongton : Number(soLuongNhap) });
      } else {
        // Sản phẩm có biến thể → cập nhật bảng luachon_sanpham
        await db.query(
          `UPDATE luachon_sanpham SET soluongton = soluongton + ? WHERE maluachon = ?`,
          [Number(soLuongNhap), Number(maluachon)]
        );
        // Lấy masanpham để cập nhật bảng tonkho tổng
        const [[variantRow]] = await db.query(
          `SELECT masanpham FROM luachon_sanpham WHERE maluachon = ?`,
          [Number(maluachon)]
        );
        if (variantRow) {
          await db.query(
            `INSERT INTO tonkho (masanpham, soluongton, soluongtoithieu)
             VALUES (?, ?, 5)
             ON DUPLICATE KEY UPDATE soluongton = soluongton + ?`,
            [variantRow.masanpham, Number(soLuongNhap), Number(soLuongNhap)]
          );
        }
        const [[row]] = await db.query(
          `SELECT soluongton FROM luachon_sanpham WHERE maluachon = ?`,
          [Number(maluachon)]
        );
        if (!row) return res.status(404).json({ message: "Không tìm thấy biến thể này." });
        return res.json({ message: "Nhập hàng thành công!", soluongtonMoi: row.soluongton });
      }
    } catch (error) {
      res.status(500).json({ message: "Lỗi nhập hàng.", error: error.message });
    }
  }
};


module.exports = AdminController;
