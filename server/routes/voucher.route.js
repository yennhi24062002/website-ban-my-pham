const router = require("express").Router();
const VoucherController = require("../controller/voucher.controller");

router.get("/all", VoucherController.getAllVouchers);
router.get("/history", VoucherController.getGrantHistory);
router.get("/user/:userId", VoucherController.getMyVouchers);
router.post("/grant", VoucherController.grantVoucher);

module.exports = router;
