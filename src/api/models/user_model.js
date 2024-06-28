const mongoose = require ('mongoose')

const userSchema = new mongoose.Schema({
    email:{type:String, required:true, trim:true},
    password:{type: String, required:true, trim:true},
    name:{type: String, required: true, trim: true},
    rol:{ type: String, enum: ['user', 'admin'], default: 'admin'},
    avatar: {type: String, default:'https://cdn-icons-png.flaticon.com/256/6388/6388307.png'},
    playList:[{type: mongoose.Types.ObjectId, ref: 'songs'}]
}, {
    timeStamp:true
})

const User = mongoose.model('users', userSchema, 'users');

module.exports = User;