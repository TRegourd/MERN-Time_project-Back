const nodemailer = require("nodemailer");
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS;

async function sendContactNotificationEmail(contact) {
  if (contact) {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: MAIL_USER,
          pass: MAIL_PASS,
        },
      });

      let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>',
        to: '"Fred Foo " <foo@example.com>',
        subject: "You received a new contact from The Time Machine",
        text: `You received a new contact from The Time Machine`,
        html: `    <p>You received a new contact from The Time Machine</p>
        <p>Email : ${contact.email}</p>
        <p>Message : ${contact.message}</p>`,
      });

      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = sendContactNotificationEmail;
