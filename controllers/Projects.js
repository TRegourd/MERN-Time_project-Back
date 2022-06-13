const timespan = require("jsonwebtoken/lib/timespan");
const ProjectModel = require("../models/Projects");
const Time = require("../models/Times");

const projects = {
  // Liste de tous les utilisateurs
  getProjects(req, res) {
    ProjectModel.find({ $or: [{ user: req.user }, { team: req.user.team }] })
      .populate(["user", "team"])
      .then((projectList) => {
        res.send(projectList);
      });
  },

  createProject(req, res) {
    const { name, customer, team } = req.body;
    const user = req.user;
    if (!name) return res.sendStatus(400);

    ProjectModel.find({
      $and: [{ name }, { user }, { customer }, { team }],
    })
      .then((result) => {
        if (result.length !== 0) return res.sendStatus(409);
        else {
          ProjectModel.create({
            name: name,
            customer: customer,
            team: team,
            user: user,
          })
            .then(() => {
              res.sendStatus(201);
            })
            .catch(() => res.sendStatus(500));
        }
      })
      .catch(() => res.sendStatus(500));
  },

  // Renvoi l'utilisateur ID
  getProjectById(req, res) {
    ProjectModel.findById(req.params.id)
      .then((oneProject) => {
        res.send(oneProject);
      })
      .catch(() => res.sendStatus(500));
  },

  modifyProjectsById(req, res) {
    const idProject = req.params.id;

    if (!req.body.name) return res.sendStatus(400);

    ProjectModel.findByIdAndUpdate(idProject, req.body)
      .then(() => {
        res.send(200);
      })
      .catch(() => {
        res.sendStatus(500);
      });
  },

  deleteProjectById(req, res) {
    ProjectModel.findById(req.params.id)
      .then((projectToDelete) => {
        if (projectToDelete.user.equals(req.user._id)) {
          Time.find({ project: req.params.id }).then((result) => {
            if (result && result.length != 0) {
              const timesToDelete = result.map((time) => time._id);
              Time.deleteMany({ _id: timesToDelete }).then(() => {
                ProjectModel.findByIdAndDelete(req.params.id)
                  .then(() => {
                    res.sendStatus(200);
                  })
                  .catch(() => {
                    res.sendStatus(500);
                  });
              });
            } else {
              ProjectModel.findByIdAndDelete(req.params.id)
                .then(() => {
                  res.sendStatus(200);
                })
                .catch(() => {
                  res.sendStatus(500);
                });
            }
          });
        } else {
          res.sendStatus(403);
        }
      })
      .catch(() => {
        res.sendStatus(500);
      });
  },
};

module.exports = projects;
