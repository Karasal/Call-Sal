import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Monitor, Link, ArrowRight, Phone, Cpu, X, Terminal, Code, ShieldCheck, Zap, Database, Layers, ChevronRight, Activity, Globe, Layout, FileText, RefreshCw, UserPlus, BarChart3, Box, Users } from 'lucide-react';
import { ServiceDetail } from '../types';

interface StackItem {
  title: string;
  explanation: string;
  icon: React.ReactNode;
}

interface ExpansionSpec {
  title: string;
  logic: string;
  stack: StackItem[];
  metrics: string;
}

const AutomationCard = ({ title, description, icon, onSelect, onExpand, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    className="brutalist-panel p-8 group border-white/10 hover:border-white transition-all bg-black/40 hover:bg-black/60 shadow-[20px_20px_0px_rgba(255,255,255,0.01)] flex flex-col"
  >
    <div className="flex items-center justify-between mb-10">
      <div className="w-16 h-16 bg-white/5 group-hover:bg-white flex items-center justify-center transition-all duration-500 border border-white/10 group-hover:border-white">
        <span className="text-white group-hover:text-black transition-colors duration-500">{icon}</span>
      </div>
      <div className="flex gap-2">
        <button 
          onClick={(e) => { e.stopPropagation(); onExpand(); }}
          className="p-3 border border-white/10 text-white/40 hover:text-[#CCFF00] hover:border-[#CCFF00] transition-all"
        >
          <Terminal size={20} />
        </button>
        <button 
          onClick={onSelect}
          className="p-3 border border-white/10 text-white group-hover:text-white transition-all hover:border-white"
        >
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
    <h3 className="text-3xl font-heading font-black text-white uppercase tracking-tighter mb-4 leading-none">{title}</h3>
    <p className="text-white/60 text-sm font-heading font-medium uppercase leading-tight group-hover:text-white/90 transition-colors duration-500 tracking-tight flex-1 mb-8">{description}</p>
    <button onClick={onSelect} className="text-[9px] font-mono tracking-widest text-white/30 uppercase group-hover:text-white transition-colors text-left">
      [HOW_IT_WORKS]
    </button>
  </motion.div>
);

export const ServiceGrid: React.FC<{ category?: string, onSelect: (s: ServiceDetail) => void, onNext: () => void }> = ({ onSelect, onNext }) => {
  const [expandedSpec, setExpandedSpec] = useState<ExpansionSpec | null>(null);
  const [expandedStackIndex, setExpandedStackIndex] = useState<number | null>(null);

  const services: (ServiceDetail & { spec: ExpansionSpec })[] = [
    { 
      id: 'cost-reduction',
      title: "STOP WASTING TIME", 
      tagline: "Eradicate repetitive manual work.",
      description: "We use smart robots to handle all your boring daily tasks so you don't have to.", 
      problem: "Your team spends 40% of their day just typing data into spreadsheets and sending simple reports.",
      solution: "I build custom AI tools that do the 'busy work' for you, perfectly and instantly.",
      examples: [
        { title: "Auto-processing of daily reports.", icon: <FileText size={20} />, description: "My robots scan your team's daily activity and compile them into a clean, easy-to-read report delivered to your inbox every morning at 8 AM sharp." },
        { title: "Syncing information between different apps.", icon: <RefreshCw size={20} />, description: "When you update a client in your CRM, our bridge automatically updates your billing, project management, and Slack channels instantly." },
        { title: "AI that handles your data entry.", icon: <Cpu size={20} />, description: "I build specialized digital assistants that live in your workspace, handling the repetitive data-heavy tasks that usually eat up your morning." }
      ],
      icon: <Clock size={32} />,
      spec: {
        title: "TIME_SAVER_PRO",
        logic: "We identify the repetitive 'drag' in your day and build a robot to do it instead.",
        stack: [
          { 
            title: "Custom AI Scripts", 
            icon: <Code size={16} />, 
            explanation: "Bespoke code tailored to your specific business logic. These scripts act as the 'brain' of your automation, processing complex data sets with unmatched precision." 
          },
          { 
            title: "App-to-App Connectors", 
            icon: <Link size={16} />, 
            explanation: "We build secure bridges between your existing software. Data flows from your inbox to your CRM and your billing software instantly, without any manual entry." 
          },
          { 
            title: "Verification Logic", 
            icon: <ShieldCheck size={16} />, 
            explanation: "Built-in double-checks that ensure 100% data integrity. The system validates every output against your business rules before completing the task." 
          }
        ],
        metrics: "90% Faster Task Speed"
      }
    },
    { 
      id: 'custom-software',
      title: "CUSTOM APPS", 
      tagline: "Bespoke digital architecture.",
      description: "I build the specific tools your business needs that you can't buy off-the-shelf.", 
      problem: "Software like Excel or Generic CRMs are clunky and don't fit how you actually work.",
      solution: "I build custom, easy-to-use apps designed specifically for your team's unique habits.",
      examples: [
        { title: "A custom portal for your clients.", icon: <Users size={20} />, description: "A private, branded space where your clients can view project progress, sign documents, and pay invoices with one click." },
        { title: "A dashboard that shows exactly what you need.", icon: <Layout size={20} />, description: "Forget complex menus. I build single-view dashboards that show you only the numbers and tasks that matter to your specific role." },
        { title: "Onboarding systems that run themselves.", icon: <UserPlus size={20} />, description: "Automate the paperwork and training flows for new clients and employees, making growth feel like a simple switch you just flip." }
      ],
      icon: <Monitor size={32} />,
      spec: {
        title: "BUILDER_MODULE",
        logic: "Modern apps built with AI at the core, designed to be simple for anyone to use.",
        stack: [
          { 
            title: "React Frontend", 
            icon: <Monitor size={16} />, 
            explanation: "Lightning-fast, responsive user interfaces that feel premium. We build tools that your team will actually enjoy using every single day." 
          },
          { 
            title: "Smart Data Storage", 
            icon: <Database size={16} />, 
            explanation: "Scalable cloud databases that organize your information logically. Retrieve any piece of company data in milliseconds, no matter how much you grow." 
          },
          { 
            title: "AI Intelligence", 
            icon: <Cpu size={16} />, 
            explanation: "Integration with Google Gemini 3 models to provide predictive insights, automatic categorization, and natural language interfaces within your app." 
          }
        ],
        metrics: "4x Better Team Efficiency"
      }
    },
    { 
      id: 'system-integration',
      title: "LINKING APPS", 
      tagline: "Connect your legacy stacks.",
      description: "I connect all your different apps together so you never have to copy-paste again.", 
      problem: "Your data is trapped in 10 different apps that don't talk to each other.",
      solution: "We build a 'bridge' so that when you update one app, all the others update automatically.",
      examples: [
        { title: "Slack + Email + CRM Sync.", icon: <Box size={20} />, description: "Every high-priority email is automatically summarized and posted to your specific Slack channel, creating a record in your CRM at the same time." },
        { title: "Automatic cross-platform reporting.", icon: <BarChart3 size={20} />, description: "Combine data from Facebook Ads, Google Sheets, and Stripe into one unified weekly report that explains exactly where your ROI is coming from." },
        { title: "One dashboard for all your tools.", icon: <Layout size={20} />, description: "Stop switching tabs. View your communications, finances, and logistics in one unified command center designed for your workflow." }
      ],
      icon: <Link size={32} />,
      spec: {
        title: "SYMPHONY_BRIDGE",
        logic: "Connecting your existing tools into one smooth, automated pipeline.",
        stack: [
          { 
            title: "API Links", 
            icon: <Zap size={16} />, 
            explanation: "Direct, high-speed connections between software providers. We bypass manual interfaces to move data at the protocol level." 
          },
          { 
            title: "Secure Data Pass", 
            icon: <ShieldCheck size={16} />, 
            explanation: "End-to-end encryption for all data moving through your pipelines. Your client and business information remains private and protected at all times." 
          },
          { 
            title: "Sync Monitoring", 
            icon: <Activity size={16} />, 
            explanation: "24/7 oversight of your data flows. If a connection breaks or an app updates its rules, our monitoring system alerts us immediately to fix it." 
          }
        ],
        metrics: "Zero Manual Copying"
      }
    }
  ];

  const handleOpenSpec = (spec: ExpansionSpec) => {
    setExpandedSpec(spec);
    setExpandedStackIndex(null);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 lg:py-20 px-4 relative">
      <div className="mb-20 lg:mb-32 flex flex-col md:flex-row items-start lg:items-end justify-between gap-10 lg:gap-16">
        <div className="flex-1">
          <span className="text-[10px] md:text-[12px] font-sans tracking-[0.5em] text-white/50 uppercase font-black block mb-6">STEP 01: OPTIMISATION</span>
          <h2 className="text-4xl sm:text-7xl lg:text-8xl font-heading font-black text-white uppercase tracking-tighter stark-gradient leading-[0.9]">
            BUSINESS <br /> AUTOMATION.
          </h2>
        </div>
        <div className="max-w-md border-l-2 lg:border-l-4 border-white pl-6 lg:pl-10">
          <p className="text-white/60 text-[10px] lg:text-[11px] font-sans tracking-[0.2em] uppercase font-black leading-relaxed">
            I DELETE REPETITIVE TASKS USING SMART ROBOTS, GIVING YOU AND YOUR TEAM HOURS OF FREEDOM BACK EVERY SINGLE DAY.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 mb-20">
        {services.map((s, idx) => (
          <AutomationCard 
            key={s.id} title={s.title} description={s.description} icon={s.icon} delay={idx * 0.1}
            onSelect={() => onSelect(s)} onExpand={() => handleOpenSpec(s.spec)}
          />
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="brutalist-panel p-10 lg:p-24 bg-white text-black border-white text-center"
      >
        <h3 className="text-4xl sm:text-7xl lg:text-8xl font-heading font-black mb-6 uppercase tracking-tighter leading-none">STOP THE BUSY WORK.</h3>
        <p className="text-black/60 text-xs lg:text-base font-heading font-bold uppercase mb-12 tracking-widest max-w-2xl mx-auto">
          IF YOU'RE READY TO WORK ON YOUR BUSINESS INSTEAD OF INSIDE IT, LET'S GET TO WORK.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6 max-w-4xl mx-auto">
          <button onClick={onNext} className="flex-1 w-full flex items-center justify-center gap-4 px-6 py-6 lg:py-8 bg-black text-white font-heading font-black text-xs lg:text-lg tracking-[0.3em] uppercase hover:scale-105 transition-all">
            NEXT: SALES HELP <ArrowRight size={24} />
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
             <div className="max-w-4xl w-full glass-2 p-10 lg:p-20 relative border-t-8 border-[#CCFF00] max-h-[90vh] overflow-y-auto custom-scrollbar">
                <button onClick={() => setExpandedSpec(null)} className="absolute top-8 right-8 text-white/40 hover:text-white"><X size={32} /></button>
                <div className="mb-12">
                   <span className="text-[10px] font-mono tracking-[1em] text-[#CCFF00] uppercase font-bold block mb-4">THE_TECHNICAL_DETAILS</span>
                   <h3 className="text-3xl lg:text-6xl font-heading font-black text-white uppercase tracking-tighter leading-none mb-6">{expandedSpec.title}</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-8">
                     <div>
                        <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest block mb-4 font-black">HOW IT WORKS</span>
                        <p className="text-lg lg:text-2xl font-heading font-bold text-white/80 uppercase leading-tight tracking-tight">{expandedSpec.logic}</p>
                     </div>
                     <div className="bg-[#CCFF00] p-6 text-black">
                        <span className="text-[9px] font-mono font-black uppercase mb-2 block tracking-widest opacity-60">THE PROMISE</span>
                        <p className="text-2xl lg:text-4xl font-heading font-black uppercase tracking-tighter leading-none">{expandedSpec.metrics}</p>
                     </div>
                  </div>

                  <div className="space-y-8">
                    <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest block mb-4 font-black">WHAT WE USE</span>
                    <div className="space-y-3">
                       {expandedSpec.stack.map((item, i) => (
                         <div 
                           key={i} 
                           className="cursor-pointer border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all overflow-hidden"
                           onClick={() => setExpandedStackIndex(expandedStackIndex === i ? null : i)}
                         >
                            <div className="flex items-center justify-between p-4">
                              <div className="flex items-center gap-4">
                                <span className="text-[#CCFF00]">{item.icon}</span>
                                <span className="text-[10px] font-mono font-black text-white/70 uppercase tracking-widest">{item.title}</span>
                              </div>
                              <ChevronRight size={14} className={`text-[#CCFF00] transition-transform ${expandedStackIndex === i ? 'rotate-90' : ''}`} />
                            </div>
                            
                            <AnimatePresence>
                              {expandedStackIndex === i && (
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