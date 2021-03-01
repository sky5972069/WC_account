const config = require('../utils/config')
const tools = require('../utils/tools')
const mysql = require('mysql')


const saveRecordByOpenid = (newRecord) => {
  return(`insert into WC_Records (name, date, price, detail, tag, userid) values ('${newRecord.name}','${newRecord.date}',${newRecord.price},'${newRecord.detail}',${newRecord.tag},'${newRecord.openid}')`)
}


const saveSuggestionByOpenid = (newSuggestion) => {
  return(`insert into WC_Suggestions (userid, suggestion) values ('${newSuggestion.userid}','${newSuggestion.suggestion}')`)
}

const getRecordsByOpenid = (openid) => {
  return (`select * from WC_Records where userid = '${openid}'`)
}


const getAllRecords = () => {
  return ('select * from WC_Records')
}

module.exports = {
  getRecordsByOpenid,
  saveSuggestionByOpenid,
  saveRecordByOpenid,
  getAllRecords
}