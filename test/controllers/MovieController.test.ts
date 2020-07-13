import 'reflect-metadata'
import { expect } from 'chai'
import { Container } from 'inversify'
import { cleanUpMetadata, results } from 'inversify-express-utils'
import { Repository } from 'typeorm'
import MovieController from '../../src/controllers/MovieController'
import { IMovie } from '../../src/entity/Movie'
import { HttpStatus } from '../../src/HttpStatus'
import { bindings } from '../../src/inversify.config'
import { TYPES } from '../../src/types'

describe('MovieController', () => {
  let controller: MovieController
  let container: Container | undefined

  beforeEach(async (done) => {
    cleanUpMetadata()

    container = new Container()
    await container.loadAsync(bindings)
    const repo = container.get<Repository<IMovie>>(TYPES.MovieRepository)
    controller = new MovieController(repo)
    done()
  })

  afterEach(() => {
    container = undefined
  })

  describe('GET', () => {

    it('should have a status of 200', async () => {

      const response: results.JsonResult = await controller.getAll()

      expect(response).to.be.an.instanceOf(results.JsonResult)
      expect(response.statusCode).to.equal(HttpStatus.ok)
    })

  })
})
