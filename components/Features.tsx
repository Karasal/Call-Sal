import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Zap, TrendingUp, Cpu, X, CheckCircle, Info, Database, Layers } from 'lucide-react';

export const Features: React.FC = () => {
  const [selectedResult, setSelectedResult] = useState<null | { title: string, stat: string, detail: string, points: string[] }>(null);
  const [showBenchmarkProtocol, setShowBenchmarkProtocol] = useState<null | string>(null);

  const resultsData = {
    roi: {
      title: "PROFIT DRIVEN",
      stat: "4.2X",
      detail: "Most of my clients make their money back from our tools within the first 4 months.",
      points: ["Lower monthly bills", "Fewer expensive mistakes", "Faster sales results"]
    },
    efficiency: {
      title: "TIME SAVED",
      stat: "70%",
      detail: "I focus on deleting the 'busy work' that slows down your best employees.",
      points: ["Automatic Fact-Checking", "Smart Data Sorting", "Instant Report Maker"]
    },
    support: {
      title: "ALWAYS ONLINE",
      stat: "24/7",
      detail: "Smart bots that don't just answer questions—they solve problems and book sales.",
      points: ["Instant Chat Replies", "Multi-Language Support", "Works with your CRM"]
    }
  };

  const benchmarks = {
    "Lead Engagement": {
      method: "INSTANT_REPLY",
      desc: "Every new customer gets a reply in less than 1 second with 95% accuracy.",
      reliability: "Works 24/7"
    },
    "Creative Scaling": {
      method: "MASS_CONTENT",
      desc: "Produce 50x more videos and ads without hiring extra help.",
      reliability: "Scales with you"
    },
    "Operational Reliability": {
      method: "SELF_HEALING",
      desc: "Our tools monitor themselves and fix errors without you ever knowing.",
      reliability: "Never Crashes"
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 lg:py-20 px-4 relative">
      <div className="mb-16 lg:mb-32">
        <span className="text-[11px] font-sans tracking-[1em] text-white/50 uppercase font-black block mb-8 text-center">MY PROVEN RESULTS</span>
        <h2 className="text-4xl sm:text-6xl lg:text-[10rem] font-heading font-black text-white uppercase tracking-tighter text-center leading-[0.8] stark-gradient">
          SUCCESS.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-10">
          <div onClick={() => setSelectedResult({ ...resultsData.roi, title: "PROFIT DRIVEN", stat: "4.2X" })}
            className="brutalist-panel p-10 sm:p-16 cursor-pointer group hover:bg-white/[0.02] transition-all relative overflow-hidden"
          >
             <div className="absolute top-6 right-6 text-white/10 group-hover:text-[#CCFF00] transition-colors"><Info size={20} /></div>
             <div className="flex flex-col sm:flex-row items-start gap-8 lg:gap-10">
                <div className="w-16 h-16 bg-white text-black flex items-center justify-center shrink-0 group-hover:bg-[#CCFF00]">
                  <TrendingUp size={32} />
                </div>
                <div>
                  <h3 className="text-3xl lg:text-4xl font-heading font-black mb-4 uppercase tracking-tighter">Profit First</h3>
                  <p className="text-white/60 text-sm lg:text-base font-heading font-medium leading-tight uppercase tracking-tight">
                    TECH IS USELESS IF IT DOESN'T MAKE YOU MONEY. I FOCUS ONLY ON SYSTEMS THAT INCREASE YOUR MARGINS. [CLICK_TO_EXPAND]
                  </p>
                </div>
             </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-10">
            <div onClick={() => setSelectedResult({ ...resultsData.efficiency, title: "70% TIME SAVED" })}
              className="brutalist-panel p-10 flex flex-col items-center text-center cursor-pointer hover:bg-white/[0.02] group transition-all relative"
            >
              <div className="absolute top-4 right-4 text-white/10 group-hover:text-[#CCFF00] transition-colors"><Info size={14} /></div>
              <Zap size={30} className="mb-8 group-hover:text-[#CCFF00]" />
              <div className="text-5xl lg:text-6xl font-heading font-black mb-2 stark-gradient">70%</div>
              <div className="text-[10px] font-sans tracking-[0.3em] text-white/50 uppercase font-black">Efficiency Increase</div>
            </div>
            <div onClick={() => setSelectedResult({ ...resultsData.support, title: "24/7 SUPPORT" })}
              className="brutalist-panel p-10 flex flex-col items-center text-center cursor-pointer hover:bg-white/[0.02] group transition-all relative"
            >
              <div className="absolute top-4 right-4 text-white/10 group-hover:text-[#CCFF00] transition-colors"><Info size={14} /></div>
              <Cpu size={30} className="mb-8 group-hover:text-[#CCFF00]" />
              <div className="text-5xl lg:text-6xl font-heading font-black mb-2 stark-gradient">24/7</div>
              <div className="text-[10px] font-sans tracking-[0.3em] text-white/50 uppercase font-black">Automated Support</div>
            </div>
          </div>

          <div className="brutalist-panel p-8 lg:p-16">
             <div className="flex items-center justify-between mb-10">
                <span className="font-sans text-[10px] tracking-[0.5em] text-white uppercase font-black">MY STANDARDS</span>
                <Activity size={20} className="text-white/40" />
             </div>
             <div className="space-y-10">
                {Object.keys(benchmarks).map((label, i) => {
                  const val = ["95%", "88%", "99%"][i];
                  return (
                    <div key={i} className="cursor-pointer group" onClick={() => setShowBenchmarkProtocol(label)}>
                      <div className="flex justify-between text-[10px] font-heading font-black mb-4 text-white uppercase tracking-widest group-hover:text-[#CCFF00]">
                        <span className="flex items-center gap-2">{label} <Info size={12} className="opacity-0 group-hover:opacity-100" /></span>
                        <span className="text-white/60">{val}</span>
                      </div>
                      <div className="h-1 bg-white/10 overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: val }} viewport={{ once: true }} transition={{ duration: 1.5 }}
                          className="h-full bg-white group-hover:bg-[#CCFF00]" />
                      </div>
                    </div>
                  );
                })}
             </div>
          </div>
        </div>

        <div className="brutalist-panel p-1 group flex flex-col min-h-[400px]">
           <div className="flex-1 relative overflow-hidden bg-white/5">
              <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover opacity-20 grayscale" alt="" />
              <div className="absolute inset-0 flex items-center justify-center flex-col text-center p-10 lg:p-20">
                 <div className="text-[6rem] sm:text-[10rem] font-heading font-black text-white mb-6 leading-none stark-gradient">10X</div>
                 <p className="text-3xl lg:text-4xl font-heading font-black text-white mb-6 uppercase tracking-tighter">Easier Growth</p>
                 <div className="w-16 lg:w-20 h-1 bg-white mb-10" />
                 <p className="text-[10px] lg:text-xs text-white/60 font-heading font-bold leading-tight uppercase tracking-widest max-w-sm">
                   OUR CLIENTS GROW 10X FASTER BECAUSE THEIR OFFICE RUNS ON AUTOPILOT.
                 </p>
              </div>
           </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedResult && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl"
          >
             <div className="max-w-4xl w-full glass-2 p-8 lg:p-16 relative border-b-8 border-white max-h-[90vh] overflow-y-auto custom-scrollbar">
                <button onClick={() => setSelectedResult(null)} className="absolute top-6 right-6 text-white/40 hover:text-white"><X size={40} /></button>
                <div className="space-y-12">
                  <div className="relative">
                    <span className="text-[10px] font-mono tracking-widest text-[#CCFF00] uppercase font-black block mb-6">CASE_STUDY_LOG</span>
                    <h3 className="text-3xl sm:text-5xl lg:text-7xl font-heading font-black text-white uppercase tracking-tighter leading-none mb-8 pr-12">{selectedResult.title}</h3>
                    <div className="hidden lg:block text-8xl md:text-[10rem] font-heading font-black text-white/10 absolute top-0 right-0 pointer-events-none">{selectedResult.stat}</div>
                    <p className="text-lg lg:text-3xl font-heading font-medium text-white/70 uppercase leading-tight tracking-tight max-w-2xl">{selectedResult.detail}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pt-12 border-t border-white/10">
                     {selectedResult.points.map((p, i) => (
                       <div key={i} className="space-y-4">
                         <div className="flex items-center gap-3 text-[#CCFF00]">
                           <CheckCircle size={18} />
                           <span className="text-[10px] font-mono font-black uppercase">Verified</span>
                         </div>
                         <p className="text-xs lg:text-sm font-heading font-black text-white uppercase">{p}</p>
                       </div>
                     ))}
                  </div>
                </div>
             </div>
          </motion.div>
        )}

        {showBenchmarkProtocol && benchmarks[showBenchmarkProtocol as keyof typeof benchmarks] && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/98 backdrop-blur-3xl"
          >
             <div className="max-w-2xl w-full glass-2 p-8 lg:p-12 relative border-l-8 border-[#CCFF00]">
                <button onClick={() => setShowBenchmarkProtocol(null)} className="absolute top-6 right-6 text-white/40 hover:text-white"><X size={32} /></button>
                <div className="mb-10">
                   <span className="text-[10px] font-mono tracking-[1em] text-[#CCFF00] uppercase font-bold block mb-4">HOW WE MEASURE</span>
                   <h3 className="text-3xl lg:text-4xl font-heading font-black text-white uppercase tracking-tighter leading-none mb-6">{showBenchmarkProtocol}</h3>
                </div>
                <div className="space-y-10">
                   <div className="flex items-start gap-6">
                      <Database className="text-[#CCFF00] shrink-0 mt-1" size={20} />
                      <div>
                         <span className="text-[9px] font-mono text-white/40 uppercase block mb-2 font-black">METHODOLOGY</span>
                         <p className="text-base lg:text-lg font-heading font-medium text-white/80 uppercase leading-tight tracking-tight">
                           {benchmarks[showBenchmarkProtocol as keyof typeof benchmarks].method} // {benchmarks[showBenchmarkProtocol as keyof typeof benchmarks].desc}
                         </p>
                      </div>
                   </div>
                   <div className="p-6 bg-white/5 border border-white/10 flex items-center justify-between">
                      <span className="text-[10px] font-mono font-black text-white/60 uppercase tracking-widest">RELIABILITY</span>
                      <span className="text-xl lg:text-2xl font-heading font-black text-white uppercase">{benchmarks[showBenchmarkProtocol as keyof typeof benchmarks].reliability}</span>
                   </div>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};