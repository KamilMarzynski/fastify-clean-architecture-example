import { type Db, MongoClient } from 'mongodb'
import { type AppConfig } from '../../core/config'

export interface DbDependencies {
  config: AppConfig
}

export const makeDb = async (deps: DbDependencies): Promise<Db> => {
  const url = deps.config.db.url
  const client = new MongoClient(url)

  const dbName = deps.config.db.dbName

  try {
    await client.connect()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }

  return client.db(dbName)
}
