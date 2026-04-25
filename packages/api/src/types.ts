// std blog pst type (let op breakingNews prop)
export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string; // bv tech of lifestyle
  tags: string[];
  author: {
    name: string;
    avatar: string;
    bio: string; // kote bio (ff limiet checken)
  };
  coverImage: string;
  publishedAt: Date;
  readingTime: number; // in mins
  views: number;
  likes: number;
  breakingNews?: boolean;
};
