const mongoose = require('mongoose')


const LoginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true, 
        trim: true,
        min: 8
    }
}, {
    timestamps: true,
    strict:true
})

module.exports = mongoose.model('loginModel', LoginSchema, 'logins')