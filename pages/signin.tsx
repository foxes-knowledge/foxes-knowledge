import { setCookies } from 'cookies-next'
import type { NextPage } from 'next'
import { useState } from 'react'
import style from 'styles/index.module.scss'

const SignIn: NextPage = () => {
    const [username, setUsername] = useState<string>()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setCookies('user', { username })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                className={style.number}
                value={username}
                onChange={({ target }) => setUsername(target.value)}
            />
            <input type="submit" value="Log in" />
        </form>
    )
}

export default SignIn
