const { Post, validatePost } = require("../models/post");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, post } = req.body;
  try {
    const { error } = validatePost(req.body);
    if (error) return res.status(400).send(error);

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

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).send(posts);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});
module.exports = router;
