import { useEffect, useState } from "react"

interface Post {
    title: string,
    content: string,
    author: string,
    created_at: number,
}

export default function Posts() {
    // fetch the posts from the api and display them

    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        setPosts([{ 'title': 'Hello World', 'content': 'Hello', 'author': 'Tony', 'created_at': Date.now() }])
    }, [])
    return (
        <div>
            {posts.map((post, index) => (
                <div key={index}>{post.title} {index}</div>
            ))}
        </div>
    )
}
