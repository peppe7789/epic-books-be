const express = require('express')
const logins = express.Router()
const LoginModel = require('../models/LoginModel')
const { default: mongoose } = require('mongoose')

logins.get('/logins', async (req, res) => {
    
    try {
        const logins = await LoginModel.find()
        
        if (logins.length === 0) {
            return res
                .status(404)
                .send({
                    statusCode: 404,
                    message: 'Login failled'
                })
        }

        res
            .status(200)
            .send({
                statusCode: 200,
                message: 'Login found',
                logins
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

logins.post('/logins/create', async (req, res) => {
    const { email, password } = req.body
    const newLogin = new LoginModel({
        email: email,
        password: password
    })

    try {
        const login = await newLogin.save()

        res
            .status(201)
            .send({
                statusCode: 201,
                message: "Login created with succefully",
                login
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

module.exports = logins