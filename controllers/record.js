const recordRouter = require('express').Router()
// const jwt = require('jsonwebtoken')
const recordModel = require('../models/record')
const mysql = require('mysql')
const config = require('../utils/config')
const jwt = require('jsonwebtoken')
require('express-async-errors')

  
  
recordRouter.get('/:token',(req,res) => {
  console.log(req.params.token)
  const decodedToken = jwt.verify(req.params.token, config.TOKEN_SECRET)
  console.log(decodedToken)

  let connection=mysql.createConnection(config.MYSQL_DB)
  connection.connect()
  console.log('getconnected')
    connection.query(recordModel.getRecordsByOpenid(decodedToken.openid),function(error,results,fields){
      if (error){
        console.log(error)
        throw error
      }
      console.log('success')
      res.json(results)
    })
  connection.end()
})



recordRouter.post('/:token',(req,res)=>{
  console.log(req.params.token)
  const decodedToken = jwt.verify(req.params.token, config.TOKEN_SECRET)
  console.log(decodedToken)
  newRecord = {
    name:req.body.name,
    date:req.body.date,
    price:req.body.price,
    detail:req.body.detail||'',
    tag:req.body.tag,
    openid:decodedToken.openid
  }
  let connection=mysql.createConnection(config.MYSQL_DB)
  connection.connect();
  connection.query(recordModel.saveRecordByOpenid(newRecord),function(error,results,fields){
    if(error) {
      console.log(error)
      throw console.error
    }
    console.log('res:', results)
    res.json(results)
  })
  connection.end()
})


recordRouter.post('/delete/:token',(req,res)=>{
  console.log(req.params.token)
  const decodedToken = jwt.verify(req.params.token, config.TOKEN_SECRET)
  console.log(decodedToken)
  let connection=mysql.createConnection(config.MYSQL_DB)
  connection.connect();
  console.log('deleteid:', req.body.deleteId)
  connection.query(recordModel.removeRecordByOpenid(req.body.deleteId),function(error,results,fields){
    if(error) {
      console.log(error)
      throw console.error
    }
    console.log('res:', results)
    res.json(results)
  })
  connection.end()
})

recordRouter.post('/suggestion/:token',(req,res)=>{
  console.log(req.params.token)
  console.log(req.body.suggestion)
  const decodedToken = jwt.verify(req.params.token, config.TOKEN_SECRET)
  console.log(decodedToken)
  newSuggestion = {
    userid:decodedToken.openid,
    suggestion: req.body.suggestion
  }
  let connection=mysql.createConnection(config.MYSQL_DB)
  connection.connect();
  connection.query(recordModel.saveSuggestionByOpenid(newSuggestion),function(error,results,fields){
    if(error) {
      console.log(error)
      throw console.error
    }
    res.json(results)
  })
  connection.end()
})



module.exports = recordRouter