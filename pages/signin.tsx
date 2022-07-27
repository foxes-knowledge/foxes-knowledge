import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { InputSubmit } from '@/Inputs/InputSubmit'
import { LabeledInput } from '@/Inputs/LabeledInput'
import { PageLayout } from '@/Layouts/PageLayout'

import { Logo } from '#/icons/Brand'
import { withSessionSsr } from '#/lib/session'
import { useToast } from '#/modules/toaster/Toaster'
import { useUserStore } from 'zustand/user'

import { client } from '#/lib/fetch'
import style from 'styles/pages/auth.module.scss'

const SignIn: NextPage = () => {
    const router = useRouter()
    const { promise } = useToast()
    const setUser = useUserStore(state => state.setUser)
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    })

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) =>
        setCredentials({ ...credentials, [target.name]: target.value })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        promise({
            title: 'Signing in...',
            promise: client.post('/api/signin', credentials, { local: true }),
            onSuccess: ({ user }) => {
                setUser(user)
                router.push('/')
            },
        })
    }

    return (
        <PageLayout title="Sign in" className={style.authPage} mode="inf">
            <article className={style.authBlock}>
                <div className={style.logoBlock}>
                    <Logo />
                    <h1 className={style.logoHeading}>
                        Welcome to the <strong>Knowledge</strong>!
                    </h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <LabeledInput
                        value={credentials.email}
                        name="email"
                        onChange={handleChange}
                        required
                    />
                    <LabeledInput
                        type="password"
                        value={credentials.password}
                        name="password"
                        onChange={handleChange}
                        required
                    />
                    <InputSubmit label="Continue" />
                </form>
            </article>
        </PageLayout>
    )
}

export const getServerSideProps = withSessionSsr(({ req }) => {
    if (!!req.session.user) {
        return {
            redirect: {
                permanent: false,
                destination: '/',
            },
        }
    }

    return {
        props: {},
    }
})

export default SignIn
