var express = require("express");
var router = express.Router();

const users = require("../controllers/Users");

/* GET users listing. */
router.get("/", users.getUsers);

router.post("/", users.createdUsers);
router.get("/id/:id", users.getUserById);
router.put("/id/:id", users.modifyUsersById);
router.delete("/id/:id", users.deleteUserById);

router.get("/name/:lastname", users.getUserByLastname);

module.exports = router;
