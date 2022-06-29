import Link from 'next/link'
import { useRouter } from 'next/router'
import emoji from 'node-emoji'

import style from './navigation.module.scss'

type Props = {
    emojiKey: string
    label: string
    to: string
}

export const NavigationItem: React.FC<Props> = ({ emojiKey, label, to }) => {
    const router = useRouter()

    return (
        <>
            {router.pathname === to ? (
                <li className={style.navItem} data-cy={to}>
                    {emoji.get(emojiKey)} <span>{label}</span>
                </li>
            ) : (
                <Link href={to} passHref>
                    <li className={style.navItem} data-cy={to}>
                        {emoji.get(emojiKey)} <span>{label}</span>
                    </li>
                </Link>
            )}
        </>
    )
}
