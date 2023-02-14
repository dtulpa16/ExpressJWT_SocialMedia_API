const Post = require("../models/post");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, post } = req.body;
  try {
    const newPost = new Post({
      name: name,
      post: post,
    });
    await newPost.save();
    return res.status(200).send(newPost);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

module.exports = router;
