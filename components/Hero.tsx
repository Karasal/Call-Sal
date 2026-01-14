import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, ChevronRight, X, Activity, Target, Terminal, Cpu, Layers, Database, Shield, Bot, 
  GitBranch, TrendingUp, MonitorPlay, Heart, Radio, Camera, Award, Star, Info, Zap, 
  Settings, HardDrive, Share2, Eye, Focus, Move, Film, UserCheck, Clapperboard, Monitor, 
  Sparkles, Smile as SmileIcon, Box, Compass, MousePointer2, MessageSquare, Hammer, Laptop, 
  Video, Smartphone, CheckCircle, Code, Globe, Lock, Mic, Wind, ShieldCheck, Search, Server, 
  Cloud, Wifi, RefreshCw, FileText 
} from 'lucide-react';
import { getSalResponse } from '../services/geminiService';

interface SoftwareInfo {
  id: string;
  name: string;
  src: string;
  tagline: string;
  description: string;
  techStats: { label: string; value: string }[];
  url: string;
}

const softwareData: Record<string, SoftwareInfo> = {
  davinci: {
    id: 'davinci',
    name: "DaVinci Resolve Studio",
    src: "https://upload.wikimedia.org/wikipedia/commons/4/4d/DaVinci_Resolve_Studio.png",
    tagline: "The Hollywood Standard for Color Grading.",
    description: "The world's most advanced solution for color correction, editing, and audio post-production. We use Resolve Studio to master every frame in 32-bit float color, ensuring your brand visuals meet the same technical standards as major theatrical releases.",
    techStats: [
      { label: "Precision", value: "32-bit Float" },
      { label: "Industry Use", value: "90% of Cinema" },
      { label: "Engine", value: "DaVinci Neural" }
    ],
    url: "https://www.blackmagicdesign.com/ca/products/davinciresolve"
  },
  dehancer: {
    id: 'dehancer',
    name: "Dehancer Film Emulation",
    src: "https://upload.wikimedia.org/wikipedia/commons/5/55/DehancerAppLogo.png?20240122135855",
    tagline: "Authentic Analog Texture & Chemistry.",
    description: "Dehancer allows us to bypass the sterile 'digital' look of modern cameras. It accurately simulates the chemical reaction of light on legendary film stocks, including optical halation, bloom, and organic grain profiles that add psychological weight to your story.",
    techStats: [
      { label: "Stocks", value: "60+ Emulations" },
      { label: "Effects", value: "Real Halation" },
      { label: "Texture", value: "Chemical Grain" }
    ],
    url: "https://www.dehancer.com/"
  },
  topaz: {
    id: 'topaz',
    name: "Topaz Video AI",
    src: "https://cdn.prod.website-files.com/6005fac27a49a9cd477afb63/68af97376fbc83545d307491_icon-topaz-video.svg",
    tagline: "Neural Reconstruction & Upscaling.",
    description: "Production-grade AI models trained specifically for video enhancement. We use Topaz to reconstruct detail in raw footage, perform ultra-smooth frame interpolation, and upscale content to 8K while maintaining surgical sharpness and zero digital artifacts.",
    techStats: [
      { label: "Upscaling", value: "Up to 16K" },
      { label: "AI Models", value: "Iris / Proteus" },
      { label: "Function", value: "Motion Deblur" }
    ],
    url: "https://www.topazlabs.com/topaz-video"
  }
};

const AnvilIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M7 10h10" />
    <path d="M3 10c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2h-1c-1.1 0-2 .9-2 2v2c0 1.1-.9 2-2 2H9c-1.1 0-2-.9-2-2v-2c0-1.1-.9-2-2-2H4c-1.1 0-2-.9-2-2v-2z" />
    <path d="M12 8V4" />
    <path d="M10 4h4" />
  </svg>
);

const CapabilityBar = ({ label, value, color = "#CCFF00" }: { label: string, value: number, color?: string }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center text-[9px] font-mono font-black uppercase tracking-widest text-white/40">
      <span>{label}</span>
      <span style={{ color }}>{value}%</span>
    </div>
    <div className="h-1 bg-white/5 relative overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="h-full"
        style={{ backgroundColor: color }}
      />
    </div>
  </div>
);

const PixelNerdSal = ({ state }: { state: 'idle' | 'typing' | 'happy' }) => {
  return (
    <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-black border-2 border-[#CCFF00] overflow-hidden p-2 flex items-center justify-center shadow-[4px_4px_0_#CCFF00] shrink-0">
      <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(rgba(204,255,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(204,255,0,0.1)_1px,transparent_1px)] bg-[size:4px_4px]" />
      <motion.div 
        animate={{ y: [0, 100, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-full h-[2px] bg-[#CCFF00]/40 z-10 pointer-events-none"
      />
      <motion.svg 
        viewBox="0 0 100 100" 
        className="w-full h-full text-[#CCFF00] relative z-0 drop-shadow-[0_0_8px_rgba(204,255,0,0.5)]"
        animate={state === 'typing' ? { scale: [1, 1.05, 1], y: [0, -2, 0] } : {}}
        transition={{ repeat: Infinity, duration: 0.15 }}
      >
        <g stroke="currentColor" strokeWidth="4" fill="none">
          <rect x="15" y="35" width="30" height="20" />
          <rect x="55" y="35" width="30" height="20" />
          <path d="M45 45 H55" />
          <path d="M15 45 H5" />
          <path d="M85 45 H95" />
        </g>
        <motion.g fill="currentColor" animate={state === 'idle' ? { scaleY: [1, 1, 0, 1] } : {}} transition={{ repeat: Infinity, duration: 3, times: [0, 0.9, 0.95, 1] }}>
           <rect x="25" y="42" width="10" height="6" />
           <rect x="65" y="42" width="10" height="6" />
        </motion.g>
        <motion.path 
          d={state === 'happy' ? "M30 65 Q50 85 70 65" : "M35 70 H65"}
          stroke="currentColor" 
          strokeWidth="4" 
          fill="none" 
          strokeLinecap="round"
          animate={state === 'happy' ? { scale: [1, 1.1, 1] } : {}}
        />
      </motion.svg>
    </div>
  );
};

const IntegratedSalBot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: "SYSTEM: INITIALIZING NEURAL_LINK...\n\nHi - I'm your new pal, Sal! 👋\n\nI build the tools that run your business while you sleep. Tell me: what's your biggest business headache right now?" }
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
    <div className="glass-2 w-full flex flex-col border-[#CCFF00]/40 overflow-hidden shadow-[20px_20px_0_rgba(255,255,255,0.05)] h-[550px] lg:h-[650px] relative">
      <div className="p-4 sm:p-6 border-b border-[#CCFF00]/20 bg-black flex flex-col sm:flex-row items-center gap-6 z-20 shrink-0">
        <PixelNerdSal state={isTyping ? 'typing' : (messages.length > 1 ? 'happy' : 'idle')} />
        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3 mb-1">
            <div className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
            <span className="text-[12px] font-mono font-black tracking-widest text-[#CCFF00] uppercase">SAL_BOT_V4_ONLINE</span>
          </div>
          <p className="text-[9px] font-mono text-white/40 uppercase leading-tight max-w-[200px]">
            NEURAL_ENGINE: READY<br />ADVISORY_MODE: ACTIVE<br />STATUS: AWAITING_INPUT
          </p>
        </div>
        <div className="hidden xl:flex flex-col items-end opacity-20">
           <Terminal size={18} className="text-[#CCFF00]" />
        </div>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden bg-[#050505]">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 font-mono text-[11px] sm:text-xs custom-scrollbar">
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }} animate={{ opacity: 1, x: 0 }} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 border ${m.role === 'user' ? 'bg-[#CCFF00] text-black font-black border-[#CCFF00] shadow-[6px_6px_0_rgba(204,255,0,0.2)]' : 'border-white/10 text-white/90 bg-white/5 backdrop-blur-sm'}`}>
                  {m.text.split('\n').map((line, idx) => (
                    <p key={idx} className="mb-2 last:mb-0 leading-relaxed">{line}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && <div className="text-[#CCFF00] animate-pulse text-[10px] font-black uppercase tracking-widest">[ SAL_IS_PROCESSING_INTEL... ]</div>}
        </div>
        <div className="p-4 sm:p-6 border-t border-white/10 bg-black shrink-0">
          <div className="relative">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAudit()} placeholder="Ask me how I can help..." className="w-full bg-transparent border-b border-[#CCFF00]/50 py-3 sm:py-4 pr-12 focus:outline-none focus:border-[#CCFF00] text-sm font-mono text-[#CCFF00] placeholder:text-[#CCFF00]/20" />
            <button onClick={handleAudit} className="absolute right-0 top-1/2 -translate-y-1/2 text-[#CCFF00] hover:scale-125 transition-transform p-2"><ChevronRight size={28} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SoftwareItem = ({ software, onClick }: { software: SoftwareInfo, onClick: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button onClick={onClick} className="relative flex items-center justify-center group cursor-pointer h-8 lg:h-12 px-2 outline-none" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <motion.img animate={{ opacity: isHovered ? 0.1 : 1, scale: isHovered ? 0.85 : 1 }} src={software.src} className="h-6 lg:h-8 w-auto object-contain transition-all duration-300" alt={software.name} />
      <AnimatePresence>
        {isHovered && <motion.span initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="absolute inset-0 flex items-center justify-center text-[7px] lg:text-[8px] font-mono font-black text-white text-center leading-none uppercase tracking-tighter">{software.name}</motion.span>}
      </AnimatePresence>
    </button>
  );
};

const SoftwareDetailModal = ({ software, onClose }: { software: SoftwareInfo, onClose: () => void }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[400] flex items-center justify-center p-4 lg:p-12 bg-black/98 backdrop-blur-3xl">
      <div className="max-w-4xl w-full glass-2 border-t-8 border-[#FF0000] p-8 lg:p-16 relative overflow-y-auto max-h-[90vh] custom-scrollbar shadow-[0_0_100px_rgba(255,0,0,0.2)]">
        <button onClick={onClose} className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors z-50"><X size={32} /></button>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div className="flex-1 space-y-10">
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-[0.5em] text-[#FF0000] uppercase font-black">VIDEO EDITING SOFTWARE</span>
              <div className="flex items-center gap-6">
                 <img src={software.src} className="h-12 lg:h-20 w-auto object-contain" alt="" />
                 <h3 className="text-3xl lg:text-6xl font-heading font-black text-white uppercase tracking-tighter leading-none">{software.name}</h3>
              </div>
            </div>
            <div className="space-y-6">
               <p className="text-xl lg:text-3xl font-heading font-black text-white/90 uppercase leading-tight tracking-tight border-l-4 border-[#FF0000] pl-6">{software.tagline}</p>
               <p className="text-sm lg:text-base font-heading font-medium text-white/50 uppercase leading-relaxed tracking-wide">{software.description}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
               {software.techStats.map((stat, i) => (
                 <div key={i} className="space-y-1">
                    <span className="text-[9px] font-mono text-white/30 uppercase block font-black tracking-widest">{stat.label}</span>
                    <span className="text-sm lg:text-lg font-heading font-black text-white uppercase">{stat.value}</span>
                 </div>
               ))}
            </div>
          </div>
          <div className="lg:w-[300px] flex flex-col justify-end gap-6 shrink-0">
             <div className="p-8 bg-white/5 border border-white/10 flex flex-col items-center text-center">
                <Activity className="text-[#FF0000] mb-4" size={40} />
                <p className="text-[10px] font-mono font-black text-white/40 uppercase tracking-widest leading-relaxed">SYSTEM INTEGRATED INTO MASTER PRODUCTION PIPELINE</p>
             </div>
             <a href={software.url} target="_blank" rel="noopener noreferrer" className="w-full py-6 bg-[#FF0000] text-black font-heading font-black text-[10px] tracking-[0.4em] uppercase text-center hover:bg-white transition-all shadow-2xl">VIEW FULL SPECS</a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const VideoModal = ({ id, title, onClose }: { id: string, title: string, onClose: () => void }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] flex items-center justify-center p-4 lg:p-12 bg-black/95 backdrop-blur-3xl">
      <div className="max-w-6xl w-full relative">
        <button onClick={onClose} className="absolute -top-12 right-0 text-white/40 hover:text-white transition-colors"><X size={32} /></button>
        <div className="aspect-video w-full bg-black shadow-2xl border border-white/10">
          <iframe src={`https://www.youtube.com/embed/${id}?autoplay=1`} title={title} className="w-full h-full" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
      </div>
    </motion.div>
  );
};

const TheArmory = ({ onShowSoftware }: { onShowSoftware: (s: SoftwareInfo) => void }) => {
  const [activeCategory, setActiveCategory] = useState<'software' | 'hardware'>('software');
  const [activeItem, setActiveItem] = useState(0);

  const armoryData = {
    software: [
      {
        id: 'biz-dev',
        title: 'BUSINESS DEVELOPMENT',
        blurb: 'We build tools that run your biz while you sleep.',
        icon: <Target size={20} />,
        status: "ACTIVE // OPTIMIZING",
        integrations: ["SALESFORCE", "HUBSPOT", "STRIPE", "SLACK"],
        content: (
          <div className="space-y-10">
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
               <h4 className="text-2xl lg:text-5xl font-heading font-black text-white uppercase tracking-tighter leading-none">THE PROFIT ENGINE</h4>
               <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" /><span className="text-[9px] font-mono text-[#CCFF00] font-black">LOGIC_ACTIVE</span></div>
            </div>
            <p className="text-sm lg:text-lg font-heading font-medium text-white/50 uppercase leading-relaxed tracking-wide">We constantly update our technology stack with the latest in <span className="text-[#CCFF00]">AI-Powered Agentic development</span> to create anything you can imagine.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-white/5 border border-white/10 space-y-6">
                <div className="flex items-center gap-3"><Database className="text-[#CCFF00]" size={16} /><span className="text-[10px] font-mono text-white/40 uppercase font-black">CAPABILITY_SYNC</span></div>
                <p className="text-xs lg:text-sm font-heading font-black text-white uppercase leading-tight">CUSTOM CRM & SALES DASHBOARDS BUILT FOR YOUR SPECIFIC WORKFLOW.</p>
              </div>
              <div className="p-8 bg-white/5 border border-white/10 space-y-6">
                <div className="flex items-center gap-3"><Globe className="text-[#CCFF00]" size={16} /><span className="text-[10px] font-mono text-white/40 uppercase font-black">ARCHITECTURE_FLOW</span></div>
                <p className="text-xs lg:text-sm font-heading font-black text-white uppercase leading-tight">FULL-STACK WEB APPLICATIONS THAT HANDLE BOOKINGS & PAYMENTS.</p>
              </div>
            </div>
            <div className="space-y-6">
              <span className="text-[10px] font-mono text-white/30 uppercase font-black tracking-widest block">NEURAL PERFORMANCE METRICS</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                 <CapabilityBar label="PROCESS AUTOMATION" value={95} />
                 <CapabilityBar label="LOGIC ACCURACY" value={88} />
                 <CapabilityBar label="RESPONSE SPEED" value={99} />
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'content-prod',
        title: 'CONTENT PRODUCTION',
        blurb: 'Hollywood visuals meet neural speed.',
        icon: <MonitorPlay size={20} />,
        status: "LIVE // RENDERING",
        integrations: ["DAVINCI", "ADOBE", "TOPAZ", "VEO"],
        content: (
          <div className="space-y-10">
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
               <h4 className="text-2xl lg:text-5xl font-heading font-black text-white uppercase tracking-tighter leading-none">THE CREATIVE SUITE</h4>
               <div className="flex items-center gap-3 bg-white/5 px-4 py-2 border border-white/10"><Radio size={14} className="text-red-500 animate-pulse" /><span className="text-[9px] font-mono text-white/70 font-black">PROCESSING_8K_DATA</span></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
               <div className="lg:col-span-7 space-y-6">
                  <p className="text-sm lg:text-lg font-heading font-medium text-white/50 uppercase leading-relaxed tracking-wide">We leverage the world's most powerful software for cinematic output. <span className="text-[#CCFF00]">Adobe Suite</span> and <span className="text-[#CCFF00]">DaVinci Resolve Studio</span> for high-end custom cinematic work.</p>
               </div>
               <div className="lg:col-span-5 bg-white/[0.02] border border-white/5 p-6 space-y-6">
                  <span className="text-[10px] font-mono text-white/30 uppercase font-black">MASTERING_PROTOCOL</span>
                  <div className="space-y-4">
                     {[{ label: "COLOR SCIENCE", val: "ACES // 32-BIT" }, { label: "UPSCALING", val: "NEURAL IRIS V4" }].map(row => (
                       <div key={row.label} className="flex justify-between items-center border-b border-white/5 pb-2">
                          <span className="text-[8px] font-mono text-white/40 uppercase">{row.label}</span>
                          <span className="text-[10px] font-heading font-black text-[#CCFF00] uppercase">{row.val}</span>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
            <div className="flex flex-wrap items-center gap-6 p-8 bg-white/5 border border-white/10 overflow-hidden relative">
               <SoftwareItem software={softwareData.davinci} onClick={() => onShowSoftware(softwareData.davinci)} />
               <SoftwareItem software={softwareData.dehancer} onClick={() => onShowSoftware(softwareData.dehancer)} />
               <SoftwareItem software={softwareData.topaz} onClick={() => onShowSoftware(softwareData.topaz)} />
            </div>
          </div>
        )
      },
      {
        id: 'neural-auto',
        title: 'NEURAL AUTOMATION',
        blurb: 'Your digital workforce, active 24/7.',
        icon: <Bot size={20} />,
        status: "STANDBY // MONITORING",
        integrations: ["GEMINI 3 PRO", "CLAUDE 3.5", "ZAPIER", "MAKE"],
        content: (
          <div className="space-y-10">
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
               <h4 className="text-2xl lg:text-5xl font-heading font-black text-white uppercase tracking-tighter leading-none">THE AUTONOMOUS BRAIN</h4>
               <div className="flex items-center gap-2 text-[#CCFF00]"><Terminal size={16} /><span className="text-[10px] font-mono font-black uppercase">SHELL_ACCESS: GRANTED</span></div>
            </div>
            <p className="text-sm lg:text-lg font-heading font-medium text-white/50 uppercase leading-relaxed tracking-wide">We build "Agentic" workflows—AI employees that don't just chat, but <span className="text-[#CCFF00]">actually do work</span>.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
               {[{ title: "LEAD TRIAGE", icon: <UserCheck size={18} /> }, { title: "DATA SYNC", icon: <RefreshCw size={18} /> }, { title: "AUTO-REPORTS", icon: <FileText size={18} /> }].map((box, i) => (
                 <div key={i} className="p-6 bg-white/5 border border-white/10 flex flex-col items-center text-center group hover:bg-[#CCFF00]/5 transition-all">
                    <div className="text-[#CCFF00] mb-4 group-hover:scale-110 transition-transform">{box.icon}</div>
                    <span className="text-[11px] font-heading font-black text-white uppercase block mb-1">{box.title}</span>
                 </div>
               ))}
            </div>
            <div className="p-8 border-l-4 border-[#CCFF00] bg-white/[0.02] relative overflow-hidden">
               <div className="relative z-10 flex flex-col md:flex-row justify-between gap-6">
                  <div className="max-w-md"><p className="text-xs lg:text-sm font-heading font-bold text-white/60 uppercase leading-relaxed">"Powered by customized LLM deployments including Google Gemini 3 and private models."</p></div>
                  <div className="flex flex-col gap-2 shrink-0">
                     <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500" /> <span className="text-[8px] font-mono text-white/50 uppercase">ENCRYPTION: AES-256</span></div>
                     <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500" /> <span className="text-[8px] font-mono text-white/50 uppercase">LATENCY: {"<"} 250MS</span></div>
                  </div>
               </div>
            </div>
          </div>
        )
      },
      {
        id: 'web-arch',
        title: 'WEB ARCHITECTURE',
        blurb: 'Beautiful sites that convert visitors.',
        icon: <Globe size={20} />,
        status: "PUBLISHED // SEO_STABLE",
        integrations: ["REACT 19", "VITE", "FRAMER", "VERCEL"],
        content: (
          <div className="space-y-10">
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
               <h4 className="text-2xl lg:text-5xl font-heading font-black text-white uppercase tracking-tighter leading-none">STARK DESIGN</h4>
               <div className="flex items-center gap-2 border border-white/10 rounded-full px-4 py-1"><Wifi size={12} className="text-[#CCFF00]" /><span className="text-[9px] font-mono text-white/40 font-black">HTTPS_SECURE</span></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {[{ label: "MOBILE-FIRST", icon: <Smartphone /> }, { label: "ULTRA-FAST", icon: <Zap /> }, { label: "SEO READY", icon: <Search /> }, { label: "CONVERSION FLOW", icon: <Target /> }].map((item, i) => (
                 <div key={i} className="flex gap-6 p-6 bg-white/5 border border-white/10 group hover:border-[#CCFF00]/40 transition-all">
                    <div className="text-[#CCFF00] mt-1 shrink-0">{item.icon}</div>
                    <p className="text-xs lg:text-sm font-heading font-black text-white uppercase leading-none">{item.label}</p>
                 </div>
               ))}
            </div>
          </div>
        )
      }
    ],
    hardware: [
      {
        id: 'workstation',
        title: 'THE FOUNDRY',
        blurb: 'Pure computing power for lightning results.',
        icon: <Cpu size={20} />,
        status: "RUNNING // 42°C",
        content: (
          <div className="space-y-10">
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
               <h4 className="text-2xl lg:text-5xl font-heading font-black text-white uppercase tracking-tighter leading-none">COMPUTATIONAL CORE</h4>
               <Settings size={20} className="text-white/20 animate-spin" style={{ animationDuration: '4s' }} />
            </div>
            <div className="p-10 border-2 border-[#CCFF00] bg-[#CCFF00]/5 flex flex-col gap-8 relative overflow-hidden group">
               <div className="flex items-center gap-8 relative z-10">
                 <div className="w-16 h-16 bg-[#CCFF00] flex items-center justify-center text-black shrink-0 shadow-[0_0_30px_rgba(204,255,0,0.3)]"><Zap size={32} /></div>
                 <div><span className="text-[10px] font-mono font-black text-white/40 uppercase block mb-1">GPU_ACCELERATION</span><span className="text-2xl lg:text-4xl font-heading font-black text-white uppercase tracking-tighter">NVIDIA RTX 4090 24GB VRAM</span></div>
               </div>
               <div className="flex items-center gap-8 border-t border-white/10 pt-8 relative z-10">
                 <div className="w-16 h-16 bg-[#CCFF00] flex items-center justify-center text-black shrink-0 shadow-[0_0_30px_rgba(204,255,0,0.3)]"><Database size={32} /></div>
                 <div><span className="text-[10px] font-mono font-black text-white/40 uppercase block mb-1">SYSTEM_MEMORY</span><span className="text-2xl lg:text-4xl font-heading font-black text-white uppercase tracking-tighter">64GB DDR5 6000MHz</span></div>
               </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
               <div className="p-6 bg-white/5 border border-white/10 flex items-center gap-4"><HardDrive className="text-white/30" size={24} /><div><p className="text-[9px] font-mono text-white/30 uppercase">STORAGE</p><p className="text-lg font-heading font-black text-white uppercase">7,500 MB/S NVMe</p></div></div>
               <div className="p-6 bg-white/5 border border-white/10 flex items-center gap-4"><Server className="text-white/30" size={24} /><div><p className="text-[9px] font-mono text-white/30 uppercase">NETWORK</p><p className="text-lg font-heading font-black text-white uppercase">10GbE OPTICAL</p></div></div>
            </div>
          </div>
        )
      },
      {
        id: 'filmmaking',
        title: 'CINEMATIC RIG',
        blurb: 'The same gear used on Netflix hits.',
        icon: <Video size={20} />,
        status: "LOCKED // READY",
        content: (
          <div className="space-y-10">
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
               <h4 className="text-2xl lg:text-5xl font-heading font-black text-white uppercase tracking-tighter leading-none">THE OPTICAL BRAIN</h4>
               <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-red-500" /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
               <div className="relative group overflow-hidden border border-white/10 aspect-video bg-black shadow-2xl">
                  <img src="https://images.red.com/komodo-x/kx-rf-main-features-2x.jpg" className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-all duration-1000" alt="" />
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md p-4 border border-white/10"><p className="text-lg font-heading font-black text-white uppercase leading-none">RED KOMODO-X 6K</p></div>
               </div>
               <div className="bg-white/5 border border-white/10 p-8 flex flex-col justify-between">
                  <div className="space-y-3">
                       {[{ label: "SENSOR", val: "S35 GLOBAL" }, { label: "RES", val: "6144 X 3240" }, { label: "DR", val: "16.5+ STOPS" }].map(spec => (
                         <div key={spec.label} className="flex justify-between items-center border-b border-white/5 pb-2"><span className="text-[8px] font-mono text-white/40 uppercase">{spec.label}</span><span className="text-[11px] font-heading font-black text-white uppercase">{spec.val}</span></div>
                       ))}
                  </div>
               </div>
            </div>
          </div>
        )
      },
      {
        id: 'lenses',
        title: 'OPTICAL GLASS',
        blurb: 'Iconic widescreen flares and bokeh.',
        icon: <Eye size={20} />,
        status: "CALIBRATED // OPTIMAL",
        content: (
          <div className="space-y-10">
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
               <h4 className="text-2xl lg:text-5xl font-heading font-black text-white uppercase tracking-tighter leading-none">ANAMORPHIC GLASS</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {[{ src: "https://cdn.shopifycdn.net/s/files/1/0449/9344/6037/files/v1-1.jpg?v=1677661259", label: "OVAL BOKEH" }, { src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80", label: "2.40:1 ASPECT" }, { src: "https://images.unsplash.com/photo-1492691523567-6170f0295dbd?auto=format&fit=crop&w=400&q=80", label: "BLUE FLARES" }].map((img, i) => (
                 <div key={i} className="group relative overflow-hidden border border-white/5 aspect-square bg-black shadow-xl">
                    <img src={img.src} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" alt="" />
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black to-transparent"><p className="text-xs font-heading font-black text-white uppercase leading-none">{img.label}</p></div>
                 </div>
               ))}
            </div>
          </div>
        )
      },
      {
        id: 'motion',
        title: 'STABILIZATION',
        blurb: 'Smooth rock-steady camera movement.',
        icon: <Move size={20} />,
        status: "BALANCED // LiDAR_ARMED",
        content: (
          <div className="space-y-10">
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
               <h4 className="text-2xl lg:text-5xl font-heading font-black text-white uppercase tracking-tighter leading-none">PRECISION CONTROL</h4>
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full border border-[#CCFF00] flex items-center justify-center"><div className="w-1 h-1 bg-[#CCFF00] rounded-full animate-ping" /></div><span className="text-[10px] font-mono text-[#CCFF00] font-black uppercase">LASER_LOCK</span></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
               <div className="p-8 bg-white/5 border border-white/10 group hover:border-[#CCFF00]/30 transition-all">
                  <div className="flex items-center gap-6 mb-6"><Focus className="text-[#CCFF00] group-hover:scale-125 transition-transform" size={32} /><div><p className="text-xs lg:text-sm font-heading font-black text-white uppercase mb-1">LiDAR RANGEFINDER</p></div></div>
                  <p className="text-[10px] font-sans font-medium text-white/40 uppercase leading-relaxed">Our LiDAR system maps the environment in 3D using lasers, keeping you in perfect focus.</p>
               </div>
               <div className="p-8 bg-white/5 border border-white/10 group hover:border-[#CCFF00]/30 transition-all">
                  <div className="flex items-center gap-6 mb-6"><Activity className="text-[#CCFF00] group-hover:scale-125 transition-transform" size={32} /><div><p className="text-xs lg:text-sm font-heading font-black text-white uppercase mb-1">3-AXIS ALGORITHM</p></div></div>
                  <p className="text-[10px] font-sans font-medium text-white/40 uppercase leading-relaxed">Rock-steady motion control even with heavy cinema payloads.</p>
               </div>
            </div>
          </div>
        )
      }
    ]
  };

  const currentItems = armoryData[activeCategory];
  const selectedData = currentItems[activeItem];

  return (
    <div className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-[#CCFF00] flex items-center justify-center text-black shadow-[8px_8px_0_rgba(204,255,0,0.1)]"><AnvilIcon size={40} /></div>
            <div>
              <h2 className="text-4xl lg:text-7xl font-heading font-black text-white uppercase tracking-tighter leading-none">THE ARMORY</h2>
              <span className="text-[10px] font-mono tracking-[0.5em] text-white/30 uppercase font-black block mt-2">WEAPONS_OF_CHOICE // V2.5</span>
            </div>
          </div>
          <div className="flex bg-white/5 border border-white/10 p-1">
            <button onClick={() => { setActiveCategory('software'); setActiveItem(0); }} className={`px-8 py-3 text-[11px] font-mono font-black uppercase transition-all ${activeCategory === 'software' ? 'bg-[#CCFF00] text-black' : 'text-white/40 hover:text-white'}`}>SOFTWARE</button>
            <button onClick={() => { setActiveCategory('hardware'); setActiveItem(0); }} className={`px-8 py-3 text-[11px] font-mono font-black uppercase transition-all ${activeCategory === 'hardware' ? 'bg-[#CCFF00] text-black' : 'text-white/40 hover:text-white'}`}>HARDWARE</button>
          </div>
        </div>
        <div className="brutalist-panel border-white/10 bg-black overflow-hidden flex flex-col md:flex-row h-[750px] lg:h-[850px] shadow-[0_50px_100px_rgba(0,0,0,0.8)] border-t-8 border-[#CCFF00] relative">
          <div className="absolute inset-0 pointer-events-none opacity-5 z-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%]" />
          <div className="w-full md:w-80 lg:w-96 border-r border-white/10 flex flex-col shrink-0 bg-white/[0.01] relative z-10">
            <div className="flex-1 overflow-y-auto no-scrollbar py-4">
              {currentItems.map((item: any, idx) => (
                <button key={item.id} onClick={() => setActiveItem(idx)} className={`w-full p-8 text-left transition-all border-b border-white/5 flex gap-6 items-start group ${activeItem === idx ? 'bg-white/[0.03] border-l-4 border-l-[#CCFF00]' : 'hover:bg-white/[0.01]'}`}>
                  <div className={`mt-1 transition-colors ${activeItem === idx ? 'text-[#CCFF00]' : 'text-white/20'}`}>{item.icon}</div>
                  <div>
                    <h4 className={`text-sm lg:text-lg font-heading font-black uppercase tracking-tight mb-2 ${activeItem === idx ? 'text-white' : 'text-white/40'}`}>{item.title}</h4>
                    <p className={`text-[10px] font-heading font-medium uppercase tracking-tight leading-tight ${activeItem === idx ? 'text-white/60' : 'text-white/20'}`}>{item.blurb}</p>
                    {activeItem === idx && item.integrations && (
                      <div className="mt-4 flex flex-wrap gap-1">
                        {item.integrations.slice(0, 3).map((tag: string) => (
                          <span key={tag} className="text-[6px] font-mono border border-[#CCFF00]/20 px-1 py-0.5 text-[#CCFF00] uppercase">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
            <div className="p-8 border-t border-white/5 bg-black">
               <div className="flex justify-between items-center mb-2"><span className="text-[9px] font-mono text-white/30 uppercase tracking-[0.3em] font-black">SYSTEM_STABLE</span><div className="flex gap-0.5">{[...Array(3)].map((_, i) => (<div key={i} className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />))}</div></div>
               <div className="text-[7px] font-mono text-white/20 uppercase tracking-widest leading-none">CORE_FREQ: 5.4GHZ // THERMAL: OPTIMAL <br />THROUGHPUT: 400GB/S</div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-8 lg:p-20 bg-[#080808] relative z-10">
            <AnimatePresence mode="wait"><motion.div key={selectedData.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>{selectedData.content}</motion.div></AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Hero: React.FC<{ onStart: () => void, onConsultation: () => void }> = ({ onStart, onConsultation }) => {
  const portfolioRef = useRef<HTMLDivElement>(null);
  const [showOperatorDeepDive, setShowOperatorDeepDive] = useState(false);
  const [expandedHelpIndex, setExpandedHelpIndex] = useState<number | null>(null);
  const [selectedSoftware, setSelectedSoftware] = useState<SoftwareInfo | null>(null);
  
  const helpAccordionItems = [
    { title: "SILENT WORKERS", desc: "AI agents that handle your emails and tasks.", icon: <Bot size={16} className="text-[#CCFF00] mt-1 shrink-0" />, explanation: "Digital employees that never sleep. They triage your inbox and handle tasks with 100% accuracy." },
    { title: "SMOOTH PIPELINES", desc: "Data that flows from one app to another automatically.", icon: <GitBranch size={16} className="text-[#CCFF00] mt-1 shrink-0" />, explanation: "We connect your entire tech stack into a single, cohesive engine." },
    { title: "CONSTANT GROWTH", desc: "Systems that find and talk to leads non-stop.", icon: <TrendingUp size={16} className="text-[#CCFF00] mt-1 shrink-0" />, explanation: "A 24/7 lead generation machine." }
  ];

  return (
    <div className="relative">
      <div className="max-w-7xl mx-auto px-4 space-y-12 sm:space-y-20 lg:space-y-32">
        <div className="min-h-[75vh] flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 xl:gap-32 relative pt-8 pb-10">
          <div className="z-10 flex-1 w-full max-w-4xl text-left self-start lg:self-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="mb-8 flex items-center gap-4 cursor-pointer group" onClick={() => setShowOperatorDeepDive(true)}><div className="w-12 h-[2px] bg-[#CCFF00]" /><span className="text-[11px] font-mono tracking-[0.4em] text-[#CCFF00] uppercase font-bold leading-tight group-hover:underline">HOW I HELP YOU GROW [?]</span></div>
              <h1 className="text-[11vw] sm:text-6xl md:text-7xl lg:text-[4.5rem] xl:text-[8.5rem] font-heading font-black mb-8 leading-[0.85] tracking-tighter uppercase stark-gradient flex flex-col items-start"><span className="block whitespace-nowrap">"<span className="text-[#CCFF00]" style={{ WebkitTextFillColor: '#CCFF00' }}>HI</span> - IT'S</span><span className="block whitespace-nowrap">YOUR NEW</span><span className="block whitespace-nowrap pb-6 sm:pb-10">PAL, <span className="text-[#CCFF00]" style={{ WebkitTextFillColor: '#CCFF00' }}>SAL</span>!"</span></h1>
              <div className="text-[3.2vw] sm:text-lg md:text-xl lg:text-2xl text-white/60 mb-12 leading-tight font-heading font-medium border-l-2 border-[#CCFF00] pl-6 sm:pl-8 flex flex-col items-start gap-1"><span className="block whitespace-nowrap"><span className="text-[#CCFF00]">AI</span> IS CHANGING <span className="text-[#CCFF00]">EVERYTHING</span>.</span><span className="block whitespace-nowrap">YOUR <span className="text-[#CCFF00]">COMPETITION</span> IS ALREADY <span className="text-[#CCFF00]">PREPARING</span>.</span><span className="block whitespace-nowrap">I'M HERE TO MAKE SURE YOU <span className="text-[#CCFF00]">GET THERE FIRST</span>.</span></div>
              <div className="flex flex-wrap gap-6 mb-12"><button onClick={onStart} className="px-10 py-6 bg-[#CCFF00] text-black font-heading font-black text-xs tracking-[0.2em] uppercase hover:scale-105 transition-all shadow-[10px_10px_0_rgba(204,255,0,0.1)]">SEE MY PROCESS</button><button onClick={() => portfolioRef.current?.scrollIntoView({ behavior: 'smooth' })} className="px-10 py-6 border-2 border-white text-white font-heading font-black text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all">VIEW CINEMATICS</button></div>
            </motion.div>
          </div>
          <div className="z-10 flex-1 w-full lg:max-w-[480px] xl:max-w-[580px]"><motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}><IntegratedSalBot /></motion.div></div>
        </div>
      </div>
      <TheArmory onShowSoftware={(s) => setSelectedSoftware(s)} />
      <div ref={portfolioRef} className="py-20 border-t border-white/10"><VideoPortfolio onConsultation={onConsultation} onShowSoftware={(s) => setSelectedSoftware(s)} /></div>
      <AnimatePresence>{showOperatorDeepDive && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] flex items-center justify-center p-4 lg:p-8 bg-black/95 backdrop-blur-3xl"><div className="max-w-4xl w-full glass-2 p-8 lg:p-16 border-t-8 border-[#CCFF00] max-h-[90vh] overflow-y-auto custom-scrollbar relative"><button onClick={() => setShowOperatorDeepDive(false)} className="absolute top-6 right-6 lg:top-8 lg:right-8 text-white/40 hover:text-white transition-colors"><X size={32} /></button><div className="mb-10 lg:mb-12"><span className="text-[10px] font-mono tracking-[1em] text-[#CCFF00] uppercase font-bold block mb-4">THE_SAL_METHOD</span><h3 className="text-3xl lg:text-6xl font-heading font-black text-white uppercase tracking-tighter leading-none mb-6">WHY WORK <br />WITH ME?</h3><div className="h-1 w-24 bg-[#CCFF00]" /></div><div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"><div className="space-y-6"><div className="p-6 bg-white/5 border border-white/10"><h4 className="text-xl font-heading font-black text-white uppercase mb-4 tracking-tight">MY GOAL</h4><p className="text-sm font-heading font-medium text-white/60 uppercase leading-relaxed tracking-tight">I DON'T JUST SELL TOOLS. I BUILD CUSTOM SYSTEMS THAT WORK IN THE BACKGROUND.</p></div></div><div className="space-y-6 lg:space-y-8"><span className="text-[10px] font-mono text-white/30 uppercase tracking-widest block font-black">WHAT YOU GET</span><div className="space-y-4">{helpAccordionItems.map((m, i) => (<div key={i} onClick={() => setExpandedHelpIndex(expandedHelpIndex === i ? null : i)} className="cursor-pointer border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all overflow-hidden"><div className="flex gap-4 p-4 items-start">{m.icon}<div className="flex-1"><p className="text-[11px] font-heading font-black text-white uppercase mb-1">{m.title}</p><p className="text-[9px] font-sans font-bold text-white/40 uppercase tracking-widest">{m.desc}</p></div><ChevronRight size={14} className={`text-[#CCFF00] mt-1 transition-transform ${expandedHelpIndex === i ? 'rotate-90' : ''}`} /></div><AnimatePresence>{expandedHelpIndex === i && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-4 pb-4 border-t border-white/5"><p className="pt-3 text-[10px] font-sans font-medium text-white/40 uppercase leading-relaxed tracking-tight">{m.explanation}</p></motion.div>)}</AnimatePresence></div>))}</div></div></div></div></motion.div>)}</AnimatePresence>
      <AnimatePresence>{selectedSoftware && <SoftwareDetailModal software={selectedSoftware} onClose={() => setSelectedSoftware(null)} />}</AnimatePresence>
    </div>
  );
};

const VideoPortfolio = ({ onConsultation, onShowSoftware }: { onConsultation: () => void, onShowSoftware: (s: SoftwareInfo) => void }) => {
  const projects = [
    { id: "gxeU_tq7jH8", title: "SURVIVING THE SILENCE", company: "PETER HERBIG", description: "A gripping cinematic exploration of resilience." },
    { id: "RLwo8clXyZM", title: "THE SUPREME BARBERSHOP YYC", company: "KALEB BRUNNING", description: "Fast-paced, high-energy brand showcase." },
    { id: "2D6Dc7Pa_1s", title: "NATEFIT", company: "NATHANIEL ERNST", description: "A dynamic fitness journey documentary." },
    { id: "1a7M7Np5g10", title: "SPRING CLEANUP COMMERCIAL", company: "K&M LANDSCAPING", description: "Transforming outdoor spaces into living art." },
    { id: "RLUiuSgi0zU", title: "MAD BUILDERS", company: "MAD HOUSE", description: "Behind the scenes of architectural mastery." },
    { id: "Up0lNvLU230", title: "I AM MATHEW", company: "MAD HOUSE", description: "An intimate and evocative cinematic portrait." },
  ];
  const [activeProject, setActiveProject] = useState(projects[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="max-w-7xl mx-auto px-4 relative">
      <div className="mb-12 sm:mb-20"><div className="flex flex-col items-center text-center gap-10 lg:gap-16"><div className="w-full max-w-5xl mx-auto"><div className="flex items-center justify-center gap-4 mb-6"><div className="w-12 h-[1px] bg-[#CCFF00]" /><span className="text-[10px] font-mono tracking-[0.5em] text-[#CCFF00] uppercase font-black">HIGH-END DOCUMENTARY</span><div className="w-12 h-[1px] bg-[#CCFF00]" /></div><h2 className="text-6xl sm:text-8xl lg:text-[10rem] font-heading font-black text-white uppercase tracking-tighter stark-gradient mb-12">CINEMATICS.</h2><motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-12"><p className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black text-white uppercase leading-none tracking-tight">AI POWERS THE SCALE. <br /><span className="toxic-text">CINEMA CAPTURES THE SOUL.</span></p></motion.div></div></div></div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-12"><div className="lg:col-span-8"><div className="relative group cursor-pointer aspect-video overflow-hidden border border-white/20 bg-black" onClick={() => setIsModalOpen(true)}><img src={`https://img.youtube.com/vi/${activeProject.id}/maxresdefault.jpg`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-40 group-hover:opacity-100" alt="" /><div className="absolute inset-0 flex items-center justify-center"><div className="w-16 h-16 sm:w-24 sm:h-24 border border-white/40 flex items-center justify-center rounded-full group-hover:bg-[#CCFF00] group-hover:border-[#CCFF00] transition-all"><Play className="text-white group-hover:text-black ml-1" size={32} /></div></div></div><motion.div key={activeProject.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 p-10 lg:p-12 bg-white/[0.02] border border-white/10 brutalist-panel text-left relative overflow-hidden group"><div className="relative z-10"><div className="flex items-center gap-3 mb-6"><div className="w-2 h-2 bg-[#CCFF00] rounded-full animate-pulse" /><span className="text-[10px] font-mono tracking-[0.3em] text-[#CCFF00] uppercase font-black">CASE STUDY</span></div><h4 className="text-3xl lg:text-4xl font-heading font-black text-white uppercase tracking-tighter mb-4 leading-none">{activeProject.title}</h4><p className="text-base lg:text-lg font-heading font-medium text-white/60 uppercase leading-relaxed tracking-wide">{activeProject.description}</p></div></motion.div></div><div className="lg:col-span-4 flex flex-col gap-3"><div className="flex-1 space-y-3 overflow-y-auto no-scrollbar max-h-[400px] lg:max-h-none">{projects.map(p => (<button key={p.id} onClick={() => setActiveProject(p)} className={`w-full p-4 sm:p-6 text-left border transition-all flex items-center justify-between group ${activeProject.id === p.id ? 'bg-white text-black border-white' : 'bg-transparent border-white/10 text-white hover:border-white/40'}`}><div><p className={`text-[9px] font-mono font-bold uppercase mb-1 ${activeProject.id === p.id ? 'text-black/40' : 'text-white/40'}`}>{p.company}</p><p className="font-heading font-black uppercase text-xs sm:text-sm truncate">{p.title}</p></div><ChevronRight size={16} /></button>))}</div><button onClick={onConsultation} className="w-full py-6 sm:py-8 bg-[#CCFF00] text-black font-heading font-black text-xs tracking-[0.2em] uppercase mt-4 shadow-[10px_10px_0_rgba(204,255,0,0.1)]">BOOK_A_CHAT</button></div></div>
      <AnimatePresence>{isModalOpen && <VideoModal id={activeProject.id} title={activeProject.title} onClose={() => setIsModalOpen(false)} />}</AnimatePresence>
    </div>
  );
};
