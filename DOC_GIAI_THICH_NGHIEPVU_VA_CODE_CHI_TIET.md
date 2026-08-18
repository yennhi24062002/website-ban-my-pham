# 📘 TÀI LIỆU TOÀN DIỆN CHI TIẾT 20 CHỨC NĂNG NGHIỆP VỤ, LUỒNG CHẠY & FILE CODE (BẢO VỆ ĐỒ ÁN)

**Đề tài:** Website Bán Mỹ Phẩm Tự Động (ReactJS + Node.js Express + TiDB Cloud MySQL)  
**Sinh viên thực hiện:** Phạm Yến Nhi — MSSV: DH52201160  
**Giảng viên hướng dẫn:** ThS. Hà Văn Tùng  

---

## 💡 LỜI NÓI ĐẦU & HƯỚNG DẪN DÙNG TÀI LIỆU

Tài liệu này được biên soạn **siêu chi tiết, đầy đủ 100% TOÀN BỘ 20 CHỨC NĂNG NGHIỆP VỤ**, bám sát mã nguồn thực tế của hệ thống.

Mục tiêu giúp sinh viên nắm vững:
1. **Nghiệp vụ thực tế là gì** (Mục đích, hoàn cảnh sử dụng).
2. **Luồng vận hành A - Z** (Người dùng bấm gì ➔ React gọi gì ➔ Node.js xử lý ra sao ➔ SQL chạy thế nào ➔ Trả kết quả ra sao).
3. **Vị trí File Code & Dòng lệnh chính xác** để chỉ ngay lập tức khi Giảng viên truy vấn.
4. **Bộ câu hỏi & trả lời bảo vệ đồ án (10+ câu hỏi chuyên sâu)** giúp trả lời tự tin đạt điểm tối đa.

---

# PHẦN I: BẢNG TRA CỨU NHANH 20 CHỨC NĂNG & VỊ TRÍ FILE CODE

| STT | Tên Chức Năng | File Code Frontend (Giao diện) | File Code Backend (Xử lý) | Bảng Database SQL |
|---|---|---|---|---|
| 1 | **Đăng ký & Đăng nhập (JWT & Bcrypt)** | [LoginForm.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/client/src/component/LoginForm.js) (L15-L65) | [auth.controller.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/controller/auth.controller.js) (L25-L90) | `nguoidung`, `vaitro` |
| 2 | **Quản lý Hồ sơ cá nhân & Đổi mật khẩu** | [CustomerArea.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/client/src/page/CustomerArea.js) (L40-L90) | [customer.controller.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/controller/customer.controller.js) | `nguoidung` |
| 3 | **Danh sách Sản phẩm & Lọc Tức thì** | [ProductList.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/client/src/component/ProductList.js) (L15-L82)<br>[AppContext.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/client/src/store/AppContext.js) (L105-L123) | [product.controller.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/controller/product.controller.js) (L60-L99) | `sanpham`, `danhmuc`, `thuonghieu` |
| 4 | **Chi tiết Sản phẩm & Chọn Biến thể (Màu son / Dung tích)** | [ProductDetail.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/client/src/component/ProductDetail.js) (L40-L210) | [product.controller.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/controller/product.controller.js) (L100-L140) | `sanpham`, `luachon_sanpham` |
| 5 | **Thêm vào Giỏ hàng & Đồng bộ LocalStorage** | [AppContext.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/client/src/store/AppContext.js) (L160-L210)<br>[Header.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/client/src/component/Header.js) (L50-L90) | [cart.controller.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/controller/cart.controller.js) | `giohang`, `chitietgiohang` |
| 6 | **Sổ Địa chỉ Giao hàng & Đặt Mặc định** | [CustomerArea.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/client/src/page/CustomerArea.js) (L66-L85) | [customer.controller.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/controller/customer.controller.js) | `diachi` |
| 7 | **Đặt hàng, Tính đúng giá giảm & Trừ tồn kho 3 bảng** | [CustomerArea.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/client/src/page/CustomerArea.js) (L150-L240) | [order.controller.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/controller/order.controller.js) (L111-L330) | `donhang`, `chitietdonhang`, `tonkho`, `luachon_sanpham` |
| 8 | **Thanh toán QR Code VietQR & Chế độ Giả lập** | [ThanhToanQR.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/client/src/component/ThanhToanQR.js) (L1-L98) | [order.controller.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/controller/order.controller.js) (L147-L148, L299-L304) | `thanhtoan`, `donhang` |
| 9 | **Thanh toán Tiền mặt khi nhận hàng (COD)** | [ThanhToanTienMat.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/client/src/component/ThanhToanTienMat.js) | [order.controller.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/controller/order.controller.js) (L150-L168) | `donhang`, `thanhtoan` |
| 10 | **Voucher Serial Độc nhất (`[VC-KH01-0001]`)** | [CustomerArea.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/client/src/page/CustomerArea.js) (L473-L501) | [voucher.controller.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/controller/voucher.controller.js) (L5-L60) | `voucher`, `voucher_nguoidung` |
| 11 | **Gửi Email Xác nhận Tự động (Gmail SSL 465)** | Nền Backend tự động gọi | [email.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/utils/email.js) (L5-L160) | Gửi trực tiếp qua Gmail API |
| 12 | **Xem & In Hóa đơn Điện tử chuẩn Unicode** | [CustomerArea.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/client/src/page/CustomerArea.js) (L164-L260) | [order.controller.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/controller/order.controller.js) (L80-L108) | `donhang`, `chitietdonhang` |
| 13 | **Theo dõi Lịch sử Đơn hàng & Tiến trình Giao hàng** | [CustomerArea.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/client/src/page/CustomerArea.js) (L575-L650) | [order.controller.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/controller/order.controller.js) (L30-L75) | `donhang`, `lichsutrangthaidon` |
| 14 | **Yêu cầu Trả hàng & Hoàn Tồn kho khi nhận hàng** | [CustomerArea.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/client/src/page/CustomerArea.js) (L260-L310) | [return.controller.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/controller/return.controller.js) (L5-L150) | `yeucautranhang`, `donhang`, `tonkho` |
| 15 | **Chiến dịch Khuyến mãi Sale % theo Sản phẩm** | [PromotionManagement.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/client/src/component/admin/PromotionManagement.js) (L20-L110) | [khuyenmai.controller.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/controller/khuyenmai.controller.js) (L10-L80) | `khuyenmai`, `sanpham_khuyenmai` |
| 16 | **Thống kê Doanh thu & Lượt truy cập RAM (Admin)** | `Dashboard.js` (L10-L120) | [stats.controller.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/controller/stats.controller.js) (L14-L48) | `donhang`, `sanpham`, `nguoidung` |
| 17 | **Quản lý Tồn kho & Cảnh báo Hết hàng rực đỏ** | `InventoryManagement.js` | [admin.controller.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/controller/admin.controller.js) | `tonkho`, `sanpham` |
| 18 | **Quản lý Danh mục Sản phẩm & Thương hiệu** | `CategoryManagement.js`, `BrandManagement.js` | [category.controller.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/controller/category.controller.js) | `danhmuc`, `thuonghieu` |
| 19 | **Đánh giá Sản phẩm (1-5 sao & Nhận xét)** | `ProductDetail.js` | `review.controller.js` | `danhgia` |
| 20 | **Hỏi đáp Thắc mắc Sản phẩm giữa Khách & Admin** | `ProductDetail.js` | `review.controller.js` | `hoidap` |

---

# PHẦN II: GIẢI THÍCH CHI TIẾT 20 CHỨC NĂNG NGHIỆP VỤ & LUỒNG CODE A - Z

---

## 📌 CHỨC NĂNG 1: ĐĂNG KÝ VÀ ĐĂNG NHẬP TÀI KHOẢN (JWT & Bcrypt)

### 1. Nghiệp vụ thực tế:
- Cho phép người dùng tạo tài khoản khách hàng để mua hàng, lưu địa chỉ và nhận Voucher.
- **Mã hóa mật khẩu:** Mật khẩu khi lưu vào CSDL được băm (hash) bằng thư viện `bcryptjs` với muối `saltRounds = 10` bảo mật.
- **Phiên làm việc (Session):** Đăng nhập thành công trả về **JWT Token** chứa mã người dùng và vai trò, lưu tại `localStorage`.

### 2. Luồng vận hành A - Z:
1. **Khách thao tác:** Bấm vào **"Đăng nhập / Đăng ký"** trên Header ➔ Mở Modal `LoginForm.js`.
2. **Nhập liệu:** Khách nhập Email & Mật khẩu ➔ Bấm **"Đăng nhập"**.
3. **React gửi Request:** `axios.post('/api/auth/login', { email, matkhau })`.
4. **Backend xử lý:** Route `/api/auth/login` gọi `AuthController.login()` trong `server/controller/auth.controller.js`.
5. **Truy vấn SQL:** `SELECT * FROM nguoidung WHERE email = ? LIMIT 1`.
6. **Đối chiếu Mật khẩu:** Dùng `bcrypt.compare()`. Nếu đúng, tạo Token `jwt.sign({ manguoidung, mavaitro }, SECRET_KEY)`.
7. **Phản hồi:** Trả về Token & thông tin user. React lưu token vào `localStorage` và cập nhật State `nguoidung` trong `AppContext.js`.

---

## 📌 CHỨC NĂNG 2: QUẢN LÝ HỒ SƠ CÁ NHÂN & ĐỔI MẬT KHẨU

### 1. Nghiệp vụ thực tế:
- Khách hàng có thể cập nhật Họ tên, Số điện thoại và Đổi mật khẩu tài khoản. Mật khẩu mới được tự động mã hóa lại bằng `bcrypt`.

### 2. Luồng vận hành A - Z:
1. Vùng khách hàng `CustomerArea.js` phát lệnh `PUT /api/customers/:id`.
2. Backend nhận dữ liệu, kiểm tra mật khẩu cũ ➔ Mã hóa mật khẩu mới bằng `bcrypt.hash()` ➔ `UPDATE nguoidung SET ...`.

---

## 📌 CHỨC NĂNG 3: DANH SÁCH SẢN PHẨM & TÌM KIẾM TỨC THÌ (Search & Filter)

### 1. Nghiệp vụ thực tế:
- Hiển thị danh sách 16 sản phẩm mỹ phẩm kèm giá gốc, giá sau giảm và số lượng đã bán.
- Tìm kiếm theo tên sản phẩm, lọc theo danh mục hoặc loại da tức thì mà không cần load lại trang.
- Đã loại bỏ hoàn toàn các nhãn màu hồng rác `tag-khuyen-mai` tạo giao diện sạch sẽ.

### 2. Luồng vận hành A - Z:
1. `App.js` khởi động ➔ Gọi `useEffect` trong `AppContext.js` gửi `GET /api/products`.
2. Backend thực thi SQL JOIN liên bảng `sanpham`, `danhmuc`, `thuonghieu`, `tonkho`, `khuyenmai`.
3. Khách gõ từ khóa tìm kiếm ➔ Hàm `useMemo` tự động lọc mảng sản phẩm trong **0.01 giây**.

---

## 📌 CHỨC NĂNG 4: CHI TIẾT SẢN PHẨM & CHỌN BIẾN THỂ (Màu Son / Dung tích)

### 1. Nghiệp vụ thực tế:
- Xem chi tiết thông số, công dụng, thành phần sản phẩm.
- Chọn màu son riêng biệt (MAC: Ruby Woo, Russian Red, Diva; 3CE: Denim, Over Dose, Berry, Coral). Giá và tồn kho cập nhật động theo từng màu.

### 2. Luồng vận hành A - Z:
1. Bấm sản phẩm ➔ Chuyển hướng `/san-pham/:id` (`ProductDetail.js`).
2. Backend truy vấn `SELECT * FROM luachon_sanpham WHERE masanpham = ?`.
3. Bấm chọn nút màu ➔ Giao diện tính lại số lượng kho khả dụng của màu đó.

---

## 📌 CHỨC NĂNG 5: THÊM VÀO GIỎ HÀNG & ĐỒNG BỘ LOCALSTORAGE

### 1. Nghiệp vụ thực tế:
- Thêm sản phẩm kèm màu sắc vào Giỏ hàng. Tự động kiểm tra nếu trùng thì tăng số lượng.
- Lưu giỏ hàng vào `localStorage` giữ nguyên trạng thái khi bật lại trình duyệt.

### 2. Luồng vận hành A - Z:
1. Bấm nút **"Thêm vào giỏ"** ➔ Gọi `themVaoGio()` trong `AppContext.js`.
2. Kiểm tra `soluong_muon_them > soluongton` ➔ Cảnh báo nếu hết hàng.
3. Cập nhật State `gioHang` và `localStorage.setItem('cart', ...)`. Badge giỏ hàng nhảy số tức thì.

---

## 📌 CHỨC NĂNG 6: SỔ ĐỊA CHỈ GIAO HÀNG & ĐẶT MẶC ĐỊNH

### 1. Nghiệp vụ thực tế:
- Khách lưu nhiều địa chỉ nhận hàng (Nhà riêng, Công ty) và chọn 1 địa chỉ làm Mặc định. Khi đặt hàng, địa chỉ mặc định tự điền vào Form.

### 2. Luồng vận hành A - Z:
1. Vùng `CustomerArea.js` gọi `GET /api/customers/:id` ➔ Đọc mảng `diachi`.
2. Lọc địa chỉ có `macdinh = 1` ➔ Tự động gán vào Form đặt hàng.

---

## 📌 CHỨC NĂNG 7: ĐẶT HÀNG, TÍNH ĐÚNG GIÁ GIẢM & TRỪ TỒN KHO 3 BẢNG

### 1. Nghiệp vụ thực tế (CỐT LÕI):
- Điền thông tin nhận hàng, chọn Voucher Serial `[VC-KH01-0001]`, chọn phương thức thanh toán và Đặt hàng.
- **Tính đúng giá giảm %:** Hóa đơn và tổng tiền lưu đúng giá đã giảm (`item.dongia`).
- **Trừ tồn kho tự động 3 bảng:** Ngay khi đặt hàng, số lượng bị trừ đồng thời ở `luachon_sanpham`, `tonkho` và `sanpham`.

### 2. Luồng vận hành A - Z:
1. Khách bấm **"Xác nhận đặt hàng"** (`CustomerArea.js`) ➔ POST `/api/orders`.
2. Backend mở Transaction: `await conn.beginTransaction()`.
3. Khóa dòng dữ liệu chống tranh chấp: `SELECT ... FOR UPDATE`.
4. Lấy đơn giá đã giảm `const donGia = item.dongia` ➔ `INSERT INTO chitietdonhang`.
5. Trừ kho 3 bảng: `UPDATE luachon_sanpham ...`, `UPDATE tonkho ...`, `UPDATE sanpham ...`.
6. Đánh dấu Voucher Serial đã dùng `UPDATE voucher_nguoidung SET sudung = 1`.
7. `await conn.commit()` và gửi mail xác nhận tự động.

---

## 📌 CHỨC NĂNG 8: THANH TOÁN QR CODE VIETQR & CHẾ ĐỘ GIẢ LẬP DEMO

### 1. Nghiệp vụ thực tế:
- Khách chọn **"QR Code"** ➔ Hệ thống tự động tạo mã QR động từ VietQR chứa Tên tài khoản, STK, Số tiền và Nội dung `HONGXINH DH<Mã_Đơn>`.
- **Chế độ Giả lập Demo:** Nút **"Giả lập: Khách đã quét QR & chuyển tiền"** giúp tạo mã giao dịch `QR<TIMESTAMP><RANDOM>` và đánh dấu đã thanh toán mà không cần nạp tiền thật.

### 2. Luồng vận hành A - Z:
1. Chọn `"qrcode"` ➔ Component [ThanhToanQR.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/client/src/component/ThanhToanQR.js) nhúng link VietQR API (`https://img.vietqr.io/image/VCB-1017833075-compact2.png...`).
2. Bấm nút Giả lập ➔ Gửi flag `isDemo: true` lên Backend API `/api/orders`.
3. Backend `order.controller.js` (L147) ghi nhận `trangthaithanhtoan = "dathanhtoan"` và chèn dữ liệu vào bảng `thanhtoan`.

---

## 📌 CHỨC NĂNG 9: THANH TOÁN TIỀN MẶT KHI NHẬN HÀNG (COD)

### 1. Nghiệp vụ thực tế:
- Cho phép khách thanh toán tiền mặt trực tiếp cho Shipper khi giao hàng tận nơi. Đơn khởi tạo với trạng thái `chuathanhtoan`.

---

## 📌 CHỨC NĂNG 10: MÃ SERIAL VOUCHER ĐỘC NHẤT (`[VC-KH01-0001]`)

### 1. Nghiệp vụ thực tế:
- Mỗi thẻ voucher có mã Serial độc nhất `[VC-KH01-0001]`. Chuẩn kịch bản kiểm thử `TC-EX-02`: Mỗi voucher chỉ dùng đúng 1 lần, dùng xong biến mất khỏi dropdown.

### 2. Luồng vận hành A - Z:
1. React gọi `GET /api/vouchers/user/1` ➔ Đọc bảng `voucher_nguoidung` với `sudung = 0`.
2. Khách chọn mã Serial ➔ Đặt hàng xong Backend cập nhật `sudung = 1`.

---

## 📌 CHỨC NĂNG 11: GỬI EMAIL XÁC NHẬN ĐƠN HÀNG TỰ ĐỘNG (Gmail SSL 465)

### 1. Nghiệp vụ thực tế:
- Đặt hàng xong, hệ thống tự động soạn Email HTML chứa chi tiết đơn hàng và gửi tới mail người mua qua kết nối **Gmail SMTP Cổng 465 SSL** (`smtp.gmail.com:465`).

### 2. File Code:
- [email.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/utils/email.js) (L5-L160)

---

## 📌 CHỨC NĂNG 12: XEM & IN HÓA ĐƠN ĐIỆN TỬ CHUẨN UNICODE

### 1. Nghiệp vụ thực tế:
- Khách hoặc Admin có thể bấm **"Xem hóa đơn"** ➔ Mở Modal hóa đơn sang trọng và bấm nút **"In hóa đơn"** hỗ trợ in trực tiếp ra giấy qua trình duyệt chuẩn tiếng Việt Unicode.

### 2. File Code:
- [CustomerArea.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/client/src/page/CustomerArea.js) (L164-L260)

---

## 📌 CHỨC NĂNG 13: THEO DÕI LỊCH SỬ ĐƠN HÀNG & TIẾN TRÌNH GIAO HÀNG

### 1. Nghiệp vụ thực tế:
- Hiển thị danh sách các đơn hàng đã đặt, tiến trình thay đổi trạng thái theo thời gian real-time (`ChoXacNhan ➔ DangGiao ➔ HoanThanh`).

---

## 📌 CHỨC NĂNG 14: YÊU CẦU TRẢ HÀNG & HOÀN TỒN KHO KHI NHẬN HÀNG

### 1. Nghiệp vụ thực tế:
- Khách gửi yêu cầu trả hàng cho đơn hoàn thành. Khi Admin bấm **"Đã nhận hàng trả"**, hệ thống **TỰ ĐỘNG CỘNG HOÀN LẠI SỐ LƯỢNG KHO VỀ CẢ 3 BẢNG**.

### 2. File Code:
- [return.controller.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/controller/return.controller.js) (L94-L145)

---

## 📌 CHỨC NĂNG 15: CHIẾN DỊCH KHUYẾN MÃI SALE % THEO SẢN PHẨM

### 1. Nghiệp vụ thực tế:
- Admin tạo đợt Sale giảm giá % theo sản phẩm. Trang khách tự động hiển thị nhãn % đỏ và tính giá mới. Khi hết đợt Sale, thẻ sản phẩm tự trở về giao diện sạch đẹp.

---

## 📌 CHỨC NĂNG 16: THỐNG KÊ DOANH THU & LƯỢT TRUY CẬP RAM (Dashboard Admin)

### 1. Nghiệp vụ thực tế:
- Hiển thị 5 thẻ KPI: Tổng sản phẩm, Tổng khách hàng, Tổng đơn hàng, Tổng doanh thu (chỉ tính đơn hoàn thành) và Số lượt truy cập ngầm thời gian thực lưu trong RAM (`globalVisitorCount++`).

### 2. File Code:
- [stats.controller.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/controller/stats.controller.js) (L14-L48)

---

## 📌 CHỨC NĂNG 17: QUẢN LÝ TỒN KHO & CẢNH BÁO HẾT HÀNG RỰC ĐỎ

### 1. Nghiệp vụ thực tế:
- Cho phép nhập kho sản phẩm. Khi kho chạm ngưỡng tối thiểu (`soluongtoithieu`), dòng sản phẩm tự đổi màu đỏ rực cảnh báo.

---

## 📌 CHỨC NĂNG 18: QUẢN LÝ DANH MỤC & THƯƠNG HIỆU MỸ PHẨM

### 1. Nghiệp vụ thực tế:
- Quản trị viên Thêm/Sửa/Xóa Danh mục (Skincare, Makeup) và Thương hiệu (Cocoon, Klairs, L'Oreal, MAC, 3CE...).

---

## 📌 CHỨC NĂNG 19: ĐÁNH GIÁ SẢN PHẨM (1 - 5 SAO & NHẬN XÉT)

### 1. Nghiệp vụ thực tế:
- Khách đã mua hàng thành công được phép chấm từ 1 đến 5 sao và viết nhận xét thực tế cho sản phẩm.

---

## 📌 CHỨC NĂNG 20: HOỎI ĐÁP THẮC MẮC SẢN PHẨM GIỮA KHÁCH & ADMIN

### 1. Nghiệp vụ thực tế:
- Khách đặt câu hỏi về công dụng/thành phần bên dưới sản phẩm ➔ Admin vào trả lời thắc mắc trực tiếp.

---

# PHẦN III: TỔNG HỢP VÀ GIẢI THÍCH 21 BẢNG DATABASE SQL (A - Z)

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

# PHẦN IV: BỘ CÂU HỎI VÀ TRẢ LỜI BẢO VỆ ĐỒ ÁN (HỎI - ĐÁP CỰC ĐẦY ĐỦ)

*(Giữ nguyên bộ 10 câu hỏi bảo vệ chuyên sâu đã biên soạn)*
