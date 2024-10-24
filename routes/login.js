const express = require('express')
const login = express.Router()
const LoginModel = require('../models/LoginModel')
const { default: mongoose } = require('mongoose')
const UserModel = require('../models/UserModel')


const isPasswordValid = (userPassword, reqPassword) => {
    if (userPassword === reqPassword) {
        return true;
    } else {
        return false
    }
}

login.get('/login', async (req, res) => {
    
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


login.post('/login', async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await UserModel.findOne({ email: email })
        
        if (!user) {
            return res
                .status(404)
                .send({
                    statusCode: 404,
                    message:'Utent not found'
                })
        }

        const checkPassword = isPasswordValid(user.password, password)
        console.log(checkPassword);
        if (!checkPassword) {
            return res
                .status(403)
                .send({
                    statusCode: 403,
                    message:'password not valid'
                })

        }
        res
            .status(200)
            .send({
                statusCode: 200,
                message:'Access authorized'
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

module.exports = login