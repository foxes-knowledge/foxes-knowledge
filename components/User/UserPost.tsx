import Image from 'next/image'

import { SimpleImage } from '@/SimpleImage/SimpleImage'
import type { User } from 'types/User'

import style from './userPost.module.scss'

type Props = {
    user: User
}

export const UserPost: React.FC<Props> = ({ user }) => (
    <section className={style.userContent}>
        <div className={style.userBlock}>
            <picture className={style.imageContainer}>
                {user.picture ? (
                    <Image src={user.picture!} alt="user_picture" width={80} height={25} />
                ) : (
                    <SimpleImage username={user.username} color={user.color} />
                )}
            </picture>
            <div className={style.userName}>{user.username}</div>
        </div>
        <div className={style.bio}>{user.bio}</div>
    </section>
)
