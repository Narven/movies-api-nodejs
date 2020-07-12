import { inject } from 'inversify'
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost, httpPut,
  interfaces,
  queryParam,
  requestBody,
  requestParam,
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
  getAll: (limit: number, offset: number) => void
  getOne: (id: number) => void
  addNew: (content: Partial<IGenre>) => void
  updateOne: (id: number, genre: Partial<IGenre>) => void
}

@ApiPath({
  path: '/genres',
  name: 'Genres'
})
@controller('/genres')
class GenreController extends BaseHttpController implements interfaces.Controller, IGenreRepository {
  constructor(@inject(TYPES.GenreRepository) private repo: Repository<IGenre>) {
    super()
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
    @requestParam('id') id: number) {
    try {
      const data = await this.repo.findByIds([id])
      if (data.length < 1) {
        throw new Error(`Genre with id: ${id} found`)
      }
      return this.json(apiResponse(data))
    } catch (e) {
      return this.notFound()
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
    @requestBody() content: Partial<IGenre>) {
    try {
      return await this.repo.save(content)
    } catch (e) {
      return this.internalServerError(e.message)
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
    @requestParam('id') id: number,
    @requestBody() genre: Partial<IGenre>) {
    try {
      const data = await this.repo.update({ genreId: id }, genre)
        .then(() => this.repo.findOne({ genreId: id }))
      return this.json(apiResponse(data))
    } catch (e) {
      return this.internalServerError(e.message)
    }
  }

}

export default GenreController
