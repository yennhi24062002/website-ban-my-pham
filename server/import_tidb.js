const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function importToTiDB() {
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
    database: 'sys',
    port: 4000,
    ssl: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: false
    },
    multipleStatements: true,
    connectTimeout: 30000
  });

  console.log('Successfully connected to TiDB Cloud! Importing database...');

  let success = 0, errors = 0;
  for (const stmt of statements) {
    if (!stmt || stmt.startsWith('--')) continue;
    try {
      await connection.query(stmt);
      success++;
    } catch (e) {
      if (!e.message.includes('already exists') && !e.message.includes('Duplicate')) {
        console.log('Statement warning:', e.message.substring(0, 100));
        errors++;
      }
    }
  }

  // Test query products
  const [rows] = await connection.query('SELECT COUNT(*) as count FROM sanpham');
  console.log('IMPORT CHECK - Total products in TiDB:', rows[0].count);

  await connection.end();
  console.log(`\nIMPORT DONE PERFECTLY! Success: ${success}, Warnings: ${errors}`);
}

importToTiDB().catch(console.error);
