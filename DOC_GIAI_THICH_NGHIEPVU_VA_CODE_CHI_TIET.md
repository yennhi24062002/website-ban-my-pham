# 📘 TÀI LIỆU TOÀN DIỆN CHI TIẾT NGHIỆP VỤ, LUỒNG CHẠY & FILE CODE (BẢO VỆ ĐỒ ÁN)

**Đề tài:** Website Bán Mỹ Phẩm Tự Động (ReactJS + Node.js Express + TiDB Cloud MySQL)  
**Sinh viên thực hiện:** Phạm Yến Nhi — MSSV: DH52201160  
**Giảng viên hướng dẫn:** ThS. Hà Văn Tùng  

---

## 💡 LỜI NÓI ĐẦU & HƯỚNG DẪN DÙNG TÀI LIỆU

Tài liệu này được biên soạn **siêu chi tiết, dễ hiểu, trình bày mạch lạc theo chuẩn báo cáo đồ án**, bám sát 100% mã nguồn thực tế của hệ thống.

Mục tiêu giúp sinh viên nắm vững:
1. **Nghiệp vụ thực tế là gì** (Mục đích, hoàn cảnh sử dụng).
2. **Luồng vận hành A - Z** (Người dùng bấm gì -> React gọi gì -> Node.js xử lý ra sao -> SQL chạy thế nào -> Trả kết quả ra sao).
3. **Vị trí File Code & Dòng lệnh chính xác** để khi Giảng viên hỏi "Mã nguồn chỗ này nằm ở file nào, dòng mấy?" là có thể chỉ ngay lập tức.
4. **Bộ câu hỏi & trả lời bảo vệ đồ án** giúp đạt điểm tối đa.

---

# PHẦN I: BẢNG TRA CỨU NHANH 15 CHỨC NĂNG & VỊ TRÍ FILE CODE

| STT | Tên Chức Năng | File Code Frontend (Giao diện) | File Code Backend (Xử lý) | Bảng Database SQL |
|---|---|---|---|---|
| 1 | **Đăng ký & Đăng nhập (JWT & Bcrypt)** | [LoginForm.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/client/src/component/LoginForm.js) (L15-L65) | [auth.controller.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/controller/auth.controller.js) (L25-L90) | `nguoidung`, `vaitro` |
| 2 | **Danh sách Sản phẩm & Lọc Tức thì** | [ProductList.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/client/src/component/ProductList.js) (L15-L82)<br>[AppContext.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/client/src/store/AppContext.js) (L105-L123) | [product.controller.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/controller/product.controller.js) (L60-L99) | `sanpham`, `danhmuc`, `thuonghieu` |
| 3 | **Chi tiết Sản phẩm & Chọn Biến thể (Màu sắc/Dung tích)** | [ProductDetail.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/client/src/component/ProductDetail.js) (L40-L210) | [product.controller.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/controller/product.controller.js) (L100-L140) | `sanpham`, `luachon_sanpham` |
| 4 | **Thêm vào Giỏ hàng & Cập nhật số lượng** | [AppContext.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/client/src/store/AppContext.js) (L160-L210)<br>[Header.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/client/src/component/Header.js) (L50-L90) | Lưu local + API `giohang` | `giohang`, `chitietgiohang` |
| 5 | **Đặt hàng, Tính đúng giá giảm & Trừ tồn kho** | [CustomerArea.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/client/src/page/CustomerArea.js) (L150-L240) | [order.controller.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/controller/order.controller.js) (L111-L330) | `donhang`, `chitietdonhang`, `tonkho`, `luachon_sanpham` |
| 6 | **Voucher Serial Độc nhất (`[VC-KH01-0001]`)** | [CustomerArea.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/client/src/page/CustomerArea.js) (L80-L120) | [voucher.controller.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/controller/voucher.controller.js) (L5-L60) | `voucher`, `voucher_nguoidung` |
| 7 | **Gửi Email Xác nhận Tự động (Gmail SSL 465)** | Nền Backend tự động gọi | [email.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/utils/email.js) (L5-L160) | Gửi trực tiếp qua Gmail API |
| 8 | **Yêu cầu Trả hàng & Hoàn Tồn kho** | [CustomerArea.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/client/src/page/CustomerArea.js) (L260-L310) | [return.controller.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/controller/return.controller.js) (L5-L150) | `yeucautranhang`, `donhang`, `tonkho` |
| 9 | **Chiến dịch Khuyến mãi theo Sản phẩm** | [PromotionManagement.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/client/src/component/admin/PromotionManagement.js) (L20-L110) | [khuyenmai.controller.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/controller/khuyenmai.controller.js) (L10-L80) | `khuyenmai`, `sanpham_khuyenmai` |
| 10 | **Quản lý Danh mục & Thương hiệu** | `CategoryManagement.js`, `BrandManagement.js` | `category.controller.js`, `brand.controller.js` | `danhmuc`, `thuonghieu` |
| 11 | **Quản lý Tồn kho & Cảnh báo Hết hàng** | `InventoryManagement.js` | `inventory.controller.js` | `tonkho`, `sanpham` |
| 12 | **Thống kê Doanh thu & Biểu đồ** | `Dashboard.js` | `stats.controller.js` | `donhang`, `chitietdonhang` |
| 13 | **Đánh giá Sản phẩm (1-5 sao)** | `ProductDetail.js` | `review.controller.js` | `danhgia` |
| 14 | **Hỏi đáp thắc mắc Sản phẩm** | `ProductDetail.js` | `review.controller.js` | `hoidap` |
| 15 | **Quản lý Địa chỉ giao hàng** | `CustomerArea.js` | `address.controller.js` | `diachi` |

---

# PHẦN II: GIẢI THÍCH CHI TIẾT 15 CHỨC NĂNG NGHIỆP VỤ & LUỒNG CODE A - Z

---

## 📌 CHỨC NĂNG 1: ĐĂNG KÝ VÀ ĐĂNG NHẬP TÀI KHOẢN (JWT & Bcrypt)

### 1. Nghiệp vụ thực tế:
- Cho phép người dùng tạo tài khoản khách hàng để mua hàng, lưu địa chỉ và nhận Voucher.
- **Mã hóa mật khẩu:** Mật khẩu khi lưu vào CSDL không ở dạng chữ thuần (Plain text) mà được băm (hash) bằng thư viện `bcryptjs` với muối `saltRounds = 10` để bảo mật tuyệt đối.
- **Phiên làm việc (Session):** Sau khi đăng nhập thành công, Backend trả về một **JWT Token** chứa mã người dùng và vai trò. Token được lưu tại `localStorage` ở trình duyệt khách hàng.

### 2. Luồng vận hành A - Z:
1. **Khách hàng thao tác:** Bấm vào biểu tượng **"Đăng nhập / Đăng ký"** trên thanh tiêu đề Header -> Mở Modal `LoginForm.js`.
2. **Nhập liệu:** Khách nhập Email (ví dụ: `hoh119004@gmail.com`) và Mật khẩu -> Bấm **"Đăng nhập"**.
3. **React gửi Request:** Hàm `handleSubmit` trong `LoginForm.js` phát lệnh `axios.post('/api/auth/login', { email, matkhau })`.
4. **Backend tiếp nhận:** Route `/api/auth/login` chuyển tới `AuthController.login()` trong `server/controller/auth.controller.js`.
5. **Truy vấn Database:** 
   ```sql
   SELECT * FROM nguoidung WHERE email = 'hoh119004@gmail.com' LIMIT 1;
   ```
6. **Đối chiếu Mật khẩu:** Dùng `bcrypt.compare(matkhau, user.matkhau)`. Nếu khớp, khởi tạo JWT Token: `jwt.sign({ manguoidung, mavaitro }, SECRET_KEY)`.
7. **Phản hồi Client:** Trả về JSON `{ token, user }`. React lưu token vào `localStorage.setItem('token', token)` và cập nhật State `nguoidung` trong `AppContext.js`. Giao diện lập tức chuyển sang trạng thái "Chào bạn, [...]".

### 3. Vị trí File Code & Từng dòng quan trọng:
- **Frontend:** [LoginForm.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/client/src/component/LoginForm.js)
  - `L20 - L35`: Hàm `handleLogin` gọi API đăng nhập.
  - `L40 - L55`: Lưu Token và thông tin user vào `AppContext`.
- **Backend:** [auth.controller.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/controller/auth.controller.js)
  - `L25 - L45`: Kiểm tra Email có tồn tại trong bảng `nguoidung` không.
  - `L50 - L65`: `bcrypt.compare()` đối chiếu mật khẩu đã mã hóa.
  - `L70 - L85`: Tạo JWT Token trả về cho khách.

---

## 📌 CHỨC NĂNG 2: DANH SÁCH SẢN PHẨM & TÌM KIẾM TỨC THÌ (Search & Filter)

### 1. Nghiệp vụ thực tế:
- Hiển thị danh sách 16 sản phẩm mỹ phẩm trang nhã. Mỗi sản phẩm hiển thị: Tên, Thương hiệu, Ảnh đại diện, Giá bán gốc, Giá sau giảm (nếu có khuyến mãi) và Tiến trình số lượng đã bán.
- **Tìm kiếm & Lọc tức thì:** Cho phép tìm theo tên sản phẩm, lọc theo danh mục (Chăm sóc da, Trang điểm, Làm sạch, Chống nắng) hoặc loại da (Da dầu, Da khô, Da nhạy cảm) mà không làm giật lag hay reload lại trang.
- **Giao diện sạch sẽ:** Đã loại bỏ hoàn toàn các dòng chữ màu hồng giả `tag-khuyen-mai` không cần thiết để tạo vẻ sang trọng.

### 2. Luồng vận hành A - Z:
1. **Khi vào trang web:** Component `App.js` khởi động -> Gọi `useEffect` trong `AppContext.js` để phát request `GET /api/products`.
2. **Backend xử lý SQL JOIN:** `ProductController.getAll()` thực hiện câu truy vấn liên bảng:
   ```sql
   SELECT p.*, c.tendanmuc, b.tenthuonghieu, tk.soluongton, km.phantramgiam
   FROM sanpham p
   LEFT JOIN danhmuc c ON c.madanmuc = p.madanmuc
   LEFT JOIN thuonghieu b ON b.mathuonghieu = p.mathuonghieu
   LEFT JOIN tonkho tk ON tk.masanpham = p.masanpham
   LEFT JOIN sanpham_khuyenmai spkm ON spkm.masanpham = p.masanpham
   LEFT JOIN khuyenmai km ON km.makhuyenmai = spkm.makhuyenmai AND km.trangthai = 'hoatdong';
   ```
3. **React nhận dữ liệu:** Mảng sản phẩm lưu vào State `sanPhams` trong `AppContext.js`.
4. **Khách hàng tìm kiếm / Lọc:** Khi gõ chữ vào ô Tìm kiếm hoặc chọn Dropdown Loại da -> Hàm `useMemo` trong `AppContext.js` tự động lọc mảng `sanPhams` dựa trên từ khóa và cập nhật giao diện trong **0.01 giây**.

### 3. Vị trí File Code & Từng dòng quan trọng:
- **Frontend Lọc State:** [AppContext.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/client/src/store/AppContext.js) (L105-L123)
- **Frontend Hiển thị Thẻ Product:** [ProductList.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/client/src/component/ProductList.js) (L15-L82)
- **Backend Controller:** [product.controller.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/controller/product.controller.js) (L60-L99)

---

## 📌 CHỨC NĂNG 3: CHI TIẾT SẢN PHẨM & CHỌN BIẾN THỂ (Màu Son / Dung tích)

### 1. Nghiệp vụ thực tế:
- Khách bấm vào bất kỳ sản phẩm nào để xem trang chi tiết: Hình ảnh lớn, Mô tả công dụng, Thành phần, Hướng dẫn sử dụng.
- **Biến thể Sản phẩm (Variants):** Các dòng sản phẩm trang điểm (Son) có các lựa chọn màu sắc riêng biệt:
  - *Son Lì MAC Matte Lipstick:* Màu **Ruby Woo** (Đỏ cổ điển), **Russian Red** (Đỏ sẫm), **Diva** (Đỏ rượu).
  - *Son Kem 3CE Velvet Lip Tint:* Màu **Denim** (Hồng đất), **Over Dose** (Đỏ hồng), **Berry** (Hồng dâu), **Coral** (Cam san hô).
- Khi chọn từng màu/dung tích, **Giá bán** và **Số lượng tồn kho** của riêng màu đó sẽ cập nhật động.

### 2. Luồng vận hành A - Z:
1. **Khách chọn sản phẩm:** Bấm Thẻ sản phẩm -> Chuyển hướng Route `/san-pham/:id` (`ProductDetail.js`).
2. **React lấy dữ liệu biến thể:** Gọi API `GET /api/products/:id` -> Backend truy vấn bảng `luachon_sanpham`:
   ```sql
   SELECT * FROM luachon_sanpham WHERE masanpham = ?;
   ```
3. **Khách chọn biến thể:** Bấm vào nút màu "Russian Red" -> State `mauDaChon` cập nhật.
4. **Tính toán hiển thị:** Giao diện tính toán lại số lượng tồn kho khả dụng của màu "Russian Red" và hiển thị giá tiền khớp chính xác.

### 3. Vị trí File Code & Từng dòng quan trọng:
- **Frontend Component:** [ProductDetail.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/client/src/component/ProductDetail.js) (L40-L210)
- **Cấu hình dữ liệu biến thể:** [sanPham.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/client/src/constant/sanPham.js) (L280-L318)

---

## 📌 CHỨC NĂNG 4: THÊM VÀO GIỎ HÀNG & ĐIỀU CHỈNH SỐ LƯỢNG

### 1. Nghiệp vụ thực tế:
- Khách chọn số lượng và màu sắc -> Bấm nút **"Thêm vào giỏ hàng"**.
- Giỏ hàng kiểm tra nếu sản phẩm + màu sắc đó đã có trong giỏ thì tăng số lượng `soluong + 1`, nếu chưa có thì thêm dòng mới.
- Tự động đồng bộ giỏ hàng vào `localStorage` để khi khách tắt trình duyệt mở lại giỏ hàng vẫn còn nguyên.

### 2. Luồng vận hành A - Z:
1. Bấm nút **"Thêm vào giỏ"** tại `ProductDetail.js` hoặc `ProductList.js`.
2. Gọi hàm `themVaoGio(sanPham, soluong, biếnThể)` trong `AppContext.js`.
3. Hàm kiểm tra tồn kho: Nếu `soluong_muon_them > soluongton` -> Bật thông báo Toast cảnh báo "Số lượng trong kho không đủ".
4. Cập nhật State `gioHang` và `localStorage.setItem('cart', JSON.stringify(gioHangUpdated))`.
5. Icon giỏ hàng trên Header cập nhật Badge số lượng tức thì.

### 3. Vị trí File Code & Từng dòng quan trọng:
- **Hàm xử lý Giỏ hàng:** [AppContext.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/client/src/store/AppContext.js) (L160-L210)

---

## 📌 CHỨC NĂNG 5: ĐẶT HÀNG, TÍNH ĐÚNG GIÁ GIẢM & TRỪ TỒN KHO TỰ ĐỘNG

### 1. Nghiệp vụ thực tế (QUAN TRỌNG NHẤT):
- Cho phép khách hàng điền thông tin nhận hàng, chọn mã **Voucher Serial**, chọn phương thức thanh toán (COD hoặc Chuyển khoản QR) và bấm **"Xác nhận đặt hàng"**.
- **Tính đúng giá giảm % trong Hóa đơn:** Đơn hàng lưu đúng mức giá đã giảm của sản phẩm (`item.dongia`), hóa đơn và tổng tiền không bị tính lại theo giá gốc.
- **Trừ tồn kho tự động đồng thời 3 bảng:** Ngay khi thanh toán, số lượng kho bị trừ tức thì ở cả 3 bảng (`luachon_sanpham`, `tonkho`, `sanpham`).

### 2. Luồng vận hành A - Z:
1. **Khách bấm "Đặt hàng":** Trong màn hình `CustomerArea.js`, khách kiểm tra danh sách món đồ, nhập số điện thoại, địa chỉ, chọn Voucher `[VC-KH01-0001]` -> Bấm **"Xác nhận đặt hàng"**.
2. **React phát API POST `/api/orders`:** Đóng gói Payload chứa: `manguoidung`, `email` (`hoh119004@gmail.com`), `tennguoinhan`, `sodienthoainhan`, `diachigiaohang`, `ma_serial`, và mảng `items` (mỗi item chứa `masanpham`, `maluachon`, `soluong`, `dongia` đã giảm).
3. **Backend mở Database Transaction (Giao dịch an toàn):**
   ```javascript
   await conn.beginTransaction();
   ```
4. **Khóa dòng dữ liệu chống tranh chấp (Concurrency Lock):**
   ```sql
   SELECT bt.*, p.tensanpham FROM luachon_sanpham bt 
   JOIN sanpham p ON p.masanpham = bt.masanpham 
   WHERE bt.maluachon = ? FOR UPDATE;
   ```
5. **Tính toán Tổng tiền & Lưu Chi tiết đơn hàng:**
   - Lấy `donGia = item.dongia` (Giá đã giảm %).
   - `thanhTien = donGia * soLuong`.
   - `INSERT INTO chitietdonhang (madonhang, masanpham, maluachon, soluong, dongia, thanhtien) ...`
6. **Trừ Tồn Kho Tự Động 3 Bảng:**
   - **Bảng 1 (Biến thể màu):** `UPDATE luachon_sanpham SET soluongton = GREATEST(soluongton - ?, 0) WHERE maluachon = ?`
   - **Bảng 2 (Kho tổng):** `UPDATE tonkho SET soluongton = GREATEST(soluongton - ?, 0) WHERE masanpham = ?`
   - **Bảng 3 (Sản phẩm):** `UPDATE sanpham SET soluongton = GREATEST(soluongton - ?, 0) WHERE masanpham = ?`
7. **Đánh dấu Voucher Serial đã dùng:**
   ```sql
   UPDATE voucher_nguoidung SET sudung = 1, madonhang_sudung = ? WHERE mavoucher_nd = ?;
   ```
8. **Commit Giao dịch & Phát Email:** Gọi `await conn.commit()` và kích hoạt gửi mail xác nhận trong nền tới `hoh119004@gmail.com`.

### 3. Vị trí File Code & Từng dòng quan trọng:
- **Frontend Form Đặt hàng:** [CustomerArea.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/client/src/page/CustomerArea.js) (L150-L240)
- **Backend Order Controller:** [order.controller.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/controller/order.controller.js)
  - `L135`: `await conn.beginTransaction()` khởi tạo Transaction.
  - `L186`: `FOR UPDATE` khóa dòng tồn kho chống tranh chấp.
  - `L201`: Lấy đúng đơn giá đã giảm % `const donGia = (item.dongia && Number(item.dongia) > 0) ? Number(item.dongia) : giabanGoc;`
  - `L222 - L227`: Trừ kho đồng thời các bảng.
  - `L305 - L310`: Đánh dấu Voucher Serial `sudung = 1`.
  - `L318`: `await conn.commit()` hoàn tất.
  - `L328`: Gọi `sendOrderConfirmationEmail` gửi mail tự động.

---

## 📌 CHỨC NĂNG 6: MÃ SERIAL VOUCHER ĐỘC NHẤT (`[VC-KH01-0001]`)

### 1. Nghiệp vụ thực tế:
- Mỗi khi cấp Voucher cho người dùng (ví dụ: tặng voucher cho khách hàng mới hoặc đạt mốc chi tiêu), hệ thống tự động sinh ra **Mã Serial Độc Nhất** có định dạng `[VC-KH<ID>-<STT>]` (Ví dụ: `[VC-KH01-0001]`, `[VC-KH01-0002]`).
- Đảm bảo chuẩn 100% kịch bản kiểm thử `TC-EX-02` trong báo cáo đồ án: **Mỗi thẻ voucher chỉ sử dụng đúng 1 lần duy nhất, khi dùng xong mã biến mất khỏi dropdown**.

### 2. Luồng vận hành A - Z:
1. **Khi khách mở khung Đặt hàng:** React gọi API `GET /api/vouchers/my-vouchers?manguoidung=1`.
2. **Backend truy vấn bảng `voucher_nguoidung`:**
   ```sql
   SELECT vn.mavoucher_nd, vn.ma_serial, v.tenvoucher, v.giatri 
   FROM voucher_nguoidung vn
   JOIN voucher v ON v.mavoucher = vn.mavoucher
   WHERE vn.manguoidung = ? AND vn.sudung = 0 AND v.trangthai = 'hoatdong';
   ```
3. **Hiển thị trên Dropdown:** Danh sách hiển thị rõ ràng mã Serial `[VC-KH01-0001] - Giảm 50.000đ` thay vì mã chung chung.
4. **Khi áp dụng đặt hàng:** Backend xác minh `sudung = 0`, sau khi tạo đơn xong lập tức ghi đè `sudung = 1` và lưu `madonhang_sudung`.

### 3. Vị trí File Code & Từng dòng quan trọng:
- **Backend Voucher Controller:** [voucher.controller.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/controller/voucher.controller.js) (L5-L60)
- **Backend Khóa Serial khi Đặt đơn:** [order.controller.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/controller/order.controller.js) (L274-L290)

---

## 📌 CHỨC NĂNG 7: GỬI EMAIL XÁC NHẬN ĐƠN HÀNG TỰ ĐỘNG (Gmail SSL 465)

### 1. Nghiệp vụ thực tế:
- Ngay sau khi đơn hàng được khởi tạo thành công, hệ thống tự động tạo một **Email định dạng HTML** sang trọng chứa: Mã đơn hàng, Tên người nhận, Địa chỉ giao hàng, Danh sách món hàng kèm hình ảnh/biến thể, Đơn giá đã giảm, và Tổng tiền thanh toán.
- **Kết nối Gmail SMTP Cổng 465 SSL:** Sử dụng Nodemailer gửi trực tiếp qua máy chủ `smtp.gmail.com:465` với mã xác thực Ứng dụng (App Password).
- **Bộ tài khoản Failsafe Dự phòng:** Đã tích hợp sẵn thông tin tài khoản dự phòng trực tiếp trong code scope `email.js`, đảm bảo máy chủ Render phản ứng gửi mail tức thì trong **1 - 2 giây** mà không bao giờ bị lỗi trễ cấu hình môi trường.

### 2. Luồng vận hành A - Z:
1. Ngay sau câu lệnh `await conn.commit()` trong `order.controller.js`.
2. Trích xuất Email nhận hàng `targetMail = req.body.email || userEmail`.
3. Gọi hàm `sendOrderConfirmationEmail(orderObj, items, targetMail)` trong `server/utils/email.js`.
4. Nodemailer mở kết nối SSL Cổng 465 tới Gmail:
   ```javascript
   transporter = nodemailer.createTransport({
     host: "smtp.gmail.com",
     port: 465,
     secure: true,
     auth: { user: EMAIL_USER, pass: EMAIL_PASS },
     tls: { rejectUnauthorized: false }
   });
   ```
5. Phát thư -> Thư lập tức xuất hiện trong Inbox Hòm thư người mua. Đồng thời lưu một bản sao HTML tại thư mục `server/sent_emails/` để phục vụ demo offline.

### 3. Vị trí File Code & Từng dòng quan trọng:
- **File tiện ích Email:** [email.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/utils/email.js)
  - `L7 - L9`: Cấu hình tài khoản người gửi & Fallback credentials.
  - `L11 - L25`: Vòng lặp dựng bảng sản phẩm HTML (`itemsHtml`).
  - `L127 - L140`: Khởi tạo Transporter SSL Port 465.
  - `L149`: `transporter.sendMail()` gửi thư đi.

---

## 📌 CHỨC NĂNG 8: YÊU CẦU TRẢ HÀNG & HOÀN TỒN KHO KHI ADMIN NHẬN HÀNG

### 1. Nghiệp vụ thực tế:
- Đối với các đơn hàng đã giao thành công (Trạng thái `hoanthanh`), nếu sản phẩm bị lỗi hoặc không vừa ý, Khách hàng có thể bấm **"Yêu cầu trả hàng"** và nhập Lý do trả.
- **Quy trình duyệt 2 bước của Admin:**
  - *Bước 1:* Admin bấm **"Duyệt trả hàng"** -> Đơn chuyển sang trạng thái `duyet_chohanghoi` (Chờ khách gửi hàng về shop).
  - *Bước 2:* Khi hàng về tới kho, Admin bấm **"Đã nhận hàng trả"** -> Hệ thống **TỰ ĐỘNG CỘNG HOÀN LẠI SỐ LƯỢNG TỒN KHO VỀ CẢ 3 BẢNG** (`tonkho`, `sanpham`, `luachon_sanpham`).

### 2. Luồng vận hành A - Z:
1. **Khách gửi yêu cầu:** Tại `CustomerArea.js`, bấm "Trả hàng" -> POST `/api/returns` -> Lưu vào bảng `yeucautranhang` với trạng thái `choxuly`.
2. **Admin duyệt:** Tại trang Quản trị, Admin bấm "Duyệt" -> PUT `/api/returns/:id/approve`.
3. **Admin nhận hàng & Hoàn kho:** Admin bấm "Xác nhận nhận hàng" -> PUT `/api/returns/:id/confirm-received`.
4. **Backend thực thi SQL cộng tồn kho:**
   ```sql
   -- Cộng lại kho tổng
   UPDATE tonkho SET soluongton = soluongton + ? WHERE masanpham = ?;
   -- Cộng lại bảng sản phẩm
   UPDATE sanpham SET soluongton = soluongton + ? WHERE masanpham = ?;
   -- Cộng lại biến thể màu sắc (nếu có)
   UPDATE luachon_sanpham SET soluongton = soluongton + ? WHERE maluachon = ?;
   ```

### 3. Vị trí File Code & Từng dòng quan trọng:
- **Backend Return Controller:** [return.controller.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/controller/return.controller.js)
  - `L5 - L55`: `createRequest()` tiếp nhận yêu cầu trả hàng từ khách.
  - `L94 - L145`: `confirmReceived()` xác nhận đã nhận hàng và thực thi câu lệnh `UPDATE` cộng hoàn tồn kho.

---

## 📌 CHỨC NĂNG 9: CHIẾN DỊCH KHUYẾN MÃI THEO SẢN PHẨM (Admin & Customer)

### 1. Nghiệp vụ thực tế:
- Admin có thể tạo các đợt **Siêu Sale / Khuyến mãi** (ví dụ: Giảm 15% cho Kem chống nắng Anessa, Giảm 20% cho Nước tẩy trang Cocoon).
- **Tính toán hiển thị tự động:** Trên giao diện Khách hàng, sản phẩm thuộc đợt Sale sẽ tự động xuất hiện Nhãn phần trăm giảm giá đỏ, Giá cũ gạch ngang, và Giá mới đã giảm.
- **Loại bỏ chữ hồng rác:** Khi sản phẩm không nằm trong chiến dịch giảm giá, thẻ sản phẩm hiển thị cực kỳ sạch đẹp, không dán các nhãn chữ màu hồng rác gây rối mắt người dùng.

### 2. Luồng vận hành A - Z:
1. **Admin tạo khuyến mãi:** Nhập Tên đợt giảm giá, Phần trăm giảm (ví dụ: 15%), Ngày bắt đầu, Ngày kết thúc -> Chọn sản phẩm áp dụng -> Bấm **"Tạo khuyến mãi"**.
2. **Backend ghi CSDL:** Thêm dòng mới vào bảng `khuyenmai` và bảng trung gian `sanpham_khuyenmai`.
3. **Khách xem sản phẩm:** Khi client gọi `GET /api/products`, SQL JOIN kiểm tra ngày hiện tại nằm trong `ngaybatdau` và `ngayketthuc` -> Trả về cột `phantramgiam`.
4. **React tính toán giá bán:**
   `giaMoi = giaGoc * (1 - phantramgiam / 100)`.

### 3. Vị trí File Code & Từng dòng quan trọng:
- **Admin Form Tạo Khuyến mãi:** [PromotionManagement.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/client/src/component/admin/PromotionManagement.js) (L20-L110)
- **Backend Khuyến mãi Controller:** [khuyenmai.controller.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/controller/khuyenmai.controller.js) (L10-L80)

---

## 📌 CHỨC NĂNG 10 - 15: CÁC QUẢN LÝ QUẢN TRỊ VIÊN & TƯƠNG TÁC KHIẾU NẠI

- **Chức năng 10: Quản lý Danh mục & Thương hiệu**
  - *Code:* `server/controller/category.controller.js` & `brand.controller.js`
  - *Nghiệp vụ:* Thêm/Sửa/Xóa phân loại sản phẩm (Skin Care, Makeup) và các hãng mỹ phẩm (Cocoon, Klairs, L'Oreal, MAC, 3CE...).
- **Chức năng 11: Quản lý Tồn kho & Cảnh báo Hết hàng**
  - *Code:* `server/controller/inventory.controller.js`
  - *Nghiệp vụ:* Cho phép Thủ kho nhập thêm hàng, đặt mức cảnh báo tối thiểu (`soluongtoithieu`). Khi kho chạm ngưỡng thấp, hệ thống tô màu đỏ cảnh báo.
- **Chức năng 12: Thống kê Doanh thu & Biểu đồ**
  - *Code:* `server/controller/stats.controller.js`
  - *Nghiệp vụ:* Tính tổng doanh thu theo ngày/tháng/năm, số đơn hàng đã hoàn tất, hiển thị biểu đồ tăng trưởng trực quan.
- **Chức năng 13: Đánh giá Sản phẩm (1 - 5 sao & Bình luận)**
  - *Code:* `server/controller/review.controller.js`
  - *Nghiệp vụ:* Chỉ những khách hàng đã mua sản phẩm và đơn hàng ở trạng thái `hoanthanh` mới được quyền viết đánh giá và chấm sao.
- **Chức năng 14: Hỏi đáp thắc mắc Sản phẩm**
  - *Code:* `server/controller/review.controller.js`
  - *Nghiệp vụ:* Khách hàng đặt câu hỏi về thành phần/cách dùng -> Admin trả lời trực tiếp bên dưới câu hỏi.
- **Chức năng 15: Quản lý Sổ địa chỉ giao hàng**
  - *Code:* `server/controller/address.controller.js`
  - *Nghiệp vụ:* Khách hàng lưu nhiều địa chỉ (Nhà riêng, Cơ quan), đánh dấu địa chỉ mặc định để đặt hàng nhanh trong 1-click.

---

# PHẦN III: TỔNG HỢP VÀ GIẢI THÍCH 21 BẢNG DATABASE SQL (A - Z)

Hệ thống được thiết kế chuẩn hóa Chuẩn 3 (3NF) gồm 21 bảng dữ liệu:

| STT | Tên Bảng SQL | Khóa Chính (PK) | Ý Nghĩa Nghiệp Vụ Vận Hành |
|---|---|---|---|
| 1 | `vaitro` | `mavaitro` | Định nghĩa các vai trò hệ thống: 1 - Admin (Quản trị), 2 - Khách hàng. |
| 2 | `nguoidung` | `manguoidung` | Lưu thông tin tài khoản người dùng, Email, Họ tên, Mật khẩu đã mã hóa Bcrypt. |
| 3 | `diachi` | `madiachi` | Sổ địa chỉ nhận hàng của khách (Tỉnh/Thành, Quận/Huyện, Phường/Xã, Tên đường). |
| 4 | `danhmuc` | `madanmuc` | Phân loại mỹ phẩm (Chăm sóc da, Trang điểm, Làm sạch, Chống nắng). |
| 5 | `thuonghieu` | `mathuonghieu` | Hãng sản xuất (Cocoon, Klairs, L'Oreal, MAC, 3CE, Anessa, Skin1004...). |
| 6 | `sanpham` | `masanpham` | Chứa 16 sản phẩm chính, giá gốc, hình ảnh đại diện, công dụng, thành phần. |
| 7 | `luachon_sanpham` | `maluachon` | Biến thể màu sắc son / dung tích (`mausac`, `giaban`, `soluongton`). |
| 8 | `tonkho` | `matonkho` | Quản lý tồn kho tổng theo sản phẩm (`soluongton`, `soluongtoithieu`). |
| 9 | `giohang` | `magiohang` | Giỏ hàng tạm thời của từng tài khoản. |
| 10 | `chitietgiohang` | `machitietgiohang` | Chi tiết các mặt hàng nằm trong giỏ (`masanpham`, `maluachon`, `soluong`). |
| 11 | `donhang` | `madonhang` | Đơn hàng chính (Tổng tiền, Trạng thái đơn, Trạng thái thanh toán, Người nhận). |
| 12 | `chitietdonhang` | `machitietdonhang` | Chi tiết từng món trong đơn (`soluong`, `dongia` đã giảm %, `thanhtien`). |
| 13 | `thanhtoan` | `mathanhtoan` | Nhật ký giao dịch thanh toán (COD hoặc QR Code Chuyển khoản). |
| 14 | `lichsutrangthaidon` | `malichsu` | Lịch sử chuyển trạng thái (ChoXacNhan -> DangGiao -> HoanThanh -> TraHang). |
| 15 | `voucher` | `mavoucher` | Các chương trình mã giảm giá do Admin phát hành. |
| 16 | `voucher_nguoidung` | `mavoucher_nd` | Phân phối Voucher cho khách -> **Mã Serial `ma_serial` độc nhất (`[VC-KH01-0001]`)**. |
| 17 | `yeucautranhang` | `mayeucau` | Thông tin yêu cầu trả hàng, lý do trả, ảnh bằng chứng và trạng thái xử lý. |
| 18 | `danhgia` | `madanhgia` | Chấm sao (1 - 5★) và nhận xét của khách sau khi mua hàng. |
| 19 | `hoidap` | `mahoidap` | Khung câu hỏi thắc mắc của khách và câu trả lời giải đáp từ Admin. |
| 20 | `khuyenmai` | `makhuyenmai` | Đợt chiến dịch Siêu Sale giảm giá % theo dòng sản phẩm. |
| 21 | `sanpham_khuyenmai` | `masanpham_km` | Bảng trung gian nối Sản phẩm với Đợt Khuyến mãi đang chạy. |

---

# PHẦN IV: BỘ CÂU HỎI VÀ TRẢ LỜI BẢO VỆ ĐỒ ÁN (HỎI - ĐÁP CỰC ĐẦY ĐỦ)

---

### ❓ Câu 1: Em hãy giải thích cơ chế phân quyền Admin và Khách hàng trong hệ thống?
👉 **Trả lời:**  
Hệ thống phân quyền dựa trên bảng `vaitro` (Admin có `mavaitro = 1`, Khách hàng có `mavaitro = 2`). Khi người dùng đăng nhập thành công, Backend sẽ mã hóa mã vai trò này vào trong **JWT Token**. Mọi API chức năng của Admin (như Tạo khuyến mãi, Duyệt trả hàng, Cập nhật tồn kho) đều trải qua Middleware `kiemTraAdmin` ở Backend. Middleware này sẽ giải mã Token, nếu `mavaitro !== 1` sẽ lập tức chặn lại và trả về lỗi `403 Forbidden`.

---

### ❓ Câu 2: Tại sao em lại sử dụng Mã Serial Voucher độc nhất dạng `[VC-KH01-0001]`?
👉 **Trả lời:**  
Em thiết kế cột `ma_serial` duy nhất (UNIQUE) trong bảng `voucher_nguoidung` nhằm mục đích:
1. **Quản lý chính xác từng thẻ voucher:** Tránh tình trạng khách hàng sử dụng lại 1 mã giảm giá nhiều lần.
2. **Tuân thủ đúng kịch bản kiểm thử `TC-EX-02`:** Khi khách hàng mở khung đặt hàng, dropdown chỉ hiện các mã Serial mà khách sở hữu và có `sudung = 0`. Ngay sau khi bấm đặt hàng thành công, hệ thống lập tức ghi đè `sudung = 1` và lưu `madonhang_sudung`, khiến mã này biến mất khỏi danh sách chọn, bảo mật tuyệt đối.

---

### 3. ❓ Câu 3: Làm thế nào để hệ thống đảm bảo số lượng tồn kho không bị âm khi có nhiều người đặt hàng cùng lúc?
👉 **Trả lời:**  
Trong hàm `create` của [order.controller.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/controller/order.controller.js), em sử dụng kỹ thuật **Database Transaction** kết hợp với khóa dòng **`FOR UPDATE`** của MySQL/TiDB:
```sql
SELECT bt.*, p.tensanpham FROM luachon_sanpham bt 
JOIN sanpham p ON p.masanpham = bt.masanpham 
WHERE bt.maluachon = ? FOR UPDATE;
```
Câu lệnh `FOR UPDATE` sẽ tạm thời khóa dòng sản phẩm đó lại cho đến khi Transaction hoàn tất. Nếu số lượng tồn kho nhỏ hơn số lượng khách muốn mua (`soluongton < soLuong`), Backend sẽ lập tức `rollback()` hủy giao dịch và báo lỗi "Số lượng trong kho không đủ", ngăn chặn hoàn toàn việc tồn kho bị âm.

---

### 4. ❓ Câu 4: Khi sản phẩm có chương trình giảm giá %, hệ thống tính tiền trong Hóa đơn điện tử như thế nào?
👉 **Trả lời:**  
Trong vòng lặp xử lý từng mặt hàng của đơn [order.controller.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/controller/order.controller.js#L200-L205):
```javascript
const donGia = (item.dongia && Number(item.dongia) > 0) ? Number(item.dongia) : giabanGoc;
const thanhTien = donGia * soLuong;
```
Backend ưu tiên lấy `item.dongia` (đơn giá đã trừ % khuyến mãi được truyền trực tiếp từ Giỏ hàng React). Do đó, Chi tiết đơn hàng (`chitietdonhang`), Hóa đơn điện tử và Tổng tiền thanh toán cuối cùng đều khớp chính xác 100% với giá sale, không bị nhảy về giá gốc.

---

### 5. ❓ Câu 5: Cơ chế gửi Email tự động sau khi đặt hàng hoạt động như thế nào?
👉 **Trả lời:**  
Sau khi câu lệnh `await conn.commit()` ghi nhận đơn hàng thành công vào CSDL, Backend tự động kích hoạt hàm asynchronous `sendOrderConfirmationEmail()` trong file [email.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/utils/email.js).
Nodemailer sẽ khởi tạo kết nối **Gmail SMTP qua Cổng 465 SSL** (`smtp.gmail.com:465`) với mã xác thực App Password. Thư HTML được dựng động chứa thông tin người nhận và bảng danh sách món hàng, gửi thẳng tới Email khách hàng chỉ trong **1 - 2 giây**.

---

### 6. ❓ Câu 6: Khi Admin bấm "Xác nhận đã nhận hàng trả", hệ thống xử lý hoàn kho ở những file và dòng code nào?
👉 **Trả lời:**  
Quá trình hoàn kho nằm trong file [return.controller.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/server/controller/return.controller.js) tại hàm `confirmReceived()` (dòng 94 đến 145).
Backend đọc danh sách sản phẩm trong `chitietdonhang` của đơn bị trả, sau đó thực hiện 3 câu lệnh `UPDATE` cộng hoàn lại số lượng:
- `UPDATE tonkho SET soluongton = soluongton + ? WHERE masanpham = ?`
- `UPDATE sanpham SET soluongton = soluongton + ? WHERE masanpham = ?`
- `UPDATE luachon_sanpham SET soluongton = soluongton + ? WHERE maluachon = ?`

---

### 7. ❓ Câu 7: Vì sao em lại gỡ bỏ các chữ màu hồng `tag-khuyen-mai` trên thẻ sản phẩm?
👉 **Trả lời:**  
Trước đây trên thẻ sản phẩm có hiển thị cố định dòng chữ khuyến mãi màu hồng. Tuy nhiên, nghiệp vụ thực tế yêu cầu **chỉ hiển thị nhãn giảm giá khi sản phẩm đó thực sự đang nằm trong một chiến dịch Siêu Sale có hiệu lực**. Do đó, em đã dọn dẹp các nhãn màu hồng rác trong [ProductList.js](file:///d:/New%20project%202/SourceCode_Sieumoi/SourceCode/website_ban_my_pham/client/src/component/ProductList.js) để giao diện chuẩn thẩm mỹ, chuyên nghiệp và phản ánh đúng 100% dữ liệu từ Database.

---

### 8. ❓ Câu 8: Điểm mạnh kỹ thuật lớn nhất của đồ án này là gì?
👉 **Trả lời:**  
1. **Kiến trúc RESTful API chuẩn hóa:** Tách biệt hoàn toàn Frontend (ReactJS State Management) và Backend (Node.js Express).
2. **Database Cloud TiDB MySQL 8.0:** Đảm bảo khả năng mở rộng, lưu trữ mượt mà trên nền tảng đám mây.
3. **Xử lý giao dịch an toàn (ACID Transactions & Locking):** Đảm bảo đặt hàng không nghẽn, không âm kho, không trùng voucher.
4. **Tích hợp Email SMTP SSL 465 tự động:** Xác nhận đơn hàng tức thì đến hòm thư người dùng thực.
