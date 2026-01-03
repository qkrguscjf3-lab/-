
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import PortfolioSection from './components/PortfolioSection';
import TrustStats from './components/TrustStats';
import Pricing from './components/Pricing';
import WorkProcess from './components/WorkProcess';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import AdminPanel from './components/AdminPanel';
import Logo from './components/Logo';
import { INITIAL_PORTFOLIO } from './constants';
import { PortfolioItem } from './types';

const App: React.FC = () => {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(() => {
    const saved = localStorage.getItem('park_director_portfolio');
    return saved ? JSON.parse(saved) : INITIAL_PORTFOLIO;
  });
  
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    localStorage.setItem('park_director_portfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  const navigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch(currentPage) {
      case 'portfolio':
        return <PortfolioSection items={portfolio} />;
      case 'services':
        return (
          <div className="pt-20">
            <Pricing />
            <TrustStats />
          </div>
        );
      case 'process':
        return (
          <div className="pt-20">
            <WorkProcess />
            <FAQ />
          </div>
        );
      case 'contact':
        return (
          <div className="pt-20 bg-emerald-950">
            <ContactForm />
          </div>
        );
      case 'home':
      default:
        return (
          <>
            <Hero onNavigate={navigate} />
            <ProblemSolution />
            <PortfolioSection items={portfolio.slice(0, 4)} />
            <TrustStats />
            <WorkProcess />
            <ContactForm />
          </>
        );
    }
  };

  return (
    <div className="relative min-h-screen selection:bg-emerald-400 selection:text-emerald-950">
      <Navbar onNavigate={navigate} currentPage={currentPage} />
      
      <main className="transition-opacity duration-500">
        {renderContent()}
      </main>

      <footer className="bg-emerald-950 py-24 border-t border-emerald-900/50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 text-center md:text-left">
          <div className="md:col-span-2 space-y-8">
            <div className="flex justify-center md:justify-start">
               <Logo light />
            </div>
            <p className="text-emerald-100/40 text-sm font-medium leading-relaxed max-w-sm">
              PRODUCTION TASKFORCE는 10년 이상의 영상 제작 전문팀입니다. 
              우리의 목표는 단순한 납품이 아닌, 귀사의 비즈니스 성장을 돕는 것입니다.
            </p>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-white font-black uppercase tracking-widest text-xs">Quick Links</h4>
            <ul className="space-y-3 text-sm font-bold text-emerald-100/50">
              <li><button onClick={() => navigate('home')} className="hover:text-emerald-400 transition-colors">Home</button></li>
              <li><button onClick={() => navigate('portfolio')} className="hover:text-emerald-400 transition-colors">Portfolio</button></li>
              <li><button onClick={() => navigate('services')} className="hover:text-emerald-400 transition-colors">Services</button></li>
              <li><button onClick={() => navigate('contact')} className="hover:text-emerald-400 transition-colors">Contact</button></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-black uppercase tracking-widest text-xs">Management</h4>
            <div className="flex flex-col space-y-4">
               <button 
                  onClick={() => setIsAdminOpen(true)}
                  className="text-emerald-100/20 hover:text-emerald-400 text-xs italic font-bold tracking-widest transition-colors uppercase border border-emerald-100/10 py-2 rounded-lg"
              >
                  Admin Console
              </button>
              <p className="text-[10px] text-emerald-100/20 font-bold uppercase tracking-tighter">
                © 2024 Production Taskforce. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {isAdminOpen && (
        <AdminPanel 
          items={portfolio} 
          onUpdate={setPortfolio} 
          onClose={() => setIsAdminOpen(false)} 
        />
      )}
    </div>
  );
};

export default App;
