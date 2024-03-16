const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Product = require("../model/product");
const Order = require("../model/order");
const Message = require("../model/message");
const cloudinary = require("cloudinary").v2;

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email,
      role: { $in: ["admin", "Consultant"] },
    });
    if (!user) {
      return res.status(401).json({ email: "Email không tồn tại" });
    }
    const isPasswordMatch = bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ password: "sai mat khau" });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET_admin
    );
    req.session.userId = user._id;
    return res.json({
      token,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.products = async (req, res, next) => {
  const { startIndex, endIndex } = req.query;
  try {
    const totalCount = await Product.countDocuments();

    const results = await Product.find()
      .skip(startIndex)
      .limit(endIndex - startIndex);

    res.json({ totalCount, results });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

// Xóa thuộc tính 'age' khỏi object 'person'

exports.deleteProduct = async (req, res, next) => {
  try {
    const images = await Product.findById(req.params, {
      _id: 0,
      img1: 1,
      img2: 1,
      img3: 1,
      img4: 1,
    }).lean();
    const imageUrls = Object.values(images);

    const deleteResponses = await Promise.all(
      imageUrls.map(async (imageUrl) => {
        // Trích xuất public_id từ URL hình ảnh
        const publicId = imageUrl.substring(
          imageUrl.lastIndexOf("/") + 1,
          imageUrl.lastIndexOf(".")
        );
        // Xóa hình ảnh từ Cloudinary
        return cloudinary.uploader.destroy(publicId);
      })
    );
    await Product.deleteOne(req.params);
    console.log("xoá ảnh ở cloudinary", deleteResponses);
    res.json({ message: "xóa sản phẩm thành công" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

exports.orders = async (req, res, next) => {
  const { startIndex, endIndex } = req.query;
  try {
    const totalCount = await Order.estimatedDocumentCount();
    const results = await Order.find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(endIndex - startIndex);

    res.json({ results, totalCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const promises = req.files.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.path, {
        public_id: `olympic_flag_${Date.now()}`, // Public ID for the uploaded image
      });
      // Log Cloudinary upload result
      return result.secure_url;
    });

    const uploadedImages = await Promise.all(promises);

    uploadedImages.forEach((element, index) => {
      req.body["img" + (index + 1)] = element;
    });

    const product = new Product(req.body);
    await product.save();
    res.status(200).json({
      message: "Product created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
exports.getEditProduct = async (req, res, next) => {
  try {
    res.json(await Product.findById(req.params));
  } catch (error) {
    res.status(500).json({ error });
  }
};
exports.editProduct = async (req, res, next) => {
  try {
    const promises = req.files.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.path, {
        public_id: `olympic_flag_${Date.now()}`, // Public ID for the uploaded image
      });
      // Log Cloudinary upload result
      return result.secure_url;
    });

    const uploadedImages = await Promise.all(promises);

    uploadedImages.forEach((element, index) => {
      req.body["img" + (index + 1)] = element;
    });

    await Product.findByIdAndUpdate(req.body._id, req.body);
    res.status(200).json({
      message: "Product created successfully",
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
exports.detailOrder = async (req, res, next) => {
  try {
    const results = await Order.findById(req.params.orderId);
    res.json(results);
  } catch (error) {
    console.log(error);
  }
};
exports.listMessage = async (req, res, next) => {
  try {
    // const results = await Message.distinct("customerId");
    const results = await Message.find();

    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

exports.getItemMessage = async (req, res, next) => {
  try {
    const results = await Message.findOne({ customerId: req.userId });
    res.json(results.roomChat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
