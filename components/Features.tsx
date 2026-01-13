
import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, TrendingUp, Cpu } from 'lucide-react';

export const Features: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-20">
      <div className="mb-32">
        <span className="text-[11px] font-sans tracking-[1em] text-white/50 uppercase font-black block mb-8 text-center">Track Record</span>
        <h2 className="text-6xl sm:text-7xl md:text-[10rem] font-heading font-black text-white uppercase tracking-tighter text-center leading-[0.8] stark-gradient">
          RESULTS.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-10">
          <div className="brutalist-panel p-16">
             <div className="flex items-start gap-10">
                <div className="w-20 h-20 bg-white text-black flex items-center justify-center shrink-0">
                  <TrendingUp size={40} />
                </div>
                <div>
                  <h3 className="text-4xl font-heading font-black mb-6 uppercase tracking-tighter">ROI Driven</h3>
                  <p className="text-white/60 text-sm font-heading font-medium leading-tight uppercase tracking-tight">
                    Technology is the means, not the end. We focus exclusively on systems that increase profit margins and operational efficiency.
                  </p>
                </div>
             </div>
          </div>
          
          <div className="grid grid-cols-2 gap-10">
            <div className="brutalist-panel p-10 flex flex-col items-center text-center">
              <Zap size={30} className="mb-8" />
              <div className="text-6xl font-heading font-black mb-2 stark-gradient">70%</div>
              <div className="text-[10px] font-sans tracking-[0.3em] text-white/50 uppercase font-black">Efficiency Increase</div>
            </div>
            <div className="brutalist-panel p-10 flex flex-col items-center text-center">
              <Cpu size={30} className="mb-8" />
              <div className="text-6xl font-heading font-black mb-2 stark-gradient">24/7</div>
              <div className="text-[10px] font-sans tracking-[0.3em] text-white/50 uppercase font-black">Automated Support</div>
            </div>
          </div>

          <div className="brutalist-panel p-16">
             <div className="flex items-center justify-between mb-12">
                <span className="font-sans text-[11px] tracking-[0.5em] text-white uppercase font-black">Performance Benchmarks</span>
                <Activity size={20} className="text-white/40" />
             </div>
             <div className="space-y-12">
                {[
                  { label: "Lead Engagement", val: "95%" },
                  { label: "Creative Scaling", val: "88%" },
                  { label: "Operational Reliability", val: "99%" }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[11px] font-heading font-black mb-4 text-white uppercase tracking-widest">
                      <span>{item.label}</span>
                      <span className="text-white/60">{item.val}</span>
                    </div>
                    <div className="h-1 bg-white/10 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: item.val }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
                        className="h-full bg-white"
                      />
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className="brutalist-panel p-1 group flex flex-col">
           <div className="flex-1 relative overflow-hidden bg-white/5">
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80" 
                className="w-full h-full object-cover opacity-20 grayscale" 
                alt="Business Intelligence" 
              />
              <div className="absolute inset-0 flex items-center justify-center flex-col text-center p-20">
                 <div className="text-[7rem] sm:text-[10rem] font-heading font-black text-white mb-10 leading-none stark-gradient">10X</div>
                 <p className="text-3xl sm:text-4xl font-heading font-black text-white mb-8 uppercase tracking-tighter">Scalability</p>
                 <div className="w-20 h-1 bg-white mb-10" />
                 <p className="text-xs text-white/60 font-heading font-bold leading-tight uppercase tracking-widest">
                   OUR CLIENTS TYPICALLY SEE A 10X INCREASE IN OPERATIONAL CAPACITY WITHIN SIX MONTHS OF FULL INTEGRATION.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
