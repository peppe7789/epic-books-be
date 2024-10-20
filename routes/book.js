const express = require('express')
const books = express.Router()
const BooksModel = require('../models/BooksModel')
const { default: mongoose } = require('mongoose')

books.get('/books', async (req, res) => {
    const { page, pageSize = 12 } = req.query


    try {
        const books = await BooksModel
            .find()
            .limit(pageSize)
            .skip((page - 1) * pageSize)
        
        const count = await BooksModel.countDocuments()
        const totalPages = Math.ceil(count / pageSize)

        if (books.length === 0) {
            return res
                .status(404)
                .send({
                    statusCode: 404,
                    message: "Book not found"
                })
        }

        res
            .status(200)
            .send({
                statusCode: 200,
                count,
                totalPages,
                books
            })
    } catch (error) {
        req
            .status(500)
            .send({
                statusCode: 500,
                message: "Oop, somethings went wrong"
            })
    }
})

books.get('/books/:bookId', async (req, res) => {
    const { bookId } = req.params
    try {
        const book = await BooksModel.findById(bookId)

        if (!book) {
            return res
                .status(404)
                .send({
                    statusCode: 404,
                    message: " Book not found"
                })

        }
        res
            .status(200)
            .send({
                statusCode: 200,
                book
            })
    } catch (error) {
        res
            .status(500)
            .send({
                statusCode: 500,
                message: "Oop, somethings went wrong"
            })
    }
})


books.post('/books/create', async (req, res) => {
    const { title, img, price, category } = req.body
    const newBook = new BooksModel({
        title: title,
        img: img,
        price: price,
        category, category
    })
    try {
        const book = await newBook.save()

        res
            .status(201)
            .send({
                statusCode: 201,
                book
            })
    } catch (error) {
        res
            .status(500)
            .send({
                statusCode: 500,
                message: "Oop, somethings went wrong"
            })
    }
})


books.put('/books/:bookId', async (req, res) => {
    const { bookId } = req.params
    const book = await BooksModel.findById(bookId)

    if (!book) {
        return res
            .status(400)
            .send({
                statusCode: 400,
                message: "No book found with given userId"
            })
    }
    try {
        const updateBookData = req.body
        const options = { new: true }

        const result = await BooksModel.findByIdAndUpdate(bookId, updateBookData, options)
        res
            .status(200)
            .send(result)

    } catch (error) {
        res
            .status(500)
            .send({
                statusCode: 500,
                message: "Oop, somethings went wrong"
            })
    }
})



books.delete('/books/:bookId', async (req, res) => {
    const { bookId } = req.params

    const book = await BooksModel.findByIdAndDelete(bookId)

    if (!book) {
        return res
            .status(400)
            .send({
                statusCode: 400,
                message: "No book found with given userId"
            })
    }
    try {
        const deleteBookData = req.body
        const options = { new: true }

        const result = await BooksModel.findByIdAndDelete(bookId, deleteBookData, options)

        res
            .status(200)
            .send({
                statusCode: 200,
                messege: " Book deleted with successfully"

            })
    } catch (error) {
        res
            .status(500)
            .send({
                statusCode: 500,
                message: "Oop, somethings went wrong"
            })
    }
})











module.exports = books