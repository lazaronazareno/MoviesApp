/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import express from 'express'
import cors from 'cors'
/* import csvToJson from 'csvtojson'
import mysql from 'mysql' */

import moviesRouter from './routes/movies'

/* const hostname = 'localhost'
const username = 'root'
const password = 'root'
const databaseName = 'movies'

const con = mysql.createConnection({
  host: hostname,
  user: username,
  password: password,
  database: databaseName
})

con.connect((err: any) => {
  if (err) {
    return console.error(
      err.message)
  }

  con.query('DROP TABLE movieList',
    (err: any, _drop: any) => {
      if (err) {
        console.log(err)
      } else {
        const createStatament =
        'CREATE TABLE movieList(Title char(50), ' +
        'Email char(50), Age int, city char(30))'

        con.query(createStatament, (err: any, _drop: any) => {
          if (err) { console.log('ERROR: ', err) }
        })
      }
    })
})

const fileName = 'sample.csv'

void csvToJson().fromFile(fileName).then(source => {
  // Fetching the data from each row titulo;genero;año;director;actores
  // and inserting to the table "sample"
  for (let i = 0; i < source.length; i++) {
    const Titulo = source[i].Titulo
    const Genero = source[i].Genero
    const Año = source[i].Año
    const Director = source[i].Director
    const Actores = source[i].Actores

    const insertStatement =
        'INSERT INTO movieList values(?, ?, ?, ?)'
    const items = [Titulo, Genero, Año, Director, Actores]

    // Inserting data of current row
    // into database
    con.query(insertStatement, items,
      (err, results, fields) => {
        if (err) {
          console.log(
            'Unable to insert item at row ', i + 1)
          return console.log(err)
        }
      })
  }
  console.log(
    'All items stored into database successfully')
}) */

const app = express()
app.use(cors())
app.use(express.json())

const PORT = 4000

app.get('/ping', (_req, res) => {
  console.log('ping' + new Date().toLocaleDateString())
  res.send('pong')
})

app.use('/', moviesRouter)

app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT}`)
})
