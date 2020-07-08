import { Response } from 'express'
import config from 'config'
import { controller, httpGet, interfaces } from 'inversify-express-utils'
import { ApiOperationGet, ApiPath, SwaggerDefinitionConstant } from 'swagger-express-ts'
import { apiResponse } from '../constant'
import Controller = interfaces.Controller

export interface IRootController extends Controller {
  getRoot(_req: any, res: Response): void
}

@ApiPath({
  path: '/',
  name: 'Root',
  description: 'The root of all evils'
})
@controller('/')
class RootController implements interfaces.Controller {

  @ApiOperationGet({
    description: 'Root',
    summary: 'Root',
    responses: {
      200: {
        description: 'Success',
        type: SwaggerDefinitionConstant.Response.Type.OBJECT,
      }
    }
  })
  @httpGet('/')
  public getRoot(_req: any, res: Response): void {
    res.json(apiResponse({ version: config.get('version') }))
  }
}

export default RootController
