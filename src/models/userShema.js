const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    dob: { type: Date },
    email: { type: String },
    password: {type: String}
  }
);

const User = mongoose.model('user', userSchema)

module.exports = User