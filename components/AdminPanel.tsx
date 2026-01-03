
import React, { useState, useRef } from 'react';
import { PortfolioItem, VideoCategory, SiteConfig, InquiryRecord, Package, ProcessStep, FAQItem } from '../types';

interface Props {
  portfolio: PortfolioItem[];
  siteConfig: SiteConfig;
  inquiries: InquiryRecord[];
  onUpdatePortfolio: (items: PortfolioItem[]) => void;
  onUpdateSiteConfig: (config: SiteConfig) => void;
  onUpdateInquiries: (inquiries: InquiryRecord[]) => void;
  onClose: () => void;
}

type AdminTab = 'works' | 'content' | 'inquiries';

const AdminPanel: React.FC<Props> = ({ portfolio, siteConfig, inquiries, onUpdatePortfolio, onUpdateSiteConfig, onUpdateInquiries, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('works');
  
  const [editingWork, setEditingWork] = useState<Partial<PortfolioItem> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const inputBaseClass = "w-full px-5 py-3 rounded-xl bg-white border-2 border-slate-200 text-slate-900 font-bold outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1111') setIsAuthenticated(true);
    else alert('비밀번호가 틀렸습니다.');
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const newImages: string[] = [];
    const readAsDataURL = (file: File): Promise<string> => new Promise((res) => {
      const r = new FileReader(); r.onloadend = () => res(r.result as string); r.readAsDataURL(file);
    });
    for (let i = 0; i < files.length; i++) newImages.push(await readAsDataURL(files[i]));
    setEditingWork(prev => {
      const imgs = [...(prev?.images || []), ...newImages];
      return { ...prev, images: imgs, thumbnail: imgs[0] || '' };
    });
  };

  const saveWork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingWork) return;
    const item = { ...editingWork, id: editingWork.id || Date.now().toString(), images: editingWork.images || [] } as PortfolioItem;
    onUpdatePortfolio(editingWork.id ? portfolio.map(p => p.id === editingWork.id ? item : p) : [...portfolio, item]);
    setEditingWork(null);
  };

  const deleteInquiry = (id: string) => {
    if (confirm('이 문의 내역을 삭제하시겠습니까?')) {
      onUpdateInquiries(inquiries.filter(i => i.id !== id));
    }
  };

  // --- 콘텐츠 삭제/추가 핵심 로직 (정밀 업데이트) ---

  const addPricingPackage = () => {
    const newPkg: Package = { 
      id: `pkg-${Date.now()}`, 
      name: '신규 서비스', 
      price: '0원~', 
      description: '서비스 설명을 입력하세요', 
      features: ['핵심 기능 1'] 
    };
    const newConfig = { ...siteConfig };
    newConfig.pricing = { 
      ...siteConfig.pricing, 
      packages: [...siteConfig.pricing.packages, newPkg] 
    };
    onUpdateSiteConfig(newConfig);
  };

  const deletePricingPackage = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('이 서비스를 삭제하시겠습니까?')) {
      const newConfig = { ...siteConfig };
      newConfig.pricing = { 
        ...siteConfig.pricing, 
        packages: siteConfig.pricing.packages.filter(p => p.id !== id) 
      };
      onUpdateSiteConfig(newConfig);
    }
  };

  const addProcessStep = () => {
    const newStep: ProcessStep = { 
      id: `step-${Date.now()}`, 
      title: '신규 단계', 
      desc: '단계 설명을 입력하세요' 
    };
    const newConfig = { ...siteConfig };
    newConfig.process = { 
      ...siteConfig.process, 
      steps: [...siteConfig.process.steps, newStep] 
    };
    onUpdateSiteConfig(newConfig);
  };

  const deleteProcessStep = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('이 단계를 삭제하시겠습니까?')) {
      const newConfig = { ...siteConfig };
      newConfig.process = { 
        ...siteConfig.process, 
        steps: siteConfig.process.steps.filter(s => s.id !== id) 
      };
      onUpdateSiteConfig(newConfig);
    }
  };

  const addFAQ = () => {
    const newFAQ: FAQItem = { 
      id: `faq-${Date.now()}`, 
      q: '신규 질문', 
      a: '답변 내용을 입력하세요' 
    };
    const newConfig = { ...siteConfig };
    newConfig.faq = { 
      ...siteConfig.faq, 
      items: [...siteConfig.faq.items, newFAQ] 
    };
    onUpdateSiteConfig(newConfig);
  };

  const deleteFAQ = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('이 FAQ를 삭제하시겠습니까?')) {
      const newConfig = { ...siteConfig };
      newConfig.faq = { 
        ...siteConfig.faq, 
        items: siteConfig.faq.items.filter(f => f.id !== id) 
      };
      onUpdateSiteConfig(newConfig);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-emerald-950/90 z-[100] flex items-center justify-center p-6 backdrop-blur-md">
        <div className="bg-white p-10 rounded-[2.5rem] max-w-sm w-full space-y-8 shadow-2xl">
          <h2 className="text-2xl font-black text-emerald-900 italic">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-5">
            <input type="password" placeholder="비밀번호 (1111)" className={inputBaseClass} value={password} onChange={(e) => setPassword(e.target.value)} autoFocus />
            <button type="submit" className="w-full bg-emerald-900 text-white py-4 rounded-2xl font-black">접속</button>
          </form>
          <button onClick={onClose} className="w-full text-slate-400 text-sm font-bold">닫기</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-50 z-[100] flex flex-col p-6 overflow-hidden text-slate-900">
      <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col space-y-6 overflow-hidden">
        <header className="flex justify-between items-end border-b border-slate-200 pb-6">
          <div className="flex items-center space-x-8">
            <div>
              <h2 className="text-2xl font-black text-emerald-950 tracking-tighter uppercase italic leading-none">Console</h2>
              <p className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-widest">Management System</p>
            </div>
            <nav className="flex space-x-1 bg-slate-200/50 p-1 rounded-xl">
              {(['works', 'content', 'inquiries'] as AdminTab[]).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-500 hover:text-emerald-700'}`}>
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          <button onClick={onClose} className="px-6 py-2 bg-white border-2 border-slate-200 text-slate-500 rounded-xl font-black hover:border-emerald-500 hover:text-emerald-900 transition-all text-xs uppercase tracking-widest">Exit</button>
        </header>

        <div className="flex-grow overflow-hidden bg-white rounded-[2.5rem] shadow-sm border border-slate-200 flex">
          {activeTab === 'works' && (
            <div className="w-full flex">
              <div className="w-1/3 border-r border-slate-100 p-8 overflow-y-auto bg-slate-50/50">
                <button onClick={() => setEditingWork({ images: [] })} className="w-full bg-emerald-50 text-emerald-900 font-black py-4 rounded-xl border-2 border-dashed border-emerald-200 mb-6 hover:bg-emerald-100 transition-colors">+ New Work</button>
                <div className="space-y-3">
                  {portfolio.map(p => (
                    <div key={p.id} onClick={() => setEditingWork(p)} className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${editingWork?.id === p.id ? 'border-emerald-500 bg-white shadow-md' : 'border-slate-100 bg-white hover:border-slate-200'}`}>
                      <h4 className="font-black text-sm text-slate-900">{p.title}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{p.category}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-2/3 p-10 overflow-y-auto">
                {editingWork ? (
                  <form onSubmit={saveWork} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-emerald-600">제목</label>
                        <input required value={editingWork.title || ''} onChange={e => setEditingWork({...editingWork, title: e.target.value})} className={inputBaseClass} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-emerald-600">카테고리</label>
                        <select value={editingWork.category} onChange={e => setEditingWork({...editingWork, category: e.target.value as VideoCategory})} className={inputBaseClass}>
                          <option>기업홍보</option><option>인터뷰</option><option>행사·공연</option><option>중계</option><option>교회 콘텐츠</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-emerald-600">이미지 갤러리</label>
                      <div className="grid grid-cols-4 gap-3">
                        {(editingWork.images || []).map((img, idx) => (
                          <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-slate-200 shadow-sm">
                            <img src={img} className="w-full h-full object-cover" />
                            <button type="button" onClick={() => setEditingWork({...editingWork, images: editingWork.images?.filter((_, i) => i !== idx)})} className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full text-[10px] flex items-center justify-center shadow-lg z-10 hover:bg-red-600">✕</button>
                          </div>
                        ))}
                        <button type="button" onClick={() => fileInputRef.current?.click()} className="aspect-video bg-emerald-50 rounded-lg flex items-center justify-center border-2 border-dashed border-emerald-200 text-emerald-600 text-[10px] font-black uppercase hover:bg-emerald-100 transition-colors">Add</button>
                        <input type="file" ref={fileInputRef} multiple className="hidden" accept="image/*" onChange={handleFileChange} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-emerald-600">결과 내용</label>
                      <textarea value={editingWork.result || ''} onChange={e => setEditingWork({...editingWork, result: e.target.value})} placeholder="성공 결과 요약을 입력하세요" className={`${inputBaseClass} h-24 resize-none`} />
                    </div>
                    <button type="submit" className="w-full bg-emerald-900 text-white py-4 rounded-xl font-black shadow-lg shadow-emerald-900/20 hover:bg-emerald-800 transition-all">Save Project</button>
                    {editingWork.id && <button type="button" onClick={() => { if(confirm('프로젝트를 삭제하시겠습니까?')) {onUpdatePortfolio(portfolio.filter(p => p.id !== editingWork.id)); setEditingWork(null);} }} className="w-full text-red-500 font-bold text-xs mt-2 hover:underline">Delete Project</button>}
                  </form>
                ) : <div className="h-full flex items-center justify-center text-slate-300 font-black uppercase tracking-widest italic">Select or Create Work</div>}
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="w-full p-10 overflow-y-auto space-y-12 bg-white">
              {/* 알림 설정 */}
              <section className="space-y-6 p-8 bg-emerald-50 rounded-3xl border-2 border-emerald-100 shadow-sm">
                <h3 className="text-xl font-black text-emerald-900 uppercase italic">Email Notification Settings</h3>
                <p className="text-xs font-bold text-slate-500">문의 접수 시 실시간 알림을 받을 수신 계정을 설정합니다.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-emerald-600">수신 이메일 주소</label>
                    <input 
                      value={siteConfig.notifications?.receiverEmail || ''} 
                      onChange={e => onUpdateSiteConfig({...siteConfig, notifications: {...(siteConfig.notifications || {isEnabled: false}), receiverEmail: e.target.value}})} 
                      className={inputBaseClass} 
                      placeholder="admin@example.com" 
                    />
                  </div>
                  <div className="flex items-end pb-2">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={siteConfig.notifications?.isEnabled} 
                        onChange={e => onUpdateSiteConfig({...siteConfig, notifications: {...(siteConfig.notifications || {receiverEmail: ''}), isEnabled: e.target.checked}})} 
                        className="w-6 h-6 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" 
                      />
                      <span className="text-sm font-black text-slate-700">이메일 알림 기능 활성화</span>
                    </label>
                  </div>
                </div>
              </section>

              {/* 서비스 관리 */}
              <section className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                   <h3 className="text-xl font-black text-emerald-900 uppercase tracking-tight italic">Services & Pricing</h3>
                   <button type="button" onClick={addPricingPackage} className="text-xs bg-emerald-900 text-white px-5 py-2.5 rounded-xl font-black shadow-lg hover:bg-emerald-800 transition-all">+ Add Service</button>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-emerald-600">Section Title</label>
                    <input value={siteConfig.pricing.title} onChange={e => onUpdateSiteConfig({...siteConfig, pricing: {...siteConfig.pricing, title: e.target.value}})} className={inputBaseClass} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-emerald-600">Section Subtitle</label>
                    <input value={siteConfig.pricing.subtitle} onChange={e => onUpdateSiteConfig({...siteConfig, pricing: {...siteConfig.pricing, subtitle: e.target.value}})} className={inputBaseClass} />
                  </div>
                </div>
                <div className="space-y-6">
                  {siteConfig.pricing.packages.map((pkg, idx) => (
                    <div key={pkg.id} className="p-8 bg-slate-50 border-2 border-slate-100 rounded-[2rem] relative group shadow-sm">
                      <button 
                        type="button"
                        onClick={(e) => deletePricingPackage(pkg.id, e)} 
                        className="absolute top-4 right-4 bg-white p-3 rounded-full text-red-500 hover:text-red-700 border-2 border-slate-100 shadow-sm transition-all z-20 flex items-center justify-center group-hover:border-red-200"
                        title="서비스 삭제"
                      >
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.3" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                      <div className="grid grid-cols-3 gap-6">
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase text-emerald-600">패키지명</label>
                          <input value={pkg.name} onChange={e => {
                            const pkgs = [...siteConfig.pricing.packages]; pkgs[idx] = { ...pkgs[idx], name: e.target.value };
                            onUpdateSiteConfig({...siteConfig, pricing: {...siteConfig.pricing, packages: pkgs}});
                          }} className={inputBaseClass} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase text-emerald-600">가격</label>
                          <input value={pkg.price} onChange={e => {
                            const pkgs = [...siteConfig.pricing.packages]; pkgs[idx] = { ...pkgs[idx], price: e.target.value };
                            onUpdateSiteConfig({...siteConfig, pricing: {...siteConfig.pricing, packages: pkgs}});
                          }} className={inputBaseClass} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase text-emerald-600">설명 요약</label>
                          <input value={pkg.description} onChange={e => {
                            const pkgs = [...siteConfig.pricing.packages]; pkgs[idx] = { ...pkgs[idx], description: e.target.value };
                            onUpdateSiteConfig({...siteConfig, pricing: {...siteConfig.pricing, packages: pkgs}});
                          }} className={inputBaseClass} />
                        </div>
                      </div>
                      <div className="mt-4 space-y-1">
                        <label className="text-[10px] font-black uppercase text-emerald-600">제공 기능 (콤마로 구분)</label>
                        <input 
                          value={pkg.features.join(', ')} 
                          onChange={e => {
                            const pkgs = [...siteConfig.pricing.packages]; 
                            pkgs[idx] = { ...pkgs[idx], features: e.target.value.split(',').map(s => s.trim()).filter(s => s !== '') };
                            onUpdateSiteConfig({...siteConfig, pricing: {...siteConfig.pricing, packages: pkgs}});
                          }} 
                          className={inputBaseClass} 
                          placeholder="작가 촬영, 고급 색보정, 자막 포함..." 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 프로세스 관리 */}
              <section className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                   <h3 className="text-xl font-black text-emerald-900 uppercase tracking-tight italic">Work Process</h3>
                   <button type="button" onClick={addProcessStep} className="text-xs bg-emerald-900 text-white px-5 py-2.5 rounded-xl font-black shadow-lg hover:bg-emerald-800 transition-all">+ Add Step</button>
                </div>
                <div className="space-y-4">
                  {siteConfig.process.steps.map((step, idx) => (
                    <div key={step.id} className="flex gap-6 p-8 bg-slate-50 border-2 border-slate-100 rounded-[2rem] relative group items-end shadow-sm">
                      <button 
                        type="button"
                        onClick={(e) => deleteProcessStep(step.id, e)} 
                        className="absolute top-4 right-4 bg-white p-3 rounded-full text-red-500 hover:text-red-700 border-2 border-slate-100 shadow-sm transition-all z-20 flex items-center justify-center group-hover:border-red-200"
                        title="단계 삭제"
                      >
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.3" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                      <div className="w-1/4 space-y-1">
                        <label className="text-[10px] font-black uppercase text-emerald-600">단계 제목</label>
                        <input value={step.title} onChange={e => {
                          const steps = [...siteConfig.process.steps]; steps[idx] = { ...steps[idx], title: e.target.value };
                          onUpdateSiteConfig({...siteConfig, process: {...siteConfig.process, steps}});
                        }} className={inputBaseClass} />
                      </div>
                      <div className="w-3/4 space-y-1">
                        <label className="text-[10px] font-black uppercase text-emerald-600">단계 설명</label>
                        <input value={step.desc} onChange={e => {
                          const steps = [...siteConfig.process.steps]; steps[idx] = { ...steps[idx], desc: e.target.value };
                          onUpdateSiteConfig({...siteConfig, process: {...siteConfig.process, steps}});
                        }} className={inputBaseClass} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQ 관리 */}
              <section className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                   <h3 className="text-xl font-black text-emerald-900 uppercase tracking-tight italic">FAQs</h3>
                   <button type="button" onClick={addFAQ} className="text-xs bg-emerald-900 text-white px-5 py-2.5 rounded-xl font-black shadow-lg hover:bg-emerald-800 transition-all">+ Add FAQ</button>
                </div>
                <div className="space-y-4">
                  {siteConfig.faq.items.map((item, idx) => (
                    <div key={item.id} className="p-8 bg-slate-50 border-2 border-slate-100 rounded-[2rem] relative group space-y-4 shadow-sm">
                      <button 
                        type="button"
                        onClick={(e) => deleteFAQ(item.id, e)} 
                        className="absolute top-4 right-4 bg-white p-3 rounded-full text-red-500 hover:text-red-700 border-2 border-slate-100 shadow-sm transition-all z-20 flex items-center justify-center group-hover:border-red-200"
                        title="FAQ 삭제"
                      >
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.3" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-emerald-600">질문 (Question)</label>
                        <input value={item.q} onChange={e => {
                          const faqs = [...siteConfig.faq.items]; faqs[idx] = { ...faqs[idx], q: e.target.value };
                          onUpdateSiteConfig({...siteConfig, faq: {...siteConfig.faq, items: faqs}});
                        }} className={inputBaseClass} placeholder="질문을 입력하세요" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-emerald-600">답변 (Answer)</label>
                        <textarea value={item.a} onChange={e => {
                          const faqs = [...siteConfig.faq.items]; faqs[idx] = { ...faqs[idx], a: e.target.value };
                          onUpdateSiteConfig({...siteConfig, faq: {...siteConfig.faq, items: faqs}});
                        }} className={`${inputBaseClass} h-24 resize-none`} placeholder="상세 답변을 입력하세요" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'inquiries' && (
            <div className="w-full p-10 overflow-y-auto bg-white">
              <div className="flex justify-between items-center mb-10 border-b border-slate-100 pb-4">
                <h3 className="text-2xl font-black text-emerald-950 tracking-tighter uppercase italic leading-none">Inquiry Board</h3>
                <span className="text-xs font-black bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full uppercase shadow-sm">{inquiries.length} Messages</span>
              </div>
              <div className="space-y-6">
                {inquiries.length === 0 ? (
                  <div className="text-center py-20 text-slate-300 font-black italic uppercase tracking-widest">No inquiries received yet.</div>
                ) : (
                  inquiries.slice().reverse().map(item => (
                    <div key={item.id} className="p-10 bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] hover:border-emerald-200 transition-all flex justify-between items-start group shadow-sm">
                      <div className="space-y-6 w-4/5">
                        <div className="flex items-center space-x-4">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${item.status === '완료' ? 'bg-slate-200 text-slate-500' : 'bg-emerald-500 text-white'}`}>{item.status}</span>
                          <span className="text-xs font-bold text-slate-400">{new Date(item.createdAt).toLocaleString('ko-KR')}</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8">
                          <div><p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1.5">성함</p><p className="font-black text-xl text-slate-900 leading-none">{item.name}</p></div>
                          <div><p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1.5">연락처/이메일</p><p className="font-bold text-slate-700 break-all leading-snug">{item.contact}</p></div>
                          <div className="col-span-2"><p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1.5">제작 목적</p><p className="font-bold text-slate-700 leading-snug">{item.purpose}</p></div>
                          <div><p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1.5">영상 유형</p><p className="font-bold text-slate-700">{item.type}</p></div>
                          <div><p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1.5">예산</p><p className="font-bold text-slate-700">{item.budget}</p></div>
                          <div className="col-span-2"><p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1.5">희망 일정</p><p className="font-bold text-slate-700">{item.date}</p></div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-3 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button 
                          type="button"
                          onClick={() => {
                           const updated = inquiries.map(i => i.id === item.id ? { ...i, status: i.status === '완료' ? '신규' : '완료' } as InquiryRecord : i);
                           onUpdateInquiries(updated);
                         }} className="text-[10px] font-black text-emerald-700 bg-white border-2 border-emerald-50 px-4 py-2.5 rounded-xl hover:bg-emerald-50 uppercase tracking-tighter shadow-sm transition-all active:scale-95">Status</button>
                         <button 
                          type="button"
                          onClick={() => deleteInquiry(item.id)} 
                          className="text-[10px] font-black text-red-500 bg-white border-2 border-red-50 px-4 py-2.5 rounded-xl hover:bg-red-50 uppercase tracking-tighter shadow-sm transition-all active:scale-95">Delete</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
