const mongoose = require('mongoose')
const allowedGenders = ['M', 'F', 'not specified']


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    dob: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    username: {
        type: String,
        required: true,
        unique:true
    },
    gender: {
        type: String,
        enum: allowedGenders,
        required: false,
        default: 'not specified'
    },
    address: {
        type: String,
        required: false
    }
}, {
    timestamps: true,
    strict:true
})

module.exports = mongoose.model('userModel', UserSchema, 'users')