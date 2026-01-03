
import React from 'react';

const steps = [
  { title: "심층 상담", desc: "단순 견적이 아닌 마케팅적 관점에서 영상의 목적과 타겟을 함께 정의합니다." },
  { title: "전략적 기획", desc: "시청자의 이목을 끌 수 있는 후킹 포인트와 핵심 메시지를 스토리보드화 합니다." },
  { title: "전문 프로덕션", desc: "시네마틱급 장비와 전문 인력을 투입하여 고퀄리티 소스를 촬영합니다." },
  { title: "정교한 포스트", desc: "브랜드 아이덴티티가 녹아든 색보정, 사운드 믹싱, 그래픽 작업을 진행합니다." },
  { title: "사후 지원", desc: "영상 납품 후 효율적인 유튜브/SNS 업로드 및 활용 방안까지 제안 드립니다." }
];

const WorkProcess: React.FC = () => {
  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24 space-y-6">
          <h2 className="text-emerald-600 font-black uppercase tracking-widest text-sm">Taskforce Method</h2>
          <p className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">실패 없는 제작을 위한<br />5단계 표준 프로세스</p>
        </div>

        <div className="relative">
          {/* Timeline bar for desktop */}
          <div className="hidden lg:block absolute top-[4.5rem] left-0 w-full h-[1px] bg-emerald-100 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center lg:items-start space-y-8 group">
                <div className="w-20 h-20 bg-emerald-50 text-emerald-900 rounded-[2rem] flex items-center justify-center font-black text-2xl ring-[12px] ring-white shadow-xl shadow-emerald-900/5 group-hover:bg-emerald-900 group-hover:text-emerald-400 transition-all duration-500">
                  {idx + 1}
                </div>
                <div className="text-center lg:text-left space-y-4">
                  <h3 className="font-black text-2xl text-slate-900">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-bold">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;
