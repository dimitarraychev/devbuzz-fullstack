export type Post = {
  title: string;
  category: string;
  description: string;
  image: string;
  owner: Owner;
  likes: string[];
  lowercaseTitle: string[];
  timestamp: string;
};

type Owner = {
  _id: string;
  name: string;
};
