import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'

import { AppDataSource } from './utils/data-source'
import auth from './routes/auth'
import accounts from './routes/accounts'
import comments from './routes/comments'
import achievements from './routes/achievements'

AppDataSource.initialize()
  .then(async () => {
    const app = express()
    const port = process.env.PORT || 4002
    app.use(cors())
    app.use(express.static('public'))
    app.use(express.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    app.use('/api/auth', auth)
    app.use('/api/accounts', accounts)
    app.use('/api/comments', comments)
    app.use('/api/achievements', achievements)

    app.listen(port, () =>
      console.log(`REST API server ready at: http://localhost:${port}`)
    )
  })
  .catch((error) => console.log(error))
