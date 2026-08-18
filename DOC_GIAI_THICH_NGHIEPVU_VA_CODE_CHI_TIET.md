# 📘 TÀI LIỆU TOÀN DIỆN CHI TIẾT NGHIỆP VỤ, CODE & BỘ CÂU HỎI THUYẾT TRÌNH BẢO VỆ ĐỒ ÁN

**Đề tài:** Website Bán Mỹ Phẩm Tự Động (ReactJS + Node.js + TiDB Cloud MySQL)  
**Sinh viên thực hiện:** Phạm Yến Nhi — MSSV: DH52201160  
**Giảng viên hướng dẫn:** ThS. Hà Văn Tùng  

---

## 💡 LỜI NÓI ĐẦU & HƯỚNG DẪN DÙNG TÀI LIỆU

Tài liệu này được tổng hợp **toàn bộ 100% nghiệp vụ, luồng chạy A-Z, vị trí file code, câu lệnh SQL** và đặc biệt là **BỘ CÂU HỎI & TRẢ LỜI THƯỜNG GẶP KHI BẢO VỆ ĐỒ ÁN**.

Giọng văn được trình bày **bình dân, ngắn gọn, dễ nhớ**, bám sát 100% mã nguồn thực tế đã chạy của hệ thống.

---

# PHẦN I: TỔNG QUAN 15 CHỨC NĂNG NGHIỆP VỤ & CODE CHI TIẾT

---

## 📌 CHỨC NĂNG 1: ĐĂNG KÝ VÀ ĐĂNG NHẬP TÀI KHOẢN (Bảo mật JWT & Bcrypt)

### 1. Nghiệp vụ:
Cho phép khách hàng tạo tài khoản mua sắm và đăng nhập. Mật khẩu được mã hóa an toàn bằng thư viện `bcrypt`. Khi đăng nhập thành công, hệ thống cấp cho người dùng **JWT Token** lưu trong `localStorage`.

### 2. Luồng chạy A - Z:
- **Bước 1:** Khách nhấn nút **"Đăng nhập / Đăng ký"** trên Header.
- **Bước 2:** Nhập Email & Mật khẩu → Nhấn nút **"Xác nhận"**.
- **Bước 3:** Frontend gửi POST `/api/auth/login`.
- **Bước 4:** Backend truy vấn DB kiểm tra email → Dùng `bcrypt.compare()` đối chiếu mật khẩu.
- **Bước 5:** Trả về JWT Token và đổi trạng thái giao diện đã đăng nhập.

### 3. File Code & Dòng:
- Frontend Form: `client/src/component/LoginForm.js` (L15-L65)
- Backend Controller: `server/controller/auth.controller.js` (L25-L90)
- Bảng DB: `nguoidung`, `vaitro`

---

## 📌 CHỨC NĂNG 2: DÀN HÀNG SẢN PHẨM & TÌM KIẾM TỨC THÌ (Search & Filter)

### 1. Nghiệp vụ:
Hiển thị danh sách 16 sản phẩm mỹ phẩm với hình ảnh riêng biệt, giá tiền, % giảm giá và thanh số lượng đã bán. Ô tìm kiếm lọc ngay sản phẩm theo tên, loại da, thương hiệu mà không cần load lại trang.

### 2. Luồng chạy A - Z:
- **Bước 1:** React gọi API `GET /api/products`.
- **Bước 2:** Backend JOIN các bảng `sanpham`, `danhmuc`, `thuonghieu`, `tonkho`, `khuyenmai`.
- **Bước 3:** Khách gõ từ khóa → Hàm `useMemo` lọc ngay trong mảng state `sanPhams`.

### 3. File Code & Dòng:
- Frontend lọc: `client/src/store/AppContext.js` (L105-L123)
- Frontend hiển thị: `client/src/component/ProductList.js` (L15-L82)
- Backend Controller: `server/controller/product.controller.js` (L60-L99)

---

## 📌 CHỨC NĂNG 3: CHI TIẾT SẢN PHẨM & CHỌN MÀU SẮC SON / DUNG TÍCH (Variants)

### 1. Nghiệp vụ:
Khách click vào sản phẩm xem hình phóng to, thông số, thành phần, HDSD. Với dòng Son, khách có thể chọn màu sắc/gam màu riêng:
- **Son Lì MAC:** Màu *Ruby Woo*, *Russian Red*, *Diva*.
- **Son Kem 3CE:** Màu *Denim*, *Over Dose*, *Berry*, *Coral*.

### 2. Luồng chạy A - Z:
- **Bước 1:** Khách bấm thẻ sản phẩm → Mở `ProductDetail.js`.
- **Bước 2:** Đọc danh sách màu từ bảng `luachon_sanpham`.
- **Bước 3:** Khách chọn màu "Russian Red" → Giá bán và tồn kho màu đó hiển thị ngay lập tức.

### 3. File Code & Dòng:
- Frontend: `client/src/component/ProductDetail.js` (L40-L210)
- Fallback Data: `client/src/constant/sanPham.js` (L280-L318)
- Bảng DB: `luachon_sanpham`

---

## 📌 CHỨC NĂNG 4: THÊM VÀO GIỎ HÀNG & ĐIỀU CHỈNH SỐ LƯỢNG

### 1. Nghiệp vụ:
Đưa sản phẩm kèm biến thể (màu sắc/dung tích) vào Giỏ hàng. Kiểm tra tồn kho trước khi thêm. Tự động lưu giỏ hàng vào `localStorage`.

### 2. File Code & Dòng:
- Frontend: `client/src/store/AppContext.js` (hàm `themVaoGio`, `capNhatSoLuongGio`, L160-L210)

---

## 📌 CHỨC NĂNG 5: ĐẶT HÀNG, TÍNH ĐÚNG GIÁ GIẢM & TRỪ TỒN KHO TỰ ĐỘNG

### 1. Nghiệp vụ:
Khách nhập địa chỉ, chọn Voucher Serial và thanh toán.
- **Tính đúng giá giảm %:** Hóa đơn điện tử và tổng đơn lấy đúng giá đã trừ % giảm giá (`item.dongia`).
- **Trừ tồn kho tự động tức thì:** Trừ đồng thời ở 3 bảng (`luachon_sanpham`, `tonkho`, `sanpham`).

### 2. Luồng chạy A - Z:
- **Bước 1:** Khách bấm **"Xác nhận đặt hàng"** (`CustomerArea.js`).
- **Bước 2:** POST `/api/orders` (gửi kèm `email` tài khoản).
- **Bước 3:** Backend mở Transaction `FOR UPDATE` khóa dòng tồn kho an toàn.
- **Bước 4:** Trừ tồn kho đồng thời 3 bảng. Đánh dấu Voucher Serial đã dùng (`sudung = 1`).
- **Bước 5:** `commit()` và tự động gửi Email xác nhận qua Gmail SSL 465.

### 3. File Code & Dòng:
- Frontend: `client/src/page/CustomerArea.js` (L150-L240)
- Backend: `server/controller/order.controller.js` (L111-L330)

---

## 📌 CHỨC NĂNG 6: MÃ SERIAL VOUCHER ĐỘC NHẤT (`[VC-KH01-0001]`)

### 1. Nghiệp vụ:
Mỗi voucher khi cấp cho khách sẽ tự sinh một **Mã Serial độc nhất** dạng `[VC-KH01-0001]`. Đảm bảo mỗi thẻ voucher chỉ dùng 1 lần duy nhất, chuẩn kịch bản kiểm thử `TC-EX-02`.

### 2. File Code & Dòng:
- Sinh mã serial: `server/controller/voucher.controller.js` (L5-L60)
- Kiểm tra khi đặt đơn: `server/controller/order.controller.js` (L270-L287)
- Bảng DB: `voucher_nguoidung` (cột `ma_serial` UNIQUE)

---

## 📌 CHỨC NĂNG 7: GỬI EMAIL XÁC NHẬN ĐƠN HÀNG TỰ ĐỘNG (Gmail SSL 465)

### 1. Nghiệp vụ:
Sau khi đặt hàng thành công, hệ thống tự động soạn Email HTML chứa chi tiết đơn hàng, đơn giá đã giảm, tổng tiền và gửi tới email người mua qua kết nối **Gmail SMTP Cổng 465 SSL** (`smtp.gmail.com:465`).

### 2. File Code & Dòng:
- File gửi mail: `server/utils/email.js` (L1-L160)
- Cấu hình: `EMAIL_USER`, `EMAIL_PASS` (App Password: `lilbbuxhaoswthgu`)

---

## 📌 CHỨC NĂNG 8: YÊU CẦU TRẢ HÀNG & HOÀN TỒN KHO KHI ADMIN NHẬN HÀNG

### 1. Nghiệp vụ:
Khách có thể gửi yêu cầu trả hàng cho đơn đã hoàn thành. Khi Admin bấm **"Đã nhận hàng trả"**, hệ thống tự động cộng **HOÀN TỒN KHO VỀ CẢ 3 BẢNG**.

### 2. File Code & Dòng:
- Backend: `server/controller/return.controller.js` (L5-L148)

---

## 📌 CHỨC NĂNG 9: CHIẾN DỊCH KHUYẾN MÃI THEO SẢN PHẨM (Admin & Customer)

### 1. Nghiệp vụ:
Admin tạo đợt Siêu Sale giảm giá % cho sản phẩm. Trang Khách hàng tự động tính giá bán đã giảm, dán nhãn % màu đỏ. Khi không có đợt giảm giá, giao diện hiển thị gọn gàng, không có chữ màu hồng gây hiểu nhầm.

### 2. File Code & Dòng:
- Admin Form: `client/src/component/admin/PromotionManagement.js`
- Backend: `server/controller/khuyenmai.controller.js`

---

## 📌 CHỨC NĂNG 10 TRỞ ĐI: CÁC QUẢN LÝ KHÁC (Admin Dashboard)

- **Quản lý danh mục & thương hiệu:** `server/controller/category.controller.js`, `brand.controller.js`
- **Quản lý tồn kho & cảnh báo hết hàng:** `server/controller/inventory.controller.js`
- **Thống kê doanh thu biểu đồ:** `server/controller/stats.controller.js`
- **Đánh giá & Hỏi đáp:** `server/controller/review.controller.js`

---

# PHẦN II: TỔNG HỢP 21 BẢNG DATABASE SQL

| STT | Bảng Database | Vai trò nghiệp vụ |
|---|---|---|
| 1 | `vaitro` | Phân quyền vai trò: Admin / Customer |
| 2 | `nguoidung` | Thông tin tài khoản người dùng, email, mật khẩu mã hóa |
| 3 | `diachi` | Danh sách địa chỉ giao hàng |
| 4 | `danhmuc` | Danh mục sản phẩm (Chăm sóc da, Trang điểm, Làm sạch, Chống nắng) |
| 5 | `thuonghieu` | Thương hiệu (Cocoon, Klairs, L'Oreal, MAC, 3CE...) |
| 6 | `sanpham` | 16 sản phẩm chính |
| 7 | `luachon_sanpham` | Biến thể màu sắc son / dung tích (`mausac`, `giaban`, `soluongton`) |
| 8 | `tonkho` | Quản lý tồn kho tổng theo sản phẩm (`soluongton`, `soluongtoithieu`) |
| 9 | `giohang` | Giỏ hàng người dùng |
| 10 | `chitietgiohang` | Chi tiết từng món đồ trong giỏ |
| 11 | `donhang` | Thông tin đơn hàng (tổng tiền, phương thức, trạng thái) |
| 12 | `chitietdonhang` | Chi tiết từng sản phẩm trong đơn (`soluong`, `dongia`, `thanhtien`) |
| 13 | `thanhtoan` | Nhật ký thanh toán (COD / QR Code) |
| 14 | `lichsutrangthaidon` | Lịch sử chuyển trạng thái đơn (ChoXacNhan → DangGiao → HoanThanh) |
| 15 | `voucher` | Chiến dịch Voucher |
| 16 | `voucher_nguoidung` | Phân phối voucher → **Mã Serial `ma_serial` độc nhất** |
| 17 | `yeucautranhang` | Yêu cầu trả hàng & lý do trả |
| 18 | `danhgia` | Đánh giá số sao (1-5★) & bình luận |
| 19 | `hoidap` | Hỏi đáp thắc mắc về sản phẩm |
| 20 | `khuyenmai` | Chiến dịch giảm giá theo sản phẩm |
| 21 | `sanpham_khuyenmai` | Bảng trung gian nối Sản phẩm ↔ Chiến dịch Khuyến mãi |

---

# PHẦN III: BỘ CÂU HỎI & TRẢ LỜI THƯỜNG GẶP KHI BẢO VỆ ĐỒ ÁN (Cực Kỳ Đầy Đủ)

---

### ❓ Câu 1: Em hãy giải thích cơ chế phân quyền Admin và Khách hàng trong website?
👉 **Trả lời:** Em quản lý phân quyền qua bảng `vaitro` (Admin có `mavaitro = 1`, Khách hàng có `mavaitro = 2`). Khi đăng nhập, Backend mã hóa vai trò này vào trong mã **JWT Token**. Mọi API thuộc Admin (như tạo khuyến mãi, duyệt trả hàng, quản lý kho) đều có Middleware `kiemTraAdmin` đọc token này. Nếu không phải Admin, API lập tức từ chối `403 Forbidden`.

---

### ❓ Câu 2: Tại sao phải sử dụng Mã Serial Voucher độc nhất dạng `[VC-KH01-0001]` thay vì dùng mã khuyến mãi chung?
👉 **Trả lời:** Em sử dụng Mã Serial riêng cho từng lượt cấp voucher trong bảng `voucher_nguoidung` (với cột `ma_serial` duy nhất) nhằm mục đích **chống dùng lặp voucher** và **kiểm soát lượt dùng trên từng tài khoản**. Khi khách bấm áp dụng, hệ thống kiểm tra `sudung = 0` và đổi ngay thành `1` để đảm bảo mỗi mã serial chỉ dùng được đúng 1 lần duy nhất (đáp ứng đúng kịch bản kiểm thử `TC-EX-02` trong báo cáo đồ án).

---

### ❓ Câu 3: Khi khách hàng đặt mua biến thể Son (ví dụ màu Russian Red), tồn kho trừ như thế nào?
👉 **Trả lời:** Khi đặt đơn, Backend mở một **Transaction SQL** an toàn. Câu lệnh `FOR UPDATE` khóa tạm thời dòng dữ liệu đó để chống nghẽn mua cùng lúc. Ngay sau đó, hệ thống thực hiện trừ số lượng tồn kho tự động ở đủ 3 bảng:
1. `UPDATE luachon_sanpham SET soluongton = soluongton - X WHERE maluachon = ?` (Trừ số lượng màu son đó).
2. `UPDATE tonkho SET soluongton = soluongton - X WHERE masanpham = ?` (Trừ tổng tồn kho sản phẩm).
3. `UPDATE sanpham SET soluongton = soluongton - X` (Nếu bảng sản phẩm có cột tồn).

---

### ❓ Câu 4: Khi sản phẩm đang trong đợt giảm giá %, đơn giá trong Hóa đơn được tính như thế nào?
👉 **Trả lời:** Khi sản phẩm nằm trong chiến dịch giảm giá active, Frontend tự động tính đơn giá đã giảm % (`item.dongia`). Khi đặt đơn sang Backend (`order.controller.js`), hệ thống ưu tiên đọc đơn giá thực tế từ giỏ hàng `item.dongia` thay vì lấy lại giá gốc ban đầu trong CSDL. Do đó, cả Hóa đơn điện tử (Modal) và Tổng đơn hàng đều tính chính xác theo giá đã giảm %.

---

### ❓ Câu 5: Hệ thống gửi Email xác nhận đơn hàng hoạt động ra sao và có làm đứng trang web không?
👉 **Trả lời:** Email được gửi hoàn toàn **bất đồng bộ (Async background)** qua thư viện `Nodemailer` kết nối tới `smtp.gmail.com` cổng **465 SSL**. Ngay khi đơn hàng `commit` xong vào CSDL, Backend trả về kết quả thành công cho màn hình khách ngay lập tức, việc gửi email chạy ngầm phía sau nên không bao giờ gây giật lag hay đứng trang web.

---

### ❓ Câu 6: Trong quá trình làm đồ án, em đã phát hiện và xử lý những lỗi thực tế nào về logic code?
👉 **Trả lời:** Em đã phát hiện và khắc phục 4 lỗi thực tế quan trọng:
1. **Lỗi đè dữ liệu kho tĩnh:** Trước đó Frontend `hopNhatLuachon` bị đè dữ liệu tĩnh từ `sanPham.js` lên CSDL. Em đã thêm `await taiDuLieu()` và đồng bộ `apiSanPham.ton` từ DB.
2. **Lỗi lệch tên thuộc tính Khuyến mãi:** Form Admin gửi `tenkm`/`mucgiam` trong khi Backend chờ `tenkhuyenmai`/`phantramgiam`. Em đã đồng bộ mapper và hỗ trợ đọc cả 2 tên biến.
3. **Lỗi gửi email về tên miền mẫu:** Trước đó `order.controller.js` ưu tiên `userEmail` (lưu mail mẫu `admin@hongxinh.com`) đứng trước `req.body.email`. Em đã sửa lại code lọc bỏ đuôi ảo `hongxinh.com` và ưu tiên gửi về email thật `req.body.email` (`hoh119004@gmail.com`) + 1 bản sao cho Admin.
4. **Lỗi hiển thị dòng chữ hồng rác:** Em đã gỡ bỏ hoàn toàn dòng `tag-khuyen-mai` rác để giao diện sản phẩm gọn gàng, sạch sẽ, chỉ hiện nhãn % giảm giá khi sản phẩm thực sự đang giảm giá.

---

### ❓ Câu 7: Khi khách hàng yêu cầu Trả hàng, quy trình xử lý kho diễn ra như thế nào?
👉 **Trả lời:** Khách tạo yêu cầu trong phần Quản lý đơn hàng (`createRequest`). Trạng thái chuyển thành `choxuly`. Admin kiểm tra hàng nhận về và bấm **"Đã nhận hàng trả"** (`confirmReceived`), Backend sẽ chạy lệnh `UPDATE` cộng trả lại số lượng hàng đúng bằng số lượng đã mua về cả 3 bảng `luachon_sanpham`, `tonkho` và `sanpham`.
