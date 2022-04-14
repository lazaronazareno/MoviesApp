import React from 'react'
import './App.css'
import ListMovies from './components/listMovies'
import UploadMovies from './components/moviesUpload'
 import useAxios from './libs/axiosInstance'

function App() {
   const {response, loading, error} = useAxios({
    method:"GET",
    url:'/',
    headers:{
      accept: '/'
    }
  })

  return (
    <div className="App container-fluid d-flex flex-column justify-content-center align-items-center mt-4">
      <h1>Movies App</h1>
      <button className="btn btn-lg btn-dark">Add movie</button>
      {loading && (
        <p>Loading...</p>
      )}
      {error && (
        <p>{error.message}</p>
      )}
      {!loading && !error && (
         <ListMovies movies={response?.data.movies}/>
      )} 
      <UploadMovies />
    </div>
  );
}

export default App;
