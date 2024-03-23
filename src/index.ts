import { initApp } from './app/app'
import { makeDependencyContainer } from './_lib/core/di'
import { makeConfig } from './_lib/core/config'
import { bootstrapServer } from './_lib/frameworks/server/server'

const main = async (): Promise<void> => {
  const config = makeConfig()
  const deps = await makeDependencyContainer({ config })

  initApp(deps)
  bootstrapServer(deps)
}

main().then(() => {
  console.log('App started')
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
