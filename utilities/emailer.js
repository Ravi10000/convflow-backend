const { createTransport } = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

const handlebarOptions = {
  viewEngine: {
    extName: ".hbs",
    partialsDir: path.resolve("./"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./views"),
  extName: ".hbs",
};

async function sendEmail({ formContent, to, subject }) {
  const transporter = createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  transporter.use("compile", hbs(handlebarOptions));
  const mailOptions = {
    from: `convflow <${process.env.EMAIL_USERNAME}>`,
    to,
    subject,
    template: "email",
    context: {
      name: formContent.name,
      email: formContent.email,
      title: formContent.title,
      company: formContent.company,
      usecase: formContent.usecase,
      message: formContent.message,
    },
  };

  return await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;
