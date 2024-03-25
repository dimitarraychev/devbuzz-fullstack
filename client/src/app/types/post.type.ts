export type Post = {
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  owner: Owner;
  likes: string[];
  comments: PostComment[];
  createdAt: string;
  updatedAt: string;
};

export type NewPost = {
  title: string;
  category: string;
  description: string;
  image: string;
};

export type PostComment = {
  _id: string;
  message: string;
  _postId: string;
  owner: Owner;
  createdAt: string;
  updatedAt: string;
};

export type NewComment = {
  message: string;
  _postId: string;
};

type Owner = {
  _id: string;
  username: string;
};

export type PostCategory =
  | 'all'
  | 'artificial-intelligence'
  | 'blockchain'
  | 'development'
  | 'other';
