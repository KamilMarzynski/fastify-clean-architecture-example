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
