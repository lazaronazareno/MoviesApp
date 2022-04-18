import React, { useEffect, useState } from "react"
import useAxios from '../libs/axiosInstance'
import Loader from "./loader/loader"
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const UploadMovies: React.FC<unknown> = () => {
  const navigate = useNavigate()
   const [file, setFile] = useState<Blob>()
   const [time, setTime] = useState<boolean>(false)
   const { loading, error, fetchData } = useAxios({})

  const selectedHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setFile(e.currentTarget.files?.[0])
  }

  const sendHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!file) {
      alert('not file')
    }
    setTime(true)
    console.log(JSON.stringify(file))

    
    const formData = new FormData()
    formData.append('archivo', file as unknown as Blob)
    for (const value of formData.values()) {
      console.log(value);
   }

    fetchData({
      method:"POST",
      data: formData,
      url:`/post/data/` ,
    })
  }
  useEffect( () =>{
    setTimeout(() => {
      if(time) { 
        navigate('/')
      }
    }, 10000);
  },[fetchData])
  return (
      <form className="d-flex flex-column" onSubmit={sendHandler}>
        <input className="form-control m-3" id="fileInput" onChange={selectedHandler} type="file" />
        <button className="btn btn-dark mx-3" type="submit">Upload</button>
        {loading && ( <Loader /> )}
          {error && ( <p>{error.message}</p> )}
          {time && (
            <div>
              <Loader />
              <h2>Fetching new data... redirecting...</h2>
            </div>
          )}
        <Link className="btn btn-dark m-3" to='/'>Go back</Link>
      </form>
  )
}

export default UploadMovies
