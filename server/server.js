const express = require("express");
const { createServer } = require("http");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { Server } = require("socket.io");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const path = require("path");
const { Message } = require("./models/Message");
const cors = require("cors");
http = require("http");

const PORT = process.env.PORT || 3001;
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const CHAT_BOT = "ChatBot";

let chatRoom = "";
let allUsers = [];

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("chat message", (msg) => {
    console.log(msg);
  });

  socket.on("join_room", (data) => {
    const { username, room } = data;
    socket.join(room);
    let __createdtime__ = Date.now();

    socket.to(room).emit("receive_message", {
      message: `${username} has joined the chat room`,
      username: CHAT_BOT,
      __createdtime__,
    });

    socket.emit("receive_message", {
      message: `Welcome ${username}`,
      username: CHAT_BOT,
      __createdtime__,
    });

    chatRoom = room;
    allUsers.push({ id: socket.id, username, room });
    chatRoomUsers = allUsers.filter((user) => user.room === room);
    socket.to(room).emit("chatroom_users", chatRoomUsers);
    socket.emit("chatroom_users", chatRoomUsers);
  });

  // socket.on("chat message", async (msg, clientOffset) => {
  //   const message = new Message({ content: msg, client_offset: clientOffset });
  //   await message.save();
  //   io.emit("chat message", {
  //     id: message.id,
  //     content: message.content,
  //     client_offset: message.client_offset,
  //   });
  // });
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());

  app.use("/graphql", expressMiddleware(server));

  // if we're in production, serve client/dist as static assets
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  db.once("open", () => {
    httpServer.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
