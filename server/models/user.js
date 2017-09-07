const mongoose = require('mongoose');

// ### The User Model ###
let User = mongoose.model('User', {
    name: {
        type: String,
        require: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        require: true,
        trim: true,
        minlength: 6
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = {User};
