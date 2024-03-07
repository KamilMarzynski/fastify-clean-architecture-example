import { type Request, type Response } from '../../../../../_lib/core/http'
import { isUseCaseError } from '../../../../../_lib/core/use-case'

import { type CreateUserUseCase } from '../../../ports/use-cases/create-user.use-case'
import { type DeleteUserUseCase } from '../../../ports/use-cases/delete-user.use-case'
import { type FindUserByIdUserUseCase } from '../../../ports/use-cases/find-user-by-id.use-case'
import { type GetUsersUseCase } from '../../../ports/use-cases/get-users.use-case'
import { USER_EXCEPTIONS } from '../../../use-cases/exceptions'

export interface HttpUserControllerDependencies {
  createUserUseCase: CreateUserUseCase
  findUserByIdUseCase: FindUserByIdUserUseCase
  deleteUserUseCase: DeleteUserUseCase
  getUsersUseCase: GetUsersUseCase
}

export class HttpUserController {
  private readonly createUserUseCase: CreateUserUseCase
  private readonly findUserByIdUseCase: FindUserByIdUserUseCase
  private readonly deleteUserUseCase: DeleteUserUseCase
  private readonly getUsersUseCase: GetUsersUseCase

  constructor (deps: HttpUserControllerDependencies) {
    this.createUserUseCase = deps.createUserUseCase
    this.findUserByIdUseCase = deps.findUserByIdUseCase
    this.deleteUserUseCase = deps.deleteUserUseCase
    this.getUsersUseCase = deps.getUsersUseCase
  }

  async createUser (req: Request, res: Response): Promise<void> {
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

  async findUserById (req: Request, res: Response): Promise<void> {
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

  async getUsers (req: Request, res: Response): Promise<void> {
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

  async deleteUser (req: Request, res: Response): Promise<void> {
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
}
