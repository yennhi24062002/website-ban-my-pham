// Component hiển thị badge phương thức thanh toán
// Dùng trong bảng quản lý đơn hàng của admin
function NhanThanhToan({ pt }) {
  if (pt === "tienmat") return <span style={{ color: "#856404" }}>Tiền mặt</span>;
  if (pt === "qrcode") return <span style={{ color: "#0c5460" }}>QR Code</span>;
  if (pt === "banking") return <span style={{ color: "#155724" }}>Chuyển khoản</span>;
  return <span>{pt}</span>;
}

export default NhanThanhToan;
