const timesRawData = require("../data/times.json");
const Time = require("../models/Times");
const mongoose = require("mongoose");
const { findTimesheetByUserID } = require("../libs/findTimesheetByUserID");
const {
  findTimesheetByProjectID,
} = require("../libs/findTimesheetByProjectID");

const displayTimesheetPage = (req, res, next) => {
  res.send("timesheet home");
};

const displayAllTimesheet = (req, res) => {
  Time.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};

const postNewTimesheet = (req, res) => {
  const { desc, date, duration, projectId, userId } = req.body;

  // crée un objet selon le modèle mongoose Message
  const newTimesheet = new Time({
    desc,
    date,
    duration,
    projectId,
    userId,
  });

  // envoie l'objet newMessage dans la db
  Time.create(newTimesheet)
    .then((result) => {
      res.send(`TimeSheet Created`);
      console.log("TimeSheet Created");
    })
    .catch((error) => console.log(error));
};

const displayTimesheetByProjectId = (req, res) => {
  findTimesheetByProjectID(req, res);
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
};

module.exports = Timesheets;