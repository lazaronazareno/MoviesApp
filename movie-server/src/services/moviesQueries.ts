export const MoviesQueries = {
  getMovies: 'SELECT * FROM movies.movielist LIMIT ?, 10;',

  getMoviesByTitle: 'SELECT * FROM movies.movielist WHERE titulo = ?',

  addMovie: 'INSERT INTO movies.movielist (titulo, genero, año, director, actores) VALUES (?, ?, ?, ?, ?);',

  editMovie: 'UPDATE movies.movielist SET titulo = ?, genero = ?, año = ?, director = ?, actores = ? WHERE titulo = ?',

  deleteMovie: 'DELETE FROM movies.movielist WHERE titulo = ?;'
}
