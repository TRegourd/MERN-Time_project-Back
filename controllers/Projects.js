const ProjectModel = require("../models/Projects");

const projects = {
  // Liste de tous les utilisateurs
  getProjects(req, res) {
    ProjectModel.find({ user: req.user })
      .populate(["user"])
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
    ProjectModel.findByIdAndDelete(req.params.id)
      .then(() => {
        res.send(200);
      })
      .catch(() => {
        res.sendStatus(500);
      });
  },
};

module.exports = projects;
