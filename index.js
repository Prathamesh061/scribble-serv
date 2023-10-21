const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors({ origin: "https://scribble-git-main-prathamesh061.vercel.app" }));

const httpServer = http.createServer(app);
const io = socketIo(httpServer, {
  cors: { origin: "https://scribble-git-main-prathamesh061.vercel.app" },
});

io.on("connection", (socket) => {
  socket.on("beginPath", (arg) => {
    socket.broadcast.emit("beginPath", arg);
  });

  socket.on("drawLine", (arg) => {
    socket.broadcast.emit("drawLine", arg);
  });

  socket.on("changeConfig", (arg) => {
    socket.broadcast.emit("changeConfig", arg);
  });

  socket.on("activeItem", (arg) => {
    socket.broadcast.emit("activeItem", arg);
  });

  socket.on("actionTaken", (arg) => {
    socket.broadcast.emit("actionTaken", arg);
  });
});

httpServer.listen(3000, () => {
  console.log(`Server is up and running`);
});
