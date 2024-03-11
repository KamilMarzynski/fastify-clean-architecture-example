import { initApp } from './app/app'
import { makeDependencyContainer } from './_lib/core/di'
import { makeConfig } from './_lib/core/config'

const config = makeConfig()
const deps = makeDependencyContainer({ config })

initApp(deps)

const { server } = deps

server.listen({ host: '0.0.0.0', port: config.port }, (err, address) => {
  if (err !== null) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
