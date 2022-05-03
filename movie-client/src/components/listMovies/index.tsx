import React, { useEffect, useState } from "react"
import useAxios from '../../libs/axiosInstance'
import Loader from '../loader/loader'
import { MovieTable } from "../tableMovie"
import { Link } from "react-router-dom"
import { SearchModal } from "../searchMovie/searchModal"

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
      {!loading && !error && response?.data.movies && (
          <>
          <div className="d-flex justify-content-between w-100">
            <Link to='/add' className="btn btn-lg btn-dark d-flex">New Movie</Link>
            <SearchModal />
            <Link to='/upload' className="btn btn-lg btn-dark d-flex">Upload File</Link>
          </div>
          <MovieTable movies={response?.data.movies} disabled={false} />
            <div className="container d-flex justify-content-evenly p-2">
              { (page >= 10) && (
                <button className="btn btn-lg btn-dark" onClick={handlerPrevPage}>Prev Page</button>
              )}
              {
                <h3>Page {page === 0 ? 1 : `${(page/10) + 1}`}</h3>
              }
              { (page < lastPage) && (
                <button className="btn btn-lg btn-dark" onClick={handlerNextPage}>Next Page</button>
              )}
            </div>
          </>
      )}
  </div>
  )
}

export default ListMovies