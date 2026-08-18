const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");
require("dotenv").config();

async function main() {
  const relativeFile = process.argv[2];
  if (!relativeFile) {
    console.error("Vui lòng truyền đường dẫn file SQL.");
    process.exit(1);
  }

  const sqlFile = path.resolve(process.cwd(), relativeFile);
  if (!fs.existsSync(sqlFile)) {
    console.error(`Không tìm thấy file SQL: ${sqlFile}`);
    process.exit(1);
  }

  const sql = fs.readFileSync(sqlFile, "utf8").replace(/^\uFEFF/, "");

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    multipleStatements: true
  });

  try {
    await connection.query(sql);

    console.log(`Đã cập nhật CSDL từ file: ${relativeFile}`);
  } catch (error) {
    console.error("Không thể cập nhật CSDL.");
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    await connection.end();
  }
}

main();
