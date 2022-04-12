import React from 'react'
import './App.css'
import ListMovies from './components/listMovies'
import useAxios from './libs/axiosInstance'

function App() {
  const {response, loading, error} = useAxios({
    method:"GET",
    url:'/',
    headers:{
      accept: '*/*'
    }
  })

  return (
    <div className="App">
      <h1>Movies App</h1>
      {loading && (
        <p>Loading...</p>
      )}
      {error && (
        <p>{error.message}</p>
      )}
      {!loading && !error && (
        <ListMovies movies={response?.data}/>
      )}
    </div>
  );
}

export default App;
