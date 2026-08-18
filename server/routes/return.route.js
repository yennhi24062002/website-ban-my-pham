const router = require("express").Router();
const ReturnController = require("../controller/return.controller");

router.get("/", ReturnController.getAll);
router.get("/user/:userId", ReturnController.getByUser);
router.post("/", ReturnController.createRequest);
router.patch("/:id/approve", ReturnController.approveRequest);
router.patch("/:id/confirm", ReturnController.confirmReceived);
router.patch("/:id/reject", ReturnController.rejectRequest);

module.exports = router;
