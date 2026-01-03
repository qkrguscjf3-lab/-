
import { PortfolioItem, Package } from './types';

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: '1',
    title: 'A사 브랜드 필름',
    category: '기업홍보',
    thumbnail: 'https://picsum.photos/800/600?random=1',
    images: ['https://picsum.photos/800/600?random=1', 'https://picsum.photos/800/600?random=11', 'https://picsum.photos/800/600?random=12'],
    description: '기업의 비전과 가치를 담은 시네마틱 홍보 영상',
    purpose: '브랜드 이미지 쇄신 및 신규 입사자 유치',
    solution: '감성적인 인터뷰와 고퀄리티 B-roll의 조화',
    result: '유튜브 조회수 5만 회 달성 및 브랜드 선호도 상승'
  },
  {
    id: '2',
    title: '글로벌 테크 컨퍼런스',
    category: '행사·공연',
    thumbnail: 'https://picsum.photos/800/600?random=2',
    images: ['https://picsum.photos/800/600?random=2', 'https://picsum.photos/800/600?random=21'],
    description: '3일간 진행된 대규모 기술 컨퍼런스 스케치',
    purpose: '행사 기록 및 차기 행사 홍보',
    solution: '현장의 열기를 담은 다이나믹한 컷 편집',
    result: '참가자 만족도 98% 및 차기 행사 사전 등록 30% 증가'
  },
  {
    id: '3',
    title: '명사 초청 인터뷰 시리즈',
    category: '인터뷰',
    thumbnail: 'https://picsum.photos/800/600?random=3',
    images: ['https://picsum.photos/800/600?random=3', 'https://picsum.photos/800/600?random=31', 'https://picsum.photos/800/600?random=32'],
    description: '전문 지식 전달을 위한 심층 인터뷰 영상',
    purpose: '지식 공유 플랫폼 콘텐츠 제작',
    solution: '3카메라 체제와 전문 조명 세팅으로 신뢰감 극대화',
    result: '유료 회원 가입 전환율 전월 대비 15% 상승'
  }
];

export const PACKAGES: Package[] = [
  {
    name: 'Basic',
    price: '50만원~',
    description: '심플한 인터뷰 및 1인 촬영',
    features: ['1인 작가 촬영', '기본 색보정', '1회 수정', 'BGM 포함']
  },
  {
    name: 'Standard',
    price: '150만원~',
    description: '기업 홍보 및 고퀄리티 스케치',
    features: ['2인 작가 촬영', '기획/구성 지원', '고급 색보정', '2회 수정', '자막 포함']
  },
  {
    name: 'Premium',
    price: '300만원~',
    description: '브랜드 필름 및 다목적 제작',
    features: ['전문 연출팀 구성', '스토리보드 기획', '시네마틱 후보정', '무제한 수정(범위 내)', '마케팅 활용 가이드']
  }
];
