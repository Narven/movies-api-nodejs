import 'reflect-metadata'
import { cleanUpMetadata } from 'inversify-express-utils'

describe('RootController', () => {
  beforeEach(async (done) => {
    cleanUpMetadata()
    done()
  })

  it('should return 200', async (done) => {

    // TODO make tests work with inversify (DI)

    done()
  })

})
