import { Logo } from '#/icons/Brand'
import { withSessionSsr } from '#/lib/session'
import { useToast } from '#/modules/toaster/Toaster'
import { InputSubmit } from '@/Inputs/InputSubmit'
import { LabeledInput } from '@/Inputs/LabeledInput'
import { PageLayout } from '@/Layouts/PageLayout'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import style from 'styles/pages/auth.module.scss'

const SignIn: NextPage = () => {
    const router = useRouter()
    const { promise } = useToast()
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    })
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) =>
        setCredentials({ ...credentials, [target.name]: target.value })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        promise({
            title: 'Signing in...',
            promise: fetch('/api/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            }),
            onSuccess: () => router.push('/'),
        })
    }

    return (
        <PageLayout title="Sign in" className={style.authPage} mode="inf">
            <div className={style.authBlock}>
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
            </div>
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
