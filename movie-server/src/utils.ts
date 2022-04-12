import { NewMovie } from './types'

const parseTitle = (titleFromRequest: any): string => {
  if (!isString(titleFromRequest)) {
    throw new Error('Incorrect or missing title')
  }

  return titleFromRequest
}

const parseGenre = (genreFromRequest: any): string => {
  if (!isString(genreFromRequest)) {
    throw new Error('Incorrect or missing title')
  }

  return genreFromRequest
}
const parseDirector = (directorFromRequest: any): string => {
  if (!isString(directorFromRequest)) {
    throw new Error('Incorrect or missing title')
  }

  return directorFromRequest
}

const parseActors = (actorsFromRequest: any): string => {
  if (!isString(actorsFromRequest)) {
    throw new Error('Incorrect or missing title')
  }

  return actorsFromRequest
}

const parseYear = (yearFromRequest: any): string => {
  if (!isNumber(yearFromRequest)) {
    throw new Error('Incorrect or missing year')
  }

  return yearFromRequest
}

const isString = (string: string): boolean => {
  return typeof string === 'string'
}

const isNumber = (string: string): boolean => {
  return Boolean(Number.parseFloat(string))
}

const toNewMovie = (object: any): NewMovie => {
  const newMovie: NewMovie = {
    titulo: parseTitle(object.titulo),
    genero: parseGenre(object.genero),
    año: parseYear(object.año),
    director: parseDirector(object.director),
    actores: parseActors(object.actores)
  }

  return newMovie
}

export default toNewMovie
