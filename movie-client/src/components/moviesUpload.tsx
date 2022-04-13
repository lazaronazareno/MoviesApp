import axios from "axios"
import React, { useState } from "react"

/* interface Props {
  movies : Array<{
    titulo: string
    genero: string
    año: string
    director: string
    actores: string
  }>
} */

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
    <div>
      <div>
        <input id="fileInput" onChange={selectedHandler} type="file" />
        <button onClick={sendHandler} type="submit">Upload</button>
      </div>
    </div>
  )
}