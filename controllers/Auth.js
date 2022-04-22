const UserModel = require("../models/Users");

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(400);

  // vérifier si email et password correspondent
  const user = await UserModel.findOne({ email });

  if (user === null) {
    res.status(400);
    return res.send("Vous n'existez pas");
  }

  //const isMatch = await bcrypt.compare(password, user.password);

  if (user.password === req.body.password) res.send("Vous êtes connecté.");
  else {
    res.status(400);
    res.send("Mot de passe incorrect");
  }
}

const Auth = { login };

module.exports = Auth;
