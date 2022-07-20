import { SimpleImage } from '@/SimpleImage/SimpleImage'
import Image from 'next/image'
import { useAppSelector } from 'redux/hooks'

import style from './newComment.module.scss'

export const NewComment: React.FC = () => {
    const user = useAppSelector(state => state.session.user)

    return (
        <div className={style.newComment}>
            <picture className={style.imageContainer}>
                {user.picture ? (
                    <Image src={user.picture!} alt="user_picture" width={35} height={35} />
                ) : (
                    <SimpleImage
                        username={user.username || 'username'}
                        color={user.color || '#ffffff'}
                    />
                )}
            </picture>
            <textarea name="" id="" />
        </div>
    )
}
