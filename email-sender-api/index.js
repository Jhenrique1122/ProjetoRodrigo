const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '049df24757f0a9',
    pass: '9eccfa842d6ffe'
  }
});

app.use(cors());

app.post('/send-email', async (req, res) => {
  const { email } = req.body;
  try {
    await transporter.sendMail({
      from: '"Example Team" <from@example.com>',
      to: email,
      subject: 'Test Email',
      text: 'This is a test email'
    });
    res.status(200).send({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).send({ error: 'Failed to send email' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
