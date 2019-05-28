const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hello world with express");
});

app.get("/about", (req, res) => {
  res.send("hello about using express routes");
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
