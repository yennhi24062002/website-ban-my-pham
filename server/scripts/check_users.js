const mysql = require('mysql2/promise');

async function checkUsers() {
  const conn = await mysql.createConnection({
    host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
    user: 'MnEmxApLYZrnqQq.root',
    password: 'N8qrFKganU510LcW',
    database: 'website_ban_my_pham',
    port: 4000,
    ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: false }
  });

  const [users] = await conn.query('SELECT manguoidung, email, vaitro FROM nguoidung');
  console.log('Users in DB:', users);

  const [orders] = await conn.query('SELECT madonhang, manguoidung, tennguoinhan, tongtien, ngaydat FROM donhang ORDER BY madonhang DESC LIMIT 5');
  console.log('Latest 5 orders in DB:', orders);

  await conn.end();
}

checkUsers().catch(console.error);
