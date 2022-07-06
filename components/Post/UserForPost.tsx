import React from 'react';
import type {Post} from 'types/Post'
import style from "@/Post/post.module.scss";
import Image from "next/image";
import {SimpleImage} from "@/SimpleImage/SimpleImage";

type Props = {
    post: Post
}

const UserForPost: React.FC<Props> = ({post}) => {
    return (
        <section className={style.userContent}>
            <div className={style.userBlock}>
                <picture className={style.imageContainer}>
                    {post.user.picture ? (
                        <Image
                            src={post.user.picture!}
                            alt="user_picture"
                            width={80}
                            height={25}
                        />
                    ) : (
                        <SimpleImage username={post.user.username} color={post.user.color}/>
                    )}
                </picture>
                <div className={style.userName}>
                    {post.user.username}
                </div>
            </div>
            <div className={style.bio}>
                {post.user.bio}
            </div>
        </section>
    );
};

export default UserForPost;
