import Markdown from 'markdown-to-jsx'

import { CommentItem } from '@/Discussion/CommentItem'
import { NewComment } from '@/Discussion/NewComment'
import { TagList } from '@/Tag/TagList'
import { UserPostItem } from '@/User/UserPostItem'
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
        <NewComment />
        {(post.comments as Comment[]).map(comment => (
            <CommentItem key={comment.id} comment={comment} />
        ))}
    </article>
)
