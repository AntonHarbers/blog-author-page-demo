
export default function NewPostForm() {
    return (
        <form>
            <input type="text" name="title" placeholder="Enter post title here.." />
            <textarea name="content" id="postContent" cols={30} rows={10}></textarea>
            <label htmlFor="is_published"></label>
            <input type="checkbox" name="is_published" />
            <button>Submit</button>
        </form>
    )
}
