var mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    Name : {type: String, required: true},
    email : {type: String, required: true},
    DOB : {type: Date, required: true},
    Gender: {type:Boolean, required: true},
    District: {type: String, required: true},
    State: {type: String, required: true},
    PANNo: {type: Number, required: true},
    Aadhar: {type: Number, required: true, unique : true, dropDups: true},
    Status : {type: Boolean, default: false}
  });
module.exports = mongoose.model('Users', UserSchema );
