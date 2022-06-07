const sendContactNotificationEmail = require("../libs/sendContactNotificationEmail");
const Contact = require("../models/Contacts");

function postNewMessage(req, res) {
  Contact.create(req.body)
    .then(() => {
      sendContactNotificationEmail(req.body);
      res.send(`New Message Created`);
    })
    .catch((error) => console.log(error));
}

const Contacts = { postNewMessage };

module.exports = Contacts;
