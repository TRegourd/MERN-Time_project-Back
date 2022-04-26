var express = require("express");
const Timesheets = require("../controllers/Timesheet");
const checkAuth = require("../middlewares/checkAuth");
var router = express.Router();

/* GET timesheet homepage */
router.get("/", Timesheets.displayTimesheetPage);

/* GET timesheet list */
router.get("/all", checkAuth, Timesheets.displayAllTimesheet);
/* GET project list for current User */
router.get("/project/graph", checkAuth, Timesheets.getProjectListCurrentUser);
/* GET timesheet list by project ID */
router.get("/project/:id", Timesheets.displayTimesheetByProjectId);

/* GET total time by project ID */
router.get("/project/total/:id", checkAuth, Timesheets.getTotalProjectTime);

/* GET project list for current User */
router.get("/project/graph", checkAuth, Timesheets.getProjectListCurrentUser);

/* GET timesheet list by user ID */
router.get("/user/:id", Timesheets.displayTimesheetByUserId);

/* POST new timesheet */
router.post("/newtimesheet", checkAuth, Timesheets.postNewTimesheet);

/* DELETE new timesheet */
router.delete("/delete/:id", Timesheets.deleteTimesheetById);

module.exports = router;
