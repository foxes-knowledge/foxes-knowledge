import { useEffect, useState } from 'react'

import { Heart, HeartBroken, HeartBrokenFilled, HeartFilled } from '#/icons/Misc'
import { countBy } from '#/lib/countBy'
import { client } from '#/lib/fetch'
import { useSessionStore } from 'zustand/session'

import { PostReaction } from './PostReaction'

import style from './postReactions.module.scss'

type Props = {
    pid: number
    reactions: Reaction[]
}

export const PostReactions: React.FC<Props> = ({ pid, reactions }) => {
    const userId = useSessionStore(state => state.user.id)
    const [reacted, setReacted] = useState<'upvote' | 'downvote'>()

    useEffect(
        () => setReacted(reactions.find(reaction => reaction.user_id === userId)?.type),
        [reactions, userId]
    )

    const handleReaction: React.MouseEventHandler<HTMLButtonElement> = async ({
        currentTarget,
    }) => {
        const type = currentTarget.name as ReactionType
        await client.post(`/posts/${pid}/reactions`, { type })
        setReacted(type)
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
