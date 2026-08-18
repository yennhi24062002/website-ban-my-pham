const mysql = require('mysql2/promise');

async function syncAll() {
  const conn = await mysql.createConnection({
    host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
    user: 'MnEmxApLYZrnqQq.root',
    password: 'N8qrFKganU510LcW',
    database: 'website_ban_my_pham',
    port: 4000,
    ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: false }
  });

  // 1. Them cot ma_serial vao voucher_nguoidung (neu chua co)
  try {
    await conn.query(`ALTER TABLE voucher_nguoidung ADD COLUMN ma_serial VARCHAR(50)`);
    console.log('✅ Added ma_serial column');
    // Them unique index rieng (TiDB khong ho tro UNIQUE khi ADD COLUMN)
    try {
      await conn.query(`ALTER TABLE voucher_nguoidung ADD UNIQUE INDEX idx_ma_serial (ma_serial)`);
      console.log('✅ Added UNIQUE index on ma_serial');
    } catch(e2) { console.log('Index note:', e2.message); }
  } catch(e) {
    if (e.message.includes('Duplicate column') || e.message.includes('already exists') || e.code === 'ER_DUP_FIELDNAME') {
      console.log('⚠️ ma_serial column already exists');
    } else { console.log('ma_serial err:', e.message); }
  }

  // 2. Cap nhat ma_serial cho cac voucher_nguoidung hien co
  const [voucherRows] = await conn.query('SELECT mavoucher_nd, ma_serial FROM voucher_nguoidung');
  for (const v of voucherRows) {
    if (!v.ma_serial) {
      const serial = 'VC-' + Math.random().toString(36).substr(2, 8).toUpperCase();
      await conn.query('UPDATE voucher_nguoidung SET ma_serial = ? WHERE mavoucher_nd = ?', [serial, v.mavoucher_nd]);
      console.log(`  Set serial ${serial} for mavoucher_nd=${v.mavoucher_nd}`);
    }
  }
  console.log('✅ Updated ma_serial for existing voucher records');

  // 3. Them 2 san pham son vao TiDB (madanhmuc=2 = Trang diem)
  // Kiem tra da co san pham son chua
  const [sonCheck] = await conn.query("SELECT masanpham FROM sanpham WHERE tensanpham LIKE '%Son%'");
  if (sonCheck.length === 0) {
    // Son Li MAC Ruby Woo (madanhmuc=2 Trang diem, mathuonghieu=5 MAC)
    // Kiem tra thuonghieu MAC
    let [macBrand] = await conn.query("SELECT mathuonghieu FROM thuonghieu WHERE tenthuonghieu LIKE '%MAC%'");
    let macId = macBrand[0]?.mathuonghieu;
    if (!macId) {
      const [ins] = await conn.query("INSERT INTO thuonghieu (tenthuonghieu, mota) VALUES ('MAC Cosmetics', 'Thương hiệu mỹ phẩm MAC Canada')");
      macId = ins.insertId;
      console.log('  Added MAC brand, id=', macId);
    }

    let [cceBrand] = await conn.query("SELECT mathuonghieu FROM thuonghieu WHERE tenthuonghieu LIKE '%3CE%'");
    let cceId = cceBrand[0]?.mathuonghieu;
    if (!cceId) {
      const [ins] = await conn.query("INSERT INTO thuonghieu (tenthuonghieu, mota) VALUES ('3CE (3 Concept Eyes)', 'Thương hiệu mỹ phẩm Hàn Quốc')");
      cceId = ins.insertId;
      console.log('  Added 3CE brand, id=', cceId);
    }

    // Them Son Li MAC
    const [mac] = await conn.query(`
      INSERT INTO sanpham (madanhmuc, mathuonghieu, tensanpham, giaban, giagoc, hinhanh, mota, thongso, thanhphan, hdsd, tileban, khuyenmai, trangthai)
      VALUES (2, ?, 'Son Li MAC Ruby Woo', 580000, NULL,
        '/hinhanh/son.png',
        'Son li MAC Ruby Woo là dòng son huyền thoại của MAC Cosmetics, được ưa chuộng suốt nhiều thập kỷ với màu đỏ cherry đậm kinh điển. Chất son mịn, bám màu cả ngày, tôn da và phù hợp với mọi tông màu da.',
        'Thương hiệu: MAC Cosmetics\nXuất xứ: Canada\nDung tích: 3g\nLoại: Son lì không bóng\nKết cấu: Dạng thỏi mịn đậm màu',
        'Thành phần chính:\n• Silica: Tạo kết cấu lì mịn lâu trôi.\n• Beeswax (Sáp ong): Giữ ẩm môi tự nhiên.\n• Vitamin E: Dưỡng ẩm, làm mềm môi.',
        'Lăn đầu cọ từ trung tâm ra ngoài, lớp đầu có thể mỏng rồi đè thêm lớp thứ hai để màu đậm hơn.',
        0, 'Son lì cổ điển huyền thoại', 'dangban')
    `, [macId]);
    const macSP = mac.insertId;
    await conn.query(`INSERT INTO tonkho (masanpham, soluongton, soluongtoithieu, ghichu) VALUES (?, 20, 3, 'Son MAC')`, [macSP]);
    await conn.query(`INSERT INTO luachon_sanpham (masanpham, mausac, loai, dungtich, giaban, soluongton, hinhanh, trangthai) VALUES (?, 'Ruby Woo', 'Son lì', '3g', 580000, 20, '/hinhanh/son.png', 'dangban')`, [macSP]);
    console.log('✅ Added Son Li MAC Ruby Woo, masanpham=', macSP);

    // Them Son Kem 3CE
    const [cce] = await conn.query(`
      INSERT INTO sanpham (madanhmuc, mathuonghieu, tensanpham, giaban, giagoc, hinhanh, mota, thongso, thanhphan, hdsd, tileban, khuyenmai, trangthai)
      VALUES (2, ?, 'Son Kem 3CE Soft Lip Color', 320000, NULL,
        '/hinhanh/son_3ce_lipstick.png',
        'Son kem 3CE Soft Lip Color mang đến bộ sưu tập màu sắc đa dạng theo xu hướng Hàn Quốc, kết cấu kem nhẹ bám màu lên đến 8 tiếng, không khô môi.',
        'Thương hiệu: 3CE (3 Concept Eyes)\nXuất xứ: Hàn Quốc\nDung tích: 4g\nLoại: Son kem lì\nKết cấu: Dạng kem mỏng nhẹ không bóng',
        'Thành phần chính:\n• Hyaluronic Acid: Dưỡng ẩm môi sâu, ngừa khô nứt.\n• Dimethicone: Tạo lớp phủ mịn, giữ màu bền lâu.',
        'Lần đầu cọ từ trung tâm ra ngoài, lớp đầu co tự nhiên làm nền, đè lớp thứ hai để màu bão hòa.',
        0, 'Son kem Hàn Quốc bán chạy nhất', 'dangban')
    `, [cceId]);
    const cceSP = cce.insertId;
    await conn.query(`INSERT INTO tonkho (masanpham, soluongton, soluongtoithieu, ghichu) VALUES (?, 30, 3, 'Son 3CE')`, [cceSP]);
    await conn.query(`INSERT INTO luachon_sanpham (masanpham, mausac, loai, dungtich, giaban, soluongton, hinhanh, trangthai) VALUES (?, 'Nhiều màu', 'Son kem', '4g', 320000, 30, '/hinhanh/son_3ce_lipstick.png', 'dangban')`, [cceSP]);
    console.log('✅ Added Son Kem 3CE, masanpham=', cceSP);
  } else {
    console.log('⚠️ Son products already exist:', sonCheck.map(r=>r.masanpham));
  }

  // 4. Kiem tra tong ket
  const [all] = await conn.query('SELECT masanpham, tensanpham, hinhanh FROM sanpham ORDER BY masanpham');
  console.log('\n=== TẤT CẢ SẢN PHẨM (' + all.length + ') ===');
  all.forEach(r => console.log(' ', r.masanpham, '|', r.tensanpham, '|', r.hinhanh));

  const [vAll] = await conn.query('SELECT mavoucher_nd, ma_serial, mavoucher, manguoidung FROM voucher_nguoidung');
  console.log('\n=== VOUCHER_NGUOIDUNG ===');
  vAll.forEach(r => console.log(' ', r.mavoucher_nd, '| Serial:', r.ma_serial, '| user:', r.manguoidung));

  await conn.end();
}
syncAll().catch(console.error);
