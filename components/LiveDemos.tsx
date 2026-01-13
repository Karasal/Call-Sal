import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, RefreshCw, ChevronRight, ExternalLink, X, Layout } from 'lucide-react';

interface DemoItem {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  externalUrl?: string;
  roi: string;
  tech: string[];
}

export const LiveDemos: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [selectedId, setSelectedId] = useState(1);
  const [isBtnHovered, setIsBtnHovered] = useState(false);
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
      tech: ["Smart Mapping", "Real-time Charts"]
    },
    { 
      id: 2, 
      title: "CHROME BUILDER", 
      category: "ROBOT BUILDER", 
      description: "A specialized AI that can code and build fully working browser tools just by listening to your voice commands.", 
      image: "/chrome.png",
      externalUrl: "https://chrome-extension-builder-bot.vercel.app/",
      roi: "10x Faster Coding Speed",
      tech: ["AI Brain", "Auto-Code Scripts"]
    },
    { 
      id: 3, 
      title: "SALSPEND", 
      category: "MONEY TRACKER", 
      description: "A smart tool that watches your spending and automatically finds where you are wasting money on subscriptions.", 
      image: "/salspend.png",
      externalUrl: "https://salspend.vercel.app/",
      roi: "$2k/mo Waste Detected",
      tech: ["AI Receipt Scanner", "Auto-Sorting Logic"]
    },
    { 
      id: 4, 
      title: "VIRAL FACTORY", 
      category: "CONTENT MAKER", 
      description: "A massive engine that makes hundreds of videos and stories for kids' channels every single hour.", 
      image: "/story.png",
      externalUrl: "https://story-book-debug.vercel.app/",
      roi: "100+ Videos Every Hour",
      tech: ["Image Gen AI", "Auto-Scripting"]
    },
    { 
      id: 5, 
      title: "HISTORIA", 
      category: "CREATIVE HELP", 
      description: "A tool for creators that makes history come alive with AI-generated visuals and talking points.", 
      image: "/history.png",
      externalUrl: "https://historia-agent-asset-generator.vercel.app/",
      roi: "Lower Editing Costs",
      tech: ["Storytelling AI", "Visual Maker"]
    }
  ];

  const selectedDemo = demos.find(d => d.id === selectedId) || demos[0];

  const handleLaunch = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedDemo.externalUrl) { window.open(selectedDemo.externalUrl, '_blank'); }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 lg:py-20 px-4">
      <div className="mb-12 flex flex-col md:flex-row items-start lg:items-end justify-between gap-10">
        <div className="flex-1">
          <span className="text-[10px] lg:text-[12px] font-sans tracking-[0.5em] text-white/50 uppercase font-black block mb-6">REAL WORLD APPS</span>
          <h2 className="text-4xl sm:text-7xl lg:text-8xl font-heading font-black text-white uppercase tracking-tighter stark-gradient leading-[0.9]">
            LIVE <br /> DEMO.
          </h2>
        </div>
        <div className="max-w-md border-l-2 lg:border-l-4 border-white pl-6 lg:pl-10">
          <p className="text-white/60 text-[10px] lg:text-[11px] font-sans tracking-[0.2em] uppercase font-black leading-relaxed">
            I BUILD CUSTOM WEB TOOLS FOR CALGARY'S BEST BUSINESSES. EXPLORE MY RECENT WORK DIRECTLY IN YOUR BROWSER.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 bg-white/5 border border-white/10 brutalist-panel overflow-hidden h-auto lg:h-[700px]">
        <div className="lg:col-span-7 flex flex-col h-full border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden">
          <div className="flex-1 min-h-[260px] relative overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.img key={selectedDemo.id} src={selectedDemo.image} initial={{ opacity: 0 }} animate={{ opacity: isBtnHovered ? 1 : 0.4, filter: isBtnHovered ? "grayscale(0%)" : "grayscale(100%)" }} className="w-full h-full object-cover" />
            </AnimatePresence>
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <button onClick={handleLaunch} onMouseEnter={() => setIsBtnHovered(true)} onMouseLeave={() => setIsBtnHovered(false)} className="px-6 py-4 bg-white text-black font-heading font-black text-[9px] uppercase hover:scale-105 transition-all flex items-center gap-3">
                <ExternalLink size={18} /> OPEN LIVE SITE
              </button>
            </div>
            <div className="absolute top-4 left-4 flex gap-2 pointer-events-none">
              <div className="bg-white text-black px-2 py-1 font-heading font-black text-[8px] uppercase">{selectedDemo.category}</div>
            </div>
          </div>
          <div className="bg-black p-6 sm:p-10 border-t border-white/10">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[9px] font-sans tracking-[0.3em] text-white/30 uppercase font-black">PROJECT SPECIFICATIONS:</span>
              <button onClick={() => setShowCaseStudy(true)} className="text-[9px] font-mono tracking-widest text-[#CCFF00] uppercase font-bold hover:underline">[VIEW_DETAILS]</button>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-white uppercase mb-4">{selectedDemo.title}</h3>
            <p className="text-xs sm:text-sm font-heading font-medium uppercase text-white/50 leading-relaxed max-w-2xl tracking-tight">{selectedDemo.description}</p>
            <div className="mt-6 flex gap-6">
               <div className="flex items-center gap-2 text-[9px] font-sans tracking-widest text-white/80 uppercase font-black border-r border-white/10 pr-6">
                  <RefreshCw size={12} className="text-green-500 animate-spin" /> LIVE_STATUS: OK
               </div>
               <div className="flex items-center gap-2 text-[9px] font-sans tracking-widest text-white/80 uppercase font-black">
                  <Maximize2 size={12} className="text-white/40" /> 1080P_OK
               </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col h-[400px] lg:h-full bg-black/40 overflow-hidden">
          <div className="p-6 border-b border-white/10 flex justify-between">
            <span className="text-[10px] font-sans tracking-[0.4em] text-white/40 uppercase font-black">WORK ARCHIVE</span>
            <span className="text-[10px] font-sans text-white/20 uppercase">{demos.length} ITEMS</span>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
            {demos.map((demo) => (
              <button key={demo.id} onMouseEnter={() => { setSelectedId(demo.id); setIsBtnHovered(true); }} onMouseLeave={() => setIsBtnHovered(false)} onClick={handleLaunch}
                className={`w-full group flex items-center gap-4 p-4 border transition-all text-left ${selectedId === demo.id ? 'bg-white border-white text-black' : 'bg-transparent border-white/5 hover:border-white/20 text-white'}`}
              >
                <div className="w-12 h-10 overflow-hidden shrink-0 border border-white/10">
                  <img src={demo.image} className={`w-full h-full object-cover ${selectedId === demo.id ? '' : 'grayscale opacity-30'}`} alt="" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[10px] font-heading font-black uppercase truncate">{demo.title}</h4>
                  <p className={`text-[8px] font-sans uppercase truncate ${selectedId === demo.id ? 'text-black/60' : 'text-white/20'}`}>{demo.category}</p>
                </div>
                {selectedId === demo.id && <ChevronRight size={16} />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20 lg:mt-32 brutalist-panel p-10 lg:p-20 text-center bg-white/[0.03] border-white/20">
        <h3 className="text-3xl lg:text-5xl font-heading font-black text-white uppercase mb-8 stark-gradient leading-none">NEED A CUSTOM TOOL?</h3>
        <p className="text-white/40 text-[10px] font-sans tracking-[0.3em] uppercase font-black mb-12">I BUILD SOLUTIONS DESIGNED TO FIX YOUR UNIQUE HEADACHES.</p>
        <button onClick={onNext} className="mx-auto px-10 py-6 bg-white text-black font-heading font-black text-xs tracking-[0.3em] uppercase hover:scale-105 transition-all">
          BOOK A STRATEGY CHAT
        </button>
      </div>

      <AnimatePresence>
        {showCaseStudy && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl"
          >
             <div className="max-w-4xl w-full glass-2 p-10 lg:p-20 relative border-b-8 border-[#CCFF00] overflow-y-auto max-h-[90vh] custom-scrollbar">
                <button onClick={() => setShowCaseStudy(false)} className="absolute top-8 right-8 text-white/40 hover:text-white"><X size={32} /></button>
                <div className="mb-12">
                   <span className="text-[10px] font-mono tracking-[1em] text-[#CCFF00] uppercase font-bold block mb-4">CASE_STUDY_NOTES</span>
                   <h3 className="text-3xl lg:text-6xl font-heading font-black text-white uppercase mb-6 leading-none">{selectedDemo.title}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="space-y-8">
                      <div className="bg-white/5 p-8 border border-white/10">
                        <span className="text-[9px] font-mono text-[#CCFF00] uppercase block mb-4">THE PAYOFF</span>
                        <p className="text-2xl lg:text-4xl font-heading font-black text-white uppercase leading-none tracking-tighter">{selectedDemo.roi}</p>
                      </div>
                      <div className="space-y-4">
                        <span className="text-[9px] font-mono text-white/30 uppercase block font-black">WHAT IT DOES</span>
                        <p className="text-lg lg:text-2xl font-heading font-bold text-white/80 uppercase leading-tight">{selectedDemo.description}</p>
                      </div>
                   </div>
                   <div className="space-y-8">
                      <span className="text-[9px] font-mono text-white/30 uppercase block font-black">TECH STACK</span>
                      <div className="space-y-3">
                         {selectedDemo.tech.map((t, i) => (
                           <div key={i} className="flex items-center gap-4 p-5 bg-white/5 border border-white/5 group hover:border-[#CCFF00]/30 transition-all">
                              <Layout size={18} className="text-[#CCFF00]" />
                              <span className="text-[11px] font-mono font-black text-white/90 uppercase">{t}</span>
                           </div>
                         ))}
                      </div>
                      <div className="pt-8">
                        <button onClick={handleLaunch} className="w-full py-6 bg-white text-black font-heading font-black text-xs tracking-[0.3em] uppercase hover:bg-[#CCFF00]">
                          LAUNCH SITE <ExternalLink className="inline-block ml-2" size={16} />
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