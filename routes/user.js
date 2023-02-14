const { User } = require("../models/user");
const { Post, validatePost } = require("../models/post");
const express = require("express");
const router = express.Router();

//! Handle User "liking" a post
router.post("/:userId/liked/:postId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user)
      return res
        .status(400)
        .send(`The user with id "${req.params.userId}" does not exist.`);
    const post = await Post.findById(req.params.postId);
    if (!post)
      return res
        .status(400)
        .send(`The product with id "${req.params.postId}" does not exist.`);
    user.likedPosts.push(post);
    await user.save();
    return res.send(user.likedPosts);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.put("/:userId/liked/:postId", async (req, res) => {
  try {
    const { error } = validatePost(req.body);
    if (error) return res.status(400).send(error);
    const user = await User.findById(req.params.userId);
    if (!user)
      return res
        .status(400)
        .send(`The user with id "${req.params.userId}" does not exist.`);
    const post = user.likedPosts.id(req.params.postId);
    if (!product)
      return res
        .status(400)
        .send(
          `The product with id "${req.params.postId}" does not in the users shopping cart.`
        );
    post.name = req.body.name;
    post.post = req.body.post;
    post.status = req.body.status;
    post.creationDate = Date.now();
    await user.save();
    return res.send(post);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});
module.exports = router;
