import { useState } from 'react'

import { Heart, HeartBroken, HeartBrokenFilled, HeartFilled } from '#/icons/Misc'
import { countBy } from '#/lib/countBy'
import { useTokenStore } from 'zustand/token'
import { useUserStore } from 'zustand/user'

import { PostReaction } from './PostReaction'

import style from './postReactions.module.scss'

type Props = {
    pid: number
    reactions: Reaction[]
}

export const PostReactions: React.FC<Props> = ({ pid, reactions }) => {
    const userId = useUserStore(state => state.user.id)
    const token = useTokenStore(state => state.token)
    const [reacted, setReacted] = useState(
        reactions.find(reaction => reaction.user_id === userId)?.type
    )

    const handleReaction: React.MouseEventHandler<HTMLButtonElement> = async ({
        currentTarget,
    }) => {
        const type = currentTarget.name as ReactionType
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${pid}/reactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token.type} ${token.value}`,
            },
            body: JSON.stringify({
                type,
            }),
        })
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
