const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use("/api", require("./routes"));

app.get("/", (req, res) => res.send("Todo está ok"));
app.get("/healthz", (req, res) => res.send("Todo está ok"));
app.get("/healthcheck", (req, res) => res.send("Todo está ok"));

module.exports = app;
