import dayjs from 'dayjs'
import Markdown from 'markdown-to-jsx'
import Image from 'next/image'
import Link from 'next/link'

import { Heart, HeartBroken } from '#/icons/Misc'
import { ReactionBtn } from '@/Buttons/ReactionBtn'
import { SimpleImage } from '@/SimpleImage/SimpleImage'

import style from './commentItem.module.scss'

type Props = {
    comment: Comment
}

export const CommentItem: React.FC<Props> = ({ comment }) => {
    const handleReaction: React.MouseEventHandler<HTMLButtonElement> = () => {}

    return (
        <div className={style.comment}>
            <div className={style.container}>
                <Link href={`/u/${comment.user?.username}`}>
                    <div className={style.author}>
                        <picture className={style.image}>
                            {comment.user?.picture ? (
                                <Image
                                    src={comment.user.picture}
                                    alt="user_picture"
                                    width={26}
                                    height={26}
                                />
                            ) : (
                                <SimpleImage
                                    username={comment.user?.username || 'username'}
                                    color={comment.user?.color || '#ffffff'}
                                />
                            )}
                        </picture>
                        <h3 className={style.name}>{comment.user?.name || 'Name Surname'}</h3>
                        &#183;
                        <span className={style.date}>
                            {dayjs(comment.created_at).format('D MMM')}
                        </span>
                        {!!comment.updated_at && comment.updated_at !== comment.created_at && (
                            <>
                                &#183;
                                <span className={style.name}>
                                    Edited on {dayjs(comment.updated_at).format('D MMM')}
                                </span>
                            </>
                        )}
                    </div>
                </Link>
                <Markdown className={style.content}>{comment.content}</Markdown>
            </div>
            <div className={style.reactions}>
                <ReactionBtn
                    name="upvote"
                    number={(comment.reactions as ReactionCount)?.upvote}
                    Icon={Heart}
                    onClick={handleReaction}
                />
                <ReactionBtn
                    name="downvote"
                    number={(comment.reactions as ReactionCount)?.downvote}
                    Icon={HeartBroken}
                    onClick={handleReaction}
                />
            </div>
        </div>
    )
}
