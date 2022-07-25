import { useState } from 'react'

import { Heart, HeartBroken, HeartBrokenFilled, HeartFilled } from '#/icons/Misc'
import { countBy } from '#/lib/countBy'
import { useSessionStore } from 'zustand/session'

import { PostReaction } from './PostReaction'

import style from './postReactions.module.scss'

type Props = {
    reactions: Reaction[]
}

export const PostReactions: React.FC<Props> = ({ reactions }) => {
    const user = useSessionStore(state => state.user)
    const [reacted, setReacted] = useState(
        reactions.find(reaction => reaction.user_id === user.id)?.type
    )

    const handleReaction: React.MouseEventHandler<HTMLButtonElement> = ({ currentTarget }) => {
        setReacted(currentTarget.name as ReactionType)
    }

    return (
        <aside className={style.container}>
            <div className={style.reactions}>
                <PostReaction
                    name="upvote"
                    Icon={reacted === 'upvote' ? HeartFilled : Heart}
                    count={countBy(reactions, 'type', 'upvote')}
                    onClick={handleReaction}
                />
                <PostReaction
                    name="downvote"
                    Icon={reacted === 'downvote' ? HeartBrokenFilled : HeartBroken}
                    count={countBy(reactions, 'type', 'downvote')}
                    onClick={handleReaction}
                />
                {/* <PostReaction Icon={ThreeDotsHorizontal} onClick={() => null} /> */}
            </div>
        </aside>
    )
}
