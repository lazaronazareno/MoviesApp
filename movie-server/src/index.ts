import express from 'express'

import moviesRouter from './routes/movies'

const app = express()
app.use(express.json())

const PORT = 4000

app.get('/ping', (_req, res) => {
  console.log('ping' + new Date().toLocaleDateString())
  res.send('pong')
})

app.use('/', moviesRouter)

app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT}`)
})
