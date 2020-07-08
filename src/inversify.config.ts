import { AsyncContainerModule, interfaces as xxx } from 'inversify'
import { interfaces, TYPE } from 'inversify-express-utils'
import { Repository } from 'typeorm'
import MovieController from './controllers/MovieController'
import RootController from './controllers/RootController'
import { getDbConnection } from './database'
import { IMovie } from './entity/Movie'
import { movieRepository } from './entity/repository/MovieRepository'
import ValidationCreateMovieMiddleware from './middlewares/ValidationCreateMovieMiddleware'
import ValidationIdResourceMiddleware from './middlewares/ValidationIdResourceMiddleware'
import { TYPES } from './types'
import Bind = xxx.Bind

export const bindings = new AsyncContainerModule(async (bind: Bind) => {
  await getDbConnection()

  // Controllers
  bind<interfaces.Controller>(TYPE.Controller).to(RootController).inSingletonScope().whenTargetNamed(TYPES.RootController)
  bind<interfaces.Controller>(TYPE.Controller).to(MovieController).inSingletonScope().whenTargetNamed(TYPES.MovieController)
  // Repository
  bind<Repository<IMovie>>(TYPES.MovieRepository).toDynamicValue(() => {
    return movieRepository()
  }).inRequestScope()
  // Middlewares
  bind<ValidationIdResourceMiddleware>(TYPES.ValidationIdResourceMiddleware).to(ValidationIdResourceMiddleware)
  bind<ValidationCreateMovieMiddleware>(TYPES.ValidationCreateMovieMiddleware).to(ValidationCreateMovieMiddleware)
})
