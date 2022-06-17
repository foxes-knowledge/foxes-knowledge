import color from '#/lib/color'
import Link from 'next/link'
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
                {/* <Image src={post.user.picture!} alt="user_picture" /> */}
                <div>
                    <strong>{post.user.name}</strong>
                    <span>date</span>
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
                        {tag.name}
                    </button>
                ))}
            </div>
            <div className={style.trackers}>
                <span>☻ reactions</span>
                <span>☻ comments</span>
                <span>☻ read</span>
            </div>
        </article>
    )
}
