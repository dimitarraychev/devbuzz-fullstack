export type AuthResponse = {
  ok: boolean;
  message: string;
  token: string;
  username: string;
  _id: string;
};

export type LogoutResponse = {
  ok: boolean;
  message: string;
};

export type ApiResponse = {
  ok: boolean;
  message: string;
  postId?: string;
  likes?: number;
};
