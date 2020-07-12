import 'reflect-metadata'
import { expect } from 'chai'
import { Container } from 'inversify'
import { cleanUpMetadata, results } from 'inversify-express-utils'
import { Repository } from 'typeorm'
import GenreController from '../../src/controllers/GenreController'
import { IGenre } from '../../src/entity/Genre'
import { HttpStatus } from '../../src/HttpStatus'
import { bindings } from '../../src/inversify.config'
import { TYPES } from '../../src/types'

describe('GenreController', () => {
  let controller: GenreController
  let container: Container | undefined

  beforeEach(async (done) => {
    cleanUpMetadata()

    container = new Container()
    await container.loadAsync(bindings)
    const repo = container.get<Repository<IGenre>>(TYPES.GenreRepository)
    controller = new GenreController(repo)
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
