import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, ChevronRight, ExternalLink, X, Layout, CheckCircle2, Zap, Cpu } from 'lucide-react';

interface DemoItem {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  externalUrl?: string;
  roi: string;
  tech: string[];
  color: string;
}

export const LiveDemos: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [selectedId, setSelectedId] = useState(1);
  const [showCaseStudy, setShowCaseStudy] = useState(false);

  const demos: DemoItem[] = [
    { 
      id: 1, 
      title: "INFOVISION", 
      category: "SMART DATA HELP", 
      description: "A tool that turns messy, complicated data into simple, beautiful charts and graphs that anyone can understand.", 
      image: "/infographic.png",
      externalUrl: "https://infovision.vercel.app/",
      roi: "40% Less Time Reading Reports",
      tech: ["Smart Mapping", "Real-time Charts"],
      color: "#CCFF00"
    },
    { 
      id: 2, 
      title: "CHROME BUILDER", 
      category: "ROBOT BUILDER", 
      description: "A specialized AI that can code and build fully working browser tools just by listening to your voice commands.", 
      image: "/chrome.png",
      externalUrl: "https://chrome-extension-builder-bot.vercel.app/",
      roi: "10x Faster Coding Speed",
      tech: ["AI Brain", "Auto-Code Scripts"],
      color: "#9333EA"
    },
    { 
      id: 3, 
      title: "SALSPEND", 
      category: "MONEY TRACKER", 
      description: "A smart tool that watches your spending and automatically finds where you are wasting money on subscriptions.", 
      image: "/salspend.png",
      externalUrl: "https://salspend.vercel.app/",
      roi: "$2k/mo Waste Detected",
      tech: ["AI Receipt Scanner", "Auto-Sorting Logic"],
      color: "#3B82F6"
    },
    { 
      id: 4, 
      title: "VIRAL FACTORY", 
      category: "CONTENT MAKER", 
      description: "A massive engine that makes hundreds of videos and stories for kids' channels every single hour.", 
      image: "/story.png",
      externalUrl: "https://story-book-debug.vercel.app/",
      roi: "100+ Videos Every Hour",
      tech: ["Image Gen AI", "Auto-Scripting"],
      color: "#F472B6"
    },
    { 
      id: 5, 
      title: "HISTORIA", 
      category: "CREATIVE HELP", 
      description: "A tool for creators that makes history come alive with AI-generated visuals and talking points.", 
      image: "/history.png",
      externalUrl: "https://historia-agent-asset-generator.vercel.app/",
      roi: "Lower Editing Costs",
      tech: ["Storytelling AI", "Visual Maker"],
      color: "#F97316"
    }
  ];

  const selectedDemo = demos.find(d => d.id === selectedId) || demos[0];

  const handleLaunch = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedDemo.externalUrl) { window.open(selectedDemo.externalUrl, '_blank'); }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 lg:py-20 px-4">
      {/* HUD Header */}
      <div className="mb-12 flex flex-col md:flex-row items-start lg:items-end justify-between gap-10">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
             <div className="w-12 h-[1px] bg-[#CCFF00]" />
             <span className="text-[10px] lg:text-[12px] font-mono tracking-[0.5em] text-[#CCFF00] uppercase font-black block">SYSTEM_LIVE_VIEW</span>
          </div>
          <h2 className="text-4xl sm:text-7xl lg:text-8xl font-heading font-black text-white uppercase tracking-tighter stark-gradient leading-[0.9]">
            THE NEURAL <br /> PORTFOLIO.
          </h2>
        </div>
        <div className="max-w-md border-l-2 lg:border-l-4 border-[#CCFF00] pl-6 lg:pl-10">
          <p className="text-white/60 text-[10px] lg:text-[11px] font-sans tracking-[0.2em] uppercase font-black leading-relaxed">
            I BUILD CUSTOM ECOSYSTEMS THAT SCALE. EACH PROJECT BELOW REPRESENTS A DEPLOYED ASSET RUNNING IN THE WILD. 
            <span className="text-[#CCFF00] ml-2 block mt-2">[ STATUS: ASSETS_LINKED ]</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-white/10 brutalist-panel overflow-hidden h-auto lg:h-[750px] shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative">
        {/* Main Display Area */}
        <div className="lg:col-span-8 flex flex-col h-full border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden bg-[#020202]">
          <div className="flex-1 min-h-[350px] relative overflow-hidden group bg-black">
            {/* Neural Scanlines overlay */}
            <div className="absolute inset-0 z-20 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={selectedDemo.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full relative"
              >
                <img 
                  src={selectedDemo.image} 
                  className="w-full h-full object-cover transition-all duration-700 ease-out grayscale-[30%] group-hover:grayscale-0" 
                  alt={selectedDemo.title}
                />
              </motion.div>
            </AnimatePresence>
            
            <div className="absolute inset-0 flex items-center justify-center p-6 z-40">
              <button 
                onClick={handleLaunch} 
                className="px-10 py-6 bg-white text-black font-heading font-black text-[10px] uppercase hover:bg-[#CCFF00] hover:scale-110 transition-all flex items-center gap-4 shadow-[0_20px_60px_rgba(0,0,0,0.5)] active:scale-95"
              >
                <Zap size={20} /> DEPLOY LIVE ENVIRONMENT
              </button>
            </div>
            
            <div className="absolute bottom-10 left-10 flex gap-4 pointer-events-none z-30">
              <div className="bg-[#CCFF00] text-black px-4 py-2 font-mono font-black text-[10px] uppercase tracking-widest">
                {selectedDemo.category}
              </div>
            </div>
          </div>
          
          <div className="bg-[#080808] p-8 lg:p-12 border-t border-white/10">
            <div className="flex justify-between items-start mb-6">
              <span className="text-[10px] font-mono tracking-[0.4em] text-white/30 uppercase font-black">NEURAL_PROJECT_MANIFEST:</span>
              <button onClick={() => setShowCaseStudy(true)} className="text-[10px] font-mono tracking-widest text-[#CCFF00] uppercase font-bold hover:underline">[DEEP_INTEL]</button>
            </div>
            <h3 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black text-white uppercase mb-6 tracking-tighter leading-none">{selectedDemo.title}</h3>
            <p className="text-sm sm:text-lg font-heading font-medium uppercase text-white/50 leading-tight max-w-3xl tracking-tight">{selectedDemo.description}</p>
            <div className="mt-10 flex flex-wrap gap-8 border-t border-white/5 pt-8">
               <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest text-white/80 uppercase font-black">
                  <CheckCircle2 size={14} className="text-[#CCFF00]" /> SYSTEM: VERIFIED
               </div>
               <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest text-white/80 uppercase font-black">
                  <Maximize2 size={14} className="text-white/20" /> ULTRA_LATENCY: OPTIMIZED
               </div>
               <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest text-[#CCFF00] uppercase font-black">
                  ROI: {selectedDemo.roi}
               </div>
            </div>
          </div>
        </div>

        {/* Sidebar / List */}
        <div className="lg:col-span-4 flex flex-col h-[400px] lg:h-full bg-[#050505] overflow-hidden">
          <div className="p-8 border-b border-white/10 flex justify-between bg-black/40">
            <span className="text-[11px] font-mono tracking-[0.4em] text-white/40 uppercase font-black">PROJECT_LOG</span>
            <span className="text-[11px] font-mono text-[#CCFF00] uppercase font-black">{demos.length} UNITS</span>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
            {demos.map((demo) => (
              <button 
                key={demo.id} 
                onMouseEnter={() => setSelectedId(demo.id)} 
                onClick={handleLaunch}
                className={`w-full group flex items-center gap-6 p-5 border transition-all text-left relative overflow-hidden ${selectedId === demo.id ? 'bg-white border-white text-black shadow-[0_0_30px_rgba(204,255,0,0.1)]' : 'bg-transparent border-white/5 hover:border-white/20 text-white'}`}
              >
                <div className="w-16 h-12 overflow-hidden shrink-0 border border-white/10 relative bg-black flex items-center justify-center">
                  <img 
                    src={demo.image} 
                    className={`w-full h-full object-cover ${selectedId === demo.id ? 'opacity-100' : 'grayscale opacity-30 group-hover:opacity-50 transition-all'}`} 
                    alt={demo.title} 
                  />
                  {selectedId === demo.id && <div className="absolute inset-0 border-2 border-black/10" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-heading font-black uppercase truncate tracking-tight">{demo.title}</h4>
                  <p className={`text-[9px] font-mono uppercase truncate tracking-widest ${selectedId === demo.id ? 'text-black/60' : 'text-white/20'}`}>{demo.category}</p>
                </div>
                {selectedId === demo.id && <ChevronRight size={18} className="translate-x-1" />}
              </button>
            ))}
          </div>
          <div className="p-8 bg-[#CCFF00] text-black">
             <div className="flex justify-between items-center mb-1">
               <p className="text-[9px] font-mono font-black uppercase tracking-[0.3em]">ACTIVE_STREAM</p>
               <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
             </div>
             <p className="text-sm font-heading font-black uppercase truncate tracking-tight">{selectedDemo.title}</p>
          </div>
        </div>
      </div>

      {/* Strategy Protocol Callout */}
      <div className="mt-24 lg:mt-32 brutalist-panel p-12 lg:p-24 text-center bg-white/[0.02] border-[#CCFF00]/20 shadow-[0_0_80px_rgba(204,255,0,0.05)]">
        <h3 className="text-4xl lg:text-7xl font-heading font-black text-white uppercase mb-8 stark-gradient leading-none tracking-tighter">READY TO UPGRADE?</h3>
        <p className="text-white/40 text-[11px] font-mono tracking-[0.4em] uppercase font-black mb-12 max-w-xl mx-auto">I ARCHITECT CUSTOM NEURAL WEB ECOSYSTEMS FOR CALGARY'S MOST INNOVATIVE OPERATORS.</p>
        <button onClick={onNext} className="mx-auto px-12 py-8 bg-[#CCFF00] text-black font-heading font-black text-[11px] tracking-[0.4em] uppercase hover:bg-white hover:scale-105 transition-all shadow-[0_20px_50px_rgba(204,255,0,0.2)]">
          INITIATE STRATEGY PROTOCOL
        </button>
      </div>

      <AnimatePresence>
        {showCaseStudy && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/98 backdrop-blur-3xl"
          >
             <div className="max-w-4xl w-full glass-2 p-10 lg:p-20 relative border-t-8 border-[#CCFF00] overflow-y-auto max-h-[90vh] custom-scrollbar shadow-[0_0_100px_rgba(204,255,0,0.1)]">
                <button onClick={() => setShowCaseStudy(false)} className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"><X size={32} /></button>
                <div className="mb-12">
                   <span className="text-[10px] font-mono tracking-[1em] text-[#CCFF00] uppercase font-bold block mb-4">ARCHITECT_INTEL_LOG</span>
                   <h3 className="text-4xl lg:text-7xl font-heading font-black text-white uppercase mb-6 leading-none tracking-tighter">{selectedDemo.title}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                   <div className="space-y-12">
                      <div className="bg-[#CCFF00] p-10 text-black">
                        <span className="text-[10px] font-mono font-black uppercase block mb-4 tracking-widest opacity-60">MEASURED_ROI</span>
                        <p className="text-3xl lg:text-5xl font-heading font-black uppercase leading-none tracking-tighter">{selectedDemo.roi}</p>
                      </div>
                      <div className="space-y-6">
                        <span className="text-[10px] font-mono text-white/30 uppercase block font-black tracking-widest">SYSTEM_UTILITY</span>
                        <p className="text-xl lg:text-3xl font-bold text-white/80 uppercase leading-tight tracking-tight">{selectedDemo.description}</p>
                      </div>
                   </div>
                   <div className="space-y-12">
                      <span className="text-[10px] font-mono text-white/30 uppercase block font-black tracking-widest">CORE_TECHNOLOGIES</span>
                      <div className="space-y-4">
                         {selectedDemo.tech.map((t, i) => (
                           <div key={i} className="flex items-center gap-6 p-6 bg-white/[0.03] border border-white/10 group hover:border-[#CCFF00]/50 transition-all">
                              <Layout size={24} className="text-[#CCFF00]" />
                              <span className="text-xs lg:text-sm font-mono font-black text-white/90 uppercase tracking-widest">{t}</span>
                           </div>
                         ))}
                      </div>
                      <div className="pt-10">
                        <button onClick={handleLaunch} className="w-full py-8 bg-white text-black font-heading font-black text-[11px] tracking-[0.4em] uppercase hover:bg-[#CCFF00] transition-colors shadow-2xl">
                          DEPLOY LIVE SITE <ExternalLink className="inline-block ml-3" size={18} />
                        </button>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};