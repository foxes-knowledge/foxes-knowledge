import { withSessionSsr } from '#/lib/session'
import { PageLayout } from '@/Layouts/PageLayout'
import type { NextPage } from 'next'
import type { Post } from 'types/Post'
import type { Session } from 'types/Session'

type Props = {
    session: Session
    posts: Post[]
}

const Home: NextPage<Props> = ({ session, posts }) => {
    return (
        <PageLayout title="Home" session={session} className={'s'}>
            <h1>Logged as {session.user?.email} </h1>
            {posts.map(post => (
                <h3 key={post.id}>{post.title}</h3>
            ))}
            <button
                onClick={async () => {
                    await fetch('/api/signout', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                    })
                }}
            >
                Logout
            </button>
        </PageLayout>
    )
}

export const getServerSideProps = withSessionSsr(async ({ req }) => {
    if (!req.session.token) {
        return {
            redirect: {
                permanent: false,
                destination: '/guest',
            },
        }
    }

    const postsRaw = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        headers: {
            Authorization: `${req.session.token.type} ${req.session.token.value}`,
        },
    })
    const posts = (await postsRaw.json()) as Post[]

    return {
        props: {
            session: req.session,
            posts,
        },
    }
})

export default Home
