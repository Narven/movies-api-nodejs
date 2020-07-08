import { Response } from 'express'
import config from 'config'
import { controller, httpGet, interfaces } from 'inversify-express-utils'
import { ApiPath } from 'swagger-express-ts'
import { apiResponse } from '../constant'
import Controller = interfaces.Controller

export interface IRootController extends Controller {
  getRoot(_req: any, res: Response): void
}

@ApiPath({
  path: '/',
  name: 'Root'
})
@controller('/')
class RootController implements interfaces.Controller {

  @httpGet('/')
  public getRoot(_req: any, res: Response): void {
    res.json(apiResponse({ version: config.get('version') }))
  }
}

export default RootController
