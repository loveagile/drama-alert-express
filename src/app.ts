import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'

import { AppDataSource } from './utils/data-source'
import auth from './routes/auth'

const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: 'http://localhost:3002',
  preflightContinue: false,
}

AppDataSource.initialize()
  .then(async () => {
    const app = express()
    const port = process.env.PORT || 4002
    app.use(cors(options))
    app.use(express.static('public'))
    app.use(express.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    app.use('/api/auth', auth)
    app.listen(port, () =>
      console.log(`REST API server ready at: http://localhost:${port}`)
    )
  })
  .catch((error) => console.log(error))
