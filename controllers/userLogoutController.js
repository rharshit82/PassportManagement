module.exports = (req,res) =>{
    req.session.destroy(function(){
        console.log("user logged out.")
     });
     res.redirect('/');
}