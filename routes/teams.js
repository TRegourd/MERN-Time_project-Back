var express = require("express");
const Teams = require("../controllers/Teams");
const checkAuth = require("../middlewares/checkAuth");

var router = express.Router();

/* Contact */
router.post("/", checkAuth, Teams.createTeam);

module.exports = router;
