
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Video, TrendingUp, ArrowRight, Target, Share2, Rocket, Globe, Zap, MessageSquare, PenTool, Search, Phone } from 'lucide-react';
import { ServiceDetail } from '../types';

const SalesCard = ({ title, description, icon, onSelect, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    onClick={onSelect}
    className="brutalist-panel p-16 group cursor-pointer border-white/10 hover:border-white transition-all bg-black/40 hover:bg-black/60 shadow-[20px_20px_0px_rgba(255,255,255,0.01)] hover:shadow-[30px_30px_0px_rgba(255,255,255,0.03)]"
  >
    <div className="flex items-center justify-between mb-12">
      <div className="w-20 h-20 bg-white/5 group-hover:bg-white flex items-center justify-center transition-all duration-500 border border-white/10 group-hover:border-white">
        <span className="text-white group-hover:text-black transition-colors duration-500">{icon}</span>
      </div>
      <ArrowRight className="text-white/40 group-hover:text-white transition-all group-hover:translate-x-2" size={32} />
    </div>
    <h3 className="text-4xl font-heading font-black text-white uppercase tracking-tighter mb-6 leading-none">{title}</h3>
    <p className="text-white/60 text-base font-heading font-medium uppercase leading-tight group-hover:text-white/90 transition-colors duration-500 tracking-tight">{description}</p>
  </motion.div>
);

export const SalesGeneration: React.FC<{ onSelect: (s: ServiceDetail) => void, onNext: () => void }> = ({ onSelect, onNext }) => {
  const salesServices: ServiceDetail[] = [
    { 
      id: 'mass-content',
      title: "AD MACHINE", 
      tagline: "Content for Days.",
      description: "High-quality videos and ads made instantly to keep your business everywhere.", 
      problem: "Making good ads and videos takes too long and costs thousands of dollars every time.",
      solution: "I build an AI setup that creates hundreds of professional posts and videos in minutes.",
      examples: ["Pro-quality videos for social media.", "Ads that people actually want to click.", "A month of posts made in an hour."],
      icon: <Video size={32} />
    },
    { 
      id: 'lead-gen',
      title: "FIND CUSTOMERS", 
      tagline: "Outreach on Autopilot.",
      description: "We find the people who want to buy from you and send them a friendly message automatically.", 
      problem: "Finding new customers is slow, boring, and feels like searching for a needle in a haystack.",
      solution: "My tools find your perfect customers and send them a message that sounds like it's from a friend.",
      examples: ["Hundreds of new contacts every month.", "Emails that actually get opened.", "Messages built specifically for each person."],
      icon: <Search size={32} />
    },
    { 
      id: 'closing-engines',
      title: "24/7 SALES CHAT", 
      tagline: "Never Miss a Lead.",
      description: "A smart assistant that talks to your customers and books meetings while you sleep.", 
      problem: "If you don't reply to a customer in 5 minutes, they go to your competition.",
      solution: "I set up a smart chat that answers questions, handles complaints, and books your calendar 24/7.",
      examples: ["Instant replies on your website.", "Meetings booked automatically.", "Sales handled while you're at home."],
      icon: <MessageSquare size={32} />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-20">
      <div className="mb-32 flex flex-col md:flex-row items-end justify-between gap-16">
        <div className="flex-1">
          <span className="text-[10px] md:text-[12px] font-sans tracking-[0.4em] md:tracking-[1em] text-white/50 uppercase font-black block mb-8 leading-none">Get More Customers</span>
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-heading font-black text-white uppercase tracking-tighter stark-gradient leading-[0.85]">
            SALES <br />
            GENERATION.
          </h2>
        </div>
        <div className="max-w-md border-l-4 border-white pl-10">
          <p className="text-white/60 text-[11px] font-sans tracking-[0.25em] uppercase font-black leading-relaxed">
            WE USE SMART TOOLS TO FIND YOUR IDEAL CUSTOMERS, TALK TO THEM, AND BOOK THEM INTO YOUR CALENDAR WITHOUT YOU EVER LIFTING A FINGER.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-32">
        {salesServices.map((s, idx) => (
          <SalesCard 
            key={s.id}
            title={s.title}
            description={s.description}
            icon={s.icon}
            delay={idx * 0.1}
            onSelect={() => onSelect(s)}
          />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="brutalist-panel p-16 md:p-24 bg-white text-black border-white shadow-[50px_50px_0px_rgba(255,255,255,0.05)] text-center"
      >
        <h3 className="text-5xl sm:text-7xl md:text-8xl font-heading font-black mb-10 uppercase tracking-tighter text-black">WANT MORE SALES?</h3>
        <p className="text-black/60 text-base font-heading font-bold uppercase mb-16 tracking-widest max-w-2xl mx-auto">
          IF YOU'RE READY TO GROW YOUR BUSINESS WITHOUT WORKING 100 HOURS A WEEK, LET'S HAVE A QUICK CHAT.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-4xl mx-auto">
          <button 
            onClick={onNext}
            className="flex-1 w-full flex items-center justify-center gap-6 px-10 py-8 bg-black text-white font-heading font-black text-sm md:text-lg tracking-[0.4em] uppercase hover:scale-105 transition-all shadow-[15px_15px_0px_rgba(0,0,0,0.1)] active:scale-95"
          >
            <MessageSquare size={24} /> FREE CONSULTATION
          </button>
          <a 
            href="tel:905-749-0266"
            className="flex-1 w-full flex items-center justify-center gap-6 px-10 py-8 border-4 border-black text-black font-heading font-black text-sm md:text-lg tracking-[0.4em] uppercase hover:bg-black hover:text-white transition-all shadow-[15px_15px_0px_rgba(0,0,0,0.05)] active:scale-95"
          >
            <Phone size={24} /> CALL SAL
          </a>
        </div>
      </motion.div>
    </div>
  );
};
