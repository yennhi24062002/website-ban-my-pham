USE website_ban_my_pham;

-- Thêm danh mục Son
INSERT IGNORE INTO danhmuc (tendanhmuc, mota) VALUES ('Son', 'Son môi các loại – son lì, son bóng, son kem');

-- Thêm thương hiệu son
INSERT IGNORE INTO thuonghieu (tenthuonghieu, mota) VALUES
('MAC', 'Thương hiệu son môi cao cấp đến từ Canada'),
('3CE', 'Thương hiệu son môi thời trang Hàn Quốc nổi tiếng');

SET @madanhmuc_son = (SELECT madanhmuc FROM danhmuc WHERE tendanhmuc = 'Son');
SET @mathuonghieu_mac = (SELECT mathuonghieu FROM thuonghieu WHERE tenthuonghieu = 'MAC');
SET @mathuonghieu_3ce = (SELECT mathuonghieu FROM thuonghieu WHERE tenthuonghieu = '3CE');

-- Thêm sản phẩm Son MAC Ruby Woo
INSERT INTO sanpham (madanhmuc, mathuonghieu, tensanpham, giaban, giagoc, hinhanh, mota, thongso, thanhphan, hdsd, tileban, khuyenmai, trangthai)
VALUES (
  @madanhmuc_son,
  @mathuonghieu_mac,
  'Son Lì MAC Ruby Woo',
  580000, 750000,
  '/hinhanh/son.png',
  'Son lì MAC Ruby Woo là dòng son huyền thoại được mệnh danh là "son đỏ chuẩn mực" toàn cầu. Màu đỏ thuần kinh điển cùng công thức lì mịn không trôi suốt 8 tiếng, hoàn hảo cho mọi tone da từ trắng đến ngăm.',
  'Thương hiệu: MAC Cosmetics\nXuất xứ: Canada\nDung tích: 3g\nLoại: Son lì\nBảo quản: Tránh nhiệt độ cao và ánh nắng trực tiếp',
  'Thành phần chính:\n• Silica: Tạo kết cấu lì mịn lâu trôi\n• Vitamin E: Dưỡng môi mềm mại suốt ngày\n• Carnauba Wax: Giúp son bám chắc\n\nThành phần đầy đủ:\nOctyldodecanol, Trioctyldodecyl Citrate, Ricinus Communis (Castor) Seed Oil, Silica, Caprylic/Capric Triglyceride, Copernica Cerifera (Carnauba) Wax, Beeswax, Candelilla Wax, Vitamin E, [+/- Pigments]',
  'Bước 1: Làm mềm môi trước khi thoa son.\nBước 2: Kẻ viền môi bằng bút chì môi cùng màu để giữ nét.\nBước 3: Thoa son từ tâm môi ra ngoài, lớp đầu nhẹ rồi tiếp tục một lớp nữa để màu đậm hơn.\nLưu ý: Thấm nhẹ bằng giấy thấm sau khi thoa xong giúp son bền màu suốt ngày.',
  72, 'Mua 1 tặng 1 túi vải MAC chính hãng', 'dangban'
);

-- Lấy masanpham vừa tạo
SET @maSon1 = LAST_INSERT_ID();

-- Thêm sản phẩm Son Kem 3CE Soft Lip Color
INSERT INTO sanpham (madanhmuc, mathuonghieu, tensanpham, giaban, giagoc, hinhanh, mota, thongso, thanhphan, hdsd, tileban, khuyenmai, trangthai)
VALUES (
  @madanhmuc_son,
  @mathuonghieu_3ce,
  'Son Kem 3CE Soft Lip Color',
  320000, 420000,
  '/hinhanh/son.png',
  'Son kem lì 3CE Soft Lip Color mang đến bộ sưu tập màu sắc phong phú từ nude, hồng đào, đỏ berry đến nâu đất. Kết cấu kem mỏng nhẹ, thoa lên môi tựa như lớp màu mướt mịn, không gây khô căng suốt cả ngày.',
  'Thương hiệu: 3CE (3 Concept Eyes)\nXuất xứ: Hàn Quốc\nDung tích: 4g\nLoại: Son kem lì\nBảo quản: Nơi khô ráo, thoáng mát',
  'Thành phần chính:\n• Hyaluronic Acid: Dưỡng ẩm môi suốt ngày không khô rát\n• Castor Oil: Cấp ẩm và làm mềm môi tự nhiên\n• Beeswax: Tạo độ bám màu và kết cấu mượt mà\n\nThành phần đầy đủ:\nWater, Dimethicone, Cyclopentasiloxane, Glycerin, Hyaluronic Acid, Castor Oil, Beeswax, Silica, Titanium Dioxide, [+/- Pigments]',
  'Bước 1: Lăn đều đầu cọ của son kem lên môi từ trung tâm ra ngoài.\nBước 2: Nhấn nhẹ môi lại một lần để màu bám đều hơn.\nBước 3: Thoa thêm lớp thứ 2 nếu muốn màu đậm hơn.\nLưu ý: Son kem 3CE có khả năng chuyển màu nhẹ tùy theo tone da nên bạn hãy thử trên môi trước khi chọn.',
  88, 'Mua 2 cây son 3CE giảm thêm 50K', 'dangban'
);

SET @maSon2 = LAST_INSERT_ID();

-- Thêm luachon (biến thể màu sắc) cho Son MAC
INSERT INTO luachon_sanpham (masanpham, mausac, loai, dungtich, giaban, soluongton, hinhanh, trangthai) VALUES
(@maSon1, 'Đỏ Ruby', 'Son lì', '3g', 580000, 25, '/hinhanh/son.png', 'dangban'),
(@maSon1, 'Đỏ Tươi', 'Son lì', '3g', 580000, 20, '/hinhanh/son.png', 'dangban');

-- Thêm luachon (biến thể màu sắc) cho Son 3CE
INSERT INTO luachon_sanpham (masanpham, mausac, loai, dungtich, giaban, soluongton, hinhanh, trangthai) VALUES
(@maSon2, 'Hồng Đào', 'Son kem lì', '4g', 320000, 30, '/hinhanh/son.png', 'dangban'),
(@maSon2, 'Đỏ Berry', 'Son kem lì', '4g', 320000, 25, '/hinhanh/son.png', 'dangban'),
(@maSon2, 'Nâu Đất', 'Son kem lì', '4g', 320000, 20, '/hinhanh/son.png', 'dangban');

-- Thêm tonkho cho 2 sản phẩm mới
INSERT INTO tonkho (masanpham, soluongton, soluongtoithieu, ghichu) VALUES
(@maSon1, 45, 5, 'Đủ hàng'),
(@maSon2, 75, 5, 'Đủ hàng');

-- Thêm đơn hàng giả lập cho các ngày trong tuần hiện tại
INSERT INTO donhang (madonhang, manguoidung, tennguoinhan, sodienthoainhan, diachigiaohang, tongtien, trangthaidonhang, trangthaithanhtoan, ngaydat)
VALUES
(20, 1, 'Nguyễn Minh Anh', '0901234567', 'Quận 1, TP HCM', 200000, 'hoanthanh', 'dathanhtoan', DATE_SUB(NOW(), INTERVAL 0 DAY)),
(21, 1, 'Nguyễn Minh Anh', '0901234567', 'Quận 1, TP HCM', 320000, 'hoanthanh', 'dathanhtoan', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(22, 1, 'Khách hàng 10', '0901234580', 'Quận 3, TP HCM', 580000, 'hoanthanh', 'dathanhtoan', DATE_SUB(NOW(), INTERVAL 2 DAY)),
(23, 1, 'Khách hàng 11', '0901234581', 'Quận 7, TP HCM', 900000, 'hoanthanh', 'dathanhtoan', DATE_SUB(NOW(), INTERVAL 3 DAY));

SELECT 'Thêm danh mục Son và sản phẩm thành công!' AS result;
