import { type TransportType, type AppConfig } from './config'

export type Hanlder = (...args: any[]) => Promise<any>
export type Route = string

interface RouteHandler {
  path: Route
  handler: Hanlder
}

export abstract class Controller<T extends RouteHandler = RouteHandler> {
  protected handlers: T[] = []
  public readonly abstract type: TransportType

  get routes (): T[] {
    return this.handlers
  }
}

export abstract class ControllerFactory {
  constructor (protected readonly deps: {
    config: AppConfig
  }) {}
  public abstract create (): Controller
}
