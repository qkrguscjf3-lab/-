
export type VideoCategory = '기업홍보' | '인터뷰' | '행사·공연' | '중계' | '교회 콘텐츠';

export interface PortfolioItem {
  id: string;
  title: string;
  category: VideoCategory;
  thumbnail: string;
  images: string[];
  description: string;
  purpose: string;
  solution: string;
  result: string;
  videoUrl?: string;
}

export interface Package {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
}

export interface ProcessStep {
  id: string;
  title: string;
  desc: string;
}

export interface FAQItem {
  id: string;
  q: string;
  a: string;
}

export interface SiteConfig {
  pricing: {
    title: string;
    subtitle: string;
    packages: Package[];
  };
  process: {
    title: string;
    subtitle: string;
    steps: ProcessStep[];
  };
  faq: {
    title: string;
    items: FAQItem[];
  };
  contact: {
    title: string;
    subtitle: string;
    description: string;
  };
  notifications: {
    receiverEmail: string;
    isEnabled: boolean;
  };
}

export interface InquiryRecord {
  id: string;
  purpose: string;
  type: string;
  date: string;
  budget: string;
  name: string;
  contact: string;
  createdAt: string;
  status: '신규' | '확인중' | '완료';
}
