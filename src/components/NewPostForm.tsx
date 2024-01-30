
export default function NewPostForm() {

    const HandleNewPost = () => {
        // make a post request to the API

        // if no error comes back then redirect home

        // else print errors accordingly
    }

    return (
        <form>
            <input type="text" name="title" placeholder="Enter post title here.." />
            <textarea name="content" id="postContent" cols={30} rows={10}></textarea>
            <label htmlFor="is_published"></label>
            <input type="checkbox" name="is_published" />
            <button onClick={HandleNewPost}>Submit</button>
        </form>
    )
}
