/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'

import * as controllers from '../controllers/movieControllers'

const router = express.Router()

router.get('/', controllers.getMovies)

router.get('/:id', controllers.getMovieById)

router.get('/search/:title', controllers.searchMoviesByTitle)

router.post('/add', controllers.addMovie)

router.patch('/:id', controllers.editMovie)

router.delete('/delete/:title', controllers.deleteMovie)

router.post('/post/data', controllers.postData)

export default router
