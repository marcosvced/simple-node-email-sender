require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer');

const app = express();
const path = require('path');
const PORT = 8080;
const TRANSPORTER = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS
  }
});

const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
  console.log(process.env.EMAIL_FROM)
  //__dirname : It will resolve to your project folder.
});

app.post('/email', urlencodedParser, (req, res) => {
  //Send an email here but currently dummy email
  console.log('Data:', req.body);
  res.json({ message: 'Message received!' })


  const email = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: `From: ${req.body.email}`,
    text: req.body.text
  };

  TRANSPORTER.sendMail(email, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

});


app.listen(PORT, () => console.log('Server is starting on PORT,', 8080));