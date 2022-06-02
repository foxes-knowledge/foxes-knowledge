import { getCookie } from 'cookies-next'
import type { GetServerSideProps, NextPage } from 'next'
import { useState } from 'react'
import { decrement, increment, incrementByAmount, selectCount } from 'redux/counter/counterSlice'
import { useAppDispatch, useAppSelector } from 'redux/hooks'

const Home: NextPage<{ user: { username: string } }> = ({ user }) => {
    const dispatch = useAppDispatch()
    const count = useAppSelector(selectCount)
    const [incrementAmount, setIncrementAmount] = useState<number>(0)

    return (
        <>
            <h1 style={{ fontFamily: 'Exo' }}>Logged as {user.username} </h1>
            <h2 style={{ fontFamily: 'Exo2' }}>The current number is {count}</h2>
            <div>
                <input
                    value={incrementAmount}
                    onChange={e => setIncrementAmount(Number(e.target.value))}
                    type="number"
                />
                <button onClick={() => dispatch(incrementByAmount(Number(incrementAmount)))}>
                    Increment by amount
                </button>
            </div>
            <div>
                <button onClick={() => dispatch(decrement())}>Decrement by 1</button>
                <button onClick={() => dispatch(increment())}>Increment by 1</button>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async context => {
    const user = getCookie('user', context)
    if (!user)
        return {
            redirect: {
                permanent: false,
                destination: '/guest',
            },
        }

    return {
        props: { user: JSON.parse(user as string) },
    }
}

export default Home
