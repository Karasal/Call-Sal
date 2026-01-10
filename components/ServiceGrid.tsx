import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Workflow, Rocket, TrendingUp, Users, Video, ArrowRight, Cog, Database, ShieldCheck, Clock, Monitor, Link } from 'lucide-react';
import { ServiceCardProps, ServiceDetail } from '../types';

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, delay, onConfigure }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6, ease: "easeOut" }}
    onClick={onConfigure}
    className="group brutalist-card p-14 relative overflow-hidden cursor-pointer bg-black/50 border-white/10 hover:border-white/50"
  >
    <div className="absolute -top-4 -right-4 text-white/[0.05] group-hover:text-white/20 transition-all duration-700 pointer-events-none">
      <div className="scale-[4]">
        {icon}
      </div>
    </div>
    
    <div className="relative z-10 space-y-12">
      <div className="w-16 h-16 bg-white/5 group-hover:bg-white flex items-center justify-center transition-all duration-500 rounded-none border border-white/10 group-hover:border-white">
        <span className="text-white group-hover:text-black transition-colors duration-500">{icon}</span>
      </div>
      <div>
        <h3 className="text-4xl font-heading font-black text-white uppercase tracking-tighter mb-6 leading-none">{title}</h3>
        <p className="text-white/60 font-heading font-medium text-base leading-tight uppercase tracking-tight group-hover:text-white/90 transition-colors duration-500">
          {description}
        </p>
      </div>
      
      <div className="pt-10">
        <button className="flex items-center gap-4 text-[11px] font-sans tracking-[0.6em] text-white uppercase font-black group-hover:translate-x-3 transition-transform duration-300">
          TELL ME MORE <ArrowRight size={16} />
        </button>
      </div>
    </div>
  </motion.div>
);

interface GridProps {
  category?: 'automation' | 'sales';
  onSelect: (service: ServiceDetail) => void;
  onNext: () => void;
}

export const ServiceGrid: React.FC<GridProps> = ({ category = 'automation', onSelect, onNext }) => {
  const automationServices = [
    { 
      id: 'cost-reduction',
      title: "Get Time Back", 
      tagline: "Work Less, Do More.",
      description: "Stop doing the same repetitive office chores manually. We make them run themselves.", 
      problem: "Your team spends hours every day typing in data, sending emails, or fixing mistakes.",
      solution: "I build smart robots that do this work for you perfectly, 24 hours a day.",
      examples: [
        "Saved 20+ hours of staff time every week.",
        "Automatic email sorting and replies.",
        "Mistake-free paperwork handling."
      ],
      icon: <Clock size={32} />, 
      delay: 0.1 
    },
    { 
      id: 'custom-software',
      title: "Custom Apps", 
      tagline: "Built Just For You.",
      description: "We build simple, easy-to-use software that solves your specific business headaches.", 
      problem: "Standard software is too complicated and doesn't do exactly what you need it to do.",
      solution: "I build custom tools and simple apps that fit your business like a glove.",
      examples: [
        "A private 'brain' for your company knowledge.",
        "Simple dashboards to see your progress.",
        "Tools that your team will actually love using."
      ],
      icon: <Monitor size={32} />, 
      delay: 0.2 
    },
    { 
      id: 'system-integration',
      title: "Make Tools Talk", 
      tagline: "Everything Connected.",
      description: "We make your email, your calendar, and your spreadsheets talk to each other automatically.", 
      problem: "You're constantly copying and pasting info from one app to another.",
      solution: "I connect all your tools so they share info automatically without you doing a thing.",
      examples: [
        "Automatic updates across all your apps.",
        "One central spot for all your business info.",
        "No more copying and pasting between windows."
      ],
      icon: <Link size={32} />, 
      delay: 0.3 
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-20" id="automation">
      <div className="mb-32 flex flex-col md:flex-row items-end justify-between gap-16">
        <div className="flex-1">
          <span className="text-[10px] md:text-[12px] font-sans tracking-[0.4em] md:tracking-[1em] text-white/50 uppercase font-black block mb-8 leading-none">The Boring Stuff: Fixed</span>
          <h2 className="text-5xl md:text-8xl font-heading font-black text-white uppercase tracking-tighter stark-gradient leading-[0.85]">
            BUSINESS <br />
            AUTOMATION.
          </h2>
        </div>
        <div className="max-w-md border-l-4 border-white pl-10">
          <p className="text-white/60 text-[11px] font-sans tracking-[0.25em] uppercase font-black leading-relaxed">
            WE BUILD SYSTEMS THAT HANDLE THE REPETITIVE WORK FOR YOU. NO MORE HUMAN ERROR. NO MORE WASTED HOURS. JUST A BUSINESS THAT RUNS LIKE A WELL-OILED MACHINE.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-32">
        {automationServices.map((s, idx) => (
          <ServiceCard 
            key={s.id} 
            title={s.title} 
            description={s.description} 
            icon={s.icon} 
            delay={s.delay} 
            onConfigure={() => onSelect(s as any)}
          />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="brutalist-panel p-24 text-center border-white/5 bg-white/5 group hover:border-white/20 transition-all"
      >
        <h3 className="text-5xl font-heading font-black text-white uppercase tracking-tighter mb-12">FEELING EFFICIENT?</h3>
        <p className="text-white/50 text-xs font-sans tracking-[0.4em] uppercase font-black mb-16">NEXT: NOW LET'S GET YOU MORE CUSTOMERS.</p>
        <button 
          onClick={onNext}
          className="flex items-center justify-center gap-6 mx-auto px-16 py-8 bg-white text-black font-heading font-black text-sm tracking-[0.5em] uppercase hover:translate-x-3 transition-all active:scale-95"
        >
          GO TO SALES TOOLS <ArrowRight size={24} />
        </button>
      </motion.div>
    </div>
  );
};