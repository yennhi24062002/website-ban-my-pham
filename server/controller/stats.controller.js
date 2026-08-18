const db = require("../config/db");

// Biến lưu trữ lượt truy cập tạm thời (Lưu trong RAM, reset khi server restart)
// Trong đồ án thực tế có thể dùng DB, nhưng để nhanh và không cần sửa cấu trúc bảng thì dùng RAM
let globalVisitorCount = 1542; // Số giả lập ban đầu cho đẹp

const StatsController = {
  // Middleware đếm lượt truy cập
  trackVisitor(req, res, next) {
    globalVisitorCount++;
    next();
  },

  async getDashboardStats(req, res) {
    try {
      // Đếm tổng số sản phẩm
      const [productRows] = await db.query("SELECT COUNT(*) AS totalProducts FROM sanpham");
      const totalProducts = productRows[0].totalProducts || 0;

      // Đếm tổng số khách hàng (người dùng có mavaitro = khachhang)
      const [userRows] = await db.query(`
        SELECT COUNT(*) AS totalUsers 
        FROM nguoidung nd
        JOIN vaitro vt ON nd.mavaitro = vt.mavaitro
        WHERE vt.tenvaitro = 'khachhang'
      `);
      const totalUsers = userRows[0].totalUsers || 0;

      // Đếm tổng số đơn hàng
      const [orderRows] = await db.query("SELECT COUNT(*) AS totalOrders FROM donhang");
      const totalOrders = orderRows[0].totalOrders || 0;

      // Đếm tổng doanh thu (các đơn đã giao thành công / thanh toán)
      const [revenueRows] = await db.query("SELECT SUM(tongtien) AS totalRevenue FROM donhang WHERE trangthaidonhang = 'hoanthanh'");
      const totalRevenue = revenueRows[0].totalRevenue || 0;

      res.json({
        totalProducts,
        totalUsers,
        totalOrders,
        totalRevenue,
        totalVisitors: globalVisitorCount
      });
    } catch (error) {
      console.error("Lỗi lấy thống kê:", error);
      res.status(500).json({ message: "Lỗi server khi lấy thống kê" });
    }
  }
};

module.exports = StatsController;
