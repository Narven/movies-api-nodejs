import { Response } from 'express'
import { inject } from 'inversify'
import {
  controller,
  httpGet,
  httpPost, httpPut,
  interfaces,
  queryParam,
  requestBody,
  requestParam,
  response
} from 'inversify-express-utils'
import {
  ApiOperationGet,
  ApiOperationPost,
  ApiOperationPut,
  ApiPath,
  SwaggerDefinitionConstant
} from 'swagger-express-ts'
import { Repository } from 'typeorm'
import { apiResponse } from '../constant'
import { IGenre } from '../entity/Genre'
import { HttpStatus } from '../HttpStatus'
import { TYPES } from '../types'
import Controller = interfaces.Controller

export interface IGenreRepository extends Controller {
  getAll: (res: Response, limit: number, offset: number) => void
  getOne: (res: Response, id: number) => void
  addNew: (res: Response, content: Partial<IGenre>) => void
  updateOne: (res: Response, id: number, genre: Partial<IGenre>) => void
}

@ApiPath({
  path: '/genres',
  name: 'Genres'
})
@controller('/genres')
class GenreController implements interfaces.Controller {
  constructor(@inject(TYPES.GenreRepository) private repo: Repository<IGenre>) {
  }

  @ApiOperationGet({
    description: 'Get all genres',
    summary: 'Get all genres available',
    responses: {
      [HttpStatus.ok]: {
        description: 'Success',
        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
        model: 'Genre'
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
      return res
        .status(HttpStatus.ok)
        .json(apiResponse([]))
    }
  }

  @ApiOperationGet({
    description: 'Get one genre',
    summary: 'Get one genre by ID',
    responses: {
      [HttpStatus.ok]: {
        description: 'Success',
        type: SwaggerDefinitionConstant.Response.Type.OBJECT,
        model: 'Genre'
      }
    }
  })
  @httpGet('/:id', TYPES.ValidationIdResourceMiddleware)
  public async getOne(
    @response() res: Response,
    @requestParam('id') id: number) {
    try {
      const data = await this.repo.findByIds([id])
      if (data.length < 1) {
        throw new Error(`Genre with id: ${id} found`)
      }
      return res.json(apiResponse(data))
    } catch (e) {
      return res
        .sendStatus(HttpStatus.notFound)
    }
  }

  @ApiOperationPost({
    description: 'Create a new genre',
    summary: 'Create a new genre',
    parameters: {
      body: {
        description: 'New Genre',
        required: true,
        model: 'Genre'
      }
    },
    responses: {
      [HttpStatus.ok]: { description: 'Success' },
      [HttpStatus.internalServerError]: { description: 'Parameters fail' }
    }
  })
  @httpPost('/', TYPES.ValidationCreateGenreMiddleware)
  public async addNew(
    @response() res: Response,
    @requestBody() content: Partial<IGenre>) {
    try {
      return await this.repo.save(content)
    } catch (e) {
      return res
        .status(HttpStatus.internalServerError)
        .json(apiResponse({ error: e.message }))
    }
  }

  @ApiOperationPut({
    description: 'Update an existing genre',
    summary: 'Update an existing genre by ID',
    parameters: {
      body: {
        description: 'Genre object',
        required: true,
        model: 'Genre'
      }
    },
    responses: {
      [HttpStatus.ok]: { description: 'Success' },
      [HttpStatus.internalServerError]: { description: 'Parameters fail' }
    }
  })
  @httpPut('/:id', TYPES.ValidationIdResourceMiddleware, TYPES.ValidationCreateGenreMiddleware)
  public async updateOne(
    @response() res: Response,
    @requestParam('id') id: number,
    @requestBody() genre: Partial<IGenre>) {
    try {
      const data = await this.repo.update({ genreId: id }, genre)
        .then(() => this.repo.findOne({ genreId: id }))
      return res.json(apiResponse(data))
    } catch (e) {
      return res
        .status(500)
        .json(apiResponse({ error: e.message }))
    }
  }

}

export default GenreController
