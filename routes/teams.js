var express = require("express");
const Teams = require("../controllers/Teams");
const checkAuth = require("../middlewares/checkAuth");

var router = express.Router();

/* Contact */
router.post("/", checkAuth, Teams.createTeam);
router.get("/", checkAuth, Teams.getTeams);
router.put("/update/:id", checkAuth, Teams.modifyTeam);
router.delete("/delete/:id", checkAuth, Teams.deleteTeam);
router.put("/addUser/", checkAuth, Teams.addUserToTeam);
router.get("/leave/:id", checkAuth, Teams.leaveTeam);
router.get("/members/:id", checkAuth, Teams.getTeamMembers);
router.put("/removeUser/:id", checkAuth, Teams.removeUser);
router.post("/invite/:id", checkAuth, Teams.inviteUser);

module.exports = router;
