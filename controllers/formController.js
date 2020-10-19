const { json } = require('express');
const session = require('express-session');
const Users = require('../model')


exports.userForm = (req,res,next) => {
    const instance = new Users({
        Name: req.body.name,
        email: req.body.email,
        DOB: req.body.dob,
        Gender: parseInt(req.body.gender),
        District: req.body.district,
        State: req.body.state,
        PANNo: req.body.panno,
        Aadhar: req.body.aadhar
    });
    instance.save(function (err) {
    if (err) console.log(err)
    else {
        console.log("Saved")
    }
    res.render('user.pug', {"text": "Your form has been Submitted. It will get processed in 7-14 Days"})
});
}

exports.officerData = (req,res) =>{
    Users.find({}, function (err, allDetails) {
        if (err) {
            console.log(err);
        } else {
            res.render("officer.pug", { details: allDetails })
        }
    })
}
