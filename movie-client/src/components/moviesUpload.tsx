import React, { useState } from "react"
import useAxios from '../libs/axiosInstance'
import Loader from "./loader/loader"

const UploadMovies: React.FC<any> = () => {
   const [file, setFile] = useState<any>()
   const {response, loading, error, fetchData } = useAxios({})

  const selectedHandler = (e: any) => {
    console.log(file?.name)
    setFile(e.target.files[0])
  }

  const sendHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!file) {
      alert('not file')
    }
    console.log(JSON.stringify(file))

    
    const formData = new FormData()
    formData.append('archivo', file)
    for (var value of formData.values()) {
      console.log(value);
   }

    fetchData({
      method:"POST",
      data: formData,
      url:`/post/data/` ,
    })
  }
  return (
      <form className="d-flex" onSubmit={sendHandler}>
        <input className="form-control" id="fileInput" onChange={selectedHandler} type="file" />
        <button className="btn btn-dark" type="submit">Upload</button>
        {loading && ( <Loader /> )}
          {error && ( <p>{error.message}</p> )}
          {!loading && error && response && (
            <h1>File charged to Database</h1>
          )}
      </form>
  )
}

export default UploadMovies
