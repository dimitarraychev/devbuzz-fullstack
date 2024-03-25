import { Post, PostCategory, PostComment } from './post.type';

export type AuthResponse = {
  ok: boolean;
  message: string;
  token?: string;
  user: AuthUser;
};

export type AuthUser = {
  _id: string;
  username: string;
  email: string;
};

export type LogoutResponse = {
  ok: boolean;
  message: string;
};

export type ApiResponse = {
  ok: boolean;
  message: string;
  _id?: string;
  likes?: number;
  comments?: PostComment[];
};

export type PaginationResponse = {
  posts: Post[];
  page: number;
  category: PostCategory;
  totalPages: number;
};
