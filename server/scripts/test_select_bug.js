const mysql = require('mysql2/promise');

async function testSelectBug() {
  const db = await mysql.createConnection({
    host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
    user: 'MnEmxApLYZrnqQq.root',
    password: 'N8qrFKganU510LcW',
    database: 'website_ban_my_pham',
    port: 4000,
    ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: false }
  });

  const [rowsOld] = await db.query(
    `SELECT p.*, tk.soluongton
     FROM sanpham p
     LEFT JOIN tonkho tk ON tk.masanpham = p.masanpham
     WHERE p.masanpham = 16`
  );
  console.log('Old Query Row for Product 16:', rowsOld[0]);

  const [rowsNew] = await db.query(
    `SELECT p.masanpham, p.madanhmuc, p.mathuonghieu, p.tensanpham, p.giaban, p.giagoc, p.hinhanh, p.mota, p.thongso, p.thanhphan, p.hdsd, p.tileban, p.khuyenmai, p.trangthai,
            tk.soluongton AS tonkho_soluong, p.soluongton AS sanpham_soluong
     FROM sanpham p
     LEFT JOIN tonkho tk ON tk.masanpham = p.masanpham
     WHERE p.masanpham = 16`
  );
  console.log('New Query Breakdown for Product 16:', rowsNew[0]);

  await db.end();
}

testSelectBug().catch(console.error);
