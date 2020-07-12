import { expect } from 'chai'
import 'reflect-metadata'
import { cleanUpMetadata, results } from 'inversify-express-utils'
import RootController from '../../src/controllers/RootController'
import { HttpStatus } from '../../src/HttpStatus'

describe('RootController', () => {
  let controller: RootController

  beforeEach(async (done) => {
    cleanUpMetadata()
    controller = new RootController()
    done()
  })

  describe('GET', () => {

    it('should have a status of 200', async () => {
      const response = await controller.getRoot()

      expect(response).to.be.an.instanceOf(results.JsonResult)
      expect(response.statusCode).to.equal(HttpStatus.ok)
    })

  })

})
