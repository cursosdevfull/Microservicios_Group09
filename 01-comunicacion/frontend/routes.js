const express = require("express");
const router = express.Router();

router.get("/config", async (req, res) => {
  res.json({
    pathBackend1: "http://localhost:19020/api/message",
  });
});

module.exports = router;
