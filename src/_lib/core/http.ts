// TODO: is it actually good to wrap request and response?

export interface Request {
  body: any
  query: any
  params: any
  headers: any
}

export interface Response {
  send: (data: any) => void
  status: (code: number) => Response
}

export type HttpRoutePath = string
export type HttpRouteHandler = (req: Request, res: Response) => Promise<void>
export type HttpRouteMethod = 'get' | 'post' | 'put' | 'delete' | 'patch'

export interface HttpRoute {
  path: HttpRoutePath
  method: HttpRouteMethod
  handler: HttpRouteHandler
}

export abstract class HttpController {
  protected routeHandlers: HttpRoute[] = []

  get routes (): HttpRoute[] {
    return this.routeHandlers
  }
}
