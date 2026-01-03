
import React from 'react';
import { PACKAGES } from '../constants';

const Pricing: React.FC = () => {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24 space-y-6">
          <h2 className="text-emerald-600 font-black uppercase tracking-widest text-sm">Service Packages</h2>
          <p className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">귀사의 상황에 맞는<br />유연한 파트너십</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PACKAGES.map((pkg, idx) => (
            <div key={idx} className={`relative bg-emerald-50 rounded-[3rem] p-12 border-2 transition-all duration-500 hover:-translate-y-2 ${idx === 1 ? 'border-emerald-500 bg-white shadow-2xl scale-105 z-10' : 'border-transparent shadow-sm'}`}>
              {idx === 1 && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-emerald-900 text-emerald-400 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl">
                  Most Popular
                </div>
              )}
              
              <div className="mb-10 text-center">
                <h3 className="text-2xl font-black mb-4 text-slate-900">{pkg.name}</h3>
                <p className="text-slate-500 text-sm mb-8 font-medium h-10">{pkg.description}</p>
                <div className="text-4xl font-black text-emerald-900">{pkg.price}</div>
              </div>
              
              <div className="h-px bg-emerald-200/50 mb-10"></div>
              
              <ul className="space-y-5 mb-12">
                {pkg.features.map((feat, fidx) => (
                  <li key={fidx} className="flex items-start text-sm text-slate-600 font-bold">
                    <span className="text-emerald-500 mr-3 text-lg leading-none mt-1">✓</span> {feat}
                  </li>
                ))}
              </ul>

              <a href="#contact" className={`block w-full text-center py-5 rounded-2xl font-black transition-all shadow-lg ${idx === 1 ? 'bg-emerald-900 text-white hover:bg-emerald-800 shadow-emerald-900/20' : 'bg-white text-emerald-900 border border-emerald-200 hover:bg-emerald-50'}`}>
                프로젝트 제안 받기
              </a>
            </div>
          ))}
        </div>
        <p className="mt-20 text-center text-slate-400 text-sm font-medium">
          * 모든 견적은 부가세 별도이며, 지방 촬영 시 출장비가 발생할 수 있습니다.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
