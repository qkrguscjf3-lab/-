
export type VideoCategory = '기업홍보' | '인터뷰' | '행사·공연' | '중계' | '교회 콘텐츠';

export interface PortfolioItem {
  id: string;
  title: string;
  category: VideoCategory;
  thumbnail: string; // Deprecated but kept for backward compatibility if needed, or used as images[0]
  images: string[]; // List of all images including main thumbnail
  description: string;
  purpose: string;
  solution: string;
  result: string;
  videoUrl?: string;
}

export interface Package {
  name: string;
  price: string;
  description: string;
  features: string[];
}

export interface Inquiry {
  purpose: string;
  type: string;
  date: string;
  budget: string;
  contact: string;
}
