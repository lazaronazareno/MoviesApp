import { MovieData, NewMovie } from '../types'
import moviesData from './Data.json'

const movies: MovieData[] = moviesData as MovieData[]

export const getMovies = (): MovieData[] => movies

export const findByTitle = (titulo: string): MovieData | undefined => {
  const data = movies.find(t => t.titulo === titulo)
  return data
}

export const addMovie = (newMovie: NewMovie): MovieData => {
  const newData = {
    ...newMovie
  }
  movies.push(newData)
  return newData
}
