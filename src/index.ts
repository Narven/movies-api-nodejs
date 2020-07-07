import 'reflect-metadata'
import config from 'config'
import cors from 'cors'
import helmet from 'helmet'
import { Container } from 'inversify'
import { InversifyExpressServer } from 'inversify-express-utils'
import morgan from 'morgan'
import { appDebug } from './constant'
import express from 'express'
import { bindings } from './inversify.config'

(async () => {

  const container = new Container()
  await container.loadAsync(bindings)

  const server = new InversifyExpressServer(container)
  server.setConfig((app: express.Application) => {
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(helmet())
    app.use(morgan('tiny'))
  })

  const serverInstance = server.build()

  const port = config.get('app.port') || 3000

  serverInstance.listen(port, () => {
    appDebug(`Listening on port ${port}`)
  })

})()
