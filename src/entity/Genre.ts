import { EntitySchema } from 'typeorm'

export const genreEntityName = 'genre'

export interface IGenre {
  genreId: number
  genreName: string
}

const Genre = new EntitySchema<IGenre>({
  name: genreEntityName,
  columns: {
    genreId: {
      type: 'int',
      primary: true,
      generated: true,
      name: 'genre_id'
    },
    genreName: {
      type: 'varchar',
      length: 100,
      name: 'genre_name',
      nullable: true
    }
  }
})

export default Genre
