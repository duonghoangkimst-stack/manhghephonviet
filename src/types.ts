export type TabType = 'trangchu' | 'vechungtoi' | 'baiviet' | 'trochoi' | 'cuahang' | 'lienhe' | 'login' | 'chitietbaiviet';

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
  images?: string[];
  likes: number;
  commentsCount: number;
  tags: string[];
  featured?: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  nfcFeatures: string[];
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Province {
  id: string;
  name: string;
  region: 'north' | 'central' | 'south';
  sitesCount: string;
  storiesCount: number;
  image: string;
  desc: string;
}

export interface HeritageSite {
  id: string;
  name: string;
  provinceId: string;
  period: string;
  category: string;
  image: string;
  description: string;
  architecturalSignificance: string;
  unlockedByDefault?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hint?: string;
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