import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, 
  ArrowRight, 
  Target, 
  MessageSquare, 
  Search, 
  Phone, 
  X, 
  Layers, 
  Terminal, 
  MonitorPlay, 
  Music, 
  GitCompare, 
  MessageCircle, 
  RefreshCw, 
  Brain, 
  Calendar, 
  Clock, 
  ChevronRight,
  MousePointer2,
  UserCheck,
  MailCheck,
  Sparkles,
  Zap,
  CalendarCheck,
  Moon
} from 'lucide-react';
import { ServiceDetail } from '../types';

interface TechItem {
  title: string;
  explanation: string;
  icon: React.ReactNode;
}

interface SalesSpec {
  title: string;
  flow: string;
  conversion: string;
  tech: TechItem[];
}

const SalesCard = ({ title, description, icon, onSelect, onExpand, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay, duration: 0.6 }}
    className="brutalist-panel p-8 lg:p-16 group border-white/10 hover:border-white transition-all bg-black/40 hover:bg-black/60 shadow-[20px_20px_0px_rgba(255,255,255,0.01)] flex flex-col"
  >
    <div className="flex items-center justify-between mb-8 lg:mb-12">
      <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white/5 group-hover:bg-white flex items-center justify-center transition-all border border-white/10">
        <span className="text-white group-hover:text-black transition-colors">{icon}</span>
      </div>
      <div className="flex gap-2">
         <button onClick={(e) => { e.stopPropagation(); onExpand(); }} className="p-3 border border-white/10 text-white/40 hover:text-[#CCFF00] hover:border-[#CCFF00] transition-all">
          <Layers size={20} />
        </button>
        <button onClick={onSelect} className="p-3 border border-white/10 text-white group-hover:text-white transition-all hover:border-white">
          <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />
        </button>
      </div>
    </div>
    <h3 className="text-3xl lg:text-4xl font-heading font-black text-white uppercase tracking-tighter mb-4 lg:mb-6 leading-none">{title}</h3>
    <p className="text-white/60 text-sm lg:text-base font-heading font-medium uppercase leading-tight group-hover:text-white/90 transition-colors tracking-tight flex-1 mb-10">{description}</p>
    <button onClick={onSelect} className="text-[10px] font-mono tracking-widest text-[#CCFF00] uppercase font-bold hover:underline text-left">
      [START_GROWING]
    </button>
  </motion.div>
);

export const SalesGeneration: React.FC<{ onSelect: (s: ServiceDetail) => void, onNext: () => void }> = ({ onSelect, onNext }) => {
  const [expandedSpec, setExpandedSpec] = useState<SalesSpec | null>(null);
  const [expandedTechIndex, setExpandedTechIndex] = useState<number | null>(null);

  const salesServices: (ServiceDetail & { spec: SalesSpec })[] = [
    { 
      id: 'mass-content',
      title: "AD MACHINE", 
      tagline: "Content for Days.",
      description: "High-quality videos and ads made instantly to keep your business everywhere.", 
      problem: "Making good ads takes too long and costs thousands of dollars every time.",
      solution: "I build an AI setup that creates hundreds of professional posts and videos in minutes.",
      examples: [
        { title: "Pro videos for social media.", icon: <MonitorPlay size={20} />, description: "Cinematic, high-impact vertical videos designed for TikTok, Reels, and Shorts that grab attention in the first 2 seconds." },
        { title: "Ads people actually want to click.", icon: <MousePointer2 size={20} />, description: "Psychology-backed ad copy and visuals that resonate with your ideal customer's specific pain points and desires." },
        { title: "A month of posts made in an hour.", icon: <Calendar size={20} />, description: "I set up a content production line that batches your monthly marketing material in one high-speed session." }
      ],
      icon: <Video size={32} />,
      spec: {
        title: "VIDEO_FACTORY",
        flow: "High-quality templates merged with AI to produce 50+ variations of every ad.",
        conversion: "80% More Clicks",
        tech: [
          { 
            title: "Auto Video Gen", 
            icon: <MonitorPlay size={16} />, 
            explanation: "Automated rendering engine that takes your brand assets and churns out dozens of high-quality video variants for every platform."
          },
          { 
            title: "Smart Audio Sync", 
            icon: <Music size={16} />, 
            explanation: "AI-driven audio matching that ensures music beats and voiceovers align perfectly with visual transitions for maximum impact."
          },
          { 
            title: "A/B Testing Bots", 
            icon: <GitCompare size={16} />, 
            explanation: "Automated analysis that tracks which versions of your ads perform best, constantly refining the output to increase your ROI."
          }
        ]
      }
    },
    { 
      id: 'lead-gen',
      title: "FIND CUSTOMERS", 
      tagline: "Outreach on Autopilot.",
      description: "We find people who want to buy from you and send them friendly messages automatically.", 
      problem: "Finding new customers is slow, boring, and feels like searching for a needle in a haystack.",
      solution: "My tools find your perfect customers and send them messages that sound like they're from a friend.",
      examples: [
        { title: "Hundreds of new contacts every month.", icon: <UserCheck size={20} />, description: "Our lead search engine identifies highly qualified prospects in your area who are showing active buying intent right now." },
        { title: "Emails that actually get opened.", icon: <MailCheck size={20} />, description: "Custom AI-driven subject lines and personalization that bypasses spam filters and feels like a personal note from a neighbor." },
        { title: "Personalized messages for everyone.", icon: <Sparkles size={20} />, description: "Every single outreach message is customized with data points unique to the recipient, ensuring they feel seen and heard." }
      ],
      icon: <Search size={32} />,
      spec: {
        title: "OUTREACH_BOT",
        flow: "AI scans for high-quality leads and sends personalized messages across all platforms.",
        conversion: "15% Booking Rate",
        tech: [
          { 
            title: "Lead Search Engine", 
            icon: <Search size={16} />, 
            explanation: "Advanced scraping and filtering logic that identifies high-intent prospects based on real-time market activity and social signals."
          },
          { 
            title: "AI Messaging", 
            icon: <MessageCircle size={16} />, 
            explanation: "Natural language generation that creates personalized outreach messages, ensuring every lead feels like they're talking to a human."
          },
          { 
            title: "Sync with your CRM", 
            icon: <RefreshCw size={16} />, 
            explanation: "Direct integration with your existing sales tools, automatically moving new leads into your pipeline without manual data entry."
          }
        ]
      }
    },
    { 
      id: 'closing-engines',
      title: "24/7 SALES CHAT", 
      tagline: "Never Miss a Lead.",
      description: "A smart assistant that talks to your customers and books meetings while you sleep.", 
      problem: "If you don't reply to a customer in 5 minutes, they go to your competition.",
      solution: "I set up a smart chat that answers questions and books your calendar 24/7.",
      examples: [
        { title: "Instant replies on your site.", icon: <Zap size={20} />, description: "Your custom AI agent answers 90% of customer questions instantly with neighborly charm and technical accuracy." },
        { title: "Meetings booked automatically.", icon: <CalendarCheck size={20} />, description: "The second a customer is ready, our agent shows your live availability and secures the meeting in your calendar." },
        { title: "Sales handled while you're offline.", icon: <Moon size={20} />, description: "Wake up to a calendar full of qualified appointments and customers who have already been pre-vetted by your AI assistant." }
      ],
      icon: <MessageSquare size={32} />,
      spec: {
        title: "CLOSER_AGENTS",
        flow: "Smart chat that uses your business data to answer questions and push for a booking.",
        conversion: "Zero Leads Lost",
        tech: [
          { 
            title: "Gemini 3 Logic", 
            icon: <Brain size={16} />, 
            explanation: "Powered by Google's latest LLMs to handle complex customer queries with deep business context and neighborly charm."
          },
          { 
            title: "Live Calendar Link", 
            icon: <Calendar size={16} />, 
            explanation: "Instant two-way sync with your calendar, allowing customers to book qualified appointments the second they are ready."
          },
          { 
            title: "24/7 Support", 
            icon: <Clock size={16} />, 
            explanation: "Our agents never sleep, ensuring that every lead is captured and engaged immediately, regardless of the time or day."
          }
        ]
      }
    }
  ];

  const handleOpenSpec = (spec: SalesSpec) => {
    setExpandedSpec(spec);
    setExpandedTechIndex(null);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 lg:py-20 px-4 relative">
      <div className="mb-20 lg:mb-32 flex flex-col md:flex-row items-start lg:items-end justify-between gap-10">
        <div className="flex-1">
          <span className="text-[10px] md:text-[12px] font-sans tracking-[0.5em] text-white/50 uppercase font-black block mb-6">GET MORE SALES</span>
          <h2 className="text-4xl sm:text-7xl lg:text-8xl font-heading font-black text-white uppercase tracking-tighter stark-gradient leading-[0.9]">
            SALES <br /> GENERATION.
          </h2>
        </div>
        <div className="max-w-md border-l-2 lg:border-l-4 border-white pl-6 lg:pl-10">
          <p className="text-white/60 text-[10px] lg:text-[11px] font-sans tracking-[0.2em] uppercase font-black leading-relaxed">
            I USE SMART TOOLS TO FIND YOUR IDEAL CLIENTS, TALK TO THEM, AND BOOK THEM INTO YOUR CALENDAR WITHOUT YOU LIFTING A FINGER.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 mb-20">
        {salesServices.map((s, idx) => (
          <SalesCard key={s.id} title={s.title} description={s.description} icon={s.icon} delay={idx * 0.1}
            onSelect={() => onSelect(s)} onExpand={() => handleOpenSpec(s.spec)} />
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="brutalist-panel p-10 lg:p-24 bg-white text-black border-white text-center"
      >
        <h3 className="text-4xl sm:text-7xl lg:text-8xl font-heading font-black mb-6 uppercase tracking-tighter leading-none">WANT MORE SALES?</h3>
        <p className="text-black/60 text-xs lg:text-base font-heading font-bold uppercase mb-12 tracking-widest max-w-2xl mx-auto">
          IF YOU'RE READY TO GROW WITHOUT WORKING 100 HOURS A WEEK, LET'S HAVE A CHAT.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6 max-w-4xl mx-auto">
          <button onClick={onNext} className="flex-1 w-full flex items-center justify-center gap-4 px-6 py-6 lg:py-8 bg-black text-white font-heading font-black text-xs lg:text-lg tracking-[0.3em] uppercase hover:scale-105 transition-all">
            FREE STRATEGY CHAT
          </button>
          <a href="tel:905-749-0266" className="flex-1 w-full flex items-center justify-center gap-4 px-6 py-6 lg:py-8 border-2 border-black text-black font-heading font-black text-xs lg:text-lg tracking-[0.3em] uppercase hover:bg-black hover:text-white transition-all">
            <Phone size={24} /> CALL SAL
          </a>
        </div>
      </motion.div>

      <AnimatePresence>
        {expandedSpec && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl"
          >
             <div className="max-w-4xl w-full glass-2 p-10 lg:p-20 relative border-l-8 border-[#CCFF00] max-h-[90vh] overflow-y-auto custom-scrollbar">
                <button onClick={() => setExpandedSpec(null)} className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"><X size={32} /></button>
                <div className="mb-12">
                   <span className="text-[10px] font-mono tracking-[1em] text-[#CCFF00] uppercase font-bold block mb-4">THE_GROWTH_PLAN</span>
                   <h3 className="text-3xl lg:text-6xl font-heading font-black text-white uppercase tracking-tighter leading-none mb-6">{expandedSpec.title}</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                   <div className="space-y-8">
                     <div>
                        <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest block mb-4 font-black">HOW WE GET CLIENTS</span>
                        <p className="text-lg lg:text-2xl font-heading font-bold text-white/80 uppercase leading-tight tracking-tight">{expandedSpec.flow}</p>
                     </div>
                     <div className="bg-white p-8 text-black border-2 border-[#CCFF00]">
                        <span className="text-[9px] font-mono font-black uppercase mb-2 block tracking-widest opacity-60">ESTIMATED LIFT</span>
                        <p className="text-3xl lg:text-5xl font-heading font-black uppercase tracking-tighter leading-none">{expandedSpec.conversion}</p>
                     </div>
                   </div>

                   <div className="space-y-8">
                      <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest block font-black">TECH STACK</span>
                      <div className="space-y-3">
                         {expandedSpec.tech.map((item, i) => (
                           <div 
                             key={i} 
                             className="cursor-pointer border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all overflow-hidden"
                             onClick={() => setExpandedTechIndex(expandedTechIndex === i ? null : i)}
                           >
                              <div className="flex items-center justify-between p-4">
                                <div className="flex items-center gap-4">
                                  <span className="text-[#CCFF00]">{item.icon}</span>
                                  <span className="text-[10px] font-mono font-black text-white/70 uppercase tracking-widest">{item.title}</span>
                                </div>
                                <ChevronRight size={14} className={`text-[#CCFF00] transition-transform ${expandedTechIndex === i ? 'rotate-90' : ''}`} />
                              </div>
                              
                              <AnimatePresence>
                                {expandedTechIndex === i && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="px-4 pb-4 border-t border-white/5"
                                  >
                                    <p className="pt-3 text-[10px] font-sans font-medium text-white/40 uppercase leading-relaxed tracking-tight">
                                      {item.explanation}
                                    </p>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                           </div>
                         ))}
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