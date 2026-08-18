const mysql = require('mysql2/promise');

async function testKM() {
  const db = await mysql.createConnection({
    host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
    user: 'MnEmxApLYZrnqQq.root',
    password: 'N8qrFKganU510LcW',
    database: 'website_ban_my_pham',
    port: 4000,
    ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: false }
  });

  // Kiem tra tat ca khuyenmai
  const [kms] = await db.query('SELECT * FROM khuyenmai');
  console.log('All khuyenmai campaigns:', kms);

  // Kiem tra sanpham_khuyenmai
  const [spkm] = await db.query('SELECT * FROM sanpham_khuyenmai');
  console.log('Product campaigns mapping:', spkm);

  await db.end();
}

testKM().catch(console.error);
