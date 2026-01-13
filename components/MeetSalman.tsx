
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Smile, X, Zap, Users, Bot } from 'lucide-react';

interface HelpDetail {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  icon: React.ReactNode;
  impact: string;
}

export const MeetSalman: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [selectedDetail, setSelectedDetail] = useState<HelpDetail | null>(null);

  const helpPoints: HelpDetail[] = [
    { 
      id: "01", 
      title: "CHORE_DESTRUCTION", 
      shortDesc: "Tasks that took 4 hours now take 4 seconds.",
      longDesc: "We identify the repetitive 'drag' in your daily operations—data entry, report generation, and status updates. By building custom neural scripts, we create a 'silent workforce' that handles these tasks with 100% accuracy while you sleep.",
      icon: <Zap size={40} />,
      impact: "RECLAIM 20+ HOURS PER WEEK."
    },
    { 
      id: "02", 
      title: "FRICTIONLESS_GROWTH", 
      shortDesc: "Scale without the management headache of a bloated team.",
      longDesc: "Growth usually means more overhead. Our systems are built to scale infinitely without increasing your headcount. We automate fulfillment and onboarding, meaning your 100th customer costs the same to manage as your 1st.",
      icon: <Users size={40} />,
      impact: "500% CAPACITY INCREASE."
    },
    { 
      id: "03", 
      title: "NEURAL_LEAD_CAPTURE", 
      shortDesc: "24/7 smart agents that qualify and book your calendar.",
      longDesc: "Speed-to-lead is vital. We deploy custom-trained AI agents on your website that qualify prospects and book meetings directly into your calendar the second interest is shown.",
      icon: <Bot size={40} />,
      impact: "SUB-SECOND RESPONSE TIME."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-32 px-4">
      <div className="mb-32">
        <span className="text-[12px] font-mono tracking-[1em] text-[#CCFF00] uppercase font-bold block mb-4 text-center">HUMAN_LOG_ENTRY</span>
        <h2 className="text-5xl sm:text-7xl md:text-[12rem] font-heading font-black text-white uppercase tracking-tighter text-center leading-[0.75] stark-gradient">
          MEET <br /> SALMAN.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-2 p-16 flex flex-col justify-between border-l-4 border-[#CCFF00]"
        >
          <div>
            <h3 className="text-4xl sm:text-5xl font-heading font-black mb-8 uppercase tracking-tighter">THE_PHILOSOPHY</h3>
            <p className="text-white/60 text-xl font-heading font-medium leading-relaxed uppercase tracking-tight">
              I'm Salman<br /><br />
              I build the neural infrastructure for businesses that want to scale without chaos.<br /><br />
              I believe technology should be felt in the bank account, not in the complexity of your day.
            </p>
          </div>
          <div className="mt-20 p-8 bg-white/5 border border-white/10 flex items-center gap-6">
            <div className="w-16 h-16 bg-[#CCFF00] flex items-center justify-center text-black">
              <Smile size={32} />
            </div>
            <p className="text-[11px] font-mono tracking-widest uppercase text-white/80">"IIterating to your absolute satisfaction is my baseline."</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          {helpPoints.map(point => (
            <div 
              key={point.id}
              onClick={() => setSelectedDetail(point)}
              className="glass-2 p-8 group cursor-pointer hover:bg-white/[0.03] transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono text-[#CCFF00] font-bold">MODULE_{point.id}</span>
                <ArrowRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all text-[#CCFF00]" />
              </div>
              <h4 className="text-2xl sm:text-3xl font-heading font-black uppercase text-white mb-2">{point.title}</h4>
              <p className="text-sm font-heading font-medium text-white/40 uppercase tracking-tight">{point.shortDesc}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedDetail && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl"
          >
            <div className="max-w-4xl w-full glass-2 p-6 md:p-16 relative border-t-8 border-[#CCFF00]">
              <button onClick={() => setSelectedDetail(null)} className="absolute top-4 right-4 md:top-8 md:right-8 text-white/40 hover:text-white transition-colors">
                <X size={32} />
              </button>
              <div className="mb-8 md:mb-12">
                <span className="text-[10px] font-mono text-[#CCFF00] uppercase block mb-4">DEEP_DIVE: {selectedDetail.id}</span>
                <h3 className="text-xl sm:text-4xl md:text-6xl font-heading font-black uppercase text-white tracking-tighter mb-6 md:mb-8 break-words leading-none">{selectedDetail.title}</h3>
                <p className="text-base sm:text-xl md:text-2xl text-white/70 font-heading font-bold uppercase leading-tight tracking-tight">{selectedDetail.longDesc}</p>
              </div>
              <div className="bg-[#CCFF00] p-6 md:p-10 text-black">
                <p className="text-[10px] font-mono font-bold uppercase mb-2">EXPECTED_IMPACT:</p>
                <p className="text-xl sm:text-3xl md:text-5xl font-heading font-black uppercase tracking-tighter break-words leading-none">{selectedDetail.impact}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-32">
        <button 
          onClick={onNext}
          className="w-full py-12 bg-white text-black font-heading font-black text-xl sm:text-2xl tracking-[0.2em] uppercase hover:bg-[#CCFF00] transition-colors shadow-[20px_20px_0_rgba(204,255,0,0.2)]"
        >
          LAUNCH_ARCHITECTURE <ArrowRight className="inline-block ml-4" size={40} />
        </button>
      </div>
    </div>
  );
};
