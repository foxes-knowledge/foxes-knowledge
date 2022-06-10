import Head from 'next/head'
import { useEffect } from 'react'
import { useAppDispatch } from 'redux/hooks'
import { setSession } from 'redux/session/sessionSlice'
import { Session } from 'types/Session'

type Props = {
    title: string
    className: string
    session?: Session
    children: React.ReactNode
}

export const PageLayout: React.FC<Props> = ({ title, className, session, children }) => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        session && dispatch(setSession(session))
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <main className={className}>{children}</main>
        </>
    )
}
