interface IRepository<T> {
  getAll(): Promise<T[]>
}

export default IRepository
