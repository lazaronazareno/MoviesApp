import express from 'express'
import cors from 'cors'
import mysql from 'mysql2'
import { DATA_SOURCES } from './vars.config'

import moviesRouter from './routes/movies'
const dataSource = DATA_SOURCES.mySqlDataSource

const app = express()
app.use(cors())
app.use(express.json())

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const con = mysql.createConnection({
  host: dataSource.DB_HOST,
  user: dataSource.DB_USER,
  password: dataSource.DB_PASSWORD,
  database: dataSource.DB_DATABASE
})

con.connect((err) => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (err) {
    return console.error(
      'error: ' + err.message)
  }
  console.log('connected')
  const createStatament =
        'CREATE TABLE movielist( titulo varchar(255) unique, genero varchar(255), año char(20), director varchar(255), actores varchar(255), primary key(titulo));'
  con.query(createStatament, (_err: any, _drop: any) => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (err) return console.log(err)
  })
})

const PORT = 4000

app.get('/ping', (_req, res) => {
  console.log('ping' + new Date().toLocaleDateString())
  res.send('pong')
})

app.use('/', moviesRouter)

app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT}`)
})
