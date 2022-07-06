import {Post} from "types/Post";
import {Tag} from "types/Tag";
import color from "#/lib/color";

import Link from "next/link";
import Image from "next/image";
import {SimpleImage} from "@/SimpleImage/SimpleImage";

import style from "@/Post/post.module.scss";

type Props = {
    post: Post
}

const PostInfo: React.FC<Props> = ({post}) => {
    const handleHover = ({style}: HTMLButtonElement, tag: Tag) => {
        style.background = color.addAlphaHex(tag.color, 0.2)
        style.border = `1px solid ${tag.color}`
    }

    const handleOutHover: React.MouseEventHandler<HTMLButtonElement> = ({currentTarget}) => {
        currentTarget.style.background = 'none'
        currentTarget.style.border = '1px solid transparent'
    }

    return (
        <>
            <section className={style.postContent}>
                <div className={style.title}>{post.title}</div>
                <div className={style.tags}>
                    {post.tags.map(tag => (
                        <Link key={tag.id} href={`/tags/${tag.id}`}>
                            <button
                                onMouseOver={({currentTarget}) => handleHover(currentTarget, tag)}
                                onMouseOut={handleOutHover}
                            >
                                <small style={{color: tag.color, fontWeight: 700, marginRight: 2}}>
                                    #
                                </small>
                                {tag.name}
                            </button>
                        </Link>
                    ))}
                </div>
                <div className={style.content}>{post.content}</div>
                <div className={style.buttonBlock}>
                    {post.parent !== null && <button>Back - {post.parent?.title}</button>}
                    {post.child !== null && <button>Next - {post.child?.title}</button>}
                </div>
                <div className={style.discussion}>Discussion
                    ({Array.isArray(post.comments) && post.comments.length})
                </div>
                <div className={style.newComment}>
                    <picture className={style.imageContainer}>
                        {post.user.picture ? (
                            <Image
                                src={post.user.picture!}
                                alt="user_picture"
                                width={35}
                                height={35}
                            />
                        ) : (
                            <SimpleImage username={post.user.username} color={post.user.color}/>
                        )}
                    </picture>
                    <textarea name="" id=""/>
                </div>
            </section>
        </>
    );
};
export default PostInfo;


