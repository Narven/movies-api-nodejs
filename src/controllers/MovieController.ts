import { Response } from 'express'
import { inject } from 'inversify'
import { controller, httpGet, httpPost, queryParam, requestBody, requestParam, response } from 'inversify-express-utils'
import { Repository } from 'typeorm'
import { apiResponse, ctrlDebug } from '../constant'
import { IMovie } from '../entity/Movie'
import { TYPES } from '../types'

export interface IQuestController {
  getAll: (res: Response, limit: number, offset: number) => void
  getOne: (res: Response, id: number) => void
}

@controller('/movies')
class MovieController implements IQuestController {

  constructor(@inject(TYPES.MovieRepository) private repo: Repository<IMovie>) {
  }

  @httpGet('/')
  public async getAll(
    @response() res: Response,
    @queryParam('limit') _limit: number,
    @queryParam('offset') _offset: number) {
    try {
      const data = await this.repo.find()
      return res.json(apiResponse(data))
    } catch (e) {
      ctrlDebug(e)
      res.status(200)
      return res.json(apiResponse([]))
    }
  }

  @httpGet('/:id', TYPES.ValidationIdResourceMiddleware)
  public async getOne(
    @response() res: Response,
    @requestParam('id') id: number) {
    try {
      const data = await this.repo.findByIds([id])
      if (data.length < 1) {
        throw new Error(`Movie with id: ${id} found`)
      }
      return res.json(apiResponse(data))
    } catch (e) {
      return res.status(404).send()
    }
  }

  @httpPost('/', TYPES.ValidationCreateMovieMiddleware)
  public async post(
    @response() res: Response,
    @requestBody() content: Partial<IMovie>) {
    try {
      return await this.repo.save(content)
    } catch (e) {
      res.status(500)
      return res.json(apiResponse({ error: e.message }))
    }
  }

}

export default MovieController
