
import React, { useState, useEffect } from 'react';
import Logo from './Logo';

interface Props {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navbar: React.FC<Props> = ({ onNavigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: '홈', id: 'home' },
    { name: '포트폴리오', id: 'portfolio' },
    { name: '서비스', id: 'services' },
    { name: '프로세스', id: 'process' },
    { name: '문의', id: 'contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button onClick={() => onNavigate('home')} className="hover:opacity-80 transition-opacity">
          <Logo light={!isScrolled && currentPage === 'home'} />
        </button>
        
        <div className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => (
            <button 
              key={item.id} 
              onClick={() => onNavigate(item.id)}
              className={`text-sm font-semibold tracking-tight transition-colors ${
                currentPage === item.id 
                  ? 'text-emerald-800 underline underline-offset-8 decoration-2' 
                  : (!isScrolled && currentPage === 'home' ? 'text-white/80 hover:text-white' : 'text-slate-600 hover:text-emerald-800')
              }`}
            >
              {item.name}
            </button>
          ))}
          <button 
            onClick={() => onNavigate('contact')}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-md ${
              !isScrolled && currentPage === 'home'
                ? 'bg-white text-emerald-950 hover:bg-emerald-50'
                : 'bg-emerald-900 text-white hover:bg-emerald-800'
            }`}
          >
            상담 예약하기
          </button>
        </div>

        <div className="md:hidden">
            <button 
              onClick={() => onNavigate('contact')}
              className={`text-sm font-black uppercase tracking-widest ${!isScrolled && currentPage === 'home' ? 'text-white' : 'text-emerald-900'}`}
            >
              Contact
            </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
