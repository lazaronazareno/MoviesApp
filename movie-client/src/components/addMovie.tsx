import React, { useState } from "react"
import useAxios from '../libs/axiosInstance'
import Loader from './loader/loader'
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"

export default function AddMovie () {
  const location = useLocation()
  const {response, loading, error, fetchData } = useAxios({})
  const [values, setValues] = useState({
    titulo: '',
    genero : '',
    año : '',
    director : '',
    actores : '',
  })

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setValues({ ...values })
    await fetchData({
      method:"POST",
      data: {...values},
      url:`${location.pathname}` ,
      headers:{
        accept: '/'
      },
    })
  }

    return (
        <form onSubmit={onSubmit} className="p-4 d-flex flex-column text-start">
          <label htmlFor="title" className="form-label">Titulo: </label>
          <input name="titulo" className="form-control" id="title" onChange={onChange} type="text" />
          <label htmlFor="genre" className="form-label">Genero: </label>
          <input name="genero" className="form-control" id="genre" onChange={onChange} type="text" />
          <label htmlFor="year" className="form-label">Año: </label>
          <input name="año" className="form-control" id="year" onChange={onChange} type="text" />
          <label htmlFor="director" className="form-label">Director: </label>
          <input name="director" className="form-control" id="director" onChange={onChange} type="text" />
          <label htmlFor="actors" className="form-label">Actores: </label>
          <input name="actores" className="form-control" id="actors" onChange={onChange} type="text" />
          <button className="btn btn-dark" type="submit">Edit</button>
          {loading && ( <Loader /> )}
          {error && ( <p>{error.message}</p> )}
          {!loading && !error && response?.data.movie && (
            <div>
              <h1>New Movie Added</h1>
              <Link className="btn btn-lg btn-dark" to='/'>Volver</Link>
            </div>
          )}
          <Link className="btn btn-dark" to='/'>Go back</Link>
        </form>
    )
  }
