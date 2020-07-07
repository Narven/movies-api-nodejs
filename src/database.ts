import 'reflect-metadata'
import { createConnection } from 'typeorm'
import config from 'config'
import Quest from './entity/Quest'
import User from './entity/User'

export async function getDbConnection() {
  return createConnection({
    type: config.get<any>('db.dialect'),
    host: config.get<string>('db.host'),
    port: config.get<number>('db.port'),
    username: config.get<string>('db.username'),
    password: config.get<string>('db.password'),
    database: config.get<string>('db.name'),
    synchronize: false,
    logging: false,
    entities: [
      User,
      Quest
    ]
  })
}
