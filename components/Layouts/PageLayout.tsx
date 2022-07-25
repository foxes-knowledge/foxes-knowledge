import Head from 'next/head'
import { useEffect } from 'react'

import { useAppDispatch } from 'redux/hooks'
import { setSession } from 'redux/slices/sessionSlice'
import { Header } from './Header'

type Props = {
    title?: string
    className: string
    session?: Session
    children: React.ReactNode
    mode?: 'cont' | 'inf'
}

export const PageLayout: React.FC<Props> = ({ title, className, session, children, mode }) => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        session && dispatch(setSession(session!))
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <Head>
                <title>{title! + (mode === 'cont' ? ' ∣ Foxes Knowledge' : '')}</title>
            </Head>
            {mode === 'cont' && <Header user={session?.user!} />}
            <div className={className}>{children}</div>
        </>
    )
}

PageLayout.defaultProps = {
    title: 'Foxes Knowledge',
    mode: 'cont',
}
