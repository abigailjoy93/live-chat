const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// event handling for successful connection
db.on("connected", () => {
  console.log("Connected to MongoDB");
});

// event handling for connection errors
db.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// event handling for disconnecting
db.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

// when Node.js is terminated, close the MongoDB connection
process.on("SIGINT", () => {
  db.close(() => {
    console.log("MongoDB connection closed");
    process.exit(0);
  });
});

module.exports = db;