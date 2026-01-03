
import React, { useState } from 'react';

const faqs = [
  { q: "예산이 정해지지 않았는데 상담 가능한가요?", a: "네, 가능합니다. 대략적인 제작 목적만 말씀해주시면 예산 범위별 가능한 플랜을 여러 개 제안해 드립니다." },
  { q: "기획이 전혀 없는 상태여도 가능한가요?", a: "걱정 마세요. 박감독은 기획 기반 제작자입니다. 간단한 인터뷰나 설문만으로도 영상의 콘셉트와 구성을 직접 잡아 드립니다." },
  { q: "수정은 몇 번까지 가능한가요?", a: "기본적으로 패키지별로 규정된 수정 횟수가 있으나, 오탈자나 단순 컷 수정 등은 기간 내 유연하게 지원해 드리고 있습니다." },
  { q: "촬영만 혹은 편집만도 가능한가요?", a: "네, 부분 작업도 가능합니다. 기존 소스를 활용한 리뉴얼 편집이나, 현장 촬영 대행만 필요하신 경우에도 별도 견적을 안내해 드립니다." }
];

const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-amber-600 font-bold uppercase tracking-widest text-sm">FAQ</h2>
          <p className="text-3xl font-serif text-slate-900">자주 묻는 질문</p>
        </div>

        <div className="space-y-4">
          {faqs.map((f, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
              <button 
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full text-left px-8 py-6 flex justify-between items-center hover:bg-slate-50 transition-colors"
              >
                <span className="font-bold text-slate-900">{f.q}</span>
                <span className={`text-2xl transition-transform ${openIdx === idx ? 'rotate-45' : ''}`}>+</span>
              </button>
              {openIdx === idx && (
                <div className="px-8 pb-6 text-slate-600 leading-relaxed border-t border-slate-50 pt-4">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
