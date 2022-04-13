import express from 'express'
import * as moviesServices from '../services/moviesServices'

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
  console.log(req.file)
})

export default router
