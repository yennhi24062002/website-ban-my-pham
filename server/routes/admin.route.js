const router = require("express").Router();
const AdminController = require("../controller/admin.controller");

router.get("/statistics", AdminController.getStatistics);
router.patch("/nhap-hang/:maluachon", AdminController.nhapHang);

module.exports = router;
