import fastify from 'fastify'
import { initApp } from './app/app'

const server = fastify()

// const deps = makeDependencyContainer(server);
// initApp(deps);

initApp({ server })

server.listen({ host: '0.0.0.0', port: 8080 }, (err, address) => {
  if (err !== null) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
