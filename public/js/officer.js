Users= require('../../model.js')

function confirm(aadhar){
    var YES = new Boolean(true);
    const filter = { Aadhar: aadhar };
    const update = { Status: YES };
    Users.findOneAndUpdate(filter, update);
    console.log('done')
}