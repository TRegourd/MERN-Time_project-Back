const mongoose = require("mongoose");
const DB_URI = process.env.DB_URI;

console.log(DB_URI);

mongoose.connect(DB_URI);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connection Successful!");
});
