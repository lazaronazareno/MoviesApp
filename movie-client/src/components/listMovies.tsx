import React from "react"

interface Props {
  movies : Array<{
    titulo: string
    genero: string
    año: string
    director: string
    actores: string
  }>
}

export default function ListMovies ({movies}: Props) {
  return (
    <div>
      {
        movies.map(movie => (
          <div>
            <h1>{movie.titulo}</h1>
            <h2>{movie.genero}</h2>
            <h2>{movie.año}</h2>
            <h2>{movie.director}</h2>
            <h2>{movie.actores}</h2>
          </div>
        ))
      }
    </div>
  )
}