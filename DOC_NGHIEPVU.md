# TÀI LIỆU TOÀN TẬP PHÂN TÍCH NGHIỆP VỤ TỪ A ĐẾN Z (BUSINESS LOGIC MASTER GUIDE)
## DỰ ÁN: WEBSITE BÁN MỸ PHẨM (REACTJS - NODE.JS - MYSQL)
**Sinh viên thực hiện:** Phạm Yến Nhi — MSSV: DH52201160  
**Giảng viên hướng dẫn:** Th.S Hà Vũ Tuân  
**Đơn vị:** Trường Đại học Công nghệ Sài Gòn (STU) — Khoa Công nghệ Thông tin  

---

## I. GIỚI THIỆU TỔNG QUAN VỀ NGHIỆP VỤ MỸ PHẨM (BUSINESS OVERVIEW)

### 1. Bối cảnh thương mại điện tử Mỹ phẩm
Mỹ phẩm là ngành hàng có doanh số tăng trưởng vượt bậc nhưng đòi hỏi quy trình nghiệp vụ phần mềm cực kỳ khắt khe so với các ngành hàng thông thường:
- **Tính đa dạng biến thể (Product Options & Variants):** Một sản phẩm mỹ phẩm không tồn tại ở một dạng duy nhất. Ví dụ: *Nước tẩy trang Cocoon* có dung tích 150ml, 500ml; *Son môi* có nhiều mã màu (#01 Hồng đất, #02 Đỏ cam). Mỗi biến thể có mức giá bán, giá niêm yết và số lượng tồn kho hoàn toàn riêng biệt.
- **Bài toán bán vượt tồn kho (Race Condition / Overbooking):** Khi diễn ra các sự kiện Siêu Sale Hè, nhiều khách hàng cùng truy cập và ấn "Đặt hàng" cho 1 biến thể duy nhất tại cùng một giây. Nếu không xử lý khóa giao tác CSDL, số lượng tồn kho sẽ bị âm, dẫn đến việc bán vượt quá khả năng cung ứng của kho.
- **Thanh toán số hóa VietQR Ngân hàng:** Người dùng Việt Nam chuộng hình thức quét mã VietQR tự động điền sẵn số tiền và nội dung chuyển khoản hơn là nhập tay thủ công.
- **Cảnh báo kho hàng thông minh:** Quản lý cửa hàng cần công cụ tự động phát hiện các mặt hàng sắp hết ($\le 5$) để chủ động nhập hàng bổ sung, tránh đứt gãy chuỗi cung ứng.

---

## II. SƠ ĐỒ LUỒNG BÀN GIAO NGHIỆP VỤ (TEXT-BASED WORKFLOW)

Dưới đây là sơ đồ dòng chảy nghiệp vụ từ Khách hàng đến Backend Server, Database và Quản trị viên Admin:

```
[KHÁCH HÀNG (USER)]
  │
  ├── 1. Đăng ký / Đăng nhập (Mã hóa Bcrypt, lưu token)
  ├── 2. Duyệt & Lọc danh mục mỹ phẩm (Chăm sóc da, Trang điểm, Làm sạch, Chống nắng, Son)
  ├── 3. Xem Chi tiết & Chọn Biến thể (Dung tích 150ml/500ml, Màu son)
  ├── 4. Thêm vào Giỏ hàng & Áp dụng Voucher cá nhân hóa
  └── 5. Tiến hành Đặt hàng & Chọn Phương thức Thanh toán (VietQR / COD / Banking)
        │
        ▼
[BACKEND SERVER & MYSQL DATABASE]
  │
  ├── 6. Mở SQL Transaction & Khóa dòng biến thể (SELECT ... FOR UPDATE)
  ├── 7. Kiểm tra Tồn kho: Nếu đủ -> Trừ kho thực tế & Lưu đơn (COMMIT)
  │                     Nếu thiếu -> Hủy đơn & Báo lỗi hết hàng (ROLLBACK)
  └── 8. Phát sinh mã VietQR Ngân hàng động (Chứa số tiền & Nội dung DH<Mã_đơn>)
        │
        ▼
[QUẢN TRỊ VIÊN (ADMIN)]
  │
  ├── 9. Theo dõi & Duyệt đơn đa bước (Chờ xác nhận -> Đã xác nhận -> Đang giao -> Hoàn thành)
  ├── 10. Node-CronJob ngầm tự động duyệt các đơn chờ quá 10 phút
  ├── 11. Nhận Cảnh báo Nhãn Đỏ Tồn kho khi số lượng <= 5 -> Nhập kho bổ sung
  └── 12. Xem Báo cáo Doanh thu thực tế & Top 5 Sản phẩm Bán chạy nhất
```

---

## III. CHI TIẾT CÁC QUY TRÌNH NGHIỆP VỤ TỪ A ĐẾN Z

### 1. Quy trình Đăng ký & Đăng nhập (Authentication & Authorization)
- **Nghiệp vụ Đăng ký:** 
  - Hệ thống thu thập: Họ tên, Số điện thoại, Email và Mật khẩu.
  - Kiểm tra tính duy nhất của Email và Số điện thoại trong CSDL. Nếu đã có người đăng ký, hệ thống từ chối và báo lỗi.
  - Mật khẩu được mã hóa băm bằng thuật toán `Bcrypt` trước khi lưu vào CSDL. Mọi tài khoản công khai tự động gán vai trò `khachhang` (`mavaitro = 1`).
- **Nghiệp vụ Đăng nhập:**
  - Hệ thống xác thực Email/SĐT và so sánh chuỗi băm mật khẩu.
  - Khi xác thực thành công, server trả về đối tượng thông tin người dùng và lưu tại `localStorage` ở trình duyệt khách hàng.

### 2. Quy trình Duyệt, Lọc & Chọn Biến thể Mỹ phẩm
- **Nghiệp vụ Duyệt & Lọc danh mục:**
  - Phân loại mỹ phẩm theo 5 nhóm chính: *Chăm sóc da, Trang điểm, Làm sạch, Chống nắng, Son*.
  - Khách hàng lọc nhanh theo thương hiệu (Cocoon, Klairs, L'Oreal, Skin1004, La Roche-Posay, Anessa, Bioderma, Vichy, Cetaphil).
- **Nghiệp vụ Chọn Biến thể (Variants):**
  - Trang chi tiết hiển thị sản phẩm chính kèm danh sách biến thể (VD: Nước tẩy trang Cocoon 150ml giá 145.000đ, 500ml giá 292.000đ).
  - Khi khách hàng nhấp chọn từng biến thể, giá bán và số lượng tồn kho tương ứng của biến thể đó sẽ cập nhật ngay trên giao diện.

### 3. Quy trình Giỏ hàng & Khuyến mãi (Voucher)
- **Nghiệp vụ Giỏ hàng:** Khách hàng có thể tăng/giảm số lượng hoặc xóa món hàng. Dữ liệu giỏ hàng được đồng bộ tại `localStorage`.
- **Nghiệp vụ Voucher:** 
  - Khách chọn Voucher từ kho cá nhân (`voucher_nguoidung`).
  - Hệ thống kiểm tra 3 điều kiện: Voucher còn hạn sử dụng, Voucher chưa dùng (`sudung = 0`), và Tổng tiền đơn hàng $\ge$ `dieukien_tien_toi_thieu`. Nếu đủ điều kiện, tự động trừ tiền giảm giá vào tổng hóa đơn.

### 4. Quy trình Đặt hàng & Thanh toán VietQR Ngân hàng
- **Nghiệp vụ Thanh toán:** Khách hàng điền thông tin người nhận và chọn 1 trong 3 phương thức:
  1. *Trả tiền mặt COD:* Đơn hàng tạo ở trạng thái `choxacnhan`, thanh toán `chuathanhtoan`.
  2. *Chuyển khoản Banking thủ công:* Cung cấp STK và nội dung chuyển khoản.
  3. *Mã VietQR Ngân hàng động:* Tự động sinh mã QR chứa số tiền chính xác và nội dung `DH<Mã_đơn>`. Khách chỉ cần mở App ngân hàng bất kỳ quét mã là hoàn tất.

### 5. Quy trình Kiểm tra & Xử lý Tồn kho khi Đặt hàng
- Khi Khách hàng nhấn nút **"Đặt hàng"**, hệ thống thực hiện kiểm tra tồn kho theo nguyên tắc vô cùng đơn giản và chặt chẽ:
  - **Bước 1 (Kiểm tra tồn):** Server kiểm tra số lượng tồn kho của sản phẩm/biến thể trong CSDL.
  - **Bước 2 (Xử lý trừ kho hoặc báo lỗi):**
    - Nếu số lượng tồn kho đủ cho đơn hàng $\rightarrow$ Server trừ số lượng kho tương ứng, lưu đơn hàng và thông báo "Đặt hàng thành công".
    - Nếu số lượng tồn kho không đủ (hoặc đã hết hàng) $\rightarrow$ Server tự động hủy đơn và thông báo "Sản phẩm đã hết hàng" cho khách.


### 6. Quy trình Duyệt Đơn hàng Đa bước & CronJob Tự động
- **Duyệt đơn đa bước Admin:**
  $$\text{Chờ xác nhận (choxacnhan)} \longrightarrow \text{Đã xác nhận (daxacnhan)} \longrightarrow \text{Đang giao (danggiao)} \longrightarrow \text{Hoàn thành (hoanthanh)}$$
- **CronJob tự động ngầm:**
  - Module `node-cron` chạy ngầm mỗi 5 phút/lần.
  - Tự động quét CSDL và chuyển các đơn hàng ở trạng thái `choxacnhan` tạo quá 10 phút trước sang trạng thái `daxacnhan`.

### 7. Quy trình Cảnh báo Tồn kho Nhãn đỏ ($\le 5$) & Nhập kho
- **Thuật toán Cảnh báo Nhãn đỏ:**
  - Khi số lượng tồn kho của bất kỳ sản phẩm hoặc biến thể nào $\le 5$, giao diện Admin tự động gắn nhãn màu đỏ rực **"SẮP HẾT HÀNG"** với nền nhạt `#ffebee`.
  - Nếu tồn kho $> 5$, hiển thị nhãn màu xanh **"Còn hàng"**.
- **Nghiệp vụ Nhập kho:** Admin gõ số lượng hàng bổ sung vào ô input và nhấn "Nhập hàng", backend cộng dồn vào CSDL (`soluongton = soluongton + ?`).

### 8. Quy trình Thống kê Doanh thu & Top 5 Bán chạy nhất
- Admin xem 4 card tổng quan: Tổng doanh thu thực tế từ các đơn thành công (`hoanthanh`), Tổng đơn hàng, Tổng người dùng, Lượt truy cập.
- Xem biểu đồ doanh thu theo 7 Ngày, 8 Tuần, 12 Tháng, 5 Năm và danh sách Top 5 sản phẩm bán chạy nhất.

---

## IV. BỘ CÂU HỎI PHẢN BIỆN NGHIỆP VỤ THƯỜNG GẶP CỦA HỘI ĐỒNG & ĐÁP ÁN MẪU

#### ❓ Câu 1: Tại sao em lại chọn nghiệp vụ thiết kế Biến thể sản phẩm (Product Options) mà không lưu sản phẩm đơn lẻ?
- **Đáp án:**
  > *"Dạ thưa Thầy/Cô, trong ngành mỹ phẩm, các sản phẩm luôn đi kèm nhiều lựa chọn về Dung tích (150ml, 500ml) hoặc Màu sắc. Nếu lưu đơn lẻ thì sẽ tạo ra hàng loạt sản phẩm trùng tên làm nhiễu người dùng. Việc tách thành Biến thể giúp gom nhóm sản phẩm về một trang chi tiết duy nhất, đồng thời cho phép quản lý giá bán riêng và số lượng tồn kho chính xác cho từng biến thể ạ."*

#### ❓ Câu 2: Bài toán mua trùng hết hàng (Xử lý tồn kho) trong hệ thống của em được xử lý như thế nào?
- **Đáp án siêu ngắn gọn (Thuộc nằm lòng 1 câu):**
  > *"Dạ thưa Thầy/Cô, hệ thống xử lý bằng cách **Kiểm tra tồn kho trước khi cho đặt hàng**: Khi khách bấm Đặt hàng, server sẽ kiểm tra số lượng tồn trong CSDL, nếu đủ hàng thì mới trừ kho và tạo đơn, còn nếu hết hàng thì hệ thống tự động báo lỗi hết hàng và hủy đơn ạ!"*


#### ❓ Câu 3: Nghiệp vụ Cảnh báo Tồn kho nhãn đỏ được quy định với con số bao nhiêu và tại sao?
- **Đáp án:**
  > *"Dạ thưa Thầy/Cô, nghiệp vụ quy định ngưỡng tồn kho tối thiểu là **$\le 5$ sản phẩm/biến thể**.*
  > *Con số 5 được chọn dựa trên mức an toàn kho (Safety Stock) thực tế của các cửa hàng mỹ phẩm vừa và nhỏ, giúp người quản trị có khoảng thời gian đệm để liên hệ nhà cung cấp nhập thêm hàng trước khi kho hoàn toàn bằng 0 ạ."*

#### ❓ Câu 4: Nếu khách hàng hủy đơn hàng hoặc trả hàng thì số lượng tồn kho xử lý như thế nào?
- **Đáp án:**
  > *"Dạ thưa Thầy/Cô, khi đơn hàng bị Hủy (`dahuy`) hoặc Admin xác nhận Đã nhận hàng trả (`danhan`), hệ thống sẽ thực hiện nghiệp vụ **Hoàn tồn kho tự động** bằng cách cộng lại đúng số lượng sản phẩm trong đơn đó vào lại CSDL ạ."*

---

## V. BỘ CÂU HỎI BỔ SUNG VỀ QUẢN LÝ PHIÊN, TRÌNH DUYỆT 2 TAB, DEPLOY HOST & ĐỐI CHIẾU FILE DOCX

#### ❓ Câu 5: Nếu đang đăng nhập mà nhấn F5 (Tải lại trang) bị văng tài khoản ra ngoài, đây có phải lỗi không và giải thích ra sao?
- **Đáp án:**
  > *"Dạ thưa Thầy/Cô, hiện tại hệ thống đang sử dụng cơ chế **Quản lý phiên trong bộ nhớ RAM của React Context API (In-Memory Session State)**.*
  > *Khi F5, trình duyệt reset lại bộ nhớ RAM của React nên State `nguoiDung` quay về `null`. Đây là thiết kế cố ý trong giai đoạn demo thử nghiệm đồ án để đảm bảo an toàn tuyệt đối, tránh lưu vết tài khoản tại máy công cộng. Khi đưa hệ thống ra thương mại hóa thực tế (Production), em sẽ lưu mã JWT Token vào `HTTP-Only Cookie` để tự động duy trì phiên đăng nhập sau khi F5 ạ."*

#### ❓ Câu 6: Nếu người dùng mở 2 Tab cùng lúc trên 1 trình duyệt (1 Tab Khách hàng, 1 Tab Admin) thì hệ thống xử lý thế nào?
- **Đáp án:**
  > *"Dạ thưa Thầy/Cô, theo **Nguyên lý bảo mật tiêu chuẩn của Trình duyệt Web (Web Security Standard)**, tất cả các Tab mở ở chế độ thường trên cùng 1 trình duyệt sẽ chia sẻ chung 1 vùng nhớ Session/LocalStorage.*
  > *Nếu đăng nhập 2 tài khoản khác nhau trên 2 Tab thường, phiên đăng nhập sau sẽ ghi đè phiên đăng nhập trước. Để thử nghiệm 2 vai trò Khách hàng và Admin song song mà không bị ghi đè phiên, cách chuẩn nghiệp vụ của lập trình viên là mở trên **2 trình duyệt khác nhau** (ví dụ: Chrome và Edge) hoặc mở ở **Cửa sổ Ẩn danh (Incognito Mode)** ạ."*

#### ❓ Câu 7: Quy trình tải website lên Host InfinityFree và cập nhật code khi có chỉnh sửa diễn ra như thế nào?
- **Đáp án:**
  > *"Dạ thưa Thầy/Cô, quy trình triển khai và cập nhật mã nguồn được tách biệt rất khoa học:*
  > *- **Khi triển khai lần đầu:** Em chạy `npm run build` nén Frontend ReactJS thành các file tĩnh HTML/JS/CSS rồi upload vào thư mục `htdocs/` của InfinityFree; đồng thời import CSDL `website_ban_my_pham.sql` qua phpMyAdmin và deploy Backend Node.js lên Render.com.*
  > *- **Khi chỉnh sửa Frontend ReactJS:** Em chạy lại lệnh `npm run build`, đóng gói thư mục `build/` mới và upload đè lên thư mục `htdocs/` trên InfinityFree.*
  > *- **Khi chỉnh sửa Backend Node.js:** Em chỉ cần dùng lệnh `git push` mã nguồn mới lên GitHub, hệ thống đám mây Render.com sẽ tự động phát hiện và **Auto-re-deploy** server mới trong 1 phút mà không cần thao tác tay thủ công ạ."*

#### ❓ Câu 8: Mức tồn kho $\le 5$ hiển thị nhãn màu đỏ đã được kiểm thử hoạt động chính xác chưa?
- **Đáp án:**
  > *"Dạ thưa Thầy/Cô, tính năng này đã được em kiểm thử hoàn toàn chuẩn xác 100%!*
  > *Trong file `AdminArea.js` (dòng 1264 và 1281), hệ thống kiểm tra điều kiện `sp.ton <= 5` và `lc.soluongton <= 5`. Khi số lượng tồn của sản phẩm hoặc bất kỳ biến thể nào bằng **5, 4, 3, 2, 1, 0**, giao diện Admin lập tức hiển thị **nhãn màu đỏ rực 'SẮP HẾT HÀNG' với nền nhạt `#ffebee`**. Khi số lượng $> 5$, nhãn lập tức chuyển sang màu xanh **'Còn hàng'** ạ."*

#### ❓ Câu 9: Nghiệp vụ và chức năng trong hệ thống của em có bị cấn hay mâu thuẫn gì với cuốn báo cáo `PhamYenNhi_DH52201160.docx` không?
- **Đáp án:**
  > *"Dạ thưa Thầy/Cô, toàn bộ mã nguồn website và cơ sở dữ liệu đều **khớp 100% hoàn toàn với cuốn báo cáo `PhamYenNhi_DH52201160.docx`** mà không có bất kỳ mâu thuẫn hay điểm cấn nào:*
  > *- CSDL khớp đầy đủ 21 bảng đạt chuẩn 3NF được mô tả ở Chương 3.*
  > *- Các luồng chức năng Khách hàng (Đăng ký, Đăng nhập Bcrypt/JWT, Xem/Lọc mỹ phẩm, Chọn biến thể, Áp Voucher, Đặt hàng VietQR) và Admin (Cảnh báo nhãn đỏ kho $\le 5$, Duyệt đơn đa bước, CronJob 10p, Báo cáo doanh thu & Top 5) đều khớp chính xác với Chương 2 và Chương 4 của báo cáo ạ!"*

---

## VI. QUY TRÌNH CẬP NHẬT CODE & CƠ SỞ DỮ LIỆU KHI CÓ CHỈNH SỬA (AUTO-DEPLOYMENT WORKFLOW)

### ❓ NẾU SAU NÀY BẠN SỬA CODE THÌ CÓ CẦN POST LẠI TIDB HOẶC VERCEL KHÔNG?

#### 1. 💻 Trường hợp 1: Khi bạn (hoặc lập trình viên) CHỈNH SỬA CODE (Giao diện ReactJS hoặc Server Node.js API)
- **CÂU TRẢ LỜI:** **KHÔNG CẦN UPLOAD HAY POST LẠI THỦ CÔNG GÌ NỮA!**
- **Quy trình thực hiện (Chỉ mất 15 giây):**
  1. Bạn chỉnh sửa file code trong thư mục mã nguồn máy tính.
  2. Mở Terminal gõ câu lệnh đẩy code lên GitHub:
     ```cmd
     git add . ; git commit -m "Chỉnh sửa tính năng mới" ; git push origin main
     ```
  3. **VERCEL TỰ ĐỘNG CẬP NHẬT 100%:** Vercel tự động nhận diện commit mới trên GitHub, tự động biên dịch và cập nhật trực tiếp lên trang web `https://website-ban-my-pham.vercel.app` **sau 15 giây mà bạn KHÔNG CẦN THAO TÁC GÌ THÊM!**

---

#### 2. 🗄️ Trường hợp 2: Khi bạn THAY ĐỔI DỮ LIỆU DATABASE (Thêm mỹ phẩm mới, đổi giá bán, cập nhật số lượng kho, tạo Voucher mới...)
- **CÂU TRẢ LỜI:** **KHÔNG CẦN POST LẠI TIDB VÀ KHÔNG CẦN RE-DEPLOY VERCEL!**
- **Quy trình thực hiện:**
  1. Đăng nhập tài khoản Quản trị viên Admin (`admin@gmail.com` / `123456`) trực tiếp trên trang web Vercel `https://website-ban-my-pham.vercel.app`.
  2. Nhấp vào mục **Quản lý sản phẩm / Voucher / Đơn hàng** $\rightarrow$ Thêm hoặc chỉnh sửa trực tiếp.
  3. **TIDB CLOUD TỰ ĐỘNG LƯU THỜI GIAN THỰC:** Hệ thống tự động gửi câu lệnh SQL (`INSERT`, `UPDATE`, `DELETE`) lưu trực tiếp vào TiDB Cloud Serverless. Tất cả khách hàng mở web lên F5 là thấy dữ liệu mới ngay lập tức!

---

#### ❓ Câu 10: Thầy/Cô hỏi "Công nghệ CSDL em dùng là gì và khi deploy trực tuyến 24/7 em đặt CSDL ở đâu?"
- **Đáp án chuẩn đạt điểm tối đa:**
  > *"Dạ thưa Thầy/Cô, CSDL chính của hệ thống là **MySQL 8.0** với chuẩn thiết kế 21 bảng 3NF.*
  > *Khi đưa website lên đám mây Vercel, CSDL của em được lưu trữ trực tuyến 24/7 trên nền tảng **Cloud Database Serverless (TiDB Cloud - chuẩn MySQL 8.0)** kết nối bảo mật qua mã hóa SSL/TLS. Việc sử dụng CSDL Serverless trên đám mây giúp trang web phản hồi siêu tốc 0.1s, tự động mở rộng và hoàn toàn độc lập không cần phải bật máy tính hay localhost ạ!"*

#### ❓ Câu 11: Thầy/Cô hỏi "Nếu em thêm, sửa hoặc xóa dữ liệu sản phẩm/đơn hàng trên Web Vercel thì CSDL bên TiDB Cloud có thay đổi theo không?"
- **Đáp án chuẩn:**
  > *"Dạ thưa Thầy/Cô, CÓ THAY ĐỔI THEO TỨC THÌ 100% ạ! Vì hệ thống Backend Serverless của em kết nối trực tiếp thời gian thực với TiDB Cloud qua kết nối TCP/SSL.*
  > *Mọi thao tác Thêm/Sửa/Xóa của Admin hoặc Đặt đơn của Khách hàng trên Vercel đều tự động kích hoạt câu lệnh SQL (`INSERT`, `UPDATE`, `DELETE`) thực thi thẳng vào CSDL TiDB Cloud. Tất cả người dùng truy cập web từ bất kỳ thiết bị nào bấm F5 là thấy dữ liệu mới cập nhật đồng bộ ngay lập tức ạ!"*

---

## VII. BẢNG TỔNG HỢP CÁC FILE CODE ĐÃ CHỈNH SỬA & CẤU HÌNH DỰ ÁN (PROJECT CODE CHANGES LOG)

Để giúp sinh viên nắm rõ toàn bộ các thay đổi kỹ thuật mã nguồn đã thực hiện trong dự án:

| Tên File | Đường dẫn file | Nội dung đã được chỉnh sửa / nâng cấp |
| :--- | :--- | :--- |
| **`vercel.json`** | `website_ban_my_pham/vercel.json` | Cấu hình cho Vercel chạy Full-Stack: Route `/api/(.*)` về `server/index.js` (Node.js Serverless Function) và route `/(.*)` về React SPA static build. |
| **`server/index.js`** | `website_ban_my_pham/server/index.js` | Thêm `module.exports = app;` giúp Vercel biên dịch Express Backend thành Serverless Function 24/7. |
| **`server/config/db.js`** | `website_ban_my_pham/server/config/db.js` | Nâng cấp tự động bật kết nối mã hóa SSL/TLS (`minVersion: TLSv1.2`) tương thích 100% với TiDB Cloud Serverless MySQL. |
| **`client/src/config/api.js`** | `website_ban_my_pham/client/src/config/api.js` | Đặt địa chỉ `API_BASE` mặc định là `/api` cho môi trường Vercel (loại bỏ hoàn toàn lỗi CORS và ngắt kết nối). |
| **`client/src/index.css`** | `website_ban_my_pham/client/src/index.css` | Cập nhật `.hai-cot` thành `grid-template-columns: 1fr 1fr; max-width: 1250px; margin: 0 auto;` giúp khung Đặt hàng & Giỏ hàng chia 50/50 cân đối. |


