const mysql = require("mysql2/promise");
require("dotenv").config();

const dbHost = (process.env.DB_HOST || "localhost").trim();
const dbUser = (process.env.DB_USER || "root").trim();
const dbPassword = (process.env.DB_PASSWORD || "").trim();
let dbName = (process.env.DB_NAME || "website_ban_my_pham").trim();
if (!dbName || dbName === "sys") {
  dbName = "website_ban_my_pham";
}
const dbPort = parseInt((process.env.DB_PORT || "3306").trim());

const isSSL = process.env.DB_SSL === "true" || dbHost.includes("tidbcloud.com") || dbHost.includes("aivencloud.com");

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
