import React, { useState } from "react"
import useAxios from '../libs/axiosInstance'
import Loader from '../components/loader/loader'
import { MovieTable } from "./movieTable"

export const SearchMovie = () => {
  const {response, loading, error, fetchData } = useAxios({})

  const [values, setValues] = useState({
    search : ''
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value })
    console.log(values)
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(values)
    console.log(values.search)
    await search(); // triggering the callback
  }

  async function search() {
    fetchData({
      method:"GET",
      url:`/search/${values.search}` ,
      headers:{
        accept: '/'
      }
    })
}

    return (
        <form onSubmit={onSubmit}>
          <label htmlFor="search" className="form-label fs-2">Search by Movie or keyword :</label>
          <input name="search" className="form-control" id="search" onChange={onChange} type="text" />
          <button className="btn btn-dark m-3" type="submit">Search</button>
          {loading && ( <Loader /> )}
          {response?.data.movies.length === 0 && ( <h2>Movie not found</h2> )}
          {!loading && !error && response?.data.movies && response?.data.movies.length !== 0 && (
            <>
            {<h2>{response?.data.movies.length} results found</h2>}
              <MovieTable movies={response?.data.movies} disabled={false} />
            </>
          )}
        </form>
    )
  }
