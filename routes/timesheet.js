var express = require("express");
const Timesheets = require("../controllers/timesheet");
var router = express.Router();

/* GET users listing. */
router.get("/", Timesheets.displayTimesheetPage);

module.exports = router;
