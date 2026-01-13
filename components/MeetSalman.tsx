import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Smile, 
  X, 
  Zap, 
  Users, 
  Bot, 
  Terminal, 
  Cpu, 
  Database, 
  ShieldCheck, 
  ChevronRight, 
  CheckCircle, 
  RefreshCw, 
  TrendingUp, 
  UserPlus, 
  Brain, 
  Calendar, 
  Filter 
} from 'lucide-react';

interface SpecItem {
  title: string;
  explanation: string;
  icon: React.ReactNode;
}

interface HelpDetail {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  icon: React.ReactNode;
  impact: string;
  specs: SpecItem[];
}

export const MeetSalman: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [selectedDetail, setSelectedDetail] = useState<HelpDetail | null>(null);
  const [showPhilosophy, setShowPhilosophy] = useState(false);
  const [expandedSpecIndex, setExpandedSpecIndex] = useState<number | null>(null);

  const helpPoints: HelpDetail[] = [
    { 
      id: "01", 
      title: "DELETING CHORES", 
      shortDesc: "Tasks that used to take 4 hours now take 4 seconds.",
      longDesc: "We find the boring things you do every day—like spreadsheets, reports, and emails—and build a robot to do them for you. It's faster, cheaper, and never makes a mistake.",
      icon: <Zap size={40} />,
      impact: "SAVE 20+ HOURS PER WEEK.",
      specs: [
        { 
          title: "Custom AI Robots", 
          icon: <Bot size={14} />, 
          explanation: "I build specialized digital assistants that live in your workspace, handling the repetitive data-heavy tasks that usually eat up your morning." 
        },
        { 
          title: "Automatic Fact-Checking", 
          icon: <CheckCircle size={14} />, 
          explanation: "Never worry about human error again. Our systems cross-reference every piece of data against source truth in real-time to ensure perfect accuracy." 
        },
        { 
          title: "Syncs with your apps", 
          icon: <RefreshCw size={14} />, 
          explanation: "Whether you use Slack, Excel, or custom CRMs, our robots move data between them seamlessly without you ever lifting a finger." 
        }
      ]
    },
    { 
      id: "02", 
      title: "GROW WITHOUT THE CHAOS", 
      shortDesc: "Grow your business without hiring a giant, messy team.",
      longDesc: "Growth usually means more stress. I build systems that grow with you, handling 100 customers just as easily as 1. We automate the 'boring' parts of running your office so you stay small and profitable.",
      icon: <Users size={40} />,
      impact: "1 BOT = 10 EMPLOYEES.",
      specs: [
        { 
          title: "Scales automatically", 
          icon: <TrendingUp size={14} />, 
          explanation: "Our architecture is built on cloud-native technology that automatically expands its processing power as your business volume grows." 
        },
        { 
          title: "Fast Customer Help", 
          icon: <Zap size={14} />, 
          explanation: "Deploy AI agents that resolve 80% of common support tickets instantly, maintaining high satisfaction while you focus on high-level work." 
        },
        { 
          title: "Easy Onboarding", 
          icon: <UserPlus size={14} />, 
          explanation: "Automate the paperwork and training flows for new clients and employees, making growth feel like a simple switch you just flip." 
        }
      ]
    },
    { 
      id: "03", 
      title: "AUTOMATIC SALES", 
      shortDesc: "24/7 smart agents that find and book your meetings.",
      longDesc: "Don't miss a lead because you were at lunch. I put a smart AI on your site that talks to customers, answers their questions, and books them right into your calendar immediately.",
      icon: <Bot size={40} />,
      impact: "REPLY TO CUSTOMERS INSTANTLY.",
      specs: [
        { 
          title: "Smart AI Brain", 
          icon: <Brain size={14} />, 
          explanation: "Uses cutting-edge logic to understand complex customer intent and respond with neighborly charm and technical accuracy." 
        },
        { 
          title: "Connects to your Calendar", 
          icon: <Calendar size={14} />, 
          explanation: "Full integration with Google Calendar and Outlook to find, hold, and confirm appointments without any back-and-forth emails." 
        },
        { 
          title: "Qualifies Leads for you", 
          icon: <Filter size={14} />, 
          explanation: "The agent asks the right questions to ensure you only spend your valuable time talking to high-budget, high-intent prospects." 
        }
      ]
    }
  ];

  const handleOpenDetail = (point: HelpDetail) => {
    setSelectedDetail(point);
    setExpandedSpecIndex(null);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 lg:py-32 px-4 relative">
      <div className="mb-16 lg:mb-32">
        <span className="text-[10px] lg:text-[12px] font-mono tracking-[1em] text-[#CCFF00] uppercase font-bold block mb-4 text-center">HELLO, NEIGHBOR</span>
        <h2 className="text-4xl sm:text-7xl lg:text-[8rem] xl:text-[10rem] font-heading font-black text-white uppercase tracking-tighter text-center leading-[0.75] stark-gradient">
          MEET <br /> SALMAN.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-stretch">
        <motion.div 
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          onClick={() => setShowPhilosophy(true)}
          className="glass-2 p-10 lg:p-16 flex flex-col justify-between border-l-4 border-[#CCFF00] cursor-pointer group hover:bg-white/[0.04] transition-all"
        >
          <div>
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-3xl lg:text-5xl font-heading font-black uppercase tracking-tighter">MY PROMISE</h3>
               <div className="text-[#CCFF00] opacity-0 group-hover:opacity-100 transition-all font-mono text-[10px] tracking-widest hidden lg:block">[HOW_I_THINK]</div>
            </div>
            <p className="text-white/60 text-lg lg:text-xl font-heading font-medium leading-relaxed uppercase tracking-tight">
              I'M SALMAN.<br /><br />
              I BUILD THE SYSTEMS THAT HELP BUSINESS OWNERS RECLAIM THEIR TIME.<br /><br />
              I BELIEVE TECH SHOULD MAKE YOUR LIFE EASIER AND YOUR BANK ACCOUNT BIGGER, NOT MORE COMPLICATED.
            </p>
          </div>
          <div className="mt-12 lg:mt-20 p-6 lg:p-8 bg-white/5 border border-white/10 flex items-center gap-6">
            <div className="w-14 h-14 bg-[#CCFF00] flex items-center justify-center text-black shrink-0">
              <Smile size={32} />
            </div>
            <p className="text-[10px] font-mono tracking-widest uppercase text-white/80 leading-snug">"I won't stop until you're absolutely thrilled with the result."</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4">
          {helpPoints.map(point => (
            <div key={point.id} onClick={() => handleOpenDetail(point)} className="glass-2 p-6 lg:p-8 group cursor-pointer hover:bg-white/[0.03] transition-all relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono text-[#CCFF00] font-bold">MODULE_{point.id}</span>
                <ArrowRight className="opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all text-[#CCFF00]" />
              </div>
              <h4 className="text-2xl lg:text-3xl font-heading font-black uppercase text-white mb-2">{point.title}</h4>
              <p className="text-[11px] lg:text-sm font-heading font-medium text-white/40 uppercase tracking-tight">{point.shortDesc}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedDetail && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl"
          >
            <div className="max-w-4xl w-full glass-2 p-8 lg:p-16 relative border-t-8 border-[#CCFF00] max-h-[90vh] overflow-y-auto custom-scrollbar">
              <button onClick={() => setSelectedDetail(null)} className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"><X size={32} /></button>
              <div className="mb-8 lg:mb-12">
                <span className="text-[10px] font-mono text-[#CCFF00] uppercase block mb-4">DEEP DIVE: {selectedDetail.id}</span>
                <h3 className="text-3xl lg:text-6xl font-heading font-black uppercase text-white tracking-tighter mb-6 lg:mb-8 leading-none">{selectedDetail.title}</h3>
                <p className="text-base lg:text-2xl text-white/70 font-heading font-bold uppercase leading-tight tracking-tight mb-8">{selectedDetail.longDesc}</p>
                <div className="grid grid-cols-1 gap-3 mb-8">
                  {selectedDetail.specs.map((spec, i) => (
                    <div 
                      key={i} 
                      className="cursor-pointer border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all overflow-hidden"
                      onClick={() => setExpandedSpecIndex(expandedSpecIndex === i ? null : i)}
                    >
                      <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-4">
                          <span className="text-[#CCFF00]">{spec.icon}</span>
                          <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest font-black">{spec.title}</span>
                        </div>
                        <ChevronRight size={14} className={`text-[#CCFF00] transition-transform ${expandedSpecIndex === i ? 'rotate-90' : ''}`} />
                      </div>
                      <AnimatePresence>
                        {expandedSpecIndex === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-4 pb-4 border-t border-white/5"
                          >
                            <p className="pt-3 text-[10px] font-sans font-medium text-white/40 uppercase leading-relaxed tracking-tight">
                              {spec.explanation}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#CCFF00] p-6 lg:p-10 text-black">
                <p className="text-[9px] font-mono font-bold uppercase mb-2 opacity-60">THE OUTCOME:</p>
                <p className="text-2xl lg:text-5xl font-heading font-black uppercase tracking-tighter leading-none">{selectedDetail.impact}</p>
              </div>
            </div>
          </motion.div>
        )}

        {showPhilosophy && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl"
          >
             <div className="max-w-6xl w-full glass-2 h-[90vh] flex flex-col relative border-l-8 border-[#CCFF00] overflow-hidden">
                <div className="p-8 lg:p-16 border-b border-white/10 shrink-0 bg-black">
                   <button onClick={() => setShowPhilosophy(false)} className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"><X size={32} /></button>
                  <span className="text-[10px] lg:text-[12px] font-mono tracking-[1em] text-[#CCFF00] uppercase font-bold block mb-4">MY_PRINCIPLES</span>
                  <h3 className="text-4xl sm:text-6xl lg:text-8xl font-heading font-black text-white uppercase tracking-tighter leading-none mb-4">THE CORE <br /> RULES.</h3>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-8 lg:p-16 bg-black/20">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-8 text-white/70 text-lg lg:text-xl font-heading font-medium uppercase leading-tight">
                         <p className="flex gap-4"><span className="text-[#CCFF00] font-black">01.</span> SCALE WITHOUT STRESS. IF IT'S REPETITIVE, IT SHOULD BE AUTOMATED.</p>
                         <p className="flex gap-4"><span className="text-[#CCFF00] font-black">02.</span> PROFIT FIRST. INNOVATION IS USELESS IF IT DOESN'T SAVE OR MAKE YOU MONEY.</p>
                         <p className="flex gap-4"><span className="text-[#CCFF00] font-black">03.</span> EASY TO USE. IF YOUR TEAM CAN'T USE THE SYSTEM, IT'S A BAD SYSTEM.</p>
                    </div>

                    <div className="space-y-10 lg:space-y-12">
                      <div className="bg-white/5 p-8 border border-white/10 space-y-10">
                        <div className="flex items-center gap-6">
                          <Terminal className="text-[#CCFF00]" size={32} />
                          <span className="text-[9px] lg:text-[10px] font-mono tracking-widest text-white/40 uppercase font-black">MY TECH STACK</span>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                           {[
                             { label: "SMART ENGINE", value: "Google Gemini 3 Pro", icon: <Cpu /> },
                             { label: "DATA CENTER", value: "Private Secured Sync", icon: <Database /> },
                             { label: "SECURITY", value: "Zero-Trust Private Vault", icon: <ShieldCheck /> }
                           ].map((item, i) => (
                             <div key={i} className="flex items-center justify-between py-4 border-b border-white/5">
                               <div className="flex items-center gap-4">
                                 <span className="text-white/30">{item.icon}</span>
                                 <span className="text-[10px] font-mono font-black text-white/60">{item.label}</span>
                               </div>
                               <span className="text-[10px] font-mono font-black text-[#CCFF00]">{item.value}</span>
                             </div>
                           ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-20 lg:mt-32">
        <button onClick={onNext} className="w-full py-10 lg:py-12 bg-white text-black font-heading font-black text-lg lg:text-2xl tracking-[0.2em] uppercase hover:bg-[#CCFF00] transition-colors shadow-[15px_15px_0_rgba(204,255,0,0.2)]">
          LAUNCH AUTOMATION <ArrowRight className="inline-block ml-4" size={40} />
        </button>
      </div>
    </div>
  );
};