import { SelectableBtn } from '@/Buttons/SelectableBtn'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Post } from 'types/Post'
import style from './post.module.scss'
import { PostItem } from './PostItem'

type Props = {
    posts: Post[]
}

type Order = 'latest' | 'top'

export const PostList: React.FC<Props> = ({ posts }) => {
    const router = useRouter()
    const [order, setOrder] = useState<Order>('latest')

    const handleChange: React.MouseEventHandler<HTMLButtonElement> = ({ currentTarget }) => {
        setOrder(currentTarget.name as Order)
        router.push({
            pathname: router.pathname,
            query: { ...router.query, order: currentTarget.name },
        })
    }

    return (
        <div className={style.postList}>
            <fieldset>
                <SelectableBtn name="latest" onClick={handleChange} selected={order === 'latest'} />
                <SelectableBtn name="top" onClick={handleChange} selected={order === 'top'} />
            </fieldset>
            <main>
                {posts.map(post => (
                    <PostItem key={post.id} post={post} />
                ))}
            </main>
        </div>
    )
}
