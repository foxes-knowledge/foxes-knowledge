import { Entity } from './Entity'
import { Post } from './Post'

export interface Attachment extends Entity {
    post: Post
    file: string
}
