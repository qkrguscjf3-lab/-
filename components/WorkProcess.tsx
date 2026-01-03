
import React from 'react';
import { SiteConfig } from '../types';

interface Props {
  config: SiteConfig['process'];
}

const WorkProcess: React.FC<Props> = ({ config }) => {
  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24 space-y-6">
          <h2 className="text-emerald-600 font-black uppercase tracking-widest text-sm">{config.title}</h2>
          <p className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight whitespace-pre-line">{config.subtitle}</p>
        </div>
        <div className="relative">
          <div className="hidden lg:block absolute top-[4.5rem] left-0 w-full h-[1px] bg-emerald-100 z-0"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 relative z-10">
            {config.steps.map((step, idx) => (
              <div key={step.id} className="flex flex-col items-center lg:items-start space-y-8 group">
                <div className="w-20 h-20 bg-emerald-50 text-emerald-900 rounded-[2rem] flex items-center justify-center font-black text-2xl ring-[12px] ring-white shadow-xl shadow-emerald-900/5 group-hover:bg-emerald-900 group-hover:text-emerald-400 transition-all duration-500">{idx + 1}</div>
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
