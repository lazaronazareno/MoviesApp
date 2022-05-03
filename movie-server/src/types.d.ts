export interface MovieData {
  titulo: string
  genero: string
  año: string
  director: string
  actores: string
  id?: number
}

export type NewMovie = MovieData
