import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Send, MessageCircle, Play, ChevronRight, Workflow, Youtube, X, ExternalLink, Activity, Target, Phone } from 'lucide-react';
import { getSalResponse } from '../services/geminiService';

const FormattedHeroText = ({ text }: { text: string }) => {
  return (
    <>
      {text.split('\n').map((line, i) => (
        <span key={i} className="block mb-2 last:mb-0">
          {line}
        </span>
      ))}
    </>
  );
};

const VideoModal = ({ id, title, onClose }: { id: string, title: string, onClose: () => void }) => {
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    try {
      setOrigin(window.location.origin);
    } catch (e) {
      setOrigin('*');
    }
  }, []);

  const embedUrl = `https://www.youtube.com/embed/${id}?autoplay=1&mute=0&rel=0&enablejsapi=1&origin=${encodeURIComponent(origin)}`;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/98 backdrop-blur-3xl"
    >
      <div className="absolute top-6 right-6 md:top-10 md:right-10 z-[110] flex gap-4">
        <a 
          href={`https://www.youtube.com/watch?v=${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 bg-white/10 text-white hover:bg-white/20 transition-all flex items-center gap-3 font-heading font-black text-[10px] tracking-[0.3em] uppercase border border-white/20"
        >
          <ExternalLink size={18} /> OPEN IN YT
        </a>
        <button 
          onClick={onClose}
          className="p-4 bg-white text-black hover:bg-white/90 transition-all flex items-center gap-3 font-heading font-black text-[10px] tracking-[0.3em] uppercase border-none shadow-[10px_10px_0_rgba(255,255,255,0.1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
        >
          <X size={20} /> CLOSE
        </button>
      </div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-6xl aspect-video brutalist-panel bg-black overflow-hidden border-white/20 shadow-[0_0_200px_rgba(255,255,255,0.15)]"
      >
        <iframe
          src={embedUrl}
          title={title}
          className="absolute inset-0 w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="origin"
          allowFullScreen
        />
      </motion.div>

      <div className="absolute bottom-10 left-10 max-w-sm">
        <p className="text-[10px] font-sans tracking-[0.2em] text-white/40 uppercase font-black leading-relaxed">
          If the video fails to load due to browser security settings, please use the "OPEN IN YT" button at the top right.
        </p>
      </div>
    </motion.div>
  );
};

const VideoPortfolio = ({ onConsultation }: { onConsultation: () => void }) => {
  const projects = [
    { 
      id: "gxeU_tq7jH8",
      title: "Surviving The Silence", 
      company: "Peter Herbig", 
    },
    { 
      id: "RLwo8clXyZM",
      title: "The Supreme Barbershop", 
      company: "Kaleb Brunning", 
    },
    { 
      id: "2D6Dc7Pa_1s",
      title: "NATEFIT", 
      company: "Nathaniel Ernst", 
    },
    { 
      id: "HrHrFXZao1o",
      title: "Real Estate Reel", 
      company: "MadHouse", 
    },
  ];

  const [activeProject, setActiveProject] = useState(projects[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getThumbnail = (id: string) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

  return (
    <div className="mt-20 w-full max-w-7xl mx-auto">
      <div className="flex flex-col mb-16 relative">
        <div className="flex items-center gap-4 mb-4">
           <div className="w-12 h-[1px] bg-white/30" />
           <span className="text-[10px] font-sans tracking-[0.8em] text-white/50 uppercase font-black leading-none">Curated Content</span>
        </div>
        <h2 className="text-7xl md:text-[10rem] font-heading font-black text-white uppercase tracking-tighter stark-gradient leading-[0.75]">
          VIDEO <br />
          GALLERY.
        </h2>
        <div className="absolute top-0 right-0 hidden lg:block opacity-10">
          <Activity size={200} strokeWidth={0.5} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-20">
        <div className="lg:col-span-8 space-y-10">
          <div className="brutalist-panel aspect-video relative group overflow-hidden bg-black border-white/20 flex items-center justify-center">
            <div 
              className="absolute inset-0 w-full h-full cursor-pointer group flex items-center justify-center"
              onClick={() => setIsModalOpen(true)}
            >
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeProject.id}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 0.5, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 z-0 grayscale group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-[1.5s]"
                >
                  <img 
                    src={getThumbnail(activeProject.id)} 
                    alt={activeProject.title} 
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${activeProject.id}/hqdefault.jpg`;
                    }}
                  />
                </motion.div>
              </AnimatePresence>
              
              <div className="relative z-10 w-32 h-32 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white group-hover:scale-110 transition-all duration-700 shadow-[0_0_150px_rgba(255,255,255,0.1)]">
                <Play size={40} className="text-white group-hover:text-black ml-2 transition-colors duration-500" />
              </div>
              
              <div className="absolute top-10 left-10 border border-white/20 px-8 py-4 backdrop-blur-xl bg-black/60 shadow-[10px_10px_0px_rgba(255,255,255,0.05)]">
                <span className="text-[11px] font-sans tracking-[0.6em] text-white uppercase font-black">PLAY PROJECT SHOWCASE</span>
              </div>
            </div>
          </div>

          <div className="brutalist-panel p-12 bg-white text-black flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-center md:text-left flex-1">
              <span className="text-[10px] font-sans tracking-[0.4em] uppercase font-black opacity-30 block mb-2">ACTIVE PROJECT:</span>
              <h3 className="text-4xl font-heading font-black uppercase tracking-tighter leading-none mb-4">{activeProject.title}</h3>
              <p className="text-[12px] font-sans font-black tracking-[0.4em] uppercase opacity-40">{activeProject.company} // CREATIVE SUITE 2.5</p>
            </div>
            <a 
              href="tel:905-749-0266"
              className="px-14 py-8 bg-black text-white font-heading font-black text-xs tracking-[0.4em] uppercase hover:bg-black/90 transition-all active:scale-95 shadow-[15px_15px_0px_rgba(0,0,0,0.1)] flex items-center gap-4"
            >
              <Phone size={14} /> FREE CONSULTATION
            </a>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4 h-full flex flex-col">
          <div className="brutalist-panel p-8 border-white/10 mb-4 flex items-center justify-between bg-white/[0.03] backdrop-blur-sm">
            <span className="text-[10px] font-sans tracking-[0.4em] text-white/60 uppercase font-black">FILM REEL SELECTION</span>
            <div className="w-10 h-10 border border-white/10 flex items-center justify-center">
              <Target size={16} className="text-white/30" />
            </div>
          </div>
          <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-2 max-h-[800px]">
            {projects.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveProject(p)}
                className={`w-full brutalist-panel p-6 flex items-center gap-6 group transition-all text-left relative overflow-hidden ${
                  activeProject.id === p.id 
                  ? 'bg-white/10 border-white shadow-[inset_0_0_40px_rgba(255,255,255,0.1)] scale-[1.02]' 
                  : 'bg-transparent border-white/5 hover:border-white/20'
                }`}
              >
                <div className="w-24 h-16 bg-white/5 overflow-hidden flex-shrink-0 relative border border-white/10">
                  <img 
                    src={`https://img.youtube.com/vi/${p.id}/mqdefault.jpg`} 
                    alt={p.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                  />
                  {activeProject.id === p.id && <div className="absolute inset-0 bg-white/20 animate-pulse" />}
                </div>
                <div className="flex-1 overflow-hidden relative z-10">
                  <h4 className={`text-[12px] font-heading font-black uppercase truncate mb-1 ${activeProject.id === p.id ? 'text-white' : 'text-white/40'}`}>
                    {p.title}
                  </h4>
                  <p className="text-[9px] font-sans tracking-widest text-white/20 uppercase font-bold truncate">
                    {p.company}
                  </p>
                </div>
                <ChevronRight size={18} className={`text-white transition-all ${activeProject.id === p.id ? 'translate-x-1 opacity-100' : 'opacity-0'}`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <VideoModal 
            id={activeProject.id} 
            title={activeProject.title} 
            onClose={() => setIsModalOpen(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const HeroChat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: "Hi - I'm your new pal, Sal! 👋\n\nI'm an independent freelancer who builds custom software and high-level marketing content. My goal is simple: reduce your costs and boost your sales.\n\nTell me what your business does and I'll show you exactly where we can automate!" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleAudit = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const response = await getSalResponse(userMsg);
    setMessages(prev => [...prev, { role: 'model', text: response || "Something got disconnected! Let me try to reconnect. Can you ask me that again, neighbor?" }]);
    setIsTyping(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="brutalist-panel w-full h-[500px] lg:h-[550px] flex flex-col border-white overflow-hidden shadow-[40px_40px_0_rgba(255,255,255,0.02)] scanline-overlay"
    >
      <div className="p-3 border-b border-white bg-white text-black flex items-center justify-between relative z-20">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-black flex items-center justify-center">
             <MessageCircle size={16} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-sans font-black tracking-widest uppercase leading-none mb-1">STRATEGY HUD</span>
            <span className="text-[8px] font-sans tracking-widest uppercase opacity-40">Sal // ARCHITECT v3.1</span>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-black/5 px-3 py-1.5 border border-black/10">
          <div 
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 animate-pulse ${
              input.length > 0 || isTyping ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-black'
            }`} 
          />
          <span className="text-[9px] font-sans font-black uppercase tracking-widest">ACTIVE SESSION</span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-black/60 backdrop-blur-md">
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] p-5 ${
                m.role === 'user' 
                ? 'bg-white text-black font-bold border-black shadow-[10px_10px_0_rgba(255,255,255,0.05)]' 
                : 'border-l-4 border-white text-white font-medium bg-white/[0.04] backdrop-blur-lg'
              }`}>
                <div className="text-[13px] font-heading tracking-tight leading-relaxed">
                  <FormattedHeroText text={m.text} />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isTyping && (
          <div className="flex justify-start">
             <div className="flex gap-2 p-3 border border-white/10 bg-white/5 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]" />
             </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-white/10 bg-black/90 relative z-20">
        <div className="relative">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAudit()}
            placeholder="Tell Sal about your current workflow..."
            className="w-full bg-transparent border border-white/10 p-4 pr-16 focus:outline-none focus:border-white transition-all text-sm font-heading font-semibold placeholder:text-white/50"
          />
          <button
            onClick={handleAudit}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white text-black flex items-center justify-center hover:bg-white/80 transition-all active:scale-95"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const Hero: React.FC<{ 
  onStart: () => void, 
  onConsultation: () => void,
  isPortfolioVisible: boolean,
  onTogglePortfolio: (visible: boolean) => void 
}> = ({ onStart, onConsultation, isPortfolioVisible, onTogglePortfolio }) => {
  const portfolioRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, 100]);

  const togglePortfolio = () => {
    onTogglePortfolio(true);
    setTimeout(() => {
      portfolioRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="space-y-0 relative">
      {/* Background HUD Graphics */}
      <motion.div style={{ y: y1 }} className="absolute -top-20 right-20 text-white/[0.02] pointer-events-none -z-10 hidden xl:block">
        <Activity size={400} strokeWidth={0.5} />
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute top-1/2 -left-20 text-white/[0.02] pointer-events-none -z-10 hidden xl:block">
        <Target size={300} strokeWidth={0.5} />
      </motion.div>

      {/* Main Landing Area - Tightened padding for maximized screen space */}
      <div className="min-h-0 lg:h-[calc(100vh-64px)] flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20 py-2 relative">
        <div className="z-10 flex-1 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-4 inline-flex items-center gap-6">
               <div className="w-12 h-[2px] bg-white" />
               <span className="text-[10px] font-sans tracking-[0.8em] text-white/70 uppercase font-black leading-none block">INDEPENDENT AI OPERATOR</span>
            </div>
            <h1 className="text-4xl md:text-[6.5rem] lg:text-[7.5rem] font-heading font-black mb-4 pb-6 leading-[0.8] tracking-tighter uppercase stark-gradient">
              HI - IT'S <br />
              YOUR NEW <br />
              PAL, SAL!
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-6 leading-tight font-heading font-medium max-w-2xl tracking-tighter italic border-l-4 border-white/20 pl-6">
              "We dramatically reduce operating costs and automate lead generation through bespoke AI systems."
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onStart}
                className="group relative px-8 py-5 bg-white text-black font-heading font-black text-[10px] tracking-[0.4em] uppercase transition-all duration-500 hover:shadow-[15px_15px_0_rgba(255,255,255,0.05)] active:scale-95 overflow-hidden"
              >
                <div className="relative z-10 flex items-center justify-center gap-4">
                  <Workflow size={16} />
                  HOW IT WORKS &gt;
                </div>
                <div className="absolute inset-0 bg-black/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              </button>
              <button 
                onClick={togglePortfolio}
                className="px-8 py-5 border border-white/20 text-white font-heading font-black text-[10px] tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all duration-500 flex items-center justify-center gap-4"
              >
                <Youtube size={16} />
                VIDEO GALLERY
              </button>
            </div>
          </motion.div>
        </div>

        <div className="z-10 flex-1 w-full lg:max-w-xl">
          <HeroChat />
        </div>

        <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-white/[0.01] blur-[150px] rounded-full pointer-events-none -z-10" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-white/[0.01] blur-[120px] rounded-full pointer-events-none -z-10" />
      </div>

      <AnimatePresence>
        {isPortfolioVisible && (
          <motion.div 
            ref={portfolioRef}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <VideoPortfolio onConsultation={onConsultation} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
