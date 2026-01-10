
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Heart, Smile, X, MessageSquareHeart, Target, Zap, Info, ShieldCheck, BarChart3, Users, Bot, BookOpen, Coffee, Search, ClipboardList, Rocket, MailCheck, TrendingUp, Layers } from 'lucide-react';

interface HelpDetail {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  icon: React.ReactNode;
  impact: string;
}

type TabType = 'friendly' | 'focused' | 'roi' | 'scalable' | 'none';

export const MeetSalman: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [activeTab, setActiveTab] = useState<TabType>('none');
  const [selectedDetail, setSelectedDetail] = useState<HelpDetail | null>(null);

  const tabContent = {
    friendly: {
      icon: <Smile size={32} />,
      title: "My Approach",
      subtitle: "Friendly & Gracious",
      text: [
        "I believe in being truly gracious and taking the time to patiently listen to your needs. Communication is the heart of every project.",
        "Working with me is a smooth, high-vibe partnership. I maintain a positive, professional atmosphere where your ideas are valued and no question is too small.",
        "I welcome criticism and will iterate to your utmost satisfaction—my goal is to keep you feeling engaged and excited throughout our entire working relationship."
      ],
      footer: "It brings me genuine joy to be a part of the success of others."
    },
    focused: {
      icon: <Target size={32} />,
      title: "My Priority",
      subtitle: "Focused & Diligent",
      text: [
        "Your time, money, and expectations are my ultimate priority. I treat your resources with the same respect as my own.",
        "To ensure this, I restrict my service to only working with a few dedicated clients each month. No bloated agencies, just direct results.",
        "Projects are diligently managed to ensure we strictly meet every deadline and objective. We don't just deliver; we excel."
      ],
      footer: "Exclusivity ensures quality. We focus on depth, not volume."
    },
    roi: {
      icon: <TrendingUp size={32} />,
      title: "The Bottom Line",
      subtitle: "ROI-Driven & Efficient",
      text: [
        "Every tool built is designed to pay for itself within months. I don't build tech for tech's sake; I build profit centers for your business.",
        "We track KPIs meticulously. If an automation doesn't save measurable dollars or generate new revenue, we don't build it. Period.",
        "My approach is lean. We eliminate waste and focus on the high-leverage activities that move the needle for your bank account immediately."
      ],
      footer: "Technology is an investment, not an expense."
    },
    scalable: {
      icon: <Layers size={32} />,
      title: "Built to Last",
      subtitle: "Scalable & Reliable",
      text: [
        "The systems I build are modular. As your business grows from 5 to 500 employees, your infrastructure scales with you without breaking.",
        "Reliability is non-negotiable. I implement redundant checks and monitor performance to ensure your 'silent workforce' never takes a sick day.",
        "Security and privacy are at the core of my architecture. Your proprietary data remains yours, protected by industry-standard encryption."
      ],
      footer: "Scaling without friction is the ultimate competitive advantage."
    }
  };

  const helpPoints: HelpDetail[] = [
    { 
      id: "01", 
      title: "Stop Boring Chores", 
      shortDesc: "I take the tasks that take you 4 hours and make them take 4 seconds.",
      longDesc: "We identify the repetitive 'drag' in your daily operations—data entry, report generation, and status updates. By building custom Python scripts and Zapier integrations, we create a 'silent workforce' that handles these tasks with 100% accuracy while you sleep.",
      icon: <Zap size={40} />,
      impact: "Reclaim 20+ hours of staff time per week."
    },
    { 
      id: "02", 
      title: "Grow Without Stress", 
      shortDesc: "Bring in more customers without having to hire and manage 10 new people.",
      longDesc: "Growth usually means more overhead. Our systems are built to scale infinitely without increasing your headcount. We automate the fulfillment and onboarding processes, meaning your 100th customer costs the same to manage as your 1st.",
      icon: <Users size={40} />,
      impact: "Increase capacity by 500% without new hires."
    },
    { 
      id: "03", 
      title: "Never Miss a Lead", 
      shortDesc: "24/7 smart assistants that talk to customers and book your calendar.",
      longDesc: "Speed-to-lead is the #1 factor in closing sales. We deploy custom-trained AI agents on your website and social channels that qualify prospects, answer technical questions, and book meetings directly into your calendar the second interest is shown.",
      icon: <Bot size={40} />,
      impact: "Reduce response time from hours to milliseconds."
    },
    { 
      id: "04", 
      title: "Instant Team Brain", 
      shortDesc: "A private knowledge base that answers staff questions instantly.",
      longDesc: "Stop being the bottleneck. We aggregate your SOPs, past projects, and company policies into a private, secure AI Brain. Your team can ask it anything—'How do we handle X?' or 'What's the policy for Y?'—and get the exact answer instantly.",
      icon: <BookOpen size={40} />,
      impact: "Reduce internal interruptions by up to 80%."
    },
    { 
      id: "05", 
      title: "Know Your Numbers", 
      shortDesc: "Get clear reports that tell you exactly where your money is coming from.",
      longDesc: "Flying blind is expensive. We build real-time dashboards that pull data from your marketing, sales, and accounting tools. You'll see your ROI, customer acquisition cost, and lifetime value in one clear, brutalist view updated every minute.",
      icon: <BarChart3 size={40} />,
      impact: "100% clarity on marketing spend and profit margins."
    }
  ];

  const steps = [
    {
      icon: <Coffee size={20} />,
      title: "CONSULTATION",
      desc: "We start with a strategy session via Zoom or in-person if you're local to Calgary."
    },
    {
      icon: <ClipboardList size={20} />,
      title: "OPERATIONS AUDIT",
      desc: "We learn your business inside-out to find every chore and friction point stealing your time."
    },
    {
      icon: <Search size={20} />,
      title: "THE BLUEPRINT",
      desc: "We create a custom plan to build the specific automation tools your workflow demands."
    },
    {
      icon: <Rocket size={20} />,
      title: "GROWTH SHIFT",
      desc: "We pivot to lead generation, maximizing exposure to pre-qualified prospects for your service."
    },
    {
      icon: <MailCheck size={20} />,
      title: "DIRECT BOOKINGS",
      desc: "Qualified leads land straight in your inbox as confirmed appointments for your closers."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-10 md:py-20 px-4 md:px-0">
      {/* Header */}
      <div className="mb-24">
        <span className="text-[12px] font-sans tracking-[1.2em] text-white/50 uppercase font-black block mb-8 text-center leading-none">Your New Partner in Growth</span>
        <h2 className="text-5xl sm:text-7xl md:text-[12rem] font-heading font-black text-white uppercase tracking-tighter text-center leading-[0.7] stark-gradient">
          MEET <br className="sm:hidden" /> SALMAN.
        </h2>
      </div>

      {/* HOW I HELP YOU Module */}
      <motion.div 
        layout
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="brutalist-panel min-h-[600px] p-8 md:p-20 bg-white text-black border-white shadow-[40px_40px_0px_rgba(255,255,255,0.05)] mb-32 relative overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {!selectedDetail ? (
            <motion.div 
              key="list-view"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-16">
                <h3 className="text-6xl md:text-9xl font-heading font-black uppercase tracking-tighter leading-none mb-4">HOW I HELP YOU</h3>
                <div className="flex items-center gap-6">
                  <div className="h-[4px] w-20 bg-black" />
                  <p className="text-xs md:text-sm font-sans tracking-[0.5em] uppercase font-black opacity-40 animate-pulse">
                    CLICK NUMBERS FOR DETAILS
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-y-12 md:gap-y-14">
                {helpPoints.map((item) => (
                  <div key={item.id} className="flex gap-10 group items-start">
                    <button 
                      onClick={() => setSelectedDetail(item)}
                      className="shrink-0 w-16 h-16 md:w-20 md:h-20 border-4 border-black flex items-center justify-center font-black text-3xl hover:bg-black hover:text-white transition-all active:scale-90 relative overflow-hidden"
                    >
                      {item.id}
                      <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100">
                        <Info size={12} />
                      </div>
                    </button>
                    <div className="pt-2">
                      <h4 className="text-2xl md:text-4xl font-heading font-black uppercase mb-2 tracking-tighter leading-none">{item.title}</h4>
                      <p className="text-sm md:text-lg font-heading font-medium uppercase leading-tight tracking-tight opacity-80 max-w-2xl">{item.shortDesc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="detail-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-16">
                <div className="flex flex-col">
                  <span className="text-[11px] font-sans tracking-[0.5em] text-black/40 uppercase font-black block mb-4">Module {selectedDetail.id} // Full Impact Analysis</span>
                  <h3 className="text-5xl md:text-8xl font-heading font-black text-black uppercase tracking-tighter leading-none">
                    {selectedDetail.title}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedDetail(null)}
                  className="p-4 md:p-6 border-4 border-black text-black hover:bg-black hover:text-white transition-all active:scale-90"
                >
                  <X size={32} />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-4 flex items-center justify-center py-10">
                  <div className="w-32 h-32 md:w-48 md:h-48 border-[8px] border-black flex items-center justify-center">
                    {selectedDetail.icon}
                  </div>
                </div>
                <div className="lg:col-span-8 space-y-8">
                  <p className="text-2xl md:text-4xl font-heading font-bold text-black leading-tight uppercase tracking-tight">
                    {selectedDetail.longDesc}
                  </p>
                  
                  <div className="pt-10 border-t-2 border-black/10">
                    <div className="flex items-center gap-4 mb-4">
                       <ShieldCheck className="text-black" size={20} />
                       <span className="text-[10px] font-sans tracking-[0.4em] text-black/60 uppercase font-black">Core Business Impact:</span>
                    </div>
                    <div className="bg-black text-white p-8 md:p-12 font-heading font-black text-3xl md:text-5xl uppercase tracking-tighter shadow-[15px_15px_0px_rgba(0,0,0,0.1)]">
                      {selectedDetail.impact}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-16 pt-10 border-t-2 border-black/5">
                <button 
                  onClick={() => setSelectedDetail(null)}
                  className="px-10 py-5 border-2 border-black text-black font-heading font-black text-xs tracking-[0.4em] uppercase hover:bg-black hover:text-white transition-all active:scale-95"
                >
                  GO BACK TO LIST
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Values & Goals Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32 items-stretch">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-10"
        >
          <div className="brutalist-panel p-12 md:p-16 border-white/10 bg-black/40 flex-1">
            <h3 className="text-4xl font-heading font-black mb-8 uppercase tracking-tighter">THE GOAL</h3>
            <p className="text-white/80 text-lg font-heading font-medium leading-relaxed uppercase tracking-tight">
              I’m Salman. I help business owners get their lives back. AI isn't scary tech—it's just a way to stop you and your team from doing the same boring tasks every single day. I build the tools that let you focus on what you're actually good at.
            </p>
          </div>

          <div className="brutalist-panel min-h-[550px] flex flex-col bg-white/5 border-white/10 relative overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 border-b border-white/10">
              <button 
                onClick={() => setActiveTab('friendly')}
                className={`flex-1 py-8 flex flex-col items-center justify-center gap-2 transition-all group ${activeTab === 'friendly' ? 'bg-white text-black' : 'hover:bg-white/5'}`}
              >
                <Smile size={20} className={activeTab === 'friendly' ? 'text-black' : 'text-white/40 group-hover:text-white'} />
                <span className={`text-[9px] font-sans font-black uppercase tracking-[0.2em] ${activeTab === 'friendly' ? 'text-black' : 'text-white/40'}`}>Friendly</span>
                {activeTab === 'friendly' && <motion.div layoutId="tabUnderline" className="absolute bottom-0 h-1 bg-black w-[25%]" style={{left: '0%'}} />}
              </button>
              <button 
                onClick={() => setActiveTab('focused')}
                className={`flex-1 py-8 flex flex-col items-center justify-center gap-2 transition-all group border-l border-white/10 ${activeTab === 'focused' ? 'bg-white text-black' : 'hover:bg-white/5'}`}
              >
                <Target size={20} className={activeTab === 'focused' ? 'text-black' : 'text-white/40 group-hover:text-white'} />
                <span className={`text-[9px] font-sans font-black uppercase tracking-[0.2em] ${activeTab === 'focused' ? 'text-black' : 'text-white/40'}`}>Focused</span>
                {activeTab === 'focused' && <motion.div layoutId="tabUnderline" className="absolute bottom-0 h-1 bg-black w-[25%]" style={{left: '25%'}} />}
              </button>
              <button 
                onClick={() => setActiveTab('roi')}
                className={`flex-1 py-8 flex flex-col items-center justify-center gap-2 transition-all group border-l border-white/10 ${activeTab === 'roi' ? 'bg-white text-black' : 'hover:bg-white/5'}`}
              >
                <TrendingUp size={20} className={activeTab === 'roi' ? 'text-black' : 'text-white/40 group-hover:text-white'} />
                <span className={`text-[9px] font-sans font-black uppercase tracking-[0.2em] ${activeTab === 'roi' ? 'text-black' : 'text-white/40'}`}>ROI-Driven</span>
                {activeTab === 'roi' && <motion.div layoutId="tabUnderline" className="absolute bottom-0 h-1 bg-black w-[25%]" style={{left: '50%'}} />}
              </button>
              <button 
                onClick={() => setActiveTab('scalable')}
                className={`flex-1 py-8 flex flex-col items-center justify-center gap-2 transition-all group border-l border-white/10 ${activeTab === 'scalable' ? 'bg-white text-black' : 'hover:bg-white/5'}`}
              >
                <Layers size={20} className={activeTab === 'scalable' ? 'text-black' : 'text-white/40 group-hover:text-white'} />
                <span className={`text-[9px] font-sans font-black uppercase tracking-[0.2em] ${activeTab === 'scalable' ? 'text-black' : 'text-white/40'}`}>Scalable</span>
                {activeTab === 'scalable' && <motion.div layoutId="tabUnderline" className="absolute bottom-0 h-1 bg-black w-[25%]" style={{left: '75%'}} />}
              </button>
            </div>

            <div className="flex-1 p-10 flex flex-col relative">
              <AnimatePresence mode="wait">
                {activeTab === 'none' ? (
                  <motion.div 
                    key="none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-6"
                  >
                    <div className="w-16 h-16 border border-white/10 flex items-center justify-center rounded-full opacity-20">
                      <Zap size={24} />
                    </div>
                    <p className="text-[10px] font-sans tracking-[0.6em] text-white/30 uppercase font-black">Select a core value to explore</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 flex flex-col"
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 border border-white/20 flex items-center justify-center">
                        {tabContent[activeTab].icon}
                      </div>
                      <div>
                        <h4 className="text-2xl font-heading font-black uppercase leading-none">{tabContent[activeTab].title}</h4>
                        <p className="text-[10px] font-sans tracking-[0.2em] text-white/40 uppercase font-black mt-1">{tabContent[activeTab].subtitle}</p>
                      </div>
                    </div>
                    <div className="space-y-6 mb-10">
                      {tabContent[activeTab].text.map((t, i) => (
                        <p key={i} className="text-sm font-heading font-medium uppercase tracking-tight leading-relaxed text-white/80">
                          {t}
                        </p>
                      ))}
                    </div>
                    <div className="mt-auto">
                      <div className="bg-white/10 p-6 border-l-4 border-white flex items-center gap-4">
                        <Heart size={20} className="shrink-0" fill="currentColor" />
                        <span className="text-[11px] font-heading font-black uppercase leading-tight tracking-tight">{tabContent[activeTab].footer}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
        
        {/* READY TO LEVEL UP Module */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="brutalist-panel p-10 md:p-16 flex flex-col bg-white/[0.02] border-white/10"
        >
          <div className="flex items-center gap-6 mb-12">
            <div className="p-4 bg-white text-black border border-white">
              <MessageSquareHeart size={32} />
            </div>
            <div>
              <h4 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tighter leading-none">READY TO LEVEL UP?</h4>
              <p className="text-white/40 text-[10px] font-sans tracking-[0.4em] uppercase font-black mt-2">The Path to Automation Excellence</p>
            </div>
          </div>

          <div className="space-y-10 mb-12">
            {steps.map((step, idx) => (
              <div key={idx} className="flex gap-6 group">
                <div className="shrink-0 w-10 h-10 border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  {step.icon}
                </div>
                <div className="flex-1">
                  <h5 className="text-[11px] font-sans font-black uppercase tracking-[0.3em] text-white/90 mb-1">
                    {idx + 1}. {step.title}
                  </h5>
                  <p className="text-xs md:text-sm font-heading font-medium uppercase tracking-tight text-white/40 leading-snug group-hover:text-white/70 transition-colors">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-10 border-t border-white/10">
             <div className="p-6 bg-white/5 border-l-4 border-white flex items-center gap-4">
                <Zap size={20} className="text-white shrink-0 animate-pulse" />
                <p className="text-[10px] md:text-[11px] font-heading font-black uppercase leading-tight tracking-tight text-white/80">
                  Ready to stop working 100 hours a week? Let's fix your workflow today.
                </p>
             </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="brutalist-panel p-8 md:p-24 text-center relative overflow-hidden group border-white/20"
      >
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none" />
        <h3 className="text-5xl md:text-8xl font-heading font-black text-white uppercase tracking-tighter mb-16 stark-gradient px-4">SAVE TIME. SAVE MONEY.</h3>
        <button 
          className="flex items-center justify-center gap-6 mx-auto px-10 md:px-20 py-8 md:py-10 bg-white text-black font-heading font-black text-lg tracking-[0.5em] uppercase hover:scale-105 transition-all shadow-[20px_20px_0px_rgba(255,255,255,0.1)] active:scale-95"
          onClick={onNext}
        >
          NEXT: SEE THE TOOLS <ArrowRight size={28} />
        </button>
      </motion.div>
    </div>
  );
};
