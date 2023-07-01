import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import ENV from '../config.js';

export default function registerMail(req, res){

  const { username, userEmail } = req.body;

//   nodemailer transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: ENV.emailid,
      pass: ENV.password
    }
  });

//   mailgen format with mail description
  var mailgenerator = new Mailgen({
    theme: "salted",
    product: {
      name: "Password Protection App",
      link: "https://mailgen.js/"
    }
  });

  let response = {
    body: {
      name: username ,
      intro: ['Signup successful!', 'Thank you for checking out the custom user authentication project'],
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
    from: ENV.emailid,
    to: userEmail,
    subject: 'signup successful',
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


