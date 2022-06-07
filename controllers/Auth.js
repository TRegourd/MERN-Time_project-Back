const UserModel = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const { v4: uuidv4 } = require("uuid");
const sendResetEmail = require("../libs/sendResetEmail");

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(400);

  const lowEmail = email.toLowerCase().trim();
  const user = await UserModel.findOne({ email: lowEmail });
  if (user === null) {
    res.status(400);
    return res.send("No User Found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  const token = jwt.sign({ id: user._id }, process.env.SECRET);

  if (isMatch) res.send({ jwt: token });
  else {
    res.status(400);
    res.send("Incorrect Login");
  }
}

async function signin(req, res) {
  if (
    !req.body.first_name ||
    !req.body.last_name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.confirmPassword
  ) {
    res.status(400).send("Incorrect input");
  } else {
    const lowEmail = req.body.email.toLowerCase().trim();

    const isExistingUser = await UserModel.findOne({ email: lowEmail });

    if (isExistingUser === null) {
      try {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const newUser = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: lowEmail,
          password: hashedPassword,
          position: "",
          adress: "",
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

async function forgot(req, res) {
  if (!req.body.email) {
    res.status(400).send("Incorrect input");
  } else {
    const lowEmail = req.body.email.toLowerCase().trim();

    const isExistingUser = await UserModel.findOne({ email: lowEmail });

    if (isExistingUser !== null) {
      try {
        const uuid = {
          token: uuidv4(),
          timeStamp: Date.now(),
        };
        await UserModel.findOneAndUpdate({ email: lowEmail }, { uuid: uuid });
        sendResetEmail(isExistingUser.email, uuid);
        res.sendStatus(200);
      } catch (err) {
        console.log(err);
        res.status(400).send(err);
      }
    } else {
      res.status(500).send("No user with this email");
    }
  }
}

async function reset(req, res) {}

const Auth = { login, signin, forgot, reset };

module.exports = Auth;
