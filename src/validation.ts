import Joi, { StringSchema } from 'joi'
import { MovieStatus } from './entity/Movie'

export const vResourceId = Joi.number().label('ID')
export const vNumber = Joi.number().integer()

export const vMovieStatus: StringSchema = Joi.string().allow(
  MovieStatus.Rumored,
  MovieStatus.Released,
  MovieStatus.PostProduction
).label('Movie Status')

export const vCreateMovieSchema = Joi.object({
  title: Joi.string().required(),
  budget: vNumber.optional().label('Budget'),
  homepage: Joi.string().optional().label('Homepage'),
  overview: Joi.string().optional().label('Overview'),
  popularity: vNumber.optional().label('Popularity'),
  releaseDate: Joi.date().label('Release Date'),
  revenue: vNumber.optional().label('Revenue'),
  runtime: vNumber.optional().label('Runtime'),
  movieStatus: vMovieStatus.optional(),
  tagline: Joi.string().optional().label('Tagline'),
  voteAverage: vNumber.optional().label('Vote Average'),
  voteCount: vNumber.optional().label('Vote Count')
})

export const vCreateGenreSchema = Joi.object({
  genreId: Joi.number().required().label('Genre ID'),
  genreName: Joi.string().required().label('Genre name')
})

