// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')
const userModel = require('../models/user')
const userRouter = require('express').Router()
const mysql = require('mysql')
const config = require('../utils/config')

userRouter.get('/',(req,res) => {
  let connection=mysql.createConnection(config.MYSQL_DB)
  connection.connect()
  connection.query(userModel.getAllUsers(),function(error,results,fields){
    if (error){
      console.log(error)
      throw error
    }
    console.log(results)
    res.json(results)
  })
  connection.end()
})

userRouter.get('/:userid',(req,res) => {
  let connection=mysql.createConnection(config.MYSQL_DB)
  connection.connect()
  connection.query(userModel.getUserByUserid(req.params.userid),function(error,results,fields){
    if (error){
      console.log(error)
      throw error
    }
    console.log(results)
    res.json(results)
  })
  connection.end()
})

userRouter.post('/',(req,res) => {
  let newUser = {
    nickname:req.body.nickname,
    gender:req.body.gender,
    language:req.body.language,
    city:req.body.city,
    recordid:1
  }
  let connection=mysql.createConnection(config.MYSQL_DB)
  connection.connect()
  connection.query(userModel.saveUser(newUser),function(error,results,fields){
    if (error){
      console.log(error)
      throw error
    }
    console.log(results)
    res.json(results)
  })
  connection.end()

})


module.exports = userRouter