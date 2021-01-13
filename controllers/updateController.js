const Users = require('../model')
const nodemailer = require("nodemailer");
const { getMaxListeners } = require('../model');

module.exports = (req, res) => {
    var email='rharshit82@gmail.com'; // default
    aadhar = parseInt(req.params.aadhar);
    const filter = { Aadhar: aadhar };
    const update = { Status: Boolean(true) };
    Users.findOneAndUpdate(filter, update, (err,User) => {
        console.log("Done");
        if(err){
            console.log(err);
        }
        else{
            email=User.email;
        }
    })
    .then(function mailer() {
        console.log(email)
        var transport = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "bestorderin@gmail.com",
                pass: "Passport123@"
            }
        });
        var mailOptions = {
            from: '"BestOrder" <bestorderin@gmail.com>',
            to: email,
            subject: 'Application approved',
            text: 'The application you submitted is succesfully approved'
        };
        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
        });
    })
    console.log(filter, update)
    res.redirect('/officer')
}