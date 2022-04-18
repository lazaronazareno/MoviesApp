CREATE DATABASE movies;
USE movies;
CREATE TABLE movielist(
  titulo varchar(255) unique,
  genero varchar(255),
  año char(20),
  director varchar(255),
  actores varchar(255),
  primary key(titulo));