# 📘 TÀI LIỆU MASTER DUY NHẤT: GIẢI THÍCH CHI TIẾT 20 CHỨC NĂNG NGHIỆP VỤ & LUỒNG CODE A - Z (DỄ HỌC BẢO VỆ ĐỒ ÁN)

**Đề tài:** Website Bán Mỹ Phẩm Tự Động (ReactJS + Node.js Express + TiDB Cloud MySQL)  
**Sinh viên thực hiện:** Phạm Yến Nhi — MSSV: DH52201160  
**Giảng viên hướng dẫn:** ThS. Hà Văn Tùng  

---

## 💡 HƯỚNG DẪN DÙNG TÀI LIỆU MASTER DUY NHẤT

Tài liệu này được biên soạn **theo giọng văn nói siêu dễ thuộc**, đi tuần tự theo thứ tự **từ Chức năng 1 đến Chức năng 20**. 

Mỗi chức năng đều giải thích rõ ràng **từ đâu qua đâu** (Frontend bấm gì ➔ Gọi API gì ➔ Backend nhận ở đâu ➔ Chạy câu SQL nào ➔ Trả kết quả ra sao) giúp bạn dễ học và tự tin trả lời Thầy Cô.

---

# PHẦN I: BẢNG TRA CỨU NHANH 20 CHỨC NĂNG & VỊ TRÍ FILE CODE

| STT | Tên Chức Năng Nghiệp Vụ | File Frontend (Giao diện) | File Backend (Xử lý) | Bảng Database SQL |
|---|---|---|---|---|
| 1 | **Đăng ký & Đăng nhập (JWT & Bcrypt)** | `LoginForm.js` (Dòng 15-65) | `auth.controller.js` (Dòng 25-90) | `nguoidung`, `vaitro` |
| 2 | **Quản lý Hồ sơ cá nhân & Đổi mật khẩu** | `CustomerArea.js` (Dòng 40-90) | `customer.controller.js` (Dòng 15-50) | `nguoidung` |
| 3 | **Danh sách Sản phẩm & Lọc Tức thì** | `ProductList.js` (Dòng 15-82)<br>`AppContext.js` (Dòng 105-123) | `product.controller.js` (Dòng 60-99) | `sanpham`, `danhmuc`, `thuonghieu` |
| 4 | **Chi tiết Sản phẩm & Chọn Biến thể màu son** | `ProductDetail.js` (Dòng 40-210) | `product.controller.js` (Dòng 100-140) | `sanpham`, `luachon_sanpham` |
| 5 | **Thêm vào Giỏ hàng & Đồng bộ LocalStorage** | `AppContext.js` (Dòng 160-210)<br>`Header.js` (Dòng 50-90) | `cart.controller.js` (Dòng 10-45) | `giohang`, `chitietgiohang` |
| 6 | **Sổ Địa chỉ Giao hàng & Đặt Mặc định** | `CustomerArea.js` (Dòng 66-85) | `customer.controller.js` (Dòng 60-95) | `diachi` |
| 7 | **Đặt hàng, Tính giá giảm & Trừ tồn kho 3 bảng** | `CustomerArea.js` (Dòng 150-240) | `order.controller.js` (Dòng 111-330) | `donhang`, `chitietdonhang`, `tonkho` |
| 8 | **Thanh toán QR Code VietQR & Giả lập Demo** | `ThanhToanQR.js` (Dòng 1-98) | `order.controller.js` (Dòng 147, 299) | `thanhtoan`, `donhang` |
| 9 | **Thanh toán Tiền mặt khi nhận hàng (COD)** | `ThanhToanTienMat.js` (Dòng 1-40) | `order.controller.js` (Dòng 150-168) | `donhang`, `thanhtoan` |
| 10 | **Voucher Serial Độc nhất (`[VC-KH01-0001]`)** | `CustomerArea.js` (Dòng 473-501) | `voucher.controller.js` (Dòng 5-60) | `voucher`, `voucher_nguoidung` |
| 11 | **Gửi Email Xác nhận Tự động (Gmail SSL 465)** | Nền Backend tự động gọi | `server/utils/email.js` (Dòng 5-160) | Gửi trực tiếp qua Gmail API |
| 12 | **Xem & In Hóa đơn Điện tử chuẩn Unicode** | `CustomerArea.js` (Dòng 164-260) | `order.controller.js` (Dòng 80-108) | `donhang`, `chitietdonhang` |
| 13 | **Theo dõi Lịch sử Đơn hàng & Tiến trình** | `CustomerArea.js` (Dòng 575-650) | `order.controller.js` (Dòng 30-75) | `donhang`, `lichsutrangthaidon` |
| 14 | **Yêu cầu Trả hàng & Hoàn Kho khi nhận hàng** | `CustomerArea.js` (Dòng 260-310) | `return.controller.js` (Dòng 5-150) | `yeucautranhang`, `tonkho` |
| 15 | **Chiến dịch Khuyến mãi Sale % theo Sản phẩm** | `PromotionManagement.js` (Dòng 20-110) | `khuyenmai.controller.js` (Dòng 10-80) | `khuyenmai`, `sanpham_khuyenmai` |
| 16 | **Thống kê Doanh thu & Lượt truy cập RAM** | `Dashboard.js` (Dòng 10-120) | `stats.controller.js` (Dòng 14-48) | `donhang`, `sanpham`, `nguoidung` |
| 17 | **Quản lý Tồn kho & Cảnh báo Hết hàng rực đỏ** | `InventoryManagement.js` (Dòng 15-90) | `admin.controller.js` (Dòng 40-85) | `tonkho`, `sanpham` |
| 18 | **Quản lý Danh mục & Thương hiệu Mỹ phẩm** | `CategoryManagement.js`, `BrandManagement.js` | `category.controller.js` (Dòng 10-60) | `danhmuc`, `thuonghieu` |
| 19 | **Đánh giá Sản phẩm (Chấm 1-5 sao & Nhận xét)** | `ProductDetail.js` (Dòng 220-280) | `review.controller.js` (Dòng 15-55) | `danhgia` |
| 20 | **Hỏi đáp Thắc mắc Sản phẩm Khách & Admin** | `ProductDetail.js` (Dòng 290-350) | `review.controller.js` (Dòng 60-110) | `hoidap` |

---

# PHẦN II: GIẢI THÍCH CHI TIẾT 20 CHỨC NĂNG THEO THỨ TỰ THỰC TẾ A - Z

---

## 📌 CHỨC NĂNG 1: ĐĂNG KÝ VÀ ĐĂNG NHẬP TÀI KHOẢN (Bảo mật JWT & Bcrypt)

### 1. Nghiệp vụ thực tế:
- Cho phép người dùng đăng ký tài khoản khách hàng để mua sắm. Mật khẩu khách hàng khi đăng ký không lưu dạng chữ gốc mà được băm mã hóa an toàn bằng thư viện `bcryptjs`. Khi đăng nhập đúng, hệ thống cấp cho người dùng một **JWT Token** lưu ở trình duyệt để duy trì phiên đăng nhập.

### 2. Luồng chạy chi tiết từ A - Z (Dễ học):
- **Bước 1 (Giao diện Frontend):** Khách bấm nút "Đăng nhập / Đăng ký" trên Header ➔ Mở Modal `LoginForm.js`. Khách nhập Email & Mật khẩu ➔ Bấm nút "Xác nhận".
- **Bước 2 (React gửi API):** React gọi câu lệnh `axios.post('/api/auth/login', { email, matkhau })` gửi dữ liệu xuống máy chủ Backend.
- **Bước 3 (Node.js Backend tiếp nhận):** Route `/api/auth/login` tiếp nhận ➔ Chuyển sang xử lý tại hàm `login()` trong file `server/controller/auth.controller.js` (Dòng 25-90).
- **Bước 4 (Database xử lý):** Backend chạy câu lệnh SQL:
  ```sql
  SELECT * FROM nguoidung WHERE email = 'hoh119004@gmail.com' LIMIT 1;
  ```
- **Bước 5 (Đối chiếu & Phản hồi):** Backend dùng lệnh `bcrypt.compare()` để so khớp mật khẩu. Nếu khớp, Backend sinh mã JWT Token bằng `jwt.sign()` rồi trả JSON về cho React. React lưu Token vào `localStorage` và cập nhật giao diện đã đăng nhập.

### 3. File Code chính xác:
- **Frontend:** `client/src/component/LoginForm.js` (Dòng 15-65)
- **Backend:** `server/controller/auth.controller.js` (Dòng 25-90)
- **Bảng SQL:** `nguoidung`, `vaitro`

---

## 📌 CHỨC NĂNG 2: QUẢN LÝ HỒ SƠ CÁ NHÂN & ĐỔI MẬT KHẨU

### 1. Nghiệp vụ thực tế:
- Cho phép khách hàng vào trang quản lý tài khoản để cập nhật lại Họ tên, Số điện thoại và Đổi mật khẩu mới nếu muốn.

### 2. Luồng chạy chi tiết từ A - Z (Dễ học):
- **Bước 1 (Giao diện Frontend):** Khách vào trang Cá nhân `CustomerArea.js` ➔ Nhập Họ tên mới hoặc Mật khẩu mới ➔ Bấm nút "Lưu thay đổi".
- **Bước 2 (React gửi API):** React phát lệnh `axios.put('/api/customers/1', { hoten, sodienthoai, matkhauMoi })`.
- **Bước 3 (Node.js Backend tiếp nhận):** Route `/api/customers/:id` chuyển đến `customer.controller.js`.
- **Bước 4 (Database xử lý):** Nếu có đổi mật khẩu, Backend dùng `bcrypt.hash()` băm mật khẩu mới ➔ Chạy câu SQL:
  ```sql
  UPDATE nguoidung SET hoten = ?, sodienthoai = ?, matkhau = ? WHERE manguoidung = ?;
  ```
- **Bước 5 (Phản hồi):** Backend trả về thông báo "Cập nhật thành công" ➔ React load lại thông tin hiển thị lên màn hình.

### 3. File Code chính xác:
- **Frontend:** `client/src/page/CustomerArea.js` (Dòng 40-90)
- **Backend:** `server/controller/customer.controller.js` (Dòng 15-50)
- **Bảng SQL:** `nguoidung`

---

## 📌 CHỨC NĂNG 3: DANH SÁCH SẢN PHẨM & TÌM KIẾM TỨC THÌ (Search & Filter)

### 1. Nghiệp vụ thực tế:
- Hiển thị danh sách 16 sản phẩm mỹ phẩm với hình ảnh, giá gốc, giá đã giảm % và tiến trình số lượng đã bán. Thanh tìm kiếm và bộ lọc loại da/danh mục giúp tìm sản phẩm tức thì mà không cần load lại trang. Thẻ sản phẩm hiển thị cực kỳ sạch đẹp, đã gỡ bỏ hoàn toàn chữ màu hồng rác `tag-khuyen-mai`.

### 2. Luồng chạy chi tiết từ A - Z (Dễ học):
- **Bước 1 (Trang web khởi chạy):** File `AppContext.js` khởi động ➔ Tự động gửi API `GET /api/products` lên Backend.
- **Bước 2 (Node.js xử lý SQL JOIN):** Backend `product.controller.js` thực thi câu SQL liên bảng:
  ```sql
  SELECT p.*, c.tendanmuc, b.tenthuonghieu, tk.soluongton, km.phantramgiam
  FROM sanpham p
  LEFT JOIN danhmuc c ON c.madanmuc = p.madanmuc
  LEFT JOIN thuonghieu b ON b.mathuonghieu = p.mathuonghieu
  LEFT JOIN tonkho tk ON tk.masanpham = p.masanpham
  LEFT JOIN sanpham_khuyenmai spkm ON spkm.masanpham = p.masanpham
  LEFT JOIN khuyenmai km ON km.makhuyenmai = spkm.makhuyenmai AND km.trangthai = 'hoatdong';
  ```
- **Bước 3 (React nhận dữ liệu):** Mảng sản phẩm trả về ➔ Lưu vào State `sanPhams` trong `AppContext.js`.
- **Bước 4 (Khách tìm kiếm/Lọc):** Khách gõ chữ vào ô Tìm kiếm ➔ Hàm `useMemo` trong `AppContext.js` tự động lọc mảng sản phẩm theo từ khóa trong **0.01 giây** và render lại `ProductList.js`.

### 3. File Code chính xác:
- **Frontend:** `client/src/component/ProductList.js` (Dòng 15-82), `client/src/store/AppContext.js` (Dòng 105-123)
- **Backend:** `server/controller/product.controller.js` (Dòng 60-99)
- **Bảng SQL:** `sanpham`, `danhmuc`, `thuonghieu`, `tonkho`, `khuyenmai`

---

## 📌 CHỨC NĂNG 4: CHI TIẾT SẢN PHẨM & CHỌN BIẾN THỂ (Màu Son / Dung tích)

### 1. Nghiệp vụ thực tế:
- Khách click xem trang chi tiết từng sản phẩm: Hình ảnh lớn, Mô tả công dụng, Thành phần.
- Chọn biến thể màu sắc riêng biệt (Son MAC: Ruby Woo, Russian Red, Diva; Son 3CE: Denim, Over Dose, Berry, Coral). Giá tiền và tồn kho riêng của từng màu sẽ cập nhật động.

### 2. Luồng chạy chi tiết từ A - Z (Dễ học):
- **Bước 1 (Giao diện Frontend):** Khách bấm thẻ sản phẩm ➔ Chuyển sang Route `/san-pham/:id` (`ProductDetail.js`).
- **Bước 2 (React gọi API):** React phát request `GET /api/products/:id`.
- **Bước 3 (Backend truy vấn CSDL):** Backend `product.controller.js` chạy SQL:
  ```sql
  SELECT * FROM luachon_sanpham WHERE masanpham = ?;
  ```
- **Bước 4 (Hiển thị & Chọn màu):** Trả về mảng các biến thể ➔ Khách bấm nút chọn màu "Russian Red" ➔ State `mauDaChon` cập nhật ➔ Màn hình tự tính lại số lượng tồn kho khả dụng và giá tiền của màu "Russian Red".

### 3. File Code chính xác:
- **Frontend:** `client/src/component/ProductDetail.js` (Dòng 40-210), `client/src/constant/sanPham.js` (Dòng 280-318)
- **Backend:** `server/controller/product.controller.js` (Dòng 100-140)
- **Bảng SQL:** `sanpham`, `luachon_sanpham`

---

## 📌 CHỨC NĂNG 5: THÊM VÀO GIỎ HÀNG & ĐỒNG BỘ LOCALSTORAGE

### 1. Nghiệp vụ thực tế:
- Đưa sản phẩm kèm màu sắc vào Giỏ hàng. Tự động kiểm tra số lượng tồn kho trước khi thêm. Lưu giỏ hàng vào `localStorage` giúp giữ nguyên hàng trong giỏ khi tắt trình duyệt.

### 2. Luồng chạy chi tiết từ A - Z (Dễ học):
- **Bước 1 (Giao diện Frontend):** Khách bấm nút "Thêm vào giỏ hàng" tại `ProductDetail.js`.
- **Bước 2 (React xử lý State):** Gọi hàm `themVaoGio()` trong `AppContext.js` (Dòng 160-210).
- **Bước 3 (Kiểm tra kho):** Hàm so sánh số lượng khách muốn thêm với số tồn kho ➔ Nếu vượt quá kho ➔ Bật cảnh báo "Số lượng trong kho không đủ".
- **Bước 4 (Đồng bộ LocalStorage):** Nếu đủ kho ➔ Cập nhật State `gioHang` ➔ Lưu giỏ hàng vào `localStorage.setItem('cart', JSON.stringify(gioHangUpdated))`. Badge số lượng giỏ hàng trên Header lập tức nhảy số.

### 3. File Code chính xác:
- **Frontend:** `client/src/store/AppContext.js` (Dòng 160-210), `client/src/component/Header.js` (Dòng 50-90)
- **Backend:** `server/controller/cart.controller.js` (Dòng 10-45)
- **Bảng SQL:** `giohang`, `chitietgiohang`

---

## 📌 CHỨC NĂNG 6: SỔ ĐỊA CHỈ GIAO HÀNG & ĐẶT MẶC ĐỊNH

### 1. Nghiệp vụ thực tế:
- Khách hàng lưu sẵn nhiều địa chỉ giao hàng (Nhà riêng, Cơ quan) và đánh dấu 1 địa chỉ làm Mặc định (`macdinh = 1`). Khi Đặt hàng, địa chỉ mặc định sẽ tự động được điền sẵn vào Form.

### 2. Luồng chạy chi tiết từ A - Z (Dễ học):
- **Bước 1 (Mở trang Đặt hàng):** Component `CustomerArea.js` khởi chạy ➔ Gọi API `GET /api/customers/1`.
- **Bước 2 (Backend đọc CSDL):** Backend `customer.controller.js` chạy SQL `SELECT * FROM diachi WHERE manguoidung = ?`.
- **Bước 3 (React tự điền Form):** React tìm địa chỉ có `macdinh = 1` ➔ Tự động gán Họ tên, SĐT và Địa chỉ chi tiết vào Form đặt hàng mà khách không cần gõ lại.

### 3. File Code chính xác:
- **Frontend:** `client/src/page/CustomerArea.js` (Dòng 66-85)
- **Backend:** `server/controller/customer.controller.js` (Dòng 60-95)
- **Bảng SQL:** `diachi`

---

## 📌 CHỨC NĂNG 7: ĐẶT HÀNG, TÍNH ĐÚNG GIÁ GIẢM & TRỪ TỒN KHO 3 BẢNG (QUAN TRỌNG NHẤT)

### 1. Nghiệp vụ thực tế:
- Khách điền thông tin, chọn mã **Voucher Serial**, chọn phương thức thanh toán và bấm **"Xác nhận đặt hàng"**.
- **Tính đúng giá giảm %:** Hóa đơn và chi tiết đơn hàng lưu đúng giá đã giảm (`item.dongia`).
- **Trừ kho tự động 3 bảng:** Ngay khi đặt đơn thành công, số lượng kho bị trừ tức thì ở 3 bảng (`luachon_sanpham`, `tonkho`, `sanpham`).

### 2. Luồng chạy chi tiết từ A - Z (Giọng văn nói dễ thuộc):
- **Bước 1 (Khách bấm Đặt hàng):** Tại `CustomerArea.js`, khách bấm "Xác nhận đặt hàng" ➔ React phát API `axios.post('/api/orders', orderPayload)` chứa mảng sản phẩm (mỗi món kèm `dongia` đã giảm).
- **Bước 2 (Backend mở Transaction & Khóa dòng):** Backend `order.controller.js` tiếp nhận ➔ Mở giao dịch an toàn:
  ```javascript
  await conn.beginTransaction();
  ```
  Chạy câu lệnh khóa dòng dữ liệu chống tranh chấp mua hàng:
  ```sql
  SELECT bt.*, p.tensanpham FROM luachon_sanpham bt JOIN sanpham p ON p.masanpham = bt.masanpham WHERE bt.maluachon = ? FOR UPDATE;
  ```
- **Bước 3 (Lưu Chi tiết đơn hàng):** Lấy đơn giá đã giảm %: `const donGia = (item.dongia && Number(item.dongia) > 0) ? Number(item.dongia) : giabanGoc;` ➔ Chèn dòng vào bảng `chitietdonhang`.
- **Bước 4 (Trừ kho tự động 3 bảng):**
  - Trừ kho biến thể màu: `UPDATE luachon_sanpham SET soluongton = GREATEST(soluongton - ?, 0) WHERE maluachon = ?`
  - Trừ kho tổng: `UPDATE tonkho SET soluongton = GREATEST(soluongton - ?, 0) WHERE masanpham = ?`
  - Trừ kho sản phẩm: `UPDATE sanpham SET soluongton = GREATEST(soluongton - ?, 0) WHERE masanpham = ?`
- **Bước 5 (Đánh dấu Voucher & Commit):** Đánh dấu Voucher Serial đã dùng: `UPDATE voucher_nguoidung SET sudung = 1 WHERE mavoucher_nd = ?` ➔ Chốt giao dịch `await conn.commit()` ➔ Tự động kích hoạt hàm gửi Email xác nhận qua Gmail SSL 465.

### 3. LUỒNG GIẢI THÍCH KỊCH BẢN 2 KHÁCH CÙNG ĐẶT CÙNG LÚC (TRANSACTION & FOR UPDATE):
1. **Khách A bấm trước 0.001s:** Backend Khách A mở Transaction ➔ Chạy SQL `SELECT ... FOR UPDATE` ➔ CSDL **KHOÁ DÒNG SẢN PHẨM LẠI**.
2. **Khách B bấm sau 0.001s:** Backend Khách B chạy `SELECT ... FOR UPDATE` ➔ Vì dòng bị Khách A khóa, CSDL ép Khách B **PHẢI TẠM DỪNG CHỜ ĐỜI (WAIT)**.
3. **Khách A làm xong:** Backend Khách A trừ kho về 0 ➔ Commit hoàn tất ➔ CSDL **GIẢI PHÓNG KHÓA**.
4. **Khách B được tiếp cận:** CSDL chuyển lượt cho Khách B ➔ Khách B đọc kho mới = 0 ➔ Backend Khách B phát hiện hết hàng ➔ **HỦY GIAO DỊCH (`ROLLBACK`)** và báo lỗi "Sản phẩm hết hàng!".

### 4. File Code chính xác:
- **Frontend:** `client/src/page/CustomerArea.js` (Dòng 150-240)
- **Backend:** `server/controller/order.controller.js` (Dòng 111-330)
- **Bảng SQL:** `donhang`, `chitietdonhang`, `tonkho`, `luachon_sanpham`, `sanpham`

---

## 📌 CHỨC NĂNG 8: THANH TOÁN QR CODE VIETQR & CHẾ ĐỘ GIẢ LẬP DEMO

### 1. Nghiệp vụ thực tế:
- Khách chọn **"Chuyển khoản QR Code"** ➔ Hệ thống tự động tạo mã QR động VietQR chứa STK shop `1017833075` (Vietcombank), Tên TK `PHAM YEN NHI`, Số tiền chính xác và Nội dung `HONGXINH DH<Mã_Đơn>`.
- **Chế độ Giả lập Demo:** Nút **"Giả lập: Khách đã quét QR & chuyển tiền"** giúp tạo mã giao dịch `QR<TIMESTAMP><RANDOM>` và đánh dấu đã thanh toán mà không cần nạp tiền thật khi chấm bài.

### 2. Luồng chạy chi tiết từ A - Z (Dễ học):
- **Bước 1 (Khách chọn QR):** Tại dropdown chọn `"qrcode"` ➔ Component `ThanhToanQR.js` nhúng link VietQR API (`https://img.vietqr.io/image/VCB-1017833075-compact2.png...`) hiển thị mã QR động.
- **Bước 2 (Khách bấm Giả lập):** Nút giả lập gọi `onGiaLap("qrcode", null)` ➔ Gửi flag `isDemo: true` vào body request đặt hàng lên Backend API `/api/orders`.
- **Bước 3 (Backend xử lý):** `order.controller.js` (Dòng 147) kiểm tra `isDemo === true` ➔ Đặt `trangthaithanhtoan = "dathanhtoan"`.
- **Bước 4 (Lưu giao dịch):** Backend tự sinh mã `QR1787045867960` ➔ Thêm dòng mới vào bảng `thanhtoan` ➔ Trả kết quả đặt hàng thành công về Client.

### 3. File Code chính xác:
- **Frontend:** `client/src/component/ThanhToanQR.js` (Dòng 36-44 ảnh QR, Dòng 80-90 nút Demo)
- **Backend:** `server/controller/order.controller.js` (Dòng 147, 299-304)
- **Bảng SQL:** `thanhtoan`, `donhang`

---

## 📌 CHỨC NĂNG 9: THANH TOÁN TIỀN MẶT KHI NHẬN HÀNG (COD)

### 1. Nghiệp vụ thực tế:
- Khách chọn thanh toán tiền mặt khi nhận hàng (COD). Đơn khởi tạo với trạng thái thanh toán `chuathanhtoan`. Khách sẽ trả tiền trực tiếp cho Shipper khi giao hàng.

### 2. Luồng chạy chi tiết từ A - Z (Dễ học):
- **Bước 1:** Khách chọn phương thức `"tienmat"` ➔ Component `ThanhToanTienMat.js` hiển thị hướng dẫn.
- **Bước 2:** Bấm Đặt hàng ➔ API `/api/orders` lưu đơn vào CSDL với `phuongthuc = 'tienmat'` và `trangthaithanhtoan = 'chuathanhtoan'`.

### 3. File Code chính xác:
- **Frontend:** `client/src/component/ThanhToanTienMat.js` (Dòng 1-40)
- **Backend:** `server/controller/order.controller.js` (Dòng 150-168)

---

## 📌 CHỨC NĂNG 10: MÃ SERIAL VOUCHER ĐỘC NHẤT (`[VC-KH01-0001]`)

### 1. Nghiệp vụ thực tế:
- Mỗi voucher cấp cho khách có mã Serial riêng dạng `[VC-KH01-0001]`. Đảm bảo kịch bản kiểm thử `TC-EX-02`: Mỗi thẻ voucher chỉ dùng đúng 1 lần duy nhất, dùng xong mã tự biến mất khỏi dropdown.

### 2. Luồng chạy chi tiết từ A - Z (Dễ học):
- **Bước 1 (Mở Đặt hàng):** React gọi API `GET /api/vouchers/user/1`.
- **Bước 2 (Backend đọc CSDL):** Backend `voucher.controller.js` truy vấn bảng `voucher_nguoidung` tìm các voucher của khách có `sudung = 0`.
- **Bước 3 (Hiển thị Dropdown):** Danh sách hiển thị mã Serial `[VC-KH01-0001] - Giảm 50.000đ`.
- **Bước 4 (Đặt đơn xong):** Backend `order.controller.js` (Dòng 305) chạy SQL `UPDATE voucher_nguoidung SET sudung = 1 WHERE mavoucher_nd = ?` ➔ Mã voucher này tự động biến mất khỏi dropdown của khách.

### 3. File Code chính xác:
- **Frontend:** `client/src/page/CustomerArea.js` (Dòng 473-501)
- **Backend:** `server/controller/voucher.controller.js` (Dòng 5-60), `server/controller/order.controller.js` (Dòng 274-290)
- **Bảng SQL:** `voucher`, `voucher_nguoidung`

---

## 📌 CHỨC NĂNG 11: GỬI EMAIL XÁC NHẬN ĐƠN HÀNG TỰ ĐỘNG (Gmail SSL 465)

### 1. Nghiệp vụ thực tế:
- Sau khi chốt đơn thành công, hệ thống tự động soạn Email HTML chứa thông tin đơn hàng và gửi thẳng đến hòm thư người mua qua cổng **Gmail SMTP 465 SSL** (`smtp.gmail.com:465`).

### 2. Luồng chạy chi tiết từ A - Z (Dễ học):
- **Bước 1:** Ngay sau câu lệnh `await conn.commit()` trong `order.controller.js`.
- **Bước 2:** Backend lấy email người nhận `targetMail = req.body.email || userEmail`.
- **Bước 3:** Gọi hàm `sendOrderConfirmationEmail()` trong file `server/utils/email.js`.
- **Bước 4:** Thư viện Nodemailer mở kết nối SSL Cổng 465 tới `smtp.gmail.com` với App Password ➔ Phát thư HTML tới Inbox người mua trong 1-2 giây. Đồng thời lưu 1 bản sao HTML tại `server/sent_emails/` để demo offline.

### 3. File Code chính xác:
- **Backend File Email:** `server/utils/email.js` (Dòng 5-160)
- **Cấu hình:** App Password `lilbbuxhaoswthgu`, Cổng `465 SSL`.

---

## 📌 CHỨC NĂNG 12: XEM & IN HÓA ĐƠN ĐIỆN TỬ CHUẨN UNICODE

### 1. Nghiệp vụ thực tế:
- Khách hoặc Admin bấm "Xem hóa đơn" ➔ Mở Modal Hóa đơn điện tử sang trọng và bấm nút **"In hóa đơn"** hỗ trợ in trực tiếp ra giấy qua trình duyệt chuẩn tiếng Việt Unicode không lỗi font.

### 2. Luồng chạy chi tiết từ A - Z (Dễ học):
- **Bước 1:** Khách bấm nút "Xem hóa đơn" tại đơn hàng ➔ React phát request `GET /api/orders/:id/invoice`.
- **Bước 2:** Backend `order.controller.js` (Dòng 80-108) truy vấn đơn hàng & chi tiết ➔ Trả JSON về.
- **Bước 3:** Modal `ModalXemHoaDon.js` hiển thị hóa đơn ➔ Khách bấm nút "In hóa đơn" ➔ Mở cửa sổ in `window.print()` của trình duyệt.

### 3. File Code chính xác:
- **Frontend:** `client/src/page/CustomerArea.js` (Dòng 164-260)
- **Backend:** `server/controller/order.controller.js` (Dòng 80-108)

---

## 📌 CHỨC NĂNG 13: THEO DÕI LỊCH SỬ ĐƠN HÀNG & TIẾN TRÌNH GIAO HÀNG

### 1. Nghiệp vụ thực tế:
- Xem danh sách đơn hàng đã đặt, theo dõi tiến trình chuyển trạng thái theo thời gian thực (`ChoXacNhan ➔ DangGiao ➔ HoanThanh`).

### 2. Luồng chạy chi tiết từ A - Z (Dễ học):
- **Bước 1:** Vào tab "Lịch sử đơn hàng" tại `CustomerArea.js` ➔ Gọi `GET /api/orders/user/1`.
- **Bước 2:** Backend `order.controller.js` đọc bảng `donhang` và `lichsutrangthaidon` ➔ Trả mảng đơn hàng kèm timeline thời gian về React hiển thị.

### 3. File Code chính xác:
- **Frontend:** `client/src/page/CustomerArea.js` (Dòng 575-650)
- **Backend:** `server/controller/order.controller.js` (Dòng 30-75)

---

## 📌 CHỨC NĂNG 14: YÊU CẦU TRẢ HÀNG & HOÀN KHO KHI NHẬN HÀNG

### 1. Nghiệp vụ thực tế:
- Đơn hoàn thành được quyền gửi Yêu cầu trả hàng. Khi Admin nhận được hàng và bấm **"Đã nhận hàng trả"**, hệ thống **TỰ ĐỘNG CỘNG HOÀN LẠI SỐ LƯỢNG KHO VỀ CẢ 3 BẢNG** (`tonkho`, `sanpham`, `luachon_sanpham`).

### 2. Luồng chạy chi tiết từ A - Z (Dễ học):
- **Bước 1 (Khách gửi yêu cầu):** Khách bấm "Trả hàng" ➔ POST `/api/returns` ➔ Lưu dòng mới vào bảng `yeucautranhang` với trạng thái `choxuly`.
- **Bước 2 (Admin duyệt):** Admin bấm "Duyệt" ➔ PUT `/api/returns/:id/approve` ➔ Đơn chuyển sang `duyet_chohanghoi`.
- **Bước 3 (Admin nhận hàng & Hoàn kho):** Khi nhận được hàng về kho, Admin bấm "Xác nhận đã nhận hàng" ➔ PUT `/api/returns/:id/confirm-received`.
- **Bước 4 (Backend cộng tồn kho):** Backend `return.controller.js` (Dòng 94-145) đọc các món trong đơn và chạy 3 câu SQL `UPDATE` cộng hoàn lại tồn kho:
  - `UPDATE tonkho SET soluongton = soluongton + ? WHERE masanpham = ?`
  - `UPDATE sanpham SET soluongton = soluongton + ? WHERE masanpham = ?`
  - `UPDATE luachon_sanpham SET soluongton = soluongton + ? WHERE maluachon = ?`

### 3. File Code chính xác:
- **Frontend:** `client/src/page/CustomerArea.js` (Dòng 260-310)
- **Backend:** `server/controller/return.controller.js` (Dòng 5-150)
- **Bảng SQL:** `yeucautranhang`, `donhang`, `tonkho`

---

## 📌 CHỨC NĂNG 15: CHIẾN DỊCH KHUYẾN MÃI SALE % THEO SẢN PHẨM

### 1. Nghiệp vụ thực tế:
- Admin tạo chiến dịch Siêu Sale giảm % cho sản phẩm. Trang khách tự động hiển thị nhãn % đỏ và tính giá mới. Hết hạn Sale, thẻ sản phẩm tự trở về giao diện sạch đẹp.

### 2. Luồng chạy chi tiết từ A - Z (Dễ học):
- **Bước 1 (Admin tạo Sale):** Admin vào `PromotionManagement.js` nhập tên đợt Sale, % giảm (VD: 15%), ngày bắt đầu, ngày kết thúc ➔ Bấm "Tạo khuyến mãi".
- **Bước 2 (Backend chèn CSDL):** Backend `khuyenmai.controller.js` thêm dòng vào bảng `khuyenmai` và bảng trung gian `sanpham_khuyenmai`.
- **Bước 3 (Khách xem giá Sale):** Khi khách load trang sản phẩm, SQL JOIN kiểm tra ngày hiện tại ➔ Trả về `phantramgiam` ➔ React tự tính `giaMoi = giaGoc * (1 - phantramgiam/100)`.

### 3. File Code chính xác:
- **Frontend:** `client/src/component/admin/PromotionManagement.js` (Dòng 20-110)
- **Backend:** `server/controller/khuyenmai.controller.js` (Dòng 10-80)

---

## 📌 CHỨC NĂNG 16: THỐNG KÊ DOANH THU & LƯỢT TRUY CẬP RAM (Admin Dashboard)

### 1. Nghiệp vụ thực tế:
- Trang Dashboard Admin hiển thị 5 thẻ chỉ số (KPIs): Tổng sản phẩm, Tổng khách hàng, Tổng đơn hàng, Tổng doanh thu (`WHERE trangthaidonhang = 'hoanthanh'`) và Số lượt truy cập ngầm thời gian thực lưu trong RAM (`globalVisitorCount++`).

### 2. Luồng chạy chi tiết từ A - Z (Dễ học):
- **Bước 1:** Admin mở Dashboard `Dashboard.js` ➔ Gọi API `GET /api/stats/dashboard`.
- **Bước 2:** Backend `stats.controller.js` (Dòng 14-48) chạy các câu SQL đếm tổng:
  - `SELECT COUNT(*) FROM sanpham`
  - `SELECT COUNT(*) FROM donhang`
  - `SELECT SUM(tongtien) FROM donhang WHERE trangthaidonhang = 'hoanthanh'` (chỉ tính đơn hoàn thành).
- **Bước 3 (Đếm lượt xem ngầm):** Middleware `trackVisitor` (Dòng 9-12) tự tăng biến RAM `globalVisitorCount++` mỗi khi có người truy cập ➔ Trả JSON về hiển thị lên 5 thẻ KPI màu sắc.

### 3. File Code chính xác:
- **Frontend:** `client/src/component/admin/Dashboard.js` (Dòng 10-120)
- **Backend:** `server/controller/stats.controller.js` (Dòng 14-48)

---

## 📌 CHỨC NĂNG 17: QUẢN LÝ TỒN KHO & CẢNH BÁO HẾT HÀNG RỰC ĐỎ

### 1. Nghiệp vụ thực tế:
- Cho phép Thủ kho nhập thêm số lượng tồn. Khi số lượng tồn nhỏ hơn hoặc bằng mức tối thiểu (`soluongtoithieu`), dòng sản phẩm trên bảng Admin sẽ tự động đổi màu đỏ rực cảnh báo Thủ kho nhập hàng.

### 2. Luồng chạy chi tiết từ A - Z (Dễ học):
- **Bước 1:** Admin vào `InventoryManagement.js` xem bảng tồn kho.
- **Bước 2:** Nếu `soluongton <= soluongtoithieu` ➔ CSS gắn class đổi màu nền dòng thành màu đỏ cảnh báo.
- **Bước 3:** Admin nhập số lượng mới ➔ Lệnh `PUT /api/admin/inventory` cập nhật lại CSDL.

### 3. File Code chính xác:
- **Frontend:** `client/src/component/admin/InventoryManagement.js` (Dòng 15-90)
- **Backend:** `server/controller/admin.controller.js` (Dòng 40-85)

---

## 📌 CHỨC NĂNG 18: QUẢN LÝ DANH MỤC & THƯƠNG HIỆU MỸ PHẨM

### 1. Nghiệp vụ thực tế:
- Quản trị viên Thêm/Sửa/Xóa các Danh mục Mỹ phẩm (`Skincare`, `Makeup`) và Thương hiệu (`Cocoon`, `Klairs`, `MAC`, `3CE`...).

### 2. Luồng chạy chi tiết từ A - Z (Dễ học):
- **Bước 1:** Admin nhập tên danh mục/thương hiệu mới ➔ Bấm "Thêm mới".
- **Bước 2:** API POST `/api/categories` gọi `category.controller.js` (Dòng 10-60) chèn vào bảng `danhmuc` hoặc `thuonghieu`.

### 3. File Code chính xác:
- **Frontend:** `CategoryManagement.js`, `BrandManagement.js`
- **Backend:** `server/controller/category.controller.js` (Dòng 10-60), `server/controller/brand.controller.js`

---

## 📌 CHỨC NĂNG 19: ĐÁNH GIÁ SẢN PHẨM (Chấm 1 - 5 sao & Nhận xét)

### 1. Nghiệp vụ thực tế:
- Cho phép khách hàng mua sản phẩm thành công được phép chấm từ 1 đến 5 sao và viết nhận xét thực tế cho sản phẩm đó.

### 2. Luồng chạy chi tiết từ A - Z (Dễ học):
- **Bước 1:** Tại `ProductDetail.js`, khách chọn số sao (1-5★) và gõ nhận xét ➔ Bấm "Gửi đánh giá".
- **Bước 2:** Backend `review.controller.js` (Dòng 15-55) kiểm tra khách đã mua đơn `hoanthanh` chưa ➔ Nếu rồi thì chèn dòng mới vào bảng `danhgia`.

### 3. File Code chính xác:
- **Frontend:** `client/src/component/ProductDetail.js` (Dòng 220-280)
- **Backend:** `server/controller/review.controller.js` (Dòng 15-55)
- **Bảng SQL:** `danhgia`

---

## 📌 CHỨC NĂNG 20: HOỎI ĐÁP THẮC MẮC SẢN PHẨM KHÁCH & ADMIN

### 1. Nghiệp vụ thực tế:
- Khách hàng đặt câu hỏi thắc mắc về công dụng/thành phần bên dưới sản phẩm ➔ Admin nhận thông báo và vào trả lời câu hỏi trực tiếp.

### 2. Luồng chạy chi tiết từ A - Z (Dễ học):
- **Bước 1:** Khách gõ câu hỏi tại `ProductDetail.js` ➔ POST `/api/reviews/hoidap` ➔ Lưu vào bảng `hoidap`.
- **Bước 2:** Admin thấy câu hỏi ➔ Gõ câu trả lời ➔ PUT `/api/reviews/hoidap/:id/reply` ➔ Cập nhật cột `cautraloi`.

### 3. File Code chính xác:
- **Frontend:** `client/src/component/ProductDetail.js` (Dòng 290-350)
- **Backend:** `server/controller/review.controller.js` (Dòng 60-110)
- **Bảng SQL:** `hoidap`

---

# PHẦN III: DỮ LIỆU & Ý NGHĨA 21 BẢNG DATABASE SQL (A - Z)

| STT | Tên Bảng SQL | Khóa Chính (PK) | Ý Nghĩa Nghiệp Vụ Vận Hành |
|---|---|---|---|
| 1 | `vaitro` | `mavaitro` | Phân quyền vai trò: 1 - Admin, 2 - Khách hàng. |
| 2 | `nguoidung` | `manguoidung` | Lưu tài khoản, Email, Họ tên, Mật khẩu đã băm Bcrypt. |
| 3 | `diachi` | `madiachi` | Sổ địa chỉ giao hàng của từng tài khoản. |
| 4 | `danhmuc` | `madanmuc` | Phân loại mỹ phẩm (Chăm sóc da, Trang điểm, Làm sạch, Chống nắng). |
| 5 | `thuonghieu` | `mathuonghieu` | Hãng sản xuất (Cocoon, Klairs, L'Oreal, MAC, 3CE, Anessa...). |
| 6 | `sanpham` | `masanpham` | Chứa 16 sản phẩm chính, giá gốc, hình ảnh đại diện, công dụng. |
| 7 | `luachon_sanpham` | `maluachon` | Biến thể màu sắc son / dung tích (`mausac`, `giaban`, `soluongton`). |
| 8 | `tonkho` | `matonkho` | Quản lý tồn kho tổng theo sản phẩm (`soluongton`, `soluongtoithieu`). |
| 9 | `giohang` | `magiohang` | Giỏ hàng tạm thời của từng tài khoản. |
| 10 | `chitietgiohang` | `machitietgiohang` | Chi tiết các mặt hàng nằm trong giỏ (`masanpham`, `maluachon`, `soluong`). |
| 11 | `donhang` | `madonhang` | Đơn hàng chính (Tổng tiền, Trạng thái đơn, Người nhận). |
| 12 | `chitietdonhang` | `machitietdonhang` | Chi tiết từng món trong đơn (`soluong`, `dongia` đã giảm %, `thanhtien`). |
| 13 | `thanhtoan` | `mathanhtoan` | Nhật ký giao dịch thanh toán (COD hoặc QR Code Chuyển khoản). |
| 14 | `lichsutrangthaidon` | `malichsu` | Lịch sử chuyển trạng thái (ChoXacNhan ➔ DangGiao ➔ HoanThanh ➔ TraHang). |
| 15 | `voucher` | `mavoucher` | Chương trình mã giảm giá do Admin phát hành. |
| 16 | `voucher_nguoidung` | `mavoucher_nd` | Phân phối Voucher ➔ **Mã Serial `ma_serial` độc nhất (`[VC-KH01-0001]`)**. |
| 17 | `yeucautranhang` | `mayeucau` | Yêu cầu trả hàng, lý do trả, ảnh bằng chứng và trạng thái xử lý. |
| 18 | `danhgia` | `madanhgia` | Chấm sao (1 - 5★) và nhận xét của khách sau khi mua hàng. |
| 19 | `hoidap` | `mahoidap` | Khung câu hỏi thắc mắc của khách và câu trả lời giải đáp từ Admin. |
| 20 | `khuyenmai` | `makhuyenmai` | Chiến dịch Siêu Sale giảm giá % theo dòng sản phẩm. |
| 21 | `sanpham_khuyenmai` | `masanpham_km` | Bảng trung gian nối Sản phẩm với Đợt Khuyến mãi đang chạy. |

---

# PHẦN IV: BỘ 10 CÂU HỎI & TRẢ LỜI BẢO VỆ ĐỒ ÁN (HỎI - ĐÁP CHUYÊN SÂU)

---

### ❓ Câu 1: Em hãy giải thích cơ chế phân quyền Admin và Khách hàng trong hệ thống?
👉 **Trả lời:** Em quản lý phân quyền qua bảng `vaitro` (Admin `mavaitro = 1`, Khách `mavaitro = 2`). Đăng nhập thành công mã hóa vai trò vào **JWT Token**. Mọi API Admin đều trải qua Middleware `kiemTraAdmin` ở Backend giải mã token, nếu `mavaitro !== 1` sẽ chặn lại trả về `403 Forbidden`.

---

### ❓ Câu 2: Tại sao em lại sử dụng Mã Serial Voucher độc nhất dạng `[VC-KH01-0001]`?
👉 **Trả lời:** Em thiết kế cột `ma_serial` UNIQUE trong bảng `voucher_nguoidung` nhằm quản lý chính xác từng thẻ voucher, tuân thủ đúng kịch bản kiểm thử `TC-EX-02`. Khi đặt hàng thành công, hệ thống ghi đè `sudung = 1`, mã tự động biến mất khỏi dropdown.

---

### ❓ Câu 3: Làm thế nào để hệ thống đảm bảo số lượng tồn kho không bị âm khi có nhiều người đặt hàng cùng lúc?
👉 **Trả lời:** Trong `order.controller.js`, em dùng **Database Transaction** kết hợp khóa dòng **`FOR UPDATE`**:
`SELECT ... FROM luachon_sanpham WHERE maluachon = ? FOR UPDATE;`.
Dòng dữ liệu bị khóa tạm thời cho Khách A. Nếu Khách B đến sau, Database ép Khách B chờ. Khi Khách A mua xong làm tồn kho = 0, Khách B mới vào đọc kho = 0 ➔ Backend `rollback()` hủy đơn Khách B và báo "Hết hàng", tránh hoàn toàn việc kho bị âm.

---

### ❓ Câu 4: Khi sản phẩm giảm giá %, hệ thống tính tiền Hóa đơn điện tử như thế nào?
👉 **Trả lời:** Trong `order.controller.js`, em lấy `const donGia = item.dongia` (đơn giá đã trừ % khuyến mãi truyền từ giỏ hàng). Nên Chi tiết đơn hàng, Hóa đơn và Tổng tiền cuối cùng đều khớp 100% với giá sale.

---

### ❓ Câu 5: Cơ chế gửi Email tự động sau khi đặt hàng hoạt động ra sao?
👉 **Trả lời:** Sau khi `commit()` đơn hàng thành công, Backend tự động gọi `sendOrderConfirmationEmail()` trong `server/utils/email.js`. Nodemailer mở kết nối **Gmail SMTP Cổng 465 SSL** gửi thư HTML chứa chi tiết đơn hàng đến mail khách chỉ trong 1 - 2 giây.

---

### ❓ Câu 6: Khi Admin bấm "Xác nhận đã nhận hàng trả", hệ thống xử lý hoàn kho ở đâu?
👉 **Trả lời:** Nằm ở file `return.controller.js` hàm `confirmReceived()` (Dòng 94-145). Backend đọc sản phẩm bị trả và chạy 3 câu SQL `UPDATE` cộng hoàn lại tồn kho cho cả 3 bảng (`tonkho`, `sanpham`, `luachon_sanpham`).

---

### ❓ Câu 7: Vì sao em lại gỡ bỏ các chữ màu hồng `tag-khuyen-mai` trên thẻ sản phẩm?
👉 **Trả lời:** Nghiệp vụ thực tế chỉ hiển thị nhãn giảm giá khi sản phẩm nằm trong chiến dịch Siêu Sale có hiệu lực. Em dọn dẹp các chữ màu hồng rác trong `ProductList.js` để giao diện chuẩn thẩm mỹ, chuyên nghiệp và chuẩn dữ liệu Database.

---

### ❓ Câu 8: Chức năng Thanh toán QR Code làm ở đâu và hoạt động ra sao?
👉 **Trả lời:** 
- **Mã QR:** Viết tại `ThanhToanQR.js` (Dòng 36-44) nhúng **VietQR API** tự động chèn STK, Tên TK, Số tiền và Nội dung `HONGXINH DH<Mã_Đơn>`.
- **Giả lập Demo:** Nút "Giả lập: Khách đã quét QR" (Dòng 80-90) gửi `isDemo: true` lên Backend `order.controller.js` (Dòng 147) tự tạo mã giao dịch `QR<TIMESTAMP>` và ghi nhận `dathanhtoan` trong bảng `thanhtoan`.

---

### ❓ Câu 9: Chức năng Thống kê doanh thu tính làm sao và lượt truy cập lấy từ đâu?
👉 **Trả lời:** 
- **Doanh thu:** Viết ở `stats.controller.js` (Dòng 14-48) dùng SQL `SELECT SUM(tongtien) FROM donhang WHERE trangthaidonhang = 'hoanthanh'` (chỉ tính đơn hoàn thành thực tế).
- **Lượt truy cập:** Dùng Middleware `trackVisitor` đếm lượt xem ngầm trong RAM (`globalVisitorCount++`) giúp hiển thị live traffic cho Admin mà không làm nặng DB.

---

### ❓ Câu 10: Điểm mạnh kỹ thuật lớn nhất của đồ án này là gì?
👉 **Trả lời:** 
1. **Kiến trúc RESTful API chuẩn hóa:** Tách biệt ReactJS Frontend và Node.js Express Backend.
2. **Database Cloud TiDB MySQL 8.0:** Khả năng mở rộng, lưu trữ cloud mượt mà.
3. **Giao dịch an toàn (ACID Transactions & FOR UPDATE Locking):** Không nghẽn kho, không âm kho, không trùng voucher.
4. **Tích hợp Email SMTP SSL 465 tự động:** Xác nhận đơn hàng trực tiếp tới hòm thư người dùng.
