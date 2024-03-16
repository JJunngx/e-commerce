const Products = require("../model/product");
const Users = require("../model/user");
const nodemailer = require("nodemailer");
const Order = require("../model/order");

const Message = require("../model/message");
const io = require("../socket");
exports.order = async (req, res, next) => {
  const { name, email, phone, totalAmount, products } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    // host: "smpt.gmail.com",
    // port: 587,
    // secure: false,
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  });
  let mailOptions = {
    from: process.env.user,
    subject: "Thông tin đơn hàng của bạn",
    to: email,
    html: `
    <html>
    <head>
    <style>
    
    th,
   td {
  border: 1px solid yellow;

   margin: 5px;
   }
   table img {
    width:70px;
    height: 70px;
  }
  .fontSize{
    font-size:30px;
    font-weight:bold;
  }
  td{
    font-size:25px;
  }
  table {
  border-collapse: separate;
  border-spacing: 3px;
  width:80%
  } 
     p {
      color: white;
     }
     .order{
      padding:20px;
      max-width:80%;
      color: white;
     }
    </style>
     </head>
      <body style="background-color: black;color:white">
      <div class="order">
        <h1 class="fontSize">Xin Chào ${name}</h1>
        <p>Phone:${phone}</p>
        <p>Address:Ha Noi, Viet Nam</p>
        <table>
        <tr>
          <th>Tên Sản Phẩm</th>
          <th>Hình Ảnh</th>
          <th>Giá</th>
          <th>Số Lượng</th>
          <th>Thành Tiền</th>
        </tr>
        ${products
          .map(
            (product) => `
        <tr>
        <td>${product.name}</td>
        <td><img src=${product.image}alt=${product.name}/></td>
        <td>${product.price.toLocaleString("vi-VN")} VND</td>
        <td>${product.quantity}</td>
        <td>${(product.price * product.quantity).toLocaleString(
          "vi-VN"
        )} VND</td>
        </tr>`
          )
          .join("")}
      </table>
        <p class="fontSize">Tổng Thanh Toán:${totalAmount}VND</p>
        <p class="fontSize">Cảm ơn bạn!</p>
        </div>
      </body>
    </html>
  `,
  };
  try {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(404).json({ error });
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: "hóa đơn được tạo thành công" });
  } catch (error) {
    console.log(error);
  }
};

exports.products = async (req, res, next) => {
  const { startIndex, endIndex } = req.query;
  try {
    const totalCount = await Products.estimatedDocumentCount();
    const results = await Products.find()
      .skip(startIndex)
      .limit(endIndex - startIndex);

    res.json({ results, totalCount });
  } catch (error) {
    console.log(error);
  }
};
exports.relativeProduct = async (req, res, next) => {
  const { category, startIndex, endIndex } = req.query;

  try {
    const totalCount = await Products.countDocuments({ category: category });
    const results = await Products.find({ category: category })
      .skip(startIndex)
      .limit(endIndex - startIndex);
    res.json({ results, totalCount });
  } catch (error) {
    res.status(500).json({ error });
  }
};
exports.detailProduct = async (req, res, next) => {
  try {
    return res.json(await Products.findById(req.params.productId));
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.relativeProductDetail = async (req, res, next) => {
  const { _id, category, startIndex, endIndex } = req.query;

  try {
    const totalCount = await Products.countDocuments({
      category: category,
      _id: { $ne: _id },
    });

    const results = await Products.find({
      _id: { $ne: _id }, // Lọc bỏ các tài liệu có _id giống với biến _id
      category: category,
    })
      .skip(startIndex)
      .limit(endIndex - startIndex)
      .select({ name: 1, img1: 1, price: 1 });
    res.json({ results, totalCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

exports.search = async (req, res, next) => {
  const { keyword } = req.query;
  const startIndex = +req.query.startIndex;
  const endIndex = +req.query.endIndex;

  try {
    const startTime = performance.now();

    const results = await Products.aggregate([
      {
        $facet: {
          totalCount: [
            {
              $match: {
                name: { $regex: keyword, $options: "i" },
              },
            },
            { $count: "value" },
          ],
          data: [
            {
              $match: {
                name: { $regex: keyword, $options: "i" },
              },
            },
            { $skip: startIndex },
            { $limit: endIndex - startIndex },
          ],
        },
      },
    ]);

    const endTime = performance.now();

    // Tính thời gian tải trang
    const loadTime = endTime - startTime;
    res.json({
      results: results[0].data,
      totalCount: results[0].totalCount[0].value,
      loadTime,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const cart = await Users.findById(req.userId).populate("cart._id").exec();

    res.json(cart.cart);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.postCart = async (req, res, next) => {
  const { productId, quantity } = req.query;

  try {
    const updatedUser = await Users.findOneAndUpdate(
      { _id: req.userId, "cart._id": productId },
      { $inc: { "cart.$.quantity": quantity } },
      { new: true }
    );

    if (!updatedUser) {
      await Users.findByIdAndUpdate(req.userId, {
        $push: { cart: { _id: productId, quantity } },
      });
    }

    //cập nhật lại số hàng trong kho
    await Products.updateOne(
      { _id: productId },
      { $inc: { count: -quantity } }
    );

    res.json({ message: "success" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.deleteItemCart = async (req, res, next) => {
  const { productId } = req.params;
  const { quantity } = req.query;

  try {
    await Users.findOneAndUpdate(
      { _id: req.userId },
      { $pull: { cart: { _id: productId } } },
      { new: true }
    );
    //cập nhật lại số luợng trong kho khi người dùng xóa sp ở giỏ hàng
    await Products.updateOne({ _id: productId }, { $inc: { count: quantity } });
    res.json({ message: "xoa sp thanh cong" });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    throw error; // Xử lý lỗi nếu có
  }
};

exports.history = async (req, res, next) => {
  const { startIndex, endIndex } = req.query;
  try {
    const totalCount = await Order.find({
      userId: req.userId,
    }).countDocuments();

    const results = await Order.find({ userId: req.userId })
      .skip(startIndex)
      .limit(endIndex - startIndex);

    res.json({ results, totalCount });
  } catch (error) {
    console.log(error);
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

exports.getMessage = async (req, res, next) => {
  try {
    const results = await Message.findOne({ customerId: req.userId });

    res.json(results.roomChat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
