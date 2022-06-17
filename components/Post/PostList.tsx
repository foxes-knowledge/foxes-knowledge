import { useState } from 'react'
import { Post } from 'types/Post'
import style from './post.module.scss'
import { PostItem } from './PostItem'

type Props = {
    posts: Post[]
}

type Order = 'latest' | 'top'

export const PostList: React.FC<Props> = ({ posts }) => {
    const [order, setOrder] = useState<Order>('latest')

    const handleChange: React.MouseEventHandler<HTMLButtonElement> = ({ currentTarget }) => {
        setOrder(currentTarget.name as Order)
    }

    return (
        <div className={style.postList}>
            <fieldset>
                <button
                    name="latest"
                    x-active={(order === 'latest').toString()}
                    onClick={handleChange}
                >
                    Latest
                </button>
                <button name="top" x-active={(order === 'top').toString()} onClick={handleChange}>
                    Top
                </button>
            </fieldset>
            <main>
                {posts.map(post => (
                    <PostItem key={post.id} post={post} />
                ))}
            </main>
        </div>
    )
}
