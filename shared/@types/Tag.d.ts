import { Entity } from './Entity'
import { Post } from './Post'

export interface Tag extends Entity {
    post: Post
    name: string
    color: string
}
