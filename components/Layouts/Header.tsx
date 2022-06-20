import { LogoMain } from '#/icons/Brand'
import { SimpleImage } from '@/SimpleImage/SimpleImage'
import Image from 'next/image'
import Link from 'next/link'
import { User } from 'types/User'
import style from './header.module.scss'

export const Header: React.FC<{ user: User }> = ({ user }) => {
    return (
        <header className={style.header}>
            <div className={style.headerContainer}>
                <Link href="/">
                    <figure className={style.headerLogo}>
                        <LogoMain height={46} />
                        <figcaption>Knowledge</figcaption>
                    </figure>
                </Link>
                <div className={style.searchbar}>
                    <input type="text" />
                    <button type="submit" value="s" />
                </div>
                <div className={style.userBlock}>
                    <div className={style.createBtn}>
                        <span>Create post</span>
                    </div>
                    <div className={style.headerUser}>
                        {user.picture ? (
                            <Image src={user.picture} alt="profile_picture" />
                        ) : (
                            <SimpleImage
                                username={user.username}
                                color={user.color}
                                style={{ padding: 10 }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}
