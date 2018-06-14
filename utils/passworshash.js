var bcrypt = require('bcrypt');
const saltRounds = 10;
var Promise = require('promise');
module.exports = {
    encodePassword : function(password) {
        return new Promise(function(resolve ,reject) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                    if(!err){
                        resolve(hash);
                    }else {
                        reject(err);
                    }
                });
            });
        });
    },

    decodePassword : function(password , hash) {
        return new Promise(function(resolve ,reject) {
            bcrypt.compare(password, hash, function(err, res) {
                if(!err){
                    // console.log(hash + " \n" + password);
                    resolve(res);
                }else {
                    reject(err);
                }
            });
       
        })
    }
};
