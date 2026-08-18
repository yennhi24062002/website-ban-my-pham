// Cấu hình địa chỉ gốc của API backend
// Dùng biến môi trường nếu có, mặc định là localhost khi phát triển
const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api";

export default API_BASE;
