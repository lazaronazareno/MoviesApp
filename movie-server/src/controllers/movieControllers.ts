/* eslint-disable @typescript-eslint/restrict-plus-operands */
import express from 'express'
import path from 'path'
import * as moviesServices from '../services/moviesServices'

export const getMovies: express.RequestHandler = async (req: express.Request, res: express.Response) => {
  try {
    const movies = await moviesServices.getMovies(parseInt(req.query.offset as string), parseInt(req.query.limit as string))
    const body = await moviesServices.countMovies()

    res.status(200).json({
      movies, body
    })
  } catch (error) {
    console.error('[moviesServices][getMovies][Error] ', typeof error === 'object' ? JSON.stringify(error) : error)
    res.status(500).json({
      message: ('There was an error when fetching movies' + ' ' + String(error))
    })
  }
}

export const getMovieByTitle: express.RequestHandler = async (req: express.Request, res: express.Response) => {
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

export const searchMoviesByTitle: express.RequestHandler = async (req: express.Request, res: express.Response) => {
  try {
    const newTitle = `%${req.params.title}%`
    const movies = await moviesServices.searchMovieByTitle(newTitle)

    res.status(200).json({
      movies
    })
  } catch (error) {
    console.error('[moviesServices][getMoviesByTitle][Error] ', typeof error === 'object' ? JSON.stringify(error) : error)
    res.status(500).json({
      message: ('There was an error when searching movie/s' + ' ' + String(error))
    })
  }
}

export const editMovie: express.RequestHandler = async (req: express.Request, res: express.Response) => {
  try {
    const movie = req.body
    const movieResponse = await moviesServices.editMovie({ ...req.body })

    res.status(200).json({
      movie, movieResponse
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
    const movie = await moviesServices.addMovie({ ...req.body })

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
    console.log(movie)

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

export const postData: express.RequestHandler = async (req: express.Request, res: express.Response) => {
  const csvFileName = '../csv/' + req.file?.filename
  const csvFilePath = path.join(__dirname, csvFileName)
  try {
    const data = await (moviesServices.postData(csvFilePath))

    res.status(200).json({
      data
    })
  } catch (error) {
    console.error('[moviesServices][addMovie][Error] ', typeof error === 'object' ? JSON.stringify(error) : error)
    res.status(500).json({
      message: ('There was an error when uploading files' + ' ' + String(error))
    })
  }
  console.log('finish')
}
