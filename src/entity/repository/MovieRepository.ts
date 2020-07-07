import { getConnection } from 'typeorm'
import Movie, { IMovie } from '../Movie'

export const movieRepository = () => {
  const conn = getConnection()
  return conn.getRepository<IMovie>(Movie)
}
