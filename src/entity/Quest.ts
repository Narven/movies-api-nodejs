import { EntitySchema } from 'typeorm'

export const questEntityName = 'quest'

export interface IQuest {
  id: number,
  title: string
  description?: string
}

const Quest = new EntitySchema<IQuest>({
  name: questEntityName,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true
    },
    title: {
      type: 'varchar',
      length: 80,
      name: 'title'
    },
    description: {
      type: 'varchar',
      length: 100,
      name: 'description',
      nullable: true
    }
  }
})

export default Quest
