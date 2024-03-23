import { type Request, type Response, HttpController } from '../../../../../_lib/core/http'
import { isUseCaseError } from '../../../../../_lib/core/use-case'

import { type CreateUserUseCase, type DeleteUserUseCase, type FindUserByIdUserUseCase, type GetUsersUseCase, type UpdateUserInput, type UpdateUserUseCase } from '../../../ports/use-cases'
import { USER_EXCEPTIONS } from '../../../use-cases/exceptions'

export interface HttpUserControllerDependencies {
  createUserUseCase: CreateUserUseCase
  findUserByIdUseCase: FindUserByIdUserUseCase
  deleteUserUseCase: DeleteUserUseCase
  getUsersUseCase: GetUsersUseCase
  updateUserUseCase: UpdateUserUseCase
}

export class HttpUserController extends HttpController {
  private readonly createUserUseCase: CreateUserUseCase
  private readonly findUserByIdUseCase: FindUserByIdUserUseCase
  private readonly deleteUserUseCase: DeleteUserUseCase
  private readonly getUsersUseCase: GetUsersUseCase
  private readonly updateUserUseCase: UpdateUserUseCase

  constructor (deps: HttpUserControllerDependencies) {
    super()
    this.createUserUseCase = deps.createUserUseCase
    this.findUserByIdUseCase = deps.findUserByIdUseCase
    this.deleteUserUseCase = deps.deleteUserUseCase
    this.getUsersUseCase = deps.getUsersUseCase
    this.updateUserUseCase = deps.updateUserUseCase

    // TODO: move to decorators for each method
    this.routeHandlers = [
      {
        method: 'post',
        path: '/users',
        handler: this.createUser
      },
      {
        method: 'get',
        path: '/users',
        handler: this.getUsers
      },
      {
        method: 'get',
        path: '/users/:id',
        handler: this.findUserById
      },
      {
        method: 'delete',
        path: '/users/:id',
        handler: this.deleteUser
      },
      {
        method: 'put',
        path: '/users/:id',
        handler: this.updateUser
      }
    ]
  }

  private readonly createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = {
        data: req.body
      }
      const output = await this.createUserUseCase.execute(input)

      if (isUseCaseError(output)) {
        if (output.code === USER_EXCEPTIONS.USER_ALREADY_EXISTS.code) {
          res.status(409).send(output.message)
          return
        }
        res.status(500).send(output.message)
        return
      }

      res.send({
        userId: output.result.id
      })
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }

  private readonly findUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = {
        data: req.params
      }
      const output = await this.findUserByIdUseCase.execute(input)

      if (isUseCaseError(output)) {
        if (output.code === USER_EXCEPTIONS.USER_NOT_FOUND.code) {
          res.status(404).send(output.message)
          return
        }
        res.status(500).send(output.message)
        return
      }

      res.send(output.result)
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }

  private readonly getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = {
        data: req.query
      }
      const output = await this.getUsersUseCase.execute(input)

      if (isUseCaseError(output)) {
        res.status(500).send(output.message)
        return
      }

      res.send(output.result)
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }

  private readonly deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = {
        data: req.params
      }
      const output = await this.deleteUserUseCase.execute(input)

      if (isUseCaseError(output)) {
        if (output.code === USER_EXCEPTIONS.USER_NOT_FOUND.code) {
          res.status(404).send(output.message)
          return
        }
        res.status(500).send(output.message)
        return
      }

      res.send(output.result)
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }

  private readonly updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const input: UpdateUserInput = {
        data: {
          id: req.params.id,
          data: req.body
        }
      }
      const output = await this.updateUserUseCase.execute(input)

      if (isUseCaseError(output)) {
        if (output.code === USER_EXCEPTIONS.USER_NOT_FOUND.code) {
          res.status(404).send(output.message)
          return
        }
        if (output.code === USER_EXCEPTIONS.EMAIL_TAKEN.code) {
          res.status(409).send(output.message)
          return
        }
        res.status(500).send(output.message)
        return
      }

      res.send(output.result)
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }
}
