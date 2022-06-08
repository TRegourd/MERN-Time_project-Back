var express = require("express");
const Timesheets = require("../controllers/Timesheet");
const checkAuth = require("../middlewares/checkAuth");
var router = express.Router();

/* GET timesheet homepage */
router.get("/", Timesheets.displayTimesheetPage);

/* GET timesheet list */
router.get("/all", checkAuth, Timesheets.displayAllTimesheet);

/* POST filtered timesheet list */
router.post("/filter", checkAuth, Timesheets.displayFilteredTimesheet);

/* GET timesheet list by project ID */
router.get("/project/:id", Timesheets.displayTimesheetByProjectId);

/* GET project list for current User */
router.post("/project/graph", checkAuth, Timesheets.getFilteredTotalTime);

/* GET timesheet list by user ID */
router.get("/user/:id", Timesheets.displayTimesheetByUserId);

/* POST new timesheet */
router.post("/newtimesheet", checkAuth, Timesheets.postNewTimesheet);

/* DELETE new timesheet */
router.delete("/delete/:id", Timesheets.deleteTimesheetById);

/* UPDATE Timesheet */
router.put("/update/:id", checkAuth, Timesheets.updateTimesheet);

module.exports = router;
