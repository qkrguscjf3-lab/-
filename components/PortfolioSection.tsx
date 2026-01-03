
import React, { useState } from 'react';
import { PortfolioItem, VideoCategory } from '../types';

interface Props {
  items: PortfolioItem[];
}

const categories: (VideoCategory | '전체')[] = ['전체', '기업홍보', '인터뷰', '행사·공연', '중계', '교회 콘텐츠'];

const PortfolioSection: React.FC<Props> = ({ items }) => {
  const [activeCategory, setActiveCategory] = useState<VideoCategory | '전체'>('전체');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredItems = activeCategory === '전체' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  return (
    <section className="py-32 bg-[#f1f5f9]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-10">
          <div className="space-y-6">
            <h2 className="text-emerald-600 font-black uppercase tracking-widest text-sm">Our Works</h2>
            <p className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">압도적인 퀄리티의<br />포트폴리오</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-emerald-900 text-white shadow-lg' 
                    : 'bg-white text-slate-500 border border-slate-200 hover:border-emerald-300 hover:text-emerald-800 shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {filteredItems.map((item) => (
            <div key={item.id} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-700 cursor-pointer" onClick={() => setSelectedItem(item)}>
              <div className="aspect-[16/10] overflow-hidden relative">
                <img src={item.images?.[0] || item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-emerald-950/20 group-hover:bg-transparent transition-colors duration-500"></div>
                <div className="absolute top-6 left-6 bg-emerald-900/90 backdrop-blur-md text-emerald-100 text-[10px] px-4 py-2 rounded-full uppercase font-black tracking-widest shadow-lg">
                  {item.category}
                </div>
                {(item.images?.length || 0) > 1 && (
                  <div className="absolute bottom-6 right-6 bg-white/20 backdrop-blur-md text-white text-[10px] px-3 py-1 rounded-full font-black">
                    +{item.images.length - 1} Images
                  </div>
                )}
              </div>
              <div className="p-10 space-y-8">
                <h3 className="text-3xl font-black text-slate-900 group-hover:text-emerald-800 transition-colors">{item.title}</h3>
                
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Project Mission</span>
                    <p className="text-slate-600 font-medium leading-snug line-clamp-2">{item.purpose}</p>
                  </div>
                  <div className="space-y-2 border-l-2 border-emerald-100 pl-6">
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Core Result</span>
                    <p className="text-slate-800 font-bold italic text-lg leading-snug line-clamp-1">"{item.result}"</p>
                  </div>
                </div>
                
                <button className="pt-4 flex items-center text-sm font-black text-emerald-900 hover:text-emerald-700 transition-colors space-x-2">
                  <span>상세 결과 및 갤러리 보기</span>
                  <span className="w-5 h-px bg-emerald-900 group-hover:w-10 transition-all"></span>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredItems.length === 0 && (
          <div className="py-32 text-center text-slate-400 font-bold">
            포트폴리오를 준비 중입니다.
          </div>
        )}
      </div>

      {/* Portfolio Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-emerald-950/95 z-[60] flex items-center justify-center p-6 md:p-12 overflow-y-auto" onClick={() => setSelectedItem(null)}>
          <div className="bg-white rounded-[3rem] max-w-6xl w-full overflow-hidden flex flex-col md:flex-row relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedItem(null)} className="absolute top-6 right-6 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-slate-900 font-black text-xl z-10 hover:bg-white">✕</button>
            
            <div className="md:w-3/5 bg-slate-50 overflow-y-auto p-4 md:p-8 space-y-6 max-h-[70vh] md:max-h-none">
              {(selectedItem.images || [selectedItem.thumbnail]).map((img, idx) => (
                <div key={idx} className="rounded-2xl overflow-hidden shadow-md">
                   <img src={img} alt={`Slide ${idx}`} className="w-full h-auto object-cover" />
                </div>
              ))}
            </div>

            <div className="md:w-2/5 p-10 md:p-16 flex flex-col justify-center space-y-10 overflow-y-auto">
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 px-3 py-1 bg-emerald-50 rounded-full">{selectedItem.category}</span>
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">{selectedItem.title}</h2>
              </div>

              <div className="space-y-8">
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-600">The Mission</h4>
                  <p className="text-slate-600 font-medium text-lg leading-relaxed">{selectedItem.purpose}</p>
                </div>
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Our Solution</h4>
                  <p className="text-slate-600 font-medium leading-relaxed">{selectedItem.solution}</p>
                </div>
                <div className="p-8 bg-emerald-50 rounded-[2rem] border-l-4 border-emerald-500 space-y-3">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-800">Final Result</h4>
                  <p className="text-emerald-950 font-black italic text-xl tracking-tight leading-tight">"{selectedItem.result}"</p>
                </div>
              </div>

              <div className="pt-8">
                 <button onClick={() => {
                   setSelectedItem(null);
                   window.location.hash = 'contact';
                 }} className="w-full bg-emerald-900 text-white font-black py-5 rounded-2xl hover:bg-emerald-800 transition-all shadow-xl shadow-emerald-900/10">
                   유사 프로젝트 문의하기
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;
