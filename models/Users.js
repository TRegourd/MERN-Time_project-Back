const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  adress: { String, default: "" },
  position: { String, default: "" },
  isAdmin: { Boolean, default: false },
  profilePicture: {
    type: String,
    default: "",
  },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
