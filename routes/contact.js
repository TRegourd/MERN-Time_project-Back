var express = require("express");
const Contact = require("../controllers/Contact");
var router = express.Router();

/* Contact */
router.post("/", Contact.postNewMessage);

module.exports = router;
