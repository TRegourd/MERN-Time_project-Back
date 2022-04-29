var express = require("express");
var router = express.Router();

const projects = require("../controllers/Projects");
const checkAuth = require("../middlewares/checkAuth");

/* GET users listing. */
router.get("/", checkAuth, projects.getProjects);
router.post("/", checkAuth, projects.createProject);
router.get("/id/:id", projects.getProjectById);
router.put("/id/:id", projects.modifyProjectsById);
router.put("/id/name/:id", projects.modifyNameProjectsById);
router.put("/id/color/:id/", projects.modifyColorProjectsById);
router.delete("/id/:id", projects.deleteProjectById);

module.exports = router;
