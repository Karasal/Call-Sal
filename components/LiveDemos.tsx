import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Eye, Code, Layout, Globe, X, ExternalLink, Maximize2, Monitor, RefreshCw, ChevronRight } from 'lucide-react';
import { getDemoContent } from '../services/demoContent';

interface DemoItem {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
}

const BrowserPopup = ({ demo, onClose }: { demo: DemoItem, onClose: () => void }) => {
  const srcDoc = getDemoContent(demo.id);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 lg:p-12 bg-black/95 backdrop-blur-xl"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative w-full h-full max-w-7xl flex flex-col bg-black brutalist-border shadow-[0_0_100px_rgba(255,255,255,0.1)] overflow-hidden"
      >
        {/* Browser Chrome UI */}
        <div className="bg-white/5 border-b border-white/10 p-4 flex items-center justify-between">
          <div className="flex items-center gap-6 flex-1">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/40" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
              <div className="w-3 h-3 rounded-full bg-green-500/40" />
            </div>
            <div className="hidden md:flex items-center gap-4 bg-black/40 border border-white/10 px-4 py-1.5 flex-1 max-w-2xl">
              <Globe size={14} className="text-white/40" />
              <span className="text-[10px] font-sans tracking-widest text-white/60 truncate uppercase font-bold">
                SAL-DEMO-0{demo.id}.APP
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <button 
              onClick={onClose}
              className="px-4 py-2 bg-white text-black font-heading font-black text-[10px] tracking-widest uppercase hover:bg-white/90 active:scale-95"
            >
              EXIT EMULATOR
            </button>
          </div>
        </div>

        {/* Iframe Content */}
        <div className="flex-1 bg-black relative">
          <iframe 
            srcDoc={srcDoc} 
            title={demo.title}
            className="w-full h-full border-none"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export const LiveDemos: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [selectedId, setSelectedId] = useState(1);
  const [isBrowserOpen, setIsBrowserOpen] = useState(false);

  const demos: DemoItem[] = [
    { 
      id: 1, 
      title: "PetroPulse Logistics", 
      category: "OIL & GAS", 
      description: "A high-performance monitoring dashboard for Calgary-based energy service companies. Includes AI-driven fuel burn analytics and real-time safety audit automation.", 
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80" 
    },
    { 
      id: 2, 
      title: "RockyView Realty Dash", 
      category: "REAL ESTATE", 
      description: "Sophisticated CRM and lead qualification engine for luxury real estate teams. Automatically scores social media leads and handles initial follow-ups via AI.", 
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80" 
    },
    { 
      id: 3, 
      title: "Stampede Staffer", 
      category: "HOSPITALITY", 
      description: "Dynamic labor management system designed for the high-intensity Stampede season. Features automated shift-swapping and AI-triggered inventory reordering.", 
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" 
    },
    { 
      id: 4, 
      title: "BowValley Health Portal", 
      category: "HEALTHCARE", 
      description: "Patient triage and queue management system for private clinics. Reduces reception bottlenecks with intelligent intake forms and predictive wait-time analytics.", 
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80" 
    },
    { 
      id: 5, 
      title: "17th Ave Law Vault", 
      category: "PROFESSIONAL", 
      description: "Secure legal document automation suite. Speeds up contract drafting with AI-powered templates and captures billable hours with seamless background tracking.", 
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80" 
    }
  ];

  const selectedDemo = demos.find(d => d.id === selectedId) || demos[0];

  const handleDemoSelect = (id: number) => {
    setSelectedId(id);
    setIsBrowserOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto py-20 px-4 md:px-0">
      <div className="mb-20 flex flex-col md:flex-row items-end justify-between gap-16">
        <div className="flex-1">
          <span className="text-[12px] font-sans tracking-[1em] text-white/50 uppercase font-black block mb-8 leading-none">Architecture Showroom</span>
          <h2 className="text-8xl font-heading font-black text-white uppercase tracking-tighter stark-gradient leading-[0.85]">
            LIVE <br />
            DEMOS.
          </h2>
        </div>
        <div className="max-w-md border-l-4 border-white pl-10">
          <p className="text-white/60 text-[11px] font-sans tracking-[0.25em] uppercase font-black leading-relaxed">
            PROVEN SYSTEMS BUILT FOR CALGARY'S TOP NICHES. EXPLORE OUR BESPOKE WEB APPLICATIONS THROUGH OUR INTEGRATED EMULATOR.
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
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 opacity-60 hover:opacity-100"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <button 
                onClick={() => setIsBrowserOpen(true)}
                className="px-8 md:px-12 py-4 md:py-6 bg-white text-black font-heading font-black text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] uppercase hover:scale-110 transition-all shadow-[15px_15px_0px_rgba(255,255,255,0.05)] md:shadow-[20px_20px_0px_rgba(255,255,255,0.05)] flex items-center gap-3 md:gap-4"
              >
                <Monitor size={18} /> LAUNCH DEMO
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
            <span className="text-[10px] font-sans tracking-widest text-white/20 uppercase font-black">{demos.length} ITEMS TOTAL</span>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
            {demos.map((demo) => (
              <button
                key={demo.id}
                onClick={() => handleDemoSelect(demo.id)}
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

      <AnimatePresence>
        {isBrowserOpen && (
          <BrowserPopup 
            demo={selectedDemo} 
            onClose={() => setIsBrowserOpen(false)} 
          />
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-32 brutalist-panel p-20 text-center bg-white/[0.03] border-white/20"
      >
        <h3 className="text-5xl font-heading font-black text-white uppercase tracking-tighter mb-12 stark-gradient">NEED A CUSTOM BUILD?</h3>
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