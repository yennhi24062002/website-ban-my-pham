const mysql = require('mysql2/promise');
const { sendOrderConfirmationEmail } = require('../utils/email');

async function debug56() {
  process.env.EMAIL_USER = 'phamyennhi2462002@gmail.com';
  process.env.EMAIL_PASS = 'lilbbuxhaoswthgu';

  const conn = await mysql.createConnection({
    host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
    user: 'MnEmxApLYZrnqQq.root',
    password: 'N8qrFKganU510LcW',
    database: 'website_ban_my_pham',
    port: 4000,
    ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: false }
  });

  const [orders] = await conn.query('SELECT * FROM donhang WHERE madonhang = 56');
  console.log('Order 56 DB row:', orders);

  if (orders.length > 0) {
    const order = orders[0];
    const [items] = await conn.query(
      `SELECT ct.*, sp.tensanpham, lc.mausac, lc.loai, lc.dungtich
       FROM chitietdonhang ct
       JOIN sanpham sp ON ct.masanpham = sp.masanpham
       LEFT JOIN luachon_sanpham lc ON ct.maluachon = lc.maluachon
       WHERE ct.madonhang = 56`
    );

    console.log('Order 56 items:', items);
    console.log('Attempting sendOrderConfirmationEmail for Order 56 to hoh119004@gmail.com...');
    const result = await sendOrderConfirmationEmail(order, items, 'hoh119004@gmail.com');
    console.log('Result for 56:', result ? 'SUCCESS!' : 'FAILED!');
  } else {
    console.log('Order 56 does not exist in DB yet.');
  }

  await conn.end();
  process.exit(0);
}

debug56().catch(console.error);
