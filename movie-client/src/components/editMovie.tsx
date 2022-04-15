import React, { useState } from "react"
import useAxios from '../libs/axiosInstance'
import Loader from '../components/loader/loader'

/* interface Props {
  movies: Array<{
    titulo: string
    genero: string
    año: string
    director: string
    actores: string
  }>
}  */

export default function EditMovie () {
  const {/* response */ loading, error, fetchData } = useAxios({})

  const [values, setValues] = useState({
    titulo: '',
    genero : '',
    año : '',
    director : '',
    actores : '',
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value })
    console.log(values)
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(values)
    await search(); // triggering the callback
  }

  async function search() {
    fetchData({
      method:"PATCH",
      url:`/` ,
      headers:{
        accept: '/'
      }
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
          {!loading && !error && (
            <div>

            </div>
          )}
        </form>
    )
  }
