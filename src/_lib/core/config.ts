export type TransportType = 'http'
export type PersistenceType = 'mongo' | 'memory'

export interface AppConfig {
  port: number
  transportType: TransportType
  persistenceType: PersistenceType
  db: {
    url: string
    dbName: string
  }
}

// hardcoded for now
export const makeConfig = (): AppConfig => {
  return {
    port: 8080,
    transportType: 'http',
    persistenceType: 'mongo',
    db: {
      url: 'mongodb://mongo:27017',
      dbName: 'project'
    }
  }
}
