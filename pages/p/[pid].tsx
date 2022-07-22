import { withSessionSsr } from '#/lib/session'
import { PageLayout } from '@/Layouts/PageLayout'
import { PostBlock } from '@/Post/PostBlock'
import { PostReactions } from '@/Reaction/PostReactions'

import type { NextPage } from 'next'

import { PostAside } from '@/Asides/PostAside'
import style from 'styles/pages/post.module.scss'

type Props = {
    session: Session
    post: Post
}

const Post: NextPage<Props> = ({ session, post }) => {
    console.log(post)
    return (
        <PageLayout title={post.title} session={session} className={style.homePage}>
            <div className={style.pageContainer}>
                <PostReactions reactions={post.reactions as Reaction[]} />
                <PostBlock post={post} />
                <PostAside post={post} />
            </div>
        </PageLayout>
    )
}

export const getServerSideProps = withSessionSsr(async ({ req, params }) => {
    if (!req.session.token) {
        return {
            redirect: {
                permanent: false,
                destination: '/guest',
            },
        }
    }

    const post = (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${params!.pid}`, {
        headers: {
            Authorization: `${req.session.token.type} ${req.session.token.value}`,
        },
    }).then(res => res.json())) as Post

    return {
        props: {
            session: req.session,
            post,
        },
    }
})

export default Post
