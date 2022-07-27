import Head from 'next/head'
import { useEffect } from 'react'

import { useTokenStore } from 'zustand/token'
import { useUserStore } from 'zustand/user'
import { Header } from './Header'

type Props = {
    title?: string
    className: string
    session?: Session
    children: React.ReactNode
    mode?: 'cont' | 'inf'
}

export const PageLayout: React.FC<Props> = ({ title, className, session, children, mode }) => {
    const setToken = useTokenStore(state => state.setToken)
    const setUser = useUserStore(state => state.setUser)

    useEffect(() => {
        session && setUser(session.user!)
        session && setToken(session.token!)
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
