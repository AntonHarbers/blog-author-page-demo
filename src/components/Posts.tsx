import { useEffect, useState } from "react"
import NewPostForm from './NewPostForm';
import Comment from "./Comment";
import { Post, Comment as CommentProps, PostsProps } from '../types'

export default function Posts({ isCreatingPost, setIsCreatingPost }: PostsProps) {
    const [posts, setPosts] = useState<Post[]>([])
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

    const HandlePublish = (SetPublish: boolean, id: string) => {
        const JWT = localStorage.getItem('JWT')

        const UpdatePost = async () => {
            const response = await fetch(`http://localhost:3000/posts/${id}`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${JWT}`
                },
                body: JSON.stringify({ 'is_published': SetPublish }),
            })

            const data = await response.json();

            // take data and update that position in our posts array

            const newPosts = posts.map((post) => {
                if (post._id != data._id) return post
                return data
            })

            setPosts(newPosts)
        }

        UpdatePost().catch(e => console.log(e))
    }

    const HandleDeletePost = async (id: string) => {
        const JWT = localStorage.getItem('JWT')
        // send delete request to the id
        const response = await fetch(`http://localhost:3000/posts/${id}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: { 'Authorization': `Bearer ${JWT}` }
        })

        const data = await response.json();
        console.log(data)

        const newPosts = posts.filter(post => post._id !== id);
        setPosts(newPosts)

    }

    return (
        <div>
            {posts.map((post, index) => (
                <div key={index} className=" bg-blue-200 p-3 flex flex-col gap-2 items-center mt-2 w-[80%] ml-auto mr-auto">
                    <div className=" font-semibold text-xl">Title: {post.title}</div>
                    <div className=" text-lg">Post: {post.content}</div>
                    <div>Comments:</div>
                    {comments.slice().reverse().map((comment) => {
                        if (comment.post._id == post._id) {
                            return <Comment key={comment._id} comment={comment} setComments={setComments} />
                        }
                    })}
                    {post.is_published ? <button className=" p-2 bg-red-300 rounded-md" onClick={() => HandlePublish(false, post._id)}>Unpublish</button> : <button className=" p-2 bg-green-400 rounded-md" onClick={() => HandlePublish(true, post._id)}>Publish</button>}
                    <button className=" p-2 bg-red-500 rounded-md text-xl font-semibold" onClick={() => HandleDeletePost(post._id)}>Delete Post</button>
                </div>

            ))}
            {isCreatingPost && <NewPostForm setIsCreatingPost={setIsCreatingPost} setPosts={setPosts} posts={posts} />
            }
        </div>
    )
}
