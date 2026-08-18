const express = require("express");
const router = express.Router();
const StatsController = require("../controller/stats.controller");

router.get("/dashboard", StatsController.getDashboardStats);

module.exports = router;
