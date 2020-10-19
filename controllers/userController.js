const siteUser = require('../models/userModel')
const bcrypt = require('bcrypt');
const saltRounds = 10;


module.exports = (req,res) =>{
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword
    if(password!==confirmPassword){
        data= {"text":"Confirm Password Did not the Password"}
        return res.render('siteUserSignup', {data: data } );
    }
    bcrypt.hash(req.body.password, saltRounds, function(err,hashedPassword) {
        const instance = new siteUser({
            Name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            DOB: req.body.dob,
            Gender: parseInt(req.body.gender),
            District: req.body.district,
            State: req.body.state,
        });
        var data={};
        instance.save((err)=>{
            if(err){
                console.log(err)
                data={"text":"Error creating a User"}
                res.render('siteUserSignup', {data: data } );
            }
            else{
                data= {"text":"Sign up Succesful"}
                res.render('siteUserSignup', {data: data } );
            }
        })
    });
}
