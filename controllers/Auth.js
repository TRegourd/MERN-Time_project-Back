const UserModel = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(400);

  const user = await UserModel.findOne({ email });

  if (user === null) {
    res.status(400);
    return res.send("Vous n'existez pas");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  const token = jwt.sign({ id: user._id }, process.env.SECRET);

  if (isMatch) res.send({ jwt: token });
  else {
    res.status(400);
    res.send("Mot de passe incorrect");
  }
}

async function signin(req, res) {
  if (
    !req.body.first_name ||
    !req.body.last_name ||
    !req.body.email ||
    !req.body.password
  ) {
    res.status(400).send("Incorrect input");
  } else {
    const isExistingUser = await UserModel.findOne({ email: req.body.email });

    if (isExistingUser === null) {
      try {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const newUser = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: hashedPassword,
        };
        await UserModel.create(newUser);
        res.status(204).send("User created");
      } catch (err) {
        res.status(400).send(err);
      }
    } else {
      res.status(500).send("User already exists");
    }
  }
}

const Auth = { login, signin };

module.exports = Auth;
