const Users = require('../model')

module.exports = (req, res,next) =>{
    console.log(req.body.Aadhar, req.body.Name, req.body.Email);
    Users.findOne({
        Name: req.body.Name,
        Aadhar: req.body.Aadhar,
        email: req.body.Email
    }, (err,user) =>{
        if(err){
            console.log(err)
            res.redirect('/status')
        }
        else{
            try{
            const data = {
                "Name" : user.Name,
                "email": user.email,
                "Status": user.Status,
                "District": user.District
            }
            console.log(user)
            return res.render('status.pug',{ data: data});
        }
        catch{
            return res.render('status.pug', {"notFound" : true});
        }
            
            
        }

    })

}