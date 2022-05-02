/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { MovieData, NewMovie } from '../types'
import { execute, executePost } from '../mysql-connector'
import { MoviesQueries } from './moviesQueries'
import csv from 'csvtojson'

export const getMovies = async (offset: any, limit: any): Promise<MovieData[]> => {
  if (!offset && !limit) {
    return await execute<MovieData[]>(MoviesQueries.getMovies, [0, 10])
  } else if (!limit) {
    return await execute<MovieData[]>(MoviesQueries.getMovies, [offset, 10])
  }
  return await execute<MovieData[]>(MoviesQueries.getMovies, [offset, limit])
}

export const countMovies = async (): Promise<MovieData[]> => {
  return await execute<MovieData[]>(MoviesQueries.countMovies, [])
}

export const searchMovieByTitle = async (titulo: MovieData['titulo']): Promise<MovieData[]> => {
  return await execute<MovieData[]>(MoviesQueries.searchMoviesByTitle, titulo)
}

export const getMovieByTitle = async (titulo: MovieData['titulo']): Promise<MovieData[]> => {
  return await execute<MovieData[]>(MoviesQueries.getMovieByTitle, titulo)
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
  console.log(titulo)
  const data = await execute<MovieData>(MoviesQueries.deleteMovie, titulo)
  console.log(data)
  return data
}

export const postData = async (name: string): Promise<[]> => {
  const filesAdded: [] | any = []
  const jsons = await csv({ delimiter: ';' }).fromFile(name)
  for (let i = 0; i < jsons.length; i++) {
    const Titulo = jsons[i].titulo
    const Genero = jsons[i].genero
    const Año = jsons[i].año
    const Director = jsons[i].director
    const Actores = jsons[i].actores

    const data: [] = await executePost<[]>(MoviesQueries.uploadData, [
      Titulo, Genero, Año, Director, Actores
    ])
    filesAdded.push(data)
  }

  return (filesAdded)
}
