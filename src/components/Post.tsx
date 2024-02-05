import Comment from "./Comment";
import { Post, PostProps } from '../types'
import { useState } from "react";


export default function Post({ index, post, comments, setComments, posts, setPosts }: PostProps) {

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [titleText, setTitleText] = useState<string>(post.title);
    const [contentText, setContentText] = useState<string>(post.content);

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

    const HandleEditBtnClick = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        if (isEditing) {
            // make the api call
            console.log(titleText)
            console.log(contentText)

            const response = await fetch(`http://localhost:3000/posts/${post._id}`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('JWT')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: titleText,
                    content: contentText,
                })
            })

            // update the posts array accordingly

            if (response.ok) {
                const updatedPost = await response.json();
                setPosts(currentPosts => {
                    const index = currentPosts.findIndex(p => p._id === post._id);

                    if (index !== -1) {
                        const newPosts = [...currentPosts]
                        newPosts[index] = updatedPost
                        return newPosts;
                    }
                    return currentPosts;
                })
            } else {
                console.error("Failed to update the Post!")
            }
        }

        setIsEditing(!isEditing)

    }

    return (
        <div key={index} className=" bg-blue-200 p-3 flex flex-col gap-2 items-center mt-2 w-[80%] ml-auto mr-auto">
            {isEditing ? <input type="text" value={titleText} onChange={e => setTitleText(e.target.value)}></input> : <div className=" font-semibold text-xl">Title: {post.title}</div>}
            {isEditing ? <input type="textarea" className=" h-52 w-[100%]" value={contentText} onChange={e => setContentText(e.target.value)} /> : <div className=" text-lg">Post: {post.content}</div>
            }
            <button onClick={HandleEditBtnClick}>{isEditing ? "Update" : "Edit"}</button>
            <div>Comments:</div>
            {comments.slice().reverse().map((comment) => {
                if (comment.post._id == post._id) {
                    return <Comment key={comment._id} comment={comment} setComments={setComments} />
                }
            })}
            {post.is_published ? <button className=" p-2 bg-red-300 rounded-md" onClick={() => HandlePublish(false, post._id)}>Unpublish</button> : <button className=" p-2 bg-green-400 rounded-md" onClick={() => HandlePublish(true, post._id)}>Publish</button>}
            <button className=" p-2 bg-red-500 rounded-md text-xl font-semibold" onClick={() => HandleDeletePost(post._id)}>Delete Post</button>
        </div>
    )
}
