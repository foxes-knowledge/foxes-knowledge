import { Entity } from './Entity'
import { Post } from './Post'
import { User } from './User'

export interface Comment extends Entity {
    user: User
    post: Post
    content: string
}
