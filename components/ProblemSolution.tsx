
import React from 'react';

const ProblemSolution: React.FC = () => {
  const problems = [
    {
      title: "알맹이 없는 기획",
      desc: "본질을 이해하지 못한 채 예쁜 그림에만 치중하는 영상은 소모품일 뿐입니다."
    },
    {
      title: "피곤한 소통 방식",
      desc: "수정 한 번에 일주일, 느린 피드백과 모호한 작업 과정은 고객의 리소스를 낭비합니다."
    },
    {
      title: "낮은 현장 이해도",
      desc: "현장 변수에 대응하지 못하는 아마추어리즘은 프로젝트 전체의 퀄리티를 저하시킵니다."
    }
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-6 max-w-2xl">
            <h2 className="text-emerald-600 font-black uppercase tracking-widest text-sm">Critical Analysis</h2>
            <p className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tighter">영상 제작의<br />본질적인 문제를 해결합니다</p>
          </div>
          <p className="text-slate-500 font-medium max-w-sm">
            우리는 단순히 영상을 '납품'하는 업체가 아닙니다. 
            귀사의 마케팅 팀원이 된 것처럼 고민하고 해결책을 제시합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 mb-24">
          {problems.map((p, idx) => (
            <div key={idx} className="group p-10 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 hover:bg-emerald-900 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-900/20">
              <div className="w-14 h-14 bg-white text-emerald-900 rounded-2xl flex items-center justify-center font-black text-2xl mb-8 group-hover:bg-emerald-400 transition-colors">
                0{idx + 1}
              </div>
              <h3 className="text-2xl font-black mb-4 group-hover:text-white transition-colors">{p.title}</h3>
              <p className="text-slate-600 leading-relaxed font-medium group-hover:text-emerald-100 transition-colors">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-emerald-950 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          </div>
          <div className="relative z-10 space-y-8">
            <h3 className="text-3xl md:text-5xl font-black leading-tight tracking-tighter">
              우리는 <span className="text-emerald-400">결과로 증명하는</span><br />
              실무 밀착형 제작 파트너입니다.
            </h3>
            <div className="w-20 h-1 bg-emerald-400 mx-auto"></div>
            <p className="text-emerald-100/60 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
              제작비 이상의 가치를 돌려드리는 것, 그것이 PRODUCTION TASKFORCE가 10년간 지켜온 철학입니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
