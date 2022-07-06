import { useState } from 'react'
import style from './tooltip.module.scss'

type Props = {
    content: string
    delay?: number
    position?: 'top' | 'right' | 'bottom' | 'left'
    children: React.ReactNode
}

export const Tooltip: React.FC<Props> = ({ children, content, delay, position }) => {
    let timeout: NodeJS.Timeout
    const [active, setActive] = useState(false)

    const showTip = () => {
        timeout = setTimeout(() => {
            setActive(true)
        }, delay)
    }

    const hideTip = () => {
        clearInterval(timeout)
        setActive(false)
    }

    return (
        <div className={style.container} onMouseEnter={showTip} onMouseLeave={hideTip}>
            {children}
            {active && (
                <div className={style.tooltip} data-position={position}>
                    {content}
                </div>
            )}
        </div>
    )
}

Tooltip.defaultProps = {
    delay: 400,
    position: 'bottom',
}
