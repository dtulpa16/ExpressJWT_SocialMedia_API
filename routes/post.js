const Post = require("../models/post");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    return res.status(200).send("ok");
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

module.exports = router;
