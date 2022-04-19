/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import express from 'express'
import { fileUpload } from './middleware/uploadfile'
import cors from 'cors'
import mysql from 'mysql2'
import * as MySQLConnector from './mysql-connector'
import * as dotenv from 'dotenv'

import moviesRouter from './routes/movies'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

MySQLConnector.init()
export const con = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
})

console.log(process.env.MYSQL_HOST)
console.log(process.env.MYSQL_USER)
console.log(process.env.MYSQL_PASSWORD)
console.log(process.env.MYSQL_DATABASE)
app.use(fileUpload)

const PORT = 4000

app.use('/', moviesRouter)

app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT}`)
})
