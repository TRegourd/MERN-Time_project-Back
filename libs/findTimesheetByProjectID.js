const Time = require("../models/Times");

function findTimesheetByProjectID(req, res) {
  Time.find({ projectId: req.params.id })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(404);
    });
}
exports.findTimesheetByProjectID = findTimesheetByProjectID;
