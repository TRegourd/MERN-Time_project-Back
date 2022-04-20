var express = require('express');
var router = express.Router();

const projects = require("../controllers/Projects");

/* GET users listing. */
router.get('/', projects.getProjects);
router.get("/id/:id", projects.getProjectById);
router.post('/id/:id', projects.modifyProjectsById);
router.delete("/id/:id", projects.deleteProjectById);



module.exports = router;