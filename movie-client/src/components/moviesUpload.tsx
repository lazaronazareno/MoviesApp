import React, { useState } from "react"
import useAxios from '../libs/axiosInstance'
import Loader from "./loader/loader"
import { Link } from "react-router-dom";

const UploadMovies: React.FC<unknown> = () => {
   const [file, setFile] = useState<Blob>()
   const [load, setLoad] = useState<boolean>(false)
   const { response, error, fetchData } = useAxios({})
   const moviesLength = []

  const selectedHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setFile(e.currentTarget.files?.[0])
  }

  const sendHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoad(!load)

    if(!file) {
      alert('not file')
    } else if (file.type !== 'text/csv') {
      alert('invalid file type: only .csv files accepted')
    } else {  
      setLoad(true)
      const formData = new FormData()
      formData.append('archivo', file as unknown as Blob)
  
      fetchData({
        method:"POST",
        data: formData,
        url:`/post/data` ,
      })
    }
    setLoad(!load)
  }

  const moviesAdded = (cant: number) => {
    moviesLength.push(cant)
  }

  return (
      <form className="d-flex flex-column" onSubmit={sendHandler}>
        <input className="form-control m-3" id="fileInput" onChange={selectedHandler} type="file" />
        <button className="btn btn-dark mx-3" type="submit">Upload</button>
        {load && !response?.data.data && ( <Loader /> )}
          {error && ( <p>{error.message}</p> )}
        <Link className="btn btn-dark m-3" to='/'>Go back</Link>
          {response?.data.data && (
            response.data.data.map((results: [] | any) => {
              return results.affectedRows ? moviesAdded(results.affectedRows) : <p key={results[0].sqlMessage}>{results[0].sqlMessage}</p>
            })
            )
          }
          {response?.data.data && (
            <p>Added {moviesLength.length} movies to the database</p>
          )}
      </form>
  )
}

export default UploadMovies
