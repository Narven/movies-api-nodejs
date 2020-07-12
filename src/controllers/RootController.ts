import config from 'config'
import { BaseHttpController, controller, httpGet, interfaces } from 'inversify-express-utils'
import { ApiOperationGet, ApiPath, SwaggerDefinitionConstant } from 'swagger-express-ts'
import { apiResponse } from '../constant'
import { HttpStatus } from '../HttpStatus'
import Controller = interfaces.Controller

export interface IRootController extends Controller {
  getRoot(): void
}

@ApiPath({
  path: '/',
  name: 'Root',
  description: 'The root of all evils'
})
@controller('/')
class RootController extends BaseHttpController implements interfaces.Controller, IRootController {

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
  public getRoot(): any {
    return this.json(apiResponse({ version: config.get('version') }))
  }

  // @httpGet('*')
  // public all(_req: Request, res: Response): void {
  //   res.status(404).send(apiResponse('Something is clearly wrong here.'))
  // }
}

export default RootController
