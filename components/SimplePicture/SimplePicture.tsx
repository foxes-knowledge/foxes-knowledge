import invert from '#/lib/invertColor'
import classes from './simplePicture.module.scss'

type Props = {
    username: string
    color: string
    style?: React.CSSProperties
}

export const SimplePicture: React.FC<Props> = ({ username, color, style }) => (
    <picture
        style={{
            background: color,
            color: invert(color, { black: '#3a3a3a', white: '#fafafa', threshold: 0.28439059 }),
            ...style,
        }}
        className={classes.simplePicture}
    >
        <span>{username.substring(0, 2).toUpperCase()}</span>
    </picture>
)
