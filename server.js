require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer');

const app = express();
const path = require('path');
const PORT = process.env.PORT || 8080;

const urlencodedParser = bodyParser.urlencoded({ extended: false })

const TRANSPORTER = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS
  }
});


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('view engine', 'html')
  .get('/', (req, res) => res.render('index'))
  .post('/email', urlencodedParser, (req, res) => {
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

  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))