
import React, { useState, useRef } from 'react';
import { PortfolioItem, VideoCategory } from '../types';

interface Props {
  items: PortfolioItem[];
  onUpdate: (items: PortfolioItem[]) => void;
  onClose: () => void;
}

const AdminPanel: React.FC<Props> = ({ items, onUpdate, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [editingItem, setEditingItem] = useState<Partial<PortfolioItem> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1111') {
      setIsAuthenticated(true);
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newImages: string[] = [];
    const readAsDataURL = (file: File): Promise<string> => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    };

    for (let i = 0; i < files.length; i++) {
      const dataUrl = await readAsDataURL(files[i]);
      newImages.push(dataUrl);
    }

    setEditingItem(prev => {
      const currentImages = prev?.images || [];
      const updatedImages = [...currentImages, ...newImages];
      return { 
        ...prev, 
        images: updatedImages,
        thumbnail: updatedImages[0] || '' 
      };
    });
  };

  const removeImage = (index: number) => {
    setEditingItem(prev => {
      if (!prev?.images) return prev;
      const updatedImages = prev.images.filter((_, i) => i !== index);
      return {
        ...prev,
        images: updatedImages,
        thumbnail: updatedImages[0] || ''
      };
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    // Ensure images array exists
    const finalItem: PortfolioItem = {
      ...editingItem,
      id: editingItem.id || Date.now().toString(),
      images: editingItem.images || [],
      thumbnail: editingItem.images?.[0] || editingItem.thumbnail || '',
    } as PortfolioItem;

    let updatedItems;
    if (editingItem.id) {
      updatedItems = items.map(it => it.id === editingItem.id ? finalItem : it);
    } else {
      updatedItems = [...items, finalItem];
    }
    onUpdate(updatedItems);
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      onUpdate(items.filter(it => it.id !== id));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-emerald-950/90 z-[100] flex items-center justify-center p-6 backdrop-blur-md">
        <div className="bg-white p-10 rounded-[2.5rem] max-w-sm w-full space-y-8 shadow-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-black text-emerald-900 tracking-tighter italic">Admin Login</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-emerald-900 transition-colors">✕</button>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <input 
              type="password" 
              placeholder="비밀번호" 
              className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 bg-white text-slate-900 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 transition-all font-bold" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <button className="w-full bg-emerald-900 text-white py-4 rounded-2xl font-black shadow-lg shadow-emerald-900/20 hover:bg-emerald-800 transition-all">접속하기</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-50 z-[100] flex flex-col p-6 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col space-y-6 overflow-hidden">
        <header className="flex justify-between items-end border-b border-slate-200 pb-6">
          <div>
            <h2 className="text-3xl font-black text-emerald-950 tracking-tighter uppercase italic">Console</h2>
            <p className="text-sm font-bold text-slate-400">포트폴리오 및 콘텐츠 관리 시스템</p>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => setEditingItem({ category: '기업홍보', images: [] })} className="bg-emerald-900 text-white px-8 py-3 rounded-xl font-black text-sm shadow-lg shadow-emerald-900/10 hover:bg-emerald-800 transition-all">
              + 신규 추가
            </button>
            <button onClick={onClose} className="px-6 py-3 border-2 border-slate-200 text-slate-500 rounded-xl font-bold hover:bg-white transition-all text-sm">대시보드 닫기</button>
          </div>
        </header>

        <div className="flex-grow flex gap-8 overflow-hidden">
          <div className="w-2/5 bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-y-auto p-8 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-6">Portfolio List ({items.length})</h3>
            {items.map(it => (
              <div key={it.id} className="group flex items-center justify-between p-5 border-2 border-slate-50 rounded-2xl hover:border-emerald-100 hover:bg-emerald-50/30 transition-all">
                <div className="flex items-center space-x-5">
                  <div className="w-20 h-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                    <img src={it.images?.[0] || it.thumbnail} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 leading-none mb-2">{it.title}</h4>
                    <span className="inline-block text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded uppercase tracking-tighter">{it.category}</span>
                  </div>
                </div>
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setEditingItem(it)} className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  </button>
                  <button onClick={() => handleDelete(it.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="w-3/5 bg-white rounded-[2.5rem] shadow-sm border border-slate-200 p-10 overflow-y-auto relative">
            {editingItem ? (
              <form onSubmit={handleSave} className="space-y-8">
                <div className="flex justify-between items-center border-b border-slate-100 pb-6 mb-4">
                   <h3 className="text-2xl font-black text-emerald-900 tracking-tighter italic">{editingItem.id ? 'Edit Work' : 'New Project'}</h3>
                   <button type="button" onClick={() => setEditingItem(null)} className="text-slate-400 hover:text-emerald-900 font-bold text-sm">작성 취소</button>
                </div>
                
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-emerald-600">제목</label>
                    <input 
                      required 
                      placeholder="프로젝트명을 입력하세요"
                      value={editingItem.title || ''} 
                      onChange={(e) => setEditingItem({...editingItem, title: e.target.value})} 
                      className="w-full px-5 py-4 rounded-2xl bg-white border-2 border-slate-100 text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all font-bold" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-emerald-600">카테고리</label>
                    <select 
                      value={editingItem.category || '기업홍보'} 
                      onChange={(e) => setEditingItem({...editingItem, category: e.target.value as VideoCategory})} 
                      className="w-full px-5 py-4 rounded-2xl bg-white border-2 border-slate-100 text-slate-900 outline-none focus:border-emerald-500 transition-all font-bold appearance-none"
                    >
                      <option>기업홍보</option>
                      <option>인터뷰</option>
                      <option>행사·공연</option>
                      <option>중계</option>
                      <option>교회 콘텐츠</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-emerald-600">이미지 라이브러리 (첫 번째 이미지가 메인입니다)</label>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                      {(editingItem.images || []).map((img, idx) => (
                        <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 group">
                          <img src={img} className="w-full h-full object-cover" alt="" />
                          <button 
                            type="button" 
                            onClick={() => removeImage(idx)}
                            className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                          >
                            ✕
                          </button>
                          {idx === 0 && (
                            <div className="absolute bottom-0 left-0 right-0 bg-emerald-900/80 text-white text-[8px] font-black uppercase py-1 text-center">MAIN</div>
                          )}
                        </div>
                      ))}
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="aspect-video bg-emerald-50 border-2 border-dashed border-emerald-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-100 transition-all"
                      >
                        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                        <span className="text-[8px] font-black text-emerald-600 uppercase mt-1">Add Images</span>
                      </div>
                    </div>
                    <input 
                      type="file" 
                      multiple
                      ref={fileInputRef}
                      onChange={handleFileChange} 
                      className="hidden" 
                      accept="image/*"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                   <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-emerald-600">프로젝트 목적 (Mission)</label>
                    <input 
                      required 
                      placeholder="예: 브랜드 인지도 상승 및 톤앤매너 쇄신"
                      value={editingItem.purpose || ''} 
                      onChange={(e) => setEditingItem({...editingItem, purpose: e.target.value})} 
                      className="w-full px-5 py-4 rounded-2xl bg-white border-2 border-slate-100 text-slate-900 outline-none focus:border-emerald-500 transition-all font-bold" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-emerald-600">해결 포인트 (Solution)</label>
                    <input 
                      required 
                      placeholder="예: 시네마틱 룩 구성 및 감성적 인터뷰 연출"
                      value={editingItem.solution || ''} 
                      onChange={(e) => setEditingItem({...editingItem, solution: e.target.value})} 
                      className="w-full px-5 py-4 rounded-2xl bg-white border-2 border-slate-100 text-slate-900 outline-none focus:border-emerald-500 transition-all font-bold" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-emerald-600">핵심 결과/반응 (Core Result)</label>
                  <textarea 
                    required 
                    placeholder="예: 유튜브 조회수 10만 돌파 및 문의율 전월 대비 20% 상승"
                    value={editingItem.result || ''} 
                    onChange={(e) => setEditingItem({...editingItem, result: e.target.value})} 
                    className="w-full px-5 py-4 rounded-2xl bg-white border-2 border-slate-100 text-slate-900 outline-none focus:border-emerald-500 transition-all font-bold h-32 resize-none" 
                  />
                </div>

                <div className="pt-6">
                  <button type="submit" className="w-full bg-emerald-950 text-emerald-400 font-black py-5 rounded-2xl shadow-xl shadow-emerald-900/10 hover:bg-emerald-900 hover:text-white transition-all text-lg uppercase tracking-tighter">
                    {editingItem.id ? 'Save Changes' : 'Publish Project'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-200">
                <div className="w-24 h-24 border-4 border-dashed border-slate-100 rounded-full flex items-center justify-center mb-6">
                   <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </div>
                <p className="font-black uppercase tracking-[0.2em] text-xs">Waiting for selection</p>
                <p className="text-[10px] mt-2 font-bold text-slate-400">좌측 리스트에서 수정할 항목을 선택하거나 신규 추가 버튼을 누르세요.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
