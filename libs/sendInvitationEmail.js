const nodemailer = require("nodemailer");
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS;

async function sendInvitationEmail(email, team, manager) {
  if (email && team && manager) {
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
        from: `"${manager.first_name} ${manager.last_name}" <${manager.email}>`,
        cc: email,
        subject: "Register to The Time Machine !",
        text: `Please click on this link: http://localhost:3000/invite/${team.id} to register.`,
        html: `    <h1>Register to The Time Machine</h1>
      <p>You have been invited to join the team "${team.name}" by ${manager.first_name} ${manager.last_name}</p>
      <p>
        Please follow
        <a href="http://localhost:3000/register/${team.id}"
          >this link</a
        >
        to register
      </p>
      `,
      });

      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = sendInvitationEmail;
