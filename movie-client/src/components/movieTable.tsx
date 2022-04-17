import React from "react"
import { Link, useLocation } from "react-router-dom"

interface Props {
  movies: Array<{
    titulo: string
    genero: string
    año: string
    director: string
    actores: string
  }>
}

export const MovieTable = ({movies}: Props) => {
  const location = useLocation()
  const title = location.pathname
  const newTitle = title.replace(/[%]+20+/g, ' ')

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Genre</th>
          <th scope="col">Year</th>
          <th scope="col">Director</th>
          <th scope="col">Actors</th>
          <th scope="col">Edit</th>
          <th scope="col">Detele</th>
        </tr>
      </thead>
      <tbody>
      {
        movies?.map((movie) => {
          return (
            <tr key={movie.titulo} className="align-middle"  style={{height:'14.5vh'}}>
              <td>{movie.titulo}</td>
              <td>{movie.genero}</td>
              <td>{movie.año}</td>
              <td>{movie.director}</td>
              <td>{movie.actores}</td>
              { newTitle !== ('/' + movie.titulo) && (
                <>
                <td>
                  <Link to={`/${movie.titulo}`}>
                    <button type='button'className="btn btn-dark" data-bs-dismiss="modal">Edit</button>
                  </Link>
                </td>
                <td>
                  <Link to={`/delete/${movie.titulo}`}>
                    <button type='button' data-bs-dismiss="modal" data-bs-target="#myModal" className="btn btn-dark">Delete</button>
                  </Link>
                </td>
                </>
                )
              }
            </tr>
          )
        })
      }
      </tbody>
    </table>
   )
  }
  