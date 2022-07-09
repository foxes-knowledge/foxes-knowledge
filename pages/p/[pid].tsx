import { withSessionSsr } from '#/lib/session'
import { PageLayout } from '@/Layouts/PageLayout'
import { PostBlock } from '@/Post/PostBlock'
import { PostReactions } from '@/Reaction/PostReactions'
import { UserPost } from '@/User/UserPost'

import type { NextPage } from 'next'
import type { Post } from 'types/Post'
import type { ReactionCount } from 'types/Reaction'
import type { Session } from 'types/Session'

import style from 'styles/pages/index.module.scss'

type Props = {
    session: Session
    post: Post
}

const Post: NextPage<Props> = ({ session, post }) => (
    <PageLayout title="Post" session={session} className={style.homePage}>
        <div className={style.pageContainer}>
            <PostReactions reactions={post.reactions as ReactionCount} />
            <PostBlock post={post} />
            <UserPost user={post.user} />
        </div>
    </PageLayout>
)

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
