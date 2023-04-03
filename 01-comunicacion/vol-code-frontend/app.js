const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use("/", express.static(path.join(__dirname, "../", "/public")));

app.use("/api", require("./routes"));

app.get("/", (req, res) => res.send("Todo está ok"));
app.get("/healthz", (req, res) => res.send("It's right5"));
app.get("/healthcheck", (req, res) => res.send("Todo está ok"));

module.exports = app;
