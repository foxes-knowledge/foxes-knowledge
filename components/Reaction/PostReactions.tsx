import { Heart, HeartBroken, ThreeDotsHorizontal } from '#/icons/Misc'
import type { ReactionCount } from 'types/Reaction'
import { PostReaction } from './PostReaction'
import style from './postReactions.module.scss'

type Props = {
    reactions: ReactionCount
}

export const PostReactions: React.FC<Props> = ({ reactions }) => (
    <div className={style.reactions}>
        <PostReaction Icon={Heart} count={reactions.upvote} onClick={() => null} />
        <PostReaction Icon={HeartBroken} count={reactions.upvote} onClick={() => null} />
        <PostReaction Icon={ThreeDotsHorizontal} onClick={() => null} />
    </div>
)
