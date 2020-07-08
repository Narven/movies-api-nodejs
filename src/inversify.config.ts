import { AsyncContainerModule, interfaces as inversifyInterfaces } from 'inversify'
import { interfaces, TYPE } from 'inversify-express-utils'
import { Repository } from 'typeorm'
import GenreController from './controllers/GenreController'
import MovieController from './controllers/MovieController'
import RootController from './controllers/RootController'
import { getDbConnection } from './database'
import { IGenre } from './entity/Genre'
import { IMovie } from './entity/Movie'
import { genreRepository } from './entity/repository/GenreRepository'
import { movieRepository } from './entity/repository/MovieRepository'
import ValidationCreateGenreMiddleware from './middlewares/ValidationCreateGenreMiddleware'
import ValidationCreateMovieMiddleware from './middlewares/ValidationCreateMovieMiddleware'
import ValidationIdResourceMiddleware from './middlewares/ValidationIdResourceMiddleware'
import { TYPES } from './types'
import Bind = inversifyInterfaces.Bind

export const bindings = new AsyncContainerModule(async (bind: Bind) => {
  await getDbConnection()

  // Controllers
  bind<interfaces.Controller>(TYPE.Controller).to(RootController).inSingletonScope().whenTargetNamed(TYPES.RootController)
  bind<interfaces.Controller>(TYPE.Controller).to(MovieController).inSingletonScope().whenTargetNamed(TYPES.MovieController)
  bind<interfaces.Controller>(TYPE.Controller).to(GenreController).inSingletonScope().whenTargetNamed(TYPES.GenreController)
  // Repository
  bind<Repository<IMovie>>(TYPES.MovieRepository).toDynamicValue(() => {
    return movieRepository()
  }).inRequestScope()
  bind<Repository<IGenre>>(TYPES.GenreRepository).toDynamicValue(() => {
    return genreRepository()
  }).inRequestScope()
  // Middlewares
  bind<ValidationIdResourceMiddleware>(TYPES.ValidationIdResourceMiddleware).to(ValidationIdResourceMiddleware)
  bind<ValidationCreateMovieMiddleware>(TYPES.ValidationCreateMovieMiddleware).to(ValidationCreateMovieMiddleware)
  bind<ValidationCreateGenreMiddleware>(TYPES.ValidationCreateGenreMiddleware).to(ValidationCreateGenreMiddleware)
})
