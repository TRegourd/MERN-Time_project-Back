var express = require("express");
const Auth = require("../controllers/Auth");
var router = express.Router();

/* Login */
router.post("/login", Auth.login);

/* Signin */
router.post("/signin", Auth.signin);

/* Forgot password */
router.post("/forgot", Auth.forgot);

/* Reset password */
router.put(`/reset/:id`, Auth.reset);

module.exports = router;
