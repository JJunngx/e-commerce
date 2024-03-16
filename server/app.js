const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
const helmet = require("helmet");
const compression = require("compression");
const session = require("express-session");
const dotenv = require("dotenv");
const multer = require("multer");

const cloudinary = require("cloudinary").v2;

dotenv.config();
const MongoDBStore = require("connect-mongodb-session")(session);

const app = express();

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});
const MONGODB_URI = process.env.MONGODB_URL;
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(cors());

app.use(express.json());
const fileStorage = multer.diskStorage({
  destination: "images",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

app.use(multer({ storage: fileStorage }).array("images"));
// app.use(multer({ dest: "uploads/" }).array("images"));
// app.use(multer({ dest: 'uploads/' }).single("images"));
app.use("/images", express.static(path.join(__dirname, "images")));
// app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());
app.use(compression());
app.use(cookieParser());
mongoose.connect(MONGODB_URI);

const authRouter = require("./router/auth");
const productsRouter = require("./router/products");
const adminRouter = require("./router/admin");
app.use(authRouter);

app.use(productsRouter);
app.use("/admin", adminRouter);

app.use((req, res, next) => {
  res.status(404).send("<h1>Route Not Found</h1>");
});

const server = app.listen(process.env.PORT || 5000);
// const io = require("./socket").init(server);
const io = require("socket.io")(server, {
  cors: {
    // Cho phép truy cập từ nguồn gốc http://localhost:3000
    methods: ["GET", "POST"], // Cho phép các phương thức GET và POST
    credentials: true, // Cho phép sử dụng cookie và tiêu đề xác thực
  },
});

const Message = require("./model/message");

io.on("connection", (socket) => {
  // console.log("socket.io connected");
  socket.on("message", async (data) => {
    // Save message to MongoDB
    try {
      // const results = await Message.findOne({ customerId: data.userId });

      if (data.adminId) {
        await Message.findOneAndUpdate(
          { customerId: data.userId },
          {
            $push: {
              roomChat: { _id: data.adminId, content: data.messageEntered },
            },
          }
        );
      } else {
        const updateContent = await Message.findOneAndUpdate(
          { customerId: data.userId },
          {
            $push: {
              roomChat: { _id: data.userId, content: data.messageEntered },
            },
          }
        );
        // Lưu tin nhắn vào MongoDB
        if (!updateContent) {
          const message = new Message({
            customerId: data.userId,
            roomChat: { _id: data.userId, content: data.messageEntered },
          });
          await message.save();
        }
      }

      io.emit("message", {
        _id: data.adminId ? data.adminId : data.userId,
        content: data.messageEntered,
        userId: data.userId,
        createdAt: { type: Date, default: Date.now },
      });
      // Phát tin nhắn tới tất cả các client
    } catch (error) {
      console.error("Error saving message to MongoDB:", error);
    }
  });
});
