import { withSessionSsr } from '#/lib/session'
import { PageLayout } from '@/Layouts/PageLayout'
import { TopTagsList } from '@/Listings/TopTagsList'
import { NavigationBar } from '@/Navigation/NavigationBar'
import { PostList } from '@/Post/PostList'
import type { NextPage } from 'next'
import style from 'styles/pages/index.module.scss'
import type { Post } from 'types/Post'
import type { Session } from 'types/Session'

type Props = {
    session: Session
    posts: Post[]
}

const Home: NextPage<Props> = ({ session, posts }) => {
    return (
        <PageLayout title="Home" session={session} className={style.homePage}>
            <div className={style.pageContainer}>
                <NavigationBar />
                <PostList posts={posts} />
                <TopTagsList />
            </div>
            {/* <button
                onClick={async () => {
                    success('Goodbye!')
                    await fetch('/api/signout', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                    })
                    router.push('/guest')
                }}
            >
                Logout
            </button> */}
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
