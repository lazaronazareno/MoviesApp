import { MovieData, NewMovie } from '../types'
import { execute } from '../mysql-connector'
import { MoviesQueries } from './moviesQueries'

export const getMovies = async (offset: any, limit: any): Promise<MovieData[]> => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!offset && !limit) {
    return await execute<MovieData[]>(MoviesQueries.getMovies, [0, 10])
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  } else if (!limit) {
    return await execute<MovieData[]>(MoviesQueries.getMovies, [offset, 10])
  }
  return await execute<MovieData[]>(MoviesQueries.getMovies, [offset, limit])
}

export const countMovies = async (): Promise<MovieData[]> => {
  return await execute<MovieData[]>(MoviesQueries.countMovies, [])
}

export const getMovieByTitle = async (titulo: MovieData['titulo']): Promise<MovieData[]> => {
  return await execute<MovieData[]>(MoviesQueries.getMoviesByTitle, titulo)
}

export const addMovie = async (newMovie: NewMovie): Promise<MovieData[]> => {
  const newData = await execute<MovieData[]>(MoviesQueries.addMovie, [
    newMovie.titulo,
    newMovie.genero,
    newMovie.año,
    newMovie.director,
    newMovie.actores
  ])
  return newData
}

export const editMovie = async (newMovie: MovieData): Promise<MovieData[]> => {
  const newData = await execute<MovieData[]>(MoviesQueries.editMovie, [
    newMovie.titulo,
    newMovie.genero,
    newMovie.año,
    newMovie.director,
    newMovie.actores,
    newMovie.titulo
  ])
  return newData
}

export const deleteMovieByTitle = async (titulo: MovieData['titulo']): Promise<MovieData | undefined> => {
  const data = await execute<MovieData>(MoviesQueries.deleteMovie, [
    titulo
  ])
  return data
}
