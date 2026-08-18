const mysql = require('mysql2/promise');
require('dotenv').config();

async function fix() {
  const conn = await mysql.createConnection({
    host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
    user: 'MnEmxApLYZrnqQq.root',
    password: 'N8qrFKganU510LcW',
    database: 'website_ban_my_pham',
    port: 4000,
    ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: false }
  });

  // Tao bang khuyenmai theo SQL goc (tên đúng là khuyenmai)
  await conn.query(`
    CREATE TABLE IF NOT EXISTS khuyenmai (
      makm INT AUTO_INCREMENT PRIMARY KEY,
      tenkm VARCHAR(255) NOT NULL,
      loai_giamgia ENUM('phan_tram','tien_mat') DEFAULT 'phan_tram',
      mucgiam DECIMAL(12,2) DEFAULT 0,
      ngaybatdau DATETIME NULL,
      ngayketthuc DATETIME NULL,
      trangthai VARCHAR(30) DEFAULT 'dangchay'
    ) ENGINE=InnoDB
  `);
  console.log('✅ Created khuyenmai table');

  // Tao bang sanpham_khuyenmai (ten dung trong SQL goc)
  await conn.query(`
    CREATE TABLE IF NOT EXISTS sanpham_khuyenmai (
      masanpham INT NOT NULL,
      makm INT NOT NULL,
      PRIMARY KEY (masanpham, makm),
      FOREIGN KEY (masanpham) REFERENCES sanpham(masanpham) ON DELETE CASCADE,
      FOREIGN KEY (makm) REFERENCES khuyenmai(makm) ON DELETE CASCADE
    ) ENGINE=InnoDB
  `);
  console.log('✅ Created sanpham_khuyenmai table');

  // Test products query
  const [rows] = await conn.query(`
    SELECT p.masanpham, p.tensanpham, p.giaban, dm.tendanhmuc
    FROM sanpham p
    JOIN danhmuc dm ON dm.madanhmuc = p.madanhmuc
    LEFT JOIN thuonghieu th ON th.mathuonghieu = p.mathuonghieu
    LEFT JOIN tonkho tk ON tk.masanpham = p.masanpham
    LEFT JOIN sanpham_khuyenmai ks ON p.masanpham = ks.masanpham
    LEFT JOIN khuyenmai k ON ks.makm = k.makm AND k.trangthai = 'dangchay' AND NOW() BETWEEN k.ngaybatdau AND k.ngayketthuc
    ORDER BY p.masanpham ASC
  `);
  console.log('✅ Products query OK, count:', rows.length);
  rows.forEach(r => console.log(' -', r.masanpham, r.tensanpham));

  await conn.end();
}

fix().catch(console.error);
