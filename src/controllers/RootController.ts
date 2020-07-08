import { Request, Response } from 'express'
import config from 'config'
import { controller, httpGet, interfaces } from 'inversify-express-utils'
import { ApiOperationGet, ApiPath, SwaggerDefinitionConstant } from 'swagger-express-ts'
import { apiResponse } from '../constant'
import { HttpStatus } from '../HttpStatus'
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
      [HttpStatus.ok]: {
        description: 'Success',
        type: SwaggerDefinitionConstant.Response.Type.OBJECT
      }
    }
  })
  @httpGet('/')
  public getRoot(_req: Request, res: Response): void {
    res.json(apiResponse({ version: config.get('version') }))
  }

  // @httpGet('*')
  // public all(_req: Request, res: Response): void {
  //   res.status(404).send(apiResponse('Something is clearly wrong here.'))
  // }
}

export default RootController
