import { getConnection } from 'typeorm'
import Quest, { IQuest } from '../Quest'

export const questRepository = () => {
  const conn = getConnection()
  return conn.getRepository<IQuest>(Quest)
}
