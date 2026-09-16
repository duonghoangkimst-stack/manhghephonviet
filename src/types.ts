export type TabType = 'trangchu' | 'vechungtoi' | 'baiviet' | 'trochoi' | 'cuahang' | 'lienhe' | 'login';

export interface Article {
  id: string;
  title: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    role?: string;
  };
  date: string;
  timeAgo?: string;
  views?: string;
  readTime?: string;
  excerpt: string;
  content: string;
  image: string;
  likes: number;
  commentsCount: number;
  tags: string[];
  featured?: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: 'banchay' | 'chinh' | 'phu' | 'luuniem';
  price: number;
  oldPrice?: number;
  rating: number;
  soldCount: number;
  image: string;
  shortDesc: string;
  description: string;
  nfcFeatures: string[];
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface HeritageSite {
  id: string;
  name: string;
  provinceId: string;
  subtitle: string;
  image: string;
  desc: string;
  xpReward: number;
  experienceUrl?: string;
}

export interface Province {
  id: string;
  name: string;
  region: 'north' | 'central' | 'south';
  sitesCount: number | string;
  storiesCount: number;
  image: string;
  desc: string;
  relicsCount?: number | string;
  explorationRate?: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  level: number;
  title: string;
  xp: number;
  nextXp: number;
  completedGames: number;
  discoveredStories: number;
  achievementsCount: number;
  starsCount: number;
  lotusPoints: number;
}
