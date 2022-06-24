import { Entity } from './Entity'
import { Reaction } from './Reaction'
import { Tag } from './Tag'
import { User } from './User'

export interface Post extends Entity {
    user: User
    title: string
    content: string
    tags: Tag[]
    reactions: Reaction[] | number
    comments: Comment[] | number
    attachments: Attachment[] | number
    parent?: Post
    child?: Post
}
