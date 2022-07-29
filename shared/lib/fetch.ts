import { useSessionStore } from 'zustand/session'

export const client: FetchClient = {
    get: (url, options) => request(url, undefined, { ...options, method: 'GET' }),
    post: (url, data, options) => request(url, data, { ...options, method: 'POST' }),
    put: (url, data, options) => request(url, data, { ...options, method: 'PUT' }),
    patch: (url, data, options) => request(url, data, { ...options, method: 'PATCH' }),
    delete: (url, options) => request(url, undefined, { ...options, method: 'DELETE' }),
}

const request: Request = (url, data, options) => {
    const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...options?.headers,
    }

    if (!headers.Authorization) {
        const { type, value } = useSessionStore.getState().token
        headers.Authorization = `${type} ${value}`
    }

    return fetch(constructUrl(url, options?.local), {
        method: options!.method,
        headers,
        body: !!data ? JSON.stringify(data) : undefined,
    }).then(async res => {
        const json = await res.json()
        if (!res.ok) throw json
        return json
    })
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL!
const constructUrl = (url: string, isLocal = false): string | never => {
    const beginsWithSlash = url.charAt(0) === '/'

    if (isLocal && !beginsWithSlash) {
        throw Error('URL should start with "/" if "local" set to "true"')
    }

    if (!isLocal) {
        return beginsWithSlash ? baseUrl + url : url
    }

    return url
}

type Options = Partial<{
    /**
     * The HTTP method to use for the request.
     * Defaults to `'GET'`.
     */
    readonly method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

    /**
     * Request headers to send with the request.
     * @default
     * 'Content-Type': 'application/json',
     *  Accept: 'application/json',
     *  Authorization: '' // inherited from useSessionStore unless defined
     */
    readonly headers: ClientHeaders

    /**
     * Whether to send request to the local server.
     * Note: URL must begin with `/` if set to true.
     * @default false
     */
    readonly local: boolean
}>

type ClientHeaders = Partial<{
    'Content-Type': string
    Accept: string
    Authorization: string
}>

type Request = <T>(
    url: string,
    data?: object,
    options?: Options
) => Promise<T & { message: string }>

type DatalessRequest = <T>(url: string, options?: Options) => Promise<T & { message: string }>

interface FetchClient {
    get: DatalessRequest
    post: Request
    put: Request
    patch: Request
    delete: DatalessRequest
}
