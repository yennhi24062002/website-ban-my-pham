const mysql = require('mysql2/promise');

async function testAdminCampaign() {
  const conn = await mysql.createConnection({
    host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
    user: 'MnEmxApLYZrnqQq.root',
    password: 'N8qrFKganU510LcW',
    database: 'website_ban_my_pham',
    port: 4000,
    ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: false }
  });

  // Tao 1 dot duy nhat: "sieu sale 2026" giam 10% cho masanpham = 5 (La Roche-Posay)
  const [km] = await conn.query(`
    INSERT INTO khuyenmai (tenkhuyenmai, phantramgiam, ngaybatdau, ngayketthuc, trangthai)
    VALUES ('sieu sale 2026', 10, NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY), 'hoatdong')
  `);
  const kmId = km.insertId;

  await conn.query('INSERT INTO sanpham_khuyenmai (masanpham, makhuyenmai) VALUES (5, ?)', [kmId]);
  console.log('✅ Created single admin campaign "sieu sale 2026" for product 5 (La Roche-Posay)');

  await conn.end();
}

testAdminCampaign().catch(console.error);
