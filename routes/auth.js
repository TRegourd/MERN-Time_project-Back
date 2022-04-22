var express = require("express");
const Auth = require("../controllers/auth");
var router = express.Router();

/* Login */
router.post("/login", Auth.login);

/* Signin */
router.post("/signin", Auth.signin);

module.exports = router;
