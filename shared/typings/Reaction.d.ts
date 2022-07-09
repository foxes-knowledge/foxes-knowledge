import { Entity } from './Entity'
import { Post } from './Post'

export interface Reaction extends Entity {
    post?: Post
    comment?: Comment
    type: 'upvote' | 'downvote'
}

export interface ReactionCount {
    upvote: number
    downvote: number
}
