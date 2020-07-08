import { getConnection } from 'typeorm'
import Genre, { IGenre } from '../Genre'

export const genreRepository = () => {
  const conn = getConnection()
  return conn.getRepository<IGenre>(Genre)
}
