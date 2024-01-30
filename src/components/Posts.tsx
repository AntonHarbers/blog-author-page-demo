import { useEffect, useState } from "react"

interface Post {
    title: string,
    content: string,
    author: string,
    created_at: number,
    is_published: boolean,

}

export default function Posts() {
    // fetch the posts from the api and display them

    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        setPosts([{ 'title': 'Hello World', 'content': 'Hello', 'author': 'Tony', 'created_at': Date.now(), 'is_published': false }])
    }, [])

    const HandlePublish = (SetPublish: boolean, id: number) => {
        // call update post api route and pass in the is_published property
        console.log(SetPublish)
        console.log(id)
    }


    return (
        <div>
            {posts.map((post, index) => (
                <div key={index}>
                    <div>{post.title} {index}</div>
                    <div>{post.content}</div>
                    {post.is_published ? <button onClick={() => HandlePublish(false, index)}>Unpublish</button> : <button onClick={() => HandlePublish(true, index)}>Publish</button>}
                </div>

            ))}
        </div>
    )
}
