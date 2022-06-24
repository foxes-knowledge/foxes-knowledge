import Link from 'next/link'
import emoji from 'node-emoji'
import style from './navigation.module.scss'

type Props = {
    emojiKey: string
    label: string
    to: string
}

export const NavigationItem: React.FC<Props> = ({ emojiKey, label, to }) => (
    <Link href={to}>
        <li className={style.navItem}>
            {emoji.get(emojiKey)} <span>{label}</span>
        </li>
    </Link>
)
