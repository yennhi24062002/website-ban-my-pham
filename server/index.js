const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
require("dotenv").config();

const routes = require("./routes");
const db = require("./config/db");
const OrderController = require("./controller/order.controller");

const khuyenmaiRoute = require('./routes/khuyenmai.route');

const app = express();
const port = process.env.PORT || 8000;

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const StatsController = require("./controller/stats.controller");
app.use(StatsController.trackVisitor);

app.get("/", async (req, res) => {
  try {
    await db.query("SELECT 1");
    res.json({
      message: "Server website ban my pham dang chay.",
      database: "Da ket noi MySQL thanh cong."
    });
  } catch (error) {
    res.status(500).json({
      message: "Server dang chay nhung chua ket noi duoc database.",
      error: error.message
    });
  }
});

app.get("/api/health", async (req, res) => {
  try {
    await db.query("SELECT 1");
    res.json({ status: "ok", database: "connected" });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

app.use('/api/khuyenmai', khuyenmaiRoute);

app.use("/api", routes);

// Cron job: Tự động duyệt đơn hàng sau 10 phút (chạy mỗi 5 phút)
cron.schedule("*/5 * * * *", () => {
  OrderController.autoApproveOrders();
});

app.listen(port, () => {
  console.log(`Server dang chay tai http://localhost:${port}`);
  console.log(`[CronJob] Auto-approve đơn sau 10p đã kích hoạt.`);
});

