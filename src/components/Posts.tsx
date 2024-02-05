import { useEffect, useState } from "react"
import NewPostForm from './NewPostForm';
import Post from "./Post";
import { Post as PostType, Comment as CommentProps, PostsProps } from '../types'

export default function Posts({ isCreatingPost, setIsCreatingPost }: PostsProps) {

    const [posts, setPosts] = useState<PostType[]>([])
    const [comments, setComments] = useState<CommentProps[]>([])

    useEffect(() => {
        const FetchData = async (route: string, isPosts: boolean) => {
            const JWT = localStorage.getItem('JWT');
            const response = await fetch(`http://localhost:3000/${route}`, {
                headers: {
                    'Authorization': `Bearer ${JWT}`
                }
            })
            const data = await response.json();
            isPosts ? setPosts(data) : setComments(data);
        }

        FetchData('posts/admin', true).catch(e => console.log(e));
        FetchData('comments', false).catch(e => console.log(e))
    }, [])

    return (
        <div className="ml-auto mr-auto">
            {posts.map((post, index) => (
                <div key={post._id} className="w-[80vw]">
                    <Post
                        index={index}
                        post={post}
                        comments={comments}
                        setComments={setComments}
                        posts={posts}
                        setPosts={setPosts}
                    />
                </div>

            ))}
            {isCreatingPost
                &&
                <NewPostForm
                    setIsCreatingPost={setIsCreatingPost}
                    setPosts={setPosts}
                    posts={posts}
                />
            }
        </div>
    )
}
