const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const port = 9009;

app.use(express.static("./public"));

app.all("/*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET");
  next();
});

app.get("/", (req, res, next) => {
  res.sendFile("index.html", { root: __dirname });
});

app.listen(port);

console.log(`app listening on port ${port}`);
