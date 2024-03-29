import { useState } from "react";
import { NewPostProps } from '../types'

export default function NewPostForm({ setIsCreatingPost, setPosts, posts }: NewPostProps) {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [publish, setPublish] = useState(false)
    const [errors, setErrors] = useState([''])

    const HandleNewPost = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()

        if (title.length < 1) {
            setErrors(['Title must not be empty'])
            return
        }
        if (content.length < 1) {
            setErrors(['Content must not be empty'])
            return
        }

        const JWT = localStorage.getItem(import.meta.env.VITE_JWT)

        const PostPost = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_PATH}posts`, {
                method: "POST",
                mode: 'cors',
                headers: {
                    'Authorization': `Bearer ${JWT}`,
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify({
                    title: title,
                    content: content,
                    is_published: publish,
                })
            })

            const data = await response.json();

            setPosts([...posts, data])
        }

        PostPost().catch(e => console.log(e))

        setIsCreatingPost(false)
    }

    return (
        <form
            className=" absolute left-[30%] w-[40%] min-w-[350px] top-[25%] bg-slate-500 flex flex-col gap-2 p-5"
        >
            <input
                className="p-2"
                type="text"
                name="title"
                placeholder="Enter post title here.."
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.currentTarget.value)}
                className="p-2"
                name="content"
                id="postContent"
                placeholder="Enter post content here.."
                cols={30}
                rows={10}
            />
            <div className="w-full flex items-center justify-center gap-5 ">
                <label
                    className=" text-white"
                    htmlFor="is_published"
                >
                    Publish
                </label>
                <input
                    type="checkbox"
                    name="is_published"
                    checked={publish}
                    onChange={e => setPublish(e.target.checked)}
                />
            </div>
            <button
                className=" p-3 bg-slate-200 rounded-sm hover:bg-slate-300 "
                onClick={HandleNewPost}
            >
                Submit
            </button>
            <div>{errors[0]}</div>
        </form>
    )
}
