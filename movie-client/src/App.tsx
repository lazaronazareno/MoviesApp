import React from 'react'
import './App.css'
/* import ListMovies from './components/listMovies'
 */import UploadMovies from './components/moviesUpload'
/* import useAxios from './libs/axiosInstance'
 */
function App() {
/*   const {response, loading, error} = useAxios({
    method:"GET",
    url:'/',
    headers:{
      accept: '/'
    }
  })
*/
  return (
    <div className="App">
      <h1>Movies App</h1>
{/*       {loading && (
        <p>Loading...</p>
      )}
      {error && (
        <p>{error.message}</p>
      )}
      {!loading && !error && (
         <ListMovies movies={response?.data}/>
      )} */}
      <UploadMovies />
    </div>
  );
}

export default App;
