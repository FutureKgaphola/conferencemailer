require('dotenv').config();
const axios = require("axios");
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
//const moment = require('moment');
const nodemailer = require("nodemailer");
const fs = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.post('/sendtoclients', async (req, res) => {
  const { name, email, message, subject } = req.body;
  const imageAttachment = await readFileAsync('conf_image.jpeg');
  try {
    const transporter = nodemailer.createTransport({
      host: 'mail.limpopoinvestmentconference.co.za',
      port: '465',
      secure: true,
      auth: {
        user: 'no-reply@limpopoinvestmentconference.co.za',
        pass: 'Help0123!@',
      },
      rejectUnauthorized: false,
    });

    transporter.sendMail({
      from: 'noreply@limpopoinvestmentconference.co.za',
      to: email,
      subject: subject,

      html: `<p>Dear ${name}</p><br>
      <p>Limpopo Premier, Dr. Phophi Ramathuba kindly invites you to join her at the 4th Edition of the Limpopo Investment Conference scheduled as follows:</p></br>
      <p>Venue: Protea Hotel, The Ranch Resort, Polokwane in Limpopo</p>
      <p>Date: 7 & 8 November 2024</p>
      <p>Time: 08h00</p>
      <p>Dress Code: Business or Formal</p>
      <p>This prestigious event will gather industry experts who will explore exciting opportunities across key sectors: Agriculture and agro-processing, Infrastructure and Logistics, Mining and mineral Beneficiation, Green Energy, Tourism, and Automotive Sector.
        Join us to engage with industry leaders, network with potential partners, and discover how Limpopo’s Investment Opportunities.
        We look forward to hosting you. Don’t miss the opportunity to be part of Limpopo’s economic growth story.</p></br>
      <p>For more information contact Ms Sharon Mathebula 083 440 1015 Sharon.Mathebula@lieda.co.za; Vicky Manaka 083 701 3935 Vicky.Manaka@lieda.co.za or Tsakani Ngema 082 906 2732 Tsakani.Ngema@lieda.co.za</p></br>
      <p><strong>Kindly confirm your attendance by completing the registration through the RSVP link. Please note that this invitation is STRICTLY non-transferable!</strong></p></br>
      <p> RSVP link: <a href='https://www.lieda.co.za/rsvp/index.php?token=1bbb3ac11ba699f1c6b5937e85cd2279f8fbb6b842b6174200c9cd9ec7a2920c' target='_blank'>https://www.lieda.co.za/rsvp/index.php?token=1bbb3ac11ba699f1c6b5937e85cd2279f8fbb6b842b6174200c9cd9ec7a2920c</a></p></br>
      <p>Regards</p></br>

      <p>Limpopo Economic Development Agency Team.</p>
      <img style="aspect-ratio: 3 / 4; width:560px; height:430px;" src="cid:uniqueImageCID" alt="Embedded Image">`,
      attachments: [{
        filename: 'conf_image.jpeg',
        content: imageAttachment,
        encoding: 'base64',
        cid: 'uniqueImageCID',
    }],
      
    }).then(() => {
      res.status(200).json({ message: "email deliverd" });
    }).catch((error) => {
      res.status(400).json({ message: "error: " + error?.message });
    })
  } catch (error) {
    res.status(400).json({ message: error?.mesage });
  }
});
app.listen(4000, () => {
  console.log("Listening on port : " + 4000)
  //console.log(process.env.process.env.USER)
});
