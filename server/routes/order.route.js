const router = require("express").Router();
const OrderController = require("../controller/order.controller");

router.get("/", OrderController.index);
router.get("/user/:userId", OrderController.getByUser);
router.get("/:id/invoice", OrderController.getInvoice);
router.get("/:id", OrderController.detail);
router.post("/", OrderController.create);
router.post("/:id/cancel", OrderController.cancelOrder);
router.patch("/:id/status", OrderController.updateStatus);

module.exports = router;
