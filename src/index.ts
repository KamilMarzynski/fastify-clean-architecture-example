import fastify from 'fastify'
import { UserModule } from './app/user/user.module'

  
const server = fastify()

const userModule = new UserModule(server);
userModule.init();

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
});
