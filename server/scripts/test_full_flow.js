const mysql = require('mysql2/promise');

async function testFullFlow() {
  const db = await mysql.createConnection({
    host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
    user: 'MnEmxApLYZrnqQq.root',
    password: 'N8qrFKganU510LcW',
    database: 'website_ban_my_pham',
    port: 4000,
    ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: false }
  });

  console.log('=== STEP 1: BEFORE ORDER STOCK ===');
  const [lcBefore] = await db.query('SELECT maluachon, masanpham, mausac, soluongton FROM luachon_sanpham WHERE masanpham = 16 AND maluachon = 17');
  const [tkBefore] = await db.query('SELECT matonkho, masanpham, soluongton FROM tonkho WHERE masanpham = 16');
  const [spBefore] = await db.query('SELECT masanpham, tensanpham, soluongton FROM sanpham WHERE masanpham = 16');
  console.log('luachon_sanpham (Denim):', lcBefore[0]?.soluongton);
  console.log('tonkho (3CE):', tkBefore[0]?.soluongton);
  console.log('sanpham (3CE):', spBefore[0]?.soluongton);

  // STEP 2: CREATE ORDER (Simulate order.controller.js)
  console.log('\n=== STEP 2: PLACING ORDER (buying 2 units of Denim) ===');
  await db.beginTransaction();

  const [ord] = await db.query(
    `INSERT INTO donhang (manguoidung, tennguoinhan, sodienthoainhan, diachigiaohang, tongtien, trangthaidonhang, trangthaithanhtoan, ghichu)
     VALUES (1, 'Pham Yen Nhi', '0908719006', '123 Nguyen Hue, Q1', 640000, 'choxacnhan', 'dathanhtoan', 'Test order')`
  );
  const madonhang = ord.insertId;

  await db.query(
    `INSERT INTO chitietdonhang (madonhang, masanpham, maluachon, soluong, dongia, thanhtien)
     VALUES (?, 16, 17, 2, 320000, 640000)`,
    [madonhang]
  );

  // Deduct stock in all 3 tables
  await db.query("UPDATE luachon_sanpham SET soluongton = GREATEST(soluongton - 2, 0) WHERE maluachon = 17");
  await db.query("UPDATE tonkho SET soluongton = GREATEST(soluongton - 2, 0) WHERE masanpham = 16");
  await db.query("UPDATE sanpham SET soluongton = GREATEST(soluongton - 2, 0) WHERE masanpham = 16");

  await db.commit();
  console.log('Order created successfully, madonhang =', madonhang);

  // STEP 3: AFTER ORDER STOCK
  console.log('\n=== STEP 3: AFTER ORDER STOCK ===');
  const [lcAfter] = await db.query('SELECT maluachon, masanpham, mausac, soluongton FROM luachon_sanpham WHERE masanpham = 16 AND maluachon = 17');
  const [tkAfter] = await db.query('SELECT matonkho, masanpham, soluongton FROM tonkho WHERE masanpham = 16');
  const [spAfter] = await db.query('SELECT masanpham, tensanpham, soluongton FROM sanpham WHERE masanpham = 16');
  console.log('luachon_sanpham (Denim):', lcAfter[0]?.soluongton);
  console.log('tonkho (3CE):', tkAfter[0]?.soluongton);
  console.log('sanpham (3CE):', spAfter[0]?.soluongton);

  // STEP 4: RETURN FLOW (Simulate return.controller.js)
  console.log('\n=== STEP 4: SIMULATING RETURN REQUEST & ADMIN CONFIRM RECEIPT ===');
  // First update order status to hoanthanh so return request is accepted
  await db.query("UPDATE donhang SET trangthaidonhang = 'hoanthanh' WHERE madonhang = ?", [madonhang]);

  // Create return request
  const [ret] = await db.query(
    "INSERT INTO yeucautranhang (madonhang, manguoidung, lydo, trangthai, ngayyeucau) VALUES (?, 1, 'San pham bi loi', 'choxuly', NOW())",
    [madonhang]
  );
  const mayeucau = ret.insertId;

  // Admin approves & confirms receipt -> Restore stock in all 3 tables
  const [chitiet] = await db.query("SELECT masanpham, soluong, maluachon FROM chitietdonhang WHERE madonhang = ?", [madonhang]);
  for (const item of chitiet) {
    await db.query("UPDATE tonkho SET soluongton = soluongton + ? WHERE masanpham = ?", [item.soluong, item.masanpham]);
    await db.query("UPDATE sanpham SET soluongton = soluongton + ? WHERE masanpham = ?", [item.soluong, item.masanpham]);
    if (item.maluachon) {
      await db.query("UPDATE luachon_sanpham SET soluongton = soluongton + ? WHERE maluachon = ?", [item.soluong, item.maluachon]);
    }
  }
  await db.query("UPDATE yeucautranhang SET trangthai = 'danhan', ngayxuly = NOW() WHERE mayeucau = ?", [mayeucau]);

  console.log('\n=== STEP 5: AFTER RETURN CONFIRM STOCK ===');
  const [lcReturn] = await db.query('SELECT maluachon, masanpham, mausac, soluongton FROM luachon_sanpham WHERE masanpham = 16 AND maluachon = 17');
  const [tkReturn] = await db.query('SELECT matonkho, masanpham, soluongton FROM tonkho WHERE masanpham = 16');
  const [spReturn] = await db.query('SELECT masanpham, tensanpham, soluongton FROM sanpham WHERE masanpham = 16');
  console.log('luachon_sanpham (Denim):', lcReturn[0]?.soluongton);
  console.log('tonkho (3CE):', tkReturn[0]?.soluongton);
  console.log('sanpham (3CE):', spReturn[0]?.soluongton);

  await db.end();
}

testFullFlow().catch(console.error);
