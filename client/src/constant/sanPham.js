export const danhMuc = ["Tất cả", "Chăm sóc da", "Trang điểm", "Làm sạch", "Chống nắng", "Son"];

// Ánh xạ hình ảnh riêng cho từng sản phẩm — khớp 100% với TiDB Cloud & MySQL local
export const HINH_SANPHAM = {
  1:  "/hinhanh/cocoon_cleansing_water.png",
  2:  "/hinhanh/klairs_toner.png",
  3:  "/hinhanh/loreal_micellar_water.png",
  4:  "/hinhanh/skin1004_sunscreen.png",
  5:  "/hinhanh/laroche_posay_sunscreen.png",
  6:  "/hinhanh/anessa_sunscreen.png",
  7:  "/hinhanh/bioderma_micellar.png",
  8:  "/hinhanh/hongxinh_serum.png",
  9:  "/hinhanh/laroche_posay_b5_cream.png",
  10: "/hinhanh/loreal_glycolic_cream.png",
  11: "/hinhanh/vichy_mineral_89.png",
  12: "/hinhanh/cocoon_coffee_scrub.png",
  13: "/hinhanh/kemduong.png",
  14: "/hinhanh/suaruamat.png",
  15: "/hinhanh/son.png",
  16: "/hinhanh/son_3ce_lipstick.png"
};

// DỮ LIỆU MẪU FALLBACK — bám sát 100% theo website_ban_my_pham.sql & TiDB Cloud
export const sanPhams = [
  {
    masanpham: 1,
    ten: "Nước Tẩy Trang Bí Đao Cocoon",
    danhMuc: "Làm sạch",
    gia: 292000,
    giagoc: null,
    ton: 45,
    hinh: "/hinhanh/cocoon_cleansing_water.png",
    moTa: "Nước Tẩy Trang Bí Đao Cocoon Winter Melon Micellar Water là dòng sản phẩm tẩy trang thuần chay ứng dụng công nghệ làm sạch dịu nhẹ NatraGem S150 giúp cuốn sạch mọi lớp trang điểm cứng đầu, bụi mịn PM2.5 cùng lượng dầu thừa trên bề mặt da hiệu quả mà hoàn toàn dịu nhẹ, hạn chế tối đa sự mất nước qua lớp màng biểu bì, ngừa mụn trứng cá và làm dịu nhanh chóng các vết ửng đỏ.",
    thongso: "Thương hiệu: Cocoon\nXuất xứ: Việt Nam\nDung tích: 500ml / 150ml\nLoại da: Da mụn nhạy cảm, da dầu mụn\nKết cấu: Dạng nước lỏng nhẹ thông thoáng",
    thanhphan: "Thành phần chính:\n• Bí đao: Làm mát, làm giảm nhiệt, ngăn ngừa và làm dịu các nốt mụn trứng cá.\n• Rau má: Tăng sinh collagen, làm dịu các vết đỏ và phục hồi tổn thương da.\n• Tinh dầu tràm trà: Sát khuẩn, chống viêm mụn hiệu quả.\n• Betaine: Giữ ẩm vượt trội.\n• NatraGem™ S150: Nguồn gốc 100% thực vật, chứng nhận hữu cơ Ecocert.",
    hdsd: "Thấm đều dung dịch ra miếng bông tẩy trang cotton. Nhẹ nhàng lau sạch khắp vùng mặt, mắt và môi theo chiều từ trong ra ngoài, từ dưới lên trên. Không cần rửa lại với nước.",
    tileban: 51,
    khuyenmai: "Bill 399K Cocoon Tặng Kèm Băng Đô",
    luachon: [
      { maluachon: 1, mausac: "Mặc định", loai: "Tẩy trang", dungtich: "500ml", giaban: 292000, soluongton: 30, hinh: "/hinhanh/cocoon_cleansing_water.png" },
      { maluachon: 2, mausac: "Mặc định", loai: "Tẩy trang", dungtich: "150ml", giaban: 145000, soluongton: 15, hinh: "/hinhanh/cocoon_cleansing_water.png" }
    ]
  },
  {
    masanpham: 2,
    ten: "Nước Hoa Hồng Klairs Không Mùi",
    danhMuc: "Làm sạch",
    gia: 207000,
    giagoc: null,
    ton: 45,
    hinh: "/hinhanh/klairs_toner.png",
    moTa: "Nước hoa hồng Klairs Supple Preparation Unscented Toner phiên bản không mùi lành tính dành riêng cho làn da nhạy cảm nhất. Giúp cân bằng độ pH, cấp ẩm tức thì và làm dịu da nhanh chóng khỏi các tác nhân có hại ngoài môi trường. Sản phẩm thẩm thấu cực nhanh, không gây bết rít hay bít tắc lỗ chân lông.",
    thongso: "Thương hiệu: Klairs\nXuất xứ: Hàn Quốc\nDung tích: 180ml / 250ml\nLoại da: Mọi loại da, da nhạy cảm\nKết cấu: Dạng lỏng trong suốt",
    thanhphan: "Thành phần chính:\n• Sodium Hyaluronate: Cấp ẩm sâu vượt trội.\n• Phyto-Oligo: Nuôi dưỡng màng ẩm tự nhiên của da.\n• Chiết xuất rau má & Nha đam: Làm dịu mát da tức thì.\n• Lysine HCL, Proline: Phức hợp axit amin bảo vệ da toàn diện.",
    hdsd: "Sau khi rửa mặt sạch, đổ vài giọt toner ra bông tẩy trang hoặc trực tiếp ra lòng bàn tay rồi vỗ nhẹ đều khắp mặt cho dưỡng chất thẩm thấu.",
    tileban: 63,
    khuyenmai: "Bill Klairs từ 399K Tặng Nước Hoa Hồng 30ml",
    luachon: [
      { maluachon: 3, mausac: "Mặc định", loai: "Nước hoa hồng", dungtich: "180ml", giaban: 207000, soluongton: 30, hinh: "/hinhanh/klairs_toner.png" },
      { maluachon: 4, mausac: "Mặc định", loai: "Nước hoa hồng", dungtich: "250ml", giaban: 290000, soluongton: 15, hinh: "/hinhanh/klairs_toner.png" }
    ]
  },
  {
    masanpham: 3,
    ten: "Nước Tẩy Trang L'Oreal Tươi Mát",
    danhMuc: "Làm sạch",
    gia: 140000,
    giagoc: null,
    ton: 40,
    hinh: "/hinhanh/loreal_micellar_water.png",
    moTa: "Nước tẩy trang L'Oreal Paris 3-in-1 Micellar Water Refreshing làm sạch sâu bụi bẩn, bã nhờn và lớp trang điểm nhẹ nhàng mang lại cảm giác tươi mát dễ chịu cho da dầu và hỗn hợp. Ứng dụng công nghệ Micellar tiên tiến hút sạch tạp chất như nam châm mà không làm khô da.",
    thongso: "Thương hiệu: L'Oreal\nXuất xứ: Pháp\nDung tích: 400ml\nLoại da: Da dầu, da hỗn hợp\nKết cấu: Dạng nước lỏng nhẹ",
    thanhphan: "Thành phần chính:\n• Công nghệ Micellar Water: Gom và hút sạch cặn trang điểm.\n• Glycerin: Cấp ẩm nuôi dưỡng màng biểu bì.\n• Nước khoáng Pháp: Bổ sung khoáng chất cho da.",
    hdsd: "Thấm một lượng vừa đủ ra bông tẩy trang rồi nhẹ nhàng lau sạch mặt, mắt và môi. Không cần rửa lại với nước.",
    tileban: 63,
    khuyenmai: "Làm sạch tươi mát cho da dầu, hỗn hợp",
    luachon: [
      { maluachon: 5, mausac: "Mặc định", loai: "Tẩy trang", dungtich: "400ml", giaban: 140000, soluongton: 40, hinh: "/hinhanh/loreal_micellar_water.png" }
    ]
  },
  {
    masanpham: 4,
    ten: "Kem Chống Nắng Skin1004 Rau Má",
    danhMuc: "Chống nắng",
    gia: 252000,
    giagoc: null,
    ton: 25,
    hinh: "/hinhanh/skin1004_sunscreen.png",
    moTa: "Kem chống nắng vật lý chiết xuất rau má Skin1004 Madagascar Centella Air-Fit Suncream Plus SPF50+ PA++++ với kết cấu mỏng nhẹ, không nhờn rít, giúp bảo vệ da tối ưu và làm dịu làn da mụn nhạy cảm. Chứa 35.8% chiết xuất rau má vùng Madagascar giúp hạ nhiệt da tức thì.",
    thongso: "Thương hiệu: Skin1004\nXuất xứ: Hàn Quốc\nDung tích: 50ml\nLoại da: Mọi loại da, da nhạy cảm\nChỉ số chống nắng: SPF50+ PA++++",
    thanhphan: "Thành phần chính:\n• Chiết xuất rau má Madagascar (35.8%): Giảm sưng mụn, tăng sinh tế bào phục hồi da.\n• Kẽm Oxit & Titanium Dioxide: Bảo vệ vật lý khỏi tia UVA/UVB.\n• Niacinamide: Làm mờ thâm mụn, dưỡng sáng da.",
    hdsd: "Lấy một lượng kem vừa đủ thoa đều khắp mặt và cổ ở bước cuối cùng của chu trình dưỡng da buổi sáng. Nên thoa trước khi ra ngoài 20 phút.",
    tileban: 63,
    khuyenmai: "Bill Skin1004 từ 399k Tặng Kem Rau Má 20ml",
    luachon: [
      { maluachon: 6, mausac: "Mặc định", loai: "Kem chống nắng", dungtich: "50ml", giaban: 252000, soluongton: 25, hinh: "/hinhanh/skin1004_sunscreen.png" }
    ]
  },
  {
    masanpham: 5,
    ten: "Kem Chống Nắng La Roche-Posay",
    danhMuc: "Chống nắng",
    gia: 389000,
    giagoc: null,
    ton: 15,
    hinh: "/hinhanh/laroche_posay_sunscreen.png",
    moTa: "Kem chống nắng La Roche-Posay Anthelios UVMune 400 SPF50+ bảo vệ da phổ rộng tối đa khỏi tia UVA bước sóng dài, kiềm dầu vượt trội đến 12h, thích hợp cho da dầu mụn nhạy cảm. Công nghệ màng lọc độc quyền Mexoryl 400 bảo vệ da tối ưu nhất.",
    thongso: "Thương hiệu: La Roche-Posay\nXuất xứ: Pháp\nDung tích: 50ml\nLoại da: Da dầu mụn, da nhạy cảm\nKết cấu: Dạng kem lỏng khô thoáng",
    thanhphan: "Thành phần chính:\n• Màng lọc độc quyền Mexoryl 400: Ngăn tia UVA dài bước sóng từ 380-400nm.\n• Hoạt chất Airlicium: Kiểm soát bã nhờn, mồ hôi, giữ mặt ráo mịn 12 giờ.\n• Nước khoáng nhiệt La Roche-Posay: Làm dịu mẩn đỏ.",
    hdsd: "Thoa kem chống nắng mỗi ngày vào buổi sáng. Thoa lại sau mỗi 2 tiếng hoạt động ngoài trời nắng gắt hoặc sau khi bơi lội.",
    tileban: 59,
    khuyenmai: "Bill La Roche-posay 499k tặng Xịt khoáng 50ml",
    luachon: [
      { maluachon: 7, mausac: "Mặc định", loai: "Kem chống nắng", dungtich: "50ml", giaban: 389000, soluongton: 15, hinh: "/hinhanh/laroche_posay_sunscreen.png" }
    ]
  },
  {
    masanpham: 6,
    ten: "Sữa Chống Nắng Anessa Kiềm Dầu",
    danhMuc: "Chống nắng",
    gia: 428000,
    giagoc: null,
    ton: 28,
    hinh: "/hinhanh/anessa_sunscreen.png",
    moTa: "Sữa chống nắng dưỡng da kiềm dầu bảo vệ hoàn hảo Anessa Perfect UV Sunscreen Skincare Milk N SPF50+ PA++++ sở hữu công nghệ Auto Booster giúp chống trôi trong nước, mồ hôi và nhiệt độ cao, bảo vệ da vượt trội suốt cả ngày.",
    thongso: "Thương hiệu: Anessa\nXuất xứ: Nhật Bản\nDung tích: 60ml\nLoại da: Da dầu, da hỗn hợp\nKết cấu: Dạng sữa mỏng nhẹ nâng tông tự nhiên",
    thanhphan: "Thành phần chính:\n• Công nghệ Auto Booster: Màng bảo vệ vững chắc hơn khi tiếp xúc với nhiệt độ, độ ẩm, mồ hôi và nước.\n• Phức hợp dưỡng da 50%: Trà xanh, Hoa vàng, Axit Hyaluronic dưỡng ẩm sâu ngừa lão hóa.",
    hdsd: "Lắc đều trước khi sử dụng. Thoa đều một lượng vừa đủ lên vùng mặt và cổ trước khi tiếp xúc với ánh nắng mặt trời.",
    tileban: 20,
    khuyenmai: "Mua Anessa tặng kèm tuýp sữa chống nắng 12ml",
    luachon: [
      { maluachon: 8, mausac: "Mặc định", loai: "Kem chống nắng", dungtich: "60ml", giaban: 428000, soluongton: 18, hinh: "/hinhanh/anessa_sunscreen.png" }
    ]
  },
  {
    masanpham: 7,
    ten: "Nước Tẩy Trang Bioderma Hồng",
    danhMuc: "Làm sạch",
    gia: 361000,
    giagoc: null,
    ton: 55,
    hinh: "/hinhanh/bioderma_micellar.png",
    moTa: "Nước tẩy trang Bioderma Sensibio H2O Micellar Water dành cho da nhạy cảm giúp tẩy sạch lớp trang điểm hiệu quả mà vẫn bảo vệ lớp màng lipid tự nhiên của làn da, không gây châm chích hay kích ứng da mặt.",
    thongso: "Thương hiệu: Bioderma\nXuất xứ: Pháp\nDung tích: 500ml\nLoại da: Da nhạy cảm, da thường\nKết cấu: Dạng nước Micellar dịu nhẹ",
    thanhphan: "Thành phần chính:\n• Các hạt Micelle: Hút dầu thừa, bụi trang điểm mà vẫn nâng niu lớp màng Hydrolipid của da.\n• Chiết xuất dưa leo: Làm dịu sưng tấy mẩn đỏ.",
    hdsd: "Thấm dung dịch ra bông cotton và lau nhẹ nhàng toàn mặt cho tới khi miếng bông sạch hoàn toàn. Có thể không cần rửa lại với nước.",
    tileban: 80,
    khuyenmai: "Bill 399K Bioderma Tặng Kèm Tẩy Trang 100ml",
    luachon: [
      { maluachon: 9, mausac: "Mặc định", loai: "Tẩy trang", dungtich: "500ml", giaban: 361000, soluongton: 35, hinh: "/hinhanh/bioderma_micellar.png" }
    ]
  },
  {
    masanpham: 8,
    ten: "Serum dưỡng ẩm Hồng Xinh",
    danhMuc: "Chăm sóc da",
    gia: 320000,
    giagoc: null,
    ton: 22,
    hinh: "/hinhanh/hongxinh_serum.png",
    moTa: "Serum dưỡng ẩm sâu Hồng Xinh giúp nuôi dưỡng làn da trắng hồng tự nhiên, bổ sung collagen giúp trẻ hóa làn da và ngăn ngừa nếp nhăn hiệu quả.",
    thongso: "Thương hiệu: Hồng Xinh\nXuất xứ: Việt Nam\nDung tích: 30ml\nLoại da: Mọi loại da\nKết cấu: Dạng serum đậm đặc",
    thanhphan: "Thành phần chính:\n• Collagen tươi: Tăng sinh liên kết nâng cơ, làm căng mọng da.\n• Hyaluronic Acid: Giữ ẩm sâu đa tầng ngăn ngừa bong tróc.\n• Vitamin E & Chiết xuất rau má: Chống oxy hóa vượt trội.",
    hdsd: "Thoa đều 2-3 giọt serum lên mặt sau bước rửa mặt sạch vào buổi tối, massage nhẹ nhàng.",
    tileban: 35,
    khuyenmai: "Tặng kèm 1 mặt nạ giấy cho mỗi đơn hàng",
    luachon: [
      { maluachon: 10, mausac: "Mặc định", loai: "Serum", dungtich: "30ml", giaban: 320000, soluongton: 22, hinh: "/hinhanh/hongxinh_serum.png" }
    ]
  },
  {
    masanpham: 9,
    ten: "Kem Dưỡng Phục Hồi La Roche-Posay B5+",
    danhMuc: "Chăm sóc da",
    gia: 345000,
    giagoc: null,
    ton: 30,
    hinh: "/hinhanh/laroche_posay_b5_cream.png",
    moTa: "Kem dưỡng làm dịu, phục hồi và bảo vệ da La Roche-Posay Cicaplast Baume B5+ chứa bơ hạt mỡ, Panthenol 5% và phức hợp lợi khuẩn Tribioma giúp phục hồi hàng rào bảo vệ da nhanh chóng chỉ sau 1 giờ.",
    thongso: "Thương hiệu: La Roche-Posay\nXuất xứ: Pháp\nDung tích: 40ml\nLoại da: Da nhạy cảm, da đang điều trị phục hồi\nKết cấu: Dạng kem đặc mịn",
    thanhphan: "Thành phần chính:\n• Panthenol 5% (B5): Xoa dịu nhanh cảm giác ngứa rát, đỏ da do tổn thương.\n• Madecassoside: Thúc đẩy chu trình tái sinh biểu bì da.\n• Phức hợp lợi khuẩn Tribioma: Cân bằng hệ vi sinh trên da, ngừa sẹo rỗ mụn.",
    hdsd: "Thoa một lượng vừa đủ lên làn da sạch 2 lần mỗi ngày. Tránh vùng mắt và môi.",
    tileban: 45,
    khuyenmai: "Phục hồi cấp tốc cho da tổn thương",
    luachon: [
      { maluachon: 11, mausac: "Mặc định", loai: "Kem dưỡng", dungtich: "40ml", giaban: 345000, soluongton: 30, hinh: "/hinhanh/laroche_posay_b5_cream.png" }
    ]
  },
  {
    masanpham: 10,
    ten: "Kem Dưỡng Sáng Da L'Oreal Glycolic-Bright",
    danhMuc: "Chăm sóc da",
    gia: 290000,
    giagoc: null,
    ton: 25,
    hinh: "/hinhanh/loreal_glycolic_cream.png",
    moTa: "Kem dưỡng ngày làm sáng da L'Oreal Paris Glycolic-Bright Glowing Cream SPF17 chứa Glycolic Acid (AHA) và Niacinamide giúp giảm thâm nám, đều màu da hiệu quả trong 14 ngày sử dụng liên tục.",
    thongso: "Thương hiệu: L'Oreal\nXuất xứ: Pháp\nDung tích: 50ml\nLoại da: Mọi loại da, da xỉn màu\nKết cấu: Dạng kem mỏng nhẹ có chỉ số chống nắng",
    thanhphan: "Thành phần chính:\n• Glycolic Acid (AHA): Tẩy da chết hóa học dịu nhẹ, tăng đào thải tế bào thâm sạm.\n• Symwhite: Ức chế melanin giảm nám sạm vượt trội.\n• Niacinamide: Cải thiện sắc tố mờ thâm mụn.",
    hdsd: "Thoa đều lên vùng da mặt và cổ đã được làm sạch mỗi buổi sáng. Massage nhẹ nhàng để dưỡng chất thấm đều.",
    tileban: 28,
    khuyenmai: "Siêu sale hè giảm sâu 27%",
    luachon: [
      { maluachon: 12, mausac: "Mặc định", loai: "Kem dưỡng", dungtich: "50ml", giaban: 290000, soluongton: 25, hinh: "/hinhanh/loreal_glycolic_cream.png" }
    ]
  },
  {
    masanpham: 11,
    ten: "Dưỡng Chất Khoáng Vichy Mineral 89",
    danhMuc: "Chăm sóc da",
    gia: 620000,
    giagoc: null,
    ton: 15,
    hinh: "/hinhanh/vichy_mineral_89.png",
    moTa: "Dưỡng chất khoáng cô đặc Vichy Mineral 89 chứa đến 89% nước khoáng núi lửa Vichy cô đặc kết hợp với Hyaluronic Acid tự nhiên giúp củng cố hàng rào bảo vệ da, cho da mịn màng, căng mọng đầy sức sống.",
    thongso: "Thương hiệu: Vichy\nXuất xứ: Pháp\nDung tích: 50ml\nLoại da: Mọi loại da, kể cả da nhạy cảm\nKết cấu: Dạng gel trong suốt mát rượi",
    thanhphan: "Thành phần chính:\n• 89% Nước khoáng Vichy cô đặc: Giàu 15 loại khoáng chất quý nuôi dưỡng da vững chắc.\n• Hyaluronic Acid 0.4%: Cấp ẩm và chống khô da do điều hòa.",
    hdsd: "Sử dụng 2 lần mỗi ngày (sáng/tối) sau bước toner. Lấy 1-2 nhấn vỗ đều khắp mặt.",
    tileban: 12,
    khuyenmai: "Vichy chính hãng tặng quà sang xịn",
    luachon: [
      { maluachon: 13, mausac: "Mặc định", loai: "Gel dưỡng khoáng", dungtich: "50ml", giaban: 620000, soluongton: 15, hinh: "/hinhanh/vichy_mineral_89.png" }
    ]
  },
  {
    masanpham: 12,
    ten: "Tẩy Tế Bào Chết Cà Phê Cocoon",
    danhMuc: "Làm sạch",
    gia: 115000,
    giagoc: null,
    ton: 35,
    hinh: "/hinhanh/cocoon_coffee_scrub.png",
    moTa: "Tẩy tế bào chết da mặt Cocoon từ hạt cà phê Đắk Lắk xay nhuyễn hòa quyện cùng bơ ca cao Tiền Giang giúp làm sạch tế bào chết hiệu quả mà không gây khô rát, mang lại làn da mịn màng tươi sáng.",
    thongso: "Thương hiệu: Cocoon\nXuất xứ: Việt Nam\nDung tích: 150ml\nLoại da: Mọi loại da\nKết cấu: Dạng kem đặc chứa hạt cà phê mịn",
    thanhphan: "Thành phần chính:\n• Hạt cà phê Đắk Lắk: Xay mịn, cuốn trôi tế bào sần sùi mà không làm trầy xước da.\n• Bơ ca cao Tiền Giang: Dưỡng ẩm mềm mịn da sau khi tẩy.",
    hdsd: "Thoa một lượng vừa đủ lên da mặt ướt. Massage nhẹ nhàng 2-3 phút theo vòng tròn rồi rửa sạch lại với nước.",
    tileban: 75,
    khuyenmai: "Mua 2 hũ Cocoon tặng kèm băng đô tai mèo",
    luachon: [
      { maluachon: 14, mausac: "Mặc định", loai: "Tẩy tế bào chết", dungtich: "150ml", giaban: 115000, soluongton: 35, hinh: "/hinhanh/cocoon_coffee_scrub.png" }
    ]
  },
  {
    masanpham: 13,
    ten: "Kem Dưỡng Làm Dịu Da Ban Đêm Klairs Blue",
    danhMuc: "Chăm sóc da",
    gia: 345000,
    giagoc: null,
    ton: 20,
    hinh: "/hinhanh/kemduong.png",
    moTa: "Kem dưỡng làm dịu da ban đêm Klairs Midnight Blue Calming Cream chứa chiết xuất Guaiazulene (từ dầu hoa cúc) tạo màu xanh dương độc đáo, giúp giảm đỏ, làm dịu da kích ứng và phục hồi da sau tổn thương.",
    thongso: "Thương hiệu: Klairs\nXuất xứ: Hàn Quốc\nDung tích: 30ml\nLoại da: Da nhạy cảm, da dễ kích ứng\nKết cấu: Dạng kem mượt màu xanh dương nhạt",
    thanhphan: "Thành phần chính:\n• Guaiazulene (Hoa cúc La Mã): Hoạt chất chống sưng viêm đỏ da do kích ứng mỹ phẩm.\n• Chiết xuất rau má: Phục hồi và làm lành màng chắn da.",
    hdsd: "Sử dụng vào buổi tối ở bước cuối cùng của chu trình dưỡng da. Thoa một lớp mỏng lên vùng da nhạy cảm hoặc toàn mặt.",
    tileban: 52,
    khuyenmai: "Kem dưỡng cứu cánh cho da nhạy cảm",
    luachon: [
      { maluachon: 15, mausac: "Mặc định", loai: "Kem dưỡng", dungtich: "30ml", giaban: 345000, soluongton: 20, hinh: "/hinhanh/kemduong.png" }
    ]
  },
  {
    masanpham: 14,
    ten: "Sữa Rửa Mặt Dịu Lành Cetaphil",
    danhMuc: "Làm sạch",
    gia: 280000,
    giagoc: null,
    ton: 90,
    hinh: "/hinhanh/suaruamat.png",
    moTa: "Sữa rửa mặt dịu lành cho da nhạy cảm Cetaphil Gentle Skin Cleanser ứng dụng công nghệ Micellar giúp làm sạch bụi bẩn, lớp trang điểm nhẹ mà không gây khô da, duy trì độ ẩm tự nhiên cho da lành mạnh.",
    thongso: "Thương hiệu: Cetaphil\nXuất xứ: Mỹ\nDung tích: 500ml\nLoại da: Da khô, da nhạy cảm\nKết cấu: Dạng gel sữa đục, không tạo bọt nhiều",
    thanhphan: "Thành phần chính:\n• Niacinamide (B3) & Panthenol (B5): Củng cố hàng rào lipid cho da nhạy cảm.\n• Glycerin: Cấp nước dịu mát tránh châm chích.",
    hdsd: "Có thể dùng khô (lau sạch bằng khăn mềm sau khi massage) hoặc dùng ướt với nước thông thường.",
    tileban: 90,
    khuyenmai: "Chăm sóc làn da nhạy cảm đạt chuẩn y khoa",
    luachon: []
  },
  {
    masanpham: 15,
    ten: "Son Lì MAC Ruby Woo",
    danhMuc: "Trang điểm",
    gia: 580000,
    giagoc: null,
    ton: 20,
    hinh: "/hinhanh/son.png",
    moTa: "Son lì MAC Ruby Woo là dòng son huyền thoại được ưa chuộng với màu đỏ cherry đậm kinh định. Chất son mịn, bám màu cả ngày, tôn da.",
    thongso: "Thương hiệu: MAC Cosmetics\nXuất xứ: Canada\nDung tích: 3g\nLoại: Son lì",
    thanhphan: "Thành phần chính:\n• Silica: Tạo kết cấu lì mịn lâu trôi.\n• Beeswax (Sáp ong): Giữ ẩm môi tự nhiên.",
    hdsd: "Thoa son từ tâm môi ra ngoài, lớp đầu nhẹ rồi tiếp theo đè lớp thứ hai để màu đậm hơn.",
    tileban: 72,
    khuyenmai: "Mua 1 tặng 1 túi vải MAC chính hãng",
    luachon: [
      { maluachon: 16, mausac: "Ruby Woo", loai: "Son lì", dungtich: "3g", giaban: 580000, soluongton: 20, hinh: "/hinhanh/son.png" }
    ]
  },
  {
    masanpham: 16,
    ten: "Son Kem 3CE Soft Lip Color",
    danhMuc: "Trang điểm",
    gia: 320000,
    giagoc: null,
    ton: 30,
    hinh: "/hinhanh/son_3ce_lipstick.png",
    moTa: "Son kem lì 3CE Soft Lip Color mang đến bộ sưu tập màu sắc đa dạng theo xu hướng Hàn Quốc, kết cấu kem nhẹ bám màu lên đến 8 tiếng, không khô môi.",
    thongso: "Thương hiệu: 3CE (3 Concept Eyes)\nXuất xứ: Hàn Quốc\nDung tích: 4g\nLoại: Son kem lì",
    thanhphan: "Thành phần chính:\n• Hyaluronic Acid: Dưỡng ẩm môi sâu.\n• Dimethicone: Giữ màu bền lâu.",
    hdsd: "Lăn đều đầu cọ từ trung tâm ra ngoài. Nhấn nhẹ môi để màu bão hòa.",
    tileban: 88,
    khuyenmai: "Mua 2 cây son 3CE giảm thêm 50K",
    luachon: [
      { maluachon: 17, mausac: "Nhiều màu", loai: "Son kem", dungtich: "4g", giaban: 320000, soluongton: 30, hinh: "/hinhanh/son_3ce_lipstick.png" }
    ]
  }
];
