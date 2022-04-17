/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import csv from 'csvtojson'
import multer from 'multer'
import path from 'path'
import { con } from '../index'

import * as controllers from '../controllers/movieControllers'

const router = express.Router()

const diskStorage = multer.diskStorage({
  destination: path.join(__dirname, '../csv'),
  filename: (req, file, cb) => {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    cb(null, Date.now() + '-movies-' + file.originalname)
  }
})

const fileUpload = multer({
  storage: diskStorage
})

router.get('/', controllers.getMovies)

router.get('/:title', controllers.getMovieByTitle)

router.get('/search/:title', controllers.searchMoviesByTitle)

router.post('/', controllers.addMovie)

router.patch('/:title', controllers.editMovie)

router.delete('/delete/:title', controllers.deleteMovie)

router.post('/test/', controllers.postData)

router.post('/post/data', fileUpload.single('archivo'), async (req: express.Request, res: express.Response) => {
  con.connect(async (err) => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (err) { res.status(500).send('server error') }
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    const csvFileName = '../csv/' + req.file?.filename
    const csvFilePath = path.join(__dirname, csvFileName)

    void (async () => {
      const jsons = await csv({ delimiter: ';' }).fromFile(csvFilePath)
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      for (let i = 0; i < jsons.length; i++) {
        const Titulo = jsons[i].titulo
        const Genero = jsons[i].genero
        const Año = jsons[i].año
        const Director = jsons[i].director
        const Actores = jsons[i].actores

        const insertStatement = 'INSERT INTO movielist(titulo, genero, año, director, actores) VALUES(?, ?, ?, ?, ?)'
        const items = [Titulo, Genero, Año, Director, Actores]
        console.log(insertStatement)
        console.log(items)

        /*           con.promise().query(insertStatement).then( (items) ) => {
            console.log(items)
          }).catch(console.log('error')).then(() => con.end())
 */
        await con.query(insertStatement, items, (err: any, results: any) => {
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          if (err && i < jsons.length) {
            console.log('Unable to insert item at row', i + 1)
            return console.log(err)
          } else {
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            console.log('create new database' + results)
            return results
          }
        })
      }
      console.log('done')
    })().catch((err: any) => {
      return err
    }).then(() => con.end())

  /*     await csv({ delimiter: ';' }).fromFile(csvFilePath).then((source) => {
      for (let i = 0; i < source.length; i++) {
        const Titulo = source[i].titulo
        const Genero = source[i].genero
        const Año = source[i].año
        const Director = source[i].director
        const Actores = source[i].actores

        const insertStatement = 'INSERT INTO movielist(titulo, genero, año, director, actores) VALUES(?, ?, ?, ?, ?)'
        const items = [Titulo, Genero, Año, Director, Actores]
        console.log(insertStatement)
        console.log(items)

        con.query(insertStatement, items, (err: any, results: any, fields: any) => {
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          if (err) {
            console.log('Unable to insert item at row', i + 1)
            return console.log(err)
          }
        })
      }
      console.log('Data stored in movies database')
    }, function (err) {
      console.log(err)
    }) */
  })
})

export default router
