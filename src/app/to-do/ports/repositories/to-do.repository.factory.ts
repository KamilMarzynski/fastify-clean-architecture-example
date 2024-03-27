import { type ToDoRepository } from './to-do.repository'

export abstract class ToDoRepositoryFactory {
  public abstract createToDoRepository (): ToDoRepository
}
