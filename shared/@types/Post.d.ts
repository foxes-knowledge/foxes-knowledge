import { Entity } from './Entity'
import { User } from './User'

export interface Post extends Entity {
    user: User
    title: string
    content: string
    parent?: Post
    child?: Post
}
