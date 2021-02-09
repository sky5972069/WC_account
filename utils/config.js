require('dotenv').config()

let PORT = 3002

const MYSQL_DB = {
    host:'111.231.4.101',
    user:'root',
    password:'sSkKyY/3369',
    database:'WC_Cashbook'
  }

module.exports = {
  PORT,
  MYSQL_DB
}