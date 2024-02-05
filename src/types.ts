export interface Post {
  title: string;
  content: string;
  author: string;
  created_at: number;
  is_published: boolean;
  _id: string;
}

export interface Author {
  _id: string;
  email: string;
  username: string;
}

export interface Comment {
  content: string;
  author: Author;
  created_at: string;
  post: Post;
  _id: string;
}

export interface CommentProps {
  comment: Comment;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

export interface PostsProps {
  isCreatingPost: boolean;
  setIsCreatingPost: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface NewPostProps {
  setIsCreatingPost: React.Dispatch<React.SetStateAction<boolean>>;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  posts: Post[];
}

export interface LogInProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface PostProps {
  index: number;
  post: Post;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}
