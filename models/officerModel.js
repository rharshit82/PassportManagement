var mongoose = require('mongoose');

const OfficerSchema = new mongoose.Schema({
    Name : {type: String, required: true},
    email : {type: String, required: true, unique : true },
    password: {type: String, required: true},
    Gender: {type:Boolean, required: true}
  });
module.exports = mongoose.model('Officer', OfficerSchema );