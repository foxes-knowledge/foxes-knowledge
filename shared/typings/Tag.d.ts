import { Entity } from './Entity'
import { Post } from './Post'

export interface Tag extends Entity {
    name: string
    color: string
    posts: Post[] | number
}
