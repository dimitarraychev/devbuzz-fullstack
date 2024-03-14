export type Post = {
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  owner: Owner;
  likes: string[];
  comments: string[];
  createdAt: string;
  updatedAt: string;
};

type Owner = {
  _id: string;
  username: string;
};

export type NewPost = {
  title: string;
  category: string;
  description: string;
  image: string;
};
