
import React from 'react';

const TrustStats: React.FC = () => {
  const stats = [
    { label: "현장 경력", value: "10Y+" },
    { label: "성공 프로젝트", value: "500+" },
    { label: "재구매율", value: "92%" },
    { label: "협업 파트너", value: "150+" }
  ];

  return (
    <section className="py-32 bg-emerald-950 border-y border-emerald-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-32">
          {stats.map((s, idx) => (
            <div key={idx} className="text-center space-y-3">
              <div className="text-5xl md:text-7xl font-black text-emerald-400 tracking-tighter">{s.value}</div>
              <div className="text-xs text-emerald-100/40 font-black uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-10">
            <h2 className="text-emerald-400 font-black uppercase tracking-widest text-sm">Security & Trust</h2>
            <p className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tighter">당신의 소중한 예산이<br />낭비되지 않도록</p>
            <ul className="space-y-8">
              {[
                "10년 이상 현장 베테랑들의 완벽한 워크플로우",
                "기획부터 기술 지원까지 올인원 서비스 제공",
                "전문 프로덕션 보험 가입 및 안전한 자산 관리",
                "불필요한 공정을 걷어낸 합리적인 제작 단가 제안"
              ].map((text, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center mr-6 flex-shrink-0 mt-1">
                    <span className="text-emerald-950 font-black text-xs">✓</span>
                  </div>
                  <span className="text-emerald-100/70 leading-relaxed font-bold text-lg">{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative group">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative">
              <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800" alt="Video production monitor" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
              <div className="absolute inset-0 bg-emerald-900/30 group-hover:bg-transparent transition-colors"></div>
            </div>
            <div className="absolute -bottom-12 -left-12 bg-white p-10 rounded-[2.5rem] shadow-2xl max-w-sm hidden lg:block">
              <p className="text-lg font-black text-slate-900 leading-tight mb-4 tracking-tighter italic">"우리는 눈에 보이는 화려함보다<br />클라이언트의 실질적인 성과를 생각합니다."</p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-900 rounded-full"></div>
                <div>
                    <p className="font-black text-sm text-slate-900">PRODUCTION TASKFORCE</p>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Lead Director</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustStats;
