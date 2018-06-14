
var User = require('../models/user');

module.exports = {
    verify : function(user_id) {
        return new Promise(function(resolve ,reject) {
            User.find({id : user_id}).then((user) => {
                // console.log(user);
                if(user.length){
                   resolve(true);
                }else {
                    resolve(false);
                }
            }).catch((err) => {
                reject(err);
            })
        })
    }
}