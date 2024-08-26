const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  password: { type: String },
});
const User = mongoose.model("user", userSchema);
// EXPORT THE MODEL
module.exports = User;
