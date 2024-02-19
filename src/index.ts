import fastify from 'fastify';
import { initApp } from './app/app';

  
const server = fastify()

initApp(server);

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
});
