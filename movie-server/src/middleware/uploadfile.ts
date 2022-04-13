import multer from 'multer'
import path from 'path'

const diskStorage = multer.diskStorage({
  destination: path.join(__dirname, '../csv'),
  filename: (req, file, cb) => {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    cb(null, Date.now() + '-movies-' + file.originalname)
  }
})

export const fileUpload = multer({
  storage: diskStorage
}).single('archivo')
