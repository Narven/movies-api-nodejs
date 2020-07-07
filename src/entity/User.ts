import { EntitySchema } from 'typeorm'

export const userEntityName = 'user'

export interface IUser {
  id: Number,
  firstName?: string,
  lastName?: string
}

const User = new EntitySchema<IUser>({
  name: userEntityName,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true
    },
    firstName: {
      type: String,
      length: 100,
      nullable: true
    },
    lastName: {
      type: String,
      length: 100,
      nullable: true
    }
  }
})

export default User
