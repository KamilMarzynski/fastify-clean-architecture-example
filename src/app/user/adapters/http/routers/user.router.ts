import { type HttpUserController } from '../controllers/user.controller'
import { type FastifyInstance } from 'fastify'

const userByIdParams = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'string' }
  }
}

const filterUsersQuery = {
  type: 'object',
  properties: {
    limit: { type: 'number' },
    page: { type: 'number' },
    orderBy: { type: 'string', enum: ['firstName', 'lastName', 'email'] },
    order: { type: 'string', enum: ['asc', 'desc'] }
  }
}
const userBodyProperties = {
  firstName: { type: 'string' },
  lastName: { type: 'string' },
  email: { type: 'string', format: 'email' }
}

const createUserSchema = {
  body: {
    type: 'object',
    required: ['firstName', 'lastName', 'email'],
    properties: userBodyProperties
  }
}

const updateUserSchema = {
  params: userByIdParams,
  body: {
    type: 'object',
    properties: userBodyProperties

  }
}

const findUserByIdSchema = {
  params: userByIdParams
}

const deleteUserSchema = {
  params: userByIdParams
}

const findUsersSchema = {
  querystring: filterUsersQuery
}

export class UserRouter {
  constructor (
    private readonly userController: HttpUserController,
    private readonly server: FastifyInstance
  ) {}

  public register (): void {
    this.server.get('/users/:id', { schema: findUserByIdSchema }, async (req, res) => { await this.userController.findUserById(req, res) })
    this.server.get('/users', { schema: findUsersSchema }, async (req, res) => { await this.userController.getUsers(req, res) })
    this.server.delete('/users/:id', { schema: deleteUserSchema }, async (req, res) => { await this.userController.deleteUser(req, res) })
    this.server.post('/users', { schema: createUserSchema }, async (req, res) => { await this.userController.createUser(req, res) })
    this.server.put('/users/:id', { schema: updateUserSchema }, async (req, res) => { await this.userController.updateUser(req, res) })
  }
}
