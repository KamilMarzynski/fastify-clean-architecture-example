export type TransportType = 'http'

export interface AppConfig {
  port: number
  transportType: TransportType
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
    db: {
      url: 'mongodb://mongo:27017',
      dbName: 'project'
    }
  }
}
