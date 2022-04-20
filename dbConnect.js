const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://MERN_TIME_userdb:FXskBTo0UxQRWxgb@cluster0.vanbo.mongodb.net/MERN-TIME_PROJECT?retryWrites=true&w=majority"
);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connection Successful!");
});