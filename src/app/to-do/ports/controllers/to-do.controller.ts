import { type CreateToDoUseCase } from '../use-cases'

export interface ToDoControllerDependencies {
  createToDoUseCase: CreateToDoUseCase
}

export interface ToDoController {
  createToDo: (...args: any[]) => Promise<any>
}
