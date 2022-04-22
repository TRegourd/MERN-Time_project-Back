const Time = require("../models/Times");

function findTimesheetByUserID(req, res) {
  Time.find({ user: req.params.id })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(404);
    });
}
exports.findTimesheetByUserID = findTimesheetByUserID;
