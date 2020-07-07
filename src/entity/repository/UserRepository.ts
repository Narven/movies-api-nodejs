import { getConnection } from 'typeorm'
import User, { IUser } from '../User'

export const userRepository = () => {
  const conn = getConnection()
  return conn.getRepository<IUser>(User)
}
