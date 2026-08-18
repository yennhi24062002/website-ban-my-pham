const router = require("express").Router();

const authRoutes = require("./auth.route");
const categoryRoutes = require("./category.route");
const productRoutes = require("./product.route");
const cartRoutes = require("./cart.route");
const orderRoutes = require("./order.route");
const customerRoutes = require("./customer.route");
const returnRoutes = require("./return.route");
const voucherRoutes = require("./voucher.route");
const adminRoutes = require("./admin.route");

const statsRoutes = require("./stats.route");

router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/cart", cartRoutes);
router.use("/orders", orderRoutes);
router.use("/customers", customerRoutes);
router.use("/returns", returnRoutes);
router.use("/vouchers", voucherRoutes);
router.use("/admin", adminRoutes);
router.use("/stats", statsRoutes);

module.exports = router;

