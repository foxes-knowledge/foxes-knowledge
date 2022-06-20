import Link from 'next/link'
import style from './topTagsList.module.scss'

export const TopTagsList: React.FC = () => (
    <article className={style.topTagsList}>
        <div className={style.header}>
            <h2>Top 10 Tags</h2>
            <Link href={'/tags'}>
                <a>See all</a>
            </Link>
        </div>
        <div className={style.content}>
            <Link href={'/tags/React'}>
                <a>
                    <span>#React</span>
                    <span>222</span>
                </a>
            </Link>
            <Link href={'/tags/PHP'}>
                <a>
                    <span>#PHP</span>
                    <span>220</span>
                </a>
            </Link>
        </div>
    </article>
)
