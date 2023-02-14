const { Schema, model } = require("mongoose");
const Joi = require("joi");
const postSchema = new Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 255 },
  post: { type: String, required: true, minlength: 2 },
  status: { type: String, required: false, default: "neutral" },
  creationDate: { type: Date, required: false, default: Date.now },
});
const Post = model("Post", postSchema);

function validatePost(post) {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    post: Joi.string().min(2).required(),
  });
  return schema.validate(post);
}
exports.Post = Post;
exports.validatePost = validatePost;
exports.postSchema = postSchema;
