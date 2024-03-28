import { HttpController, type Request, type Response } from '../../../../../_lib/core/http'
import { isUseCaseError } from '../../../../../_lib/core/use-case'
import { type ToDoController, type ToDoControllerDependencies } from '../../../ports/controllers/to-do.controller'

import { type CreateToDoUseCase } from '../../../ports/use-cases'
import { TO_DO_EXCEPTIONS } from '../../../use-cases/exceptions'

export class HttpToDoController extends HttpController implements ToDoController {
  protected readonly createToDoUseCase: CreateToDoUseCase

  constructor (deps: ToDoControllerDependencies) {
    super()
    this.createToDoUseCase = deps.createToDoUseCase

    // TODO: move to decorators for each method
    this.handlers = [
      {
        method: 'post',
        path: '/to-do',
        handler: this.createToDo
      }
    ]
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
