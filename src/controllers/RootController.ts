import { Response } from 'express'
import config from 'config'
import { controller, httpGet } from 'inversify-express-utils'
import { apiResponse } from '../constant'

export interface IRootController {
  getRoot(_req: any, res: Response): void
}

@controller('/')
class RootController implements IRootController {

  @httpGet('/')
  public getRoot(_req: any, res: Response): void {
    res.json(apiResponse({ version: config.get('version') }))
  }
}

export default RootController
