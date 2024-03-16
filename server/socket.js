let io;

module.exports = {
  init: (httpServer) => {
    io = require("socket.io")(httpServer, {
      cors: {
        // Cho phép truy cập từ nguồn gốc http://localhost:3000
        methods: ["GET", "POST"], // Cho phép các phương thức GET và POST
        credentials: true, // Cho phép sử dụng cookie và tiêu đề xác thực
      },
    });
    return io;
  },

  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    return io;
  },
};
