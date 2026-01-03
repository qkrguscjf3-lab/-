
import { PortfolioItem, SiteConfig } from './types';

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
  }
];

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  pricing: {
    title: "Service Packages",
    subtitle: "귀사의 상황에 맞는 유연한 파트너십",
    packages: [
      { id: '1', name: 'Basic', price: '50만원~', description: '심플한 인터뷰 및 1인 촬영', features: ['1인 작가 촬영', '기본 색보정', '1회 수정', 'BGM 포함'] },
      { id: '2', name: 'Standard', price: '150만원~', description: '기업 홍보 및 고퀄리티 스케치', features: ['2인 작가 촬영', '기획/구성 지원', '고급 색보정', '2회 수정', '자막 포함'] },
      { id: '3', name: 'Premium', price: '300만원~', description: '브랜드 필름 및 다목적 제작', features: ['전문 연출팀 구성', '스토리보드 기획', '시네마틱 후보정', '무제한 수정(범위 내)', '마케팅 활용 가이드'] }
    ]
  },
  process: {
    title: "Taskforce Method",
    subtitle: "실패 없는 제작을 위한 5단계 표준 프로세스",
    steps: [
      { id: '1', title: "심층 상담", desc: "단순 견적이 아닌 마케팅적 관점에서 영상의 목적과 타겟을 함께 정의합니다." },
      { id: '2', title: "전략적 기획", desc: "시청자의 이목을 끌 수 있는 후킹 포인트와 핵심 메시지를 스토리보드화 합니다." },
      { id: '3', title: "전문 프로덕션", desc: "시네마틱급 장비와 전문 인력을 투입하여 고퀄리티 소스를 촬영합니다." },
      { id: '4', title: "정교한 포스트", desc: "브랜드 아이덴티티가 녹아든 색보정, 사운드 믹싱, 그래픽 작업을 진행합니다." },
      { id: '5', title: "사후 지원", desc: "영상 납품 후 효율적인 유튜브/SNS 업로드 및 활용 방안까지 제안 드립니다." }
    ]
  },
  faq: {
    title: "자주 묻는 질문",
    items: [
      { id: '1', q: "예산이 정해지지 않았는데 상담 가능한가요?", a: "네, 가능합니다. 대략적인 제작 목적만 말씀해주시면 예산 범위별 가능한 플랜을 여러 개 제안해 드립니다." },
      { id: '2', q: "기획이 전혀 없는 상태여도 가능한가요?", a: "걱정 마세요. 기획 기반 제작자입니다. 간단한 인터뷰나 설문만으로도 영상의 콘셉트와 구성을 직접 잡아 드립니다." }
    ]
  },
  contact: {
    title: "성공적인 영상을 위한 첫 걸음.",
    subtitle: "Let's Collaborate",
    description: "기획안이 없어도 괜찮습니다. 예산이 확정되지 않았어도 괜찮습니다. 우리가 함께 고민하여 최적의 경로를 찾아드리겠습니다."
  },
  notifications: {
    receiverEmail: "admin@example.com",
    isEnabled: false
  }
};
