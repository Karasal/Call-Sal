
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Target, CheckCircle2, Phone } from 'lucide-react';
import { ServiceDetail as IServiceDetail } from '../types';
import { BookingSystem } from './BookingSystem';

interface Props {
  service: IServiceDetail;
  onBack: () => void;
}

export const ServiceDetailView: React.FC<Props> = ({ service, onBack }) => {
  return (
    <div className="max-w-7xl mx-auto py-8 space-y-20 pb-32">
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="flex items-center gap-4 text-white/80 hover:text-white transition-colors group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em]">BACK TO SOLUTIONS</span>
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div>
            <div className="text-white mb-8 w-16 h-16 flex items-center justify-center border border-white/20">
              {service.icon}
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-black mb-6 text-white uppercase tracking-tighter">{service.title}</h1>
            <p className="text-2xl text-white/70 font-heading font-bold uppercase tracking-tight">{service.tagline}</p>
          </div>

          <div className="space-y-8">
            <div className="brutalist-panel p-10 border-white/10">
              <h4 className="text-[10px] font-sans text-white/60 tracking-[0.4em] uppercase mb-4 flex items-center gap-3">
                <Target size={14} /> The Challenge
              </h4>
              <p className="text-white/90 text-lg font-heading font-medium leading-tight uppercase tracking-tight">{service.problem}</p>
            </div>

            <div className="brutalist-panel p-10 bg-white text-black border-white">
              <h4 className="text-[10px] font-sans text-black/60 tracking-[0.4em] uppercase mb-4 flex items-center gap-3">
                <Zap size={14} /> Our Solution
              </h4>
              <p className="text-black text-lg font-heading font-black leading-tight uppercase tracking-tight">{service.solution}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-12"
        >
          <div className="brutalist-panel p-10">
            <h3 className="text-xl font-heading font-black tracking-[0.3em] mb-10 uppercase text-white">Expected Outcomes</h3>
            <div className="space-y-6">
              {(service.examples || []).map((ex, i) => (
                <div key={i} className="flex gap-6 p-8 bg-white/5 border border-white/5 items-center">
                  <CheckCircle2 className="text-white flex-shrink-0" size={24} />
                  <p className="text-lg text-white font-heading font-bold uppercase tracking-tight leading-tight">{ex}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-1 brutalist-panel bg-white/5">
             <div className="p-10 text-center">
                <h4 className="text-2xl font-heading font-black mb-6 text-white uppercase">Ready to Start?</h4>
                <p className="text-sm text-white/60 font-heading font-medium mb-10 uppercase">Schedule a session with our expert team.</p>
                <a href="tel:905-749-0266" className="inline-flex items-center gap-4 px-12 py-5 bg-white text-black font-heading font-black text-xs tracking-[0.4em] uppercase hover:scale-105 transition-all">
                  <Phone size={14} /> CALL SAL NOW
                </a>
             </div>
          </div>
        </motion.div>
      </div>

      <section id="booking" className="pt-32 border-t border-white/10">
        <div className="text-center mb-24">
          <span className="text-[11px] font-sans tracking-[1em] text-white/50 uppercase font-black block mb-8 text-center">Get in Touch</span>
          <h2 className="text-7xl font-heading font-black text-white uppercase tracking-tighter stark-gradient">SCHEDULE.</h2>
        </div>
        <BookingSystem />
      </section>
    </div>
  );
};
