# 📘 TÀI LIỆU DUY NHẤT TOÀN DIỆN NGHIỆP VỤ & CODE (BẢO VỆ ĐỒ ÁN)

**Đề tài:** Website Bán Mỹ Phẩm Tự Động (ReactJS + Node.js Express + TiDB Cloud MySQL)  
**Sinh viên thực hiện:** Phạm Yến Nhi — MSSV: DH52201160  
**Giảng viên hướng dẫn:** ThS. Hà Văn Tùng  

---

## 💡 HƯỚNG DẪN DÙNG TÀI LIỆU MASTER DUY NHẤT

Đây là **TÀI LIỆU MASTER DUY NHẤT** tổng hợp 100% toàn bộ kiến thức nghiệp vụ, luồng chạy code, vị trí file, dòng code, bảng CSDL và bộ câu hỏi bảo vệ đồ án. Tài liệu được trình bày cực kỳ gọn gàng, sạch đẹp, không tràn màn hình trong VS Code.

---

# PHẦN I: BẢNG TRA CỨU NHANH 20 CHỨC NĂNG & VỊ TRÍ FILE CODE

| STT | Tên Chức Năng Nghiệp Vụ | File Frontend (Giao diện) | File Backend (Xử lý) | Bảng Database SQL |
|---|---|---|---|---|
| 1 | **Đăng ký & Đăng nhập (JWT & Bcrypt)** | `LoginForm.js` (Dòng 15-65) | `auth.controller.js` (Dòng 25-90) | `nguoidung`, `vaitro` |
| 2 | **Quản lý Hồ sơ cá nhân & Đổi mật khẩu** | `CustomerArea.js` (Dòng 40-90) | `customer.controller.js` | `nguoidung` |
| 3 | **Danh sách Sản phẩm & Lọc Tức thì** | `ProductList.js` (Dòng 15-82)<br>`AppContext.js` (Dòng 105-123) | `product.controller.js` (Dòng 60-99) | `sanpham`, `danhmuc`, `thuonghieu` |
| 4 | **Chi tiết Sản phẩm & Chọn Biến thể màu son** | `ProductDetail.js` (Dòng 40-210) | `product.controller.js` (Dòng 100-140) | `sanpham`, `luachon_sanpham` |
| 5 | **Thêm vào Giỏ hàng & Đồng bộ LocalStorage** | `AppContext.js` (Dòng 160-210)<br>`Header.js` (Dòng 50-90) | `cart.controller.js` | `giohang`, `chitietgiohang` |
| 6 | **Sổ Địa chỉ Giao hàng & Đặt Mặc định** | `CustomerArea.js` (Dòng 66-85) | `customer.controller.js` | `diachi` |
| 7 | **Đặt hàng, Tính giá giảm & Trừ tồn kho 3 bảng** | `CustomerArea.js` (Dòng 150-240) | `order.controller.js` (Dòng 111-330) | `donhang`, `chitietdonhang`, `tonkho` |
| 8 | **Thanh toán QR Code VietQR & Giả lập Demo** | `ThanhToanQR.js` (Dòng 1-98) | `order.controller.js` (Dòng 147, 299) | `thanhtoan`, `donhang` |
| 9 | **Thanh toán Tiền mặt khi nhận hàng (COD)** | `ThanhToanTienMat.js` | `order.controller.js` (Dòng 150-168) | `donhang`, `thanhtoan` |
| 10 | **Voucher Serial Độc nhất (`[VC-KH01-0001]`)** | `CustomerArea.js` (Dòng 473-501) | `voucher.controller.js` (Dòng 5-60) | `voucher`, `voucher_nguoidung` |
| 11 | **Gửi Email Xác nhận Tự động (Gmail SSL 465)** | Nền Backend tự động gọi | `server/utils/email.js` (Dòng 5-160) | Gửi trực tiếp qua Gmail API |
| 12 | **Xem & In Hóa đơn Điện tử chuẩn Unicode** | `CustomerArea.js` (Dòng 164-260) | `order.controller.js` (Dòng 80-108) | `donhang`, `chitietdonhang` |
| 13 | **Theo dõi Lịch sử Đơn hàng & Tiến trình** | `CustomerArea.js` (Dòng 575-650) | `order.controller.js` (Dòng 30-75) | `donhang`, `lichsutrangthaidon` |
| 14 | **Yêu cầu Trả hàng & Hoàn Kho khi nhận hàng** | `CustomerArea.js` (Dòng 260-310) | `return.controller.js` (Dòng 5-150) | `yeucautranhang`, `tonkho` |
| 15 | **Chiến dịch Khuyến mãi Sale % theo Sản phẩm** | `PromotionManagement.js` (Dòng 20-110) | `khuyenmai.controller.js` (Dòng 10-80) | `khuyenmai`, `sanpham_khuyenmai` |
| 16 | **Thống kê Doanh thu & Lượt truy cập RAM** | `Dashboard.js` (Dòng 10-120) | `stats.controller.js` (Dòng 14-48) | `donhang`, `sanpham`, `nguoidung` |
| 17 | **Quản lý Tồn kho & Cảnh báo Hết hàng rực đỏ** | `InventoryManagement.js` | `admin.controller.js` | `tonkho`, `sanpham` |
| 18 | **Quản lý Danh mục & Thương hiệu Mỹ phẩm** | `CategoryManagement.js`, `BrandManagement.js` | `category.controller.js` | `danhmuc`, `thuonghieu` |
| 19 | **Đánh giá Sản phẩm (Chấm 1-5 sao & Nhận xét)** | `ProductDetail.js` | `review.controller.js` | `danhgia` |
| 20 | **Hỏi đáp Thắc mắc Sản phẩm Khách & Admin** | `ProductDetail.js` | `review.controller.js` | `hoidap` |

---

# PHẦN II: GIẢI THÍCH CHI TIẾT 20 CHỨC NĂNG NGHIỆP VỤ & LUỒNG CODE A - Z

---

## 📌 CHỨC NĂNG 1: ĐĂNG KÝ VÀ ĐĂNG NHẬP TÀI KHOẢN (JWT & Bcrypt)

- **Nghiệp vụ:** Cho phép người dùng tạo tài khoản khách hàng để mua hàng. Mật khẩu được mã hóa băm bằng `bcryptjs`. Đăng nhập thành công trả về **JWT Token** lưu tại `localStorage`.
- **Luồng A-Z:** 
  1. Khách bấm "Đăng nhập" trên Header ➔ Mở Modal `LoginForm.js`.
  2. Khách nhập Email & Mật khẩu ➔ Bấm "Xác nhận".
  3. React gọi `axios.post('/api/auth/login', { email, matkhau })`.
  4. Backend xử lý tại `server/controller/auth.controller.js`: SQL `SELECT * FROM nguoidung WHERE email = ?`.
  5. Dùng `bcrypt.compare()` kiểm tra mật khẩu ➔ Tạo Token `jwt.sign()` trả về Client.
- **File Code:** Frontend: `client/src/component/LoginForm.js` (Dòng 15-65) | Backend: `server/controller/auth.controller.js` (Dòng 25-90).

---

## 📌 CHỨC NĂNG 2: QUẢN LÝ HỒ SƠ CÁ NHÂN & ĐỔI MẬT KHẨU

- **Nghiệp vụ:** Cập nhật Họ tên, Số điện thoại và Đổi mật khẩu. Mật khẩu mới được mã hóa lại bằng `bcrypt`.
- **Luồng A-Z:** `CustomerArea.js` gọi `PUT /api/customers/:id` ➔ Backend `customer.controller.js` mã hóa `bcrypt.hash()` ➔ SQL `UPDATE nguoidung SET ...`.

---

## 📌 CHỨC NĂNG 3: DANH SÁCH SẢN PHẨM & TÌM KIẾM TỨC THÌ (Search & Filter)

- **Nghiệp vụ:** Hiển thị 16 sản phẩm mỹ phẩm kèm giá gốc, giá sau giảm và tiến trình số lượng đã bán. Tìm kiếm và lọc tức thì theo tên, loại da, danh mục không reload trang. Thẻ sản phẩm hiển thị gọn gàng, đã gỡ bỏ chữ màu hồng rác `tag-khuyen-mai`.
- **Luồng A-Z:** `AppContext.js` gọi `GET /api/products` ➔ Backend `product.controller.js` chạy SQL JOIN liên bảng `sanpham`, `danhmuc`, `thuonghieu`, `tonkho`, `khuyenmai` ➔ Khách gõ từ khóa, hàm `useMemo` lọc ngay mảng state trong 0.01s.
- **File Code:** Frontend: `client/src/component/ProductList.js` (Dòng 15-82), `client/src/store/AppContext.js` (Dòng 105-123) | Backend: `server/controller/product.controller.js` (Dòng 60-99).

---

## 📌 CHỨC NĂNG 4: CHI TIẾT SẢN PHẨM & CHỌN BIẾN THỂ MÀU SON

- **Nghiệp vụ:** Xem công dụng, thành phần và chọn màu son riêng biệt (MAC: Ruby Woo, Russian Red, Diva; 3CE: Denim, Over Dose, Berry, Coral). Giá và tồn kho cập nhật động theo từng màu.
- **Luồng A-Z:** Mở `/san-pham/:id` (`ProductDetail.js`) ➔ Backend chạy `SELECT * FROM luachon_sanpham WHERE masanpham = ?` ➔ Chọn nút màu ➔ Giao diện cập nhật tồn kho khả dụng của màu đó.
- **File Code:** `client/src/component/ProductDetail.js` (Dòng 40-210), `client/src/constant/sanPham.js` (Dòng 280-318).

---

## 📌 CHỨC NĂNG 5: THÊM VÀO GIỎ HÀNG & ĐỒNG BỘ LOCALSTORAGE

- **Nghiệp vụ:** Đưa sản phẩm kèm màu sắc vào giỏ. Tự động kiểm tra số lượng tồn kho. Lưu giỏ hàng vào `localStorage` giữ nguyên khi tắt trang.
- **Luồng A-Z:** Bấm "Thêm vào giỏ" ➔ Gọi `themVaoGio()` trong `AppContext.js` (Dòng 160-210) ➔ Cập nhật State `gioHang` & `localStorage.setItem('cart', ...)`.

---

## 📌 CHỨC NĂNG 6: SỔ ĐỊA CHỈ GIAO HÀNG & ĐẶT MẶC ĐỊNH

- **Nghiệp vụ:** Lưu nhiều địa chỉ nhận hàng, chọn 1 địa chỉ Mặc định (`macdinh = 1`). Khi đặt hàng, hệ thống tự điền sẵn địa chỉ mặc định.
- **File Code:** `client/src/page/CustomerArea.js` (Dòng 66-85), `server/controller/customer.controller.js`.

---

## 📌 CHỨC NĂNG 7: ĐẶT HÀNG, TÍNH GIÁ GIẢM & TRỪ TỒN KHO 3 BẢNG (CỐT LÕI)

- **Nghiệp vụ:** Khách nhập thông tin, chọn mã **Voucher Serial** và thanh toán. 
  - **Tính đúng giá giảm %:** Hóa đơn lưu đúng giá đã trừ giảm giá (`item.dongia`).
  - **Trừ kho tự động 3 bảng:** Số lượng tồn bị trừ tức thì ở `luachon_sanpham`, `tonkho`, và `sanpham`.
- **Luồng A-Z:**
  1. Bấm "Xác nhận đặt hàng" (`CustomerArea.js`) ➔ POST `/api/orders`.
  2. Backend mở Transaction: `await conn.beginTransaction()`.
  3. Khóa dòng dữ liệu chống âm kho: `SELECT ... FOR UPDATE`.
  4. Lấy đơn giá đã giảm % `const donGia = item.dongia` ➔ `INSERT INTO chitietdonhang`.
  5. Trừ tồn kho 3 bảng: `UPDATE luachon_sanpham ...`, `UPDATE tonkho ...`, `UPDATE sanpham ...`.
  6. Đánh dấu Voucher Serial đã dùng: `UPDATE voucher_nguoidung SET sudung = 1`.
  7. `await conn.commit()` ➔ Tự động kích hoạt gửi Email xác nhận qua Gmail SSL 465.
- **File Code:** Frontend: `client/src/page/CustomerArea.js` (Dòng 150-240) | Backend: `server/controller/order.controller.js` (Dòng 111-330).

---

## 📌 CHỨC NĂNG 8: THANH TOÁN QR CODE VIETQR & GIẢ LẬP DEMO

- **Nghiệp vụ:** Khách chọn phương thức **"QR Code"** ➔ Tự tạo mã QR động VietQR chèn STK shop `1017833075` (Vietcombank), Tên chủ TK `PHAM YEN NHI`, Số tiền chính xác và Nội dung `HONGXINH DH<Mã_Đơn>`.
- **Chế độ Giả lập Demo:** Cung cấp nút **"Giả lập: Khách đã quét QR & chuyển tiền"** gửi flag `isDemo: true` giúp sinh mã giao dịch `QR<TIMESTAMP><RANDOM>` và đánh dấu trạng thái `dathanhtoan` để tiện demo chấm bài.
- **File Code:** Frontend: `client/src/component/ThanhToanQR.js` (Dòng 36-44 ảnh QR, Dòng 80-90 nút Demo) | Backend: `server/controller/order.controller.js` (Dòng 147, 299-304).

---

## 📌 CHỨC NĂNG 9: THANH TOÁN TIỀN MẶT KHI NHẬN HÀNG (COD)

- **Nghiệp vụ:** Khách trả tiền mặt trực tiếp cho Shipper khi giao hàng. Đơn khởi tạo ở trạng thái `chuathanhtoan`.
- **File Code:** `client/src/component/ThanhToanTienMat.js`, `server/controller/order.controller.js` (Dòng 150-168).

---

## 📌 CHỨC NĂNG 10: MÃ SERIAL VOUCHER ĐỘC NHẤT (`[VC-KH01-0001]`)

- **Nghiệp vụ:** Mỗi voucher cấp cho khách có mã Serial riêng dạng `[VC-KH01-0001]`. Đảm bảo kịch bản kiểm thử `TC-EX-02`: Mỗi thẻ chỉ dùng đúng 1 lần duy nhất, khi dùng xong mã tự biến mất khỏi dropdown.
- **File Code:** Frontend: `client/src/page/CustomerArea.js` (Dòng 473-501) | Backend: `server/controller/voucher.controller.js` (Dòng 5-60), `server/controller/order.controller.js` (Dòng 274-290).

---

## 📌 CHỨC NĂNG 11: GỬI EMAIL XÁC NHẬN ĐƠN HÀNG TỰ ĐỘNG (Gmail SSL 465)

- **Nghiệp vụ:** Sau khi commit đơn thành công, hệ thống tự động soạn Email HTML chứa chi tiết đơn hàng và gửi thẳng đến hòm thư người mua qua cổng **Gmail SMTP 465 SSL** (`smtp.gmail.com:465`).
- **File Code:** `server/utils/email.js` (Dòng 5-160).

---

## 📌 CHỨC NĂNG 12: XEM & IN HÓA ĐƠN ĐIỆN TỬ CHUẨN UNICODE

- **Nghiệp vụ:** Cho phép xem Modal Hóa đơn điện tử sang trọng và bấm nút **"In hóa đơn"** in trực tiếp ra giấy qua cửa sổ trình duyệt chuẩn tiếng Việt Unicode không bị lỗi font.
- **File Code:** `client/src/page/CustomerArea.js` (Dòng 164-260), `server/controller/order.controller.js` (Dòng 80-108).

---

## 📌 CHỨC NĂNG 13: THEO DÕI LỊCH SỬ ĐƠN HÀNG & TIẾN TRÌNH GIAO HÀNG

- **Nghiệp vụ:** Xem danh sách đơn hàng đã đặt, theo dõi tiến trình chuyển trạng thái theo thời gian thực (`ChoXacNhan ➔ DangGiao ➔ HoanThanh`).
- **File Code:** `client/src/page/CustomerArea.js` (Dòng 575-650), `server/controller/order.controller.js` (Dòng 30-75).

---

## 📌 CHỨC NĂNG 14: YÊU CẦU TRẢ HÀNG & HOÀN KHO KHI NHẬN HÀNG

- **Nghiệp vụ:** Đơn hoàn thành được quyền yêu cầu trả hàng. Khi Admin nhận được hàng và bấm **"Đã nhận hàng trả"**, hệ thống **TỰ ĐỘNG CỘNG HOÀN LẠI SỐ LƯỢNG KHO VỀ CẢ 3 BẢNG** (`tonkho`, `sanpham`, `luachon_sanpham`).
- **File Code:** `client/src/page/CustomerArea.js` (Dòng 260-310), `server/controller/return.controller.js` (Dòng 94-145).

---

## 📌 CHỨC NĂNG 15: CHIẾN DỊCH KHUYẾN MÃI SALE % THEO SẢN PHẢM

- **Nghiệp vụ:** Admin tạo chiến dịch Siêu Sale giảm % cho sản phẩm. Trang khách tự động hiển thị nhãn % đỏ và tính giá đã giảm. Hết hạn Sale, thẻ sản phẩm tự trở về giao diện sạch đẹp.
- **File Code:** `client/src/component/admin/PromotionManagement.js` (Dòng 20-110), `server/controller/khuyenmai.controller.js` (Dòng 10-80).

---

## 📌 CHỨC NĂNG 16: THỐNG KÊ DOANH THU & LƯỢT TRUY CẬP RAM (Admin Dashboard)

- **Nghiệp vụ:** Hiển thị 5 thẻ KPI: Tổng sản phẩm, Tổng khách hàng, Tổng đơn hàng, Tổng doanh thu (`WHERE trangthaidonhang = 'hoanthanh'`) và Số lượt truy cập ngầm thời gian thực lưu trong RAM (`globalVisitorCount++`).
- **File Code:** `client/src/component/admin/Dashboard.js` (Dòng 10-120), `server/controller/stats.controller.js` (Dòng 14-48).

---

## 📌 CHỨC NĂNG 17: QUẢN LÝ TỒN KHO & CẢNH BÁO HẾT HÀNG RỰC ĐỎ

- **Nghiệp vụ:** Nhập số lượng kho. Khi tồn kho nhỏ hơn hoặc bằng `soluongtoithieu`, dòng sản phẩm tự đổi màu đỏ rực cảnh báo Thủ kho nhập hàng.
- **File Code:** `client/src/component/admin/InventoryManagement.js`, `server/controller/admin.controller.js`.

---

## 📌 CHỨC NĂNG 18: QUẢN LÝ DANH MỤC & THƯƠNG HIỆU MỸ PHẨM

- **Nghiệp vụ:** Admin Thêm/Sửa/Xóa Danh mục (Skincare, Makeup) và Thương hiệu (Cocoon, Klairs, MAC, 3CE...).
- **File Code:** `server/controller/category.controller.js`, `server/controller/brand.controller.js`.

---

## 📌 CHỨC NĂNG 19: ĐÁNH GIÁ SẢN PHẨM (Chấm 1 - 5 sao & Nhận xét)

- **Nghiệp vụ:** Khách mua hàng thành công được chấm 1-5 sao và viết nhận xét thực tế cho sản phẩm.
- **File Code:** `client/src/component/ProductDetail.js`, `server/controller/review.controller.js`.

---

## 📌 CHỨC NĂNG 20: HOỎI ĐÁP THẮC MẮC SẢN PHẨM KHÁCH & ADMIN

- **Nghiệp vụ:** Khách đặt câu hỏi thắc mắc dưới sản phẩm ➔ Admin vào trả lời trực tiếp.
- **File Code:** `client/src/component/ProductDetail.js`, `server/controller/review.controller.js`.

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
Dòng dữ liệu bị khóa tạm thời. Nếu `soluongton < soLuong`, Backend `rollback()` hủy giao dịch báo lỗi "Không đủ kho", tránh hoàn toàn việc kho bị âm.

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
