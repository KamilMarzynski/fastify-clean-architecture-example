import { type ToDoController, type ToDoControllerDependencies } from './to-do.controller'

export abstract class ToDoControllerFactory {
  public abstract createToDoController (deps: ToDoControllerDependencies): ToDoController
}
