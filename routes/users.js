var express = require('express');
var router = express.Router();

const users = require("../controllers/Users");


/* GET users listing. */
router.get('/', users.getUsers);

router.get("/id/:id", users.getUserById);
router.delete("/id/:id", users.deleteUserById);
router.post('/id/:id', users.modifyUsersById);

router.get("/name/:lastname", users.getUserByLastname);



module.exports = router;
