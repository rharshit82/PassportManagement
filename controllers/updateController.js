const Users = require('../model')
const nodemailer = require("nodemailer");

module.exports = (req, res) => {
    aadhar = parseInt(req.params.aadhar);
    const filter = { Aadhar: aadhar };
    const update = { Status: Boolean(true) };
    Users.findOneAndUpdate(filter, update, () => {
        console.log("Done");
    }).then(async function mailer() {
        let testAccount = await nodemailer.createTestAccount()

        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: testAccount.user, // generated ethereal user
              pass: testAccount.pass, // generated ethereal password
            },
            tls:{
                rejectUnauthorized:false
            }
          });
        console.log(testAccount.user)
        var mailOptions = {
            from: `${testAccount.user}`,
            to: 'hampton.jencarlo@eerees.com',
            subject: 'Sending Email using Node.js',
            text: 'That was easy!',
            html: "<b>That was easy!</b>"
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    })
    console.log(filter, update)
    res.redirect('/officer')
}