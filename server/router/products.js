const express = require("express");
const router = express.Router();
const controller = require("../controller/products");

const authenticateToken = require("../middleware/auth");
router.get("/products", controller.products);
router.get("/detailProduct/:productId", controller.detailProduct);
router.get("/relativeProduct", controller.relativeProduct);
router.get("/relativeProductDetail", controller.relativeProductDetail);
router.get("/search", controller.search);
router.get("/getCart", authenticateToken, controller.getCart);
router.get("/postCart", authenticateToken, controller.postCart);
router.delete(
  "/deleteItemCart/:productId",
  authenticateToken,
  controller.deleteItemCart
);
router.post("/order", controller.order);
router.get("/history", authenticateToken, controller.history);
router.get("/information/:orderId", authenticateToken, controller.detailOrder);
router.get("/message", authenticateToken, controller.getMessage);
module.exports = router;
