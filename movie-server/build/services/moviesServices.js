"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postData = exports.deleteMovieByTitle = exports.editMovie = exports.addMovie = exports.getMovieByTitle = exports.searchMovieByTitle = exports.countMovies = exports.getMovies = void 0;
const mysql_connector_1 = require("../mysql-connector");
const moviesQueries_1 = require("./moviesQueries");
const csvtojson_1 = __importDefault(require("csvtojson"));
const getMovies = (offset, limit) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!offset && !limit) {
        return yield (0, mysql_connector_1.execute)(moviesQueries_1.MoviesQueries.getMovies, [0, 10]);
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    }
    else if (!limit) {
        return yield (0, mysql_connector_1.execute)(moviesQueries_1.MoviesQueries.getMovies, [offset, 10]);
    }
    return yield (0, mysql_connector_1.execute)(moviesQueries_1.MoviesQueries.getMovies, [offset, limit]);
});
exports.getMovies = getMovies;
const countMovies = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, mysql_connector_1.execute)(moviesQueries_1.MoviesQueries.countMovies, []);
});
exports.countMovies = countMovies;
const searchMovieByTitle = (titulo) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, mysql_connector_1.execute)(moviesQueries_1.MoviesQueries.searchMoviesByTitle, titulo);
});
exports.searchMovieByTitle = searchMovieByTitle;
const getMovieByTitle = (titulo) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, mysql_connector_1.execute)(moviesQueries_1.MoviesQueries.getMovieByTitle, titulo);
});
exports.getMovieByTitle = getMovieByTitle;
const addMovie = (newMovie) => __awaiter(void 0, void 0, void 0, function* () {
    const newData = yield (0, mysql_connector_1.execute)(moviesQueries_1.MoviesQueries.addMovie, [
        newMovie.titulo,
        newMovie.genero,
        newMovie.año,
        newMovie.director,
        newMovie.actores
    ]);
    return newData;
});
exports.addMovie = addMovie;
const editMovie = (newMovie) => __awaiter(void 0, void 0, void 0, function* () {
    const newData = yield (0, mysql_connector_1.execute)(moviesQueries_1.MoviesQueries.editMovie, [
        newMovie.titulo,
        newMovie.genero,
        newMovie.año,
        newMovie.director,
        newMovie.actores,
        newMovie.titulo
    ]);
    return newData;
});
exports.editMovie = editMovie;
const deleteMovieByTitle = (titulo) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(titulo);
    const data = yield (0, mysql_connector_1.execute)(moviesQueries_1.MoviesQueries.deleteMovie, titulo);
    console.log(data);
    return data;
});
exports.deleteMovieByTitle = deleteMovieByTitle;
const postData = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const aaa = [];
    const jsons = yield (0, csvtojson_1.default)({ delimiter: ';' }).fromFile(name);
    for (let i = 0; i < jsons.length; i++) {
        const Titulo = jsons[i].titulo;
        const Genero = jsons[i].genero;
        const Año = jsons[i].año;
        const Director = jsons[i].director;
        const Actores = jsons[i].actores;
        const data = yield (0, mysql_connector_1.execute)(moviesQueries_1.MoviesQueries.uploadData, [
            Titulo, Genero, Año, Director, Actores
        ]);
        aaa.push(data);
    }
    return aaa;
});
exports.postData = postData;
