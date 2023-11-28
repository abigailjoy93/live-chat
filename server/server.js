const express = require("express");
const { createServer } = require("http");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { Server } = require("socket.io");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const path = require("path");
const { Message } = require("./models");
const cors = require("cors");

const PORT = process.env.PORT || 3001;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// io.on("connection", (socket) => {
//   console.log("it works");
// });

io.on("connection", async (socket) => {
  socket.on("chat message", async (msg, clientOffset) => {
    const message = new Message({ content: msg, client_offset: clientOffset });
    await message.save();
    io.emit("chat message", {
      id: message.id,
      content: message.content,
      client_offset: message.client_offset,
    });
  });

  if (!socket.recovered) {
    const messages = await Message.find({
      id: { $gt: socket.handshake.auth.serverOffset || 0 },
    });
    messages.forEach((message) => {
      socket.emit("chat message", {
        id: message.id,
        content: message.content,
        client_offset: message.client_offset,
      });
    });
  }
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
