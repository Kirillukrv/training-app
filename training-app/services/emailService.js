const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

transporter.use('compile', hbs({
  viewEngine: {
    extname: '.hbs',
    layoutsDir: path.join(__dirname, '../views/emails/'),
    defaultLayout: false
  },
  viewPath: path.join(__dirname, '../views/emails/'),
  extName: '.hbs'
}));

const sendEmail = (to, subject, template, context) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    template,
    context
  };
  return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
