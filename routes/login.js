var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passwordhash = require('../utils/passworshash');
var response = require('../utils/response');
var statuscodes = require('../utils/statuscodes');
router.get('/', function(req, res, next) {
    // var username = req.body.username;
    // var password = req.body.password;

    var username = "nkkp"; 
    var password = "1254";

    User.find({username : username}).then((user) => {
        console.log(user);
        if(user.length){
            console.log(user[0].password);
            console.log(password);
            passwordhash.decodePassword(password , user[0].password).then((pass)=>{
                console.log(pass);
                if(pass) {
                    response.head.status = statuscodes.Ok;  // all ok
                    response.body.res = user;
                    return res.json(response);
                }else {
                    response.head.status = statuscodes.Unauthorized;  // password wrong
                    response.body.res = "wrong password!";
                    return res.json(response);
                }
            }).catch((err)=>{
                response.head.status = statuscodes.InternalError; //Internal server error
                response.body.res = "INternal server error";
                return res.json(response);
            });
        }else {
            response.head.status = statuscodes.UserDoesNotExists; //user not found error
            response.body.res = "user not found";
            return res.json(response);
        }
    }).catch((err) => {
        console.log(err);
        response.head.status = statuscodes.InternalError; //Internal server error
        response.body.res = err;
        return res.json(response);
    });
});
module.exports = router;