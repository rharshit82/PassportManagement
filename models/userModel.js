var mongoose = require('mongoose');

const siteUser = new mongoose.Schema({
    Name : {type: String, required: true},
    email : {type: String, required: true, unique : true},
    password: {type: String, required: true},
    Gender: {type:Boolean, required: true},
    DOB : {type: Date, required: true},
    District: {type: String, required: true},
    State: {type: String, required: true},
  });

module.exports = mongoose.model('siteUser', siteUser );