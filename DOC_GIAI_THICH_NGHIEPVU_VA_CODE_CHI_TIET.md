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

### 4. Giải thích đoạn Code chính:
```javascript
// File: server/controller/product.controller.js (Query lấy danh sách sản phẩm)
SELECT p.*, dm.tendanhmuc, th.tenthuonghieu, tk.soluongton,
       k.makhuyenmai, k.tenkhuyenmai, k.phantramgiam
FROM sanpham p
JOIN danhmuc dm ON dm.madanhmuc = p.madanhmuc
LEFT JOIN thuonghieu th ON th.mathuonghieu = p.mathuonghieu
LEFT JOIN tonkho tk ON tk.masanpham = p.masanpham
LEFT JOIN sanpham_khuyenmai ks ON p.masanpham = ks.masanpham
LEFT JOIN khuyenmai k ON ks.makhuyenmai = k.makhuyenmai
  AND k.trangthai = 'hoatdong'
  AND NOW() BETWEEN k.ngaybatdau AND k.ngayketthuc
ORDER BY p.masanpham ASC
```
*Ý nghĩa:* Dùng `JOIN` lấy tên danh mục, `LEFT JOIN` lấy tên thương hiệu, tồn kho và kiểm tra xem sản phẩm có nằm trong chương trình khuyến mãi đang hoạt động hay không.

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

## 📌 CHỨC NĂNG 5: ĐẶT HÀNG & THANH TOÁN TỰ ĐỘNG (Trừ Tồn Kho Ngay)

### 1. Nghiệp vụ là gì?
Đây là luồng cốt lõi của website. Khách điền địa chỉ giao hàng, chọn Mã Serial Voucher giảm giá và chọn hình thức thanh toán:
- **Tiền mặt khi nhận hàng (COD)**: Trạng thái thanh toán = `chuathanhtoan`.
- **Chuyển khoản QR Code (Giả lập)**: Trạng thái thanh toán = `dathanhtoan` kèm Mã giao dịch tự động.

**ĐIỂM QUAN TRỌNG:** Ngay khi khách bấm **"Xác nhận đặt hàng"**, hệ thống sẽ **TỰ ĐỘNG TRỪ TỒN KHO NGAY LẬP TỨC** ở đủ 3 bảng database mà không cần đợi Admin phê duyệt.

### 2. Luồng chạy A - Z:
- **Bước 1:** Khách bấm **"Xác nhận đặt hàng"** từ giao diện `CustomerArea.js`.
- **Bước 2:** Frontend gửi dữ liệu đơn hàng (POST) về API `/api/orders`.
- **Bước 3:** Backend mở một **Transaction** (giao dịch an toàn).
- **Bước 4:** Dùng câu lệnh `FOR UPDATE` khóa dòng tồn kho để đảm bảo không bị 2 người mua cùng lúc gây âm kho.
- **Bước 5:** Lưu thông tin vào bảng `donhang` và `chitietdonhang`.
- **Bước 6:** Thực hiện trừ số lượng tồn kho đồng thời ở 3 bảng: `luachon_sanpham`, `tonkho`, và `sanpham`.
- **Bước 7:** Nếu khách có dùng Voucher theo Mã Serial → Đánh dấu mã đó đã sử dụng (`sudung = 1`).
- **Bước 8:** Hoàn tất Transaction (`commit`) và tự động kích hoạt hàm gửi Email xác nhận đơn hàng bất đồng bộ.

### 3. File Code & Vị trí dòng:
- **Frontend Form đặt hàng:** `client/src/page/CustomerArea.js` (dòng 150 - 240)
- **Backend Controller:** `server/controller/order.controller.js` (hàm `create`, dòng 111 - 330)

### 4. Giải thích đoạn Code chính:
```javascript
// File: server/controller/order.controller.js (Đoạn trừ tồn kho tự động 3 bảng)
await conn.beginTransaction(); // Mở giao dịch an toàn

for (const item of items) {
  // 1. Kiểm tra & khóa dòng dữ liệu biến thể chống tranh chấp mua cùng lúc
  const [variantRows] = await conn.query(
    "SELECT * FROM luachon_sanpham WHERE maluachon = ? FOR UPDATE",
    [item.maluachon]
  );
  if (variantRows[0].soluongton < item.soluong) {
    throw new Error("Không đủ số lượng tồn kho!");
  }

  // 2. Trừ tồn kho đồng thời 3 bảng
  await conn.query("UPDATE luachon_sanpham SET soluongton = GREATEST(soluongton - ?, 0) WHERE maluachon = ?", [item.soluong, item.maluachon]);
  await conn.query("UPDATE tonkho SET soluongton = GREATEST(soluongton - ?, 0) WHERE masanpham = ?", [item.soluong, item.masanpham]);
  await conn.query("UPDATE sanpham SET soluongton = GREATEST(soluongton - ?, 0) WHERE masanpham = ?", [item.soluong, item.masanpham]);
}

await conn.commit(); // Lưu vĩnh viễn thay đổi vào CSDL
```

---

## 📌 CHỨC NĂNG 6: MÃ SERIAL VOUCHER ĐỘC NHẤT (Chống dùng lặp)

### 1. Nghiệp vụ là gì?
Mỗi lần Admin cấp một Voucher khuyến mãi cho Khách hàng, hệ thống không chỉ dùng mã chung (như HONGXINH500K) mà sẽ tự động sinh ra một **Mã Serial Độc Nhất** dành riêng cho lượt cấp đó (Ví dụ: `VC-KH1-YSI93J91`).
Điều này đảm bảo mỗi voucher chỉ có thể sử dụng đúng 1 lần duy nhất cho đúng tài khoản được tặng.

### 2. Luồng chạy A - Z:
- **Bước 1:** Khách vào tab **"Voucher của tôi"** → Nhìn thấy danh sách các thẻ Voucher kèm **Mã Serial** riêng.
- **Bước 2:** Khi thanh toán, khách chọn Mã Serial này.
- **Bước 3:** Backend kiểm tra câu lệnh: `WHERE vn.ma_serial = ? AND vn.manguoidung = ? AND vn.sudung = 0`.
- **Bước 4:** Nếu mã hợp lệ, tổng tiền được trừ số tiền giảm giá và cột `sudung` chuyển thành `1` (đã dùng).

### 3. File Code & Vị trí dòng:
- **Sinh mã serial khi cấp:** `server/controller/voucher.controller.js` (hàm `generateSerial` & `grantVoucher`, dòng 5 - 60)
- **Kiểm tra khi đặt hàng:** `server/controller/order.controller.js` (dòng 270 - 287)
- **Database column:** Bảng `voucher_nguoidung`, cột `ma_serial` (VARCHAR 50 UNIQUE).

---

## 📌 CHỨC NĂNG 7: LỊCH SỬ ĐƠN HÀNG & XEM HÓA ĐƠN ĐIỆN TỬ

### 1. Nghiệp vụ là gì?
Khách hàng có thể mở tab **"Lịch sử đơn"** để xem lại tất cả các đơn hàng đã đặt kèm trạng thái xử lý (Chờ xác nhận, Đang giao, Hoàn thành, Hủy). Khi bấm vào một đơn hàng, một cửa sổ **Hóa đơn điện tử** (Modal) hiện lên chi tiết từng món đồ, số tiền và mã QR thanh toán.

### 2. Luồng chạy A - Z:
- **Bước 1:** Khách mở tab **"Lịch sử đơn"**.
- **Bước 2:** Frontend gọi API `GET /api/orders/user/:userId`.
- **Bước 3:** Backend lấy danh sách đơn từ bảng `donhang` sắp xếp từ mới nhất đến cũ nhất.
- **Bước 4:** Khách click vào một đơn → Gọi API `GET /api/orders/:id` lấy chi tiết danh sách sản phẩm mua → Hiện modal `ModalXemHoaDon.js`.

### 3. File Code & Vị trí dòng:
- **Modal Hóa đơn:** `client/src/component/ModalXemHoaDon.js` (dòng 1 - 120)
- **Backend Controller:** `server/controller/order.controller.js` (hàm `getMyOrders` & `getDetail`, dòng 15 - 105)

---

## 📌 CHỨC NĂNG 8: HỦY ĐƠN HÀNG & HOÀN TỒN KHO AUTOMATIC

### 1. Nghiệp vụ là gì?
Khách hàng có thể chủ động Hủy đơn hàng nếu đơn hàng đó vẫn đang ở trạng thái **Chờ xác nhận** (`choxacnhan`). Sau khi hủy, số lượng sản phẩm trong đơn sẽ **tự động được cộng trả lại vào kho** ở cả 3 bảng.

### 2. Luồng chạy A - Z:
- **Bước 1:** Khách nhấn nút **"Hủy đơn hàng"** trong lịch sử đơn.
- **Bước 2:** Frontend gửi yêu cầu PUT đến `/api/orders/:id/cancel`.
- **Bước 3:** Backend kiểm tra đơn hàng có đúng là `choxacnhan` hay không.
- **Bước 4:** Chuyển trạng thái đơn sang `dahuy`.
- **Bước 5:** Lấy danh sách sản phẩm trong đơn và thực hiện cộng lại số lượng vào `luachon_sanpham`, `tonkho`, và `sanpham`.

### 3. File Code & Vị trí dòng:
- **Backend Controller:** `server/controller/order.controller.js` (hàm `cancel`, dòng 360 - 420)

---

## 📌 CHỨC NĂNG 9: YÊU CẦU TRẢ HÀNG & HOÀN TỒN KHO KHI ADMIN NHẬN HÀNG

### 1. Nghiệp vụ là gì?
Với các đơn hàng đã ở trạng thái **Hoàn thành** (`hoanthanh`), nếu sản phẩm bị lỗi hoặc không ưng ý, khách hàng có thể gửi **Yêu cầu trả hàng** kèm lý do. Admin sẽ xem xét duyệt yêu cầu. Khi hàng được gửi trả về tới shop và Admin bấm **"Đã nhận hàng trả"**, hệ thống sẽ **HOÀN LẠI TỒN KHO VỀ CẢ 3 BẢNG**.

### 2. Luồng chạy A - Z:
- **Bước 1:** Khách bấm **"Yêu cầu trả hàng"** → Nhập lý do (ví dụ: "Sản phẩm bị vỡ vỏ").
- **Bước 2:** Đơn chuyển sang trạng thái `trahang`, tạo dòn trong bảng `yeucautranhang`.
- **Bước 3:** Admin mở trang Quản lý Trả hàng → Bấm **"Duyệt yêu cầu"** (trạng thái: `duyet_chohanghoi`).
- **Bước 4:** Khách gửi hàng về shop. Admin kiểm tra nhận được hàng → Bấm **"Đã nhận được hàng"**.
- **Bước 5:** Backend chạy hàm `confirmReceived` tự động cộng lại tồn kho cho từng sản phẩm trong đơn trả về 3 bảng `tonkho`, `sanpham`, và `luachon_sanpham`.

### 3. File Code & Vị trí dòng:
- **Backend Controller:** `server/controller/return.controller.js` (hàm `createRequest`, `approveRequest`, `confirmReceived`, dòng 5 - 148)

### 4. Giải thích đoạn Code chính:
```javascript
// File: server/controller/return.controller.js (Đoạn hoàn tồn kho khi Admin nhận hàng trả)
async function confirmReceived(req, res) {
  const { id } = req.params; // ID yêu cầu trả hàng

  // Lấy chi tiết danh sách sản phẩm của đơn hàng bị trả
  const [chitiet] = await db.query(
    "SELECT masanpham, soluong, maluachon FROM chitietdonhang WHERE madonhang = ?",
    [yeucau.madonhang]
  );

  // Duyệt qua từng sản phẩm để cộng lại tồn kho ở cả 3 bảng
  for (const item of chitiet) {
    await db.query("UPDATE tonkho SET soluongton = soluongton + ? WHERE masanpham = ?", [item.soluong, item.masanpham]);
    await db.query("UPDATE sanpham SET soluongton = soluongton + ? WHERE masanpham = ?", [item.soluong, item.masanpham]);
    if (item.maluachon) {
      await db.query("UPDATE luachon_sanpham SET soluongton = soluongton + ? WHERE maluachon = ?", [item.soluong, item.maluachon]);
    }
  }

  // Đổi trạng thái yêu cầu trả hàng sang 'danhan' (đã nhận hàng & xong)
  await db.query("UPDATE yeucautranhang SET trangthai = 'danhan', ngayxuly = NOW() WHERE mayeucau = ?", [id]);
}
```

---

## 📌 CHỨC NĂNG 10: XỬ LÝ & QUẢN LÝ ĐƠN HÀNG (Dành cho Admin)

### 1. Nghiệp vụ là gì?
Giúp Admin theo dõi toàn bộ đơn hàng của cửa hàng, lọc đơn theo trạng thái và bấm cập nhật tiến độ giao hàng: **Chờ xác nhận ➔ Đang giao ➔ Hoàn thành**. Mỗi lần đổi trạng thái đều được lưu vết lịch sử.

### 2. Luồng chạy A - Z:
- **Bước 1:** Admin đăng nhập (`admin@hongxinh.com`).
- **Bước 2:** Mở mục **"Quản lý đơn hàng"**.
- **Bước 3:** Bấm nút chuyển trạng thái đơn (ví dụ: chuyển từ "Chờ xác nhận" sang "Đang giao").
- **Bước 4:** Backend cập nhật cột `trangthaidonhang` trong bảng `donhang` và chèn 1 dòng lịch sử vào bảng `lichsutrangthaidon`.

### 3. File Code & Vị trí dòng:
- **Frontend Admin UI:** `client/src/page/AdminArea.js` (dòng 50 - 180)
- **Backend Controller:** `server/controller/order.controller.js` (hàm `updateStatus`, dòng 320 - 355)

---

## 📌 CHỨC NĂNG 11: QUẢN LÝ KHUYẾN MÃI THEO CHIẾN DỊCH & SẢN PHẨM

### 1. Nghiệp vụ là gì?
Admin có thể tạo các đợt Siêu Sale Khuyến Mãi (ví dụ: "Siêu Sale Hè Giảm 20%"). Chọn thời gian bắt đầu, thời gian kết thúc và chọn danh sách các sản phẩm được giảm giá. Khi khách xem sản phẩm trong thời gian chiến dịch, giá sản phẩm sẽ tự động trừ % giảm giá.

### 2. File Code & Vị trí dòng:
- **Backend Controller:** `server/controller/khuyenmai.controller.js` (dòng 10 - 120)
- **Database Table:** `khuyenmai` (`makhuyenmai`, `tenkhuyenmai`, `phantramgiam`), `sanpham_khuyenmai`

---

## 📌 CHỨC NĂNG 12: QUẢN LÝ TỒN KHO & CẢNH BÁO TỒN TỐI THIỂU

### 1. Nghiệp vụ là gì?
Admin xem được danh sách tồn kho của tất cả 16 sản phẩm. Nếu số lượng tồn kho của sản phẩm tụt xuống dưới mức an toàn (`soluongtoithieu`), hệ thống sẽ hiển thị cảnh báo đỏ để Admin kịp thời nhập thêm hàng.

### 2. File Code & Vị trí dòng:
- **Backend Controller:** `server/controller/inventory.controller.js` (dòng 10 - 60)
- **Database Table:** `tonkho` (`soluongton`, `soluongtoithieu`, `ghichu`)

---

## 📌 CHỨC NĂNG 13: XEM THỐNG KÊ KINH DOANH & BÁO CÁO DOANH THU

### 1. Nghiệp vụ là gì?
Hiển thị tổng quan tình hình kinh doanh của shop bằng các con số và biểu đồ sinh động:
- Tổng doanh thu thu được.
- Tổng số đơn hàng đã hoàn thành.
- Top sản phẩm bán chạy nhất.
- Biểu đồ biến động doanh thu 12 tháng.

### 2. File Code & Vị trí dòng:
- **Frontend Dashboard:** `client/src/page/AdminArea.js` (phần Thống kê)
- **Backend Controller:** `server/controller/stats.controller.js` (dòng 10 - 90)

---

## 📌 CHỨC NĂNG 14: GỬI EMAIL XÁC NHẬN ĐƠN HÀNG TỰ ĐỘNG

### 1. Nghiệp vụ là gì?
Sau khi đơn hàng được tạo thành công trên web, hệ thống tự động soạn một Email HTML đẹp mắt chứa danh sách món đồ đã đặt, địa chỉ nhận hàng, tổng tiền và gửi thẳng đến Email của khách hàng.

### 2. Luồng chạy A - Z:
- **Bước 1:** Đơn hàng tạo xong (`conn.commit()`).
- **Bước 2:** Code gọi hàm `sendOrderConfirmationEmail(order, items, userEmail)`.
- **Bước 3:** Thư viện `Nodemailer` kết nối tới máy chủ SMTP của Gmail bằng `EMAIL_USER` và `EMAIL_PASS` (App Password).
- **Bước 4:** Email được gửi đi bất đồng bộ (`async`), không bắt khách hàng phải chờ lâu trên web.

### 3. File Code & Vị trí dòng:
- **Utility gửi mail:** `server/utils/email.js` (dòng 1 - 65)

---

## 📋 BẢNG TỔNG HỢP TOÀN BỘ 21 BẢNG DATABASE TRONG ĐỀ TÀI

| STT | Tên bảng Database | Ý nghĩa & Nghiệp vụ phụ trách |
|---|---|---|
| 1 | `vaitro` | Phân quyền người dùng (`admin` / `khachhang`) |
| 2 | `nguoidung` | Lưu tài khoản, email, mật khẩu mã hóa bcrypt, SĐT |
| 3 | `diachi` | Lưu địa chỉ giao hàng mặc định của khách |
| 4 | `danhmuc` | Danh mục sản phẩm (Chăm sóc da, Làm sạch, Chống nắng, Trang điểm) |
| 5 | `thuonghieu` | Các thương hiệu mỹ phẩm (Cocoon, Klairs, L'Oreal, Skin1004...) |
| 6 | `sanpham` | Lưu 16 sản phẩm mỹ phẩm chính |
| 7 | `luachon_sanpham` | **Lưu các biến thể màu son & dung tích** (Ruby Woo, Russian Red, Diva, Denim...) |
| 8 | `tonkho` | **Bảng quản lý tồn kho tổng** theo sản phẩm |
| 9 | `giohang` | Lưu giỏ hàng của từng khách |
| 10 | `chitietgiohang` | Lưu từng món hàng và biến thể trong giỏ |
| 11 | `donhang` | Lưu thông tin đơn hàng, tổng tiền, trạng thái |
| 12 | `chitietdonhang` | Lưu chi tiết từng sản phẩm & biến thể mua trong đơn |
| 13 | `thanhtoan` | Phương thức thanh toán (COD / QR Code, mã giao dịch) |
| 14 | `lichsutrangthaidon` | Nhật ký vệt thay đổi trạng thái của đơn hàng |
| 15 | `voucher` | Thông tin voucher giảm giá (mã campaign, giá trị giảm) |
| 16 | `voucher_nguoidung` | Phân phối voucher cho người dùng (**chứa cột `ma_serial` độc nhất**) |
| 17 | `yeucautranhang` | Quản lý các yêu cầu đổi trả hàng của khách |
| 18 | `danhgia` | Đánh giá số sao và bình luận sản phẩm |
| 19 | `hoidap` | Hỏi đáp thắc mắc về sản phẩm |
| 20 | `khuyenmai` | Chiến dịch khuyến mãi giảm giá % |
| 21 | `sanpham_khuyenmai` | Liên kết sản phẩm áp dụng chương trình khuyến mãi |

---

## 🎯 HƯỚNG DẪN 3 BƯỚC ĐÀI THƯỜNG HỎI KHI BẢO VỆ

1. **GV hỏi: "Chức năng trừ tồn kho nằm ở file nào và dòng nào?"**
   - *Trả lời:* DẠ thưa thầy/cô, nằm ở file `server/controller/order.controller.js` từ dòng 190 đến dòng 265. Code dùng `Transaction` kết hợp lệnh `FOR UPDATE` để khóa dòng dữ liệu, sau đó thực hiện 3 câu lệnh `UPDATE` trừ số lượng tồn kho đồng thời ở 3 bảng: `luachon_sanpham`, `tonkho` và `sanpham`.

2. **GV hỏi: "Voucher chống dùng lặp hoặc dùng nhầm tài khoản ra sao?"**
   - *Trả lời:* DẠ thưa thầy/cô, ở bảng `voucher_nguoidung`, mỗi lượt cấp voucher hệ thống tự động sinh 1 mã `ma_serial` duy nhất (ví dụ `VC-KH1-YSI93J91`). Khi đặt hàng, hệ thống kiểm tra câu lệnh `WHERE ma_serial = ? AND manguoidung = ? AND sudung = 0`. Dùng xong là cột `sudung` chuyển thành `1` ngay ạ.

3. **GV hỏi: "Khi khách trả hàng thì tồn kho tính thế nào?"**
   - *Trả lời:* DẠ thưa thầy/cô, nằm ở file `server/controller/return.controller.js` trong hàm `confirmReceived` (dòng 94 - 145). Khi Admin xác nhận đã nhận được hàng hoàn về shop, code sẽ duyệt từng sản phẩm trong đơn và chạy 3 lệnh `UPDATE` cộng trả lại số lượng tồn kho vào cả 3 bảng `tonkho`, `sanpham` và `luachon_sanpham` ạ.
