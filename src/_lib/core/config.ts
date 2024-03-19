export interface AppConfig {
  port: number
  db: {
    url: string
    dbName: string
  }
}

// hardced for now
export const makeConfig = (): AppConfig => {
  return {
    port: 8080,
    db: {
      url: 'mongodb://mongo:27017',
      dbName: 'project'
    }
  }
}
