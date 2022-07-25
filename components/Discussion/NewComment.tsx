import Image from 'next/image'
import { useState } from 'react'

import { SimpleImage } from '@/SimpleImage/SimpleImage'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { useAppSelector } from 'redux/hooks'

import style from './newComment.module.scss'

export const NewComment: React.FC = () => {
    const user = useAppSelector(state => state.session.user)
    const [content, setContent] = useState('')

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault()
        console.log(content)
    }

    return (
        <form className={style.newComment} onSubmit={handleSubmit}>
            <ReactTextareaAutosize
                cacheMeasurements
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="What do you think about this post?"
                className={style.content}
                autoComplete="off"
                aria-label="Comment content"
                required
            />
            <div className={style.buttons}>
                <picture className={style.user}>
                    {user.picture ? (
                        <Image src={user.picture!} alt="user_picture" width={35} height={35} />
                    ) : (
                        <SimpleImage
                            username={user.username || 'username'}
                            color={user.color || '#ffffff'}
                        />
                    )}
                </picture>
                <input type="submit" value="Comment" className={style.submit} />
            </div>
        </form>
    )
}
