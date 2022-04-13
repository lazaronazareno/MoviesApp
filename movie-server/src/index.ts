import express from 'express'
import cors from 'cors'
import mysql from 'mysql'
import con from 'express-myconnection'

import moviesRouter from './routes/movies'

const app = express()
app.use(cors())
app.use(express.json())

app.use(con(mysql, {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'movies'
}, 'single'))

const PORT = 4000

app.get('/ping', (_req, res) => {
  console.log('ping' + new Date().toLocaleDateString())
  res.send('pong')
})

app.use('/', moviesRouter)

app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT}`)
})
