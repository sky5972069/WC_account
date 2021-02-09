const config = require('../utils/config')
const tools = require('../utils/tools')
const mysql = require('mysql')

const getAllUsers = () => {
  return ('select * from WC_Users')
}

const saveUser = (newUser) => {
  return (`insert into WC_Users values ('${tools.uuid(16,32)}','${newUser.nickname}',${newUser.gender},'${newUser.language}','${newUser.city}',${newUser.recordid})`)
}

const getUserByUserid = (userid) => {
  return (`select * from WC_Users where id = '${userid}'`)
}


module.exports = {
  getUserByUserid,
  saveUser,
  getAllUsers
}



