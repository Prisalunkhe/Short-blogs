const mongoose = require('mongoose');

const usercollection = 'user';

const User = mongoose.model(usercollection, {
    email: String,
    password: String,
    authtoken:[{
        type : String 
    }],
});



module.exports = User;