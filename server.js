const express = require("express");
const mongoose = require("./mongoose");

const app = express();
const port = process.env.PORT || 3000;

app.get("/api/greeting", (req, res) => {
  res.json({ message: "Express API established" });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
