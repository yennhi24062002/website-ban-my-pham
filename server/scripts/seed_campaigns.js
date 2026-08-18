const mysql = require('mysql2/promise');

async function seedCampaigns() {
  const conn = await mysql.createConnection({
    host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
    user: 'MnEmxApLYZrnqQq.root',
    password: 'N8qrFKganU510LcW',
    database: 'website_ban_my_pham',
    port: 4000,
    ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: false }
  });

  // 1. Cleardown old test campaigns if any
  await conn.query('DELETE FROM sanpham_khuyenmai');
  await conn.query('DELETE FROM khuyenmai');

  // 2. Create Campaign 1: "Siêu Sale Hè" - Giảm 20% (ngaybatdau = NOW() - 1 day, ngayketthuc = NOW() + 30 days)
  const [km1] = await conn.query(`
    INSERT INTO khuyenmai (tenkhuyenmai, phantramgiam, ngaybatdau, ngayketthuc, trangthai)
    VALUES ('Siêu Sale Hè', 20, DATE_SUB(NOW(), INTERVAL 1 DAY), DATE_ADD(NOW(), INTERVAL 30 DAY), 'hoatdong')
  `);
  const km1Id = km1.insertId;

  // Gan cho sanpham 1 (Cocoon), 15 (Son MAC), 16 (Son 3CE)
  await conn.query('INSERT INTO sanpham_khuyenmai (masanpham, makhuyenmai) VALUES (1, ?), (15, ?), (16, ?)', [km1Id, km1Id, km1Id]);
  console.log('✅ Created Campaign 1: Siêu Sale Hè (-20%) for products 1, 15, 16');

  // 3. Create Campaign 2: "Ưu Đãi Đặc Biệt" - Giảm 15%
  const [km2] = await conn.query(`
    INSERT INTO khuyenmai (tenkhuyenmai, phantramgiam, ngaybatdau, ngayketthuc, trangthai)
    VALUES ('Ưu Đãi Đặc Biệt', 15, DATE_SUB(NOW(), INTERVAL 1 DAY), DATE_ADD(NOW(), INTERVAL 30 DAY), 'hoatdong')
  `);
  const km2Id = km2.insertId;

  // Gan cho sanpham 2 (Klairs), 4 (Skin1004), 5 (La Roche)
  await conn.query('INSERT INTO sanpham_khuyenmai (masanpham, makhuyenmai) VALUES (2, ?), (4, ?), (5, ?)', [km2Id, km2Id, km2Id]);
  console.log('✅ Created Campaign 2: Ưu Đãi Đặc Biệt (-15%) for products 2, 4, 5');

  await conn.end();
}

seedCampaigns().catch(console.error);
