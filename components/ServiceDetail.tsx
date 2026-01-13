import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Zap, Target, CheckCircle2, FileText, X, Activity, Info, ChevronRight, MessageSquare } from 'lucide-react';
import { ServiceDetail as IServiceDetail } from '../types';
import { BookingSystem } from './BookingSystem';

interface Props {
  service: IServiceDetail;
  onBack: () => void;
  onConsultation: () => void;
}

export const ServiceDetailView: React.FC<Props> = ({ service, onBack, onConsultation }) => {
  const [showBlueprint, setShowBlueprint] = useState(false);
  const [showTacticalDetail, setShowTacticalDetail] = useState<'problem' | 'solution' | null>(null);
  const [expandedPhaseIndex, setExpandedPhaseIndex] = useState<number | null>(null);
  const [expandedExampleIndex, setExpandedExampleIndex] = useState<number | null>(null);

  const blueprintPhases = [
    { 
      title: "THE AUDIT", 
      desc: "Deep analysis of workflow drag.",
      details: "I perform a deep dive into your existing workflows, identifying bottlenecks and redundant manual processes that drain your team's energy and budget. We find exactly where the 'busy work' is hiding."
    },
    { 
      title: "THE PLAN", 
      desc: "Mapping the neural architecture.",
      details: "I design a custom logic engine that connects your apps. We select the specific AI models (like Gemini 3) and webhooks needed to handle your tasks perfectly and securely."
    },
    { 
      title: "THE TEST", 
      desc: "Refining for 100% accuracy.",
      details: "We run a safe pilot version of your automation. This is where we verify the data logic and ensure the system handles every edge case with neighborly charm and zero errors."
    },
    { 
      title: "GO LIVE", 
      desc: "Instant productivity boost.",
      details: "The system is deployed. Your team is trained in minutes (if needed at all), and you start watching hours of manual labor vanish from your daily schedule forever. Sal stays on standby to ensure smooth sailing."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-4 lg:py-8 space-y-12 lg:space-y-20 pb-32 relative">
      <motion.button initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} onClick={onBack}
        className="flex items-center gap-4 text-white/80 hover:text-white transition-colors group px-4"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em]">GO BACK</span>
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 lg:space-y-12">
          <div>
            <div className="text-white mb-6 w-14 h-14 flex items-center justify-center border border-white/20">
              {service.icon}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-black mb-4 text-white uppercase tracking-tighter leading-[0.9]">
              {service.title}
            </h1>
            <p className="text-lg lg:text-2xl text-white/70 font-heading font-bold uppercase tracking-tight">{service.tagline}</p>
          </div>

          <div className="space-y-6">
            <div onClick={() => setShowTacticalDetail('problem')}
              className="brutalist-panel p-8 border-white/10 cursor-pointer group hover:bg-white/[0.02] relative"
            >
              <div className="absolute top-4 right-4 text-white/20 group-hover:text-[#CCFF00]"><Info size={16} /></div>
              <h4 className="text-[9px] font-sans text-white/60 tracking-[0.4em] uppercase mb-4 flex items-center gap-3">
                <Target size={14} /> The Headache
              </h4>
              <p className="text-white/90 text-base lg:text-lg font-heading font-medium leading-tight uppercase tracking-tight">{service.problem}</p>
              <div className="mt-4 text-[9px] font-mono text-[#CCFF00] opacity-0 group-hover:opacity-100 uppercase">[CLICK_FOR_MORE]</div>
            </div>

            <div onClick={() => setShowTacticalDetail('solution')}
              className="brutalist-panel p-8 bg-white text-black border-white cursor-pointer group hover:bg-[#CCFF00] relative"
            >
              <div className="absolute top-4 right-4 text-black/20 group-hover:text-black"><Info size={16} /></div>
              <h4 className="text-[9px] font-sans text-black/60 tracking-[0.4em] uppercase mb-4 flex items-center gap-3">
                <Zap size={14} /> My Solution
              </h4>
              <p className="text-black text-base lg:text-lg font-heading font-black leading-tight uppercase tracking-tight">{service.solution}</p>
              <div className="mt-4 text-[9px] font-mono text-black/40 opacity-0 group-hover:opacity-100 uppercase">[VIEW_THE_METHOD]</div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="space-y-8 lg:space-y-12">
          <div className="brutalist-panel p-8">
            <h3 className="text-lg font-heading font-black tracking-[0.3em] mb-8 uppercase text-white">What to Expect</h3>
            <div className="space-y-3">
              {(service.examples || []).map((ex, i) => (
                <div 
                  key={i} 
                  className={`border transition-all cursor-pointer overflow-hidden ${expandedExampleIndex === i ? 'bg-white text-black border-white' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                  onClick={() => setExpandedExampleIndex(expandedExampleIndex === i ? null : i)}
                >
                  <div className="flex gap-4 p-5 items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className={`${expandedExampleIndex === i ? 'text-black' : 'text-white'} shrink-0`}>
                        {ex.icon}
                      </span>
                      <p className={`text-sm lg:text-base font-heading font-black uppercase tracking-tight leading-tight ${expandedExampleIndex === i ? 'text-black' : 'text-white'}`}>
                        {ex.title}
                      </p>
                    </div>
                    <ChevronRight size={18} className={`transition-transform duration-300 ${expandedExampleIndex === i ? 'rotate-90 text-black' : 'text-white/40'}`} />
                  </div>
                  
                  <AnimatePresence>
                    {expandedExampleIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-5 pb-5 border-t border-black/10"
                      >
                        <p className="pt-4 text-xs lg:text-sm font-heading font-bold uppercase tracking-tight leading-tight text-black/70">
                          {ex.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => { setShowBlueprint(true); setExpandedPhaseIndex(null); }}
            className="w-full flex items-center justify-center gap-4 py-6 bg-[#CCFF00] text-black font-heading font-black text-[10px] tracking-[0.4em] uppercase hover:scale-[1.02] shadow-[15px_15px_0_rgba(204,255,0,0.1)]"
          >
            <FileText size={20} /> VIEW THE BLUEPRINT
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {showBlueprint && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 lg:p-8 bg-black/98 backdrop-blur-3xl overflow-hidden"
          >
             <div className="max-w-6xl w-full glass-2 h-[90vh] flex flex-col relative border-t-8 border-[#CCFF00] overflow-hidden">
                <div className="p-6 lg:p-12 pb-4 lg:pb-8 border-b border-white/10 shrink-0 bg-black/40 backdrop-blur-md">
                  <button onClick={() => setShowBlueprint(false)} className="absolute top-6 right-6 lg:top-8 lg:right-8 text-white/40 hover:text-white transition-colors"><X size={32} /></button>
                  <span className="text-[9px] font-mono tracking-[1em] text-[#CCFF00] uppercase font-black block mb-4">DETAILED_PLAN</span>
                  <h3 className="text-3xl sm:text-5xl lg:text-7xl font-heading font-black text-white uppercase tracking-tighter leading-none mb-4">THE BLUEPRINT.</h3>
                </div>
                
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-12 bg-black/20">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
                    <div className="space-y-4 lg:space-y-6">
                      {blueprintPhases.map((phase, i) => (
                        <div key={i} 
                          onClick={() => setExpandedPhaseIndex(expandedPhaseIndex === i ? null : i)}
                          className={`p-6 border cursor-pointer transition-all relative group ${expandedPhaseIndex === i ? 'border-[#CCFF00]/50 bg-white/[0.05]' : 'border-white/5 bg-white/[0.02] hover:border-[#CCFF00]/30'}`}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <span className="text-[10px] font-mono text-[#CCFF00] block mb-1">STEP_0{i+1}</span>
                              <h4 className="text-xl lg:text-2xl font-heading font-black text-white uppercase tracking-tighter">{phase.title}</h4>
                              <p className="text-[9px] lg:text-[10px] font-heading font-medium text-white/40 uppercase tracking-widest">{phase.desc}</p>
                            </div>
                            <ChevronRight size={18} className={`text-[#CCFF00] transition-transform duration-300 ${expandedPhaseIndex === i ? 'rotate-90' : ''}`} />
                          </div>

                          <AnimatePresence>
                            {expandedPhaseIndex === i && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="pt-6 border-t border-white/10 mt-6">
                                  <p className="text-[11px] lg:text-sm font-heading font-medium text-white/70 uppercase leading-relaxed tracking-tight">
                                    {phase.details}
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-8 lg:space-y-12 pb-12">
                       <div className="brutalist-panel p-6 lg:p-10 bg-[#CCFF00] text-black">
                          <Activity className="mb-6" size={32} />
                          <h4 className="text-2xl lg:text-3xl font-heading font-black uppercase tracking-tighter mb-4 leading-none">THE PAYOFF</h4>
                          <p className="text-[10px] lg:text-xs font-heading font-bold uppercase opacity-70 leading-tight">MOST BUSINESSES SEE THE FULL PAYOFF WITHIN 6 WEEKS OF COMPLETION.</p>
                       </div>
                    </div>
                  </div>
                </div>
             </div>
          </motion.div>
        )}

        {showTacticalDetail && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl"
          >
             <div className="max-w-2xl w-full glass-2 p-8 lg:p-12 relative border-l-8 border-[#CCFF00]">
                <button onClick={() => setShowTacticalDetail(null)} className="absolute top-6 right-6 text-white/40 hover:text-white"><X size={32} /></button>
                <div className="mb-8">
                   <span className="text-[10px] font-mono tracking-[1em] text-[#CCFF00] uppercase font-bold block mb-4">EXPERT_INSIGHT</span>
                   <h3 className="text-3xl lg:text-4xl font-heading font-black text-white uppercase tracking-tighter leading-none mb-6">
                     {showTacticalDetail === 'problem' ? 'WHY IT HURTS' : 'HOW I FIX IT'}
                   </h3>
                </div>
                <p className="text-base lg:text-lg font-heading font-medium text-white/70 uppercase leading-tight tracking-tight mb-8">
                  {showTacticalDetail === 'problem' 
                    ? "MOST BUSINESSES ARE HELD BACK BY 'HUMAN FRICTION'—WHERE GOOD WORKERS GET BORED DOING REPETITIVE TASKS." 
                    : "MY SYSTEM SITS ON TOP OF YOUR CURRENT APPS, RUNNING THE REPETITIVE PARTS SILENTLY AND PERFECTLY."}
                </p>
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 bg-white/5 border border-white/10">
                      <span className="text-[9px] font-mono text-[#CCFF00] uppercase block mb-1">METRIC_01</span>
                      <span className="text-[10px] font-heading font-black text-white uppercase tracking-widest">
                        {showTacticalDetail === 'problem' ? '40% TIME WASTED' : 'ONE-CLICK FLOW'}
                      </span>
                   </div>
                   <div className="p-4 bg-white/5 border border-white/10">
                      <span className="text-[9px] font-mono text-[#CCFF00] uppercase block mb-1">METRIC_02</span>
                      <span className="text-[10px] font-heading font-black text-white uppercase tracking-widest">
                        {showTacticalDetail === 'problem' ? 'HUMAN ERROR' : 'PERFECT ACCURACY'}
                      </span>
                   </div>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="booking" className="pt-20 lg:pt-32 border-t border-white/10 px-4">
        <div className="text-center mb-16 lg:mb-24">
          <span className="text-[11px] font-sans tracking-[1em] text-white/50 uppercase font-black block mb-8 text-center">Ready to start?</span>
          <h2 className="text-5xl lg:text-7xl font-heading font-black text-white uppercase tracking-tighter stark-gradient leading-none">BOOK A CHAT.</h2>
        </div>
        <BookingSystem />
      </section>

      <section className="pt-20 lg:pt-32 pb-20 px-4 flex flex-col items-center">
        <div className="w-full max-w-2xl h-px bg-white/10 mb-20" />
        <button 
          onClick={onConsultation}
          className="group flex items-center justify-center gap-6 px-12 py-8 bg-white text-black font-heading font-black text-xs lg:text-sm tracking-[0.4em] uppercase hover:bg-[#CCFF00] transition-all shadow-[20px_20px_0_rgba(255,255,255,0.05)] hover:translate-x-2"
        >
          <MessageSquare size={24} className="group-hover:scale-110 transition-transform" /> 
          FREE CONSULTATION
        </button>
      </section>
    </div>
  );
};