var express = require("express");
const Teams = require("../controllers/Teams");
const checkAuth = require("../middlewares/checkAuth");

var router = express.Router();

/* Contact */
router.post("/", checkAuth, Teams.createTeam);
router.get("/", checkAuth, Teams.getTeams);
router.put("/update/:id", checkAuth, Teams.modifyTeam);
router.delete("/delete/:id", checkAuth, Teams.deleteTeam);

module.exports = router;
