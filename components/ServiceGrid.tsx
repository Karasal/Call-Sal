
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Monitor, Link, ArrowRight, Phone, Zap } from 'lucide-react';
import { ServiceDetail } from '../types';

const AutomationCard = ({ title, description, icon, onSelect, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    onClick={onSelect}
    className="brutalist-panel p-8 md:p-16 group cursor-pointer border-white/10 hover:border-white transition-all bg-black/40 hover:bg-black/60 shadow-[20px_20px_0px_rgba(255,255,255,0.01)] hover:shadow-[30px_30px_0px_rgba(255,255,255,0.03)]"
  >
    <div className="flex items-center justify-between mb-8 md:mb-12">
      <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 group-hover:bg-white flex items-center justify-center transition-all duration-500 border border-white/10 group-hover:border-white">
        <span className="text-white group-hover:text-black transition-colors duration-500">{icon}</span>
      </div>
      <ArrowRight className="text-white/40 group-hover:text-white transition-all group-hover:translate-x-2" size={32} />
    </div>
    <h3 className="text-3xl md:text-4xl font-heading font-black text-white uppercase tracking-tighter mb-6 leading-none">{title}</h3>
    <p className="text-white/60 text-sm md:text-base font-heading font-medium uppercase leading-tight group-hover:text-white/90 transition-colors duration-500 tracking-tight">{description}</p>
  </motion.div>
);

interface GridProps {
  onSelect: (service: ServiceDetail) => void;
  onNext: () => void;
  category?: string;
}

export const ServiceGrid: React.FC<GridProps> = ({ onSelect, onNext }) => {
  const services: ServiceDetail[] = [
    { 
      id: 'cost-reduction',
      title: "TIME_ALLOCATION", 
      tagline: "Eradicate repetitive manual work.",
      description: "We eradicate repetitive manual work with neural processing and smart robots.", 
      problem: "Teams spend 40% of their time on low-value data entry and admin tasks.",
      solution: "We build custom neural scripts that automate the boring stuff so you can focus on growth.",
      examples: ["Auto-processing of client reports.", "Neural data synchronization.", "Zero-effort administrative workflows."],
      icon: <Clock size={32} />
    },
    { 
      id: 'custom-software',
      title: "NEURAL_APPS", 
      tagline: "Bespoke digital architecture.",
      description: "Bespoke digital architecture built to fit your unique operational profile.", 
      problem: "Off-the-shelf software is clunky and doesn't fit your unique business flow.",
      solution: "We build custom internal tools designed specifically for your team's existing habits.",
      examples: ["Custom CRM for your niche.", "Internal project portals.", "Automated client onboarding systems."],
      icon: <Monitor size={32} />
    },
    { 
      id: 'system-integration',
      title: "TOOL_SYMPHONY", 
      tagline: "Connect your legacy stacks.",
      description: "Deep integration layer connecting all your legacy stacks into a single stream.", 
      problem: "Your data is trapped in different apps that don't talk to each other.",
      solution: "We create a unified data bridge that connects all your tools into one smooth pipeline.",
      examples: ["Slack + CRM + Invoicing sync.", "Unified customer dashboard.", "Automated cross-platform reporting."],
      icon: <Link size={32} />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-20 px-4 md:px-0">
      <div className="mb-32 flex flex-col md:flex-row items-end justify-between gap-16">
        <div className="flex-1">
          <span className="text-[10px] md:text-[12px] font-sans tracking-[0.4em] md:tracking-[1em] text-white/50 uppercase font-black block mb-8 leading-none">OPTIMIZATION_PROTOCOL_01</span>
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-heading font-black text-white uppercase tracking-tighter stark-gradient leading-[0.85]">
            BUSINESS <br />
            AUTOMATION.
          </h2>
        </div>
        <div className="max-w-md border-l-4 border-white pl-10">
          <p className="text-white/60 text-[11px] font-sans tracking-[0.25em] uppercase font-black leading-relaxed">
            WE ERADICATE REPETITIVE MANUAL WORK WITH NEURAL PROCESSING AND SMART ROBOTS, BUILDING CUSTOM DIGITAL ARCHITECTURE THAT FITS YOUR PROFILE.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-32">
        {services.map((s, idx) => (
          <AutomationCard 
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
        <h3 className="text-5xl sm:text-7xl md:text-8xl font-heading font-black mb-10 uppercase tracking-tighter text-black">ELIMINATE OVERHEAD?</h3>
        <p className="text-black/60 text-base font-heading font-bold uppercase mb-16 tracking-widest max-w-2xl mx-auto">
          IF YOU'RE READY TO UPGRADE YOUR OPERATIONS AND ARCHITECT THE SALES GENERATION LAYER, LET'S DEPLOY.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-4xl mx-auto">
          <button 
            onClick={onNext}
            className="flex-1 w-full flex items-center justify-center gap-6 px-10 py-8 bg-black text-white font-heading font-black text-sm md:text-lg tracking-[0.4em] uppercase hover:scale-105 transition-all shadow-[15px_15px_0px_rgba(0,0,0,0.1)] active:scale-95"
          >
            NEXT_PROTOCOL <ArrowRight size={24} />
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
