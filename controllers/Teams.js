const TeamModel = require("../models/Teams");
const getRandomTeamCode = require("../libs/getRandomTeamCode");

function createTeam(req, res) {
  console.log(req.user.isAdmin);
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

const Teams = { createTeam };

module.exports = Teams;
