import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { InversifyExpressServer } from 'inversify-express-utils'
import morgan from 'morgan'
import * as swagger from 'swagger-express-ts'

const createServer = (container: any, rootPath: string): InversifyExpressServer => {
  const server = new InversifyExpressServer(
    container,
    undefined,
    { rootPath }
  )

  return server.setConfig((app: express.Application) => {
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(helmet())
    app.use(morgan('tiny'))
    app.use('/api-docs/swagger', express.static('swagger'))
    app.use('/api-docs/swagger/assets', express.static('node_modules/swagger-ui-dist'))
    app.use(swagger.express(
      {
        definition: {
          info: {
            title: 'Movies API',
            version: '0.1'
          },
          externalDocs: {
            url: 'http://localhost:3000/api-docs/swagger/'
          },
          models: {
            Movie: {
              description: 'Movie',
              properties: {
                movieId: {},
                title: {},
                budget: {},
                homepage: {},
                overview: {},
                popularity: {},
                releaseDate: {},
                revenue: {},
                runtime: {},
                movieStatus: {},
                tagline: {},
                voteAverage: {},
                voteCount: {}
              }
            },
            Genre: {
              description: 'Genre',
              properties: {
                genreId: {},
                genreName: {}
              }
            }
          }
          // Models can be defined here
        }
      }
    ))
  })
}

export default createServer
