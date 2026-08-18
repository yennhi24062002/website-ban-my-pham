const mysql = require("mysql2/promise");
require("dotenv").config();

const dbHost = (process.env.DB_HOST || "gateway01.ap-southeast-1.prod.aws.tidbcloud.com").trim();
const dbUser = (process.env.DB_USER || "MnEmxApLYZrnqQq.root").trim();
const dbPassword = (process.env.DB_PASSWORD || "N8qrFKganU510LcW").trim();
const dbPort = parseInt((process.env.DB_PORT || "4000").trim());
const dbName = "website_ban_my_pham";

const poolConfig = {
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbName,
  port: dbPort,
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
