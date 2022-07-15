import { Heart, HeartBroken, ThreeDotsHorizontal } from '#/icons/Misc'
import { PostReaction } from './PostReaction'
import style from './postReactions.module.scss'

type Props = {
    reactions: ReactionCount
}

export const PostReactions: React.FC<Props> = ({ reactions }) => (
    <aside className={style.container}>
        <div className={style.reactions}>
            <PostReaction Icon={Heart} count={reactions.upvote} onClick={() => null} />
            <PostReaction Icon={HeartBroken} count={reactions.upvote} onClick={() => null} />
            <PostReaction Icon={ThreeDotsHorizontal} onClick={() => null} />
        </div>
    </aside>
)
