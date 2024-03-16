const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  const decodedToken = jwt.verify(token, "adminToken");
  req.role = decodedToken.role;
  console.log(req.role, req.path);
  if (req.role === "admin") {
    next();
  } else if (req.role === "Consultant" && req.path === "/listMessage") {
    console.log(req.role);
    next();
  } else {
    return res.status(401).json({ message: "khong co quyen " });
  }
};

module.exports = authenticateToken;
