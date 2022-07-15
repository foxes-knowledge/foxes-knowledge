import { withSessionSsr } from '#/lib/session'
import { PageLayout } from '@/Layouts/PageLayout'
import { NavigationBar } from '@/Navigation/NavigationBar'

import type { NextPage } from 'next'

import { queryBuilder } from '#/lib/queryBuilder'
import { HomeAside } from '@/Asides/HomeAside'
import { PostList } from '@/Post/PostList'
import style from 'styles/pages/index.module.scss'

type Props = {
    session: Session
    posts: Paginated<Post>
    tags: Tag[]
}

const Home: NextPage<Props> = ({ session, posts, tags }) => {
    return (
        <PageLayout title="Home" session={session} className={style.homePage}>
            <div className={style.pageContainer}>
                <NavigationBar />
                <PostList posts={posts.data} />
                <HomeAside tags={tags} />
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

export const getServerSideProps = withSessionSsr(async ({ req, query }) => {
    if (!req.session.token) {
        return {
            redirect: {
                permanent: false,
                destination: '/guest',
            },
        }
    }

    const fetchOptions = {
        headers: {
            Authorization: `${req.session.token.type} ${req.session.token.value}`,
        },
    }

    const [posts, tags] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts${queryBuilder(query)}`, fetchOptions).then(
            data => data.json() as unknown as Paginated<Post>
        ),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/tags/top`, fetchOptions).then(
            data => data.json() as unknown as Tag[]
        ),
    ])

    return {
        props: {
            session: req.session,
            posts,
            tags,
        },
    }
})

export default Home
