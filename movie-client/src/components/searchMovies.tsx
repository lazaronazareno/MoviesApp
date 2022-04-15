import React, { useState } from "react"
import useAxios from '../libs/axiosInstance'
import Loader from '../components/loader/loader'

interface Movies {
  titulo: string
  genero: string
  año: string
  director: string
  actores: string
}

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
      url:`/${values.search}` ,
      headers:{
        accept: '/'
      }
    })
}

    return (
        <form onSubmit={onSubmit}>
          <input name="search" className="form-control" id="search" onChange={onChange} type="text" />
          <button className="btn btn-dark" type="submit">Search</button>
          {loading && ( <Loader /> )}
          {error && ( <p>{error.message}</p> )}
          {!loading && !error && response && (
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
                  response?.data.movie.map((movie: Movies) => {
                    return (
                      <tr key={movie.titulo}>
                        <td>{movie.titulo}</td>
                        <td>{movie.genero}</td>
                        <td>{movie.año}</td>
                        <td>{movie.director}</td>
                        <td>{movie.actores}</td>
                        <td>
                          <button className="btn btn-dark">Edit</button>
                        </td>
                        <td>
                          <button className="btn btn-dark">Delete</button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          )}
        </form>
    )
  }
