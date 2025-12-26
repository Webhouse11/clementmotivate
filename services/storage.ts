
import { BlogPost, PageContent, MediaItem } from '../types';
import { INITIAL_BLOG_POSTS, INITIAL_MEDIA } from '../constants';

const POSTS_KEY = 'clement_motivates_posts';
const PAGES_KEY = 'clement_motivates_pages';
const MEDIA_KEY = 'clement_motivates_media';

const INITIAL_PAGES: PageContent = {
  authorName: "Engr Oluranti",
  aboutBio: "Clement is a seasoned leadership consultant, faith-driven advocate, and motivational storyteller dedicated to helping individuals find their true purpose. With over a decade of experience in leading teams and nurturing organizational culture, he understands that technical skill is only half the battle—the other half is character and conviction.",
  missionStatement: "We believe that true leadership is a service, and purpose is the fuel that drives it.",
  contactEmail: "hello@clement.com",
  authorImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1974"
};

export const storage = {
  getPosts: (): BlogPost[] => {
    const stored = localStorage.getItem(POSTS_KEY);
    if (stored === null) {
      localStorage.setItem(POSTS_KEY, JSON.stringify(INITIAL_BLOG_POSTS));
      return INITIAL_BLOG_POSTS;
    }
    return JSON.parse(stored);
  },

  savePosts: (posts: BlogPost[]) => {
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  },

  getPostById: (id: string): BlogPost | undefined => {
    return storage.getPosts().find(p => p.id === id);
  },

  upsertPost: (post: BlogPost) => {
    const posts = storage.getPosts();
    const index = posts.findIndex(p => p.id === post.id);
    if (index > -1) {
      posts[index] = post;
    } else {
      posts.unshift(post);
    }
    storage.savePosts(posts);
  },

  deletePost: (id: string) => {
    const posts = storage.getPosts().filter(p => p.id !== id);
    storage.savePosts(posts);
  },

  clearAllPosts: () => {
    storage.savePosts([]);
  },

  getPageContent: (): PageContent => {
    const stored = localStorage.getItem(PAGES_KEY);
    return stored ? JSON.parse(stored) : INITIAL_PAGES;
  },

  savePageContent: (content: PageContent) => {
    localStorage.setItem(PAGES_KEY, JSON.stringify(content));
  },

  getMedia: (): MediaItem[] => {
    const stored = localStorage.getItem(MEDIA_KEY);
    if (stored === null) {
      localStorage.setItem(MEDIA_KEY, JSON.stringify(INITIAL_MEDIA));
      return INITIAL_MEDIA;
    }
    return JSON.parse(stored);
  },

  addMedia: (media: MediaItem) => {
    const current = storage.getMedia();
    current.unshift(media);
    localStorage.setItem(MEDIA_KEY, JSON.stringify(current));
  },

  deleteMedia: (id: string) => {
    const current = storage.getMedia().filter(m => m.id !== id);
    localStorage.setItem(MEDIA_KEY, JSON.stringify(current));
  }
};
