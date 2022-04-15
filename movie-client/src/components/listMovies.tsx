import React, { useEffect, useState } from "react"
import useAxios from '../libs/axiosInstance'
import Loader from '../components/loader/loader'
import { Link } from "react-router-dom"
interface Movies {
    titulo: string
    genero: string
    año: string
    director: string
    actores: string
}

const ListMovies = () => {
  const [page, setPage] = useState(0)
  const {response, loading, error, fetchData} = useAxios({
    method:"GET",
    url:`/${page === 0 ? '' : `?${page}`}` ,
    headers:{
      accept: '/'
    }
  })
  const limitPage = response?.data.body[0]['COUNT(titulo)']
  const lastPage = limitPage - 10

  useEffect(() => {
    fetchData({
      method:"GET",
      url:`/${(page === 0 ? `` : `?offset=${page}`)}` ,
      headers:{
        accept: '/'
      }
    })
  },[page])

  const handlerPrevPage = () => {
    if (page !== 0) {
      setPage(page - 10)
    }
    return
  }

  const handlerNextPage = () => {
    if(page < lastPage) {
    setPage(page + 10)
    }
    return 
  }

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center mt-4">
      {loading && ( <Loader /> )}
      {error && ( <p>{error.message}</p> )}
      {!loading && !error && (
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
              response?.data.movies.map((movies: Movies) => {
                return (
                  <tr key={movies.titulo}>
                    <td>{movies.titulo}</td>
                    <td>{movies.genero}</td>
                    <td>{movies.año}</td>
                    <td>{movies.director}</td>
                    <td>{movies.actores}</td>
                    <td>
                      <Link to={`/edit/${movies.titulo}`} className="btn btn-dark">Edit</Link>
                    </td>
                    <td>
                      <Link to={`/${movies.titulo}`} className="btn btn-dark">Delete</Link>
                    </td>
                  </tr>
                )
              })
            }
            </tbody>
            <div className="container d-flex justify-content-evenly p-2">
              { (page >= 10) && (
                <button className="btn btn-lg btn-dark" onClick={handlerPrevPage}>Prev Page</button>
              )}
              { (page < lastPage) && (
                <button className="btn btn-lg btn-dark" onClick={handlerNextPage}>Next Page</button>
              )}
            </div>
        </table>
      )}
  </div>
  )
}

export default ListMovies