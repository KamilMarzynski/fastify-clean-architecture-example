import fastify, { type FastifyInstance } from 'fastify'

export const makeServer = (): FastifyInstance => {
  return fastify()
}
