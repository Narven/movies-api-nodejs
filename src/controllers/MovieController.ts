import { inject } from 'inversify'
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost, httpPut, interfaces,
  queryParam,
  requestBody,
  requestParam
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
import { IMovie } from '../entity/Movie'
import { HttpStatus } from '../HttpStatus'
import { TYPES } from '../types'
import Controller = interfaces.Controller

export interface IMovieController extends Controller {
  getAll: (limit: number, offset: number) => void
  getOne: (id: number) => void
  addNew: (content: Partial<IMovie>) => void
  updateOne: (id: number, movie: Partial<IMovie>) => void
}

@ApiPath({
  path: '/movies',
  name: 'Movies'
})
@controller('/movies')
class MovieController extends BaseHttpController implements interfaces.Controller, IMovieController {
  constructor(@inject(TYPES.MovieRepository) private repo: Repository<IMovie>) {
    super()
  }

  @ApiOperationGet({
    description: 'Get all movies',
    summary: 'Get all movies available',
    responses: {
      [HttpStatus.ok]: {
        description: 'Success',
        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
        model: 'Movie'
      }
    }
  })
  @httpGet('/')
  public async getAll(
    @queryParam('limit') limit: number = 30,
    @queryParam('offset') offset: number = 0) {
    try {
      const data = await this.repo.find({ skip: offset, take: limit })
      return this.json(apiResponse(data))
    } catch (e) {
      return this.json(apiResponse([]))
    }
  }

  @ApiOperationGet({
    description: 'Get one movie',
    summary: 'Get one movie by ID',
    responses: {
      [HttpStatus.ok]: {
        description: 'Success',
        type: SwaggerDefinitionConstant.Response.Type.OBJECT,
        model: 'Movie'
      }
    }
  })
  @httpGet('/:id', TYPES.ValidationIdResourceMiddleware)
  public async getOne(@requestParam('id') id: number) {
    try {
      const data = await this.repo.findByIds([id])
      if (data.length < 1) {
        throw new Error(`Movie with id: ${id} found`)
      }
      return this.json(apiResponse(data))
    } catch (e) {
      return this.notFound()
    }
  }

  @ApiOperationPost({
    description: 'Create a new movie',
    summary: 'Create a new movie',
    parameters: {
      body: {
        description: 'New Movie',
        required: true,
        model: 'Movie'
      }
    },
    responses: {
      [HttpStatus.ok]: { description: 'Success' },
      [HttpStatus.internalServerError]: { description: 'Parameters fail' }
    }
  })
  @httpPost('/', TYPES.ValidationCreateMovieMiddleware)
  public async addNew(@requestBody() content: Partial<IMovie>) {
    try {
      return await this.repo.save(content)
    } catch (e) {
      return this.internalServerError(e.message)
    }
  }

  @ApiOperationPut({
    description: 'Update an existing movie',
    summary: 'Update an existing movie by ID',
    parameters: {
      body: {
        description: 'Movie object',
        required: true,
        model: 'Movie'
      }
    },
    responses: {
      [HttpStatus.ok]: { description: 'Success' },
      [HttpStatus.internalServerError]: { description: 'Parameters fail' }
    }
  })
  @httpPut('/:id', TYPES.ValidationIdResourceMiddleware, TYPES.ValidationCreateMovieMiddleware)
  public async updateOne(
    @requestParam('id') id: number,
    @requestBody() movie: Partial<IMovie>) {
    try {
      const data = await this.repo.update({ movieId: id }, movie)
        .then(() => this.repo.findOne({ movieId: id }))
      return this.json(apiResponse(data))
    } catch (e) {
      return this.internalServerError(e.message)
    }
  }

}

export default MovieController
