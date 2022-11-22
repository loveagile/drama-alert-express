import * as express from 'express'
import { createConnection } from 'typeorm'
import { Request, Response } from 'express'
import * as bodyParser from 'body-parser'

import { Routes } from './routes'

createConnection()
  .then(async (connection) => {
    const app = express()
    const port = process.env.PORT || 4002
    app.use(express.static('public'))
    app.use(express.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    Routes.forEach((route) => {
      ;(app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          )
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            )
          } else if (result !== null && result !== undefined) {
            res.json(result)
          }
        }
      )
    })

    app.listen(port, () =>
      console.log(`REST API server ready at: http://localhost:${port}`)
    )
  })
  .catch((error) => console.log('TypeORM connection error: ', error))
