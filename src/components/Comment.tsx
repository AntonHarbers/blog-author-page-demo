import { useState } from 'react';
import { Comment, CommentProps } from '../types'

export default function Comment({ comment, setComments }: CommentProps) {

    const [isEditing, setIsEditing] = useState(false);
    const [commentText, setCommentText] = useState(comment.content);

    const HandleDeleteComment = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:3000/comments/${comment._id}`, {
            method: "DELETE",
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('JWT')}`
            }
        })

        if (response.ok) {
            setComments(currentComments => currentComments.filter(c => c._id !== comment._id))
        } else {
            console.error('Failed to delete the comment')
        }
    }

    const HandleEditBtnClick = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()

        if (isEditing) {
            const response = await fetch(`http://localhost:3000/comments/${comment._id}`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('JWT')}`
                },
                body: JSON.stringify({
                    'content': commentText,
                    'authorId': comment.author._id,
                    'postId': comment.post._id,
                })
            })

            if (response.ok) {
                const updatedComment = await response.json();
                setComments(currentComments => {
                    const index = currentComments.findIndex(c => c._id === comment._id);

                    if (index !== -1) {
                        const newComments = [...currentComments]
                        newComments[index] = updatedComment
                        return newComments;
                    }
                    return currentComments;
                })
            } else {
                console.error("Failed to update the comment!")
            }
        }

        setIsEditing(!isEditing)
    }

    return (
        <div className=' bg-white pt-5 pl-5 pr-5 w-[250px] flex flex-col items-center'>
            {!isEditing
                ?
                <div className=' text-xl p-2 '>{comment.content}</div>
                :
                <input
                    type='textarea'
                    className=' text-xl bg-slate-100 hover:bg-slate-200 focus:bg-slate-200 outline-none p-2 w-[90%]'
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                />
            }
            <div className=' text-sm'>By: {comment.author.username}</div>
            <div className=' text-sm'>{new Date(comment.created_at).toLocaleString()}</div>
            <button className=' bg-green-300 transition-all active:scale-90 hover:bg-green-400 p-2 mt-2 w-[250px]' onClick={HandleEditBtnClick}>
                {isEditing ? "Update" : "Edit"}
            </button>
            <button className=' bg-red-300 transition-all active:scale-90 hover:bg-red-400 p-2 w-[250px]' onClick={HandleDeleteComment}>
                Delete
            </button>
        </div>
    )
}
