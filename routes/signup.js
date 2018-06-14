var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passwordhash = require('../utils/passworshash');
var response = require('../utils/response');
var statuscodes = require('../utils/statuscodes');
const uuidv4 = require('uuid/v4');

    
router.get('/', function(req, res, next) {
    // var username = req.body.username;
    // var email = req.body.email;
    // var password = req.body.password;
    // var location = res.body.location;
    var username = "nkkp";
    var email = "rmail";
    var password = "1254";
    var location = "location";

    User.find({username : username}).then((user) => {
        console.log(user);
        if(user.length){
            console.log(user);
            response.head.status = statuscodes.UserAlreadyExists; // user already exists
            response.body.res = user;
            return res.json(response);
        }else {
            passwordhash.encodePassword(password).then(function(hash) { 
                // console.log(hash);
                var newUser = User({
                    id : uuidv4(),
                    username : username,
                    password : hash,
                    email : email,
                    myLocation : location
                });
                newUser.save().then((usr)=>{
                    response.head.status = statuscodes.Ok;  // all ok
                    response.body = usr;
                    return res.json(response);
                }).catch((error)=> {
                    response.head.status = statuscodes.InternalError; //Internal server error
                    response.body = error;
                    return res.json(response);
                });
            }).catch(function(err) {});
        }
    }).catch((err) => {
       console.log(err);
    });
});
module.exports = router;