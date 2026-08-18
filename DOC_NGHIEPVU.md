# 📋 TÀI LIỆU NGHIỆP VỤ HỆ THỐNG WEBSITE BÁN MỸ PHẨM
**Sinh viên:** Phạm Yến Nhi — **MSSV:** DH52201160 | **GVHD:** ThS. Hà Văn Tùng

---

## 1. ĐĂNG KÝ / ĐĂNG NHẬP TÀI KHOẢN

**Luồng nghiệp vụ:**
- Khách hàng điền **Họ tên, Email, Mật khẩu, Số điện thoại** → hệ thống kiểm tra email/SĐT đã tồn tại chưa → mã hóa mật khẩu bằng `bcrypt` → lưu vào bảng `nguoidung`.
- Đăng nhập: so sánh mật khẩu đã mã hóa → trả về `JWT Token` → lưu vào `localStorage` → tự động phân quyền Admin/Khách hàng.

**Bảng DB liên quan:** `nguoidung`, `vaitro`

```sql
-- Kiểm tra đăng nhập
SELECT * FROM nguoidung WHERE email = ? AND trangthai = 'hoatdong'
-- Nếu đúng mật khẩu → trả về JWT token kèm vaiTro
```

**File code:** `server/controller/auth.controller.js`

---

## 2. XEM DANH SÁCH & TÌM KIẾM SẢN PHẨM

**Luồng nghiệp vụ:**
- Hệ thống load **16 sản phẩm** từ DB (Chăm sóc da, Làm sạch, Chống nắng, Trang điểm/Son).
- Khách hàng có thể lọc theo **danh mục** hoặc **tìm kiếm từ khóa** ("Son", "Cocoon", "Klairs"...).
- Tìm kiếm dò trong tên sản phẩm, mô tả, thương hiệu.

**Bảng DB:** `sanpham`, `danhmuc`, `thuonghieu`, `tonkho`, `luachon_sanpham`

```sql
SELECT p.*, dm.tendanhmuc, th.tenthuonghieu, tk.soluongton
FROM sanpham p
JOIN danhmuc dm ON dm.madanhmuc = p.madanhmuc
LEFT JOIN thuonghieu th ON th.mathuonghieu = p.mathuonghieu
LEFT JOIN tonkho tk ON tk.masanpham = p.masanpham
ORDER BY p.masanpham ASC
```

**File code:** `server/controller/product.controller.js` → hàm `layDanhSachSanPham()`  
**Frontend:** `client/src/store/AppContext.js` → `danhSachLoc` (useMemo lọc theo từ khóa)

---

## 3. XEM CHI TIẾT SẢN PHẨM & CHỌN BIẾN THỂ

**Luồng nghiệp vụ:**
- Khách click sản phẩm → hiện trang chi tiết: ảnh, mô tả, thành phần, hướng dẫn sử dụng.
- Chọn **biến thể**: dung tích (150ml/500ml) hoặc màu sắc (Son MAC: Ruby Woo/Russian Red/Diva; Son 3CE: Denim/Over Dose/Berry/Coral).
- Giá hiển thị theo biến thể được chọn.

**Bảng DB:** `luachon_sanpham` (mausac, loai, dungtich, giaban, soluongton)

**File code:** `client/src/component/ProductDetail.js`

---

## 4. THÊM VÀO GIỎ HÀNG

**Luồng nghiệp vụ:**
- Khách chọn biến thể → nhấn "THÊM VÀO GIỎ HÀNG" → kiểm tra tồn kho biến thể (`soluongton > 0`).
- Giỏ hàng lưu trong `localStorage` (phía client) và bảng `chitietgiohang` trong DB.
- Hiển thị số lượng item trên icon giỏ hàng.

**Bảng DB:** `giohang`, `chitietgiohang`

**File code:** `client/src/store/AppContext.js` → hàm `themVaoGio()`

---

## 5. ĐẶT HÀNG & THANH TOÁN (Quan trọng)

**Luồng nghiệp vụ:**
1. Khách nhập thông tin người nhận (Họ tên, SĐT, Địa chỉ).
2. Chọn voucher (nếu có mã serial `VC-xxx`).
3. Chọn phương thức: **Tiền mặt COD** hoặc **Chuyển khoản QR Code**.
4. Nhấn **"Xác nhận đặt hàng"** → **Hệ thống TỰ ĐỘNG TRỪ TỒN KHO NGAY** (không cần đợi admin duyệt).
5. Đơn hàng tạo ra với trạng thái `choxacnhan`.
6. Hệ thống gửi email xác nhận tự động.

**Tồn kho bị trừ ở 3 bảng đồng thời:**
```sql
UPDATE luachon_sanpham SET soluongton = GREATEST(soluongton - ?, 0) WHERE maluachon = ?
UPDATE tonkho SET soluongton = GREATEST(soluongton - ?, 0) WHERE masanpham = ?
UPDATE sanpham SET soluongton = GREATEST(soluongton - ?, 0) WHERE masanpham = ?
```

**Áp dụng voucher:** Hệ thống kiểm tra `ma_serial` trong `voucher_nguoidung.sudung = 0` → nếu hợp lệ, trừ `giatri` vào tổng tiền → đánh dấu `sudung = 1`.

**Bảng DB:** `donhang`, `chitietdonhang`, `thanhtoan`, `lichsutrangthaidon`, `luachon_sanpham`, `tonkho`

**File code:** `server/controller/order.controller.js` → hàm `create()` (dùng `Transaction` + `FOR UPDATE`)

---

## 6. LỊCH SỬ ĐƠN HÀNG & VOUCHER

**Luồng nghiệp vụ:**
- Khách xem tab "Lịch sử đơn" → hiển thị tất cả đơn hàng kèm trạng thái (Chờ xác nhận / Đang giao / Hoàn thành).
- Nhấn vào đơn hàng → xem **Hóa đơn điện tử** chi tiết (Modal HoaDon).
- Tab "Voucher của tôi" → hiển thị danh sách voucher kèm **mã serial độc nhất** (`VC-YSI93J91`).

**Bảng DB:** `donhang`, `chitietdonhang`, `voucher`, `voucher_nguoidung` (có cột `ma_serial`)

**File code:** `server/controller/voucher.controller.js` → `getMyVouchers()`

---

## 7. HỦY ĐƠN HÀNG

**Luồng nghiệp vụ:**
- Khách chỉ có thể hủy đơn ở trạng thái `choxacnhan` (chưa giao hàng).
- Sau khi hủy → **Tồn kho được hoàn lại** về cả 3 bảng.
- Trạng thái chuyển sang `dahuy`.

**File code:** `server/controller/order.controller.js` → hàm `cancel()`

---

## 8. DUYỆT ĐƠN HÀNG (Admin)

**Luồng nghiệp vụ:**
- Admin đăng nhập vào trang quản trị → xem danh sách đơn hàng.
- Chuyển trạng thái: `choxacnhan` → `danggiao` → `hoanthanh`.
- Mỗi lần đổi trạng thái → ghi vào `lichsutrangthaidon`.

**Bảng DB:** `donhang`, `lichsutrangthaidon`

**File code:** `server/controller/order.controller.js` → hàm `updateStatus()`

---

## 9. YÊU CẦU TRẢ HÀNG & HOÀN TỒN KHO (Quan trọng)

**Luồng nghiệp vụ:**
1. Khách gửi yêu cầu trả hàng (chỉ khi đơn `hoanthanh`).
2. Đơn chuyển sang trạng thái `trahang`.
3. Admin duyệt yêu cầu → `duyet_chohanghoi`.
4. Khách gửi hàng về, Admin xác nhận nhận hàng → **TỒN KHO ĐƯỢC HOÀN LẠI** vào cả 3 bảng.

**Tồn kho được cộng lại:**
```sql
UPDATE tonkho SET soluongton = soluongton + ? WHERE masanpham = ?
UPDATE sanpham SET soluongton = soluongton + ? WHERE masanpham = ?
UPDATE luachon_sanpham SET soluongton = soluongton + ? WHERE maluachon = ?
```

**Bảng DB:** `yeucautranhang`, `chitietdonhang`, `tonkho`, `luachon_sanpham`

**File code:** `server/controller/return.controller.js` → hàm `confirmReceived()`

---

## 10. ĐÁNH GIÁ & HỎI ĐÁP SẢN PHẨM

**Luồng:** Khách đặt hàng thành công → có thể đánh giá sản phẩm (1-5 sao, bình luận). Admin có thể trả lời câu hỏi.

**Bảng DB:** `danhgia`, `hoidap`

---

## 11. QUẢN LÝ VOUCHER (Admin)

**Luồng:**
- Admin tạo voucher (Tên, Loại giảm giá, Giá trị, Hạn sử dụng).
- Admin cấp voucher cho từng khách hàng → hệ thống **tự sinh mã serial độc nhất** (`VC-KH{userId}-XXXXXX`).
- Mỗi lần cấp là 1 dòng trong `voucher_nguoidung` với `ma_serial` riêng.

**Bảng DB:** `voucher`, `voucher_nguoidung` (ma_serial UNIQUE)

**File code:** `server/controller/voucher.controller.js` → hàm `grantVoucher()`

---

## 12. CHIẾN DỊCH KHUYẾN MÃI THEO SẢN PHẨM (Admin)

**Luồng:**
- Admin tạo chiến dịch giảm giá (% giảm, ngày bắt đầu/kết thúc).
- Chọn sản phẩm áp dụng.
- Khi khách xem sản phẩm, giá hiển thị đã trừ % khuyến mãi.

**Bảng DB:** `khuyenmai` (makhuyenmai, tenkhuyenmai, phantramgiam), `sanpham_khuyenmai`

---

## 13. QUẢN LÝ TỒN KHO (Admin)

**Luồng:**
- Admin xem tồn kho từng sản phẩm.
- Cảnh báo khi tồn kho dưới mức tối thiểu (`soluongtoithieu`).
- Nhập thêm hàng → cập nhật `tonkho`.

**Bảng DB:** `tonkho` (soluongton, soluongtoithieu)

---

## 14. THỐNG KÊ DOANH THU (Admin)

**Luồng:**
- Dashboard hiển thị: Doanh thu theo ngày/tháng, Top sản phẩm bán chạy, Số đơn hàng theo trạng thái.
- Biểu đồ line chart doanh thu 12 tháng.

**Bảng DB:** `donhang`, `chitietdonhang`

---

## 15. GỬI EMAIL XÁC NHẬN ĐƠN HÀNG

**Luồng:** Sau khi đơn hàng tạo thành công → server gửi email HTML tự động đến email khách hàng với đầy đủ thông tin đơn.

**Cấu hình:** Cần set biến môi trường `EMAIL_USER` và `EMAIL_PASS` trên server host (Render.com):
```
EMAIL_USER = phamyennhi2462002@gmail.com
EMAIL_PASS = lilbbuxhaoswthgu   ← Gmail App Password (không phải mật khẩu thường)
```

**File code:** `server/utils/email.js`

---

## BẢNG CẤU TRÚC DATABASE ĐẦY ĐỦ

| STT | Bảng | Chức năng chính |
|---|---|---|
| 1 | `vaitro` | Phân quyền: admin / khachhang |
| 2 | `nguoidung` | Thông tin tài khoản người dùng |
| 3 | `diachi` | Địa chỉ giao hàng mặc định |
| 4 | `danhmuc` | Danh mục sản phẩm (4 loại) |
| 5 | `thuonghieu` | Thương hiệu (Cocoon, Klairs...) |
| 6 | `sanpham` | 16 sản phẩm chính |
| 7 | `luachon_sanpham` | Biến thể (màu sắc, dung tích) |
| 8 | `tonkho` | Tồn kho tổng theo sản phẩm |
| 9 | `giohang` | Giỏ hàng |
| 10 | `chitietgiohang` | Chi tiết sản phẩm trong giỏ |
| 11 | `donhang` | Đơn hàng |
| 12 | `chitietdonhang` | Chi tiết từng sản phẩm trong đơn |
| 13 | `thanhtoan` | Thông tin thanh toán |
| 14 | `lichsutrangthaidon` | Lịch sử thay đổi trạng thái đơn |
| 15 | `voucher` | Voucher khuyến mãi (macode độc nhất) |
| 16 | `voucher_nguoidung` | Phân phối voucher → **ma_serial độc nhất** |
| 17 | `yeucautranhang` | Yêu cầu đổi/trả hàng |
| 18 | `danhgia` | Đánh giá sản phẩm |
| 19 | `hoidap` | Hỏi đáp sản phẩm |
| 20 | `khuyenmai` | Chiến dịch khuyến mãi |
| 21 | `sanpham_khuyenmai` | Sản phẩm áp dụng chiến dịch |
