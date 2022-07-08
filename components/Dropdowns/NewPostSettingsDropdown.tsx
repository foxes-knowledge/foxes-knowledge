import { useState } from 'react'
import AsyncSelect from 'react-select/async'

import { Settings } from '#/icons/Misc'
import { IconBtn } from '@/Buttons/IconBtn'
import { TextBtn } from '@/Buttons/TextButton'

import { useAppSelector } from 'redux/hooks'
import type { Post } from 'types/Post'

import { Paginated } from 'types/Entity'
import style from './newPostSettings.module.scss'

type Props = {
    parentState: [Post | null, (post: Post) => void]
}

export const NewPostSettingsDropdown: React.FC<Props> = ({ parentState }) => {
    const [rendered, setRendered] = useState(false)
    const token = useAppSelector(state => state.session.token)

    const handleDone: React.MouseEventHandler<HTMLButtonElement> = () => setRendered(a => !a)

    const loadPosts = async (search: string) =>
        new Promise<Post[]>(async resolve => {
            const posts = (await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/posts?search=${search}`,
                {
                    headers: {
                        Authorization: `${token.type} ${token.value}`,
                    },
                }
            ).then(res => res.json())) as Paginated<Post>

            resolve(posts.data.map(post => ({ ...post, label: post.title, value: post.id })))
        })

    return (
        <div style={{ display: 'inline-block', position: 'relative' }}>
            {rendered && (
                <div className={style.dropdown}>
                    <h1 className={style.heading}>Post options</h1>
                    <div className={style.block}>
                        <label className={style.title}>Parent post</label>
                        <p className={style.content}>
                            Specify the parent post if this post is part of a series. Series are
                            shown on the Listing page and can be easily navigated within its posts.
                        </p>
                        <AsyncSelect
                            id="posts"
                            instanceId="posts"
                            aria-label="posts"
                            placeholder="Enter parent post title ..."
                            value={parentState[0]}
                            onChange={post => parentState[1](post as Post)}
                            loadOptions={loadPosts}
                        />
                    </div>
                    <TextBtn name="done" content="Done" onClick={handleDone} />
                </div>
            )}
            <IconBtn
                name="optipns"
                active={rendered}
                Icon={Settings}
                onClick={handleDone}
                title="Options"
            />
        </div>
    )
}
