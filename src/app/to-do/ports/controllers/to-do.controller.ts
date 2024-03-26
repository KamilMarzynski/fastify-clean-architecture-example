import { type Controller } from '../../../../_lib/core'
import { type CreateToDoUseCase } from '../use-cases'

export interface ToDoControllerDependencies {
  createToDoUseCase: CreateToDoUseCase
}

export interface ToDoController extends Controller {
  createToDo: (...args: any[]) => Promise<any>
}
