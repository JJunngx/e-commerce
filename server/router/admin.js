const { Router } = require("express");
const router = Router();
const controller = require("../controller/admin");
const authenticateToken = require("../middleware/authAdmin");
const chatAuth = require("../middleware/chatAuth");
router.post("/login", controller.login);
router.get("/products", chatAuth, controller.products);
router.put("/updateProduct", chatAuth, controller.updateProduct);
router.delete("/deleteProduct/:_id", controller.deleteProduct);
router.get("/orders", chatAuth, controller.orders);
router.post(
  "/createProduct",
  chatAuth,
  authenticateToken,
  controller.createProduct
);
router.get("/getEditProduct/:_id", chatAuth, controller.getEditProduct);
router.put("/editProduct", chatAuth, controller.editProduct);
router.get(
  "/information/:orderId",
  authenticateToken,
  chatAuth,
  controller.detailOrder
);
router.get("/listMessage", chatAuth, controller.listMessage);
router.get("/getItemMessage", controller.getItemMessage);

module.exports = router;
