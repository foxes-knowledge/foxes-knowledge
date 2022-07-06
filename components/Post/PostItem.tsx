import dayjs from 'dayjs'
import Link from 'next/link'

import { BookOpen, Comment, Heart } from '#/icons/Misc'
import color from '#/lib/color'
import { getTextReadingTime } from '#/lib/readingTime'
import { SimpleImage } from '@/SimpleImage/SimpleImage'
import Image from 'next/image'

import type { Post } from 'types/Post'
import type { Tag } from 'types/Tag'

import style from './post.module.scss'

type Props = {
    post: Post
}

export const PostItem: React.FC<Props> = ({ post }) => {
    const handleHover = ({ style }: HTMLButtonElement, tag: Tag) => {
        style.background = color.addAlphaHex(tag.color, 0.2)
        style.border = `1px solid ${tag.color}`
    }

    const handleOutHover: React.MouseEventHandler<HTMLButtonElement> = ({ currentTarget }) => {
        currentTarget.style.background = 'none'
        currentTarget.style.border = '1px solid transparent'
    }

    return (
        <article className={style.postItem}>
            <Link href={`/u/${post.user.username}`}>
                <div className={style.authorBlock}>
                    <picture className={style.imageContainer}>
                        {post.user.picture ? (
                            <Image
                                src={post.user.picture!}
                                alt="user_picture"
                                width={32}
                                height={32}
                            />
                        ) : (
                            <SimpleImage username={post.user.username} color={post.user.color} />
                        )}
                    </picture>

                    <div>
                        <strong>{post.user.name}</strong>
                        <span>{dayjs(post.created_at).format('D MMM')}</span>
                    </div>
                </div>
            </Link>
            <h1>
                <Link href={`/p/${post.id}`}>{post.title}</Link>
            </h1>
            <div className={style.tags}>
                {post.tags.map(tag => (
                    <Link key={tag.id} href={`/tags/${tag.id}`}>
                        <button
                            onMouseOver={({ currentTarget }) => handleHover(currentTarget, tag)}
                            onMouseOut={handleOutHover}
                        >
                            <small style={{ color: tag.color, fontWeight: 700, marginRight: 2 }}>
                                #
                            </small>
                            {tag.name}
                        </button>
                    </Link>
                ))}
            </div>
            <div className={style.trackers}>
                <Link href={`/u/${post.user.username}/${post.id}`}>
                    <button>
                        <Heart width={20} /> {post.reactions as number} reactions
                    </button>
                </Link>

                <Link href={`/u/${post.user.username}/${post.id}`}>
                    <button>
                        <Comment width={20} /> {post.comments as number} comments
                    </button>
                </Link>
                <span>
                    <BookOpen width={20} /> {getTextReadingTime(post.content)} mins
                </span>
            </div>
        </article>
    )
}
