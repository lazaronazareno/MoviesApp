import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EditMovie  from './components/editMovie';
import ListMovies from './components/listMovies'
import UploadMovies from './components/moviesUpload'
import { SearchMovie } from './components/searchMovies'
import AddMovie from './components/addMovie';
import { DeleteMovie } from './components/deleteMovie';

function App() {
  return (
    <div className="App">
      <h1>Movies App</h1>
      <BrowserRouter>
      <Routes>
        <Route path="/"  element={<ListMovies />} />
        <Route path="/:title"  element={<EditMovie />} />
        <Route path="/upload"  element={<UploadMovies />} />
        <Route path="/search"  element={<SearchMovie />} />
        <Route path="/add"  element={<AddMovie />} />
        <Route path="/delete/:title"  element={<DeleteMovie />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
