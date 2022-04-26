const ProjectModel = require("../models/Projects");

const projects = {
  // Liste de tous les utilisateurs
  getProjects(req, res) {
    ProjectModel.find().then((projectList) => {
      res.send(projectList);
    });
  },

  createProject(req, res) {
    const { name, r, g, b, a } = req.body;
    if (!name) return res.sendStatus(400);
    if (!r) return res.sendStatus(400);
    if (!g) return res.sendStatus(400);
    if (!b) return res.sendStatus(400);

    const color = { r, g, b, a };

    // On vérifie que l'adresse mail n'existe pas déjà dans la bdd
    ProjectModel.find({ name })
      .then((result) => {
        if (result.length !== 0) return res.sendStatus(409);
        else {
          ProjectModel.create({ name, color })
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
    const { name, r, g, b, a } = req.body;

    if (!name) return res.sendStatus(400);
    if (!r) return res.sendStatus(400);
    if (!g) return res.sendStatus(400);
    if (!b) return res.sendStatus(400);

    const color = { r, g, b, a };

    ProjectModel.findByIdAndUpdate(idProject, { name, color })
      .then(() => {
        res.send(200);
      })
      .catch(() => {
        res.sendStatus(500);
      });
  },

  modifyNameProjectsById(req, res) {
    const idProject = req.params.id;
    const { name } = req.body;
    ProjectModel.findByIdAndUpdate(idProject, { name })
      .then(() => {
        res.send(200);
      })
      .catch(() => {
        res.sendStatus(500);
      });
  },

  modifyColorProjectsById(req, res) {
    const idProject = req.params.id;
    const { r, g, b, a } = req.body;

    if (!r) return res.sendStatus(400);
    if (!g) return res.sendStatus(400);
    if (!b) return res.sendStatus(400);

    const color = { r, g, b, a };

    ProjectModel.findByIdAndUpdate(idProject, { color })
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
