const mongoose = require("mongoose");

const users = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  age: { type: Number },
  country: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
});

const articles = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String },
  author: { type: mongoose.Schema.ObjectId, ref: "users" },
});

const user1 = mongoose.model("User", users);
const articles1 = mongoose.model("article", articles);

module.exports = { user1, articles1 };
