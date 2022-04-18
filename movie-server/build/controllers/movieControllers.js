"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.postData = exports.deleteMovie = exports.addMovie = exports.editMovie = exports.searchMoviesByTitle = exports.getMovieByTitle = exports.getMovies = void 0;
const path_1 = __importDefault(require("path"));
const moviesServices = __importStar(require("../services/moviesServices"));
const csvtojson_1 = __importDefault(require("csvtojson"));
const mysql_connector_1 = require("../mysql-connector");
const moviesQueries_1 = require("../services/moviesQueries");
const getMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = yield moviesServices.getMovies(parseInt(req.query.offset), parseInt(req.query.limit));
        const body = yield moviesServices.countMovies();
        res.status(200).json({
            movies, body
        });
    }
    catch (error) {
        console.error('[moviesServices][getMovies][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).json({
            message: ('There was an error when fetching movies' + ' ' + String(error))
        });
    }
});
exports.getMovies = getMovies;
const getMovieByTitle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movie = yield moviesServices.getMovieByTitle(req.params.title);
        res.status(200).json({
            movie
        });
    }
    catch (error) {
        console.error('[moviesServices][getMoviesByTitle][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).json({
            message: ('There was an error when fetching movie' + ' ' + String(error))
        });
    }
});
exports.getMovieByTitle = getMovieByTitle;
const searchMoviesByTitle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTitle = `%${req.params.title}%`;
        const movies = yield moviesServices.searchMovieByTitle(newTitle);
        res.status(200).json({
            movies
        });
    }
    catch (error) {
        console.error('[moviesServices][getMoviesByTitle][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).json({
            message: ('There was an error when searching movie/s' + ' ' + String(error))
        });
    }
});
exports.searchMoviesByTitle = searchMoviesByTitle;
const editMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movie = req.body;
        const movieResponse = yield moviesServices.editMovie(Object.assign({}, req.body));
        res.status(200).json({
            movie, movieResponse
        });
    }
    catch (error) {
        console.error('[moviesServices][editMovie][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).json({
            message: ('There was an error when updating movie' + ' ' + String(error))
        });
    }
});
exports.editMovie = editMovie;
const addMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movie = yield moviesServices.addMovie(Object.assign({}, req.body));
        res.status(200).json({
            movie
        });
    }
    catch (error) {
        console.error('[moviesServices][addMovie][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).json({
            message: ('There was an error when adding new movie' + ' ' + String(error))
        });
    }
});
exports.addMovie = addMovie;
const deleteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movie = yield moviesServices.deleteMovieByTitle(req.params.title);
        console.log(movie);
        res.status(200).json({
            movie
        });
    }
    catch (error) {
        console.error('[moviesServices][addMovie][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).json({
            message: ('There was an error when deleting movie' + ' ' + String(error))
        });
    }
});
exports.deleteMovie = deleteMovie;
const postData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    const csvFileName = '../csv/' + ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename);
    const csvFilePath = path_1.default.join(__dirname, csvFileName);
    const jsons = yield (0, csvtojson_1.default)({ delimiter: ';' }).fromFile(csvFilePath);
    for (let i = 0; i < jsons.length; i++) {
        const Titulo = jsons[i].titulo;
        const Genero = jsons[i].genero;
        const Año = jsons[i].año;
        const Director = jsons[i].director;
        const Actores = jsons[i].actores;
        try {
            const data = yield (0, mysql_connector_1.execute)(moviesQueries_1.MoviesQueries.uploadData, [
                Titulo, Genero, Año, Director, Actores
            ]);
            res.status(200).json({
                data
            });
        }
        catch (error) {
            console.error('[moviesServices][addMovie][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
            res.status(500).json({
                message: ('There was an error' + ' ' + String(error))
            });
        }
    }
});
exports.postData = postData;
