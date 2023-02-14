const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { postSchema } = require("./post");

const userSchema = new Schema({
  name: { type: String, required: true },
  likedPosts: { type: [postSchema], default: [] },
});

const User = model("User", userSchema);
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(user);
}
exports.User = User;
exports.validate = validateUser;
