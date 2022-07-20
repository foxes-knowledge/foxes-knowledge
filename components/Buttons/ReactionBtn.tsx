import { capitalizeFirstChar } from '#/lib/capitalizeFirstChar'
import style from './reactionBtn.module.scss'

type Props = {
    title?: string
    name: string
    Icon: React.ElementType
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

export const ReactionBtn: React.FC<Props> = props => (
    <button name={props.name} onClick={props.onClick} className={style.reactionBtn}>
        <props.Icon width={20} />
        <span>{props.title || capitalizeFirstChar(props.name)}</span>
    </button>
)
