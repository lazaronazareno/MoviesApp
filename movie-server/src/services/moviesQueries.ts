export const MoviesQueries = {
  getMovies: 'SELECT * FROM movies.movielist LIMIT ?, ?;',

  countMovies: 'SELECT COUNT(titulo) from movies.movielist;',

  searchMoviesByTitle: 'SELECT * FROM movies.movielist WHERE movielist.titulo LIKE ?',

  getMovieByTitle: 'SELECT * FROM movies.movielist WHERE movielist.id = ?',

  addMovie: 'INSERT INTO movies.movielist (titulo, genero, año, director, actores) VALUES (?, ?, ?, ?, ?);',

  editMovie: 'UPDATE movies.movielist SET titulo = IFNULL(?, titulo), genero = IFNULL(?, genero), año = IFNULL(?, año), director = IFNULL(?, director), actores = IFNULL(?, actores) WHERE id = ?',

  deleteMovie: 'DELETE FROM movies.movielist WHERE titulo = ?;',

  uploadData: 'INSERT INTO movielist(titulo, genero, año, director, actores) VALUES(?, ?, ?, ?, ?)'
}
