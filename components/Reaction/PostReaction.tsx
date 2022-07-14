import style from './postReaction.module.scss'

type Props = {
    Icon: React.ElementType
    count?: number
    onClick: () => void
}

export const PostReaction: React.FC<Props> = ({ Icon, count, onClick }) => (
    <div className={style.container}>
        <button className={style.button} type="button" onClick={onClick}>
            <Icon width={24} />
        </button>
        <span className={style.count}>{count}</span>
    </div>
)
