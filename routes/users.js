var express = require("express");
var router = express.Router();

const users = require("../controllers/Users");
const checkAuth = require("../middlewares/checkAuth");

/* GET users listing. */
router.get("/", checkAuth, users.getUsers);

router.post("/", users.createUser);
router.get("/id/:id", users.getUserById);
router.put("/id/:id", users.modifyUsersById);
router.delete("/id/:id", users.deleteUserById);

router.get("/name/:lastname", users.getUserByLastname);

module.exports = router;
