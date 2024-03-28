interface TransportOptions {
  route: string
  http?: {
    methodOverride?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  }
}

export abstract class Transport {
  abstract command (command: Record<string, any> & { id?: string }, opts: TransportOptions): Promise<void>
  abstract query<T> (query: Record<string, any> & { id?: string }, opts: TransportOptions): Promise<T>
}

// This is very naive implementation, probably will be hard to be switched to another transport
export class HttpTransport implements Transport {
  async command (command: Record<string, any>, opts: TransportOptions): Promise<void> {
    const { id, ...restOfCommand } = command
    const url = `${this.getFullUrl(opts)}${id !== undefined ? `/${id}` : ''}`
    const response = await fetch(url, {
      method: opts.http?.methodOverride ?? 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ restOfCommand })
    })

    return await response.json()
  }

  async query<T>(query: Record<string, any> & { id?: string }, opts: TransportOptions): Promise<T> {
    const { id, ...restOfQuery } = query
    let queryParams
    if (Object.keys(restOfQuery).length !== 0) {
      queryParams = this.queryToParams(restOfQuery)
    }
    const url = `${this.getFullUrl(opts)}${id !== undefined ? `/${id}` : ''}${queryParams !== undefined ? `?${queryParams}` : ''}`
    const response = await fetch(url, {
      method: opts.http?.methodOverride ?? 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return await response.json()
  }

  private getFullUrl (opts: TransportOptions): string {
    return `http://localhost:8080${opts.route}`
  }

  private queryToParams (query: Record<string, any>): string {
    return Object.keys(query).map(key => `${key}=${query[key]}`).join('&')
  }
}

export interface TransportFactory {
  create: () => Transport
}

export class HttpTransportFactory implements TransportFactory {
  create (): Transport {
    return new HttpTransport()
  }
}
