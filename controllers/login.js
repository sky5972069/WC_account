const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const loginModel = require('../models/login')
const mysql = require('mysql')
require('express-async-errors')

loginRouter.post('/', async (req,res) => {

  console.log('reqbody',req.body)
  let decodedCode = await loginModel.code2Session(req.body.code)
  decodedCode = JSON.parse(decodedCode)
  console.log('decoded',decodedCode.openid)
  const ForToken = {
    openid: decodedCode.openid,
    sessionKey: decodedCode.session_key,
  }
  console.log(ForToken)
  const token = jwt.sign(ForToken,config.TOKEN_SECRET)
  console.log('token:',token)


  let loginUser = {
    openid: decodedCode.openid,
    nickname: req.body.userinfo.nickName,
    gender: req.body.userinfo.gender,
    language: req.body.userinfo.language,
    city: req.body.userinfo.city,
  }

  console.log(loginModel.loginCreateUser(loginUser))
  let connection=mysql.createConnection(config.MYSQL_DB)
  connection.connect()
  console.log('connected')
  connection.query(loginModel.loginCreateUser(loginUser), function(error,results,fields){
    if (error){
      console.log('error:',error)
      throw error
    }
    console.log('results',results)
    res.json(token)
  })
  connection.end()
})
  
  
module.exports = loginRouter