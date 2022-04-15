import axios from "axios"
import React, { useState } from "react"

export default function UploadMovies () {
   const [file, setFile] = useState()

  const selectedHandler = (e: any) => {
    console.log(file)
    setFile(e.target.files[0])
  }

  const sendHandler = async (e: any) => {
    e.preventDefault()
    if(!file) {
      alert('not file')
    }
    console.log(JSON.stringify(file))

    
    const formData = new FormData()
    formData.append('archivo', file!)


    axios.post('http://localhost:4000/post/data', formData, {
    }).then((response) => {
      console.log(response.data)
    })
    .catch((err) => {
      console.error(err)
    })
  }
  return (
      <form className="d-flex">
        <input className="form-control" id="fileInput" onChange={selectedHandler} type="file" />
        <button className="btn btn-dark" onClick={sendHandler} type="submit">Upload</button>
      </form>
  )
}