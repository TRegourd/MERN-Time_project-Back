const ProjectModel = require("../models/Projects");


const projects = {

      // Liste de tous les utilisateurs 
      getProjects(req, res) {
            ProjectModel.find().then((projectList) => {
                  res.send(projectList);
            });
      },

      // Renvoi l'utilisateur ID
      getProjectById (req, res) {
            ProjectModel.findById(req.params.id)
                  .then((oneProject) => {
                        res.send(oneProject);
                  })
                  .catch(() => res.sendStatus(500));
      },
      
      modifyProjectsById (req, res) {

            const idProject = req.params.id;
            const { name, r, g, b, a } = req.body;
            
            if (!name) return res.sendStatus(400);
            if (!r) return res.sendStatus(400);
            if (!g) return res.sendStatus(400);
            if (!b) return res.sendStatus(400);

            const color =  { r, g, b, a };
            console.log(color);
            ProjectModel.findByIdAndUpdate(idProject, { name, color })
                  .then(() => {
                        res.send(200);
                  })
                  .catch (() => {
                        res.sendStatus(500);
                  })

      }, 

      deleteProjectById (req, res) {
            ProjectModel.findByIdAndDelete(req.params.id)
                  .then(() => {
                        res.send(200);
                  })
                  .catch(() => {
                        res.sendStatus(500);
                  });
      }
    
}

module.exports = projects;