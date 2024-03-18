export type AuthResponse = {
  message: string;
  ok: boolean;
  token: string;
  username: string;
  _id: string;
};

export type LogoutResponse = {
  message: string;
  ok: boolean;
};
