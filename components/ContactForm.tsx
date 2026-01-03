
import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="contact" className="py-32 bg-emerald-950 text-white min-h-[60vh] flex items-center">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <div className="w-24 h-24 bg-emerald-400 rounded-[2rem] flex items-center justify-center mx-auto text-emerald-950 text-5xl font-black">✓</div>
          <h2 className="text-4xl font-black tracking-tighter italic">상담 신청이 완료되었습니다.</h2>
          <p className="text-emerald-100/60 font-medium text-lg">기획 담당자가 내용을 검토한 후 영업일 기준 4시간 이내에 연락드리겠습니다.</p>
          <button onClick={() => setSubmitted(false)} className="text-emerald-400 font-black uppercase tracking-widest text-sm underline hover:text-emerald-300">New Inquiry</button>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-32 bg-emerald-950">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-start">
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-emerald-400 font-black uppercase tracking-widest text-sm">Let's Collaborate</h2>
            <p className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter italic">성공적인 영상을 위한<br />첫 걸음.</p>
            <p className="text-emerald-100/40 text-xl font-medium leading-relaxed max-w-lg">
              기획안이 없어도 괜찮습니다. 예산이 확정되지 않았어도 괜찮습니다. 
              우리가 함께 고민하여 최적의 경로를 찾아드리겠습니다.
            </p>
          </div>
          
          <div className="space-y-6 pt-10 border-t border-emerald-900/50">
            <div className="flex items-center space-x-6 group">
              <span className="w-14 h-14 bg-emerald-900 rounded-2xl flex items-center justify-center text-emerald-400 group-hover:bg-emerald-400 group-hover:text-emerald-900 transition-all font-black text-xl">☏</span>
              <div className="space-y-1">
                <p className="text-xs text-emerald-100/30 font-black uppercase tracking-widest">Call us</p>
                <p className="text-emerald-100 font-black text-xl">010-0000-0000</p>
              </div>
            </div>
            <div className="flex items-center space-x-6 group">
              <span className="w-14 h-14 bg-emerald-900 rounded-2xl flex items-center justify-center text-emerald-400 group-hover:bg-emerald-400 group-hover:text-emerald-900 transition-all font-black text-xl">✉</span>
              <div className="space-y-1">
                <p className="text-xs text-emerald-100/30 font-black uppercase tracking-widest">Email us</p>
                <p className="text-emerald-100 font-black text-xl">taskforce@production.com</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-12 rounded-[3rem] shadow-3xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-emerald-900">제작 목적</label>
              <input 
                required 
                placeholder="예: 브랜드 인지도 상승" 
                className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-slate-100 text-slate-900 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-bold placeholder:text-slate-300" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-emerald-900">영상 유형</label>
              <select className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-slate-100 text-slate-900 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-bold appearance-none cursor-pointer">
                <option>기업 홍보 필름</option>
                <option>인터뷰/다큐멘터리</option>
                <option>행사/공연 스케치</option>
                <option>실시간 중계</option>
                <option>기타</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-emerald-900">희망 일정</label>
              <input 
                type="date" 
                className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-slate-100 text-slate-900 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none font-bold" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-emerald-900">가용 예산</label>
              <input 
                placeholder="예: 500만원 내외" 
                className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-slate-100 text-slate-900 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none font-bold placeholder:text-slate-300" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-emerald-900">연락처 및 성함</label>
            <input 
              required 
              placeholder="성함과 연락처(혹은 이메일)를 입력해주세요." 
              className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-slate-100 text-slate-900 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none font-bold placeholder:text-slate-300" 
            />
          </div>

          <button type="submit" className="w-full bg-emerald-900 text-white font-black py-5 rounded-2xl hover:bg-emerald-800 shadow-xl shadow-emerald-950/20 transition-all text-lg tracking-tight">
            전문 상담 신청하기
          </button>
          
          <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
            문의하신 내용은 담당자 외에 제3자에게 제공되지 않으며,<br />프로젝트 종료 시 안전하게 파기됩니다.
          </p>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
