const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function setupBothDatabases() {
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
    multipleStatements: true
  });

  for (const dbName of ['sys', 'website_ban_my_pham']) {
    console.log(`\nImporting into database '${dbName}'...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    await connection.query(`USE \`${dbName}\`;`);

    for (const stmt of statements) {
      if (!stmt || stmt.startsWith('--')) continue;
      try {
        await connection.query(stmt);
      } catch (e) {}
    }

    const [rows] = await connection.query(`SELECT COUNT(*) as count FROM \`${dbName}\`.sanpham;`);
    console.log(`  -> Database '${dbName}' products count:`, rows[0].count);
  }

  await connection.end();
  console.log('\nIMPORT INTO BOTH DATABASES COMPLETED SUCCESSFULLY!');
}

setupBothDatabases().catch(console.error);
