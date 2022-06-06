const Time = require("../models/Times");
const { findTimesheetByUserID } = require("../libs/findTimesheetByUserID");
const {
  findTimesheetByProjectID,
} = require("../libs/findTimesheetByProjectID");

const displayTimesheetPage = (req, res, next) => {
  res.send("timesheet home");
};

const displayAllTimesheet = (req, res) => {
  Time.find({ user: req.user })
    .populate(["user", "project"])
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};

const displayFilteredTimesheet = (req, res) => {
  Time.find({
    user: req.user,
    date: { $gt: req.body.startDate, $lt: req.body.endDate },
  })
    .populate(["user", "project"])
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};

const postNewTimesheet = (req, res) => {
  const { desc, date, duration, project, user } = req.body;

  // crée un objet selon le modèle mongoose Message
  const newTimesheet = new Time({
    desc,
    date,
    duration,
    project,
    user,
  });

  // envoie l'objet newMessage dans la db
  Time.create(newTimesheet)
    .then((result) => {
      res.send(`TimeSheet Created`);
    })
    .catch((error) => console.log(error));
};

const displayTimesheetByProjectId = (req, res) => {
  findTimesheetByProjectID(req, res);
};

function sortProject(projects, currentTime, arr) {
  const projectName = currentTime.project.name;
  let projectExists = projectName in projects;
  if (projectExists) {
    projects[projectName].totalTime += currentTime.duration;
  } else {
    projects[projectName] = { totalTime: currentTime.duration };
  }
  return projects;
}

function arrayYFy(obj) {
  return Object.entries(obj).map((item) => {
    const [name, { totalTime }] = item;
    return { name, totalTime };
  });
}

function treatData(times) {
  return arrayYFy(times.reduce(sortProject, {}));
}

const getFilteredTotalTime = (req, res) => {
  if (req.body.startDate || req.body.endDate) {
    Time.find({
      user: req.user,
      date: { $gt: req.body.startDate, $lt: req.body.endDate },
    })
      .populate("project")
      .then((result) => {
        res.send(treatData(result));
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  } else {
    Time.find({
      user: req.user,
    })
      .populate("project")
      .then((result) => {
        res.send(treatData(result));
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  }
};

const displayTimesheetByUserId = (req, res) => {
  findTimesheetByUserID(req, res);
};

const deleteTimesheetById = (req, res) => {
  Time.findByIdAndRemove(req.params.id)
    .then(() => res.send("Timesheet deleted"))
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};

const Timesheets = {
  displayTimesheetPage,
  displayAllTimesheet,
  postNewTimesheet,
  displayTimesheetByProjectId,
  displayTimesheetByUserId,
  deleteTimesheetById,
  getFilteredTotalTime,
  displayFilteredTimesheet,
};

module.exports = Timesheets;
