export const TYPES = {
  // Middlewares
  ValidationIdResourceMiddleware: Symbol.for('ValidationIdResourceMiddleware'),
  ValidationCreateMovieMiddleware: Symbol.for('ValidationCreateMovieMiddleware'),
  ValidationCreateGenreMiddleware: Symbol.for('ValidationCreateGenreMiddleware'),
  // Database
  Database: Symbol.for('Database'),
  // Controllers
  RootController: Symbol.for('RootController'),
  MovieController: Symbol.for('MovieController'),
  GenreController: Symbol.for('GenreController'),
  // Repositories
  MovieRepository: Symbol.for('MovieRepository'),
  GenreRepository: Symbol.for('GenreRepository')
}
