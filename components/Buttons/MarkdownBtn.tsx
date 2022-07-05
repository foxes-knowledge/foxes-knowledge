import style from './markdownBtn.module.scss'

type Props = {
    name: string
    Icon: React.ElementType
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

export const MarkdownBtn: React.FC<Props> = ({ name, Icon, onClick }) => (
    <button
        type="button"
        name={name}
        aria-label={`Markdown ${name}`}
        className={style.markdownBtn}
        onClick={onClick}
    >
        <Icon />
    </button>
)
