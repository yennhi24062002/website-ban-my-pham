# 📘 TÀI LIỆU CÂU HỎI & LUỒNG XỬ LÝ 20 CHỨC NĂNG NGHIỆP VỤ (HỌC BẢO VỆ ĐỒ ÁN)

**Đề tài:** Website Bán Mỹ Phẩm Tự Động (ReactJS + Node.js Express + MySQL)  
**Sinh viên thực hiện:** Phạm Yến Nhi — MSSV: DH52201160  
**Giảng viên hướng dẫn:** ThS. Hà Văn Tùng  

---

## 💡 HƯỚNG DẪN HỌC BẢO VỆ TRONG 10 PHÚT
File này được biên soạn **dạng Hỏi - Đáp siêu súc tích**, kết hợp vị trí **Slide báo vệ** và **File code chính xác**. Khi Giảng viên hỏi tới chức năng nào, bạn chỉ cần trả lời câu **👉 Trả lời ngắn gọn** 1-2 câu trôi chảy dưới đây!

---

# PHẦN I: 20 CÂU HỎI TRẢ LỜI LUỒNG NGHIỆP VỤ (CÓ CHỈ RÕ SLIDE & CODE)

---

### ❓ Câu 1: Em hãy trình bày luồng Đăng ký & Đăng nhập tài khoản?
👉 **Trả lời ngắn gọn:** Khách nhập Email & Mật khẩu tại Modal `LoginForm.js` ➔ React gọi POST `/api/auth/login` ➔ Backend `auth.controller.js` chạy SQL kiểm tra tài khoản và dùng `bcrypt.compare()` đối chiếu mật khẩu ➔ Mật khẩu đúng, Backend trả về mã JWT Token lưu tại `localStorage` trình duyệt để duy trì đăng nhập.
📌 **Nằm ở Slide:** Slide 6 (Mô hình 3 lớp) & Slide 7 (Chức năng Khách hàng)
📂 **File code chính:** Frontend: `LoginForm.js` | Backend: `auth.controller.js` | Bảng SQL: `nguoidung`, `vaitro`

---

### ❓ Câu 2: Em hãy trình bày luồng Quản lý Hồ sơ cá nhân & Đổi mật khẩu?
👉 **Trả lời ngắn gọn:** Khách nhập thông tin mới tại `CustomerArea.js` ➔ React gửi PUT `/api/customers/:id` ➔ Backend `customer.controller.js` dùng `bcrypt.hash()` băm mật khẩu mới ➔ Chạy SQL `UPDATE nguoidung` và trả thông báo cập nhật thành công về giao diện.
📌 **Nằm ở Slide:** Slide 7 (Chức năng Khách hàng)
📂 **File code chính:** Frontend: `CustomerArea.js` | Backend: `customer.controller.js` | Bảng SQL: `nguoidung`

---

### ❓ Câu 3: Em hãy trình bày luồng Xem danh sách sản phẩm & Lọc tìm kiếm tức thì?
👉 **Trả lời ngắn gọn:** `AppContext.js` khởi chạy tự động gọi API `GET /api/products` ➔ Backend `product.controller.js` chạy SQL JOIN liên bảng ➔ Khi khách gõ từ khóa hoặc chọn danh mục, hàm `useMemo` lọc mảng sản phẩm tức thì trong 0.01 giây mà không bị reload trang.
📌 **Nằm ở Slide:** Slide 7 (Chức năng Khách hàng)
📂 **File code chính:** Frontend: `ProductList.js`, `AppContext.js` | Backend: `product.controller.js` | Bảng SQL: `sanpham`, `danhmuc`

---

### ❓ Câu 4: Em hãy trình bày luồng Chi tiết sản phẩm & Chọn màu son (MAC / 3CE)?
👉 **Trả lời ngắn gọn:** Khách xem sản phẩm ➔ React gọi `GET /api/products/:id` ➔ Backend trả mảng các màu son từ bảng `luachon_sanpham` ➔ Khách bấm chọn màu "Russian Red", giao diện tự động cập nhật số lượng tồn kho khả dụng và giá tiền riêng của màu đó.
📌 **Nằm ở Slide:** Slide 7 (Chức năng Khách hàng)
📂 **File code chính:** Frontend: `ProductDetail.js` | Backend: `product.controller.js` | Bảng SQL: `luachon_sanpham`

---

### ❓ Câu 5: Em hãy trình bày luồng Thêm vào Giỏ hàng & Đồng bộ LocalStorage?
👉 **Trả lời ngắn gọn:** Bấm "Thêm vào giỏ" tại `ProductDetail.js` ➔ Gọi hàm `themVaoGio()` trong `AppContext.js` kiểm tra tồn kho ➔ Đủ hàng thì cập nhật State `gioHang` và lưu mảng giỏ vào `localStorage.setItem('cart', ...)` để giữ nguyên mặt hàng khi tắt trình duyệt.
📌 **Nằm ở Slide:** Slide 8 (Chức năng Khách hàng - Giỏ hàng & Thanh toán)
📂 **File code chính:** Frontend: `AppContext.js`, `Header.js` | Backend: `cart.controller.js` | Bảng SQL: `giohang`

---

### ❓ Câu 6: Em hãy trình bày luồng Sổ địa chỉ giao hàng & Đặt mặc định?
👉 **Trả lời ngắn gọn:** Mở khung đặt hàng ➔ React gọi `GET /api/customers/:id` ➔ Backend đọc danh sách từ bảng `diachi` ➔ React lọc địa chỉ nào có `macdinh = 1` để tự động điền sẵn Họ tên, SĐT và Địa chỉ vào Form.
📌 **Nằm ở Slide:** Slide 8 (Chức năng Khách hàng - Giỏ hàng & Thanh toán)
📂 **File code chính:** Frontend: `CustomerArea.js` | Backend: `customer.controller.js` | Bảng SQL: `diachi`

---

### ❓ Câu 7: Em hãy trình bày luồng Đặt hàng, Tính giá giảm & Trừ tồn kho?
👉 **Trả lời ngắn gọn:** Khách bấm "Xác nhận đặt hàng" ➔ React gửi POST `/api/orders` ➔ Backend `order.controller.js` mở Transaction, đọc đơn giá đã giảm `const donGia = item.dongia` lưu vào `chitietdonhang` ➔ Chạy 3 câu SQL UPDATE trừ kho tự động ➔ Commit đơn hàng và kích hoạt gửi Email xác nhận.
📌 **Nằm ở Slide:** Slide 8 (Chức năng Khách hàng - Giỏ hàng & Thanh toán)
📂 **File code chính:** Frontend: `CustomerArea.js` | Backend: `order.controller.js` | Bảng SQL: `donhang`, `chitietdonhang`, `tonkho`

---

### ❓ Câu 8: Em hãy trình bày luồng Thanh toán QR Code VietQR & Giả lập Demo?
👉 **Trả lời ngắn gọn:** Khách chọn phương thức QR ➔ `ThanhToanQR.js` nhúng link VietQR API hiển thị mã QR động ➔ Bấm "Giả lập thanh toán" gửi flag `isDemo: true` về Backend `order.controller.js` ➔ Backend tự sinh mã giao dịch `QR<TIMESTAMP>` và ghi nhận trạng thái đã thanh toán.
📌 **Nằm ở Slide:** Slide 8 (Chức năng Khách hàng - Giỏ hàng & Thanh toán)
📂 **File code chính:** Frontend: `ThanhToanQR.js` | Backend: `order.controller.js` | Bảng SQL: `thanhtoan`

---

### ❓ Câu 9: Em hãy trình bày luồng Thanh toán Tiền mặt khi nhận hàng (COD)?
👉 **Trả lời ngắn gọn:** Khách chọn thanh toán tiền mặt ➔ React gửi request tới API `/api/orders` lưu đơn vào CSDL với phương thức `tienmat` và trạng thái `chuathanhtoan` ➔ Khách sẽ trả tiền trực tiếp cho Shipper khi giao hàng.
📌 **Nằm ở Slide:** Slide 8 (Chức năng Khách hàng - Giỏ hàng & Thanh toán)
📂 **File code chính:** Frontend: `ThanhToanTienMat.js` | Backend: `order.controller.js` | Bảng SQL: `thanhtoan`

---

### ❓ Câu 10: Em hãy trình bày luồng Mã Voucher Serial độc nhất (`[VC-KH01-0001]`)?
👉 **Trả lời ngắn gọn:** Mở đặt hàng ➔ React gọi API `GET /api/vouchers/user/:id` hiển thị các mã voucher có `sudung = 0` ➔ Sau khi chốt đơn thành công, Backend cập nhật `UPDATE voucher_nguoidung SET sudung = 1` ➔ Mã voucher tự động biến mất khỏi dropdown của khách (Kịch bản `TC-EX-02`).
📌 **Nằm ở Slide:** Slide 8 (Chức năng Khách hàng - Giỏ hàng & Thanh toán)
📂 **File code chính:** Frontend: `CustomerArea.js` | Backend: `voucher.controller.js` | Bảng SQL: `voucher_nguoidung`

---

### ❓ Câu 11: Em hãy trình bày luồng Gửi Email xác nhận đơn hàng tự động?
👉 **Trả lời ngắn gọn:** Ngay khi commit đơn hàng thành công ➔ Backend đọc email khách ➔ Gọi hàm `sendOrderConfirmationEmail()` trong `server/utils/email.js` ➔ Nodemailer mở kết nối Gmail SMTP cổng 465 SSL phát thư HTML chứa hóa đơn tới Inbox khách trong 1-2 giây.
📌 **Nằm ở Slide:** Slide 8 (Chức năng Khách hàng - Giỏ hàng & Thanh toán)
📂 **File code chính:** File gửi mail Backend: `server/utils/email.js`

---

### ❓ Câu 12: Em hãy trình bày luồng Xem & In Hóa đơn điện tử chuẩn Unicode?
👉 **Trả lời ngắn gọn:** Khách bấm "Xem hóa đơn" tại đơn hàng ➔ React gọi `GET /api/orders/:id/invoice` ➔ Modal `ModalXemHoaDon.js` hiển thị chi tiết ➔ Bấm "In hóa đơn" kích hoạt hàm `window.print()` in trực tiếp ra giấy chuẩn font tiếng Việt.
📌 **Nằm ở Slide:** Slide 8 (Chức năng Khách hàng - Giỏ hàng & Thanh toán)
📂 **File code chính:** Frontend: `CustomerArea.js` | Backend: `order.controller.js`

---

### ❓ Câu 13: Em hãy trình bày luồng Theo dõi Lịch sử đơn hàng & Tiến trình?
👉 **Trả lời ngắn gọn:** Khách vào tab Lịch sử đơn hàng ➔ React gọi `GET /api/orders/user/:id` ➔ Backend đọc bảng `donhang` và `lichsutrangthaidon` ➔ Trả mảng đơn hàng kèm tiến trình thời gian thực (`ChoXacNhan ➔ DangGiao ➔ HoanThanh`) về hiển thị.
📌 **Nằm ở Slide:** Slide 8 (Chức năng Khách hàng - Giỏ hàng & Thanh toán)
📂 **File code chính:** Frontend: `CustomerArea.js` | Backend: `order.controller.js` | Bảng SQL: `lichsutrangthaidon`

---

### ❓ Câu 14: Em hãy trình bày luồng Yêu cầu Trả hàng & Hoàn kho tự động?
👉 **Trả lời ngắn gọn:** Khách gửi yêu cầu trả hàng ➔ Lưu dòng mới vào bảng `yeucautranhang` ➔ Admin nhận được hàng bấm "Xác nhận đã nhận hàng" (PUT `/api/returns/:id/confirm-received`) ➔ Backend `return.controller.js` chạy 3 câu SQL UPDATE cộng hoàn lại tồn kho cho sản phẩm.
📌 **Nằm ở Slide:** Slide 9 (Chức năng Quản trị Admin)
📂 **File code chính:** Frontend: `CustomerArea.js` | Backend: `return.controller.js` | Bảng SQL: `yeucautranhang`, `tonkho`

---

### ❓ Câu 15: Em hãy trình bày luồng Chiến dịch Khuyến mãi Sale % theo sản phẩm?
👉 **Trả lời ngắn gọn:** Admin tạo đợt Sale giảm giá % tại `PromotionManagement.js` ➔ Backend lưu vào bảng `khuyenmai` ➔ Khi khách xem trang sản phẩm, SQL JOIN kiểm tra ngày hiệu lực ➔ Trả về `phantramgiam` ➔ React tự dán nhãn % đỏ và tính giá mới.
📌 **Nằm ở Slide:** Slide 9 (Chức năng Quản trị Admin)
📂 **File code chính:** Frontend: `PromotionManagement.js` | Backend: `khuyenmai.controller.js` | Bảng SQL: `khuyenmai`

---

### ❓ Câu 16: Em hãy trình bày luồng Thống kê Doanh thu & Lượt truy cập (Dashboard)?
👉 **Trả lời ngắn gọn:** Admin mở `Dashboard.js` ➔ Gọi `GET /api/stats/dashboard` ➔ Backend `stats.controller.js` tính tổng doanh thu (`WHERE trangthaidonhang = 'hoanthanh'`) và đọc biến RAM `globalVisitorCount++` ➔ Trả dữ liệu hiển thị lên 5 thẻ KPI thời gian thực.
📌 **Nằm ở Slide:** Slide 10 (Thống kê Doanh thu Dashboard)
📂 **File code chính:** Frontend: `Dashboard.js` | Backend: `stats.controller.js` | Bảng SQL: `donhang`

---

### ❓ Câu 17: Em hãy trình bày luồng Quản lý Tồn kho & Cảnh báo hết hàng?
👉 **Trả lời ngắn gọn:** Admin vào `InventoryManagement.js` ➔ Nếu số lượng tồn `<= soluongtoithieu`, dòng sản phẩm tự động đổi màu đỏ rực cảnh báo ➔ Admin nhập số lượng bổ sung và bấm Lưu để cập nhật lại CSDL.
📌 **Nằm ở Slide:** Slide 9 (Chức năng Quản trị Admin)
📂 **File code chính:** Frontend: `InventoryManagement.js` | Backend: `admin.controller.js` | Bảng SQL: `tonkho`

---

### ❓ Câu 18: Em hãy trình bày luồng Quản lý Danh mục & Thương hiệu Mỹ phẩm?
👉 **Trả lời ngắn gọn:** Admin nhập tên Danh mục hoặc Thương hiệu mới ➔ React phát POST `/api/categories` hoặc `/api/brands` ➔ Backend `category.controller.js` lưu vào bảng `danhmuc` hoặc `thuonghieu` ➔ Trang sản phẩm lập tức cập nhật bộ lọc mới.
📌 **Nằm ở Slide:** Slide 9 (Chức năng Quản trị Admin)
📂 **File code chính:** Frontend: `CategoryManagement.js`, `BrandManagement.js` | Backend: `category.controller.js` | Bảng SQL: `danhmuc`, `thuonghieu`

---

### ❓ Câu 19: Em hãy trình bày luồng Đánh giá Sản phẩm (Chấm 1 - 5 sao & Nhận xét)?
👉 **Trả lời ngắn gọn:** Khách chọn 1-5 sao và viết nhận xét tại `ProductDetail.js` ➔ Bấm "Gửi đánh giá" ➔ Backend `review.controller.js` kiểm tra khách đã mua đơn `hoanthanh` chưa ➔ Đúng điều kiện thì chèn dòng mới vào bảng `danhgia`.
📌 **Nằm ở Slide:** Slide 9 (Chức năng Quản trị Admin)
📂 **File code chính:** Frontend: `ProductDetail.js` | Backend: `review.controller.js` | Bảng SQL: `danhgia`

---

### ❓ Câu 20: Em hãy trình bày luồng Hỏi đáp Thắc mắc giữa Khách & Admin?
👉 **Trả lời ngắn gọn:** Khách gõ câu hỏi thắc mắc dưới sản phẩm ➔ Lưu vào bảng `hoidap` ➔ Admin vào trang quản lý thấy câu hỏi, gõ câu trả lời giải đáp ➔ Backend cập nhật cột `cautraloi` hiển thị công khai.
📌 **Nằm ở Slide:** Slide 9 (Chức năng Quản trị Admin)
📂 **File code chính:** Frontend: `ProductDetail.js` | Backend: `review.controller.js` | Bảng SQL: `hoidap`
