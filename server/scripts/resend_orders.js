const { sendOrderConfirmationEmail } = require('../utils/email');
const mysql = require('mysql2/promise');

async function resendOrders() {
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

  const orderIds = [52, 53];
  for (const id of orderIds) {
    const [orderRows] = await conn.query('SELECT * FROM donhang WHERE madonhang = ?', [id]);
    if (!orderRows.length) continue;
    const order = orderRows[0];

    const [items] = await conn.query(
      `SELECT ct.*, sp.tensanpham, lc.mausac, lc.loai, lc.dungtich
       FROM chitietdonhang ct
       JOIN sanpham sp ON ct.masanpham = sp.masanpham
       LEFT JOIN luachon_sanpham lc ON ct.maluachon = lc.maluachon
       WHERE ct.madonhang = ?`,
      [id]
    );

    console.log(`Sending confirmation email for Order #${id} to hoh119004@gmail.com...`);
    const success = await sendOrderConfirmationEmail(order, items, 'hoh119004@gmail.com');
    console.log(`Order #${id} result:`, success ? 'SUCCESS!' : 'FAILED!');
  }

  await conn.end();
  process.exit(0);
}

resendOrders().catch(console.error);
