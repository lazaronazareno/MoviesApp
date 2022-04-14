/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import * as moviesServices from '../services/moviesServices'
import csv from 'csvtojson'
import path from 'path'
import { con } from '../index'

import toNewMovie from '../utils'
import { fileUpload } from '../middleware/uploadfile'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send(moviesServices.getMovies())
})

router.get('/:title', (req, res) => {
  const movie = moviesServices.findByTitle(req.params.title)
  return (movie != null)
    ? res.send(movie)
    : res.sendStatus(404)
})

router.post('/', (req, res) => {
  try {
    const newMovie = toNewMovie(req.body)

    const newMovieAdded = moviesServices.addMovie(newMovie)

    res.json(newMovieAdded)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
})

router.post('/post/data', fileUpload, (req: express.Request, res: express.Response) => {
  con.connect((err) => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (err) { res.status(500).send('server error') }
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    const csvFileName = '../csv/' + req.file?.filename
    const csvFilePath = path.join(__dirname, csvFileName)

    csv({ delimiter: ';' }).fromFile(csvFilePath).then((source) => {
      for (let i = 0; i < source.length; i++) {
        console.log(source[i].field1)
        const Titulo = source[i].titulo
        const Genero = source[i].genero
        const Año = source[i].año
        const Director = source[i].director
        const Actores = source[i].actores

        const insertStatement = 'INSERT INTO movielist(titulo, genero, año, director, actores) VALUES(?, ?, ?, ?, ?)'
        const items = [Titulo, Genero, Año, Director, Actores]
        console.log(insertStatement)
        console.log(items)

        con.query(insertStatement, items, (err: any, results: any, fields: any) => {
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          if (err) {
            console.log('Unable to insert item at row', i + 1)
            return console.log(err)
          }
        })
      }
      console.log('Data stored in movies database')
    }, function (err) {
      console.log(err)
    })
  })
})

export default router
