require('dotenv').config()

let PORT = 3002

const APP_ID ='wx151b79de3d8171c1'
const APP_SECRET = '968233407ee19e2e11bc4862e9825a3d'
const TOKEN_SECRET = '219617'


const MYSQL_DB = {
    host:'111.231.4.101',
    user:'root',
    password:'sSkKyY/3369',
    database:'WC_Cashbook'
  }

module.exports = {
  PORT,
  MYSQL_DB,
  APP_ID,
  APP_SECRET,
  TOKEN_SECRET
}