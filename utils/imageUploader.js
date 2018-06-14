var multer  = require('multer');
var uploader = multer({ dest: './images/' });

module.exports = {
    multiUploader : function(req, res){ 
        // console.log("ok-1");

        uploader.fields([{ name: 'image', maxCount: 10 }] , function(err , status) {
            console.log("ok-1");
            if(!err) {
                return status;
            }else {
                return err;
            }
        });


        // return new Promise(function(resolve ,reject) {
        //     console.log("ok-1");
        //     uploader.fields([{ name: 'image', maxCount: 10 }] , function(err , status) {
        //         console.log("ok-1");
        //         if(!err) {
        //             resolve(status);
        //         }else {
        //             reject(err);
        //         }
        //     });
        // })
    }

}

