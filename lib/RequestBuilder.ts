import * as TE from 'fp-ts/lib/TaskEither'

export interface RequestResult {
  ok: boolean
  status: number
  statusText: string
  data: string
  json: <T>() => T
  headers: string
}

const queryParams = (params: any = {}) => {
  return Object.keys(params)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&')
}

const withQuery = (url: string, params: any = {}) => {
  const queryString = queryParams(params)

  return queryString ? url + (url.indexOf('?') === -1 ? '?' : '&') + queryString : url
}

const parseXHRResult = (xhr: XMLHttpRequest): RequestResult => {
  return {
    ok: xhr.status >= 200 && xhr.status < 300,
    status: xhr.status,
    statusText: xhr.statusText,
    headers: xhr.getAllResponseHeaders(),
    data: xhr.responseText,
    json: <T>() => JSON.parse(xhr.responseText) as T,
  }
}

const errorResponse = (xhr: XMLHttpRequest, message: string | null = null): RequestResult => {
  return {
    ok: false,
    status: xhr.status,
    statusText: xhr.statusText,
    headers: xhr.getAllResponseHeaders(),
    data: message || xhr.statusText,
    json: <T>() => JSON.parse(message || xhr.statusText) as T,
  }
}

const request = (options: RequestBuilderOptions) => {

  const { method, url, ignoreCache, headers, timeout } = options
  const queryParams = options.queryParams || {}
  const body = options.body || void 0

  return new Promise<RequestResult>((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method as string, withQuery(url as string, queryParams))

    if (headers) {
      Object.keys(headers).forEach(key => xhr.setRequestHeader(key, headers[key]))
    }

    if (ignoreCache) {
      xhr.setRequestHeader('Cache-Control', 'no-cache')
    }

    xhr.timeout = timeout

    xhr.onload = evt => {
      resolve(parseXHRResult(xhr))
    }

    xhr.onerror = evt => {
      reject(errorResponse(xhr, 'Failed to make request.'))
    }

    xhr.ontimeout = evt => {
      reject(errorResponse(xhr, 'Request took longer than expected.'))
    }

    if (method === 'post' && body) {
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.send(JSON.stringify(body))
    } else {
      xhr.send()
    }
  })
}

/* Example endpoint configuration */

export enum Endpoint {
  User = '/data/user.json',
  Config = '/data/config.json'
}

enum Method {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete'
}

type KeyValue = {[key: string]:string}

interface RequestBuilderOptions {
  method?: Method,
  url?: Endpoint,
  queryParams?: KeyValue,
  body?: any
  ignoreCache: boolean,
  headers: KeyValue
  timeout: number,
}

const DEFAULT_TIMEOUT = 10000

class RequestBuilder {

  private options: RequestBuilderOptions = {
    timeout: DEFAULT_TIMEOUT,
    ignoreCache: false,
    headers: {
      Accept: 'application/json',
    }
  }

  public get(){
    this.options.method = Method.GET

    return this
  }

  public post(){
    this.options.method = Method.POST

    return this
  }

  public url(url: Endpoint){
    this.options.url = url

    return this
  }

  public queryParams(queryParams: KeyValue){
    this.options.queryParams = queryParams

    return this
  }

  public body(body: any){
    this.options.body = body

    return this
  }

  public ignoreCache(ignoreCache: boolean){
    this.options.ignoreCache = ignoreCache

    return this
  }

  public headers(headers: KeyValue){
    this.options.headers = headers

    return this
  }

  public timeout(timeout: number){
    this.options.timeout = timeout

    return this
  }

  public auth(useAuth: boolean){
    /*
    TODO: [david.roberts@basebone.com - 10/05/20]
    This function is not implemented but will take the JWT token
    which should be placed in local storage and apply it to the
    headers / body of the request. By default no auth implied.
    */

    return this
  }

  public getRequest(): TE.TaskEither<RequestResult, RequestResult>{
    return TE.tryCatch<RequestResult, RequestResult>(
      () => request(this.options),
      (e: unknown) => e as RequestResult
    )
  }
}

export default RequestBuilder