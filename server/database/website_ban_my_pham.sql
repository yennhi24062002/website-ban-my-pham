DROP DATABASE IF EXISTS website_ban_my_pham;

CREATE DATABASE website_ban_my_pham
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE website_ban_my_pham;

SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE vaitro (
    mavaitro INT AUTO_INCREMENT PRIMARY KEY,
    tenvaitro VARCHAR(50) NOT NULL UNIQUE,
    mota TEXT,
    trangthai VARCHAR(30) DEFAULT 'hoatdong'
) ENGINE=InnoDB;

CREATE TABLE nguoidung (
    manguoidung INT AUTO_INCREMENT PRIMARY KEY,
    mavaitro INT NOT NULL,
    hoten VARCHAR(150) NOT NULL,
    sodienthoai VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    matkhau VARCHAR(255) NOT NULL,
    trangthai VARCHAR(30) DEFAULT 'hoatdong',
    ngaytao DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_nguoidung_vaitro FOREIGN KEY (mavaitro) REFERENCES vaitro(mavaitro)
) ENGINE=InnoDB;

CREATE TABLE diachi (
    madiachi INT AUTO_INCREMENT PRIMARY KEY,
    manguoidung INT NOT NULL,
    tennguoinhan VARCHAR(150) NOT NULL,
    sodienthoainhan VARCHAR(20) NOT NULL,
    diachichitiet VARCHAR(255) NOT NULL,
    macdinh TINYINT(1) DEFAULT 0,
    CONSTRAINT fk_diachi_nguoidung FOREIGN KEY (manguoidung) REFERENCES nguoidung(manguoidung)
) ENGINE=InnoDB;

CREATE TABLE danhmuc (
    madanhmuc INT AUTO_INCREMENT PRIMARY KEY,
    tendanhmuc VARCHAR(150) NOT NULL UNIQUE,
    mota TEXT,
    trangthai VARCHAR(30) DEFAULT 'hoatdong'
) ENGINE=InnoDB;

CREATE TABLE thuonghieu (
    mathuonghieu INT AUTO_INCREMENT PRIMARY KEY,
    tenthuonghieu VARCHAR(150) NOT NULL UNIQUE,
    mota TEXT,
    trangthai VARCHAR(30) DEFAULT 'hoatdong'
) ENGINE=InnoDB;

CREATE TABLE sanpham (
    masanpham INT AUTO_INCREMENT PRIMARY KEY,
    madanhmuc INT NOT NULL,
    mathuonghieu INT,
    tensanpham VARCHAR(200) NOT NULL,
    giaban DECIMAL(12,2) NOT NULL,
    giagoc DECIMAL(12,2),
    hinhanh VARCHAR(255),
    mota TEXT,
    thongso TEXT,
    thanhphan TEXT,
    hdsd TEXT,
    tileban INT DEFAULT 30,
    khuyenmai VARCHAR(255),
    trangthai VARCHAR(30) DEFAULT 'dangban',
    ngaytao DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_sanpham_danhmuc FOREIGN KEY (madanhmuc) REFERENCES danhmuc(madanhmuc),
    CONSTRAINT fk_sanpham_thuonghieu FOREIGN KEY (mathuonghieu) REFERENCES thuonghieu(mathuonghieu)
) ENGINE=InnoDB;

CREATE TABLE luachon_sanpham (
    maluachon INT AUTO_INCREMENT PRIMARY KEY,
    masanpham INT NOT NULL,
    mausac VARCHAR(100),
    loai VARCHAR(100),
    dungtich VARCHAR(50),
    giaban DECIMAL(12,2) NOT NULL,
    soluongton INT NOT NULL DEFAULT 0,
    hinhanh VARCHAR(255),
    trangthai VARCHAR(30) DEFAULT 'dangban',
    CONSTRAINT fk_luachon_sanpham FOREIGN KEY (masanpham) REFERENCES sanpham(masanpham)
) ENGINE=InnoDB;

CREATE TABLE tonkho (
    matonkho INT AUTO_INCREMENT PRIMARY KEY,
    masanpham INT NOT NULL UNIQUE,
    soluongton INT NOT NULL DEFAULT 0,
    soluongtoithieu INT NOT NULL DEFAULT 5,
    ghichu VARCHAR(255),
    CONSTRAINT fk_tonkho_sanpham FOREIGN KEY (masanpham) REFERENCES sanpham(masanpham)
) ENGINE=InnoDB;

CREATE TABLE giohang (
    magiohang INT AUTO_INCREMENT PRIMARY KEY,
    manguoidung INT NOT NULL UNIQUE,
    ngaytao DATETIME DEFAULT CURRENT_TIMESTAMP,
    ngaycapnhat DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_giohang_nguoidung FOREIGN KEY (manguoidung) REFERENCES nguoidung(manguoidung)
) ENGINE=InnoDB;

CREATE TABLE chitietgiohang (
    machitietgio INT AUTO_INCREMENT PRIMARY KEY,
    magiohang INT NOT NULL,
    masanpham INT NOT NULL,
    maluachon INT DEFAULT NULL,
    soluong INT NOT NULL DEFAULT 1,
    dongia DECIMAL(12,2) NOT NULL,
    UNIQUE (magiohang, masanpham, maluachon),
    CONSTRAINT fk_chitietgiohang_giohang FOREIGN KEY (magiohang) REFERENCES giohang(magiohang),
    CONSTRAINT fk_chitietgiohang_sanpham FOREIGN KEY (masanpham) REFERENCES sanpham(masanpham),
    CONSTRAINT fk_chitietgiohang_luachon FOREIGN KEY (maluachon) REFERENCES luachon_sanpham(maluachon)
) ENGINE=InnoDB;

CREATE TABLE donhang (
    madonhang INT AUTO_INCREMENT PRIMARY KEY,
    manguoidung INT NOT NULL,
    tennguoinhan VARCHAR(150) NOT NULL,
    sodienthoainhan VARCHAR(20) NOT NULL,
    diachigiaohang VARCHAR(255) NOT NULL,
    tongtien DECIMAL(12,2) NOT NULL DEFAULT 0,
    trangthaidonhang VARCHAR(30) DEFAULT 'choxacnhan',
    trangthaithanhtoan VARCHAR(30) DEFAULT 'chuathanhtoan',
    ghichu TEXT NULL,
    lydo_huy VARCHAR(500) DEFAULT NULL,
    ngaydat DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_donhang_nguoidung FOREIGN KEY (manguoidung) REFERENCES nguoidung(manguoidung)
) ENGINE=InnoDB;

CREATE TABLE chitietdonhang (
    machitietdon INT AUTO_INCREMENT PRIMARY KEY,
    madonhang INT NOT NULL,
    masanpham INT NOT NULL,
    maluachon INT DEFAULT NULL,
    soluong INT NOT NULL,
    dongia DECIMAL(12,2) NOT NULL,
    thanhtien DECIMAL(12,2) NOT NULL,
    CONSTRAINT fk_chitietdonhang_donhang FOREIGN KEY (madonhang) REFERENCES donhang(madonhang),
    CONSTRAINT fk_chitietdonhang_sanpham FOREIGN KEY (masanpham) REFERENCES sanpham(masanpham),
    CONSTRAINT fk_chitietdonhang_luachon FOREIGN KEY (maluachon) REFERENCES luachon_sanpham(maluachon)
) ENGINE=InnoDB;

CREATE TABLE thanhtoan (
    mathanhtoan INT AUTO_INCREMENT PRIMARY KEY,
    madonhang INT NOT NULL UNIQUE,
    phuongthuc VARCHAR(50) NOT NULL,
    magiaodich VARCHAR(100),
    sotien DECIMAL(12,2) NOT NULL,
    trangthaithanhtoan VARCHAR(30) DEFAULT 'chuathanhtoan',
    ngaythanhtoan DATETIME,
    CONSTRAINT fk_thanhtoan_donhang FOREIGN KEY (madonhang) REFERENCES donhang(madonhang)
) ENGINE=InnoDB;

CREATE TABLE lichsutrangthaidon (
    malichsu INT AUTO_INCREMENT PRIMARY KEY,
    madonhang INT NOT NULL,
    trangthai VARCHAR(30) NOT NULL,
    ghichu VARCHAR(255),
    thoigian DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_lichsutrangthaidon_donhang FOREIGN KEY (madonhang) REFERENCES donhang(madonhang)
) ENGINE=InnoDB;

CREATE TABLE voucher (
    mavoucher INT AUTO_INCREMENT PRIMARY KEY,
    macode VARCHAR(50) NOT NULL UNIQUE,
    ten VARCHAR(150) NOT NULL,
    giatri DECIMAL(12,2) NOT NULL,
    loai ENUM('sotien', 'phantram') DEFAULT 'sotien',
    dieukien_tien_toi_thieu DECIMAL(12,2) DEFAULT 0,
    ngaybatdau DATETIME DEFAULT CURRENT_TIMESTAMP,
    ngayhethan DATETIME NOT NULL,
    trangthai VARCHAR(30) DEFAULT 'hoatdong'
) ENGINE=InnoDB;

CREATE TABLE voucher_nguoidung (
    mavoucher_nd INT AUTO_INCREMENT PRIMARY KEY,
    mavoucher INT NOT NULL,
    manguoidung INT NOT NULL,
    ngaytang DATETIME DEFAULT CURRENT_TIMESTAMP,
    sudung TINYINT(1) DEFAULT 0,
    madonhang_sudung INT DEFAULT NULL,
    CONSTRAINT fk_vnd_voucher FOREIGN KEY (mavoucher) REFERENCES voucher(mavoucher),
    CONSTRAINT fk_vnd_nguoidung FOREIGN KEY (manguoidung) REFERENCES nguoidung(manguoidung),
    UNIQUE KEY uniq_voucher_nd (mavoucher, manguoidung)
) ENGINE=InnoDB;

CREATE TABLE yeucautranhang (
    mayeucau INT AUTO_INCREMENT PRIMARY KEY,
    madonhang INT NOT NULL,
    manguoidung INT NOT NULL,
    lydo TEXT NOT NULL,
    trangthai ENUM('choxuly', 'duyet_chohanghoi', 'danhan', 'tuchoi') DEFAULT 'choxuly',
    ghichu_admin VARCHAR(500) DEFAULT NULL,
    ngayyeucau DATETIME DEFAULT CURRENT_TIMESTAMP,
    ngayxuly DATETIME DEFAULT NULL,
    CONSTRAINT fk_ytsh_donhang FOREIGN KEY (madonhang) REFERENCES donhang(madonhang),
    CONSTRAINT fk_ytsh_nguoidung FOREIGN KEY (manguoidung) REFERENCES nguoidung(manguoidung)
) ENGINE=InnoDB;

CREATE TABLE danhgia (
    madanhgia INT AUTO_INCREMENT PRIMARY KEY,
    masanpham INT NOT NULL,
    manguoidung INT NOT NULL,
    sosao INT NOT NULL,
    noidung TEXT,
    ngaytao DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_danhgia_sanpham FOREIGN KEY (masanpham) REFERENCES sanpham(masanpham) ON DELETE CASCADE,
    CONSTRAINT fk_danhgia_nguoidung FOREIGN KEY (manguoidung) REFERENCES nguoidung(manguoidung) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE hoidap (
    mahoidap INT AUTO_INCREMENT PRIMARY KEY,
    masanpham INT NOT NULL,
    manguoidung INT NOT NULL,
    cauhoi TEXT NOT NULL,
    cautraloi TEXT DEFAULT NULL,
    ngaytao DATETIME DEFAULT CURRENT_TIMESTAMP,
    ngaytraloi DATETIME DEFAULT NULL,
    CONSTRAINT fk_hoidap_sanpham FOREIGN KEY (masanpham) REFERENCES sanpham(masanpham) ON DELETE CASCADE,
    CONSTRAINT fk_hoidap_nguoidung FOREIGN KEY (manguoidung) REFERENCES nguoidung(manguoidung) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ==================== CHÈN DỮ LIỆU MẪU ====================

INSERT INTO vaitro (tenvaitro, mota) VALUES
('khachhang', 'Khách hàng mua sản phẩm trên website'),
('admin', 'Quản trị viên quản lý website');

INSERT INTO nguoidung (mavaitro, hoten, sodienthoai, email, matkhau, trangthai) VALUES
(1, 'Nguyễn Minh Anh', '0901234567', 'khachhang@gmail.com', '123456', 'hoatdong'),
(2, 'Quản trị viên', '0900000000', 'admin@gmail.com', '123456', 'hoatdong');

INSERT INTO diachi (manguoidung, tennguoinhan, sodienthoainhan, diachichitiet, macdinh) VALUES
(1, 'Nguyễn Minh Anh', '0901234567', 'Quận 1, Thành phố Hồ Chí Minh', 1),
(1, 'Nguyễn Minh Anh', '0901234567', 'Quận Bình Thạnh, Thành phố Hồ Chí Minh', 0);

INSERT INTO danhmuc (tendanhmuc, mota) VALUES
('Chăm sóc da', 'Sản phẩm chăm sóc và dưỡng da'),
('Trang điểm', 'Sản phẩm trang điểm'),
('Làm sạch', 'Sản phẩm làm sạch da'),
('Chống nắng', 'Sản phẩm bảo vệ da khỏi ánh nắng');

INSERT INTO thuonghieu (tenthuonghieu, mota) VALUES
('Hồng Xinh', 'Thương hiệu mỹ phẩm Hồng Xinh'),
('Beauty Care', 'Thương hiệu chăm sóc da Beauty Care'),
('Klairs', 'Thương hiệu mỹ phẩm thuần chay lành tính Hàn Quốc'),
('L\'Oreal', 'Thương hiệu mỹ phẩm Pháp nổi tiếng toàn cầu'),
('Skin1004', 'Thương hiệu mỹ phẩm chiết xuất rau má từ Hàn Quốc'),
('La Roche-Posay', 'Thương hiệu dược mỹ phẩm Pháp khuyên dùng cho da nhạy cảm'),
('Anessa', 'Thương hiệu chống nắng dưỡng da hàng đầu Nhật Bản'),
('Bioderma', 'Thương hiệu dược mỹ phẩm Pháp dịu nhẹ an toàn'),
('Vichy', 'Thương hiệu dược mỹ phẩm cao cấp từ Pháp'),
('Cocoon', 'Thương hiệu mỹ phẩm thuần chay hàng đầu Việt Nam'),
('Cetaphil', 'Thương hiệu chăm sóc da nhạy cảm dịu lành');

INSERT INTO sanpham (madanhmuc, mathuonghieu, tensanpham, giaban, giagoc, hinhanh, mota, thongso, thanhphan, hdsd, tileban, khuyenmai, trangthai) VALUES
(3, 10, 'Nước Tẩy Trang Bí Đao Cocoon', 292000, 590000, '/hinhanh/suaruamat.png',
 'Nước Tẩy Trang Bí Đao Cocoon Winter Melon Micellar Water là dòng sản phẩm tẩy trang thuần chay ứng dụng công nghệ làm sạch dịu nhẹ NatraGem S150 giúp cuốn sạch mọi lớp trang điểm cứng đầu, bụi mịn PM2.5 cùng lượng dầu thừa trên bề mặt da hiệu quả mà hoàn toàn dịu nhẹ, hạn chế tối đa sự mất nước qua lớp màng biểu bì, ngừa mụn trứng cá và làm dịu nhanh chóng các vết ửng đỏ.',
 'Thương hiệu: Cocoon\nXuất xứ: Việt Nam\nDung tích: 500ml\nLoại da: Da mụn nhạy cảm, da dầu mụn\nKết cấu: Dạng nước lỏng nhẹ thông thoáng',
 'Thành phần chính:\n• Bí đao: Theo sách y học cổ truyền, bí đao có đặc tính làm mát, làm giảm nhiệt, giúp ngăn ngừa và làm dịu nhanh các nốt mụn trứng cá, mụn viêm.\n• Rau má: Các hợp chất sinh học như axit axetic, asiaticoside, axit madecassic và madecassoside có trong rau má là những chất chính giúp tăng sinh collagen cho làn da, làm dịu các vết đỏ và phục hồi tổn thương da.\n• Tinh dầu tràm trà: Loại tinh dầu có mùi thơm ấm áp, cay nồng giúp sát khuẩn, chống viêm mụn hiệu quả.\n• Betaine: Hoạt chất dưỡng ẩm chiết xuất từ củ cải đường giúp bảo vệ tế bào da khỏi căng thẳng từ môi trường như bức xạ UV, giữ ẩm vượt trội.\n• O-Cymen-5-Ol và Cetylpyridinium chloride: Kháng khuẩn mạnh mẽ, ngừa bít tắc.\n• NatraGem™ S150: Tổ hợp chất Polyglyceryl-4 Laurate/Sebacate và Polyglyceryl-4 Caprylate/Caprate nguồn gốc 100% thực vật đạt chứng nhận hữu cơ Ecocert, giúp làm sạch tối đa lớp make-up mà cực kỳ êm ái.\n\nThành phần đầy đủ:\nAqua/Water, Polyglyceryl-4 Laurate/Sebacate, Polyglyceryl-4 Caprylate/Caprate, Betaine, Benincasa Cerifera Fruit Extract, Centella Asiatica Extract, o-Cymen-5-ol, Propanediol, Glycereth-26, Glycerin, Trisodium Ethylenediamine Disuccinate, Sodium Lactate, Cetylpyridinium Chloride, Melaleuca Alternifolia Leaf Oil, Lactic Acid.',
 'Thấm đều dung dịch ra miếng bông tẩy trang cotton. Nhẹ nhàng lau sạch khắp vùng mặt, mắt và môi theo chiều từ trong ra ngoài, từ dưới lên trên. Không cần rửa lại với nước.',
 51, 'Bill 399K Cocoon Tặng Kèm Băng Đô', 'dangban'),

(3, 3, 'Nước Hoa Hồng Klairs Không Mùi', 207000, 435000, '/hinhanh/serum.png', 
 'Nước hoa hồng Klairs Supple Preparation Unscented Toner phiên bản không mùi lành tính dành riêng cho làn da nhạy cảm nhất. Giúp cân bằng độ pH, cấp ẩm tức thì và làm dịu da nhanh chóng khỏi các tác nhân có hại ngoài môi trường. Sản phẩm thẩm thấu cực nhanh, không gây bết rít hay bít tắc lỗ chân lông.', 
 'Thương hiệu: Klairs\nXuất xứ: Hàn Quốc\nDung tích: 180ml\nLoại da: Mọi loại da, da nhạy cảm\nKết cấu: Dạng lỏng trong suốt',
 'Thành phần chính:\n• Sodium Hyaluronate: Cấp ẩm sâu vượt trội, giữ nước tối ưu.\n• Phyto-Oligo: Nuôi dưỡng màng ẩm tự nhiên của da.\n• Chiết xuất rau má & Nha đam: Làm dịu mát da tức thì, ngừa kích ứng.\n• Lysine HCL, Proline, Acetyl Methionine: Phức hợp axit amin bảo vệ da toàn diện.\n\nThành phần đầy đủ:\nWater, Butylene Glycol, Dimethyl Sulfone, Betaine, Caprylic/Capric Triglyceride, Natto Gum, Sodium Hyaluronate, Centella Asiatica Extract, Glycyrrhiza Glabra (Licorice) Root Extract, Polyquaternium-51, Beta-Glucan, Panthenol, Lysine HCL, Proline, Sodium Ascorby Phophate...',
 'Sau khi rửa mặt sạch, đổ vài giọt toner ra bông tẩy trang hoặc trực tiếp ra lòng bàn tay rồi vỗ nhẹ đều khắp mặt cho dưỡng chất thẩm thấu.',
 63, 'Bill Klairs từ 399K Tặng Nước Hoa Hồng 30ml', 'dangban'),

(3, 4, 'Nước Tẩy Trang L\'Oreal Tươi Mát', 140000, 249000, '/hinhanh/suaruamat.png',
 'Nước tẩy trang L\'Oreal Paris 3-in-1 Micellar Water Refreshing làm sạch sâu bụi bẩn, bã nhờn và lớp trang điểm nhẹ nhàng mang lại cảm giác tươi mát dễ chịu cho da dầu và hỗn hợp. Ứng dụng công nghệ Micellar tiên tiến hút sạch tạp chất như nam châm mà không làm khô da.',
 'Thương hiệu: L\'Oreal\nXuất xứ: Pháp\nDung tích: 400ml\nLoại da: Da dầu, da hỗn hợp\nKết cấu: Dạng nước lỏng nhẹ',
 'Thành phần chính:\n• Công nghệ Micellar Water: Gom và hút sạch cặn trang điểm và hạt bụi siêu mịn PM2.5.\n• Glycerin: Cấp ẩm nuôi dưỡng màng biểu bì, giảm ma sát khi lau bông tẩy trang.\n• Nước khoáng Pháp: Bổ sung khoáng chất cho da thông thoáng tươi mát.\n\nThành phần đầy đủ:\nAqua/Water, Hexylene Glycol, Glycerin, Poloxamer 184, Disodium Cocoamphodiacetate, Disodium EDTA, Polyaminopropyl Biguanide, BHT...',
 'Thấm một lượng vừa đủ ra bông tẩy trang rồi nhẹ nhàng lau sạch mặt, mắt và môi theo chiều từ dưới lên. Không cần rửa lại với nước.',
 63, 'Làm sạch tươi mát cho da dầu, hỗn hợp', 'dangban'),

(4, 5, 'Kem Chống Nắng Skin1004 Rau Má', 252000, 495000, '/hinhanh/kemchongnang.png',
 'Kem chống nắng vật lý chiết xuất rau má Skin1004 Madagascar Centella Air-Fit Suncream Plus SPF50+ PA++++ với kết cấu mỏng nhẹ, không nhờn rít, giúp bảo vệ da tối ưu và làm dịu làn da mụn nhạy cảm. Chứa 35.8% chiết xuất rau má vùng Madagascar giúp hạ nhiệt da tức thì.',
 'Thương hiệu: Skin1004\nXuất xứ: Hàn Quốc\nDung tích: 50ml\nLoại da: Mọi loại da, da nhạy cảm\nChỉ số chống nắng: SPF50+ PA++++',
 'Thành phần chính:\n• Chiết xuất rau má Madagascar (35.8%): Giảm sưng mụn, tăng sinh tế bào phục hồi da mụn nhạy cảm.\n• Kẽm Oxit & Titanium Dioxide: Bảo vệ vật lý tối ưu khỏi tia UVA/UVB.\n• Niacinamide: Làm mờ thâm mụn, dưỡng sáng da.\n\nThành phần đầy đủ:\nCentella Asiatica Extract (35.8%), Cyclomethicone, Zinc Oxide, Water, Titanium Dioxide, Dicaprylyl Carbonate, Propanediol, Polyglyceryl-3 Polydimethylsiloxyethyl Dimethicone, Niacinamide...',
 'Lấy một lượng kem vừa đủ thoa đều khắp mặt và cổ ở bước cuối cùng của chu trình dưỡng da buổi sáng. Nên thoa trước khi ra ngoài 20 phút.',
 63, 'Bill Skin1004 từ 399k Tặng Kem Rau Má 20ml', 'dangban'),

(4, 6, 'Kem Chống Nắng La Roche-Posay', 389000, 590000, '/hinhanh/kemnangtong.png',
 'Kem chống nắng La Roche-Posay Anthelios UVMune 400 SPF50+ bảo vệ da phổ rộng tối đa khỏi tia UVA bước sóng dài, kiềm dầu vượt trội đến 12h, thích hợp cho da dầu mụn nhạy cảm. Công nghệ màng lọc độc quyền Mexoryl 400 bảo vệ da tối ưu nhất.',
 'Thương hiệu: La Roche-Posay\nXuất xứ: Pháp\nDung tích: 50ml\nLoại da: Da dầu mụn, da nhạy cảm\nKết cấu: Dạng kem lỏng khô thoáng',
 'Thành phần chính:\n• Màng lọc độc quyền Mexoryl 400: Ngăn tia UVA dài bước sóng từ 380-400nm bảo vệ da hư tổn.\n• Hoạt chất Airlicium: Kiểm soát bã nhờn, mồ hôi, giữ mặt ráo mịn 12 giờ.\n• Nước khoáng nhiệt La Roche-Posay: Làm dịu mẩn đỏ.\n\nThành phần đầy đủ:\nAqua/Water, Diisopropyl Sebacate, Silica, Alcohol Denat., Ethylhexyl Salicylate, Ethylhexyl Triazone, Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine, Glycerin...',
 'Thoa kem chống nắng mỗi ngày vào buổi sáng. Thoa lại sau mỗi 2 tiếng hoạt động ngoài trời nắng gắt hoặc sau khi bơi lội.',
 59, 'Bill La Roche-posay 499k tặng Xịt khoáng 50ml', 'dangban'),

(4, 7, 'Sữa Chống Nắng Anessa Kiềm Dầu', 428000, 702000, '/hinhanh/kemnangtong.png',
 'Sữa chống nắng dưỡng da kiềm dầu bảo vệ hoàn hảo Anessa Perfect UV Sunscreen Skincare Milk N SPF50+ PA++++ sở hữu công nghệ Auto Booster giúp chống trôi trong nước, mồ hôi và nhiệt độ cao, bảo vệ da vượt trội suốt cả ngày.',
 'Thương hiệu: Anessa\nXuất xứ: Nhật Bản\nDung tích: 60ml\nLoại da: Da dầu, da hỗn hợp\nKết cấu: Dạng sữa mỏng nhẹ nâng tông tự nhiên',
 'Thành phần chính:\n• Công nghệ Auto Booster: Màng bảo vệ vững chắc hơn khi tiếp xúc với Nhiệt độ, Độ ẩm, Mồ hôi và Nước.\n• Phức hợp dưỡng da 50%: Trà xanh, Hoa vàng, Axit Hyaluronic dưỡng ẩm sâu ngừa lão hóa.\n\nThành phần đầy đủ:\nDimethicone, Water, Zinc Oxide, Alcohol, Talc, Isododecane, Diisopropyl Sebacate, Octocrylene, Ethylhexyl Salicylate, Silica, Peg-9 Polydimethylsiloxyethyl Dimethicone...',
 'Lắc đều trước khi sử dụng. Thoa đều một lượng vừa đủ lên vùng mặt và cổ trước khi tiếp xúc với ánh nắng mặt trời.',
 20, 'Mua Anessa tặng kèm tuýp sữa chống nắng 12ml', 'dangban'),

(3, 8, 'Nước Tẩy Trang Bioderma Hồng', 361000, 580000, '/hinhanh/nuochoahong.png',
 'Nước tẩy trang Bioderma Sensibio H2O Micellar Water dành cho da nhạy cảm giúp tẩy sạch lớp trang điểm hiệu quả mà vẫn bảo vệ lớp màng lipid tự nhiên của làn da, không gây châm chích hay kích ứng da mặt.',
 'Thương hiệu: Bioderma\nXuất xứ: Pháp\nDung tích: 500ml\nLoại da: Da nhạy cảm, da thường\nKết cấu: Dạng nước Micellar dịu nhẹ',
 'Thành phần chính:\n• Các hạt Micelle: Hút dầu thừa, bụi trang điểm mà vẫn nâng niu lớp màng Hydrolipid của da.\n• Chiết xuất dưa leo: Làm dịu sưng tấy mẩn đỏ.\n• Nước tinh khiết đạt chuẩn y tế: Hạn chế vi khuẩn thâm nhập.\n\nThành phần đầy đủ:\nAqua/Water/Eau, PEG-6 Caprylic/Capric Glycerides, Fructooligosaccharides, Mannitol, Xylitol, Rhamnose, Cucumis Sativus Fruit Extract, Propylene Glycol...',
 'Thấm dung dịch ra bông cotton và lau nhẹ nhàng toàn mặt cho tới khi miếng bông sạch hoàn toàn. Có thể không cần rửa lại với nước.',
 80, 'Bill 399K Bioderma Tặng Kèm Tẩy Trang 100ml', 'dangban'),

(1, 1, 'Serum dưỡng ẩm Hồng Xinh', 320000, 400000, '/hinhanh/serum.png', 
 'Serum dưỡng ẩm sâu Hồng Xinh giúp nuôi dưỡng làn da trắng hồng tự nhiên, bổ sung collagen giúp trẻ hóa làn da và ngăn ngừa nếp nhăn hiệu quả.',
 'Thương hiệu: Hồng Xinh\nXuất xứ: Việt Nam\nDung tích: 30ml\nLoại da: Mọi loại da\nKết cấu: Dạng serum đậm đặc',
 'Thành phần chính:\n• Collagen tươi: Tăng sinh liên kết nâng cơ, làm căng mọng da.\n• Hyaluronic Acid: Giữ ẩm sâu đa tầng ngăn ngừa bong tróc.\n• Vitamin E & Chiết xuất rau má: Chống oxy hóa vượt trội.\n\nThành phần đầy đủ:\nWater, Glycerin, Sodium Hyaluronate, Collagen, Vitamin E, Centella Asiatica Extract, Allantoin...',
 'Thoa đều 2-3 giọt serum lên mặt sau bước rửa mặt sạch vào buổi tối, massage nhẹ nhàng.',
 35, 'Tặng kèm 1 mặt nạ giấy cho mỗi đơn hàng', 'dangban'),

(1, 6, 'Kem Dưỡng Phục Hồi La Roche-Posay B5+', 345000, 450000, '/hinhanh/kemduong.png',
 'Kem dưỡng làm dịu, phục hồi và bảo vệ da La Roche-Posay Cicaplast Baume B5+ chứa bơ hạt mỡ, Panthenol 5% và phức hợp lợi khuẩn Tribioma giúp phục hồi hàng rào bảo vệ da nhanh chóng chỉ sau 1 giờ.',
 'Thương hiệu: La Roche-Posay\nXuất xứ: Pháp\nDung tích: 40ml\nLoại da: Da nhạy cảm, da đang điều trị phục hồi\nKết cấu: Dạng kem đặc mịn',
 'Thành phần chính:\n• Panthenol 5% (B5): Xoa dịu nhanh cảm giác ngứa rát, đỏ da do tổn thương.\n• Madecassoside: Thúc đẩy chu trình tái sinh biểu bì da.\n• Phức hợp lợi khuẩn Tribioma: Cân bằng hệ vi sinh trên da, ngừa sẹo rỗ mụn.\n\nThành phần đầy đủ:\nAqua/Water, Hydrogenated Polyisobutene, Dimethicone, Glycerin, Butyrospermum Parkii Butter/Shea Butter, Panthenol, Zea Mays Starch/Corn Starch...',
 'Thoa một lượng vừa đủ lên làn da sạch 2 lần mỗi ngày. Tránh vùng mắt và môi.',
 45, 'Phục hồi cấp tốc cho da tổn thương', 'dangban'),

(1, 4, 'Kem Dưỡng Sáng Da L\'Oreal Glycolic-Bright', 290000, 399000, '/hinhanh/kemduong.png',
 'Kem dưỡng ngày làm sáng da L\'Oreal Paris Glycolic-Bright Glowing Cream SPF17 chứa Glycolic Acid (AHA) và Niacinamide giúp giảm thâm nám, đều màu da hiệu quả trong 14 ngày sử dụng liên tục.',
 'Thương hiệu: L\'Oreal\nXuất xứ: Pháp\nDung tích: 50ml\nLoại da: Mọi loại da, da xỉn màu\nKết cấu: Dạng kem mỏng nhẹ có chỉ số chống nắng',
 'Thành phần chính:\n• Glycolic Acid (AHA): Tẩy da chết hóa học dịu nhẹ, tăng đào thải tế bào thâm sạm.\n• Symwhite: Ức chế melanin giảm nám sạm vượt trội.\n• Niacinamide: Cải thiện sắc tố mờ thâm mụn.\n\nThành phần đầy đủ:\nAqua/Water, Ethylhexyl Salicylate, Niacinamide, Glycerin, Dimethicone, Glycolic Acid, Octocrylene...',
 'Thoa đều lên vùng da mặt và cổ đã được làm sạch mỗi buổi sáng. Massage nhẹ nhàng để dưỡng chất thấm đều.',
 28, 'Siêu sale hè giảm sâu 27%', 'dangban'),

(1, 9, 'Dưỡng Chất Khoáng Vichy Mineral 89', 620000, 850000, '/hinhanh/serum.png',
 'Dưỡng chất khoáng cô đặc Vichy Mineral 89 chứa đến 89% nước khoáng núi lửa Vichy cô đặc kết hợp với Hyaluronic Acid tự nhiên giúp củng cố hàng rào bảo vệ da, cho da mịn màng, căng mọng đầy sức sống.',
 'Thương hiệu: Vichy\nXuất xứ: Pháp\nDung tích: 50ml\nLoại da: Mọi loại da, kể cả da nhạy cảm\nKết cấu: Dạng gel trong suốt mát rượi',
 'Thành phần chính:\n• 89% Nước khoáng Vichy cô đặc: Giàu 15 loại khoáng chất quý nuôi dưỡng da vững chắc.\n• Hyaluronic Acid 0.4%: Cấp ẩm và chống khô da do điều hòa.\n\nThành phần đầy đủ:\nVichy Volcanic Water (89%), Hyaluronic Acid, Glycerin, Butylene Glycol, Peg/Ppg/Polybutylene Glycol-8/5/3 Glycerin, Phenoxyethanol...',
 'Sử dụng 2 lần mỗi ngày (sáng/tối) sau bước toner. Lấy 1-2 nhấn vỗ đều khắp mặt.',
 12, 'Vichy chính hãng tặng quà sang xịn', 'dangban'),

(3, 10, 'Tẩy Tế Bào Chết Cà Phê Cocoon', 115000, 165000, '/hinhanh/suaruamat.png',
 'Tẩy tế bào chết da mặt Cocoon từ hạt cà phê Đắk Lắk xay nhuyễn hòa quyện cùng bơ ca cao Tiền Giang giúp làm sạch tế bào chết hiệu quả mà không gây khô rát, mang lại làn da mịn màng tươi sáng.',
 'Thương hiệu: Cocoon\nXuất xứ: Việt Nam\nDung tích: 150ml\nLoại da: Mọi loại da\nKết cấu: Dạng kem đặc chứa hạt cà phê mịn',
 'Thành phần chính:\n• Hạt cà phê Đắk Lắk: Xay mịn, cuốn trôi tế bào sần sùi mà không làm trầy xước da.\n• Bơ ca cao Tiền Giang: Dưỡng ẩm mềm mịn da sau khi tẩy.\n\nThành phần đầy đủ:\nAqua/Water, Coffea Arabica (Coffee) Seed Powder, Theobroma Cacao (Cocoa) Seed Butter, Cetearyl Alcohol, Tocopheryl Acetate...',
 'Thoa một lượng vừa đủ lên da mặt ướt. Massage nhẹ nhàng 2-3 phút theo vòng tròn rồi rửa sạch lại với nước.',
 75, 'Mua 2 hũ Cocoon tặng kèm băng đô tai mèo', 'dangban'),

(1, 3, 'Kem Dưỡng Làm Dịu Da Ban Đêm Klairs Blue', 345000, 480000, '/hinhanh/kemduong.png',
 'Kem dưỡng làm dịu da ban đêm Klairs Midnight Blue Calming Cream chứa chiết xuất Guaiazulene (từ dầu hoa cúc) tạo màu xanh dương độc đáo, giúp giảm đỏ, làm dịu da kích ứng và phục hồi da sau tổn thương.',
 'Thương hiệu: Klairs\nXuất xứ: Hàn Quốc\nDung tích: 30ml\nLoại da: Da nhạy cảm, da dễ kích ứng\nKết cấu: Dạng kem mượt màu xanh dương nhạt',
 'Thành phần chính:\n• Guaiazulene (Hoa cúc La Mã): Hoạt chất chống sưng viêm đỏ da do kích ứng mỹ phẩm.\n• Chiết xuất rau má: Phục hồi và làm lành màng chắn da.\n\nThành phần đầy đủ:\nWater, Cetyl Ethylhexanoate, Glycerin, Sodium Hyaluronate, Centella Asiatica Extract, Guaiazulene, Ceramide NP...',
 'Sử dụng vào buổi tối ở bước cuối cùng của chu trình dưỡng da. Thoa một lớp mỏng lên vùng da nhạy cảm hoặc toàn mặt.',
 52, 'Kem dưỡng cứu cánh cho da nhạy cảm', 'dangban'),

(3, 11, 'Sữa Rửa Mặt Dịu Lành Cetaphil', 280000, 390000, '/hinhanh/suaruamat.png',
 'Sữa rửa mặt dịu lành cho da nhạy cảm Cetaphil Gentle Skin Cleanser ứng dụng công nghệ Micellar giúp làm sạch bụi bẩn, lớp trang điểm nhẹ mà không gây khô da, duy trì độ ẩm tự nhiên cho da lành mạnh.',
 'Thương hiệu: Cetaphil\nXuất xứ: Mỹ\nDung tích: 500ml\nLoại da: Da khô, da nhạy cảm\nKết cấu: Dạng gel sữa đục, không tạo bọt nhiều',
 'Thành phần chính:\n• Niacinamide (B3) & Panthenol (B5): Củng cố hàng rào lipid cho da nhạy cảm.\n• Glycerin: Cấp nước dịu mát tránh châm chích.\n\nThành phần đầy đủ:\nAqua/Water, Glycerin, Cetearyl Alcohol, Panthenol, Niacinamide, Pantolactone, Xanthan Gum, Sodium Cocoyl Isethionate...',
 'Có thể dùng khô (lau sạch bằng khăn mềm sau khi massage) hoặc dùng ướt với nước thông thường.',
 90, 'Chăm sóc làn da nhạy cảm đạt chuẩn y khoa', 'dangban');

INSERT INTO luachon_sanpham (masanpham, mausac, loai, dungtich, giaban, soluongton, hinhanh, trangthai) VALUES
(1, 'Mặc định', 'Tẩy trang', '500ml', 292000, 30, '/hinhanh/suaruamat.png', 'dangban'),
(1, 'Mặc định', 'Tẩy trang', '150ml', 145000, 15, '/hinhanh/suaruamat.png', 'dangban'),
(2, 'Mặc định', 'Nước hoa hồng', '180ml', 207000, 30, '/hinhanh/serum.png', 'dangban'),
(2, 'Mặc định', 'Nước hoa hồng', '250ml', 290000, 15, '/hinhanh/serum.png', 'dangban'),
(3, 'Mặc định', 'Tẩy trang', '400ml', 140000, 40, '/hinhanh/suaruamat.png', 'dangban'),
(4, 'Mặc định', 'Kem chống nắng', '50ml', 252000, 25, '/hinhanh/kemchongnang.png', 'dangban'),
(5, 'Mặc định', 'Kem chống nắng', '50ml', 389000, 15, '/hinhanh/kemnangtong.png', 'dangban'),
(6, 'Mặc định', 'Kem chống nắng', '60ml', 428000, 18, '/hinhanh/kemnangtong.png', 'dangban'),
(7, 'Mặc định', 'Tẩy trang', '500ml', 361000, 35, '/hinhanh/nuochoahong.png', 'dangban'),
(8, 'Mặc định', 'Serum', '30ml', 320000, 22, '/hinhanh/serum.png', 'dangban'),
(9, 'Mặc định', 'Kem dưỡng', '40ml', 345000, 30, '/hinhanh/kemduong.png', 'dangban'),
(10, 'Mặc định', 'Kem dưỡng', '50ml', 290000, 25, '/hinhanh/kemduong.png', 'dangban'),
(11, 'Mặc định', 'Gel dưỡng khoáng', '50ml', 620000, 15, '/hinhanh/serum.png', 'dangban'),
(12, 'Mặc định', 'Tẩy tế bào chết', '150ml', 115000, 35, '/hinhanh/suaruamat.png', 'dangban'),
(13, 'Mặc định', 'Kem dưỡng', '30ml', 345000, 20, '/hinhanh/kemduong.png', 'dangban');

INSERT INTO tonkho (masanpham, soluongton, soluongtoithieu, ghichu) VALUES
(1, 45, 5, 'Đủ hàng'),
(2, 45, 5, 'Đủ hàng'),
(3, 40, 5, 'Đủ hàng'),
(4, 25, 5, 'Đủ hàng'),
(5, 15, 5, 'Đủ hàng'),
(6, 28, 5, 'Đủ hàng'),
(7, 55, 5, 'Đủ hàng'),
(8, 22, 5, 'Đủ hàng'),
(9, 30, 5, 'Đủ hàng'),
(10, 25, 5, 'Đủ hàng'),
(11, 15, 5, 'Đủ hàng'),
(12, 35, 5, 'Đủ hàng'),
(13, 20, 5, 'Đủ hàng');

INSERT INTO giohang (manguoidung) VALUES
(1);

-- ==================== ĐƠN HÀNG GIẢ LẬP ĐA THỜI GIAN ====================
INSERT INTO donhang (madonhang, manguoidung, tennguoinhan, sodienthoainhan, diachigiaohang, tongtien, trangthaidonhang, trangthaithanhtoan, ngaydat) VALUES
(1, 1, 'Nguyễn Minh Anh', '0901234567', 'Quận 1, TP HCM', 347000, 'hoanthanh', 'dathanhtoan', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(2, 1, 'Nguyễn Minh Anh', '0901234567', 'Quận Bình Thạnh, TP HCM', 320000, 'hoanthanh', 'dathanhtoan', DATE_SUB(NOW(), INTERVAL 2 DAY)),
(3, 1, 'Nguyễn Minh Anh', '0901234567', 'Quận 3, TP HCM', 252000, 'hoanthanh', 'dathanhtoan', DATE_SUB(NOW(), INTERVAL 3 DAY)),
(4, 1, 'Nguyễn Minh Anh', '0901234567', 'Quận 10, TP HCM', 529000, 'hoanthanh', 'dathanhtoan', DATE_SUB(NOW(), INTERVAL 5 DAY)),
(5, 1, 'Nguyễn Minh Anh', '0901234567', 'Quận Phú Nhuận, TP HCM', 750000, 'hoanthanh', 'dathanhtoan', DATE_SUB(NOW(), INTERVAL 6 DAY)),
(6, 1, 'Khách hàng 2', '0901234568', 'Quận 1, TP HCM', 1200000, 'hoanthanh', 'dathanhtoan', DATE_SUB(NOW(), INTERVAL 1 MONTH)),
(7, 1, 'Khách hàng 3', '0901234569', 'Quận 7, TP HCM', 1850000, 'hoanthanh', 'dathanhtoan', DATE_SUB(NOW(), INTERVAL 2 MONTH)),
(8, 1, 'Khách hàng 4', '0901234570', 'Quận Tân Bình, TP HCM', 950000, 'hoanthanh', 'dathanhtoan', DATE_SUB(NOW(), INTERVAL 3 MONTH)),
(9, 1, 'Khách hàng 5', '0901234571', 'Quận Gò Vấp, TP HCM', 2200000, 'hoanthanh', 'dathanhtoan', DATE_SUB(NOW(), INTERVAL 4 MONTH)),
(10, 1, 'Khách hàng 6', '0901234572', 'Quận 2, TP HCM', 1450000, 'hoanthanh', 'dathanhtoan', DATE_SUB(NOW(), INTERVAL 6 MONTH)),
(11, 1, 'Khách hàng 7', '0901234573', 'Quận 9, TP HCM', 3100000, 'hoanthanh', 'dathanhtoan', DATE_SUB(NOW(), INTERVAL 8 MONTH)),
(12, 1, 'Khách hàng 8', '0901234574', 'Quận 4, TP HCM', 2400000, 'hoanthanh', 'dathanhtoan', DATE_SUB(NOW(), INTERVAL 1 YEAR)),
(13, 1, 'Khách hàng 9', '0901234575', 'Quận 5, TP HCM', 4500000, 'hoanthanh', 'dathanhtoan', DATE_SUB(NOW(), INTERVAL 13 MONTH));

INSERT INTO chitietdonhang (madonhang, masanpham, maluachon, soluong, dongia, thanhtien) VALUES
(1, 3, 3, 1, 140000, 140000),
(1, 2, 1, 1, 207000, 207000),
(2, 8, 11, 1, 320000, 320000),
(3, 4, 5, 1, 252000, 252000),
(4, 2, 1, 1, 207000, 207000),
(4, 8, 11, 1, 320000, 320000),
(5, 6, 7, 1, 428000, 428000),
(5, 8, 11, 1, 320000, 320000),
(6, 7, 9, 2, 361000, 722000),
(6, 2, 1, 2, 207000, 414000),
(7, 13, 17, 5, 280000, 1400000),
(7, 3, 3, 3, 140000, 420000),
(8, 9, 12, 2, 345000, 690000),
(8, 12, 15, 2, 115000, 230000),
(9, 13, 17, 7, 280000, 1960000),
(9, 3, 3, 2, 140000, 280000),
(10, 2, 1, 5, 207000, 1035000),
(10, 3, 3, 3, 140000, 420000),
(11, 13, 17, 10, 280000, 2800000),
(11, 4, 5, 1, 252000, 252000),
(12, 2, 1, 8, 207000, 1656000),
(12, 3, 3, 5, 140000, 700000),
(13, 13, 17, 15, 280000, 4200000);

INSERT INTO thanhtoan (madonhang, phuongthuc, magiaodich, sotien, trangthaithanhtoan, ngaythanhtoan) VALUES
(1, 'qrcode', 'QR202601', 347000, 'dathanhtoan', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(2, 'tienmat', NULL, 320000, 'dathanhtoan', DATE_SUB(NOW(), INTERVAL 2 DAY)),
(3, 'qrcode', 'QR202603', 252000, 'dathanhtoan', DATE_SUB(NOW(), INTERVAL 3 DAY)),
(4, 'qrcode', 'QR202604', 529000, 'dathanhtoan', DATE_SUB(NOW(), INTERVAL 5 DAY)),
(5, 'qrcode', 'QR202605', 750000, 'dathanhtoan', DATE_SUB(NOW(), INTERVAL 6 DAY)),
(6, 'qrcode', 'QR202606', 1200000, 'dathanhtoan', DATE_SUB(NOW(), INTERVAL 1 MONTH)),
(7, 'qrcode', 'QR202607', 1850000, 'dathanhtoan', DATE_SUB(NOW(), INTERVAL 2 MONTH)),
(8, 'qrcode', 'QR202608', 950000, 'dathanhtoan', DATE_SUB(NOW(), INTERVAL 3 MONTH)),
(9, 'qrcode', 'QR202609', 2200000, 'dathanhtoan', DATE_SUB(NOW(), INTERVAL 4 MONTH)),
(10, 'qrcode', 'QR202610', 1450000, 'dathanhtoan', DATE_SUB(NOW(), INTERVAL 6 MONTH)),
(11, 'qrcode', 'QR202611', 3100000, 'dathanhtoan', DATE_SUB(NOW(), INTERVAL 8 MONTH)),
(12, 'qrcode', 'QR202612', 2400000, 'dathanhtoan', DATE_SUB(NOW(), INTERVAL 1 YEAR)),
(13, 'qrcode', 'QR202613', 4500000, 'dathanhtoan', DATE_SUB(NOW(), INTERVAL 13 MONTH));

INSERT INTO lichsutrangthaidon (madonhang, trangthai, ghichu, thoigian) VALUES
(1, 'hoanthanh', 'Giao thành công', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(2, 'hoanthanh', 'Giao thành công', DATE_SUB(NOW(), INTERVAL 2 DAY)),
(3, 'hoanthanh', 'Giao thành công', DATE_SUB(NOW(), INTERVAL 3 DAY)),
(4, 'hoanthanh', 'Giao thành công', DATE_SUB(NOW(), INTERVAL 5 DAY)),
(5, 'hoanthanh', 'Giao thành công', DATE_SUB(NOW(), INTERVAL 6 DAY));

INSERT INTO voucher (macode, ten, giatri, loai, dieukien_tien_toi_thieu, ngaybatdau, ngayhethan, trangthai) VALUES
('HONGXINH500K', 'Voucher Siêu Sale Hè 500k', 500000, 'sotien', 2000000, NOW(), DATE_ADD(NOW(), INTERVAL 3 MONTH), 'hoatdong'),
('HONGXINH1M', 'Voucher Thành Viên VIP 1 Triệu', 1000000, 'sotien', 5000000, NOW(), DATE_ADD(NOW(), INTERVAL 3 MONTH), 'hoatdong');

INSERT INTO voucher_nguoidung (mavoucher, manguoidung, ngaytang) VALUES
(1, 1, NOW());

INSERT INTO danhgia (masanpham, manguoidung, sosao, noidung) VALUES
(1, 1, 5, 'Nước tẩy trang bí đao Cocoon dùng êm da cực kỳ, sạch sâu và không bị châm chích tí nào. Ủng hộ mỹ phẩm thuần chay Việt Nam!'),
(2, 1, 5, 'Klairs cấp nước cấp ẩm tốt lắm ạ, dùng xong da mịn tưng không cồn nên da nhạy cảm cực an tâm.'),
(7, 1, 5, 'Kem chống nắng nâng tông nhẹ rất tự nhiên, kiềm dầu tốt nhất trong các dòng mình từng dùng.');

INSERT INTO hoidap (masanpham, manguoidung, cauhoi, cautraloi, ngaytraloi) VALUES
(1, 1, 'Tẩy trang Cocoon này da nhạy cảm nhiều mụn ẩn dùng có đẩy mụn mủ không ạ?', 'Dạ chào bạn, nước tẩy trang bí đao Cocoon chứa tràm trà kiềm khuẩn nhẹ nhàng và bí đao thanh nhiệt, giúp gom cồi mụn ẩn tự nhiên mà hoàn toàn không gây đẩy mụn mủ kích ứng bạn nhé!', NOW()),
(4, 1, 'Chống nắng Skin1004 có bị vón cục khi bôi lớp thứ hai không shop?', 'Dạ kem chống nắng rau má Skin1004 kết cấu mỏng nhẹ thấm hút nhanh nên khi dặm lại lớp hai hoàn toàn mướt mịn ráo da, không gây vón cục ạ.', NOW());

SET FOREIGN_KEY_CHECKS = 1;


-- Bảng 20: khuyenmai (Chương trình khuyến mãi)
CREATE TABLE IF NOT EXISTS khuyenmai (
    makhuyenmai INT AUTO_INCREMENT PRIMARY KEY,
    tenkhuyenmai VARCHAR(255) NOT NULL,
    phantramgiam INT DEFAULT 0,
    ngaybatdau DATETIME NULL,
    ngayketthuc DATETIME NULL,
    trangthai VARCHAR(30) DEFAULT 'hoatdong'
) ENGINE=InnoDB;

-- Bảng 21: sanpham_khuyenmai (Liên kết sản phẩm và chương trình khuyến mãi)
CREATE TABLE IF NOT EXISTS sanpham_khuyenmai (
    masanpham INT NOT NULL,
    makhuyenmai INT NOT NULL,
    PRIMARY KEY (masanpham, makhuyenmai),
    FOREIGN KEY (masanpham) REFERENCES sanpham(masanpham) ON DELETE CASCADE,
    FOREIGN KEY (makhuyenmai) REFERENCES khuyenmai(makhuyenmai) ON DELETE CASCADE
) ENGINE=InnoDB;
