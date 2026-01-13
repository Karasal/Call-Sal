
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Send, MessageCircle, Play, ChevronRight, Workflow, Youtube, X, ExternalLink, Activity, Target, Phone, Terminal } from 'lucide-react';
import { getSalResponse } from '../services/geminiService';

const FormattedHeroText = ({ text }: { text: string }) => {
  if (!text) return null;
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
          className="p-4 bg-white/10 text-white hover:bg-[#CCFF00] hover:text-black transition-all flex items-center gap-3 font-heading font-black text-[10px] tracking-[0.3em] uppercase border border-white/20"
        >
          <ExternalLink size={18} /> OPEN IN YT
        </a>
        <button 
          onClick={onClose}
          className="p-4 bg-white text-black hover:bg-[#CCFF00] transition-all flex items-center gap-3 font-heading font-black text-[10px] tracking-[0.3em] uppercase border-none shadow-[10px_10px_0_rgba(204,255,0,0.3)] active:translate-x-1 active:translate-y-1 active:shadow-none"
        >
          <X size={20} /> CLOSE
        </button>
      </div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-6xl aspect-video glass-2 bg-black overflow-hidden border-white/20 shadow-[0_0_200px_rgba(204,255,0,0.1)]"
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
    </motion.div>
  );
};

const HeroChat = () => {
  const [input, setInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: "SYSTEM STATUS: OPTIMAL\n\nHi - I'm your new pal, Sal! 👋\n\nI build the engines that run your business while you sleep. Custom apps, content machine-scaling, and lead generation. \n\nDrop a line and let's automate your headaches." }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isExpanded]);

  const handleAudit = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const response = await getSalResponse(userMsg);
    setMessages(prev => [...prev, { role: 'model', text: response || "RECONNECTION REQUIRED. PLEASE RETRY, NEIGHBOR." }]);
    setIsTyping(false);
  };

  return (
    <motion.div
      ref={chatRef}
      layout
      onClick={() => { if(!isExpanded) setIsExpanded(true); }}
      className={`glass-2 w-full transition-all duration-500 flex flex-col border-[#CCFF00]/30 overflow-hidden shadow-[40px_40px_0_rgba(204,255,0,0.02)] ${
        isExpanded ? 'h-[500px] lg:h-[600px]' : 'h-[260px] lg:h-[600px]'
      }`}
    >
      <div 
        className="p-4 border-b border-[#CCFF00]/20 bg-[#CCFF00] text-black flex items-center gap-4 justify-between relative z-20 cursor-pointer"
        onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
      >
        <div className="flex items-center gap-4">
          <Terminal size={18} />
          <div className="flex flex-col">
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase leading-none">NEURAL_TERMINAL_V3</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
          <span className="text-[9px] font-mono font-bold uppercase">LIVE_LINK</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 font-mono text-xs bg-black/80">
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] p-4 ${
                  m.role === 'user' 
                  ? 'bg-[#CCFF00] text-black font-bold' 
                  : 'border border-white/10 text-white/90 bg-white/5'
                }`}>
                  <FormattedHeroText text={m.text} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && <div className="text-[#CCFF00] animate-pulse">SAL_PROCESSING...</div>}
        </div>

        <div className="p-4 border-t border-white/10 bg-black">
          <div className="relative">
            <input
              value={input}
              onFocus={() => setIsExpanded(true)}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAudit()}
              placeholder="System prompt..."
              className="w-full bg-transparent border-b border-[#CCFF00]/50 py-3 pr-10 focus:outline-none focus:border-[#CCFF00] text-sm font-mono text-[#CCFF00] placeholder:text-[#CCFF00]/20"
            />
            <button onClick={(e) => { e.stopPropagation(); handleAudit(); }} className="absolute right-0 top-1/2 -translate-y-1/2 text-[#CCFF00]">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Hero: React.FC<{ onStart: () => void, onConsultation: () => void }> = ({ onStart, onConsultation }) => {
  const portfolioRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="space-y-12 sm:space-y-32 relative">
      <div className="min-h-[85vh] flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-32 relative pt-8 pb-10 sm:pb-20">
        <div className="z-10 flex-1 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-8 flex items-center gap-4">
               <div className="w-16 h-[2px] bg-[#CCFF00]" />
               <span className="text-[12px] font-mono tracking-[0.5em] text-[#CCFF00] uppercase font-bold leading-tight">
                 INDEPENDANT <br className="sm:hidden" /> AI OPERATOR
               </span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7.5rem] font-heading font-black mb-8 leading-[0.85] tracking-tighter uppercase stark-gradient">
              "HI - IT'S <br />
              YOUR NEW <br />
              <span className="toxic-text">PAL, SAL!</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/60 mb-12 leading-tight font-heading font-medium max-w-xl border-l-2 border-[#CCFF00] pl-8">
              THERES NO TURNING BACK, AI IS HERE AND YOUR COMPETITION IS ALREADY PREPARING - BUT I'M GOING TO HELP YOU GET THERE FIRST!
            </p>
            
            <div className="flex flex-wrap gap-6">
              <button 
                onClick={onStart}
                className="px-10 py-6 bg-[#CCFF00] text-black font-heading font-black text-xs tracking-[0.4em] uppercase hover:scale-105 transition-all shadow-[15px_15px_0_rgba(204,255,0,0.1)] active:scale-95"
              >
                MY PROCESS
              </button>
              <button 
                onClick={() => portfolioRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-6 border-2 border-white text-white font-heading font-black text-xs tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all"
              >
                VIEW_CINEMATICS
              </button>
            </div>
          </motion.div>
        </div>

        <div className="z-10 flex-1 w-full lg:max-w-2xl">
          <HeroChat />
        </div>
      </div>

      <div ref={portfolioRef} className="py-20 border-t border-white/10">
        <VideoPortfolio onConsultation={onConsultation} />
      </div>
    </div>
  );
};

const VideoPortfolio = ({ onConsultation }: { onConsultation: () => void }) => {
  const projects = [
    { id: "gxeU_tq7jH8", title: "Surviving The Silence", company: "Peter Herbig" },
    { id: "RLwo8clXyZM", title: "The Supreme Barbershop", company: "Kaleb Brunning" },
    { id: "2D6Dc7Pa_1s", title: "NATEFIT", company: "Nathaniel Ernst" },
    { id: "HrHrFXZao1o", title: "Real Estate Reel", company: "MadHouse" },
  ];

  const [activeProject, setActiveProject] = useState(projects[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="mb-20">
        <h2 className="text-5xl sm:text-7xl font-heading font-black text-white uppercase tracking-tighter stark-gradient">CINEMATICS</h2>
        <div className="h-1 w-32 bg-[#CCFF00] mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <div className="relative group cursor-pointer aspect-video overflow-hidden border border-white/20" onClick={() => setIsModalOpen(true)}>
            <img 
              src={`https://img.youtube.com/vi/${activeProject.id}/maxresdefault.jpg`} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100" 
              alt={activeProject.title}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 border border-white/40 flex items-center justify-center rounded-full group-hover:bg-[#CCFF00] group-hover:border-[#CCFF00] transition-all">
                <Play className="text-white group-hover:text-black ml-1" size={32} />
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 space-y-4">
          {projects.map(p => (
            <button 
              key={p.id}
              onClick={() => setActiveProject(p)}
              className={`w-full p-6 text-left border transition-all flex items-center justify-between ${
                activeProject.id === p.id ? 'bg-white text-black border-white' : 'bg-transparent border-white/10 text-white hover:border-white/40'
              }`}
            >
              <div>
                <p className="text-[10px] font-mono font-bold opacity-40 uppercase mb-1">{p.company}</p>
                <p className="font-heading font-black uppercase text-sm">{p.title}</p>
              </div>
              <ChevronRight size={16} />
            </button>
          ))}
          <button 
            onClick={onConsultation}
            className="w-full py-8 bg-[#CCFF00] text-black font-heading font-black text-xs tracking-[0.4em] uppercase mt-8 hover:translate-x-2 transition-transform"
          >
            BOOK_CONSULTATION
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && <VideoModal id={activeProject.id} title={activeProject.title} onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </div>
  );
};
