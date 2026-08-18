// Hàm tiện ích định dạng số tiền sang chuỗi tiền Việt Nam
// Ví dụ: 320000 → "320.000đ"
export function formatTien(soTien) {
  return new Intl.NumberFormat("vi-VN").format(Number(soTien) || 0) + "đ";
}
