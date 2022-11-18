const nodemailer = require("nodemailer");

const sendMail = async (data) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "Cook With Me Admin",
    to: data.email,
    subject: data.subject,
    text: data.message,
    // html: "<p>HTML version of the message</p>",
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  }); 

//   const info = await transporter.sendMail(message);

//   return info;
};

module.exports = sendMail;