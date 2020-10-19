const officer = require('../models/officerModel')
const bcrypt = require('bcrypt');
const session = require('express-session');


module.exports = (req,res) =>{
    const email = req.body.email;
    const password = req.body.password;
    officer.findOne({ email: email }, function (err, officer) {
        if(err){
            console.log(err)
            res.render('officerlogin', {"text": "Some Error Occured"})
        }
        else{
            if(officer!==null){
            bcrypt.compare(password,officer.password, function(err, result) {
                if(result){
                    console.log("Login Successful");
                    req.session.officer= officer;
                    return res.redirect('/officer')
                }
                else{
                    console.log("Wrong credentials")
                    return res.render('officerlogin', {"text": "Wrong Credentials"})
                }
            });
        }
        else{
            return res.render('officerlogin', {"text": "No User Found"})
        }



        }
    });
    

}