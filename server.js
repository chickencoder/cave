const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json())
app.use(express.static(__dirname + "/static"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/home.html");
});

app.get("/session/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/tutorial/", (req, res) => {
  res.sendFile(__dirname + "/tutorial.html");
});

app.listen(1337);
