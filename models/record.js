const config = require('../utils/config')
const tools = require('../utils/tools')
const mysql = require('mysql')


const saveRecordByUserid = (newRecord) => {
  return(`insert into WC_Records (name, date, price, detail, tag, userid) values ('${newRecord.name}','${newRecord.date}',${newRecord.price},'${newRecord.detail}',${newRecord.tag},'${newRecord.userid}')`)
}

const getRecordsByUserid = (userid) => {
  return (`select * from WC_Records where userid = '${userid}'`)
}


const getAllRecords = () => {
  return ('select * from WC_Records')
}

module.exports = {
  getRecordsByUserid,
  saveRecordByUserid,
  getAllRecords
}