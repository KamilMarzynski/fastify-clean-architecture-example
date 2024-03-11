export interface AppConfig {
  port: number
}

// hardced for now
export const makeConfig = (): AppConfig => {
  return {
    port: 8080
  }
}
