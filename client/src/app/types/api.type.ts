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

export type ApiPostResponse = {
  posts: Post[];
  category: PostCategory;
  search: string;
  page: number;
  totalPages: number;
};

export type ApiUserResponse = {
  user: ApiUser;
  totalPosts: number;
  page: number;
  totalPages: number;
};

export type ApiUser = {
  _id: string;
  username: string;
  email: string;
  posts: Post[];
  createdAt: string;
  updatedAt: string;
};

export type NewUser = {
  username?: string;
  email: string;
  password: string;
};
