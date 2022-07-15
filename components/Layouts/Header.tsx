import Image from 'next/image'
import Link from 'next/link'

import { Logo } from '#/icons/Brand'
import { Search } from '#/icons/Misc'
import { SimpleImage } from '@/SimpleImage/SimpleImage'

import style from './header.module.scss'

export const Header: React.FC<{ user: User }> = ({ user }) => {
    return (
        <header className={style.header}>
            <div className={style.headerContainer}>
                <Link href="/">
                    <figure className={style.headerLogo}>
                        <Logo height={46} />
                        <figcaption>Knowledge</figcaption>
                    </figure>
                </Link>
                <div className={style.searchbar}>
                    <input type="text" title="Enter your query" placeholder="" />
                    <button type="submit" title="Search">
                        <Search width={24} />
                    </button>
                </div>
                <div className={style.userBlock}>
                    <Link href={'/new'}>
                        <a className={style.createBtn}>Create post</a>
                    </Link>
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
