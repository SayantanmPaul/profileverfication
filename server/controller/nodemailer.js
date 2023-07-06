import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import dotenv from 'dotenv';

dotenv.config({path: '../config.env'})

export default function registerMail(req, res){

  const { username, userEmail, text, subject } = req.body;

//   nodemailer transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.emailid,
      pass: process.env.password,
    }
  });

//   mailgen format with mail description
  var mailgenerator = new Mailgen({
    theme: "default",
    product: {
      name: "User Authentication App",
      link: "https://mailgen.js/"
    }
  });

  let response = {
    body: {
      name: username ,
      intro: text || ['Signup successful!', 'Thank you for checking out the custom user authentication project'],
      action: {
        button:{
            color: '#48cfad',
            text: 'checkout project repo',
            link: 'https://github.com/SayantanmPaul/profileverfication'
          }
      }
    }
  };

//   generate html email content
  const mail = mailgenerator.generate(response);

//   sender and receiver and content
  const message = {
    from: process.env.emailid,
    to: userEmail,
    subject: subject || 'signup successful',
    html: mail
  };

  try {
    // send email
    transporter.sendMail(message);

    return res.status(200).send({ message: "send mail successful" });

  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};


