const mysql = require('mysql2/promise');

async function cleanSeed() {
  const conn = await mysql.createConnection({
    host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
    user: 'MnEmxApLYZrnqQq.root',
    password: 'N8qrFKganU510LcW',
    database: 'website_ban_my_pham',
    port: 4000,
    ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: false }
  });

  // Lay ID khuyen mai cua 2 dot mau ("Siêu Sale Hè" va "Ưu Đãi Đặc Biệt")
  const [seedRows] = await conn.query(
    "SELECT makhuyenmai FROM khuyenmai WHERE tenkhuyenmai IN ('Siêu Sale Hè', 'Ưu Đãi Đặc Biệt')"
  );

  if (seedRows.length > 0) {
    const ids = seedRows.map(r => r.makhuyenmai);
    await conn.query(`DELETE FROM sanpham_khuyenmai WHERE makhuyenmai IN (${ids.join(',')})`);
    await conn.query(`DELETE FROM khuyenmai WHERE makhuyenmai IN (${ids.join(',')})`);
    console.log('✅ Đã xóa 2 chiến dịch thử nghiệm mẫu ("Siêu Sale Hè" & "Ưu Đãi Đặc Biệt")');
  } else {
    console.log('Không thấy chiến dịch mẫu.');
  }

  const [current] = await conn.query("SELECT * FROM khuyenmai");
  console.log('Các chiến dịch hiện tại trong DB:', current);

  await conn.end();
}

cleanSeed().catch(console.error);
