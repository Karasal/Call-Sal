import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ChevronRight, X, ExternalLink, Activity, Target, Terminal, Cpu, Layers, Database, Shield, Bot, GitBranch, TrendingUp, MonitorPlay, Heart, Radio, Camera, Award, Star, Info, Zap, Settings, HardDrive, Share2, Eye } from 'lucide-react';
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
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 lg:p-10 bg-black/98 backdrop-blur-3xl"
    >
      <div className="absolute top-6 right-6 lg:top-10 lg:right-10 z-[210] flex gap-4">
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
          className="p-4 bg-white text-black hover:bg-[#CCFF00] transition-all flex items-center gap-3 font-heading font-black text-[10px] tracking-[0.3em] uppercase border-none shadow-[10px_10px_0_rgba(204,255,0,0.3)]"
        >
          <X size={20} /> CLOSE
        </button>
      </div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-6xl aspect-video glass-2 bg-black overflow-hidden border-white/20"
      >
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=0`}
          title={title}
          className="absolute inset-0 w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </motion.div>
    </motion.div>
  );
};

const HeroChat = () => {
  const [input, setInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: "SYSTEM: READY TO WORK\n\nHi - I'm your new pal, Sal! 👋\n\nI build the tools that run your business while you sleep. I can automate your boring daily chores, help you find new customers, and make your office run like a machine. \n\nTell me: what's your biggest business headache right now?" }
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
    setMessages(prev => [...prev, { role: 'model', text: response || "Something went wrong! Can you try again, neighbor?" }]);
    setIsTyping(false);
  };

  return (
    <motion.div
      layout
      onClick={() => { if(!isExpanded) setIsExpanded(true); }}
      className={`glass-2 w-full transition-all duration-500 flex flex-col border-[#CCFF00]/30 overflow-hidden shadow-[40px_40px_0_rgba(204,255,0,0.02)] ${
        isExpanded ? 'h-[400px] sm:h-[500px] lg:h-[520px] xl:h-[600px]' : 'h-[220px] lg:h-[520px] xl:h-[600px]'
      }`}
    >
      <div 
        className="p-3 sm:p-4 border-b border-[#CCFF00]/20 bg-[#CCFF00] text-black flex items-center gap-4 justify-between relative z-20 cursor-pointer"
        onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
      >
        <div className="flex items-center gap-4">
          <Terminal size={18} />
          <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-widest uppercase">WHAT'S YOUR PROBLEM?</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
          <span className="text-[8px] sm:text-[9px] font-mono font-bold uppercase">SALBOT_ONLINE</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6 font-mono text-[10px] sm:text-xs bg-black/80 custom-scrollbar">
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[90%] sm:max-w-[85%] p-3 sm:p-4 ${
                  m.role === 'user' 
                  ? 'bg-[#CCFF00] text-black font-bold' 
                  : 'border border-white/10 text-white/90 bg-white/5'
                }`}>
                  <FormattedHeroText text={m.text} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && <div className="text-[#CCFF00] animate-pulse text-[10px]">SAL_IS_THINKING...</div>}
        </div>

        <div className="p-3 sm:p-4 border-t border-white/10 bg-black">
          <div className="relative">
            <input
              value={input}
              onFocus={() => setIsExpanded(true)}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAudit()}
              placeholder="Ask me how I can help..."
              className="w-full bg-transparent border-b border-[#CCFF00]/50 py-2 sm:py-3 pr-10 focus:outline-none focus:border-[#CCFF00] text-xs sm:text-sm font-mono text-[#CCFF00] placeholder:text-[#CCFF00]/20"
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
  const [showStack, setShowStack] = useState(false);
  const [showOperatorDeepDive, setShowOperatorDeepDive] = useState(false);
  const [expandedHelpIndex, setExpandedHelpIndex] = useState<number | null>(null);
  
  const helpAccordionItems = [
    { 
      title: "SILENT WORKERS", 
      desc: "AI agents that handle your emails and tasks.", 
      icon: <Bot size={16} className="text-[#CCFF00] mt-1 shrink-0" />,
      explanation: "Digital employees that never sleep. They triage your inbox, handle initial customer inquiries, and perform data entry with 100% accuracy, freeing you to focus on high-level strategy and growth."
    },
    { 
      title: "SMOOTH PIPELINES", 
      desc: "Data that flows from one app to another automatically.", 
      icon: <GitBranch size={16} className="text-[#CCFF00] mt-1 shrink-0" />,
      explanation: "We connect your entire tech stack into a single, cohesive engine. Data moves frictionlessly from lead capture to CRM to billing, eliminating manual copy-pasting and human error forever."
    },
    { 
      title: "CONSTANT GROWTH", 
      desc: "Systems that find and talk to leads non-stop.", 
      icon: <TrendingUp size={16} className="text-[#CCFF00] mt-1 shrink-0" />,
      explanation: "A 24/7 lead generation machine. Our tools identify ideal prospects, initiate personalized outreach, and book qualified appointments directly into your calendar while you sleep."
    }
  ];

  return (
    <div className="space-y-12 sm:space-y-20 lg:space-y-32 relative">
      <div className="min-h-[70vh] lg:min-h-[85vh] flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 xl:gap-32 relative pt-6 sm:pt-8 pb-10">
        <div className="z-10 flex-1 w-full max-w-4xl text-left">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
            <div 
              className="mb-4 sm:mb-8 flex items-center gap-4 cursor-pointer group"
              onClick={() => setShowOperatorDeepDive(true)}
            >
               <div className="w-10 sm:w-16 h-[2px] bg-[#CCFF00]" />
               <span className="text-[10px] sm:text-[12px] font-mono tracking-[0.3em] text-[#CCFF00] uppercase font-bold leading-tight group-hover:underline">
                 HOW I HELP YOU GROW [?]
               </span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.5rem] xl:text-[7.5rem] font-heading font-black mb-6 sm:mb-8 leading-[0.9] lg:leading-[0.85] tracking-tighter uppercase stark-gradient">
              "HI - I'M <br />
              YOUR NEW <br />
              <span className="toxic-text">PAL, SAL!"</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-2xl text-white/60 mb-8 sm:mb-12 leading-tight font-heading font-medium max-w-xl border-l-2 border-[#CCFF00] pl-6 sm:pl-8">
              AI IS CHANGING EVERYTHING. YOUR COMPETITION IS ALREADY PREPARING—I'M HERE TO MAKE SURE YOU GET THERE FIRST.
            </p>
            
            <div className="flex flex-wrap gap-4 sm:gap-6 mb-8 sm:mb-12">
              <button 
                onClick={onStart}
                className="px-6 sm:px-10 py-4 sm:py-6 bg-[#CCFF00] text-black font-heading font-black text-[10px] sm:text-xs tracking-[0.2em] uppercase hover:scale-105 transition-all shadow-[10px_10px_0_rgba(204,255,0,0.1)]"
              >
                SEE MY PROCESS
              </button>
              <button 
                onClick={() => portfolioRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 sm:px-10 py-4 sm:py-6 border-2 border-white text-white font-heading font-black text-[10px] sm:text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all"
              >
                VIEW CINEMATICS
              </button>
            </div>

            <div className="relative">
               <button 
                onClick={() => setShowStack(!showStack)}
                className="flex items-center gap-3 text-[9px] sm:text-[10px] font-mono tracking-[0.2em] text-[#CCFF00] hover:text-white transition-colors uppercase font-black"
               >
                 <Layers size={14} /> [THE_TECH_I_USE]
               </button>
               
               <AnimatePresence>
                 {showStack && (
                   <motion.div 
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    className="mt-4 sm:mt-6 p-6 sm:p-8 border border-white/10 glass-2 max-w-sm overflow-hidden"
                   >
                     <div className="space-y-4 sm:space-y-6">
                        <div className="flex items-center gap-4">
                           <Cpu size={16} className="text-white/40" />
                           <div className="flex flex-col">
                             <span className="text-[8px] font-mono text-white/40 uppercase">Smart Logic</span>
                             <span className="text-xs font-heading font-black uppercase text-white">Google Gemini 3 Pro</span>
                           </div>
                        </div>
                        <div className="flex items-center gap-4">
                           <Database size={16} className="text-white/40" />
                           <div className="flex flex-col">
                             <span className="text-[8px] font-mono text-white/40 uppercase">Organisation</span>
                             <span className="text-xs font-heading font-black uppercase text-white">Custom Automation Flows</span>
                           </div>
                        </div>
                        <div className="flex items-center gap-4">
                           <Activity size={16} className="text-white/40" />
                           <div className="flex flex-col">
                             <span className="text-[8px] font-mono text-white/40 uppercase">Reliability</span>
                             <span className="text-xs font-heading font-black uppercase text-white">Works 24/7/365</span>
                           </div>
                        </div>
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <div className="z-10 flex-1 w-full lg:max-w-[400px] xl:max-w-[550px]">
          <HeroChat />
        </div>
      </div>

      <AnimatePresence>
        {showOperatorDeepDive && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 lg:p-8 bg-black/95 backdrop-blur-3xl"
          >
             <div className="max-w-4xl w-full glass-2 p-8 lg:p-16 border-t-8 border-[#CCFF00] max-h-[90vh] overflow-y-auto custom-scrollbar relative">
                <button onClick={() => setShowOperatorDeepDive(false)} className="absolute top-6 right-6 lg:top-8 lg:right-8 text-white/40 hover:text-white transition-colors">
                  <X size={32} />
                </button>
                <div className="mb-10 lg:mb-12">
                   <span className="text-[10px] font-mono tracking-[1em] text-[#CCFF00] uppercase font-bold block mb-4">THE_SAL_METHOD</span>
                   <h3 className="text-3xl lg:text-6xl font-heading font-black text-white uppercase tracking-tighter leading-none mb-6">WHY WORK <br />WITH ME?</h3>
                   <div className="h-1 w-24 bg-[#CCFF00]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                   <div className="space-y-6">
                      <div className="p-6 bg-white/5 border border-white/10">
                         <h4 className="text-xl font-heading font-black text-white uppercase mb-4 tracking-tight">MY GOAL</h4>
                         <p className="text-sm font-heading font-medium text-white/60 uppercase leading-relaxed tracking-tight">
                           I DON'T JUST SELL TOOLS. I BUILD CUSTOM SYSTEMS THAT WORK IN THE BACKGROUND SO YOU CAN FOCUS ON WHAT YOU ACTUALLY LOVE DOING.
                         </p>
                      </div>
                      <div className="p-6 bg-[#CCFF00] text-black">
                         <h4 className="text-xl font-heading font-black uppercase mb-4 tracking-tight">THE DIFFERENCE</h4>
                         <p className="text-[11px] font-mono font-black uppercase tracking-widest leading-tight">
                           MOST PEOPLE USE APPS. I BUILD THE ENGINES THAT CONNECT YOUR APPS, EMPLOYEES, AND CUSTOMERS TOGETHER.
                         </p>
                      </div>
                   </div>
                   <div className="space-y-6 lg:space-y-8">
                      <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest block font-black">WHAT YOU GET</span>
                      <div className="space-y-4">
                         {helpAccordionItems.map((m, i) => (
                           <div 
                              key={i} 
                              onClick={() => setExpandedHelpIndex(expandedHelpIndex === i ? null : i)}
                              className="cursor-pointer border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all overflow-hidden"
                            >
                              <div className="flex gap-4 p-4 items-start">
                                 {m.icon}
                                 <div className="flex-1">
                                    <p className="text-[11px] font-heading font-black text-white uppercase mb-1">{m.title}</p>
                                    <p className="text-[9px] font-sans font-bold text-white/40 uppercase tracking-widest">{m.desc}</p>
                                 </div>
                                 <ChevronRight size={14} className={`text-[#CCFF00] mt-1 transition-transform ${expandedHelpIndex === i ? 'rotate-90' : ''}`} />
                              </div>
                              <AnimatePresence>
                                {expandedHelpIndex === i && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="px-4 pb-4 border-t border-white/5"
                                  >
                                    <p className="pt-3 text-[10px] font-sans font-medium text-white/40 uppercase leading-relaxed tracking-tight">
                                      {m.explanation}
                                    </p>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={portfolioRef} className="py-20 border-t border-white/10">
        <VideoPortfolio onConsultation={onConsultation} />
      </div>
    </div>
  );
};

const VideoPortfolio = ({ onConsultation }: { onConsultation: () => void }) => {
  const projects = [
    { 
      id: "gxeU_tq7jH8", 
      title: "SURVIVING THE SILENCE", 
      company: "PETER HERBIG", 
      tech: ["AI Voice", "Smart Editing"], 
      impact: "Massive Viral Reach",
      description: "A gripping cinematic exploration of resilience and the human spirit, captured with raw emotional intensity and high-end visual storytelling."
    },
    { 
      id: "RLwo8clXyZM", 
      title: "THE SUPREME BARBERSHOP YYC", 
      company: "KALEB BRUNNING", 
      tech: ["Dynamic Text", "Fast Cuts"], 
      impact: "300% Engagement",
      description: "Fast-paced, high-energy brand showcase for Calgary's premier grooming destination, focusing on precision, style, and the art of the cut."
    },
    { 
      id: "2D6Dc7Pa_1s", 
      title: "NATEFIT", 
      company: "NATHANIEL ERNST", 
      tech: ["Visual Data", "Auto-Clips"], 
      impact: "Easier Client Onboarding",
      description: "A dynamic fitness journey documentary highlighting the transformational power of dedicated coaching and the strength of the YYC community."
    },
    { 
      id: "1a7M7Np5g10", 
      title: "SPRING CLEANUP COMMERCIAL", 
      company: "K&M LANDSCAPING", 
      tech: ["Dynamic Montage", "Local SEO Focus"], 
      impact: "High Conversion Booking",
      description: "Transforming outdoor spaces into living art. A visual seasonal journey showcasing the mastery and evolution of premium Calgary landscapes."
    },
    { 
      id: "RLUiuSgi0zU", 
      title: "MAD BUILDERS", 
      company: "MAD HOUSE", 
      tech: ["Home Data Injection"], 
      impact: "Cheaper Lead Costs",
      description: "Behind the scenes of architectural mastery, capturing the grit, precision, and glory involved in crafting high-end custom residential builds."
    },
    { 
      id: "Up0lNvLU230", 
      title: "I AM MATHEW", 
      company: "MAD HOUSE", 
      tech: ["Cinematic AI", "Sound Design"], 
      impact: "Deep Emotional Impact",
      description: "An intimate and evocative cinematic portrait exploring personal identity through the specialized lens of modern digital creativity."
    },
  ];

  const [activeProject, setActiveProject] = useState(projects[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 relative">
      <div className="mb-12 sm:mb-20">
        <div className="flex flex-col items-center text-center gap-10 lg:gap-16">
          <div className="w-full max-w-5xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-[#CCFF00]" />
              <span className="text-[10px] font-mono tracking-[0.5em] text-[#CCFF00] uppercase font-black">HIGH_END_DOCUMENTARY</span>
              <div className="w-12 h-[1px] bg-[#CCFF00]" />
            </div>
            <h2 className="text-6xl sm:text-8xl lg:text-[10rem] font-heading font-black text-white uppercase tracking-tighter stark-gradient mb-12">CINEMATICS.</h2>
            
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-12">
              <div className="space-y-6">
                <p className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black text-white uppercase leading-none tracking-tight">
                  AI POWERS THE SCALE. <br />
                  <span className="toxic-text">CINEMA CAPTURES THE SOUL.</span>
                </p>
                <div className="h-1 w-32 bg-[#CCFF00] mx-auto" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-left">
                <div className="space-y-8">
                  <p className="text-lg lg:text-2xl font-heading font-medium text-white/90 uppercase leading-snug tracking-tight">
                    As exciting as it is to be AI-powered, what really makes it all work is remembering that you are still serving a <span className="text-white border-b-2 border-[#CCFF00]">human audience</span>.
                  </p>
                  <p className="text-sm font-heading font-bold text-white/40 uppercase leading-relaxed">
                    The most powerful evergreen marketing tool is a high-end cinematic mini-documentary. We humanize your brand through artistic interview footage and Hollywood-grade B-roll.
                  </p>
                </div>
                <div className="space-y-8 border-l border-white/10 pl-10">
                   <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <Award className="text-[#CCFF00] shrink-0" size={20} />
                        <div>
                          <p className="text-xs font-mono font-black text-white uppercase mb-1">HERITAGE_BRANDING</p>
                          <p className="text-[11px] text-white/50 uppercase leading-relaxed font-bold">This isn't just an advertisement. It's a legacy piece that grows in value as your company matures, building subconscious trust with every viewer.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Star className="text-[#CCFF00] shrink-0" size={20} />
                        <div>
                          <p className="text-xs font-mono font-black text-white uppercase mb-1">UNMATCHED_AUTHORITY</p>
                          <p className="text-[11px] text-white/50 uppercase leading-relaxed font-bold">The visual texture of Hollywood cinema bypasses the natural skepticism of modern leads. They stop seeing a "service provider" and start seeing a "market leader".</p>
                        </div>
                      </div>
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                <div className="p-10 lg:p-12 bg-white/[0.03] border border-white/10 relative group text-left">
                  <div className="absolute top-4 left-4"><MonitorPlay size={18} className="text-white/20" /></div>
                  <p className="text-lg lg:text-xl font-heading font-black text-white uppercase leading-tight tracking-wide mb-4">
                    GET CONTENT THAT LOOKS LIKE NETFLIX.
                  </p>
                  <p className="text-white/40 font-medium text-xs lg:text-sm uppercase leading-relaxed">
                    WE ADD A MASSIVE PROFESSIONAL EDGE TO YOUR ONLINE PRESENCE. PEOPLE TAKE THIS LEVEL OF QUALITY SERIOUSLY—AND THEY TAKE THE BUSINESSES WHO USE IT SERIOUSLY.
                  </p>
                </div>

                <div className="p-10 lg:p-12 bg-[#CCFF00] text-black text-left">
                  <div className="absolute top-4 left-4"><Radio size={18} className="text-black/30" /></div>
                  <p className="text-lg lg:text-xl font-heading font-black uppercase leading-tight tracking-wide mb-4">
                    OMNI-CHANNEL LEVERAGE.
                  </p>
                  <p className="text-black/60 font-bold text-xs lg:text-sm uppercase leading-relaxed">
                    WHILE OUR FILMS ENGAGE ON AN EMOTIONAL LEVEL, OUR AI NEURAL NETWORKS TAKE THAT ONE MASTER FILM AND DISTRIBUTE IT ACROSS THOUSANDS OF CHANNELS INSTANTLY.
                  </p>
                </div>
              </div>

              {/* REDESIGNED RED KOMODO-X HARDWARE SHOWCASE ASSEMBLY */}
              <div className="w-full pt-10">
                <div className="brutalist-panel bg-black border-white/10 overflow-hidden relative group text-left p-0 shadow-[0_0_50px_rgba(255,0,0,0.1)]">
                  {/* HERO HEADER AREA */}
                  <div className="bg-[#FF0000] p-10 lg:p-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 opacity-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
                       <Zap size={600} className="text-black" />
                    </div>
                    <div className="relative z-10 max-w-2xl">
                        <span className="text-[11px] font-mono tracking-[0.5em] text-black uppercase font-black block mb-6 px-3 py-1 bg-white/20 inline-block">OPTICAL_CORE_SPEC</span>
                        <h4 className="text-5xl lg:text-8xl font-heading font-black text-black uppercase tracking-tighter leading-[0.8] mb-6">RED KOMODO-X</h4>
                        <p className="text-base lg:text-xl font-heading font-black text-black/80 uppercase tracking-tight max-w-lg">
                          The absolute pinnacle of S35 global shutter technology. Official <span className="text-white">Netflix Approved</span> and the choice for modern Hollywood masterworks.
                        </p>
                    </div>
                    <div className="relative z-10 flex flex-col items-end">
                      <div className="text-right mb-6">
                        <p className="text-[10px] font-mono font-black text-black/50 uppercase tracking-widest">PEDIGREE_REGISTRY</p>
                        <p className="text-sm font-heading font-black text-white uppercase">REBEL MOON // THE KILLER // ROAD HOUSE</p>
                      </div>
                      <div className="px-8 py-4 bg-black text-white font-mono font-black text-xs uppercase tracking-widest shadow-2xl border border-white/20">6K_S35_GS_CMOS</div>
                    </div>
                  </div>

                  {/* TECHNICAL DATA GRID */}
                  <div className="p-8 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 bg-[#080808]">
                    {/* VISUAL SHOWCASE */}
                    <div className="lg:col-span-7 space-y-12">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="relative group/feat p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all">
                           <div className="absolute top-4 left-4 text-[#FF0000]"><Settings size={20} /></div>
                           <h5 className="text-xs font-mono font-black text-white/40 uppercase mb-4 pl-8">LOCKING_RF_MOUNT</h5>
                           <p className="text-sm font-heading font-bold text-white uppercase leading-tight pr-6">
                             Reinforced locking mechanism supporting heavy-duty cinema lenses without the need for PL adapters in many workflows.
                           </p>
                        </div>
                        <div className="relative group/feat p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all">
                           <div className="absolute top-4 left-4 text-[#FF0000]"><HardDrive size={20} /></div>
                           <h5 className="text-xs font-mono font-black text-white/40 uppercase mb-4 pl-8">CFEXPRESS_DATA</h5>
                           <p className="text-sm font-heading font-bold text-white uppercase leading-tight pr-6">
                             Utilizing the massive bandwidth of CFexpress Type B to record high-bitrate REDCODE® RAW without compromise.
                           </p>
                        </div>
                      </div>

                      <div className="aspect-video relative overflow-hidden border border-white/10 group/img shadow-2xl bg-black">
                         <img 
                           src="https://images.red.com/komodo-x/kx-rf-main-features-2x.jpg" 
                           className="w-full h-full object-cover opacity-80 group-hover/img:opacity-100 transition-all duration-1000 scale-105 group-hover/img:scale-100" 
                           alt="RED Komodo-X Main Features" 
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                         <div className="absolute bottom-8 left-8">
                            <span className="text-[10px] font-mono font-black text-[#FF0000] uppercase block mb-2">SYSTEM_ARCH_VIEW</span>
                            <p className="text-2xl font-heading font-black text-white uppercase tracking-tighter">REFINED POWER DISTRIBUTION</p>
                         </div>
                      </div>

                      <div className="grid grid-cols-2 gap-8">
                         <div className="space-y-4">
                            <span className="text-[10px] font-mono font-black text-white/30 uppercase tracking-widest">DATA_CONNECTIVITY</span>
                            <div className="flex items-center gap-4 p-4 border border-white/5 bg-white/[0.01]">
                               <Share2 size={16} className="text-[#FF0000]" />
                               <p className="text-[11px] font-mono font-black text-white/70 uppercase">USB-C 10GBPS INTERFACE</p>
                            </div>
                            <div className="flex items-center gap-4 p-4 border border-white/5 bg-white/[0.01]">
                               <Activity size={16} className="text-[#FF0000]" />
                               <p className="text-[11px] font-mono font-black text-white/70 uppercase">12G-SDI OUTPUT (4K 60P)</p>
                            </div>
                         </div>
                         <div className="space-y-4">
                            <span className="text-[10px] font-mono font-black text-white/30 uppercase tracking-widest">MONITORING</span>
                            <div className="flex items-center gap-4 p-4 border border-white/5 bg-white/[0.01]">
                               <Eye size={16} className="text-[#FF0000]" />
                               <p className="text-[11px] font-mono font-black text-white/70 uppercase">2.4" INTEGRATED LCD</p>
                            </div>
                            <div className="flex items-center gap-4 p-4 border border-white/5 bg-white/[0.01]">
                               <Radio size={16} className="text-[#FF0000]" />
                               <p className="text-[11px] font-mono font-black text-white/70 uppercase">IP LIVE BROADCAST CAPABLE</p>
                            </div>
                         </div>
                      </div>
                    </div>

                    {/* DEEP SPEC BREAKDOWN */}
                    <div className="lg:col-span-5 space-y-12 lg:border-l lg:border-white/10 lg:pl-12">
                      <div className="space-y-6">
                         <h5 className="text-xl font-heading font-black text-white uppercase tracking-tight flex items-center gap-4">
                            <span className="w-8 h-px bg-[#FF0000]"></span>
                            SENSOR CORE
                         </h5>
                         <div className="space-y-4">
                            <div className="flex justify-between items-end border-b border-white/10 pb-4">
                               <span className="text-[10px] font-mono font-black text-white/40 uppercase">ACTIVE_PIXELS</span>
                               <span className="text-sm font-heading font-black text-white uppercase">6144 X 3240 (6K)</span>
                            </div>
                            <div className="flex justify-between items-end border-b border-white/10 pb-4">
                               <span className="text-[10px] font-mono font-black text-white/40 uppercase">SENSOR_SIZE</span>
                               <span className="text-sm font-heading font-black text-white uppercase">27.03MM X 14.26MM (S35)</span>
                            </div>
                            <div className="flex justify-between items-end border-b border-white/10 pb-4">
                               <span className="text-[10px] font-mono font-black text-white/40 uppercase">DYNAMIC_RANGE</span>
                               <span className="text-sm font-heading font-black text-white uppercase">16.5+ STOPS</span>
                            </div>
                            <div className="flex justify-between items-end border-b border-white/10 pb-4">
                               <span className="text-[10px] font-mono font-black text-white/40 uppercase">SHUTTER_TYPE</span>
                               <span className="text-sm font-heading font-black text-[#FF0000] uppercase">GLOBAL SHUTTER</span>
                            </div>
                         </div>
                      </div>

                      <div className="space-y-6">
                         <h5 className="text-xl font-heading font-black text-white uppercase tracking-tight flex items-center gap-4">
                            <span className="w-8 h-px bg-[#FF0000]"></span>
                            PERFORMANCE
                         </h5>
                         <div className="space-y-4">
                            <div className="flex justify-between items-end border-b border-white/10 pb-4">
                               <span className="text-[10px] font-mono font-black text-white/40 uppercase">MAX_FRAME_RATE (6K)</span>
                               <span className="text-sm font-heading font-black text-white uppercase">80 FPS (17:9)</span>
                            </div>
                            <div className="flex justify-between items-end border-b border-white/10 pb-4">
                               <span className="text-[10px] font-mono font-black text-white/40 uppercase">MAX_FRAME_RATE (4K)</span>
                               <span className="text-sm font-heading font-black text-white uppercase">120 FPS (17:9)</span>
                            </div>
                            <div className="flex justify-between items-end border-b border-white/10 pb-4">
                               <span className="text-[10px] font-mono font-black text-white/40 uppercase">MAX_FRAME_RATE (2K)</span>
                               <span className="text-sm font-heading font-black text-white uppercase">240 FPS (17:9)</span>
                            </div>
                            <div className="flex justify-between items-end border-b border-white/10 pb-4">
                               <span className="text-[10px] font-mono font-black text-white/40 uppercase">BURST_MODE</span>
                               <span className="text-sm font-heading font-black text-white uppercase">UP TO 560MB/S DATA</span>
                            </div>
                         </div>
                      </div>

                      <div className="p-8 bg-[#FF0000]/5 border border-[#FF0000]/30 relative overflow-hidden group/box">
                         <div className="absolute top-0 right-0 p-4 text-[#FF0000]/20 group-hover/box:text-[#FF0000]/40 transition-colors">
                            <Award size={48} />
                         </div>
                         <h6 className="text-lg font-heading font-black text-white uppercase mb-4 tracking-tighter">NETFLIX_CERTIFIED</h6>
                         <p className="text-xs font-heading font-bold text-white/60 uppercase leading-relaxed mb-6">
                            FULLY VALIDATED BY NETFLIX FOR 4K CONTENT DELIVERY. THE KOMODO-X MEETS THE STRICTEST SENSOR AND RECORDING STANDARDS IN WORLDWIDE BROADCAST.
                         </p>
                         <button className="text-[9px] font-mono font-black text-[#FF0000] uppercase tracking-[0.3em] hover:underline">
                            VIEW_CERTIFICATION_LOGS
                         </button>
                      </div>

                      <div className="aspect-video relative overflow-hidden border border-white/10 shadow-xl bg-black">
                         <img 
                           src="https://images.red.com/komodo-x/slide-io-array-blk.png" 
                           className="w-full h-full object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700" 
                           alt="RED Komodo-X I/O Ports" 
                         />
                         <div className="absolute top-4 right-4 bg-black/80 px-2 py-1 text-[7px] font-mono text-white/90 uppercase font-black border border-white/10">EXPANSION_ARRAY_REAR</div>
                      </div>
                    </div>
                  </div>

                  {/* BOTTOM FOOTER BAR */}
                  <div className="p-8 lg:p-12 bg-white flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/10">
                     <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-[#FF0000] flex items-center justify-center text-black shrink-0">
                           <Star size={24} />
                        </div>
                        <div>
                           <p className="text-[11px] font-mono font-black text-black uppercase tracking-widest leading-none mb-1">OPTICAL_EXCELLENCE</p>
                           <p className="text-sm font-heading font-black text-black/40 uppercase leading-none">THE INDUSTRY-STANDARD S35 SENSOR.</p>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <div className="px-6 py-3 border border-black/10 text-black font-mono font-black text-[10px] uppercase tracking-widest">IPP2_COLOR_PIPELINE</div>
                        <div className="px-6 py-3 border border-black/10 text-black font-mono font-black text-[10px] uppercase tracking-widest">REDCODE_RAW_16BIT</div>
                     </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-12">
        <div className="lg:col-span-8">
          <div className="relative group cursor-pointer aspect-video overflow-hidden border border-white/20 bg-black" onClick={() => setIsModalOpen(true)}>
            <img src={`https://img.youtube.com/vi/${activeProject.id}/maxresdefault.jpg`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-40 group-hover:opacity-100" alt="" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 sm:w-24 sm:h-24 border border-white/40 flex items-center justify-center rounded-full group-hover:bg-[#CCFF00] group-hover:border-[#CCFF00] transition-all">
                <Play className="text-white group-hover:text-black ml-1" size={32} />
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-all">
               <div>
                  <span className="text-[10px] font-mono text-[#CCFF00] uppercase font-bold block mb-1">PROJECT_VIEW</span>
                  <h4 className="text-2xl font-heading font-black text-white uppercase tracking-tighter">{activeProject.title}</h4>
               </div>
               <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">{activeProject.company}</span>
            </div>
          </div>
          
          {/* PROJECT INFO BOX */}
          <motion.div 
            key={activeProject.id}
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-10 lg:p-12 bg-white/[0.02] border border-white/10 brutalist-panel text-left relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Info size={100} className="text-white" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 bg-[#CCFF00] rounded-full animate-pulse" />
                <span className="text-[10px] font-mono tracking-[0.3em] text-[#CCFF00] uppercase font-black">CASE_STUDY_INTEL</span>
              </div>
              <h4 className="text-3xl lg:text-4xl font-heading font-black text-white uppercase tracking-tighter mb-4 leading-none">{activeProject.title}</h4>
              <p className="text-base lg:text-lg font-heading font-medium text-white/60 uppercase leading-relaxed tracking-wide">
                {activeProject.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                 <span className="px-3 py-1 bg-[#CCFF00]/10 border border-[#CCFF00]/20 text-[9px] font-mono text-[#CCFF00] uppercase tracking-widest font-black">PROJECT FOR: {activeProject.company}</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="lg:col-span-4 flex flex-col gap-3">
          <div className="flex-1 space-y-3 overflow-y-auto no-scrollbar max-h-[400px] lg:max-h-none">
            {projects.map(p => (
              <button key={p.id} onClick={() => setActiveProject(p)} className={`w-full p-4 sm:p-6 text-left border transition-all flex items-center justify-between group ${activeProject.id === p.id ? 'bg-white text-black border-white' : 'bg-transparent border-white/10 text-white hover:border-white/40'}`}>
                <div className="min-w-0">
                  <p className={`text-[9px] font-mono font-bold uppercase mb-1 ${activeProject.id === p.id ? 'text-black/40' : 'text-white/40'}`}>{p.company}</p>
                  <p className="font-heading font-black uppercase text-xs sm:text-sm truncate">{p.title}</p>
                </div>
                <ChevronRight size={16} className={`shrink-0 transition-transform ${activeProject.id === p.id ? 'translate-x-1' : ''}`} />
              </button>
            ))}
          </div>
          <button onClick={onConsultation} className="w-full py-6 sm:py-8 bg-[#CCFF00] text-black font-heading font-black text-xs tracking-[0.2em] uppercase mt-4 hover:translate-x-2 transition-transform shadow-[10px_10px_0_rgba(204,255,0,0.1)]">
            BOOK_A_CHAT
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && <VideoModal id={activeProject.id} title={activeProject.title} onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </div>
  );
};