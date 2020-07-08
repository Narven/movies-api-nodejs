import { Response } from 'express'
import { inject } from 'inversify'
import {
  controller,
  httpGet,
  httpPost, httpPut, interfaces,
  queryParam,
  requestBody,
  requestParam,
  response
} from 'inversify-express-utils'
import { ApiOperationGet, ApiPath, SwaggerDefinitionConstant } from 'swagger-express-ts'
import { Repository } from 'typeorm'
import { apiResponse } from '../constant'
import { IMovie } from '../entity/Movie'
import { TYPES } from '../types'
import Controller = interfaces.Controller

export interface IMovieController extends Controller {
  getAll: (res: Response, limit: number, offset: number) => void
  getOne: (res: Response, id: number) => void
  addNew: (res: Response, content: Partial<IMovie>) => void
  updateOne: (res: Response, id: number, movie: Partial<IMovie>) => void
}

@ApiPath({
  path: '/movies',
  name: 'Movies'
})
@controller('/movies')
class MovieController implements interfaces.Controller {

  constructor(@inject(TYPES.MovieRepository) private repo: Repository<IMovie>) {
  }

  @ApiOperationGet({
    description: 'Get all movies',
    summary: 'Get all movies available',
    responses: {
      200: {
        description: 'Success',
        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
        model: 'Movie'
      }
    }
  })
  @httpGet('/')
  public async getAll(
    @response() res: Response,
    @queryParam('limit') limit: number = 30,
    @queryParam('offset') offset: number = 0) {
    try {
      const data = await this.repo.find({ skip: offset, take: limit })
      return res.json(apiResponse(data))
    } catch (e) {
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
  public async addNew(
    @response() res: Response,
    @requestBody() content: Partial<IMovie>) {
    try {
      return await this.repo.save(content)
    } catch (e) {
      res.status(500)
      return res.json(apiResponse({ error: e.message }))
    }
  }

  @httpPut('/:id', TYPES.ValidationIdResourceMiddleware, TYPES.ValidationCreateMovieMiddleware)
  public async updateOne(
    @response() res: Response,
    @requestParam('id') id: number,
    @requestBody() movie: Partial<IMovie>) {
    try {
      const data = await this.repo.update({ movieId: id }, movie)
        .then(() => this.repo.findOne({ movieId: id }))
      return res.json(apiResponse(data))
    } catch (e) {
      res.status(500)
      return res.json(apiResponse({ error: e.message }))
    }
  }

}

export default MovieController
