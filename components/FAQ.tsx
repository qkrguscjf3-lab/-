
import React, { useState } from 'react';
import { SiteConfig } from '../types';

interface Props {
  config: SiteConfig['faq'];
}

const FAQ: React.FC<Props> = ({ config }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32 bg-slate-50">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-emerald-600 font-black uppercase tracking-widest text-sm">FAQ</h2>
          <p className="text-3xl font-black text-slate-900 tracking-tighter">{config.title}</p>
        </div>
        <div className="space-y-4">
          {config.items.map((f, idx) => (
            <div key={f.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
              <button onClick={() => setOpenIdx(openIdx === idx ? null : idx)} className="w-full text-left px-8 py-6 flex justify-between items-center group">
                <span className="font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">{f.q}</span>
                <span className={`text-2xl transition-transform font-light ${openIdx === idx ? 'rotate-45 text-emerald-600' : 'text-slate-300'}`}>+</span>
              </button>
              {openIdx === idx && (
                <div className="px-8 pb-8 text-slate-600 leading-relaxed font-medium border-t border-slate-50 pt-6 bg-slate-50/30">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
