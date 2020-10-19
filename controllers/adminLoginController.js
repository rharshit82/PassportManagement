const session = require('express-session');

module.exports = (req,res) =>{

    const email = req.body.email;
    const password = req.body.password ;
    if(email ==='example@example.com' && password==='example')  
    {
        var admin = {email: email, password: password};
        req.session.admin= admin ;
        res.redirect('/admindashboard')
        console.log("Login Successful");
        }
        else{
        res.render('admin', {"text": "Wrong Credentials"})
        }
    }
         