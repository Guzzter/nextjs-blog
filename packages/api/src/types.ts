export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  coverImage: string;
  publishedAt: Date;
  readingTime: number;
  views: number;
  likes: number;
  breakingNews?: boolean;
};
