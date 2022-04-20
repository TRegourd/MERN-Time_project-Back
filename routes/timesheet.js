var express = require("express");
const Timesheets = require("../controllers/timesheet");
var router = express.Router();

/* GET timesheet homepage */
router.get("/", Timesheets.displayTimesheetPage);

/* GET timesheet list */
router.get("/all", Timesheets.displayAllTimesheet);

/* POST new timesheet */
router.post("/newtimesheet", Timesheets.postNewTimesheet);

module.exports = router;
