import React from 'react';
import type { Post } from 'types/Post'
import style from "@/Post/post.module.scss";

type Props = {
    post: Post
}

const ReactionForPost: React.FC<Props> = ({post}) => {
    return (
        <div className={style.reactionBlock}>
            REACTION
        </div>
    );
};

export default ReactionForPost;
