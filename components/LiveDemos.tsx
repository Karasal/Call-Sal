
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Eye, Code, Layout, Globe, X, ExternalLink, Maximize2, Monitor, RefreshCw, ChevronRight } from 'lucide-react';

interface DemoItem {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  url: string;
}

const BrowserPopup = ({ demo, onClose }: { demo: DemoItem, onClose: () => void }) => {
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
        className="relative w-full h-full max-w-7xl flex flex-col bg-black border border-white/20 shadow-[0_0_100px_rgba(255,255,255,0.1)] overflow-hidden"
      >
        {/* Browser Chrome UI */}
        <div className="bg-white/5 border-b border-white/10 p-4 flex items-center justify-between">
          <div className="flex items-center gap-6 flex-1">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <div className="w-3 h-3 rounded-full bg-white/20" />
            </div>
            <div className="hidden md:flex items-center gap-4 bg-black/40 border border-white/10 px-4 py-1.5 flex-1 max-w-2xl">
              <Globe size={14} className="text-white/40" />
              <span className="text-[10px] font-sans tracking-widest text-white/60 truncate uppercase font-bold">
                {demo.url}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <button onClick={() => window.open(demo.url, '_blank')} className="p-2 text-white/60 hover:text-white transition-colors">
                <ExternalLink size={18} />
             </button>
             <button 
              onClick={onClose}
              className="px-4 py-2 bg-white text-black font-heading font-black text-[10px] tracking-widest uppercase hover:bg-white/90 active:scale-95"
            >
              CLOSE WINDOW
            </button>
          </div>
        </div>

        {/* Iframe Content */}
        <div className="flex-1 bg-white relative">
          <iframe 
            src={demo.url} 
            title={demo.title}
            className="w-full h-full border-none"
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
          {/* Decorative Overlay for simulated feel */}
          <div className="absolute inset-0 pointer-events-none border-[1px] border-black/5" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export const LiveDemos: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [selectedId, setSelectedId] = useState(1);
  const [isBrowserOpen, setIsBrowserOpen] = useState(false);

  // Generate 24 placeholder demos
  const demos: DemoItem[] = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    title: `Project Alpha ${i + 1}`,
    description: `A custom-engineered ${["Automation Suite", "SaaS Interface", "Data Pipeline", "AI Marketing Engine"][i % 4]} built to streamline complex workflows and maximize operational throughput. This project leverages real-time synchronization and a bespoke neural processing layer to ensure zero-latency business decisions.`,
    category: ["E-COMMERCE", "REAL ESTATE", "SAAS", "LOGISTICS"][i % 4],
    url: "https://example.com", // Placeholder URL
    image: `https://images.unsplash.com/photo-${[
      '1460925895917-afdab827c52f', 
      '1519389950473-47ba0277781c', 
      '1551434678-e076c223a692', 
      '1551288049-bebda4e38f71'
    ][i % 4]}?auto=format&fit=crop&w=1200&q=80`
  }));

  const selectedDemo = demos.find(d => d.id === selectedId) || demos[0];

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
            PROVEN SYSTEMS BUILT FOR RESULTS. EXPLORE OUR ARCHIVE OF BESPOKE WEB APPLICATIONS THROUGH OUR INTEGRATED EMULATOR.
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
            
            <div className="absolute inset-0 flex items-center justify-center">
              <button 
                onClick={() => setIsBrowserOpen(true)}
                className="px-12 py-6 bg-white text-black font-heading font-black text-xs tracking-[0.5em] uppercase hover:scale-110 transition-all shadow-[20px_20px_0px_rgba(255,255,255,0.05)] flex items-center gap-4"
              >
                <Monitor size={18} /> LAUNCH DEMO
              </button>
            </div>

            <div className="absolute top-8 left-8 flex items-center gap-4">
              <div className="bg-white text-black px-4 py-1 font-heading font-black text-[10px] tracking-widest uppercase">
                {selectedDemo.category}
              </div>
              <div className="bg-black/80 backdrop-blur-md text-white/60 border border-white/10 px-4 py-1 font-heading font-black text-[10px] tracking-widest uppercase">
                BUILD 0{selectedDemo.id}.2
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
                  <RefreshCw size={12} className="text-green-500 animate-spin-slow" /> STABLE RELEASE
               </div>
               <div className="flex items-center gap-3 text-[10px] font-sans tracking-widest text-white/80 uppercase font-black">
                  <Maximize2 size={12} className="text-white/40" /> 1920X1080 OPTIMIZED
               </div>
            </div>
          </div>
        </div>

        {/* Right Side: Scrollable List (Selector) */}
        <div className="lg:col-span-5 flex flex-col h-full bg-black/40 overflow-hidden">
          <div className="p-8 border-b border-white/10 flex items-center justify-between">
            <span className="text-[10px] font-sans tracking-[0.4em] text-white/40 uppercase font-black">ARCHIVE DIRECTORY</span>
            <span className="text-[10px] font-sans tracking-widest text-white/20 uppercase font-black">24 ITEMS TOTAL</span>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
            {demos.map((demo) => (
              <button
                key={demo.id}
                onClick={() => setSelectedId(demo.id)}
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
                    {demo.category} // AUTOMATED SUITE
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
          className="flex items-center justify-center gap-6 mx-auto px-16 py-8 bg-white text-black font-heading font-black text-sm tracking-[0.5em] uppercase hover:scale-105 transition-all shadow-[15px_15px_0px_rgba(255,255,255,0.05)] active:scale-95"
        >
          START STRATEGY CHAT <ArrowRight size={24} />
        </button>
      </motion.div>
    </div>
  );
};
