const TeamModel = require("../models/Teams");
const getRandomTeamCode = require("../libs/getRandomTeamCode");

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
  TeamModel.findByIdAndDelete(req.params.id)
    .then(() => {
      res.send(200);
    })
    .catch(() => {
      res.sendStatus(500);
    });
}

const Teams = { createTeam, getTeams, deleteTeam };

module.exports = Teams;
