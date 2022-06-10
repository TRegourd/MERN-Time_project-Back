var express = require("express");
var router = express.Router();

const users = require("../controllers/Users");
const checkAuth = require("../middlewares/checkAuth");

router.get("/", checkAuth, users.getUsers);
router.put("/", checkAuth, users.modifyCurrentUser);
router.post("/", users.createUser);
router.delete("/id/:id", users.deleteUserById);

module.exports = router;
