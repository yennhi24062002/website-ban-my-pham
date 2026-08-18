const router = require("express").Router();
const CustomerController = require("../controller/customer.controller");

router.get("/", CustomerController.index);
router.get("/:id", CustomerController.detail);
router.patch("/:id/status", CustomerController.updateStatus);

module.exports = router;
