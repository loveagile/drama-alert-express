import * as express from 'express'
import * as bodyParser from 'body-parser'

import { AppDataSource } from './utils/data-source'
import auth from './routes/auth'

AppDataSource.initialize()
  .then(async () => {
    const app = express()
    const port = process.env.PORT || 4002
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
