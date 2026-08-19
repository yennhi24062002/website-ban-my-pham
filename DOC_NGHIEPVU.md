# 📘 TÀI LIỆU CÂU HỎI, LUỒNG FILE & QUY TRÌNH NGHIỆP VỤ LUẬN VĂN (BẢO VỆ ĐỒ ÁN)

**Đề tài:** Website Bán Mỹ Phẩm Tự Động (ReactJS + Node.js Express + MySQL)  
**Sinh viên thực hiện:** Phạm Yến Nhi — MSSV: DH52201160  
**Giảng viên hướng dẫn:** ThS. Hà Văn Tùng  

---

## 💡 BẠN CÓ CẦN HỌC THUỘC SỐ DÒNG CODE KHÔNG?
- **KHÔNG NÊN VÀ KHÔNG CẦN HỌC THUỘC SỐ DÒNG!** Giảng viên không bắt bạn nhớ dòng 147 hay dòng 223.
- Khi Giảng viên bảo: *"Em mở code lên chỉ cho Thầy/Cô xem viết ở đâu?"*, bạn mở đúng file đó ra và chỉ đúng **Đoạn Code Cốt Lõi (xem trực tiếp bên dưới)** là hoàn hảo 100%!

---

# PHẦN I: 20 CÂU HỎI, LUỒNG FILE & ĐOẠN CODE CỐT LÕI

---

### ❓ Câu 1: Em hãy trình bày luồng Đăng ký & Đăng nhập tài khoản?
👉 **Trả lời ngắn gọn:** Khách nhập Email & Mật khẩu tại Modal `LoginForm.js` ➔ React gọi POST `/api/auth/login` ➔ Backend `auth.controller.js` kiểm tra tài khoản và dùng `bcrypt.compare()` đối chiếu mật khẩu ➔ Đúng mật khẩu, Backend trả về mã JWT Token lưu tại `localStorage` trình duyệt.  
🚀 **Luồng di chuyển File:** `LoginForm.js` ➔ `POST /api/auth/login` ➔ `auth.controller.js` ➔ Bảng SQL `nguoidung`  
💻 **Đoạn Code cốt lõi (`auth.controller.js` Dòng 45-60):**
```javascript
const isMatch = await bcrypt.compare(matkhau, user.matkhau);
const token = jwt.sign({ id: user.manguoidung, role: user.mavaitro }, SECRET_KEY);
res.json({ message: "Dang nhap thanh cong", token, user });
```
📌 **Nằm ở Slide:** Slide 6 & Slide 7  

---

### ❓ Câu 2: Em hãy trình bày luồng Quản lý Hồ sơ cá nhân & Đổi mật khẩu?
👉 **Trả lời ngắn gọn:** Khách nhập thông tin mới tại `CustomerArea.js` ➔ React gửi PUT `/api/customers/:id` ➔ Backend `customer.controller.js` dùng `bcrypt.hash()` băm mật khẩu mới ➔ Chạy SQL `UPDATE nguoidung` và trả thông báo cập nhật thành công.  
🚀 **Luồng di chuyển File:** `CustomerArea.js` ➔ `PUT /api/customers/:id` ➔ `customer.controller.js` ➔ Bảng SQL `nguoidung`  
💻 **Đoạn Code cốt lõi (`customer.controller.js` Dòng 30-45):**
```javascript
const hashedPassword = await bcrypt.hash(matkhauMoi, 10);
await db.query("UPDATE nguoidung SET hoten=?, sodienthoai=?, matkhau=? WHERE manguoidung=?", 
  [hoten, sodienthoai, hashedPassword, id]);
```
📌 **Nằm ở Slide:** Slide 7  

---

### ❓ Câu 3: Em hãy trình bày luồng Xem danh sách sản phẩm & Lọc tìm kiếm tức thì?
👉 **Trả lời ngắn gọn:** `AppContext.js` khởi chạy tự động gọi API `GET /api/products` ➔ Backend `product.controller.js` chạy SQL JOIN liên bảng ➔ Khi khách gõ từ khóa, hàm `useMemo` lọc mảng sản phẩm tức thì trong 0.01s không bị reload trang.  
🚀 **Luồng di chuyển File:** `AppContext.js` & `ProductList.js` ➔ `GET /api/products` ➔ `product.controller.js` ➔ Bảng SQL `sanpham`, `danhmuc`  
💻 **Đoạn Code cốt lõi (`AppContext.js` Dòng 105-120):**
```javascript
const filteredProducts = useMemo(() => {
  return sanPhams.filter(item => item.tensanpham.toLowerCase().includes(searchTerm.toLowerCase()));
}, [sanPhams, searchTerm]);
```
📌 **Nằm ở Slide:** Slide 7  

---

### ❓ Câu 4: Em hãy trình bày luồng Chi tiết sản phẩm & Chọn màu son (MAC / 3CE)?
👉 **Trả lời ngắn gọn:** Khách xem sản phẩm ➔ React gọi `GET /api/products/:id` ➔ Backend trả mảng các màu son từ bảng `luachon_sanpham` ➔ Bấm chọn màu "Russian Red", giao diện tự động cập nhật số lượng tồn kho khả dụng và giá tiền riêng của màu đó.  
🚀 **Luồng di chuyển File:** `ProductDetail.js` ➔ `GET /api/products/:id` ➔ `product.controller.js` ➔ Bảng SQL `luachon_sanpham`  
💻 **Đoạn Code cốt lõi (`ProductDetail.js` Dòng 85-95):**
```javascript
const handleSelectColor = (variant) => {
  setSelectedVariant(variant);
  setStock(variant.soluongton);
  setPrice(variant.giaban);
};
```
📌 **Nằm ở Slide:** Slide 7  

---

### ❓ Câu 5: Em hãy trình bày luồng Thêm vào Giỏ hàng & Đồng bộ LocalStorage?
👉 **Trả lời ngắn gọn:** Bấm "Thêm vào giỏ" tại `ProductDetail.js` ➔ Gọi hàm `themVaoGio()` trong `AppContext.js` kiểm tra tồn kho ➔ Đủ hàng thì cập nhật State `gioHang` và lưu mảng giỏ vào `localStorage.setItem('cart', ...)` để giữ nguyên mặt hàng khi tắt trình duyệt.  
🚀 **Luồng di chuyển File:** `ProductDetail.js` ➔ `AppContext.js` ➔ `localStorage` trình duyệt  
💻 **Đoạn Code cốt lõi (`AppContext.js` Dòng 175-185):**
```javascript
const updatedCart = [...gioHang, newItem];
setGioHang(updatedCart);
localStorage.setItem('cart', JSON.stringify(updatedCart));
```
📌 **Nằm ở Slide:** Slide 8  

---

### ❓ Câu 6: Em hãy trình bày luồng Sổ địa chỉ giao hàng & Đặt mặc định?
👉 **Trả lời ngắn gọn:** Mở khung đặt hàng ➔ React gọi `GET /api/customers/:id` ➔ Backend đọc danh sách từ bảng `diachi` ➔ React lọc địa chỉ nào có `macdinh = 1` để tự động điền sẵn Họ tên, SĐT và Địa chỉ vào Form.  
🚀 **Luồng di chuyển File:** `CustomerArea.js` ➔ `GET /api/customers/:id` ➔ `customer.controller.js` ➔ Bảng SQL `diachi`  
💻 **Đoạn Code cốt lõi (`CustomerArea.js` Dòng 70-80):**
```javascript
const defaultAddr = addresses.find(item => item.macdinh === 1);
if (defaultAddr) setShippingInfo(defaultAddr);
```
📌 **Nằm ở Slide:** Slide 8  

---

### ❓ Câu 7: Em hãy trình bày luồng Đặt hàng, Tính giá giảm & Trừ tồn kho?
👉 **Trả lời ngắn gọn:** Khách bấm "Xác nhận đặt hàng" ➔ React gửi POST `/api/orders` ➔ Backend `order.controller.js` mở Transaction, đọc đơn giá đã giảm `const donGia = item.dongia` lưu vào `chitietdonhang` ➔ Chạy 3 câu SQL UPDATE trừ kho tự động ➔ Commit đơn hàng và kích hoạt gửi Email xác nhận.  
🚀 **Luồng di chuyển File:** `CustomerArea.js` ➔ `POST /api/orders` ➔ `order.controller.js` ➔ `email.js` ➔ Bảng SQL `donhang`, `chitietdonhang`, `tonkho`  
💻 **Đoạn Code cốt lõi (`order.controller.js` Dòng 186-225):**
```javascript
// Khóa dòng chống bị âm kho:
SELECT * FROM luachon_sanpham WHERE maluachon = ? FOR UPDATE;
// Trừ kho tự động:
UPDATE luachon_sanpham SET soluongton = GREATEST(soluongton - ?, 0) WHERE maluachon = ?;
UPDATE tonkho SET soluongton = GREATEST(soluongton - ?, 0) WHERE masanpham = ?;
```
📌 **Nằm ở Slide:** Slide 8  

---

### ❓ Câu 8: Em hãy trình bày luồng Thanh toán QR Code VietQR & Giả lập Demo?
👉 **Trả lời ngắn gọn:** Khách chọn phương thức QR ➔ `ThanhToanQR.js` nhúng link VietQR API hiển thị mã QR động ➔ Bấm "Giả lập thanh toán" gửi flag `isDemo: true` về Backend `order.controller.js` ➔ Backend tự sinh mã giao dịch `QR<TIMESTAMP>` và ghi nhận trạng thái đã thanh toán.  
🚀 **Luồng di chuyển File:** `ThanhToanQR.js` ➔ `POST /api/orders` (kèm `isDemo: true`) ➔ `order.controller.js` ➔ Bảng SQL `thanhtoan`  
💻 **Đoạn Code cốt lõi (`ThanhToanQR.js` Dòng 36-44 & `order.controller.js` Dòng 147):**
```javascript
// Mã QR động VietQR API:
https://img.vietqr.io/image/VCB-1017833075-compact2.png?amount=${tongtien}&addInfo=${noiDung}
// Backend Giả lập Demo:
if (isDemo) { trangthaithanhtoan = "dathanhtoan"; }
```
📌 **Nằm ở Slide:** Slide 8  

---

### ❓ Câu 9: Em hãy trình bày luồng Thanh toán Tiền mặt khi nhận hàng (COD)?
👉 **Trả lời ngắn gọn:** Khách chọn thanh toán tiền mặt ➔ React gửi request tới API `/api/orders` lưu đơn vào CSDL với phương thức `tienmat` và trạng thái `chuathanhtoan` ➔ Khách sẽ trả tiền trực tiếp cho Shipper khi giao hàng.  
🚀 **Luồng di chuyển File:** `ThanhToanTienMat.js` ➔ `POST /api/orders` ➔ `order.controller.js` ➔ Bảng SQL `thanhtoan`  
💻 **Đoạn Code cốt lõi (`order.controller.js` Dòng 150-160):**
```javascript
const phuongthuc = req.body.paymentMethod || 'tienmat';
const trangthaithanhtoan = 'chuathanhtoan';
```
📌 **Nằm ở Slide:** Slide 8  

---

### ❓ Câu 10: Em hãy trình bày luồng Mã Voucher Serial độc nhất (`[VC-KH01-0001]`)?
👉 **Trả lời ngắn gọn:** Mở đặt hàng ➔ React gọi API `GET /api/vouchers/user/:id` hiển thị các mã voucher có `sudung = 0` ➔ Sau khi chốt đơn thành công, Backend cập nhật `UPDATE voucher_nguoidung SET sudung = 1` ➔ Mã voucher tự động biến mất khỏi dropdown của khách (Kịch bản `TC-EX-02`).  
🚀 **Luồng di chuyển File:** `CustomerArea.js` ➔ `GET /api/vouchers` & `POST /api/orders` ➔ `voucher.controller.js` & `order.controller.js` ➔ Bảng SQL `voucher_nguoidung`  
💻 **Đoạn Code cốt lõi (`order.controller.js` Dòng 280-290):**
```sql
UPDATE voucher_nguoidung SET sudung = 1 WHERE mavoucher_nd = ?;
```
📌 **Nằm ở Slide:** Slide 8  

---

### ❓ Câu 11: Em hãy trình bày luồng Gửi Email xác nhận đơn hàng tự động?
👉 **Trả lời ngắn gọn:** Ngay khi commit đơn hàng thành công ➔ Backend đọc email khách ➔ Gọi hàm `sendOrderConfirmationEmail()` trong `server/utils/email.js` ➔ Nodemailer mở kết nối Gmail SMTP cổng 465 SSL phát thư HTML chứa hóa đơn tới Inbox khách trong 1-2 giây.  
🚀 **Luồng di chuyển File:** `CustomerArea.js` ➔ `POST /api/orders` ➔ `order.controller.js` ➔ `server/utils/email.js`  
💻 **Đoạn Code cốt lõi (`server/utils/email.js` Dòng 127-149):**
```javascript
const transporter = nodemailer.createTransport({ host: "smtp.gmail.com", port: 465, secure: true, auth: { user: EMAIL_USER, pass: EMAIL_PASS } });
await transporter.sendMail({ from: EMAIL_USER, to: targetMail, subject: `Xac nhan don hang #${madonhang}`, html: emailContent });
```
📌 **Nằm ở Slide:** Slide 8  

---

### ❓ Câu 12: Em hãy trình bày luồng Xem & In Hóa đơn điện tử chuẩn Unicode?
👉 **Trả lời ngắn gọn:** Khách bấm "Xem hóa đơn" tại đơn hàng ➔ React gọi `GET /api/orders/:id/invoice` ➔ Modal `ModalXemHoaDon.js` hiển thị chi tiết ➔ Bấm "In hóa đơn" kích hoạt hàm `window.print()` in trực tiếp ra giấy chuẩn font tiếng Việt.  
🚀 **Luồng di chuyển File:** `CustomerArea.js` ➔ `GET /api/orders/:id/invoice` ➔ `order.controller.js` ➔ `window.print()`  
💻 **Đoạn Code cốt lõi (`CustomerArea.js` Dòng 250-255):**
```javascript
const handlePrintInvoice = () => {
  window.print();
};
```
📌 **Nằm ở Slide:** Slide 8  

---

### ❓ Câu 13: Em hãy trình bày luồng Theo dõi Lịch sử đơn hàng & Tiến trình?
👉 **Trả lời ngắn gọn:** Khách vào tab Lịch sử đơn hàng ➔ React gọi `GET /api/orders/user/:id` ➔ Backend đọc bảng `donhang` và `lichsutrangthaidon` ➔ Trả mảng đơn hàng kèm tiến trình thời gian thực (`ChoXacNhan ➔ DangGiao ➔ HoanThanh`) về hiển thị.  
🚀 **Luồng di chuyển File:** `CustomerArea.js` ➔ `GET /api/orders/user/:id` ➔ `order.controller.js` ➔ Bảng SQL `lichsutrangthaidon`  
💻 **Đoạn Code cốt lõi (`CustomerArea.js` Dòng 590-600):**
```javascript
<span className={`badge ${order.trangthaidonhang}`}>
  {order.trangthaidonhang === 'ChoXacNhan' ? 'Chờ xác nhận' : 'Đã hoàn thành'}
</span>
```
📌 **Nằm ở Slide:** Slide 8  

---

### ❓ Câu 14: Em hãy trình bày luồng Yêu cầu Trả hàng & Hoàn kho tự động?
👉 **Trả lời ngắn gọn:** Khách gửi yêu cầu trả hàng ➔ Lưu dòng mới vào bảng `yeucautranhang` ➔ Admin nhận được hàng bấm "Xác nhận đã nhận hàng" ➔ Backend `return.controller.js` chạy 3 câu SQL UPDATE cộng hoàn lại tồn kho cho sản phẩm.  
🚀 **Luồng di chuyển File:** `CustomerArea.js` ➔ `POST /api/returns` & `PUT /api/returns/:id/confirm-received` ➔ `return.controller.js` ➔ Bảng SQL `tonkho`  
💻 **Đoạn Code cốt lõi (`return.controller.js` Dòng 115-130):**
```sql
UPDATE tonkho SET soluongton = soluongton + ? WHERE masanpham = ?;
UPDATE sanpham SET soluongton = soluongton + ? WHERE masanpham = ?;
UPDATE luachon_sanpham SET soluongton = soluongton + ? WHERE maluachon = ?;
```
📌 **Nằm ở Slide:** Slide 9  

---

### ❓ Câu 15: Em hãy trình bày luồng Chiến dịch Khuyến mãi Sale % theo sản phẩm?
👉 **Trả lời ngắn gọn:** Admin tạo đợt Sale giảm giá % tại `PromotionManagement.js` ➔ Backend lưu vào bảng `khuyenmai` ➔ Khi khách xem trang sản phẩm, SQL JOIN kiểm tra ngày hiệu lực ➔ Trả về `phantramgiam` ➔ React tự dán nhãn % đỏ và tính giá mới.  
🚀 **Luồng di chuyển File:** `PromotionManagement.js` ➔ `POST /api/promotions` ➔ `khuyenmai.controller.js` ➔ Bảng SQL `khuyenmai`  
💻 **Đoạn Code cốt lõi (`ProductList.js` Dòng 45-55):**
```javascript
const giaSale = item.phantramgiam > 0 ? item.giaban * (1 - item.phantramgiam / 100) : item.giaban;
```
📌 **Nằm ở Slide:** Slide 9  

---

### ❓ Câu 16: Em hãy trình bày luồng Thống kê Doanh thu & Lượt truy cập (Dashboard)?
👉 **Trả lời ngắn gọn:** Admin mở `Dashboard.js` ➔ Gọi `GET /api/stats/dashboard` ➔ Backend `stats.controller.js` tính tổng doanh thu (`WHERE trangthaidonhang = 'hoanthanh'`) và đọc biến RAM `globalVisitorCount++` ➔ Trả dữ liệu hiển thị lên 5 thẻ KPI thời gian thực.  
🚀 **Luồng di chuyển File:** `Dashboard.js` ➔ `GET /api/stats/dashboard` ➔ `stats.controller.js` ➔ Bảng SQL `donhang` & RAM  
💻 **Đoạn Code cốt lõi (`stats.controller.js` Dòng 10-35):**
```javascript
// Middleware đếm traffic ngầm RAM:
globalVisitorCount++;
// SQL Doanh thu đơn hoàn thành:
SELECT SUM(tongtien) AS totalRevenue FROM donhang WHERE trangthaidonhang = 'hoanthanh';
```
📌 **Nằm ở Slide:** Slide 10  

---

### ❓ Câu 17: Em hãy trình bày luồng Quản lý Tồn kho & Cảnh báo hết hàng?
👉 **Trả lời ngắn gọn:** Admin vào `InventoryManagement.js` ➔ Nếu số lượng tồn `<= soluongtoithieu`, dòng sản phẩm tự động đổi màu đỏ rực cảnh báo ➔ Admin nhập số lượng bổ sung và bấm Lưu để cập nhật lại CSDL.  
🚀 **Luồng di chuyển File:** `InventoryManagement.js` ➔ `PUT /api/admin/inventory` ➔ `admin.controller.js` ➔ Bảng SQL `tonkho`  
💻 **Đoạn Code cốt lõi (`InventoryManagement.js` Dòng 35-45):**
```javascript
<tr className={item.soluongton <= item.soluongtoithieu ? 'row-alert-red' : ''}>
```
📌 **Nằm ở Slide:** Slide 9  

---

### ❓ Câu 18: Em hãy trình bày luồng Quản lý Danh mục & Thương hiệu Mỹ phẩm?
👉 **Trả lời ngắn gọn:** Admin nhập tên Danh mục hoặc Thương hiệu mới ➔ React phát POST `/api/categories` hoặc `/api/brands` ➔ Backend `category.controller.js` lưu vào bảng `danhmuc` hoặc `thuonghieu` ➔ Trang sản phẩm lập tức cập nhật bộ lọc mới.  
🚀 **Luồng di chuyển File:** `CategoryManagement.js` / `BrandManagement.js` ➔ `POST /api/categories` ➔ `category.controller.js` ➔ Bảng SQL `danhmuc`  
💻 **Đoạn Code cốt lõi (`category.controller.js` Dòng 20-30):**
```sql
INSERT INTO danhmuc (tendanmuc, mota) VALUES (?, ?);
```
📌 **Nằm ở Slide:** Slide 9  

---

### ❓ Câu 19: Em hãy trình bày luồng Đánh giá Sản phẩm (Chấm 1 - 5 sao & Nhận xét)?
👉 **Trả lời ngắn gọn:** Khách chọn 1-5 sao và viết nhận xét tại `ProductDetail.js` ➔ Bấm "Gửi đánh giá" ➔ Backend `review.controller.js` kiểm tra khách đã mua đơn `hoanthanh` chưa ➔ Đúng điều kiện thì chèn dòng mới vào bảng `danhgia`.  
🚀 **Luồng di chuyển File:** `ProductDetail.js` ➔ `POST /api/reviews` ➔ `review.controller.js` ➔ Bảng SQL `danhgia`  
💻 **Đoạn Code cốt lõi (`review.controller.js` Dòng 25-35):**
```sql
INSERT INTO danhgia (masanpham, manguoidung, sosao, noidung) VALUES (?, ?, ?, ?);
```
📌 **Nằm ở Slide:** Slide 9  

---

### ❓ Câu 20: Em hãy trình bày luồng Hỏi đáp Thắc mắc giữa Khách & Admin?
👉 **Trả lời ngắn gọn:** Khách gõ câu hỏi thắc mắc dưới sản phẩm ➔ Lưu vào bảng `hoidap` ➔ Admin vào trang quản lý thấy câu hỏi, gõ câu trả lời giải đáp ➔ Backend cập nhật cột `cautraloi` hiển thị công khai.  
🚀 **Luồng di chuyển File:** `ProductDetail.js` ➔ `POST /api/reviews/hoidap` ➔ `review.controller.js` ➔ Bảng SQL `hoidap`  
💻 **Đoạn Code cốt lõi (`review.controller.js` Dòng 75-85):**
```sql
UPDATE hoidap SET cautraloi = ?, ngaytraloi = NOW() WHERE mahoidap = ?;
```
📌 **Nằm ở Slide:** Slide 9  

---

# PHẦN II: 8 BƯỚC QUY TRÌNH THAO TÁC KHÁCH HÀNG (TRÍCH TỪ CHƯƠNG 4 LUẬN VĂN)

1. **Bước 1: Tìm kiếm & Lọc mỹ phẩm**  
   - Khách gõ tên sản phẩm vào ô tìm kiếm ở thanh Header hoặc bấm vào danh mục ("Chăm sóc da", "Trang điểm", "Chống nắng") để lọc nhanh mỹ phẩm trong 0.01 giây.

2. **Bước 2: Xem Chi tiết Mỹ phẩm & Chọn Biến thể**  
   - Bấm vào sản phẩm ➔ Mở trang Chi tiết ➔ Khách xem thành phần, công dụng và bấm chọn tùy chọn biến thể (Màu son MAC / 3CE, Dung tích 150ml / 500ml).

3. **Bước 3: Chọn Số lượng & Thêm vào Giỏ hàng**  
   - Nhấp nút (+) (-) để chọn số lượng mua ➔ Bấm nút màu hồng "THÊM VÀO GIỎ HÀNG" ➔ Màn hình hiện thông báo màu xanh đã thêm thành công, icon giỏ hàng nhảy số.

4. **Bước 4: Kiểm tra Giỏ hàng & Áp dụng Mã Voucher Serial**  
   - Xem lại các món đồ trong giỏ hàng ➔ Quan sát danh sách Voucher ưu đãi phía dưới ➔ Bấm nút "Áp dụng" mã Voucher Serial độc nhất `[VC-KH01-0001]` ➔ Tiền giảm trừ trực tiếp vào Tổng tiền.

5. **Bước 5: Điền Thông tin Giao hàng & Ghi chú**  
   - Nhập Họ tên, Số điện thoại (10 số), Địa chỉ chi tiết (Số nhà, đường, phường/xã, quận/huyện) và Ghi chú dặn shipper (nếu có). Nếu đã đăng nhập, thông tin mặc định sẽ tự động điền sẵn.

6. **Bước 6: Lựa chọn Phương thức Thanh toán**  
   - **Cách 1 (COD):** Chọn Tiền mặt khi nhận hàng.  
   - **Cách 2 (QR Code VietQR):** Chọn Quét mã QR Code ➔ Màn hình tự sinh mã VietQR chèn STK shop, tên chủ tài khoản và số tiền cần thanh toán.

7. **Bước 7: Xác nhận Đặt hàng & Nhận phản hồi**  
   - Bấm nút lớn "XÁC NHẬN ĐẶT HÀNG" ➔ Màn hình hiển thị thông báo "Đặt hàng thành công! Mã đơn của bạn là #..." ➔ Giỏ hàng tự động làm sạch.

8. **Bước 8: Theo dõi Lịch sử Đơn hàng & Xem/In Hóa đơn**  
   - Vào tab "Thông báo" hoặc "Lịch sử đơn" ➔ Xem tiến trình chuyển trạng thái ➔ Bấm vào đơn hàng để xem Modal Hóa đơn điện tử và bấm "In Hóa đơn" ra máy in hoặc lưu PDF.
