const express = require('express')
const users = express.Router()
const UserModel = require('../models/UserModel')

users.get('/users', async (req, res) => {
    try {
        const users = await UserModel.find()
        if (users.length === 0) {
            return res
                .status(404)
                .send({
                    statusCode: 404,
                    message: "User not found"
                })
        }
        res
            .status(200)
            .send({
                statusCode: 200,
                users
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

users.post('/users/create', async (req, res) => {
    const newUser = new UserModel({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        dob: new Date(req.body.dob),
        password: req.body.password,
        username: req.body.username,
        gender: req.body.gender,
        address: req.body.address
    })
    try {
        const user = await newUser.save()

        res
            .status(201)
            .send({
                statusCode: 201,
                message: "User saved successfully",
                user
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

users.get('/users/:userId', async (req, res) => {
    const { userId } = req.params
    try {
        const user = await UserModel.findById(userId)

        if (!user) {
            return res
                .status(404)
                .send({
                    statusCode: 404,
                    message: "User not found"
                })
        }
        res
            .status(200)
            .send({
                statusCode: 200,
                user
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

users.patch('/users/:userId', async (req, res) => {
    const { userId } = req.params
    const user = await UserModel.findById(userId)

    if (!user) {
        return res
            .status(400)
            .send({
                statusCode: 400,
                message: "No user found with given userId"
            })
    }
    try {
        const updatedUserData = req.body
        const options = { new: true }

        const result = await UserModel.findByIdAndUpdate(userId, updatedUserData, options)
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

users.delete('/users/:userId', async (req, res) => {
    const { userId } = req.params
    const user = await UserModel.findById(userId)

    if (!user) {
        return res
            .status(400)
            .send({
                statusCode: 400,
                message: "No user found with given userId"
            })
    }
    try {
        const deleteUserData = req.body
        const options = { new: true }

        const result = await UserModel.findByIdAndDelete(userId, deleteUserData, options)

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
module.exports = users