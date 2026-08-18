const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function importFullTiDB() {
  const sqlFile = path.join(__dirname, 'database', 'website_ban_my_pham.sql');
  console.log('Reading SQL file:', sqlFile);
  const sqlContent = fs.readFileSync(sqlFile, 'utf8');

  const statements = sqlContent
    .split(/;\s*\n/)
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--') && !s.startsWith('/*'));

  console.log(`Found ${statements.length} SQL statements`);

  const connection = await mysql.createConnection({
    host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
    user: 'MnEmxApLYZrnqQq.root',
    password: 'N8qrFKganU510LcW',
    database: 'website_ban_my_pham',
    port: 4000,
    ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: false },
    multipleStatements: true
  });

  console.log('Disabling foreign key checks...');
  await connection.query('SET FOREIGN_KEY_CHECKS = 0;');

  console.log('Executing SQL statements...');
  let success = 0, errors = 0;
  for (const stmt of statements) {
    if (!stmt || stmt.startsWith('--')) continue;
    try {
      await connection.query(stmt);
      success++;
    } catch (e) {
      console.log('Warning:', e.message.substring(0, 100));
      errors++;
    }
  }

  // Insert user phamyennhi2462002@gmail.com
  try {
    await connection.query(`
      INSERT INTO nguoidung (manguoidung, mavaitro, hoten, sodienthoai, email, matkhau, trangthai)
      VALUES (3, 1, 'Phạm Yến Nhi', '0901234567', 'phamyennhi2462002@gmail.com', '123456', 1)
      ON DUPLICATE KEY UPDATE matkhau = '123456';
    `);
  } catch (e) {}

  await connection.query('SET FOREIGN_KEY_CHECKS = 1;');

  const [users] = await connection.query('SELECT manguoidung, hoten, email, matkhau FROM nguoidung');
  console.log('\nSUCCESS! Users in database:', users);

  const [products] = await connection.query('SELECT COUNT(*) as count FROM sanpham');
  console.log('SUCCESS! Products in database:', products[0].count);

  await connection.end();
  console.log(`\nTIDB CLOUD DATABASE FULLY HYDRATED! Success: ${success}, Errors: ${errors}`);
}

importFullTiDB().catch(console.error);
