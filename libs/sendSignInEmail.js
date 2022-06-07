const nodemailer = require("nodemailer");
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS;

async function sendSignInEmail(user) {
  if (user) {
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
        to: user.email,
        subject: "Hello ✔",
        text: `Thanks for signing in to All-in-QR`,
        html: `    <p>Thanks for signing in to All-in-QR</p>
      <p>
        Get Started organizing your time
        <button>
          <a href="http://localhost:3000/login">Let's go</a>
        </button>
      </p>`,
      });

      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = sendSignInEmail;
