
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Maximize2, Monitor, RefreshCw, ChevronRight, ExternalLink } from 'lucide-react';

interface DemoItem {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  externalUrl?: string;
}

export const LiveDemos: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [selectedId, setSelectedId] = useState(1);
  const [isBtnHovered, setIsBtnHovered] = useState(false);

  const demos: DemoItem[] = [
    { 
      id: 1, 
      title: "SALSPEND - AI Expense Tracker", 
      category: "FINANCIAL AI", 
      description: "A cutting-edge AI-powered expense tracking and analysis tool. Automatically categorizes transactions, detects spending patterns, and provides actionable financial insights using advanced machine learning models.", 
      image: "/salspend.png",
      externalUrl: "https://salspend-o2q7ljcgz-karasals-projects.vercel.app/"
    }
  ];

  const selectedDemo = demos.find(d => d.id === selectedId) || demos[0];

  const handleLaunch = () => {
    if (selectedDemo.externalUrl) {
      window.open(selectedDemo.externalUrl, '_blank');
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-20 px-4 md:px-0">
      <div className="mb-20 flex flex-col md:flex-row items-end justify-between gap-16">
        <div className="flex-1">
          <span className="text-[12px] font-sans tracking-[1em] text-white/50 uppercase font-black block mb-8 leading-none">Architecture Showroom</span>
          <h2 className="text-6xl sm:text-8xl font-heading font-black text-white uppercase tracking-tighter stark-gradient leading-[0.85]">
            LIVE <br />
            DEMO.
          </h2>
        </div>
        <div className="max-w-md border-l-4 border-white pl-10">
          <p className="text-white/60 text-[11px] font-sans tracking-[0.25em] uppercase font-black leading-relaxed">
            PROVEN SYSTEMS BUILT FOR CALGARY'S TOP NICHES. EXPLORE OUR FEATURED WEB APPLICATION DIRECTLY IN YOUR BROWSER.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 bg-white/5 border border-white/10 brutalist-panel overflow-hidden h-[800px]">
        {/* Left Side: Detail & Preview (Master) */}
        <div className="lg:col-span-7 flex flex-col h-full border-r border-white/10 overflow-hidden">
          {/* Top Half: Thumbnail */}
          <div className="flex-1 relative overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.img 
                key={selectedDemo.id}
                src={selectedDemo.image}
                alt={selectedDemo.title}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ 
                  opacity: isBtnHovered ? 1 : 0.6, 
                  scale: isBtnHovered ? 1.05 : 1,
                  filter: isBtnHovered ? "grayscale(0%)" : "grayscale(100%)"
                }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full object-cover transition-all duration-1000"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <button 
                onClick={handleLaunch}
                onMouseEnter={() => setIsBtnHovered(true)}
                onMouseLeave={() => setIsBtnHovered(false)}
                className="px-8 md:px-12 py-4 md:py-6 bg-white text-black font-heading font-black text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] uppercase hover:scale-110 transition-all shadow-[15px_15px_0px_rgba(255,255,255,0.05)] md:shadow-[20px_20px_0px_rgba(255,255,255,0.05)] flex items-center gap-3 md:gap-4"
              >
                <ExternalLink size={18} /> LAUNCH LIVE SITE
              </button>
            </div>

            <div className="absolute top-4 left-4 md:top-8 md:left-8 flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 pointer-events-none">
              <div className="bg-white text-black px-3 py-1 md:px-4 md:py-1 font-heading font-black text-[8px] md:text-[10px] tracking-widest uppercase">
                {selectedDemo.category}
              </div>
              <div className="bg-black/80 backdrop-blur-md text-white/60 border border-white/10 px-3 py-1 md:px-4 md:py-1 font-heading font-black text-[8px] md:text-[10px] tracking-widest uppercase">
                STABLE RELEASE
              </div>
            </div>
          </div>

          {/* Bottom Half: Description */}
          <div className="h-[300px] bg-black p-10 flex flex-col justify-center border-t border-white/10">
            <span className="text-[10px] font-sans tracking-[0.6em] text-white/30 uppercase font-black mb-6">SELECTED PROJECT SPECIFICATIONS:</span>
            <h3 className="text-4xl font-heading font-black text-white uppercase tracking-tighter mb-6">
              {selectedDemo.title}
            </h3>
            <p className="text-sm font-heading font-medium uppercase text-white/50 leading-relaxed max-w-2xl tracking-tight">
              {selectedDemo.description}
            </p>
            <div className="mt-8 flex items-center gap-8">
               <div className="flex items-center gap-3 text-[10px] font-sans tracking-widest text-white/80 uppercase font-black border-r border-white/10 pr-8">
                  <RefreshCw size={12} className="text-green-500 animate-spin" /> SYSTEM NOMINAL
               </div>
               <div className="flex items-center gap-3 text-[10px] font-sans tracking-widest text-white/80 uppercase font-black">
                  <Maximize2 size={12} className="text-white/40" /> 1080P COMPLIANT
               </div>
            </div>
          </div>
        </div>

        {/* Right Side: Scrollable List (Selector) */}
        <div className="lg:col-span-5 flex flex-col h-full bg-black/40 overflow-hidden">
          <div className="p-8 border-b border-white/10 flex items-center justify-between">
            <span className="text-[10px] font-sans tracking-[0.4em] text-white/40 uppercase font-black">ARCHIVE DIRECTORY</span>
            <span className="text-[10px] font-sans tracking-widest text-white/20 uppercase font-black">{demos.length} ITEM TOTAL</span>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
            {demos.map((demo) => (
              <button
                key={demo.id}
                onClick={handleLaunch}
                onMouseEnter={() => setIsBtnHovered(true)}
                onMouseLeave={() => setIsBtnHovered(false)}
                className={`w-full group flex items-center gap-6 p-6 border transition-all text-left relative overflow-hidden ${
                  selectedId === demo.id 
                  ? 'bg-white border-white text-black' 
                  : 'bg-transparent border-white/5 hover:border-white/20 text-white'
                }`}
              >
                <div className={`w-16 h-12 overflow-hidden flex-shrink-0 border transition-all ${selectedId === demo.id ? 'border-black/10' : 'border-white/10'}`}>
                  <img 
                    src={demo.image} 
                    alt={demo.title} 
                    className={`w-full h-full object-cover transition-all duration-700 ${selectedId === demo.id ? 'grayscale-0' : 'grayscale opacity-30 group-hover:opacity-60'}`} 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`text-[12px] font-heading font-black uppercase truncate tracking-tight ${selectedId === demo.id ? 'text-black' : 'text-white'}`}>
                      {demo.title}
                    </h4>
                    <span className={`text-[8px] font-sans tracking-widest uppercase font-black opacity-40`}>0{demo.id}</span>
                  </div>
                  <p className={`text-[9px] font-sans tracking-[0.2em] uppercase font-bold truncate ${selectedId === demo.id ? 'text-black/60' : 'text-white/20'}`}>
                    {demo.category} // ARCHIVE
                  </p>
                </div>
                {selectedId === demo.id && (
                  <motion.div layoutId="arrow-nav">
                    <ChevronRight size={16} />
                  </motion.div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-32 brutalist-panel p-20 text-center bg-white/[0.03] border-white/20"
      >
        <h3 className="text-4xl sm:text-5xl font-heading font-black text-white uppercase tracking-tighter mb-12 stark-gradient text-white">NEED A CUSTOM BUILD?</h3>
        <p className="text-white/40 text-xs font-sans tracking-[0.4em] uppercase font-black mb-16">WE ARCHITECT HIGH-PERFORMANCE SOLUTIONS TAILORED TO YOUR UNIQUE HEADACHES.</p>
        <button 
          onClick={onNext}
          className="flex items-center justify-center gap-6 mx-auto px-16 py-8 bg-white text-black font-heading font-black text-sm tracking-[0.5em] uppercase hover:scale-105 transition-all shadow-[15px_15px_0_rgba(255,255,255,0.05)] active:scale-95"
        >
          START STRATEGY CHAT <ArrowRight size={24} />
        </button>
      </motion.div>
    </div>
  );
};
