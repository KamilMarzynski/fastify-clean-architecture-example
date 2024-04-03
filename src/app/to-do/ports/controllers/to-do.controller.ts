import { type Controller } from '../../../../_lib/core'
import { type CompleteToDoUseCase, type CreateToDoUseCase, type FindToDoByIdUseCase } from '../use-cases'

export interface ToDoControllerDependencies {
  createToDoUseCase: CreateToDoUseCase
  completeToDoUseCase: CompleteToDoUseCase
  findToDoByIdUseCase: FindToDoByIdUseCase
}

export interface ToDoController extends Controller {
  createToDo: (...args: any[]) => Promise<any>
  completeToDo: (...args: any[]) => Promise<any>
  findToDoById: (...args: any[]) => Promise<any>
}
