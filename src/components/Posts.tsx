import { useEffect, useState } from "react"
import NewPostForm from './NewPostForm';
import Post from "./Post";
import { Post as PostType, Comment as CommentProps, PostsProps } from '../types'

export default function Posts({ isCreatingPost, setIsCreatingPost }: PostsProps) {
    const [posts, setPosts] = useState<PostType[]>([])
    const [comments, setComments] = useState<CommentProps[]>([])

    useEffect(() => {
        const FetchPosts = async () => {
            const JWT = localStorage.getItem('JWT');
            const response = await fetch('http://localhost:3000/posts/admin', {
                headers: {
                    'Authorization': `Bearer ${JWT}`
                }
            });
            const data = await response.json();
            setPosts(data)
            console.log(data)
        }

        const FetchComments = async () => {
            const JWT = localStorage.getItem('JWT');
            const response = await fetch('http://localhost:3000/comments', {
                headers: {
                    'Authorization': `Bearer ${JWT}`
                }
            })
            const data = await response.json();
            setComments(data)
            console.log(data)
        }

        FetchPosts().catch((e) => console.log(e))
        FetchComments().catch(e => console.log(e))
    }, [])

    return (
        <div>
            {posts.map((post, index) => (
                <div key={post._id} className="w-[80vw]">
                    <Post index={index} post={post} comments={comments} setComments={setComments} posts={posts} setPosts={setPosts} />
                </div>

            ))}
            {isCreatingPost && <NewPostForm setIsCreatingPost={setIsCreatingPost} setPosts={setPosts} posts={posts} />
            }
        </div>
    )
}
