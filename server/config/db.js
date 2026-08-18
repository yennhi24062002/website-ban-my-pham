const mysql = require("mysql2/promise");
require("dotenv").config();

const dbHost = process.env.DB_HOST || "localhost";
const isSSL = process.env.DB_SSL === "true" || dbHost.includes("tidbcloud.com") || dbHost.includes("aivencloud.com");

const poolConfig = {
  host: dbHost,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "website_ban_my_pham",
  port: parseInt(process.env.DB_PORT || "3306"),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  decimalNumbers: true,
  connectTimeout: 20000
};

if (isSSL) {
  poolConfig.ssl = {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: false
  };
}

const pool = mysql.createPool(poolConfig);

module.exports = pool;
