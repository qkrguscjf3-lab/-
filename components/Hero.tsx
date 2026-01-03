
import React from 'react';

const Hero: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-emerald-950">
      <div className="absolute inset-0 opacity-30">
        <img 
          src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=2070" 
          alt="Cinema production" 
          className="w-full h-full object-cover grayscale"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/70 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-3xl space-y-10">
          <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-black tracking-[0.2em] uppercase">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            <span>Premium Video Production</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-white leading-[1.1] tracking-tighter">
            메시지를<br />
            <span className="text-emerald-400 italic">가치로</span> 바꿉니다
          </h1>
          
          <p className="text-xl text-emerald-100/80 leading-relaxed font-medium max-w-xl">
            단순한 영상 제작을 넘어, 브랜드의 본질을 꿰뚫는 기획과 
            압도적인 현장 경험으로 완벽한 결과물을 보장합니다.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 pt-6">
            <button 
              onClick={() => onNavigate('portfolio')}
              className="px-10 py-5 bg-emerald-500 text-emerald-950 rounded-2xl font-black text-lg hover:bg-emerald-400 transition-all text-center shadow-xl shadow-emerald-500/20"
            >
              포트폴리오 보기
            </button>
            <button 
              onClick={() => onNavigate('services')}
              className="px-10 py-5 bg-white/10 text-white border border-white/20 rounded-2xl font-black text-lg hover:bg-white/20 transition-all text-center backdrop-blur-md"
            >
              서비스 패키지
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-12 border-t border-white/10">
            <div className="space-y-1">
              <div className="text-emerald-400 font-black text-2xl tracking-tighter">10+ Years</div>
              <div className="text-white/50 text-xs font-bold uppercase tracking-widest">Industry Expertise</div>
            </div>
            <div className="space-y-1">
              <div className="text-emerald-400 font-black text-2xl tracking-tighter">500+ Projects</div>
              <div className="text-white/50 text-xs font-bold uppercase tracking-widest">Successful Delivery</div>
            </div>
            <div className="hidden md:block space-y-1">
              <div className="text-emerald-400 font-black text-2xl tracking-tighter">Top-Tier</div>
              <div className="text-white/50 text-xs font-bold uppercase tracking-widest">Equipment & Skills</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
