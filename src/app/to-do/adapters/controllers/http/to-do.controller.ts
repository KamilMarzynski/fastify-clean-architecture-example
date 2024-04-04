import { HttpController, type Request, type Response } from '../../../../../_lib/core/http'
import { isUseCaseError } from '../../../../../_lib/core/use-case'
import { type ToDoController, type ToDoControllerDependencies } from '../../../ports/controllers/to-do.controller'

import { type CompleteToDoUseCase, type FindToDoByIdUseCase, type CreateToDoUseCase, type DeleteToDoUseCase } from '../../../ports/use-cases'
import { TO_DO_EXCEPTIONS } from '../../../use-cases/exceptions'

export class HttpToDoController extends HttpController implements ToDoController {
  protected readonly createToDoUseCase: CreateToDoUseCase
  protected readonly completeToDoUseCase: CompleteToDoUseCase
  protected readonly findToDoByIdUseCase: FindToDoByIdUseCase
  protected readonly deleteToDoUseCase: DeleteToDoUseCase

  constructor (deps: ToDoControllerDependencies) {
    super()
    this.createToDoUseCase = deps.createToDoUseCase
    this.findToDoByIdUseCase = deps.findToDoByIdUseCase
    this.completeToDoUseCase = deps.completeToDoUseCase
    this.deleteToDoUseCase = deps.deleteToDoUseCase

    // TODO: move to decorators for each method
    this.handlers = [
      {
        method: 'post',
        path: '/to-do',
        handler: this.createToDo
      },
      {
        method: 'put',
        path: '/to-do/:id/complete',
        handler: this.createToDo
      },
      {
        method: 'get',
        path: '/to-do/:id',
        handler: this.createToDo
      },
      {
        method: 'delete',
        path: '/to-do/:id',
        handler: this.createToDo
      }
    ]
  }

  public readonly deleteToDo = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = {
        data: req.body
      }
      const output = await this.deleteToDoUseCase.execute(input)

      if (isUseCaseError(output)) {
        if (output.code === TO_DO_EXCEPTIONS.TODO_NOT_FOUND.code) {
          res.status(404).send(output.message)
          return
        }
        res.status(500).send(output.message)
        return
      }

      res.send({
        toDoId: output.result.id
      })
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }

  public readonly completeToDo = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = {
        data: req.body
      }
      const output = await this.completeToDoUseCase.execute(input)

      if (isUseCaseError(output)) {
        if (output.code === TO_DO_EXCEPTIONS.TODO_NOT_FOUND.code) {
          // TODO: better error return
          res.status(404).send(output.message)
          return
        }
        res.status(500).send(output.message)
        return
      }

      res.send({
        toDoId: output.result.id
      })
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }

  public readonly findToDoById = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = {
        data: req.body
      }
      const output = await this.findToDoByIdUseCase.execute(input)

      if (isUseCaseError(output)) {
        if (output.code === TO_DO_EXCEPTIONS.TODO_NOT_FOUND.code || output.code === TO_DO_EXCEPTIONS.USER_NOT_FOUND.code) {
          // TODO: better error return
          res.status(404).send(output.message)
          return
        }
        res.status(500).send(output.message)
        return
      }

      res.send({
        toDoId: output.result.id
      })
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }

  public readonly createToDo = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = {
        data: req.body
      }
      const output = await this.createToDoUseCase.execute(input)

      if (isUseCaseError(output)) {
        if (output.code === TO_DO_EXCEPTIONS.USER_NOT_FOUND.code) {
          // TODO: better error return
          res.status(404).send(output.message)
          return
        }
        res.status(500).send(output.message)
        return
      }

      res.send({
        toDoId: output.result.id
      })
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }
}
