const { Post, validatePost } = require("../models/post");
const express = require("express");
const router = express.Router();

//! POST
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

//! GET all
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).send(posts);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//! GET by id
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(400).send(`The product with id "${req.params.id}" d
   oes not exist.`);
    return res.send(post);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//! PUT
router.put("/:id", async (req, res) => {
  const { name, post, status } = req.body;

  try {
    const { error } = validatePost(req.body);
    if (error) return res.status(400).send(error);
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        name: name,
        post: post,
        status: status,
      },
      { new: true }
    );
    if (!updatedPost)
      return res.status(400).send(`The post with id "${req.params.id}" does not exist.`);
    await updatedPost.save();
    return res.send(updatedPost);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});
module.exports = router;
