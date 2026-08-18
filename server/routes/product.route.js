const router = require("express").Router();
const ProductController = require("../controller/product.controller");

router.get("/", ProductController.index);
router.get("/:id", ProductController.detail);
router.post("/", ProductController.create);
router.put("/:id", ProductController.update);
router.patch("/:id/stock", ProductController.updateStock);

// Đánh giá sản phẩm
router.get("/:id/reviews", ProductController.layReviews);
router.post("/:id/reviews", ProductController.guiReview);

// Hỏi đáp sản phẩm
router.get("/:id/qa", ProductController.layQA);
router.post("/:id/qa", ProductController.guiCauHoi);
router.patch("/qa/:qaId", ProductController.traloiQA);

module.exports = router;
