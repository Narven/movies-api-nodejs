import { EntitySchema } from 'typeorm'

export const movieEntityName = 'movie'

export enum MovieStatus {
  Released = 'Released',
  Rumored = 'Rumored',
  PostProduction = 'Post Production'
}

export interface IMovie {
  movieId: number
  title: string
  budget: number,
  homepage: string,
  overview: string,
  popularity: number,
  releaseDate: Date,
  revenue: number,
  runtime: number,
  movieStatus: MovieStatus,
  tagline: string,
  voteAverage: number,
  voteCount: number
}

const Movie = new EntitySchema<IMovie>({
  name: movieEntityName,
  columns: {
    movieId: {
      type: Number,
      primary: true,
      generated: true,
      name: 'movie_id'
    },
    title: {
      type: 'varchar',
      length: 1000,
      name: 'title',
      nullable: true
    },
    budget: {
      type: Number,
      nullable: true
    },
    homepage: {
      type: 'varchar',
      nullable: true
    },
    overview: {
      type: 'varchar',
      nullable: true
    },
    popularity: {
      type: 'double',
      nullable: true
    },
    releaseDate: {
      type: 'date',
      nullable: true,
      name: 'release_date'
    },
    revenue: {
      type: Number,
      nullable: true
    },
    runtime: {
      type: Number,
      nullable: true
    },
    movieStatus: {
      type: 'varchar',
      nullable: true,
      name: 'movie_status'
    },
    tagline: {
      type: 'varchar',
      nullable: true
    },
    voteAverage: {
      type: 'decimal',
      nullable: true,
      name: 'vote_average'
    },
    voteCount: {
      type: 'int',
      nullable: true,
      name: 'vote_count'
    }
  }
})

export default Movie
