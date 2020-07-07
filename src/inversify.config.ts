import { AsyncContainerModule, interfaces } from 'inversify'
import { Repository } from 'typeorm'
import MovieController, { IQuestController } from './controllers/MovieController'
import RootController, { IRootController } from './controllers/RootController'
import { getDbConnection } from './database'
import { IMovie } from './entity/Movie'
import { movieRepository } from './entity/repository/MovieRepository'
import ValidationCreateMovieMiddleware from './middlewares/ValidationCreateMovieMiddleware'
import ValidationIdResourceMiddleware from './middlewares/ValidationIdResourceMiddleware'
import { TYPES } from './types'
import Bind = interfaces.Bind

export const bindings = new AsyncContainerModule(async (bind: Bind) => {

  await getDbConnection()

  // Controllers
  bind<IRootController>(TYPES.RootController).to(RootController)
  bind<IQuestController>(TYPES.QuestController).to(MovieController)
  // Repository
  bind<Repository<IMovie>>(TYPES.MovieRepository).toDynamicValue(() => {
    return movieRepository()
  }).inRequestScope()
  // Middlewares
  bind<ValidationIdResourceMiddleware>(TYPES.ValidationIdResourceMiddleware).to(ValidationIdResourceMiddleware)
  bind<ValidationCreateMovieMiddleware>(TYPES.ValidationCreateMovieMiddleware).to(ValidationCreateMovieMiddleware)
})
