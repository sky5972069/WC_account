const recordRouter = require('express').Router()
// const jwt = require('jsonwebtoken')
const recordModel = require('../models/record')
const mysql = require('mysql')
const config = require('../utils/config')
require('express-async-errors')

recordRouter.get('/', (req,res) => {
  let connection=mysql.createConnection(config.MYSQL_DB)
  connection.connect()
  connection.query(recordModel.getAllRecords(), function(error,results,fields){
      if (error){
        console.log(error)
        throw error
      }
      console.log(results)
      res.json(results)
    })
  connection.end()
})
  
  
recordRouter.get('/:userid',(req,res) => {
  let connection=mysql.createConnection(config.MYSQL_DB)
  connection.connect()
    connection.query(recordModel.getRecordsByUserid(req.params.userid),function(error,results,fields){
      if (error){
        console.log(error)
        throw error
      }
      res.json(results)
    })
  connection.end()
})

recordRouter.post('/',(req,res)=>{
  console.log(req.body)
  let newRecord = {
    name:req.body.name,
    date:req.body.date,
    price:req.body.price,
    detail:req.body.detail|'',
    tag:req.body.tag,
    userid:req.body.userid
  };
  let connection=mysql.createConnection(config.MYSQL_DB)
  connection.connect();
  connection.query(recordModel.saveRecordByUserid(newRecord),function(error,results,fields){
    if(error) {
      console.log(error)
      throw console.error
    }
    res.json(results)
  })
  connection.end()
})


recordRouter.post('/:userid',(req,res)=>{
  newRecord = {
    name:req.body.name,
    date:req.body.date,
    price:req.body.price,
    detail:req.body.detail|'',
    tag:req.body.tag,
    userid:req.params.userid
  }
  let connection=mysql.createConnection(config.MYSQL_DB)
  connection.connect();
  connection.query(recordModel.saveRecordByUserid(newRecord),function(error,results,fields){
    if(error) {
      console.log(error)
      throw console.error
    }
    res.json(results)
  })
  connection.end()
})

module.exports = recordRouter