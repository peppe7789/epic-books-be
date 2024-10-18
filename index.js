const express = require("express")
const init = require('./db')
require ('dotenv').config()
const usersRoute = require('./routes/user')
const booksRoute = require('./routes/book')
const cors = require("cors")

const PORT = 4041

const server = express()

server.use(express.json())
server.use(cors())
server.use('/', usersRoute)
server.use('/', booksRoute)

init()





server.listen(PORT, ()=> console.log(`Server in running on PORT ${PORT}`))