const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function importSQL() {
  const sqlFile = path.join(__dirname, 'database', 'website_ban_my_pham.sql');
  
  console.log('Reading SQL file:', sqlFile);
  const sqlContent = fs.readFileSync(sqlFile, 'utf8');
  
  const statements = sqlContent
    .split(/;\s*\n/)
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--') && !s.startsWith('/*'));

  console.log(`Found ${statements.length} SQL statements`);

  const connection = await mysql.createConnection({
    host: 'sql3.freesqldatabase.com',
    user: 'sql3835510',
    password: 'JSIQwBRISV',
    database: 'sql3835510',
    port: 3306,
    multipleStatements: true,
    connectTimeout: 30000
  });

  console.log('Connected to FreeSQLDatabase! Importing...');

  let success = 0, errors = 0;
  for (const stmt of statements) {
    if (!stmt || stmt.startsWith('--')) continue;
    try {
      await connection.query(stmt);
      success++;
    } catch (e) {
      if (!e.message.includes('already exists') && !e.message.includes('Duplicate')) {
        console.log('Warning:', e.message.substring(0, 80));
        errors++;
      }
    }
  }

  await connection.end();
  console.log(`\nImport done! Success: ${success}, Errors: ${errors}`);
}

importSQL().catch(console.error);
