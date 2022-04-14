import express from 'express'
import * as moviesServices from '../services/moviesServices'

export const getMovies: express.RequestHandler = async (req: express.Request, res: express.Response) => {
  try {
    const movies = await moviesServices.getMovies(parseInt(req.query.offset as string))

    res.status(200).json({
      movies
    })
  } catch (error) {
    console.error('[moviesServices][getMovies][Error] ', typeof error === 'object' ? JSON.stringify(error) : error)
    res.status(500).json({
      message: ('There was an error when fetching movies' + ' ' + String(error))
    })
  }
}

export const getMoviesByTitle: express.RequestHandler = async (req: express.Request, res: express.Response) => {
  try {
    const movie = await moviesServices.getMovieByTitle(req.params.title)

    res.status(200).json({
      movie
    })
  } catch (error) {
    console.error('[moviesServices][getMoviesByTitle][Error] ', typeof error === 'object' ? JSON.stringify(error) : error)
    res.status(500).json({
      message: ('There was an error when fetching movie' + ' ' + String(error))
    })
  }
}

export const editMovie: express.RequestHandler = async (req: express.Request, res: express.Response) => {
  try {
    const movie = await moviesServices.editMovie({ ...req.body, titulo: req.params.title })

    res.status(200).json({
      movie
    })
  } catch (error) {
    console.error('[moviesServices][editMovie][Error] ', typeof error === 'object' ? JSON.stringify(error) : error)
    res.status(500).json({
      message: ('There was an error when updating movie' + ' ' + String(error))
    })
  }
}

export const addMovie: express.RequestHandler = async (req: express.Request, res: express.Response) => {
  try {
    const movie = await moviesServices.addMovie(req.body)

    res.status(200).json({
      movie
    })
  } catch (error: any) {
    console.error('[moviesServices][addMovie][Error] ', typeof error === 'object' ? JSON.stringify(error) : error)
    res.status(500).json({
      message: ('There was an error when adding new movie' + ' ' + String(error))
    })
  }
}

export const deleteMovie: express.RequestHandler = async (req: express.Request, res: express.Response) => {
  try {
    const movie = await moviesServices.deleteMovieByTitle(req.params.title)

    res.status(200).json({
      movie
    })
  } catch (error) {
    console.error('[moviesServices][addMovie][Error] ', typeof error === 'object' ? JSON.stringify(error) : error)
    res.status(500).json({
      message: ('There was an error when deleting movie' + ' ' + String(error))
    })
  }
}
