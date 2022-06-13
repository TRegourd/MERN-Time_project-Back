const TeamModel = require("../models/Teams");
const getRandomTeamCode = require("../libs/getRandomTeamCode");
const UserModel = require("../models/Users");
const ProjectModel = require("../models/Projects");
const { deleteProjectByTeam } = require("../libs/deleteProjectByTeam");

function createTeam(req, res) {
  if (req.user.isAdmin) {
    let teamCode = getRandomTeamCode();
    let body = {
      user: req.user._id,
      name: req.body.name,
      code: teamCode,
    };
    TeamModel.create(body)
      .then(() => {
        res.send("Team created").status(200);
      })
      .catch((error) => console.log(error));
  } else {
    res.send("no admin rights").status(403);
  }
}

function getTeams(req, res) {
  TeamModel.find({ user: req.user })
    .populate(["user"])
    .then((teamList) => {
      res.send(teamList);
    });
}

function deleteTeam(req, res) {
  ProjectModel.find({ team: req.params.id })
    .then((result) => {
      result.map((project) => {
        deleteProjectByTeam(project._id);
      });
    })
    .then(() => {
      TeamModel.findByIdAndDelete(req.params.id)
        .then(() => {
          res.sendStatus(200);
        })
        .catch(() => {
          res.sendStatus(500);
        });
    });
}

function modifyTeam(req, res) {
  TeamModel.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(() => {
      res.sendStatus(500);
    });
}

function addUserToTeam(req, res) {
  TeamModel.find({ code: req.body.code }).then((result) => {
    let oldTeamList = req.user.team;
    let newTeamList = oldTeamList.concat(result[0]._id);
    UserModel.updateOne({ _id: req.user._id }, { team: newTeamList })
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => console.log(err));
  });
}

function leaveTeam(req, res) {
  let oldTeamList = req.user.team;
  let newTeamList = oldTeamList.filter((item) => {
    return item._id != req.params.id;
  });
  UserModel.updateOne({ _id: req.user._id }, { team: newTeamList })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => console.log(err));
}

function getTeamMembers(req, res) {
  UserModel.find({ team: req.params.id })
    .then((result) => {
      res.send(result).status(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
}

function removeUser(req, res) {
  let oldTeamList = req.body.team;
  let newTeamList = oldTeamList.filter((item) => {
    return item != req.params.id;
  });
  UserModel.updateOne({ _id: req.body.id }, { team: newTeamList })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => console.log(err));
}

const Teams = {
  createTeam,
  getTeams,
  deleteTeam,
  modifyTeam,
  addUserToTeam,
  leaveTeam,
  getTeamMembers,
  removeUser,
};

module.exports = Teams;
