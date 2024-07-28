const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
    title:{type:String, required:true, trim:true},
    year:{type: Number, required: true, trim:true},
    cover:{type: String, required:true, trim:true},
    musicians:[{type: mongoose.Types.ObjectId, ref: 'musicians'}],
    songs:[{type: mongoose.Types.ObjectId, ref: 'songs'}]
}, {
    timeStamp:true
})

const Album = mongoose.model('albums', albumSchema, 'albums');

module.exports = Album;