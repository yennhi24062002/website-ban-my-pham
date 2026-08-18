const mysql = require('mysql2/promise');

async function addSonVariants() {
  const conn = await mysql.createConnection({
    host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
    user: 'MnEmxApLYZrnqQq.root',
    password: 'N8qrFKganU510LcW',
    database: 'website_ban_my_pham',
    port: 4000,
    ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: false }
  });

  // Cap nhat ten mausac cua variant cu cho Son MAC (maluachon=16)
  await conn.query("UPDATE luachon_sanpham SET mausac = 'Ruby Woo' WHERE maluachon = 16");
  console.log('Updated MAC variant 16 -> Ruby Woo');

  // Them them mau moi cho Son MAC (masanpham=15)
  const macNew = [
    [15, 'Russian Red', 'Son lì', '3g', 580000, 12, '/hinhanh/son.png'],
    [15, 'Diva', 'Son lì', '3g', 580000, 10, '/hinhanh/son.png'],
  ];
  for (const v of macNew) {
    const [r] = await conn.query(
      "INSERT INTO luachon_sanpham (masanpham, mausac, loai, dungtich, giaban, soluongton, hinhanh, trangthai) VALUES (?,?,?,?,?,?,?,'dangban')",
      v
    );
    console.log('Added MAC variant:', v[1], 'id:', r.insertId);
  }

  // Cap nhat ten mausac cua variant cu cho Son 3CE (maluachon=17)
  await conn.query("UPDATE luachon_sanpham SET mausac = 'Denim' WHERE maluachon = 17");
  console.log('Updated 3CE variant 17 -> Denim');

  // Them them mau moi cho Son 3CE (masanpham=16)
  const cceNew = [
    [16, 'Over Dose', 'Son kem', '4g', 320000, 12, '/hinhanh/son_3ce_lipstick.png'],
    [16, 'Berry', 'Son kem', '4g', 320000, 10, '/hinhanh/son_3ce_lipstick.png'],
    [16, 'Coral', 'Son kem', '4g', 320000, 8, '/hinhanh/son_3ce_lipstick.png'],
  ];
  for (const v of cceNew) {
    const [r] = await conn.query(
      "INSERT INTO luachon_sanpham (masanpham, mausac, loai, dungtich, giaban, soluongton, hinhanh, trangthai) VALUES (?,?,?,?,?,?,?,'dangban')",
      v
    );
    console.log('Added 3CE variant:', v[1], 'id:', r.insertId);
  }

  // Ket qua cuoi
  const [all] = await conn.query(
    'SELECT maluachon, masanpham, mausac, loai, dungtich, giaban, soluongton FROM luachon_sanpham WHERE masanpham IN (15,16) ORDER BY masanpham, maluachon'
  );
  console.log('\n=== TẤT CẢ BIẾN THỂ SON ===');
  all.forEach(r => console.log(r.masanpham, '|', r.maluachon, '|', r.mausac, '|', r.giaban));

  await conn.end();
}
addSonVariants().catch(console.error);
