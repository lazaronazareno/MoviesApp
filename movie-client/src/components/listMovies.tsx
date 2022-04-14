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

const ListMovies = ({movies}: Props) => {
  return (
    <div>
      {
        movies.map(movie => {
          return (
          <div className="d-flex flex-column border border-dark p-3">
            <div className="card-body">
              <h1 className="card-title">{movie.titulo}</h1>
              <h2 className="card-subtitle">{movie.genero}</h2>
              <h2 className="card-text">{movie.año}</h2>
              <h2 className="card-text">{movie.director}</h2>
              <h2 className="card-text text-wrap">{movie.actores}</h2>
              <div className="container d-flex justify-content-evenly p-2">
                <button className="btn btn-lg btn-dark">Edit</button>
                <button className="btn btn-lg btn-dark">Delete</button>
              </div>  
            </div>
          </div>
          )
          })
      }
      <div className="container d-flex justify-content-evenly p-2">
        <button className="btn btn-lg btn-dark">Prev Page</button>
        <button className="btn btn-lg btn-dark">Next Page</button>
      </div>
      </div>
  )
}

export default ListMovies