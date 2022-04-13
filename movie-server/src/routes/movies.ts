import express from 'express'
import * as moviesServices from '../services/moviesServices'
import csv from 'csvtojson'

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
  req.getConnection?.(async (err: any, conn: any) => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (err) res.status(500).send('server error')
    console.log(req.file?.filename)
    const csvFileName = req.file?.filename

    await csv().fromFile(csvFileName as string).then((source) => {
      for (let i = 0; i < source.length; i++) {
        const Titulo = source[i].Titulo
        const Genero = source[i].Genero
        const Año = source[i]['Año']
        const Director = source[i].Director
        const Actores = source[i].Actores

        const insertStatement = 'INSERT INTO movies(?, ?, ?, ?, ?)'
        const items = [Titulo, Genero, Año, Director, Actores]

        conn.query(insertStatement, items, (err: any, _results: any, _fields: any) => {
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

    conn.query('DROP TABLE sample', (_err: any, _drop: any) => {
      const createStatament =
          'create table movielist( titulo varchar(255) not null unique, genero varchar(255) not null, año char(4) not null, director varchar(255) not null, actores varchar(255) not null, primary key(titulo))'
      conn.query(createStatament, (_err: any, _drop: any) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (err) return console.log(err)
      })
    })
  })
})

export default router
