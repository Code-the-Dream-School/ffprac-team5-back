const mongoose = require('mongoose');
//const bcrypt = require('bcryptjs') add later


const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required:[true, 'Please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide valid email'
        ],
        unique: true
    },

    password:{
        type: String,
        required:[true, 'Please provide password'],
        minlength: 6,   
    }
});


module.exports = mongoose.model('User', UserSchema);