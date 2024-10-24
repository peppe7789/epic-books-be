const express = require("express")
const init = require('./db')
require('dotenv').config()


const usersRoute = require('./routes/user')
const booksRoute = require('./routes/book')
const loginsRoute = require('./routes/login')

const cors = require("cors")
const routeNotFoundMiddleWare = require('./middlewere/routeNotFoundHandler')
const requestTimeMiddleware = require('./middlewere/requestTimeMiddleware')
const blockIpMiddleware = require('./middlewere/blockIpMiddleware')



const notAllowedIp = process.env.BANNEDIP ? process.env.BANNEDIP.split(',') : []
const PORT = 4041
const server = express()


server.use(express.json())

// server.use('/uploads', express.static(path.join(__dirname, './uploads')))

server.use(cors())
server.use(blockIpMiddleware(notAllowedIp))
server.use(requestTimeMiddleware)


server.use('/', usersRoute)
server.use('/', booksRoute)
server.use('/', loginsRoute)


server.use(routeNotFoundMiddleWare)



init()





server.listen(PORT, ()=> console.log(`Server in running on PORT ${PORT}`))