import { Entity } from './Entity'

export interface User extends Entity {
    username: string
    name?: string
    email: string
    isEmailPublic: boolean
    picture?: string
    bio?: string
    color: string
}
