# 📘 TÀI LIỆU CHI TIẾT NGHIỆP VỤ & HƯỚNG DẪN ĐỌC CODE THUYẾT TRÌNH

**Đề tài:** Website Bán Mỹ Phẩm Tự Động  
**Sinh viên thực hiện:** Phạm Yến Nhi — MSSV: DH52201160  
**Giảng viên hướng dẫn:** ThS. Hà Văn Tùng  

---

## 💡 LỜI NÓI ĐẦU & HƯỚNG DẪN HỌC BÀI THUYẾT TRÌNH

Tài liệu này được viết theo **phong cách bình dân, dễ hiểu**, không dùng từ ngữ quá học thuật để bạn dễ học thuộc và tự tin giải thích với Giảng viên.

Mỗi chức năng được chia thành 4 phần rõ ràng:
1. **Nghề gì/Nghệ thuật nghiệp vụ:** Giải thích ngắn gọn chức năng đó dùng để làm gì.
2. **Luồng chạy từ A tới Z:** Người dùng bấm vào đâu, màn hình hiện gì, dữ liệu đi đâu.
3. **Các file Code phụ trách & Vị trí dòng:** Tên file, hàm nào, đoạn dòng code nằm ở đâu.
4. **Giải thích từng câu lệnh Code & SQL:** Đọc hiểu code từng dòng theo ngôn ngữ dễ nhớ nhất.

---

## 📌 CHỨC NĂNG 1: ĐĂNG KÝ VÀ ĐĂNG NHẬP TÀI KHOẢN

### 1. Nghiệp vụ là gì?
Giúp khách hàng tạo tài khoản mua sắm và đăng nhập vào hệ thống. Mật khẩu của khách hàng được bảo mật tuyệt đối (mã hóa thành chuỗi ngẫu nhiên không ai đọc được kể cả Admin). Khi đăng nhập thành công, hệ thống cấp cho người dùng một **"Thẻ thông hành" (JWT Token)** để lưu trạng thái đăng nhập.

### 2. Luồng chạy A - Z:
- **Bước 1:** Khách nhấn nút **"Đăng nhập / Đăng ký"** ở góc phải màn hình.
- **Bước 2:** Nhập Email và Mật khẩu → Nhấn nút **"Xác nhận"**.
- **Bước 3:** Frontend gửi yêu cầu (POST) sang Backend tại URL `/api/auth/login`.
- **Bước 4:** Backend tìm trong Database xem Email có tồn tại không.
- **Bước 5:** So sánh mật khẩu nhập vào với mật khẩu đã mã hóa trong DB bằng thư viện `bcrypt`.
- **Bước 6:** Nếu đúng, Backend trả về thông tin người dùng kèm mã JWT Token. Frontend lưu token này vào `localStorage` của trình duyệt và tự động đổi giao diện thành người dùng đã đăng nhập.

### 3. File Code & Vị trí dòng:
- **Frontend Form:** `client/src/component/LoginForm.js` (dòng 15 - 65)
- **Backend Controller:** `server/controller/auth.controller.js` (dòng 25 - 90)
- **Database table:** `nguoidung`, `vaitro`

### 4. Giải thích đoạn Code chính:
```javascript
// File: server/controller/auth.controller.js (Đoạn xử lý đăng nhập)
async function login(req, res) {
  const { email, matkhau } = req.body;
  
  // 1. Tìm tài khoản theo Email
  const [users] = await db.query(
    "SELECT * FROM nguoidung WHERE email = ? AND trangthai = 'hoatdong'",
    [email]
  );
  if (!users.length) return res.status(400).json({ message: "Email không tồn tại!" });

  const user = users[0];

  // 2. So sánh mật khẩu bằng bcrypt
  const hopLe = await bcrypt.compare(matkhau, user.matkhau);
  if (!hopLe) return res.status(400).json({ message: "Sai mật khẩu!" });

  // 3. Tạo mã JWT Token cấp cho người dùng
  const token = jwt.sign({ id: user.manguoidung, vaiTro: user.vaitro }, "BiMatJWT", { expiresIn: "7d" });

  res.json({ message: "Đăng nhập thành công", token, user });
}
```

---

## 📌 CHỨC NĂNG 2: XEM DANH SÁCH & TÌM KIẾM SẢN PHẨM

### 1. Nghiệp vụ là gì?
Hiển thị danh sách 16 sản phẩm mỹ phẩm với hình ảnh đại diện riêng biệt, giá tiền, % giảm giá và thanh số lượng bán. Cho phép khách hàng tìm kiếm sản phẩm theo từ khóa (như "Son", "Cocoon", "Klairs"...) hoặc bấm chọn từng danh mục (Chăm sóc da, Làm sạch, Chống nắng, Trang điểm/Son).

### 2. Luồng chạy A - Z:
- **Bước 1:** Ngay khi mở web, React tự động gọi API `GET /api/products`.
- **Bước 2:** Backend nối các bảng `sanpham`, `danhmuc`, `thuonghieu`, `tonkho` và `khuyenmai` để lấy toàn bộ 16 sản phẩm cùng % giảm giá (nếu có).
- **Bước 3:** Frontend lưu danh sách vào State `sanPhams`.
- **Bước 4:** Khi khách gõ từ khóa vào ô Tìm kiếm (ví dụ "Son"), hàm `useMemo` ở Frontend tự động lọc tức thì các sản phẩm chứa từ "Son" trong Tên, Mô tả hoặc Thương hiệu mà **không cần load lại trang**.

### 3. File Code & Vị trí dòng:
- **Frontend lọc nhanh:** `client/src/store/AppContext.js` (hàm `danhSachLoc`, dòng 105 - 123)
- **Frontend giao diện thẻ:** `client/src/component/ProductList.js` (dòng 15 - 82)
- **Backend Controller:** `server/controller/product.controller.js` (hàm `layDanhSachSanPham`, dòng 60 - 99)

---

## 📌 CHỨC NĂNG 3: XEM CHI TIẾT SẢN PHẨM & CHỌN MÀU SẮC SON / DUNG TÍCH

### 1. Nghiệp vụ là gì?
Khách click vào một sản phẩm để xem hình ảnh phóng to, thông số kỹ thuật, thành phần chi tiết và hướng dẫn sử dụng. Đặc biệt với dòng sản phẩm Son, khách hàng có thể chọn nhiều **màu sắc/gam màu** khác nhau:
- **Son Lì MAC:** Màu *Ruby Woo*, Màu *Russian Red*, Màu *Diva*.
- **Son Kem 3CE:** Màu *Denim*, Màu *Over Dose*, Màu *Berry*, Màu *Coral*.

### 2. Luồng chạy A - Z:
- **Bước 1:** Khách nhấn vào thẻ sản phẩm bất kỳ.
- **Bước 2:** Màn hình chuyển sang trang Chi tiết (`ProductDetail.js`).
- **Bước 3:** Hệ thống lấy các dòng từ bảng `luachon_sanpham` tương ứng với sản phẩm đó.
- **Bước 4:** Khách bấm chọn nút màu sắc (ví dụ: chọn màu "Russian Red") → Giá bán và tồn kho tương ứng của màu đó lập tức cập nhật lên giao diện.

### 3. File Code & Vị trí dòng:
- **Frontend giao diện chi tiết:** `client/src/component/ProductDetail.js` (dòng 40 - 210)
- **Dữ liệu cấu hình các màu son:** `client/src/constant/sanPham.js` (dòng 280 - 320)
- **Database Table:** `luachon_sanpham` (các cột: `mausac`, `loai`, `dungtich`, `giaban`, `soluongton`)

---

## 📌 CHỨC NĂNG 4: THÊM VÀO GIỎ HÀNG & QUẢN LÝ GIỎ HÀNG

### 1. Nghiệp vụ là gì?
Cho phép khách hàng đưa sản phẩm và lựa chọn màu sắc/dung tích mong muốn vào Giỏ hàng. Khách có thể điều chỉnh số lượng mua (+ / -) hoặc xóa sản phẩm khỏi giỏ. Giỏ hàng được lưu tự động trên trình duyệt để khi tắt máy mở lại vẫn không bị mất.

### 2. Luồng chạy A - Z:
- **Bước 1:** Khách chọn màu sắc/dung tích → Nhấn nút **"THÊM VÀO GIỎ HÀNG"**.
- **Bước 2:** Hàm `themVaoGio` kiểm tra số lượng tồn kho còn đủ không (`soluongton >= soluong`).
- **Bước 3:** Nếu sản phẩm đã có trong giỏ → Cộng thêm số lượng. Nếu chưa có → Thêm mới dòng sản phẩm vào mảng state `gioHang`.
- **Bước 4:** Đồng bộ danh sách vào `localStorage` của trình duyệt.

### 3. File Code & Vị trí dòng:
- **Frontend hàm xử lý:** `client/src/store/AppContext.js` (hàm `themVaoGio`, `capNhatSoLuongGio`, `xoaKhoiGio`, dòng 160 - 210)

---

## 📌 CHỨC NĂNG 5: ĐẶT HÀNG & THANH TOÁN TỰ ĐỘNG (Tính Đúng Giá Giảm & Trừ Tồn Kho Ngay)

### 1. Nghiệp vụ là gì?
Đây là luồng cốt lõi của website. Khách điền địa chỉ giao hàng, chọn Mã Serial Voucher giảm giá và chọn hình thức thanh toán. 

**ĐIỂM NỔI BẬT ĐÃ TỐI ƯU:**
1. **Tính đúng giá đã giảm %**: Khi sản phẩm đang trong đợt khuyến mãi, giá tính tiền trong Hóa đơn điện tử và Tổng đơn sẽ lấy chính xác **giá đã giảm %** (`item.dongia`) chứ không bị nhảy về giá gốc.
2. **Trừ tồn kho tự động tức thì**: Ngay khi khách bấm **"Xác nhận đặt hàng"**, hệ thống sẽ **TỰ ĐỘNG TRỪ TỒN KHO NGAY LẬP TỨC** ở đủ 3 bảng database (`luachon_sanpham`, `tonkho`, `sanpham`).

### 2. Luồng chạy A - Z:
- **Bước 1:** Khách bấm **"Xác nhận đặt hàng"** từ giao diện `CustomerArea.js`.
- **Bước 2:** Frontend gửi dữ liệu đơn hàng (POST) về API `/api/orders` (truyền kèm `email` tài khoản).
- **Bước 3:** Backend mở một **Transaction** (giao dịch an toàn).
- **Bước 4:** Dùng câu lệnh `FOR UPDATE` khóa dòng tồn kho để đảm bảo không bị 2 người mua cùng lúc gây âm kho.
- **Bước 5:** Lưu thông tin vào bảng `donhang` và `chitietdonhang` với đơn giá thực tế đã giảm.
- **Bước 6:** Thực hiện trừ số lượng tồn kho đồng thời ở 3 bảng: `luachon_sanpham`, `tonkho`, và `sanpham`.
- **Bước 7:** Nếu khách có dùng Voucher theo Mã Serial → Đánh dấu mã đó đã sử dụng (`sudung = 1`).
- **Bước 8:** Hoàn tất Transaction (`commit`) và tự động gửi Email xác nhận đơn qua cổng Gmail SMTP (Port 465 SSL).

### 3. File Code & Vị trí dòng:
- **Frontend Form đặt hàng:** `client/src/page/CustomerArea.js` (dòng 150 - 240)
- **Backend Controller:** `server/controller/order.controller.js` (hàm `create`, dòng 111 - 330)

---

## 📌 CHỨC NĂNG 6: MÃ SERIAL VOUCHER ĐỘC NHẤT (Chống dùng lặp)

### 1. Nghiệp vụ là gì?
Mỗi lần Admin cấp một Voucher khuyến mãi cho Khách hàng, hệ thống không chỉ dùng mã chung (như HONGXINH500K) mà sẽ tự động sinh ra một **Mã Serial Độc Nhất** dành riêng cho lượt cấp đó (Ví dụ: `VC-KH01-0001` hoặc `VC-YSI93J91`).
Điều này đảm bảo mỗi voucher chỉ có thể sử dụng đúng 1 lần duy nhất cho đúng tài khoản được tặng.

### 2. Luồng chạy A - Z:
- **Bước 1:** Khách vào tab **"Voucher của tôi"** → Nhìn thấy danh sách các thẻ Voucher kèm **Mã Serial** riêng (`VC-KH01-0001`).
- **Bước 2:** Khi thanh toán, khách chọn Mã Serial này trong dropdown.
- **Bước 3:** Backend kiểm tra câu lệnh: `WHERE vn.ma_serial = ? AND vn.manguoidung = ? AND vn.sudung = 0`.
- **Bước 4:** Nếu mã hợp lệ, tổng tiền được trừ số tiền giảm giá và cột `sudung` chuyển thành `1` (đã dùng).

### 3. File Code & Vị trí dòng:
- **Sinh mã serial khi cấp:** `server/controller/voucher.controller.js` (hàm `generateSerial` & `grantVoucher`, dòng 5 - 60)
- **Kiểm tra khi đặt hàng:** `server/controller/order.controller.js` (dòng 270 - 287)
- **Database column:** Bảng `voucher_nguoidung`, cột `ma_serial` (VARCHAR 50 UNIQUE).

---

## 📌 CHỨC NĂNG 7: GỬI EMAIL XÁC NHẬN ĐƠN HÀNG TỰ ĐỘNG THỰC TẾ

### 1. Nghiệp vụ là gì?
Sau khi đơn hàng được tạo thành công trên web, hệ thống tự động soạn một Email HTML đẹp mắt chứa danh sách món đồ đã đặt, đơn giá đã giảm, địa chỉ nhận hàng, tổng tiền và gửi thẳng đến Email của khách hàng qua kết nối **Gmail SMTP cổng 465 SSL**.

### 2. Luồng chạy A - Z:
- **Bước 1:** Đơn hàng tạo xong (`conn.commit()`).
- **Bước 2:** Backend đọc địa chỉ email người mua (`req.body.email` hoặc email tài khoản).
- **Bước 3:** Thư viện `Nodemailer` kết nối tới `smtp.gmail.com:465` với mã bảo mật App Password.
- **Bước 4:** Email được gửi đi bất đồng bộ (`async`) và đồng thời lưu 1 bản sao HTML tại `server/sent_emails/email_<madonhang>.html`.

### 3. File Code & Vị trí dòng:
- **Utility gửi mail:** `server/utils/email.js` (dòng 1 - 160)
- **Cấu hình Gmail SMTP:** `host: "smtp.gmail.com"`, `port: 465`, `secure: true`.

---

## 📌 CHỨC NĂNG 8: YÊU CẦU TRẢ HÀNG & HOÀN TỒN KHO KHI ADMIN NHẬN HÀNG

### 1. Nghiệp vụ là gì?
Với các đơn hàng đã ở trạng thái **Hoàn thành** (`hoanthanh`), nếu sản phẩm bị lỗi hoặc không ưng ý, khách hàng có thể gửi **Yêu cầu trả hàng** kèm lý do. Admin sẽ xem xét duyệt yêu cầu. Khi hàng được gửi trả về tới shop và Admin bấm **"Đã nhận hàng trả"**, hệ thống sẽ **HOÀN LẠI TỒN KHO VỀ CẢ 3 BẢNG**.

### 2. File Code & Vị trí dòng:
- **Backend Controller:** `server/controller/return.controller.js` (hàm `createRequest`, `approveRequest`, `confirmReceived`, dòng 5 - 148)

---

## 📌 CHỨC NĂNG 9: QUẢN LÝ KHUYẾN MÃI CHIẾN DỊCH (Admin & Customer)

### 1. Nghiệp vụ là gì?
Admin có thể tạo các đợt Siêu Sale Khuyến Mãi cho từng sản phẩm. Chọn phần trăm giảm giá (ví dụ: 10%, 20%), thời gian bắt đầu và kết thúc.
- **Giao diện trang khách sạch sẽ:** Giao diện đã được dọn sạch các dòng chữ mẫu, chỉ khi sản phẩm thực sự nằm trong đợt giảm giá active thì mới hiển thị nhãn % giảm giá và giá gốc gạch chéo.

### 2. File Code & Vị trí dòng:
- **Admin Form:** `client/src/component/admin/PromotionManagement.js`
- **Backend Controller:** `server/controller/khuyenmai.controller.js`

---

## 📋 TỔNG HỢP CÁC FILE CODE ĐÃ ĐƯỢC TỐI ƯU GẦN ĐÂY

| Tên file Code | Thay đổi & Điểm tối ưu mới |
|---|---|
| `client/src/component/ProductList.js` | Gỡ hoàn toàn dòng chữ màu hồng rác, chỉ hiện nhãn % giảm giá khi sản phẩm thực sự đang được giảm giá từ DB. |
| `client/src/constant/sanPham.js` | Xóa sạch các chuỗi khuyến mãi cứng rác trong mảng dữ liệu fallback static. |
| `server/controller/order.controller.js` | Tính đơn giá `donGia` trong Hóa đơn theo đúng giá đã giảm % (`item.dongia`). Tự động truyền mail người mua để gửi email xác nhận. |
| `server/utils/email.js` | Đọc động `process.env.EMAIL_USER` & `process.env.EMAIL_PASS` bên trong hàm, dùng cổng Gmail SSL 465 giúp gửi mail mượt mà 100%. |
| `client/src/component/admin/PromotionManagement.js` | Sửa link gọi API thành `${API_BASE}/khuyenmai` động, truyền payload chuẩn `{ tenkhuyenmai, phantramgiam }` và tự động làm mới trang khách. |
| `server/controller/product.controller.js` | Bỏ kiểm tra `SHOW TABLES`, JOIN trực tiếp `luachon_sanpham` trong `try/catch` để đọc đúng tồn kho từng màu sắc son/dung tích từ DB. |
| `client/src/store/AppContext.js` | Đồng bộ tự động tồn kho trong mảng state React sau khi tạo đơn thành công, truyền `email` tài khoản sang backend. |
