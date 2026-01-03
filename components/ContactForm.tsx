
import React, { useState } from 'react';
import { SiteConfig, InquiryRecord } from '../types';

interface Props {
  config: SiteConfig['contact'];
  notifications?: SiteConfig['notifications'];
  onInquiry: (data: Omit<InquiryRecord, 'id' | 'createdAt' | 'status'>) => void;
}

const ContactForm: React.FC<Props> = ({ config, notifications, onInquiry }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ 
    purpose: '', 
    type: '기업 홍보 필름', 
    date: '', 
    budget: '', 
    name: '',
    contact: '' 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onInquiry(formData);

    // Simulate sending an external email if enabled
    if (notifications?.isEnabled && notifications.receiverEmail) {
      console.log(`[Notification] Sending inquiry summary to ${notifications.receiverEmail}...`);
      // In a real app with a backend, we'd call an API here.
      // For now, we simulate success.
    }

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

  const inputClass = "w-full px-6 py-4 rounded-2xl bg-white border-2 border-slate-100 text-slate-900 font-bold outline-none focus:border-emerald-500 transition-all placeholder:text-slate-300";

  return (
    <section id="contact" className="py-32 bg-emerald-950">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-start">
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-emerald-400 font-black uppercase tracking-widest text-sm">{config.subtitle}</h2>
            <p className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter italic whitespace-pre-line">{config.title}</p>
            <p className="text-emerald-100/40 text-xl font-medium leading-relaxed max-w-lg">{config.description}</p>
          </div>
          <div className="space-y-6 pt-10 border-t border-emerald-900/50">
            <div className="flex items-center space-x-6 group">
              <span className="w-14 h-14 bg-emerald-900 rounded-2xl flex items-center justify-center text-emerald-400 font-black text-xl">☏</span>
              <div className="space-y-1"><p className="text-xs text-emerald-100/30 font-black uppercase tracking-widest">Call us</p><p className="text-emerald-100 font-black text-xl">010-0000-0000</p></div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-12 rounded-[3rem] shadow-3xl space-y-8 relative overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-emerald-900">제작 목적</label>
              <input required value={formData.purpose} onChange={e => setFormData({...formData, purpose: e.target.value})} placeholder="예: 브랜드 인지도 상승" className={inputClass} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-emerald-900">영상 유형</label>
              <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className={inputClass + " appearance-none"}>
                <option>기업 홍보 필름</option><option>인터뷰/다큐멘터리</option><option>행사/공연 스케치</option><option>실시간 중계</option><option>기타</option>
              </select>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2"><label className="text-[10px] font-black uppercase tracking-widest text-emerald-900">희망 일정</label><input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className={inputClass} /></div>
            <div className="space-y-2"><label className="text-[10px] font-black uppercase tracking-widest text-emerald-900">가용 예산</label><input required value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} placeholder="예: 500만원 내외" className={inputClass} /></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-emerald-900">성함</label>
              <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="홍길동" className={inputClass} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-emerald-900">연락처 (또는 이메일)</label>
              <input required value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} placeholder="010-0000-0000 / email@example.com" className={inputClass} />
            </div>
          </div>
          <button type="submit" className="w-full bg-emerald-900 text-white font-black py-5 rounded-2xl hover:bg-emerald-800 shadow-xl shadow-emerald-950/20 transition-all text-lg tracking-tight">전문 상담 신청하기</button>
          
          {notifications?.isEnabled && (
            <p className="text-[10px] text-center text-slate-400 font-bold uppercase">
              Notice: A summary will also be sent to {notifications.receiverEmail}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
