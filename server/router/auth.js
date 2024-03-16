const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

const authController = require("../controller/auth");
router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("please enter a valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("mat khau phai co it nhat 6 ki tu."),
    body("fullname").not().isEmpty(),
    body("phone").not().isEmpty(),
    handleValidationErrors,
  ],
  authController.signup
);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("please enter a valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("mat khau phai co it nhat 6 ki tu."),
    handleValidationErrors,
  ],
  authController.login
);
router.post("/logout", authController.logout);
module.exports = router;
