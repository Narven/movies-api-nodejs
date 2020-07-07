import { Response } from 'express'
import { inject } from 'inversify'
import { controller, httpGet, httpPost, requestBody, requestParam, response } from 'inversify-express-utils'
import { Repository } from 'typeorm'
import { apiResponse } from '../constant'
import { IQuest } from '../entity/Quest'
import { TYPES } from '../types'

export interface IQuestController {
  getAll: (res: Response) => void
}

@controller('/quests')
class QuestController implements IQuestController {
  private readonly _repo: Repository<IQuest>

  constructor(@inject(TYPES.QuestRepository) repo: Repository<IQuest>) {
    this._repo = repo
  }

  @httpGet('/')
  public async getAll(@response() res: Response) {
    try {
      return await this._repo.find()
    } catch (e) {
      res.status(200)
      return res.json(apiResponse([]))
    }
  }

  @httpGet('/:id')
  public async getOne(
    @response() res: Response,
    @requestParam('id') id: number) {
    try {
      return await this._repo.findByIds([id])
    } catch (e) {
      res.status(404)
      return res.json(apiResponse({}))
    }
  }

  @httpPost('/')
  public async post(
    @response() res: Response,
    @requestBody() content: Partial<IQuest>) {
    try {
      return await this._repo.save(content)
    } catch (e) {
      res.status(500)
      return res.json(apiResponse({ error: e.message }))
    }
  }

}

export default QuestController
