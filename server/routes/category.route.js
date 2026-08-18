const router = require("express").Router();
const CategoryController = require("../controller/category.controller");

router.get("/", CategoryController.index);
router.post("/", CategoryController.create);
router.put("/:id", CategoryController.update);
router.patch("/:id/status", CategoryController.updateStatus);

module.exports = router;
