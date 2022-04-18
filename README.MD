# Server Base Movie App


## Setup

1) Create database movies  // Crear basededatos con el nombre 'movies' :

Execute the scripts in MySQL database in the following order: // Ejecutar los scripts in MySQL : 

// create database :

1. @create_schema.sql

// insert data    

2. @seed_data.sql

2) Copy .env.example to .env and fill with database credentials. // crear un archivo .env en movie-server y completarlo con los datos de referencia de .env.example

Setting enviroment vars : 
``` bash
set -a 
source .env
```

## Start local server
in /movie-server run // en la carpeta movie-server ejecutar :

``` bash
npm run dev
```

## Start local client
in /movie-client run // en la carpeta movie-client ejecutar :

``` bash
npm start
```

docker in progress...
