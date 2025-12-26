
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  imageUrl: string;
  category: string;
  author: string;
}

export interface NavItem {
  label: string;
  path: string;
}

export interface PageContent {
  authorName: string;
  aboutBio: string;
  missionStatement: string;
  contactEmail: string;
  authorImageUrl: string;
}

export interface Slide {
  id: string;
  imageUrl: string;
  quote: string;
  author: string;
}

export interface MediaItem {
  id: string;
  url: string;
  name: string;
  date: string;
  type: 'image' | 'video';
}
