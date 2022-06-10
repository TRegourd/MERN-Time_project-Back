const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  adress: { String, default: "" },
  position: { String, default: "" },
  isAdmin: Boolean,
  uuid: { token: String, timeStamp: Date },
  team: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Team",
    },
  ],
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
