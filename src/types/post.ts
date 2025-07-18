export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  userId: number;
  createdAt?: string;
}

export interface GetPostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}
