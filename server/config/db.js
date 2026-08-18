const mysql = require("mysql2/promise");

const poolConfig = {
  host: "gateway01.ap-southeast-1.prod.aws.tidbcloud.com",
  user: "MnEmxApLYZrnqQq.root",
  password: "N8qrFKganU510LcW",
  database: "website_ban_my_pham",
  port: 4000,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  decimalNumbers: true,
  connectTimeout: 20000,
  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: false
  }
};

const pool = mysql.createPool(poolConfig);

module.exports = pool;
