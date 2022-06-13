const Time = require("../models/Times");
const ProjectModel = require("../models/Projects");

async function deleteProjectByTeam(id, res) {
  Time.find({ project: id }).then((result) => {
    if (result && result.length != 0) {
      const timesToDelete = result.map((time) => time._id);
      console.log(timesToDelete);
      Time.deleteMany({ _id: timesToDelete }).then(() => {
        ProjectModel.findByIdAndDelete(id)
          .then(() => {})
          .catch(() => {
            res.sendStatus(500);
          });
      });
    } else {
      ProjectModel.findByIdAndDelete(id)
        .then(() => {})
        .catch(() => {
          res.sendStatus(500);
        });
    }
  });
}

exports.deleteProjectByTeam = deleteProjectByTeam;
