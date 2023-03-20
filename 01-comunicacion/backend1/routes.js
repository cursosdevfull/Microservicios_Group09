const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/message", async (req, res) => {
  const messages = {
    msg01: "Response from backend1",
  };

  const path = "http://localhost:19030/api/message";
  const response = await axios.get(path);
  messages.msg02 = response.data.message;

  res.json(messages);
});

module.exports = router;
