const config = require('./utils/config')
const recordRouter = require('./controllers/record')
const loginRouter = require('./controllers/login')
const userRouter = require('./controllers/user')
const middleware = require('./utils/middleware')
const express = require('express')
const app = express()
const bodyParser =require('body-parser')
// app.use(express.static('build'))
app.use(express.json())
app.use(bodyParser.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use('/api/records', recordRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app


