const mongoose = require('mongoose')



const BookSchema = new mongoose.Schema({
    asin: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
    },
    img: {
    type: String,
        required: false,
        trim: true
    },
    price: {
        type: mongoose.Decimal128,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    strict: true    
})

module.exports = mongoose.model('bookModel', BookSchema, 'books')