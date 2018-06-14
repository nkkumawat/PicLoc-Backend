var express = require('express');
var router = express.Router();
var multer = require('multer');
var picture = require('../models/pictures')
var response = require('../utils/response');
var verifytoken = require('../utils/verifyuser');
var multer  = require('multer');
const uuidv4 = require('uuid/v4');
var statuscodes = require('../utils/statuscodes');
var fileNames = []
var storage = multer.diskStorage({
  destination: function(req, file, callback) {
      callback(null, "./images");
  },
  filename: function(req, file, callback) {
    var fName = uuidv4() + file.originalname;
    fileNames.push(fName)
    callback(null,  fName);
  }
});
var upload = multer({
  storage: storage
}).array("image", 2)

router.post('/' , function(req, res, next) {
    // var user_id = req.body.user_id;
    // var latitude = res.body.latitude;
    // var longitude = req.body.longitude;
    // var description = req.body.description;
    var user_id = "f2a26c5a-e2ab-4621-b128-6830fcc81b08";
    var latitude = "22.158575845";
    var longitude = "45.25856958";
    var description = "hello moto"

    verifytoken.verify(user_id).then((status) =>{
      console.log(status);
      if(status) {
        upload(req,res,function (err) {
          if (!err) {
            console.log(fileNames);
            var newPicture = [];
            fileNames.forEach(filename => {
                newPicture.push(picture({
                id: uuidv4(),
                user_id: user_id,
                pic_url: "/images/" +filename ,
                pic_latitude:  latitude,
                pic_longitude:  longitude,
                pic_description: description
              }))
            });
            fileNames = [];
            picture.insertMany(newPicture).then((status)=>{
              response.head.status = statuscodes.Ok;  // all ok
              response.body = status;
              return res.json(response);
            }).catch((error)=> {
              response.head.status = statuscodes.InternalError; //Internal server error
              response.body = error;
              return res.json(response);
            });
          } else {
            response.head.status = statuscodes.InternalError; //Internal server error
            response.body = err;
            return res.json(response);
          }
        });
      }else {
        response.head.status = statuscodes.Unauthorized; //not useer error
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