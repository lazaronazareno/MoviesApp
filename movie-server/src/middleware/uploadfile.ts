/* eslint-disable @typescript-eslint/restrict-plus-operands */
import multer from 'multer'
import path from 'path'

const diskStorage = multer.diskStorage({
  destination: path.join(__dirname, '../csv'),
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-movies-' + file.originalname)
  }
})

export const fileUpload = multer({
  storage: diskStorage
}).single('archivo')
