import { AsyncContainerModule, interfaces } from 'inversify'
import { Repository } from 'typeorm'
import QuestController, { IQuestController } from './controllers/QuestController'
import RootController, { IRootController } from './controllers/RootController'
import { getDbConnection } from './database'
import { IQuest } from './entity/Quest'
import { questRepository } from './entity/repository/QuestRepository'
import { TYPES } from './types'
import Bind = interfaces.Bind

export const bindings = new AsyncContainerModule(async (bind: Bind) => {

  await getDbConnection()

  // Controllers
  bind<IRootController>(TYPES.RootController).to(RootController)
  bind<IQuestController>(TYPES.QuestController).to(QuestController)
  // Repository
  bind<Repository<IQuest>>(TYPES.QuestRepository).toDynamicValue(() => {
    return questRepository()
  }).inRequestScope()
})
