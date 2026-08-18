const mysql = require('mysql2/promise');

async function fix() {
  const conn = await mysql.createConnection({
    host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
    user: 'MnEmxApLYZrnqQq.root',
    password: 'N8qrFKganU510LcW',
    database: 'website_ban_my_pham',
    port: 4000,
    ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: false }
  });

  // Drop bang khuyenmai sai, tao lai dung theo SQL goc
  try { await conn.query('DROP TABLE IF EXISTS sanpham_khuyenmai'); console.log('Dropped sanpham_khuyenmai'); } catch(e) { console.log('Drop err:', e.message); }
  try { await conn.query('DROP TABLE IF EXISTS khuyenmai'); console.log('Dropped khuyenmai'); } catch(e) { console.log('Drop err:', e.message); }

  // Tao lai khuyenmai dung theo SQL goc (dung makhuyenmai + phantramgiam)
  await conn.query(`
    CREATE TABLE IF NOT EXISTS khuyenmai (
      makhuyenmai INT AUTO_INCREMENT PRIMARY KEY,
      tenkhuyenmai VARCHAR(255) NOT NULL,
      phantramgiam INT DEFAULT 0,
      ngaybatdau DATETIME NULL,
      ngayketthuc DATETIME NULL,
      trangthai VARCHAR(30) DEFAULT 'hoatdong'
    ) ENGINE=InnoDB
  `);
  console.log('Created khuyenmai with correct SQL schema');

  // Tao lai sanpham_khuyenmai theo SQL goc
  await conn.query(`
    CREATE TABLE IF NOT EXISTS sanpham_khuyenmai (
      masanpham INT NOT NULL,
      makhuyenmai INT NOT NULL,
      PRIMARY KEY (masanpham, makhuyenmai),
      FOREIGN KEY (masanpham) REFERENCES sanpham(masanpham) ON DELETE CASCADE,
      FOREIGN KEY (makhuyenmai) REFERENCES khuyenmai(makhuyenmai) ON DELETE CASCADE
    ) ENGINE=InnoDB
  `);
  console.log('Created sanpham_khuyenmai with correct SQL schema');

  // Hien thi tat ca san pham
  const [sp] = await conn.query('SELECT masanpham, tensanpham, hinhanh FROM sanpham ORDER BY masanpham');
  console.log('\nTAT CA SAN PHAM (' + sp.length + '):');
  sp.forEach(r => console.log(' ', r.masanpham, '|', r.tensanpham, '|', r.hinhanh));

  // Hien thi tat ca voucher
  const [v] = await conn.query('SELECT mavoucher, macode, ten, giatri FROM voucher');
  console.log('\nTAT CA VOUCHER (' + v.length + '):');
  v.forEach(r => console.log(' ', r.mavoucher, '| Code:', r.macode, '|', r.ten, '| Gia tri:', r.giatri));

  await conn.end();
}
fix().catch(console.error);
