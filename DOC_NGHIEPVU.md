# 🛍️ TÀI LIỆU NGHIỆP VỤ THỰC TẾ THUẦN TÚY (KHÔNG DÍNH CODE LẬP TRÌNH)

**Đề tài:** Website Bán Mỹ Phẩm Tự Động (ReactJS + Node.js Express + MySQL)  
**Sinh viên thực hiện:** Phạm Yến Nhi — MSSV: DH52201160  
**Giảng viên hướng dẫn:** ThS. Hà Văn Tùng  

---

## 💡 MỤC ĐÍCH TÀI LIỆU
Tài liệu này giải thích **100% Nghiệp vụ vận hành thực tế** của một Cửa hàng Mỹ phẩm Trực tuyến (từ góc độ người mua và chủ shop). **Hoàn toàn không dính mã code, không dùng thuật ngữ lập trình rắc rối**, giúp bạn trả lời tự tin theo đúng góc độ nghiệp vụ kinh doanh thực tế trước Thầy Cô.

---

# PHẦN I: 20 CHỨC NĂNG NGHIỆP VỤ VẬN HÀNH THỰC TẾ (THUẦN TÚY)

---

### 1. Nghiệp vụ Đăng ký & Đăng nhập tài khoản
- **Ý nghĩa thực tế:** Cho phép khách hàng tạo một tài khoản mua sắm cá nhân bằng Email và Mật khẩu. Khi đăng nhập thành công, hệ thống nhận diện và ghi nhớ tư cách khách hàng để họ có thể lưu sổ địa chỉ, xem giỏ hàng và theo dõi các đơn hàng riêng của mình.
- **Nằm ở Slide báo vệ:** Slide 7 (Chức năng Khách hàng)

---

### 2. Nghiệp vụ Quản lý Hồ sơ cá nhân & Đổi mật khẩu
- **Ý nghĩa thực tế:** Khách hàng có thể tự do cập nhật lại Họ tên, Số điện thoại liên hệ và thay đổi Mật khẩu cá nhân bất kỳ lúc nào để bảo vệ tài khoản khỏi bị lộ thông tin.
- **Nằm ở Slide báo vệ:** Slide 7 (Chức năng Khách hàng)

---

### 3. Nghiệp vụ Xem danh sách sản phẩm & Tìm kiếm / Lọc tức thì
- **Ý nghĩa thực tế:** Hiển thị 16 mặt hàng mỹ phẩm phổ biến với đầy đủ giá niêm yết và giá đang được giảm. Khách hàng có thể gõ tìm nhanh tên loại mỹ phẩm (VD: Son, Kem dưỡng) hoặc bấm chọn theo từng dòng danh mục (Chăm sóc da, Trang điểm, Chống nắng) để tìm đúng món đồ cần mua chỉ trong chớp mắt.
- **Nằm ở Slide báo vệ:** Slide 7 (Chức năng Khách hàng)

---

### 4. Nghiệp vụ Chi tiết sản phẩm & Chọn màu son (MAC / 3CE)
- **Ý nghĩa thực tế:** Cho phép khách hàng xem hình ảnh phóng to, đọc công dụng, thành phần và hướng dẫn sử dụng. Với các dòng son môi có nhiều màu sắc (MAC Ruby Woo, Russian Red; 3CE Denim, Over Dose), khách hàng bấm chọn màu nào thì hệ thống tự đổi giá tiền và thông báo số lượng hàng sẵn có của đúng màu son đó.
- **Nằm ở Slide báo vệ:** Slide 7 (Chức năng Khách hàng)

---

### 5. Nghiệp vụ Giỏ hàng & Ghi nhớ mặt hàng
- **Ý nghĩa thực tế:** Khách chọn sản phẩm đưa vào Giỏ hàng để chuẩn bị tính tiền. Giỏ hàng có khả năng tự động ghi nhớ các món đồ khách đã chọn kể cả khi khách tắt trình duyệt hoặc rời khỏi trang web.
- **Nằm ở Slide báo vệ:** Slide 8 (Chức năng Giỏ hàng & Thanh toán)

---

### 6. Nghiệp vụ Sổ địa chỉ giao hàng & Đặt địa chỉ mặc định
- **Ý nghĩa thực tế:** Cho phép khách hàng lưu nhiều địa chỉ nhận hàng (VD: Nhà riêng, Cơ quan). Khách có thể chọn 1 địa chỉ hay sử dụng nhất làm "Địa chỉ mặc định" để mỗi lần mua hàng hệ thống tự điền sẵn mà không cần gõ lại.
- **Nằm ở Slide báo vệ:** Slide 8 (Chức năng Giỏ hàng & Thanh toán)

---

### 7. Nghiệp vụ Đặt hàng & Tính đúng giá giảm
- **Ý nghĩa thực tế:** Khách hàng xác nhận thông tin mua hàng. Hệ thống tính toán chính xác số tiền cuối cùng dựa trên đơn giá đã trừ phần trăm giảm giá (nếu có), áp dụng mã giảm giá và tự động trừ số lượng hàng trong kho để đảm bảo không bị bán quá số lượng sẵn có.
- **Nằm ở Slide báo vệ:** Slide 8 (Chức năng Giỏ hàng & Thanh toán)

---

### 8. Nghiệp vụ Thanh toán QR Code VietQR
- **Ý nghĩa thực tế:** Cung cấp phương thức chuyển khoản ngân hàng thông minh. Hệ thống tự động tạo ra một hình ảnh mã QR Code chứa sẵn Số tài khoản cửa hàng (Vietcombank), Tên chủ tài khoản và Số tiền chính xác của đơn hàng. Khách chỉ cần mở app Ngân hàng trên điện thoại quét mã là tiền chuyển đúng nơi, đúng số tiền mà không sợ chuyển nhầm.
- **Nằm ở Slide báo vệ:** Slide 8 (Chức năng Giỏ hàng & Thanh toán)

---

### 9. Nghiệp vụ Thanh toán Tiền mặt khi nhận hàng (COD)
- **Ý nghĩa thực tế:** Phục vụ cho đối tượng khách hàng thích mua hàng trả tiền trực tiếp. Khách sẽ gửi đơn đi và trả tiền mặt cho nhân viên giao hàng (Shipper) khi nhận được gói mỹ phẩm tận tay.
- **Nằm ở Slide báo vệ:** Slide 8 (Chức năng Giỏ hàng & Thanh toán)

---

### 10. Nghiệp vụ Mã giảm giá Serial độc nhất (`[VC-KH01-0001]`)
- **Ý nghĩa thực tế:** Mỗi thẻ giảm giá gửi tặng cho khách hàng được in một mã Serial riêng biệt (VD: `[VC-KH01-0001]`). Mỗi mã này chỉ có giá trị sử dụng đúng 1 lần duy nhất. Sau khi khách hàng dùng mã này để mua đơn hàng thành công, thẻ voucher đó tự động hủy hiệu lực và không xuất hiện lại nữa.
- **Nằm ở Slide báo vệ:** Slide 8 (Chức năng Giỏ hàng & Thanh toán)

---

### 11. Nghiệp vụ Gửi Email xác nhận đơn hàng tự động
- **Ý nghĩa thực tế:** Ngay sau khi khách hàng bấm đặt đơn thành công, hệ thống cửa hàng tự động gửi một lá thư xác nhận điện tử kèm hóa đơn chi tiết vào hòm thư Email cá nhân của khách hàng để làm bằng chứng mua hàng.
- **Nằm ở Slide báo vệ:** Slide 8 (Chức năng Giỏ hàng & Thanh toán)

---

### 12. Nghiệp vụ Xem & In Hóa đơn điện tử
- **Ý nghĩa thực tế:** Khách hàng hoặc Admin có thể mở xem tờ Hóa đơn bán hàng điện tử chuẩn tiếng Việt đẹp mắt bất kỳ lúc nào và bấm nút In ra giấy hoặc lưu thành file PDF để lưu trữ sổ sách.
- **Nằm ở Slide báo vệ:** Slide 8 (Chức năng Giỏ hàng & Thanh toán)

---

### 13. Nghiệp vụ Theo dõi Lịch sử đơn hàng & Tiến trình giao hàng
- **Ý nghĩa thực tế:** Khách hàng có thể theo dõi xem đơn hàng của mình hiện đang ở giai đoạn nào theo thời gian thực (Đang chờ shop xác nhận ➔ Đang giao cho shipper ➔ Đã giao hàng thành công).
- **Nằm ở Slide báo vệ:** Slide 8 (Chức năng Giỏ hàng & Thanh toán)

---

### 14. Nghiệp vụ Yêu cầu Trả hàng & Hoàn lại kho
- **Ý nghĩa thực tế:** Nếu sản phẩm giao đến bị hư hỏng hoặc không đúng mô tả, khách hàng có quyền gửi yêu cầu đổi trả. Khi cửa hàng nhận lại được kiện hàng trả về và bấm xác nhận, hệ thống tự động cộng số lượng mỹ phẩm đó trở lại vào kho hàng.
- **Nằm ở Slide báo vệ:** Slide 9 (Chức năng Quản trị Admin)

---

### 15. Nghiệp vụ Chiến dịch Khuyến mãi Sale % theo sản phẩm
- **Ý nghĩa thực tế:** Chủ cửa hàng có thể mở đợt Siêu Sale giảm giá % (VD: Giảm 15% tất cả son MAC) trong một khoảng thời gian nhất định. Trong đợt Sale, sản phẩm tự động hiển thị nhãn % màu đỏ và tự động tính lại giá bán mới cho khách.
- **Nằm ở Slide báo vệ:** Slide 9 (Chức năng Quản trị Admin)

---

### 16. Nghiệp vụ Báo cáo Thống kê Doanh thu & Lượt truy cập
- **Ý nghĩa thực tế:** Giúp chủ cửa hàng nắm bắt tình hình kinh doanh thông qua 5 chỉ số chính: Tổng số mỹ phẩm, Tổng số khách đăng ký, Tổng số đơn hàng, Tổng tiền doanh thu thực tế (chỉ tính đơn giao thành công) và Số lượng lượt khách ghé thăm trang web.
- **Nằm ở Slide báo vệ:** Slide 10 (Thống kê Doanh thu Dashboard)

---

### 17. Nghiệp vụ Cảnh báo Hết hàng rực đỏ
- **Ý nghĩa thực tế:** Hệ thống tự động theo dõi mức độ tồn kho. Nếu loại mỹ phẩm nào trong kho chỉ còn từ 5 sản phẩm trở xuống, dòng sản phẩm đó trên trang quản trị sẽ đổi thành màu đỏ rực để nhắc nhở chủ cửa hàng nhập thêm hàng bổ sung.
- **Nằm ở Slide báo vệ:** Slide 9 (Chức năng Quản trị Admin)

---

### 18. Nghiệp vụ Quản lý Danh mục & Thương hiệu Mỹ phẩm
- **Ý nghĩa thực tế:** Cho phép chủ cửa hàng phân loại mỹ phẩm theo các nhóm ngành hàng (Chăm sóc da, Trang điểm) và các Hãng sản xuất (Cocoon, Klairs, L'Oreal, MAC, 3CE...) để khách hàng dễ dàng tìm kiếm.
- **Nằm ở Slide báo vệ:** Slide 9 (Chức năng Quản trị Admin)

---

### 19. Nghiệp vụ Đánh giá Sản phẩm (Chấm sao & Nhận xét)
- **Ý nghĩa thực tế:** Những khách hàng đã mua và nhận sản phẩm thành công được phép để lại số sao chấm điểm (từ 1 đến 5 sao) và viết lời nhận xét đánh giá thực tế để giúp các khách hàng khác tham khảo.
- **Nằm ở Slide báo vệ:** Slide 9 (Chức năng Quản trị Admin)

---

### 20. Nghiệp vụ Hỏi đáp Thắc mắc sản phẩm
- **Ý nghĩa thực tế:** Khách hàng có thể đặt các câu hỏi thắc mắc về thành phần hoặc cách dùng bên dưới sản phẩm. Chủ cửa hàng sẽ vào xem và viết câu trả lời giải đáp trực tiếp để hỗ trợ tư vấn cho khách.
- **Nằm ở Slide báo vệ:** Slide 9 (Chức năng Quản trị Admin)

---

# PHẦN II: 8 BƯỚC THAO TÁC NGHIỆP VỤ CỦA KHÁCH HÀNG (TRÍCH LUẬN VĂN WORD)

1. **Bước 1: Tìm kiếm & Lọc mỹ phẩm**  
   - Khách gõ tên sản phẩm vào ô tìm kiếm hoặc bấm vào danh mục ("Chăm sóc da", "Trang điểm", "Chống nắng") để tìm sản phẩm cần mua.

2. **Bước 2: Xem Chi tiết Mỹ phẩm & Chọn Biến thể**  
   - Bấm vào sản phẩm ➔ Xem mô tả công dụng, thành phần và bấm chọn tùy chọn biến thể (Màu son MAC / 3CE, Dung tích 150ml / 500ml).

3. **Bước 3: Chọn Số lượng & Thêm vào Giỏ hàng**  
   - Nhấp nút (+) (-) chọn số lượng ➔ Bấm "THÊM VÀO GIỎ HÀNG" ➔ Màn hình hiện thông báo đã thêm thành công, icon giỏ hàng nhảy số.

4. **Bước 4: Kiểm tra Giỏ hàng & Áp dụng Mã Voucher Serial**  
   - Xem lại các món trong giỏ ➔ Bấm nút "Áp dụng" mã Voucher Serial độc nhất `[VC-KH01-0001]` ➔ Tiền giảm trừ trực tiếp vào Tổng tiền.

5. **Bước 5: Điền Thông tin Giao hàng & Ghi chú**  
   - Nhập Họ tên, Số điện thoại, Địa chỉ chi tiết và Ghi chú dặn shipper. Thông tin mặc định sẽ tự động điền sẵn nếu đã đăng nhập.

6. **Bước 6: Lựa chọn Phương thức Thanh toán**  
   - Chọn Tiền mặt (COD) hoặc Quét mã QR Code VietQR để chuyển khoản ngân hàng tự động điền số tiền.

7. **Bước 7: Xác nhận Đặt hàng & Nhận phản hồi**  
   - Bấm "XÁC NHẬN ĐẶT HÀNG" ➔ Màn hình thông báo "Đặt hàng thành công! Mã đơn của bạn là #..." ➔ Giỏ hàng tự động làm sạch.

8. **Bước 8: Theo dõi Lịch sử Đơn hàng & Xem/In Hóa đơn**  
   - Xem tiến trình đơn hàng theo thời gian thực ➔ Bấm vào đơn xem Hóa đơn điện tử và bấm "In Hóa đơn" ra máy in hoặc file PDF.
