import { Response } from 'express'
import { controller, httpGet } from 'inversify-express-utils'
import { apiResponse } from '../constant'

export interface IRootController {
  getRoot(_req: any, res: Response): void
}

@controller('/')
class RootController implements IRootController {

  @httpGet('/')
  public getRoot(_req: any, res: Response): void {
    res.json(apiResponse({ version: '1.0' }))
  }
}

export default RootController
