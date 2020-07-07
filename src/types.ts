export const TYPES = {
  // Middlewares
  ValidationIdResourceMiddleware: Symbol.for('ValidationIdResourceMiddleware'),
  ValidationCreateMovieMiddleware: Symbol.for('ValidationCreateMovieMiddleware'),
  // Database
  Database: Symbol.for('Database'),
  // Controllers
  RootController: Symbol.for('RootController'),
  QuestController: Symbol.for('QuestController'),
  HomeController: Symbol.for('HomeController'),
  // Repositories
  MovieRepository: Symbol.for('MovieRepository')
}
