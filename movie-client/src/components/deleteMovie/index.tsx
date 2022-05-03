import React, { useEffect  } from "react"
import { Link, useLocation } from "react-router-dom"
import useAxios from "../../libs/axiosInstance"

export const DeleteMovie = () => {
  const {response, error, fetchData } = useAxios({})

  const location = useLocation()
  const title = location.pathname
  const newTitle = title.replace(/[%,delete]+20+/g, ' ')

  useEffect(() => {
    fetchData({
      method:"DELETE",
      url:`${title}` ,
      headers:{
        accept: '/'
      }
    })
  },[])

return (
  <div>
    { error && (
      <>
        <h1>Something went wrong :(</h1>
        <Link className="btn btn-dark" to='/'>Go back</Link>
      </>
    )}
    {response && (
      <>
        <h1>Movie{newTitle} is no longer in the database</h1>
        <Link className="btn btn-dark" to='/'>Go back</Link>
      </>
    )}
  </div>
)
}