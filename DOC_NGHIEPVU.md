# 📚 BỘ BÍ KÍP BẢO VỆ ĐỒ ÁN (NGẮN GỌN & SIÊU DỄ HỌC)

**Đề tài:** Website Bán Mỹ Phẩm Tự Động (ReactJS + Node.js Express + MySQL)  
**Sinh viên thực hiện:** Phạm Yến Nhi — MSSV: DH52201160  

---

## 💡 HƯỚNG DẪN HỌC BẢO VỆ TRONG 10 PHÚT
File này được tóm tắt **cực kỳ ngắn gọn, sạch đẹp**, gỡ bỏ toàn bộ code rác phức tạp. Khi Thầy Cô hỏi chức năng nào, bạn chỉ cần đọc đúng **2 câu lời thoại bình dân** đã được chuẩn bị sẵn dưới đây.

---

# PHẦN I: 20 CHỨC NĂNG NGHIỆP VỤ (NÓI GÌ KHI BẢO VỆ?)

---

### 1. Đăng ký & Đăng nhập (JWT & Bcrypt)
- 💬 **Lời thoại nói với Thầy Cô:** *"Khách hàng đăng ký tài khoản thì mật khẩu được băm mã hóa bằng Bcrypt để bảo mật. Khi đăng nhập đúng, hệ thống trả về mã JWT Token lưu ở trình duyệt để duy trì phiên làm việc."*
- 📂 **Code nằm ở đâu:** Giao diện: `LoginForm.js` | Xử lý Backend: `auth.controller.js`

---

### 2. Quản lý Hồ sơ cá nhân & Đổi mật khẩu
- 💬 **Lời thoại nói với Thầy Cô:** *"Khách hàng có thể thay đổi Họ tên, Số điện thoại và Mật khẩu. Mật khẩu mới được tự động mã hóa băm Bcrypt trước khi lưu vào cơ sở dữ liệu."*
- 📂 **Code nằm ở đâu:** Giao diện: `CustomerArea.js` | Xử lý Backend: `customer.controller.js`

---

### 3. Xem danh sách sản phẩm & Lọc tìm kiếm tức thì
- 💬 **Lời thoại nói với Thầy Cô:** *"Hiển thị 16 sản phẩm mỹ phẩm kèm giá gốc và giá giảm. Khách hàng gõ từ khóa hoặc bấm chọn danh mục thì giao diện lọc sản phẩm tức thì trong 0.01 giây mà không bị reload trang."*
- 📂 **Code nằm ở đâu:** Giao diện: `ProductList.js`, `AppContext.js` | Xử lý Backend: `product.controller.js`

---

### 4. Chi tiết sản phẩm & Chọn màu son (MAC / 3CE)
- 💬 **Lời thoại nói với Thầy Cô:** *"Khách xem chi tiết công dụng, thành phần mỹ phẩm và bấm chọn màu son riêng biệt (như MAC Ruby Woo, Russian Red hay 3CE Denim). Giá tiền và số lượng tự động cập nhật theo màu son đó."*
- 📂 **Code nằm ở đâu:** Giao diện: `ProductDetail.js` | Xử lý Backend: `product.controller.js`

---

### 5. Thêm vào Giỏ hàng & Lưu LocalStorage
- 💬 **Lời thoại nói với Thầy Cô:** *"Khách chọn mặt hàng và thêm vào giỏ. Giỏ hàng được lưu tự động vào LocalStorage trình duyệt nên khi khách tắt web mở lại thì các món đồ vẫn còn nguyên."*
- 📂 **Code nằm ở đâu:** Giao diện: `AppContext.js`, `Header.js` | Xử lý Backend: `cart.controller.js`

---

### 6. Sổ địa chỉ giao hàng & Đặt mặc định
- 💬 **Lời thoại nói với Thầy Cô:** *"Khách hàng lưu nhiều địa chỉ nhận hàng và chọn 1 địa chỉ Mặc định. Khi đặt hàng, hệ thống tự động điền sẵn địa chỉ mặc định vào form cho khách."*
- 📂 **Code nằm ở đâu:** Giao diện: `CustomerArea.js` | Xử lý Backend: `customer.controller.js`

---

### 7. Đặt hàng & Tính đúng giá giảm
- 💬 **Lời thoại nói với Thầy Cô:** *"Khi khách bấm Xác nhận đặt hàng, hệ thống lưu hóa đơn tính đúng giá đã giảm %, tự động cập nhật trừ số lượng sản phẩm và gửi Email xác nhận tới hòm thư người mua."*
- 📂 **Code nằm ở đâu:** Giao diện: `CustomerArea.js` | Xử lý Backend: `order.controller.js`

---

### 8. Thanh toán QR Code VietQR & Nút Giả lập Demo
- 💬 **Lời thoại nói với Thầy Cô:** *"Khách chọn QR Code thì màn hình tự tạo mã VietQR động chứa số tiền và nội dung chuyển khoản. Em có làm thêm nút Giả lập thanh toán để phục vụ việc demo chấm bài dễ dàng."*
- 📂 **Code nằm ở đâu:** Giao diện: `ThanhToanQR.js` | Xử lý Backend: `order.controller.js`

---

### 9. Thanh toán Tiền mặt khi nhận hàng (COD)
- 💬 **Lời thoại nói với Thầy Cô:** *"Khách hàng chọn trả tiền mặt khi nhận hàng. Đơn hàng được tạo ở trạng thái chưa thanh toán, khách sẽ trả tiền trực tiếp cho shipper."*
- 📂 **Code nằm ở đâu:** Giao diện: `ThanhToanTienMat.js` | Xử lý Backend: `order.controller.js`

---

### 10. Mã Voucher Serial độc nhất (`[VC-KH01-0001]`)
- 💬 **Lời thoại nói với Thầy Cô:** *"Mỗi thẻ voucher cấp cho khách có mã Serial riêng biệt dạng [VC-KH01-0001]. Mỗi mã chỉ sử dụng đúng 1 lần, khi đặt hàng xong mã tự động biến mất khỏi dropdown."*
- 📂 **Code nằm ở đâu:** Giao diện: `CustomerArea.js` | Xử lý Backend: `voucher.controller.js`

---

### 11. Gửi Email xác nhận đơn hàng tự động (Gmail SSL 465)
- 💬 **Lời thoại nói với Thầy Cô:** *"Ngay khi đặt đơn thành công, Backend tự động sử dụng dịch vụ Gmail SMTP cổng 465 SSL để phát một Email xác nhận chứa đầy đủ hóa đơn tới hòm thư của khách."*
- 📂 **Code nằm ở đâu:** File gửi mail: `server/utils/email.js`

---

### 12. Xem & In Hóa đơn điện tử chuẩn Unicode
- 💬 **Lời thoại nói với Thầy Cô:** *"Khách hàng hoặc Admin bấm Xem hóa đơn để kiểm tra chi tiết đơn hàng và có thể bấm In hóa đơn ra giấy chuẩn tiếng Việt không bị lỗi font."*
- 📂 **Code nằm ở đâu:** Giao diện: `CustomerArea.js` | Xử lý Backend: `order.controller.js`

---

### 13. Theo dõi Lịch sử đơn hàng & Tiến trình
- 💬 **Lời thoại nói với Thầy Cô:** *"Khách vào trang cá nhân để xem lại danh sách các đơn đã đặt và theo dõi tiến trình đơn hàng theo thời gian thực từ Chờ xác nhận ➔ Đang giao ➔ Hoàn thành."*
- 📂 **Code nằm ở đâu:** Giao diện: `CustomerArea.js` | Xử lý Backend: `order.controller.js`

---

### 14. Yêu cầu Trả hàng & Hoàn kho tự động
- 💬 **Lời thoại nói với Thầy Cô:** *"Đơn giao thành công nếu có lỗi khách có thể gửi Yêu cầu trả hàng. Khi Admin nhận được hàng trả và bấm Xác nhận, hệ thống tự động hoàn lại số lượng tồn kho."*
- 📂 **Code nằm ở đâu:** Giao diện: `CustomerArea.js` | Xử lý Backend: `return.controller.js`

---

### 15. Chiến dịch Khuyến mãi Sale % theo sản phẩm
- 💬 **Lời thoại nói với Thầy Cô:** *"Admin tạo các chiến dịch Siêu Sale giảm giá % cho từng sản phẩm. Trang phía khách hàng sẽ tự động dán nhãn % giảm giá màu đỏ và tự tính giá mới."*
- 📂 **Code nằm ở đâu:** Giao diện: `PromotionManagement.js` | Xử lý Backend: `khuyenmai.controller.js`

---

### 16. Thống kê Doanh thu & Lượt truy cập (Dashboard)
- 💬 **Lời thoại nói với Thầy Cô:** *"Trang Dashboard Admin hiển thị 5 thẻ chỉ số: Tổng sản phẩm, Tổng khách hàng, Tổng đơn hàng, Tổng doanh thu đơn hoàn thành và Lượt truy cập ngầm thời gian thực trong RAM."*
- 📂 **Code nằm ở đâu:** Giao diện: `Dashboard.js` | Xử lý Backend: `stats.controller.js`

---

### 17. Quản lý Tồn kho & Cảnh báo hết hàng
- 💬 **Lời thoại nói với Thầy Cô:** *"Cho phép xem số lượng tồn kho của các mỹ phẩm. Sản phẩm nào số lượng còn ít sẽ hiển thị màu đỏ để nhắc nhở nhập hàng."*
- 📂 **Code nằm ở đâu:** Giao diện: `InventoryManagement.js` | Xử lý Backend: `admin.controller.js`

---

### 18. Quản lý Danh mục & Thương hiệu Mỹ phẩm
- 💬 **Lời thoại nói với Thầy Cô:** *"Admin có quyền Thêm, Sửa, Xóa các Danh mục sản phẩm (Chăm sóc da, Trang điểm) và Thương hiệu mỹ phẩm (Cocoon, Klairs, MAC, 3CE)."*
- 📂 **Code nằm ở đâu:** Giao diện: `CategoryManagement.js`, `BrandManagement.js` | Xử lý Backend: `category.controller.js`

---

### 19. Đánh giá Sản phẩm (Chấm 1 - 5 sao & Nhận xét)
- 💬 **Lời thoại nói với Thầy Cô:** *"Khách hàng mua hàng xong được quyền vào chấm từ 1 đến 5 sao và để lại nhận xét cảm nhận thực tế bên dưới sản phẩm."*
- 📂 **Code nằm ở đâu:** Giao diện: `ProductDetail.js` | Xử lý Backend: `review.controller.js`

---

### 20. Hỏi đáp Thắc mắc giữa Khách & Admin
- 💬 **Lời thoại nói với Thầy Cô:** *"Khách hàng có thể đặt câu hỏi thắc mắc dưới trang chi tiết sản phẩm và Admin có thể vào xem rồi gõ câu trả lời giải đáp trực tiếp."*
- 📂 **Code nằm ở đâu:** Giao diện: `ProductDetail.js` | Xử lý Backend: `review.controller.js`

---

# PHẦN II: 5 CÂU HỎI BẢO VỆ THƯỜNG GẶP (HỎI NẠO - TRẢ LỜI NGẮN)

### ❓ Câu 1: Em phân quyền Admin và Khách hàng như thế nào?
👉 **Trả lời ngắn:** Em phân quyền qua vai trò (Admin `vaitro = 1`, Khách `vaitro = 2`). Khi đăng nhập hệ thống tạo mã JWT Token. Các trang Admin đều có middleware kiểm tra Token, nếu không phải Admin sẽ bị chặn lại.

### ❓ Câu 2: Chức năng Thanh toán QR Code làm ở đâu?
👉 **Trả lời ngắn:** Giao diện viết tại `ThanhToanQR.js` nhúng link VietQR API tự tạo mã QR động chứa STK và số tiền. Em có làm thêm nút Giả lập thanh toán gửi flag `isDemo: true` về Backend để demo chấm bài nhanh chóng.

### ❓ Câu 3: Email xác nhận đơn hàng gửi như thế nào?
👉 **Trả lời ngắn:** Viết ở file `server/utils/email.js`. Sau khi chốt đơn thành công, Backend gọi thư viện Nodemailer kết nối qua Gmail SMTP cổng 465 SSL để phát email xác nhận tới hòm thư khách hàng.

### ❓ Câu 4: Mã Voucher Serial độc nhất hoạt động ra sao?
👉 **Trả lời ngắn:** Mỗi thẻ voucher có mã Serial riêng biệt dạng `[VC-KH01-0001]`. Khi đặt hàng thành công, hệ thống chuyển trạng thái đã sử dụng `sudung = 1` nên mã tự động biến mất khỏi danh sách.

### ❓ Câu 5: Doanh thu trên Dashboard tính như thế nào?
👉 **Trả lời ngắn:** Tính ở `stats.controller.js` bằng câu lệnh tính tổng số tiền các đơn hàng có trạng thái là Hoàn thành (`trangthaidonhang = 'hoanthanh'`).
