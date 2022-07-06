import style from './iconBtn.module.scss'

type Props = {
    name: string
    Icon: React.ElementType
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

export const IconBtn: React.FC<Props> = ({ name, Icon, onClick }) => (
    <button
        type="button"
        name={name}
        aria-label={`Icon ${name}`}
        className={style.iconBtn}
        onClick={onClick}
    >
        <Icon />
    </button>
)
