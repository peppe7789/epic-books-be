const express = require("express")
const init = require('./db')
require ('dotenv').config()
const usersRoute = require('./routes/user')

const PORT = 4041

const server = express()

server.use(express.json())
server.use('/', usersRoute)
init()





server.listen(PORT, ()=> console.log(`Server in running on PORT ${PORT}`))