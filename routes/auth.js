var express = require("express");
const Auth = require("../controllers/auth");
var router = express.Router();

/* GET users listing. */
router.post("/login", Auth.login);

module.exports = router;
