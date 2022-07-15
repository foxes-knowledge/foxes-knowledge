import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { useToast } from '#/modules/toaster/Toaster'
import { SimpleImage } from '@/SimpleImage/SimpleImage'
import style from './headerDropdown.module.scss'

type Props = {
    user: User
}

export const HeaderDropdown: React.FC<Props> = ({ user }) => {
    const [rendered, setRendered] = useState(false)
    const { success } = useToast()
    const router = useRouter()

    const switchState: React.MouseEventHandler<HTMLButtonElement> = () => setRendered(a => !a)

    const handleLogOut: React.MouseEventHandler<HTMLButtonElement> = async () => {
        success('Goodbye!')
        await fetch('/api/signout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
        router.push('/guest')
    }

    return (
        <div style={{ display: 'inline-block', position: 'relative' }}>
            {rendered && (
                <ul className={style.dropdown}>
                    <li className={style.dropdownItem}>
                        <Link href={`/u/${user.username}`}>
                            <a>
                                <strong>{user.name}</strong>
                                <br />
                                <small>@{user.username.toLocaleLowerCase()}</small>
                            </a>
                        </Link>
                    </li>
                    <li className={style.dropdownItem}>
                        <Link href={'/new'}>
                            <a>Create Post</a>
                        </Link>
                    </li>
                    <li className={style.dropdownItem}>
                        <Link href={'/account'}>
                            <a>Settings</a>
                        </Link>
                    </li>
                    <li className={style.dropdownItem}>
                        <button onClick={handleLogOut}>Sign Out</button>
                    </li>
                </ul>
            )}
            <button className={style.headerUser} onClick={switchState}>
                {user.picture ? (
                    <Image src={user.picture} alt="profile_picture" />
                ) : (
                    <SimpleImage
                        username={user.username}
                        color={user.color}
                        style={{ padding: 10 }}
                    />
                )}
            </button>
        </div>
    )
}
