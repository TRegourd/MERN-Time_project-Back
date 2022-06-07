const nodemailer = require("nodemailer");
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS;

async function sendResetEmail(email, uuid) {
  if (email) {
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
      to: email,
      subject: "Reset Password",
      text: `To reset your password, please click on this link: http://localhost:3000/reset/${uuid.token}.This link is valid 15 minutes`,
      html: `<p>To reset your password, please click on <a href="http://localhost:3000/reset/${uuid.token}">this link</a></p>
      <p>This link is valid 15 minutes</p>`,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
}

sendResetEmail().catch(console.error);

module.exports = sendResetEmail;
