import { Heart, HeartBroken, ThreeDotsHorizontal } from '#/icons/Misc'
import { countBy } from '#/lib/countBy'
import { PostReaction } from './PostReaction'
import style from './postReactions.module.scss'

type Props = {
    reactions: Reaction[]
}

export const PostReactions: React.FC<Props> = ({ reactions }) => {
    const handleReaction: React.MouseEventHandler<HTMLButtonElement> = () => {}

    return (
        <aside className={style.container}>
            <div className={style.reactions}>
                <PostReaction
                    Icon={Heart}
                    count={countBy(reactions, 'type', 'upvote')}
                    onClick={handleReaction}
                />
                <PostReaction
                    Icon={HeartBroken}
                    count={countBy(reactions, 'type', 'downvote')}
                    onClick={handleReaction}
                />
                <PostReaction Icon={ThreeDotsHorizontal} onClick={() => null} />
            </div>
        </aside>
    )
}
