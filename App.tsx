
import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { ServiceGrid } from './components/ServiceGrid';
import { ChatSal } from './components/ChatSal';
import { MeetSalman } from './components/MeetSalman';
import { SalesGeneration } from './components/SalesGeneration';
import { LiveDemos } from './components/LiveDemos';
import { CustomCursor } from './components/CustomCursor';
import { ServiceDetailView } from './components/ServiceDetail';
import { AuthModal } from './components/AuthModal';
import { Dashboard } from './components/Dashboard';
import { storage } from './services/storageService';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Zap, MessageSquare, Phone, User, Target, Youtube, Home, MonitorPlay, LogIn, UserPlus, LogOut } from 'lucide-react';
import { ServiceDetail, User as IUser } from './types';

const Sidebar = ({ activeTab, setActiveTab, onAuth, currentUser, setCurrentUser }: { 
  activeTab: string, 
  setActiveTab: (id: string) => void, 
  onAuth: () => void,
  currentUser: IUser | null,
  setCurrentUser: (u: IUser | null) => void
}) => {
  const [isYearHovered, setIsYearHovered] = useState(false);

  const handleLogout = () => {
    // 1. Move to home first
    setActiveTab('overview');
    // 2. Clear state and storage
    storage.setCurrentUser(null);
    setCurrentUser(null);
  };

  const tabs = [
    { id: 'overview', icon: <Home size={18} />, label: 'WELCOME' },
    { id: 'about', icon: <User size={18} />, label: 'MEET SALMAN' },
    { id: 'automation', icon: <Zap size={18} />, label: 'BUSINESS AUTOMATION' },
    { id: 'sales', icon: <Target size={18} />, label: 'SALES GENERATION' },
    { id: 'consultation', icon: <MessageSquare size={18} />, label: 'FREE CONSULTATION' },
    { id: 'demos', icon: <MonitorPlay size={18} />, label: 'LIVE DEMOS' },
    ...(currentUser ? [{ id: 'dashboard', icon: <LayoutGrid size={18} />, label: currentUser.role === 'admin' ? 'ADMIN PANEL' : 'CLIENT HUB' }] : []),
  ];

  return (
    <div className="w-20 md:w-72 h-full bg-black border-r border-white/10 flex flex-col py-10 z-50 shrink-0 overflow-y-auto custom-scrollbar">
      <div className="mb-20 flex flex-col items-center md:items-start gap-4 px-8">
        <div className="bg-white px-4 py-1.5 flex items-center justify-center text-black font-heading font-black text-3xl tracking-tighter">
          SAL.
        </div>
        <div className="hidden md:block">
          <p className="text-[10px] font-sans tracking-[0.2em] text-white uppercase font-black leading-tight">// AI SOLUTIONS EXPERT</p>
        </div>
      </div>

      <nav className="flex-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center gap-6 px-8 py-5 group relative transition-all duration-300 text-left ${
              activeTab === tab.id ? 'text-white' : 'text-white/40 hover:text-white/80'
            }`}
          >
            <span className="shrink-0">{tab.icon}</span>
            <span className="hidden md:block font-heading text-[11px] tracking-[0.2em] font-bold uppercase leading-none">{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div layoutId="activeTabIndicator" className="absolute left-0 w-1 h-full bg-white" />
            )}
          </button>
        ))}
      </nav>

      <div className="px-8 mb-10 space-y-4">
        {!currentUser ? (
          <div className="flex flex-col gap-2">
            <button 
              onClick={onAuth}
              className="w-full flex items-center gap-4 py-3 text-white/40 hover:text-white transition-all border border-white/5 hover:border-white/20 px-4 group"
            >
              <LogIn size={16} className="group-hover:scale-110 transition-transform" />
              <span className="hidden md:block text-[9px] font-heading font-black tracking-widest uppercase">LOGIN</span>
            </button>
            <button 
              onClick={onAuth}
              className="w-full flex items-center gap-4 py-4 bg-white text-black transition-all border border-white px-4 group shadow-[8px_8px_0_rgba(255,255,255,0.1)] active:scale-95 hover:translate-x-1"
            >
              <UserPlus size={16} className="text-black" />
              <span className="hidden md:block text-[10px] font-heading font-black tracking-widest uppercase">REGISTER</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4 border-t border-white/10 pt-8">
             <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setActiveTab('dashboard')}>
                <img src={currentUser.avatar} className="w-10 h-10 border border-white/20 group-hover:border-white transition-colors" alt="" />
                <div className="hidden md:block overflow-hidden">
                  <div className="text-[10px] font-heading font-black text-white uppercase truncate group-hover:underline">{currentUser.name}</div>
                  <span className="text-[8px] font-sans font-black text-white/40 uppercase">View Dashboard</span>
                </div>
             </div>
             <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-4 py-3 text-red-500/60 hover:text-red-500 transition-all border border-red-500/5 hover:border-red-500/20 px-4 group"
             >
              <LogOut size={16} />
              <span className="hidden md:block text-[9px] font-heading font-black tracking-widest uppercase">LOGOUT</span>
             </button>
          </div>
        )}
      </div>

      <div className="px-8 pt-10 border-t border-white/5 space-y-2" onMouseEnter={() => setIsYearHovered(true)} onMouseLeave={() => setIsYearHovered(false)}>
        <p className="text-[8px] font-sans tracking-[0.3em] text-white/40 uppercase font-black flex items-center gap-1 cursor-default">
          <span>EST.</span>
          <span className="relative inline-flex overflow-hidden">
            <AnimatePresence mode="wait">
              {isYearHovered ? (
                <motion.span key="2025" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} className="text-white">2025</motion.span>
              ) : (
                <motion.span key="MMXXV" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }}>MMXXV</motion.span>
              )}
            </AnimatePresence>
          </span>
        </p>
        <p className="text-[8px] font-sans tracking-[0.3em] text-white/40 uppercase font-black flex items-center gap-1 cursor-default whitespace-nowrap">
          <span>© SIMPLESALMAN</span>
          <span className="relative inline-flex overflow-hidden">
            <AnimatePresence mode="wait">
              {isYearHovered ? (
                <motion.span key="2026" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} className="text-white">2026</motion.span>
              ) : (
                <motion.span key="MMXXVI" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }}>MMXXVI</motion.span>
              )}
            </AnimatePresence>
          </span>
        </p>
      </div>
    </div>
  );
};

const HeaderHUD = () => {
  const [mstTime, setMstTime] = useState("");
  useEffect(() => {
    const updateTime = () => setMstTime(new Date().toLocaleTimeString('en-US', { timeZone: 'America/Denver', hour: 'numeric', minute: '2-digit', hour12: true }));
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <header className="h-16 px-10 flex items-center justify-between z-40 border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0">
      <div className="flex items-center gap-8">
        <span className="text-[10px] font-sans tracking-[0.2em] text-white/80 uppercase font-bold hidden md:block">
          CALL: 905-749-0266 | E-MAIL: INFO@CALLSAL.APP | BASED IN CALGARY, AB
        </span>
      </div>
      <div className="flex items-center gap-10">
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-[10px] font-sans font-bold text-white uppercase tracking-widest">{mstTime}</span>
          <span className="text-[10px] font-sans tracking-widest text-white/50 uppercase font-bold">MST</span>
        </div>
        <a href="tel:905-749-0266" className="flex items-center gap-3 px-8 py-2.5 bg-white text-black font-heading font-black text-[10px] tracking-[0.2em] transition-all hover:bg-white/90 active:scale-95 shadow-[8px_8px_0_rgba(255,255,255,0.1)]">
          <Phone size={12} /> CALL SAL
        </a>
      </div>
    </header>
  );
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentUser, setCurrentUser] = useState<IUser | null>(storage.getCurrentUser());
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [isPortfolioVisible, setIsPortfolioVisible] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleNavigation = (tabId: string) => {
    setActiveTab(tabId);
    setSelectedService(null);
    setIsPortfolioVisible(false);
    const mainContent = document.querySelector('main');
    if (mainContent) mainContent.scrollTop = 0;
  };

  const renderContent = () => {
    if (selectedService && (activeTab === 'automation' || activeTab === 'sales')) {
      return <ServiceDetailView service={selectedService} onBack={() => setSelectedService(null)} />;
    }
    switch (activeTab) {
      case 'overview': return <Hero onStart={() => handleNavigation('about')} onConsultation={() => handleNavigation('consultation')} isPortfolioVisible={isPortfolioVisible} onTogglePortfolio={setIsPortfolioVisible} />;
      case 'about': return <MeetSalman onNext={() => handleNavigation('automation')} />;
      case 'automation': return <ServiceGrid category="automation" onSelect={setSelectedService} onNext={() => handleNavigation('sales')} />;
      case 'sales': return <SalesGeneration onSelect={setSelectedService} onNext={() => handleNavigation('consultation')} />;
      case 'consultation': return <ChatSal onDemos={() => handleNavigation('demos')} />;
      case 'demos': return <LiveDemos onNext={() => handleNavigation('consultation')} />;
      case 'dashboard': return currentUser ? <Dashboard user={currentUser} /> : null;
      default: return <Hero onStart={() => handleNavigation('about')} onConsultation={() => handleNavigation('consultation')} isPortfolioVisible={isPortfolioVisible} onTogglePortfolio={setIsPortfolioVisible} />;
    }
  };

  return (
    <div className="relative h-screen w-screen flex bg-black overflow-hidden selection:bg-white selection:text-black font-heading">
      <CustomCursor />
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={handleNavigation} 
        onAuth={() => setIsAuthOpen(true)} 
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <div className="flex-1 flex flex-col relative">
        <HeaderHUD />
        <main className={`flex-1 overflow-x-hidden relative p-4 md:p-6 lg:p-8 custom-scrollbar scroll-smooth ${activeTab === 'overview' && !isPortfolioVisible ? 'overflow-hidden' : 'overflow-y-auto'}`}>
          <AnimatePresence mode="wait">
            <motion.div key={activeTab + (selectedService?.id || '')} initial={{ opacity: 0, y: 30, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -30, scale: 0.98 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="min-h-full">
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onSuccess={(u) => {
          setCurrentUser(u);
          handleNavigation('dashboard');
        }} 
      />
    </div>
  );
};

export default App;
