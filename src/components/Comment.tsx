import { useState } from 'react';
import { Comment, CommentProps } from '../types'

export default function Comment({ comment, setComments }: CommentProps) {

    const [isEditing, setIsEditing] = useState(false);
    const [commentText, setCommentText] = useState(comment.content);

    const HandleDeleteComment = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        console.log(comment._id)


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
            // send update request
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
                console.log(updatedComment)
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
        <div>
            {!isEditing ? <div>{comment.content}</div> : <input type='textarea' value={commentText} onChange={e => setCommentText(e.target.value)}></input>}

            <div>By: {comment.author.username}</div>
            <div>{new Date(comment.created_at).toLocaleString()}</div>
            <button onClick={HandleEditBtnClick}>{isEditing ? "Update" : "Edit"}</button>
            <button onClick={HandleDeleteComment}>Delete</button>
        </div>
    )
}
