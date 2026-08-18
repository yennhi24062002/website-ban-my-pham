# 🎙️ TÀI LIỆU HỌC NÓI THUYẾT TRÌNH & BỘ CÂU HỎI BẢO VỆ ĐỒ ÁN

**Đề tài:** Website Bán Mỹ Phẩm Tự Động (ReactJS + Node.js Express + MySQL)  
**Sinh viên thực hiện:** Phạm Yến Nhi — MSSV: DH52201160  
**Giảng viên hướng dẫn:** ThS. Hà Văn Tùng  

---

## 💡 HƯỚNG DẪN HỌC BẢO VỆ
Tài liệu này được biên soạn **bám sát đúng 12 slide** trong file `Luận Văn Bài Thuyết Trình.pptx`. Bạn chỉ cần mở slide lên và đọc theo đúng **lời nói mẫu bình dân, tự nhiên** bên dưới là sẽ hoàn thành bài thuyết trình 5 phút vô cùng mượt mà.

---

# PHẦN I: KỊCH BẢN NÓI THUYẾT TRÌNH TỪNG SLIDE (12 SLIDE)

---

### 🎬 Slide 1: Trang Bìa Giới Thiệu
- 🗣️ **Lời nói với Hội đồng:**  
  *"Kính chào Quý Thầy/Cô trong Hội đồng bảo vệ. Em tên là Phạm Yến Nhi, MSSV DH52201160. Sau đây em xin phép được báo cáo đồ án tốt nghiệp với đề tài: **'Xây dựng Website bán mỹ phẩm tự động'**, dưới sự hướng dẫn của thầy ThS. Hà Văn Tùng."*

---

### 🎬 Slide 2: Nội Dung Trình Bày
- 🗣️ **Lời nói với Hội đồng:**  
  *"Bài thuyết trình của em hôm nay gồm 6 nội dung chính: 
  1. Đặt vấn đề & Bài toán thực tế
  2. Tổng quan đề tài & Mục tiêu
  3. Chức năng cốt lõi hệ thống
  4. Cơ sở dữ liệu
  5. Kết luận đối chiếu mục tiêu
  6. Hạn chế & Hướng mở rộng."*

---

### 🎬 Slide 3: 01. Đặt Vấn Đề & Bài Toán Thực Tế
- 🗣️ **Lời nói với Hội đồng:**  
  *"Thưa Thầy Cô, xuất phát từ nhu cầu mua sắm mỹ phẩm trực tuyến ngày càng phổ biến, người dùng rất chú trọng đến việc xem chi tiết thành phần, loại da phù hợp và chọn đúng biến thể như màu son hay dung tích. Bên cạnh đó, xu hướng thanh toán trực tuyến bằng mã QR Ngân hàng giúp khách hàng mua sắm tiện lợi và nhanh chóng hơn."*

---

### 🎬 Slide 4 & 5: 02. Tổng Quan Đề Tài & Mục Tiêu Cụ Thể
- 🗣️ **Lời nói với Hội đồng:**  
  *"Mục tiêu của đề tài là xây dựng hoàn chỉnh một Website bán mỹ phẩm tự động bằng ReactJS, Node.js và MySQL. Hệ thống phục vụ 2 nhóm người dùng: **Khách hàng** (tìm sản phẩm, chọn biến thể màu son, mua hàng, quét mã VietQR) và **Admin** (quản lý mỹ phẩm, duyệt đơn hàng, tạo đợt Siêu Sale và xem báo cáo doanh thu)."*

---

### 🎬 Slide 6: Công Nghệ Sử Dụng
- 🗣️ **Lời nói với Hội đồng:**  
  *"Về mặt công nghệ: 
  - **Frontend:** Em xây dựng bằng ReactJS 18 kết hợp Context API quản lý trạng thái.
  - **Backend:** Sử dụng Node.js Express với kiến trúc RESTful API.
  - **Database:** Sử dụng TiDB Cloud MySQL 8.0, mã hóa mật khẩu bằng Bcrypt và phân quyền bảo mật bằng JWT Token."*

---

### 🎬 Slide 7: 03. Chức Năng Cốt Lõi Hệ Thống
- 🗣️ **Lời nói với Hội đồng:**  
  *"Hệ thống gồm 2 phân quyền rõ rệt: 
  - **Khách hàng:** Tìm kiếm sản phẩm, lọc theo danh mục, chọn màu son MAC/3CE, áp mã Voucher Serial cá nhân `[VC-KH01-0001]`, thanh toán VietQR và nhận Email tự động.
  - **Admin:** Có giao diện quản lý danh mục, duyệt đơn hàng đa bước, tạo đợt Siêu Sale và theo dõi 5 chỉ số doanh thu thời gian thực."*

---

### 🎬 Slide 8: 04. Cơ Sở Dữ Liệu (21 Bảng SQL)
- 🗣️ **Lời nói với Hội đồng:**  
  *"Cơ sở dữ liệu của dự án được chuẩn hóa thành **21 bảng SQL** liên kết chặt chẽ với nhau, bao gồm nhóm Người dùng, Địa chỉ, Danh mục, Sản phẩm, Biến thể màu, Giỏ hàng, Đơn hàng, Thanh toán, Voucher và Trả hàng."*

---

### 🎬 Slide 9: 05. Kết Luận Đối Chiếu Với Mục Tiêu
- 🗣️ **Lời nói với Hội đồng:**  
  *"Đối chiếu với mục tiêu ban đầu, đề tài đã hoàn thành xuất sắc các chức năng đề ra: Giao diện người dùng sang trọng, quy trình đặt hàng số hóa, tích hợp VietQR API, gửi Email xác nhận và trang Admin quản trị toàn diện."*

---

### 🎬 Slide 10: Hạn Chế Của Đề Tài
- 🗣️ **Lời nói với Hội đồng:**  
  *"Bên cạnh kết quả đạt được, dự án vẫn còn một số hạn chế nhỏ như: Chưa tính toán chi tiết sổ sách kế toán nguồn vốn đầu vào, môi trường chạy thử nghiệm cần tiếp nhận thêm phản hồi người dùng thực tế và gửi Email xác nhận đơn hàng đang ở mức mô phỏng thử nghiệm."*

---

### 🎬 Slide 11: Hướng Mở Rộng
- 🗣️ **Lời nói với Hội đồng:**  
  *"Trong tương lai, hệ thống có thể mở rộng bằng cách tích hợp cổng thanh toán trực tiếp VNPay/ZaloPay IPN 24/7, ứng dụng AI tư vấn loại da và phát triển App di động iOS/Android bằng React Native."*

---

### 🎬 Slide 12: Trang Cảm Ơn
- 🗣️ **Lời nói với Hội đồng:**  
  *"Em xin chân thành cảm ơn Quý Thầy/Cô đã lắng nghe bài báo cáo của em. Em rất mong nhận được những góp ý từ Quý Thầy/Cô để hoàn thiện đề tài hơn. Em xin cảm ơn ạ!"*

---

# PHẦN II: BỘ CÂU HỎI & TRẢ LỜI NGHIỆP VỤ BẢO VỆ (HỎI - ĐÁP NGẮN)

---

### ❓ Câu 1: Em hãy trình bày luồng từ khi Khách bấm mua hàng đến khi hệ thống gửi Email xác nhận?
👉 **Trả lời ngắn gọn:** Khách chọn sản phẩm & màu son ➔ Bấm "Xác nhận đặt hàng" ➔ React gửi POST `/api/orders` ➔ Backend `order.controller.js` nhận dữ liệu và lưu đơn ➔ Chốt đơn thành công, Backend tự động gọi `email.js` gửi thư HTML chứa hóa đơn qua Gmail SMTP Cổng 465 SSL tới hòm thư người mua chỉ trong 1-2 giây.

---

### ❓ Câu 2: Chức năng Thanh toán QR Code VietQR của em hoạt động như thế nào?
👉 **Trả lời ngắn gọn:** Tại `ThanhToanQR.js`, em nhúng VietQR API tự động tạo ảnh QR chứa STK shop `1017833075` (Vietcombank), Tên chủ TK và Số tiền đơn hàng. Em có viết thêm nút **"Giả lập: Khách đã quét QR"** gửi flag `isDemo: true` về Backend để ghi nhận trạng thái đã thanh toán nhằm giúp demo hội đồng mượt mà.

---

### ❓ Câu 3: Mã Voucher Serial độc nhất `[VC-KH01-0001]` quản lý ra sao?
👉 **Trả lời ngắn gọn:** Cột `ma_serial` được thiết kế UNIQUE trong bảng `voucher_nguoidung`. Khi khách đặt hàng thành công, hệ thống cập nhật `sudung = 1`, mã voucher này tự động biến mất khỏi danh sách của khách, đảm bảo mỗi mã chỉ dùng 1 lần duy nhất theo kịch bản kiểm thử `TC-EX-02`.

---

### ❓ Câu 4: Khi sản phẩm có giảm giá %, hệ thống tính hóa đơn như thế nào?
👉 **Trả lời ngắn gọn:** Trong `order.controller.js`, Backend đọc đơn giá đã trừ % khuyến mãi truyền từ giỏ hàng React (`const donGia = item.dongia`). Do đó chi tiết đơn hàng, hóa đơn điện tử và tổng tiền cuối cùng đều khớp 100% với giá đã giảm.

---

### ❓ Câu 5: Doanh thu trên Dashboard Admin được tính từ đâu?
👉 **Trả lời ngắn gọn:** Viết ở `stats.controller.js`, em dùng câu lệnh SQL `SELECT SUM(tongtien) FROM donhang WHERE trangthaidonhang = 'hoanthanh'`, chỉ ghi nhận doanh thu từ các đơn đã giao thành công thực tế.

---

### ❓ Câu 6: Phân quyền Admin và Khách hàng được bảo mật ra sao?
👉 **Trả lời ngắn gọn:** Em phân quyền qua vai trò (Admin `vaitro = 1`, Khách `vaitro = 2`). Khi đăng nhập thành công mã hóa vai trò vào JWT Token. Các API Admin ở Backend đều đi qua Middleware kiểm tra, nếu không phải Admin sẽ bị chặn lại với lỗi `403 Forbidden`.

---

### ❓ Câu 7: Yêu cầu Trả hàng của khách được xử lý như thế nào?
👉 **Trả lời ngắn gọn:** Khách gửi yêu cầu trả hàng ở đơn thành công. Admin nhận được hàng bấm "Đã nhận hàng trả", Backend `return.controller.js` sẽ cập nhật đơn sang trạng thái đã nhận và tự động cộng hoàn lại số lượng tồn kho cho sản phẩm.

---

### ❓ Câu 8: Nếu số lượng tồn kho tụt xuống 0 thì hệ thống xử lý thế nào?
👉 **Trả lời ngắn gọn:** Trước khi lưu đơn, Backend kiểm tra nếu tồn kho ít hơn số lượng khách mua thì sẽ ném lỗi hủy đơn và thông báo "Sản phẩm không đủ kho". Đồng thời câu SQL dùng hàm `GREATEST(..., 0)` nên số lượng tồn kho nhỏ nhất chỉ bằng 0, không bao giờ bị âm ạ.
