const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const users = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  age: { type: Number },
  country: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: {type: mongoose.Schema.ObjectId, ref: "Roles"}
});

users.pre("save", async function () {
  const salt = 10;
  this.email = this.email.toLowerCase();
  this.password = await bcrypt.hash(this.password, salt);
  this.firstName=this.firstName.toLowerCase();
  this.lastName=this.lastName.toLowerCase();
  this.country=this.country.toLowerCase();
});

const articles = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String },
  author: { type: mongoose.Schema.ObjectId, ref: "User" },
  commnetid: [{ type: mongoose.Schema.ObjectId, ref: "comments" }],
});

const commentsOnArticles = new mongoose.Schema({
  comment: { type: String },
  commenter: { type: mongoose.Schema.ObjectId, ref: "User" },
});

const roles = new mongoose.Schema({
  role: { type: String },
  permissions: [{ type: String }],
});

const user1 = mongoose.model("User", users);
const articles1 = mongoose.model("article", articles);
const commenter1 = mongoose.model("comments", commentsOnArticles);
const role1 = mongoose.model("Roles", roles);

module.exports = { user1, articles1, commenter1,role1 };
