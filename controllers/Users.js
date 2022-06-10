const UserModel = require("../models/Users");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const users = {
  // Utilisateur Courtant
  getUsers(req, res) {
    UserModel.findById(req.user._id)
      .populate(["team"])
      .then((usersList) => {
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

  async modifyCurrentUser(req, res) {
    if (req.body.password && req.body.password !== "") {
      const updatedUser = req.body;
      const hashedPassword = await bcrypt.hash(
        updatedUser.password,
        saltRounds
      );
      updatedUser.password = hashedPassword;
      UserModel.findByIdAndUpdate(req.user._id, updatedUser)
        .then(() => {
          res.send(200);
        })
        .catch(() => {
          res.sendStatus(500);
        });
    } else {
      const { first_name, last_name, adress, position, company, email } =
        req.body;
      UserModel.findByIdAndUpdate(req.user._id, {
        first_name,
        last_name,
        adress,
        position,
        email,
        company,
      })
        .then(() => {
          res.send(200);
        })
        .catch(() => {
          res.sendStatus(500);
        });
    }
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
