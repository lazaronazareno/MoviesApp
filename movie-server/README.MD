# Server Movie App

dent forget to set enviroment vars // no olvidar de configurar las variables de entorno : 

``` bash
set -a 
source .env
```

## ENDPOINTS

GET     /             // GET MOVIES

GET    /:title        // GET MOVIES BY TITLE

GET    /search/:title // SEARCH MOVIES BY WORD

POST   /add           // POST NEW MOVIE

PATCH  /:title        // EDIT MOVIE

DELETE /delete/:title // DELETE MOVIE

POST   /post/data     // UPLOAD CSV FILE FOR NEW MOVIE DATA