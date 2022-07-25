declare interface Reaction extends Entity {
    post?: Post
    comment?: Comment
    type: 'upvote' | 'downvote'
}

declare interface ReactionCount {
    upvote: number
    downvote: number
}
