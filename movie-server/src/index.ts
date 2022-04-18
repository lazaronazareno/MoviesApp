/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import express from 'express'
import { fileUpload } from './middleware/uploadfile'
import cors from 'cors'
import mysql from 'mysql2'
import * as MySQLConnector from './mysql-connector'
import { DATA_SOURCES } from './vars.config'

import moviesRouter from './routes/movies'

const dataSource = DATA_SOURCES.mySqlDataSource

const app = express()
app.use(cors())
app.use(express.json())

MySQLConnector.init()
export const con = mysql.createConnection({
  host: dataSource.DB_HOST,
  user: dataSource.DB_USER,
  password: dataSource.DB_PASSWORD,
  database: dataSource.DB_DATABASE
})
app.use(fileUpload)

const PORT = 4000

app.use('/', moviesRouter)

app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT}`)
})
