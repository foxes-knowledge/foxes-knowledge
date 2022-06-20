import dayjs from 'dayjs'
import Link from 'next/link'

import { BookOpen, Comment, Heart } from '#/icons/Misc'
import color from '#/lib/color'
import { SimpleImage } from '@/SimpleImage/SimpleImage'
import Image from 'next/image'
import { Post } from 'types/Post'
import { Tag } from 'types/Tag'
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
            <div className={style.authorBlock}>
                <picture className={style.imageContainer}>
                    {post.user.picture ? (
                        <Image src={post.user.picture!} alt="user_picture" width={32} height={32} />
                    ) : (
                        <SimpleImage username={post.user.username} color={post.user.color} />
                    )}
                </picture>

                <div>
                    <strong>{post.user.name}</strong>
                    <span>{dayjs(post.created_at).format('D MMM')}</span>
                </div>
            </div>
            <h1>
                <Link href={`/${post.user.username.toLowerCase()}/${post.id}`}>{post.title}</Link>
            </h1>
            <div className={style.tags}>
                {post.tags.map(tag => (
                    <button
                        key={tag.id}
                        onMouseOver={({ currentTarget }) => handleHover(currentTarget, tag)}
                        onMouseOut={handleOutHover}
                    >
                        <small style={{ color: tag.color, fontWeight: 700, marginRight: 2 }}>
                            #
                        </small>
                        {tag.name}
                    </button>
                ))}
            </div>
            <div className={style.trackers}>
                <button>
                    <Heart width={20} /> N reactions
                </button>
                <button>
                    <Comment width={20} /> N comments
                </button>
                <span>
                    <BookOpen width={20} /> N mins
                </span>
            </div>
        </article>
    )
}
