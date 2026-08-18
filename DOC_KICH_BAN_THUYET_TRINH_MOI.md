# 🎤 KỊCH BẢN THUYẾT TRÌNH — WEBSITE BÁN MỸ PHẨM
**Sinh viên:** Phạm Yến Nhi — **MSSV:** DH52201160

---

## MỞ ĐẦU (1 phút)

> *"Kính thưa thầy cô và các bạn, em xin trình bày đề tài **'Xây dựng website bán mỹ phẩm'**.*
> *Website được xây dựng theo mô hình tách biệt Frontend – Backend với công nghệ React.js và Node.js.*
> *Hệ thống hỗ trợ đầy đủ luồng mua hàng từ đăng ký → xem sản phẩm → đặt hàng → thanh toán → theo dõi đơn → trả hàng."*

---

## PHẦN 1 — DEMO KHÁCH HÀNG (5-7 phút)

### 🔐 Bước 1: Đăng nhập
- Nhấn **"Đăng nhập"** → nhập email/mật khẩu.
- Hệ thống xác thực qua **JWT Token**, phân quyền tự động.
- **GV hỏi:** "Mật khẩu lưu thế nào?" → "Mật khẩu được mã hóa bằng **bcrypt**, không lưu dạng plaintext. Dù xem thẳng DB cũng không đọc được."

### 🛍️ Bước 2: Xem & Tìm kiếm sản phẩm
- Hiển thị **16 sản phẩm** chia theo danh mục: Chăm sóc da / Làm sạch / Chống nắng / Trang điểm.
- Gõ **"Son"** vào ô tìm kiếm → danh sách lọc tức thì.
- Gõ **"Cocoon"** → hiện tất cả sản phẩm Cocoon.
- **GV hỏi:** "Tìm kiếm cách nào?" → "Frontend dùng `useMemo` lọc trong mảng state, tìm khớp trong tên sản phẩm, mô tả, thương hiệu — không cần gọi API mỗi lần gõ."

### 📦 Bước 3: Xem chi tiết sản phẩm
- Click **"Son Lì MAC Ruby Woo"** → trang chi tiết mở ra.
- Chọn màu: **Ruby Woo / Russian Red / Diva** — giá hiển thị theo màu.
- Hiện đầy đủ: Ảnh sản phẩm, Mô tả, Thành phần, Hướng dẫn sử dụng.
- **GV hỏi:** "Biến thể lưu thế nào?" → "Bảng `luachon_sanpham` lưu từng màu sắc/dung tích riêng với `soluongton` và `giaban` độc lập."

### 🛒 Bước 4: Thêm vào giỏ & Đặt hàng
- Nhấn **"THÊM VÀO GIỎ HÀNG"** → thông báo xác nhận.
- Vào giỏ hàng → chọn voucher **HONGXINH500K** → giá giảm ngay.
- Điền thông tin giao hàng → chọn thanh toán **QR Code**.
- Nhấn **"Xác nhận đặt hàng"**.
- **GV hỏi:** "Tồn kho trừ lúc nào?" → "**Trừ ngay khi đặt hàng**, không cần đợi admin duyệt. Dùng `Transaction` + `FOR UPDATE` để tránh trùng lặp khi nhiều người đặt cùng lúc."

### 📧 Bước 5: Email xác nhận
- Sau khi đặt → hệ thống tự gửi **email HTML** xác nhận đơn hàng đến email khách.
- **GV hỏi:** "Gửi email qua gì?" → "Dùng thư viện **Nodemailer** kết nối Gmail qua App Password. Email gửi bất đồng bộ (`async`) không làm chậm response API."

### 📋 Bước 6: Lịch sử đơn hàng
- Vào tab **"Lịch sử đơn"** → xem tất cả đơn hàng.
- Click đơn → xem **Hóa đơn điện tử** chi tiết (Modal).
- Tab **"Voucher"** → hiển thị mã serial độc nhất từng voucher (`VC-YSI93J91`).
- **GV hỏi:** "Mã serial để làm gì?" → "Mỗi lần cấp voucher cho 1 khách tạo ra 1 `ma_serial` riêng, đảm bảo voucher được dùng đúng 1 lần và đúng người."

### 🔄 Bước 7: Trả hàng
- Vào đơn đã hoàn thành → nhấn **"Yêu cầu trả hàng"** → nhập lý do.
- Admin duyệt → xác nhận nhận hàng → **Tồn kho tự động được cộng trả lại**.
- **GV hỏi:** "Hoàn kho thế nào?" → "Khi admin xác nhận nhận hàng, code UPDATE cộng lại số lượng vào đồng thời 3 bảng: `tonkho`, `sanpham`, `luachon_sanpham`."

---

## PHẦN 2 — DEMO ADMIN (3-4 phút)

### 🔑 Đăng nhập Admin
- Email: **admin@hongxinh.com** / Password: **admin123**

### 📊 Dashboard & Thống kê
- Biểu đồ doanh thu 12 tháng, Top sản phẩm bán chạy.
- **GV hỏi:** "Dữ liệu thống kê lấy từ đâu?" → "Query từ bảng `donhang` và `chitietdonhang`, group by tháng/sản phẩm."

### 📦 Quản lý Đơn hàng
- Duyệt đơn: `choxacnhan` → `danggiao` → `hoanthanh`.
- Xem chi tiết đơn, lịch sử trạng thái.

### 🏷️ Quản lý Khuyến mãi
- Tạo chiến dịch giảm giá % cho sản phẩm.
- Cấp voucher cho khách → hệ thống sinh mã serial tự động.

### 📦 Quản lý Tồn kho
- Xem tồn kho tất cả sản phẩm.
- Cảnh báo sản phẩm sắp hết hàng.

---

## CÂU HỎI GV THƯỜNG HỎI & CÁCH TRẢ LỜI

| Câu hỏi | Trả lời ngắn gọn |
|---|---|
| Dùng công nghệ gì? | React.js (frontend) + Node.js/Express (backend) + MySQL/TiDB Cloud |
| Bảo mật mật khẩu? | bcrypt hash, không lưu plaintext |
| Token xác thực? | JWT Token, lưu localStorage, hết hạn 7 ngày |
| Tồn kho trừ khi nào? | Ngay khi đặt hàng (dùng Transaction + FOR UPDATE) |
| Nhiều người đặt cùng lúc? | FOR UPDATE khoá dòng tồn kho, tránh oversell |
| Email xác nhận? | Nodemailer + Gmail App Password, gửi async |
| Voucher mã serial? | Mỗi lần cấp sinh 1 ma_serial riêng, đảm bảo dùng đúng 1 lần |
| Trả hàng hoàn kho? | Admin confirmReceived → UPDATE 3 bảng: tonkho, sanpham, luachon_sanpham |
| Tìm kiếm cách nào? | useMemo lọc client-side theo tên, mô tả, thương hiệu |
| Deploy ở đâu? | Frontend: Vercel | Backend: Render.com | DB: TiDB Cloud |

---

## LƯU Ý THUYẾT TRÌNH

- ✅ Mở sẵn website trên Vercel trước khi vào phòng
- ✅ Đăng nhập sẵn tài khoản khách hàng
- ✅ Chuẩn bị sẵn 1 sản phẩm trong giỏ hàng
- ✅ Có sẵn voucher chưa dùng để demo
- ❌ Nếu email chưa gửi được → giải thích: "Chức năng email đã code hoàn chỉnh, cần cài thêm biến môi trường EMAIL_USER/EMAIL_PASS trên server Render"
