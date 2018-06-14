var express = require('express');
var router = express.Router();
var picture = require('../models/pictures')
var response = require('../utils/response');
var verifytoken = require('../utils/verifyuser');
var statuscodes = require('../utils/statuscodes');

router.get('/' , function(req, res, next) {
    // var user_id = req.body.user_id;
    // var latitude = res.body.latitude;
    // var longitude = req.body.longitude;

    var user_id = "f2a26c5a-e2ab-4621-b128-6830fcc81b081";
    var latitude = "22.158575845";
    var longitude = "45.25856958";
  
    verifytoken.verify(user_id).then((status) =>{
      console.log(status);
      if(status) {
        picture.find({user_id : user_id ,
                      pic_latitude: { $gt: latitude - 1, $lt: latitude +1 },
                      pic_longitude: { $gt: longitude -1, $lt: longitude +1 }}).then((pictures)=> {
            response.head.status = statuscodes.Ok;  // all ok
            response.body.res = pictures;
            return res.json(response);
        }).catch((err)=> {
            response.head.status = statuscodes.InternalError;  // Internal server error
            response.body.res = "Internal server Error";
            return res.json(response);
        });
      }else {
        response.head.status = statuscodes.Unauthorized; //not user error
        response.body = "unauthorized user";
        return res.json(response);
      }
    }).catch((err) => {
      console.log("Error" + err);
      response.head.status = statuscodes.InternalError; //Internal server error
      response.body = err;
      return res.json(response);
    }) 
});
module.exports = router;