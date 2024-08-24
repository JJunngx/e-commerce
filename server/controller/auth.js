const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

exports.signup = async (req, res, next) => {
  try {
    const existUser = await User.exists({ email: req.body.email });
    if (existUser) {
      return res.status(403).json({ message: "Email đax  tồn tại" });
    }
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = new User(req.body);
    await user.save();
    return res.status(201).json({ message: "thanh cong" });
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ email: "Email không tồn tại" });
    }
    const isPasswordMatch = bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ password: "sai mat khau" });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET_client
    );
    res.cookie("token", token, { httpOnly: true, secure: true });
    req.session.userId = user._id;
    return res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
exports.logout = async (req, res, next) => {
  try {
    req.session.destroy(function (err) {
      console.log(err);
    });

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};
