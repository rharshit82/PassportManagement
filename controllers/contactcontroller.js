const contactModel = require('../models/contactModel')

module.exports= (req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const query = req.body.query;
    const instance = new contactModel({
        Name : name,
        Email : email,
        Query : query
    })
    instance.save((err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log('Contact data submitted');
            
            res.render('contact.pug', { "success" : "Submission Successful"} )
        }
    })
}