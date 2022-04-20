var express = require("express");
const Timesheets = require("../controllers/Timesheet");
var router = express.Router();

/* GET timesheet homepage */
router.get("/", Timesheets.displayTimesheetPage);

/* GET timesheet list */
router.get("/all", Timesheets.displayAllTimesheet);

/* GET timesheet list by project ID */
router.get("/project/:id", Timesheets.displayTimesheetByProjectId);

/* GET timesheet list by user ID */
router.get("/user/:id", Timesheets.displayTimesheetByUserId);

/* POST new timesheet */
router.post("/newtimesheet", Timesheets.postNewTimesheet);

module.exports = router;
