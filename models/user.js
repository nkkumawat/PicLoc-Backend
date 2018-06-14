var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
    id: { type: String , required : true },
    username: { type: String , required : true },
    password: { type: String , required : true },
    email:  { type: String , required : true },
    myLocation:  { type: String  }
});


var User = mongoose.model('user', user);

module.exports = User;