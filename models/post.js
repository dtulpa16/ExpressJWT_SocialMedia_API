const { Schema, model } = require("mongoose");
const postSchema = new Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 255 },
  post: { type: String, required: true, minlength: 2 },
  status: { type: String, required: false, default: "neutral" },
  creationDate: { type: Date, required: false, default: Date.now },
});
const Post = model("Post", postSchema);
module.exports = Post;
