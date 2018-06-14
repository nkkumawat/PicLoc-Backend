var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var picture = new Schema({
    id: { type: String , required : true },
    user_id: { type: String , required : true },
    pic_url: { type: String , required : true },
    pic_latitude:  { type: String , required : true },
    pic_longitude:  { type: String, required : true },
    pic_description: { type: String },
    date_and_time : { type: Date, default: Date.now }
});


var Picture = mongoose.model('pictures', picture);
module.exports = Picture;