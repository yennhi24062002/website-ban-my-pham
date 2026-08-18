const router = require("express").Router();
const CartController = require("../controller/cart.controller");

router.get("/", CartController.index);
router.post("/items", CartController.addItem);
router.put("/items/:id", CartController.updateItem);
router.delete("/items/:id", CartController.removeItem);

module.exports = router;
