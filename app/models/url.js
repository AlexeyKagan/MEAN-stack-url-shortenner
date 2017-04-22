var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var urlSchema = new Schema({
    longUrl : String,
    shortUrl : String,
    clicks : 0,
    description : String,
    tags : String
});

module.exports = mongoose.model('url', urlSchema);
