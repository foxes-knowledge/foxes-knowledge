import { withSessionSsr } from '#/lib/session'
import { PageLayout } from '@/Layouts/PageLayout'
import PostInfo from "@/Post/PostInfo";
import ReactionForPost from "@/Post/ReactionForPost";
import UserForPost from "@/Post/UserForPost";

import type { NextPage } from 'next'
import type { Post } from 'types/Post'
import type { Session } from 'types/Session'

import style from 'styles/pages/index.module.scss'



type Props = {
    session: Session
    post: Post
}

const Post: NextPage<Props> = ({ session, post }) => {
    return (
        <PageLayout title="Post" session={session} className={style.homePage}>
            <div className={style.pageContainer}>
                <ReactionForPost post={post} />
                <PostInfo key={post.id} post={post}/>
                <UserForPost post={post}/>
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
