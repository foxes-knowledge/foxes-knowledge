import { User } from './User'

export type Session = {
    user?: User
    token?: Token
}

export type Token = {
    type: string
    value: string
    ttl: number
}

declare module 'iron-session' {
    interface IronSessionData {
        user: User
        token: Token
    }
}
