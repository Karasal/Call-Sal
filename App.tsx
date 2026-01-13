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
import { LayoutGrid, Zap, MessageSquare, Phone, User, Target, Youtube, Home, MonitorPlay, LogIn, UserPlus, LogOut, Menu, X, Mail, MapPin, Clock } from 'lucide-react';
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
    setActiveTab('overview');
    storage.setCurrentUser(null);
    setCurrentUser(null);
  };

  const tabs = [
    { id: 'overview', icon: <Home size={20} />, label: 'WELCOME' },
    { id: 'about', icon: <User size={20} />, label: 'MEET SALMAN' },
    { id: 'automation', icon: <Zap size={20} />, label: 'BUSINESS AUTOMATION' },
    { id: 'sales', icon: <Target size={20} />, label: 'SALES GENERATION' },
    { id: 'consultation', icon: <MessageSquare size={20} />, label: 'FREE CONSULTATION' },
    { id: 'demos', icon: <MonitorPlay size={20} />, label: 'LIVE DEMOS' },
    ...(currentUser ? [{ id: 'dashboard', icon: <LayoutGrid size={20} />, label: currentUser.role === 'admin' ? 'ADMIN PANEL' : 'CLIENT HUB' }] : []),
  ];

  return (
    <aside className="fixed bottom-0 left-0 w-full h-16 lg:relative lg:w-64 xl:w-72 lg:h-full bg-black border-t lg:border-t-0 lg:border-r border-white/10 flex flex-row lg:flex-col items-center lg:items-stretch py-0 lg:py-10 z-[100] shrink-0 overflow-y-hidden lg:overflow-y-auto custom-scrollbar">
      {/* Desktop Logo Area */}
      <div className="hidden lg:flex flex-col items-center lg:items-start gap-4 px-6 xl:px-8 mb-16 xl:mb-20">
        <div className="bg-white px-3 xl:px-4 py-1.5 flex items-center justify-center text-black font-heading font-black text-2xl xl:text-3xl tracking-tighter uppercase">
          CALL SAL.
        </div>
        <div>
          <p className="text-[9px] xl:text-[10px] font-sans tracking-[0.2em] text-white uppercase font-black leading-tight">// AI SOLUTIONS EXPERT</p>
        </div>
      </div>

      <nav className="flex-1 flex flex-row lg:flex-col w-full justify-around lg:justify-start" aria-label="Primary Navigation">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            aria-label={tab.label}
            className={`flex-1 lg:flex-none flex items-center justify-center lg:justify-start gap-4 xl:gap-6 px-4 xl:px-8 py-4 lg:py-4 xl:py-5 group relative transition-all duration-300 text-left ${
              activeTab === tab.id ? 'text-white' : 'text-white/80 hover:text-white'
            }`}
          >
            <span className="shrink-0">{tab.icon}</span>
            <span className="hidden lg:block font-heading text-[10px] xl:text-[11px] tracking-[0.2em] font-bold uppercase leading-none">{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div layoutId="activeTabIndicator" className="absolute left-0 bottom-0 lg:bottom-auto lg:w-1 lg:h-full h-1 w-full lg:bg-white bg-white" aria-hidden="true" />
            )}
          </button>
        ))}
      </nav>

      <div className="hidden lg:block px-6 xl:px-8 mb-8 xl:mb-10 space-y-4">
        {!currentUser ? (
          <div className="flex flex-col gap-2">
            <button onClick={onAuth} aria-label="Login" className="w-full flex items-center gap-3 xl:gap-4 py-3 text-white/80 hover:text-white transition-all border border-white/5 hover:border-white/20 px-4 group">
              <LogIn size={16} className="group-hover:scale-110 transition-transform" />
              <span className="text-[8px] xl:text-[9px] font-heading font-black tracking-widest uppercase">LOGIN</span>
            </button>
            <button onClick={onAuth} aria-label="Register" className="w-full flex items-center gap-3 xl:gap-4 py-4 bg-white text-black transition-all border border-white px-4 group shadow-[8px_8px_0_rgba(255,255,255,0.1)] active:scale-95 hover:translate-x-1">
              <UserPlus size={16} className="text-black" />
              <span className="text-[9px] xl:text-[10px] font-heading font-black tracking-widest uppercase">REGISTER</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4 border-t border-white/10 pt-8">
             <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setActiveTab('dashboard')} role="button" aria-label="View Dashboard">
                <img src={currentUser.avatar} className="w-10 h-10 border border-white/20 group-hover:border-white transition-colors" alt="" />
                <div className="overflow-hidden">
                  <div className="text-[10px] font-heading font-black text-white uppercase truncate group-hover:underline">{currentUser.name}</div>
                  <span className="text-[8px] font-sans font-black text-white/80 uppercase">View Dashboard</span>
                </div>
             </div>
             <button onClick={handleLogout} aria-label="Logout" className="w-full flex items-center gap-3 xl:gap-4 py-3 text-red-500 hover:text-red-400 transition-all border border-red-500/20 hover:border-red-500/40 px-4 group">
              <LogOut size={16} />
              <span className="text-[8px] xl:text-[9px] font-heading font-black tracking-widest uppercase">LOGOUT</span>
             </button>
          </div>
        )}
      </div>

      <div className="hidden lg:block px-6 xl:px-8 pt-8 xl:pt-10 border-t border-white/5 space-y-2" onMouseEnter={() => setIsYearHovered(true)} onMouseLeave={() => setIsYearHovered(false)}>
        <p className="text-[8px] font-sans tracking-[0.3em] text-white/80 uppercase font-black flex items-center gap-1">
          <span>EST.</span>
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
        <p className="text-[8px] font-sans tracking-[0.3em] text-white/80 uppercase font-black flex items-center gap-1 whitespace-nowrap">
          <span>© SIMPLESALMAN</span>
        </p>
      </div>
    </aside>
  );
};

const HeaderHUD = ({ onAuth, currentUser }: { onAuth: () => void, currentUser: IUser | null }) => {
  const [mstTime, setMstTime] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => setMstTime(new Date().toLocaleTimeString('en-US', { timeZone: 'America/Denver', hour: 'numeric', minute: '2-digit', hour12: true }));
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header className="h-16 px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between z-40 border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0">
        {/* Left: Logo (Visible on mobile and tablet) */}
        <div className="flex items-center">
          <div className="bg-white px-3 py-1 text-black font-heading font-black text-lg sm:text-xl tracking-tighter mr-4 lg:hidden uppercase">
            CALL SAL.
          </div>
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <span className="text-[9px] xl:text-[10px] font-sans tracking-[0.1em] xl:tracking-[0.2em] text-white uppercase font-bold whitespace-nowrap">
              CALL: 905-749-0266 | E-MAIL: INFO@CALLSAL.APP | CALGARY, AB
            </span>
          </div>
        </div>

        {/* Center: HUD Info removed per previous prompt */}
        <div className="flex-1"></div>

        {/* Right: Hamburger (Mobile/Tablet) or Time/Call (Desktop) */}
        <div className="flex items-center gap-4 lg:gap-8 xl:gap-10">
          <div className="hidden lg:flex items-center gap-2">
            <span className="text-[9px] xl:text-[10px] font-sans font-bold text-white uppercase tracking-widest">{mstTime}</span>
            <span className="text-[9px] xl:text-[10px] font-sans tracking-widest text-white uppercase font-bold">MST</span>
          </div>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden text-white hover:text-white/70 transition-colors p-2"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <a href="tel:905-749-0266" className="hidden lg:flex items-center gap-2 xl:gap-3 px-6 xl:px-8 py-2 xl:py-2.5 bg-white text-black font-heading font-black text-[9px] xl:text-[10px] tracking-[0.15em] xl:tracking-[0.2em] transition-all hover:bg-white/90 active:scale-95 shadow-[6px_6px_0_rgba(255,255,255,0.1)] uppercase">
            <Phone size={10} /> CALL SAL
          </a>
        </div>
      </header>

      {/* Expanded Hamburger Menu (Mobile & Tablet) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            className="lg:hidden fixed top-16 right-4 left-4 z-[60] brutalist-panel bg-black border-white p-6 sm:p-8 shadow-[15px_15px_0_rgba(255,255,255,0.05)]"
          >
            <div className="space-y-5">
              <div className="flex items-center gap-4 text-white">
                <Phone size={16} />
                <div className="flex flex-col">
                  <span className="text-[8px] font-sans font-black tracking-widest uppercase text-white/50 leading-none mb-1">CALL</span>
                  <span className="text-[10px] font-heading font-bold uppercase leading-none">905-749-0266</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white">
                <Mail size={16} />
                <div className="flex flex-col">
                  <span className="text-[8px] font-sans font-black tracking-widest uppercase text-white/50 leading-none mb-1">EMAIL</span>
                  <span className="text-[10px] font-heading font-bold uppercase leading-none">INFO@CALLSAL.APP</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <a href="tel:905-749-0266" className="w-full flex items-center justify-center gap-3 py-4 bg-white text-black font-heading font-black text-[9px] tracking-widest uppercase">
                  <Phone size={12} /> CALL SAL NOW
                </a>
                {!currentUser && (
                  <>
                    <button onClick={() => { onAuth(); setIsMenuOpen(false); }} aria-label="Login" className="w-full flex items-center justify-center gap-3 py-4 border border-white/20 text-white font-heading font-black text-[9px] tracking-widest uppercase">
                      <LogIn size={12} /> LOGIN
                    </button>
                    <button onClick={() => { onAuth(); setIsMenuOpen(false); }} aria-label="Register" className="w-full flex items-center justify-center gap-3 py-4 bg-white text-black font-heading font-black text-[9px] tracking-widest uppercase">
                      <UserPlus size={12} /> REGISTER
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentUser, setCurrentUser] = useState<IUser | null>(storage.getCurrentUser());
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleNavigation = (tabId: string) => {
    setActiveTab(tabId);
    setSelectedService(null);
    const mainContent = document.getElementById('main-content');
    if (mainContent) mainContent.scrollTop = 0;
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    if (selectedService && (activeTab === 'automation' || activeTab === 'sales')) {
      return (
        <ServiceDetailView 
          service={selectedService} 
          onBack={() => setSelectedService(null)} 
          onConsultation={() => handleNavigation('consultation')}
        />
      );
    }
    switch (activeTab) {
      case 'overview': return <Hero onStart={() => handleNavigation('about')} onConsultation={() => handleNavigation('consultation')} />;
      case 'about': return <MeetSalman onNext={() => handleNavigation('automation')} />;
      case 'automation': return <ServiceGrid category="automation" onSelect={setSelectedService} onNext={() => handleNavigation('sales')} />;
      case 'sales': return <SalesGeneration onSelect={setSelectedService} onNext={() => handleNavigation('consultation')} />;
      case 'consultation': return <ChatSal onDemos={() => handleNavigation('demos')} />;
      case 'demos': return <LiveDemos onNext={() => handleNavigation('consultation')} />;
      case 'dashboard': return currentUser ? <Dashboard user={currentUser} /> : null;
      default: return <Hero onStart={() => handleNavigation('about')} onConsultation={() => handleNavigation('consultation')} />;
    }
  };

  return (
    <div className="relative min-h-screen lg:h-screen w-screen flex flex-col lg:flex-row bg-black lg:overflow-hidden selection:bg-white selection:text-black font-heading">
      <CustomCursor />
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={handleNavigation} 
        onAuth={() => setIsAuthOpen(true)} 
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <div className="flex-1 flex flex-col relative pb-16 lg:pb-0 min-w-0">
        <HeaderHUD onAuth={() => setIsAuthOpen(true)} currentUser={currentUser} />
        <main id="main-content" className="flex-1 overflow-x-hidden relative p-4 sm:p-6 lg:p-8 lg:overflow-y-auto custom-scrollbar scroll-smooth">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab + (selectedService?.id || '')} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }} 
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} 
              className="min-h-full"
            >
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