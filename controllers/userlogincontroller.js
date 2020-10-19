const siteUser = require('../models/userModel')
const bcrypt = require('bcrypt');
const session = require('express-session');


module.exports = (req,res) =>{
    const email = req.body.email;
    const password = req.body.password;
    siteUser.findOne({ email: email }, function (err, user) {
        if(err){
            console.log(err)
            res.render('userlogin', {"text": "Some Error Occured"})
        }
        else{

        if(user!==null)   {
            bcrypt.compare(password,user.password, function(err, result) {
                if(result){
                    req.session.user= user;
                    res.redirect('/user')
                    console.log("Login Successful");
                }
                else{
                    res.render('userlogin', {"text": "Wrong Credentials"})
                }
            });
        }
        else{
            res.render('userlogin', {"text": "User not Found"} )
        }
        }
    });
    

}