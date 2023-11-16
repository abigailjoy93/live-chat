const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("./mongoose");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 3000;

// socket io event handling
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// app.get("/api/greeting", (req, res) => {
//   res.json({ message: "Express API established" });
// });

// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });
