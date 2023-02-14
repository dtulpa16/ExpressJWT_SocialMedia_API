const { mongoose, Schema } = require("mongoose");
const postSchema = new Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 255 },
  post: { type: String, required: true, minlength: 2 },
  status: { type: String, default: "neutral" },
  creationDate: { type: Date, default: Date.now },
});
const Post = mongoose.model("Post", postSchema)
module.exports = Post