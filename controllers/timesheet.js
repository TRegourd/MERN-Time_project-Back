const displayTimesheetPage = (req, res, next) => {
  res.send("timesheet home");
};

const Timesheets = {
  displayTimesheetPage,
};

module.exports = Timesheets;
