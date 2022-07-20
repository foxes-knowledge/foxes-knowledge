import dayjs from 'dayjs'
import Image from 'next/image'

import { Heart, HeartBroken } from '#/icons/Misc'
import { ReactionBtn } from '@/Buttons/ReactionBtn'
import { SimpleImage } from '@/SimpleImage/SimpleImage'
import Markdown from 'markdown-to-jsx'
import style from './commentItem.module.scss'

type Props = {
    comment: Comment
}

export const CommentItem: React.FC<Props> = ({ comment }) => {
    const handleReaction: React.MouseEventHandler<HTMLButtonElement> = () => {}

    return (
        <div className={style.comment}>
            <div className={style.container}>
                <div className={style.author}>
                    <picture className={style.imageContainer}>
                        {comment.user?.picture ? (
                            <Image
                                src={comment.user.picture}
                                alt="user_picture"
                                width={32}
                                height={32}
                            />
                        ) : (
                            <SimpleImage
                                username={comment.user?.username || 'username'}
                                color={comment.user?.color || '#ffffff'}
                            />
                        )}
                    </picture>
                    <h3>{comment.user?.name || 'Name Surname'}</h3>
                    &#9865;
                    <span>{dayjs(comment.created_at).format('D MMM')}</span>
                    {!!comment.updated_at && (
                        <>
                            &#9865;
                            <span>Edited on {dayjs(comment.updated_at).format('D MMM')}</span>
                        </>
                    )}
                </div>
                <Markdown className={style.content}>{comment.content}</Markdown>
            </div>
            <div className={style.reactions}>
                <ReactionBtn name="upvote" Icon={Heart} onClick={handleReaction} />
                <ReactionBtn name="downvote" Icon={HeartBroken} onClick={handleReaction} />
            </div>
        </div>
    )
}
