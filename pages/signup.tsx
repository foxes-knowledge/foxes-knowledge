import { Logo } from '#/icons/Brand'
import { withSessionSsr } from '#/lib/session'
import { InputSubmit } from '@/Inputs/InputSubmit'
import { LabeledInput } from '@/Inputs/LabeledInput'
import { PageLayout } from '@/Layouts/PageLayout'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import style from 'styles/pages/auth.module.scss'

const SignUp: NextPage = () => {
    const router = useRouter()
    const [credentials, setCredentials] = useState({
        username: '',
        name: '',
        email: 'preparedemail@mail.com',
        password: '',
        password_confirmation: '',
    })

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) =>
        setCredentials({ ...credentials, [target.name]: target.value })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        })
        router.push('/')
    }

    return (
        <PageLayout title="Sign up" className={style.authPage} mode="inf">
            <div className={style.authBlock}>
                <div className={style.logoBlock}>
                    <Logo />
                    <h1 className={style.logoHeading}>
                        Welcome to the <strong>Knowledge</strong>!
                    </h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <LabeledInput
                        value={credentials.username}
                        name="username"
                        onChange={handleChange}
                    />
                    <LabeledInput value={credentials.name} name="name" onChange={handleChange} />
                    <LabeledInput
                        value={credentials.email}
                        name="email"
                        disabled={true}
                        onChange={handleChange}
                    />
                    <LabeledInput
                        type="password"
                        value={credentials.password}
                        name="password"
                        onChange={handleChange}
                    />
                    <LabeledInput
                        type="password"
                        value={credentials.password_confirmation}
                        name="password_confirmation"
                        label="Confirm your password"
                        onChange={handleChange}
                    />
                    <InputSubmit label="Sign up" />
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

export default SignUp
