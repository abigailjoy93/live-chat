const express = require("express");
const app = express();
const port = 3000;

app.get("/api/greeting", (req, res) => {
  res.json({ message: "Express API established" });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
