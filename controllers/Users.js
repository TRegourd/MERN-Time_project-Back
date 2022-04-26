const UserModel = require("../models/Users");

const users = {
  // Utilisateur Courtant
  getUsers(req, res) {
    UserModel.findById(req.user._id).then((usersList) => {
      res.send(usersList);
    });
  },

  createUser(req, res) {
    const userForm = req.body;

    if (!userForm.first_name) return res.sendStatus(400);
    if (!userForm.last_name) return res.sendStatus(400);
    if (!userForm.email) return res.sendStatus(400);
    if (!userForm.password) return res.sendStatus(400);

    // On vérifie que l'adresse mail n'existe pas déjà dans la bdd
    UserModel.find({ email: userForm.email })
      .then((result) => {
        if (result.length !== 0) return res.sendStatus(409);
        else {
          UserModel.create(userForm)
            .then(() => {
              res.sendStatus(201);
            })
            .catch(() => res.sendStatus(500));
        }
      })
      .catch(() => res.sendStatus(500));
  },

  // Renvoi l'utilisateur ID
  getUserById(req, res) {
    UserModel.findById(req.params.id)
      .then((oneUser) => {
        res.send(oneUser);
      })
      .catch(() => res.sendStatus(500));
  },

  getUserByLastname(req, res) {
    UserModel.findOne({ last_name: req.params.lastname })
      .then((oneUser) => {
        res.send(oneUser);
      })
      .catch(() => res.sendStatus(500));
  },

  modifyUsersById(req, res) {
    const idUser = req.params.id;
    const { first_name, last_name, email, password } = req.body;

    if (!first_name) return res.sendStatus(400);
    if (!last_name) return res.sendStatus(400);
    if (!email) return res.sendStatus(400);
    if (!password) return res.sendStatus(400);

    UserModel.findByIdAndUpdate(idUser, {
      first_name,
      last_name,
      email,
      password,
    })
      .then(() => {
        res.send(200);
      })
      .catch(() => {
        res.sendStatus(500);
      });
  },

  modifyCurrentUser(req, res) {
    if (!req.user.first_name) return res.sendStatus(400);
    if (!req.user.last_name) return res.sendStatus(400);

    const { first_name, last_name, adress, position } = req.user;
    const updatedUser = req.body;

    // if (position != req.body.position)

    console.log(first_name, last_name, adress, position, req.body.position);

    UserModel.findByIdAndUpdate(req.user._id, updatedUser)
      .then(() => {
        console.log("user updated");
        res.send(200);
      })
      .catch(() => {
        res.sendStatus(500);
      });
  },

  deleteUserById(req, res) {
    UserModel.findByIdAndDelete(req.params.id)
      .then(() => {
        res.send(200);
      })
      .catch(() => {
        res.sendStatus(500);
      });
  },
};

module.exports = users;
