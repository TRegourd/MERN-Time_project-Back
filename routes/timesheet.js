var express = require("express");
const Timesheets = require("../controllers/Timesheet");
const checkAuth = require("../middlewares/checkAuth");
var router = express.Router();

/* GET timesheet homepage */
router.get("/", Timesheets.displayTimesheetPage);

/* GET timesheet list */
router.get("/all", checkAuth, Timesheets.displayAllTimesheet);

/* GET timesheet list by project ID */
router.get("/project/:id", Timesheets.displayTimesheetByProjectId);

/* GET timesheet list by user ID */
router.get("/user/:id", Timesheets.displayTimesheetByUserId);

/* POST new timesheet */
router.post("/newtimesheet", Timesheets.postNewTimesheet);

/* DELETE new timesheet */
router.delete("/delete/:id", Timesheets.deleteTimesheetById);

module.exports = router;
