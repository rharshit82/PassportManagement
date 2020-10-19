const officer = require('../models/officerModel')
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (req,res) =>{
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword
    if(password!==confirmPassword){
        const data= {"text":"Passwords do not match"}
        return res.render('adminDashboard', { data: data } );
    }
    // officer.findOne({ email: req.body.email }, function (err, user) {
    //     if(err){
    //         console.log(err)
    //         return res.render('adminDashboard', {"text": "Some Error Occured"})
    //     }
    //     else{
    //         if(user!==null){
    //         const data = {"text": "Account with email exists. Go to Officer Login"}
    //         return res.render('adminDashboard',{data: data})
    //         }
    //     }
    // })
    bcrypt.hash(req.body.password, saltRounds, function(err,hashedPassword) {
        console.log(password, hashedPassword)
        const instance = new officer({
            Name: req.body.name,
            email: req.body.email,
            password: hashedPassword, 
            Gender: parseInt(req.body.gender),

        });
        var data={};
        instance.save((err)=>{
            if(err){
                console.log(err)
                data={"text":"Error creating a User"}
                res.render('adminDashboard', {data: data } );
            }
            else{
                data= {"text":"Sign up Succesful"}
                console.log("Officer Created")
                res.render('adminDashboard', {data: data } );
            }
        })
    });
}
