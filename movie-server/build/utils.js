"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseTitle = (titleFromRequest) => {
    if (!isString(titleFromRequest)) {
        throw new Error('Incorrect or missing title');
    }
    return titleFromRequest;
};
const parseGenre = (genreFromRequest) => {
    if (!isString(genreFromRequest)) {
        throw new Error('Incorrect or missing title');
    }
    return genreFromRequest;
};
const parseDirector = (directorFromRequest) => {
    if (!isString(directorFromRequest)) {
        throw new Error('Incorrect or missing title');
    }
    return directorFromRequest;
};
const parseActors = (actorsFromRequest) => {
    if (!isString(actorsFromRequest)) {
        throw new Error('Incorrect or missing title');
    }
    return actorsFromRequest;
};
const parseYear = (yearFromRequest) => {
    if (!isNumber(yearFromRequest)) {
        throw new Error('Incorrect or missing year');
    }
    return yearFromRequest;
};
const isString = (string) => {
    return typeof string === 'string';
};
const isNumber = (string) => {
    return Boolean(Number.parseFloat(string));
};
const toNewMovie = (object) => {
    const newMovie = {
        titulo: parseTitle(object.titulo),
        genero: parseGenre(object.genero),
        año: parseYear(object.año),
        director: parseDirector(object.director),
        actores: parseActors(object.actores)
    };
    return newMovie;
};
exports.default = toNewMovie;
