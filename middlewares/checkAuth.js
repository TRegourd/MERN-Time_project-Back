const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const getToken = (req) => String(req.get("Authorization")).split(" ")[1];

function checkAuth(req, res, next) {
  const token = getToken(req);

  if (!token) return res.sendStatus(401);
  console.log(token);

  try {
    console.log("Token OK", token);
    const { id } = jwt.verify(token, process.env.SECRET);
    User.findById(id).then((user) => {
      req.user = user;
      next();
    });
  } catch (err) {
    res.sendStatus(403);
  }
}

module.exports = checkAuth;
