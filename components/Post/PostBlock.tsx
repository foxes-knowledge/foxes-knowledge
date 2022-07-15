import { SimpleImage } from '@/SimpleImage/SimpleImage'
import { TagList } from '@/Tag/TagList'
import { UserPostItem } from '@/User/UserPostItem'
import Markdown from 'markdown-to-jsx'
import Image from 'next/image'
import style from './postBlock.module.scss'

type Props = {
    post: Post
}

export const PostBlock: React.FC<Props> = ({ post }) => (
    <article className={style.post}>
        <UserPostItem user={post.user} postDate={post.created_at} />

        <h1 className={style.title}>{post.title}</h1>

        <TagList tags={post.tags} />

        <Markdown className={style.content}>{post.content}</Markdown>

        <div className={style.buttonBlock}>
            {post.parent && <button>Back - {post.parent.title}</button>}
            {post.child && <button>Next - {post.child.title}</button>}
        </div>

        <h2 className={style.discussion}>Discussion ({(post.comments as Comment[]).length})</h2>
        <div className={style.newComment}>
            <picture className={style.imageContainer}>
                {post.user.picture ? (
                    <Image src={post.user.picture!} alt="user_picture" width={35} height={35} />
                ) : (
                    <SimpleImage username={post.user.username} color={post.user.color} />
                )}
            </picture>
            <textarea name="" id="" />
        </div>
    </article>
)
