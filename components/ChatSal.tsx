import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MessageSquare, MonitorPlay } from 'lucide-react';
import { getSalResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const FormattedText = ({ text }: { text: string }) => {
  return (
    <>
      {text.split('\n').map((line, i) => (
        <span key={i} className="block mb-4 last:mb-0">
          {line}
        </span>
      ))}
    </>
  );
};

interface ChatSalProps {
  onDemos?: () => void;
}

export const ChatSal: React.FC<ChatSalProps> = ({ onDemos }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hey! Welcome to our free strategy chat. Hi - I'm your new pal, Sal!\n\nTell me a bit about your business or what's been giving you a headache lately. I'm here to help you figure out how to save time and get more sales." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const response = await getSalResponse(userMsg);
    setMessages(prev => [...prev, { role: 'model', text: response || "Oops! I hit a snag. Can you try saying that again?" }]);
    setIsTyping(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 flex flex-col">
      <div className="flex flex-col items-center mb-16 text-center">
        <span className="text-[10px] font-sans tracking-[1em] text-white/50 uppercase font-black mb-6">No-Pressure Strategy Session</span>
        <h2 className="text-6xl md:text-8xl font-heading font-black text-white uppercase tracking-tighter stark-gradient">
          CHAT.
        </h2>
      </div>

      <div className="brutalist-panel p-0 flex flex-col bg-black border-white/20 shadow-[20px_20px_0_rgba(255,255,255,0.01)] scanline-overlay">
        {/* Header - Scaled down */}
        <div className="p-6 border-b border-white/10 bg-white/5 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <MessageSquare size={16} className="text-white/80" />
            <span className="text-[10px] font-sans tracking-[0.4em] text-white/80 uppercase font-black">Advisory Session</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[9px] font-sans text-green-500 uppercase font-black tracking-widest">SAL IS ONLINE</span>
          </div>
        </div>
        
        {/* Chat History - Grows with content, reduced scale */}
        <div className="space-y-12 p-8 lg:p-12 relative z-10">
          <AnimatePresence>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[90%] md:max-w-[80%] flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <span className="text-[9px] font-sans tracking-[0.3em] text-white/50 uppercase font-black mb-3">
                    {m.role === 'user' ? 'YOU' : 'SAL'}
                  </span>
                  <div className={`p-6 lg:p-8 text-base lg:text-lg font-heading leading-relaxed tracking-tight ${
                    m.role === 'user' 
                    ? 'bg-white text-black font-bold border-none' 
                    : 'border-l-2 border-white/60 text-white bg-white/[0.03]'
                  }`}>
                    <FormattedText text={m.text} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && (
            <div className="flex justify-start">
               <span className="text-[10px] font-sans tracking-widest text-white/40 animate-pulse uppercase font-black">Sal is typing...</span>
            </div>
          )}
        </div>

        {/* Input - Scaled down for better usability */}
        <div className="p-8 border-t border-white/10 bg-black/40 relative z-20">
          <div className="relative">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Tell me about your business..."
              className="w-full bg-transparent border border-white/10 py-6 px-8 focus:outline-none focus:border-white/60 font-heading font-medium text-lg tracking-tight placeholder:text-white/50 transition-all"
            />
            <button
              onClick={handleSend}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white hover:scale-110 transition-all p-2"
            >
              <ArrowRight size={28} />
            </button>
          </div>
          <p className="mt-6 text-[9px] font-sans tracking-[0.2em] text-white/40 uppercase font-bold text-center">
            Sal uses AI to help. Please confirm important details with us directly.
          </p>
        </div>
      </div>
      
      <div className="mt-16 text-center">
        <p className="text-white/40 text-[9px] font-sans tracking-[0.4em] uppercase font-black mb-8">Ready for a deeper dive?</p>
        <a 
          href="tel:905-749-0266" 
          className="inline-block px-12 py-5 border border-white/10 text-white/80 font-heading font-black text-[11px] tracking-[0.5em] uppercase hover:bg-white hover:text-black hover:border-white transition-all"
        >
          CALL: 905-749-0266
        </a>
      </div>

      <div className="mt-24 pt-24 border-t border-white/10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="brutalist-panel p-16 bg-white text-black border-white shadow-[25px_25px_0_rgba(255,255,255,0.05)] text-center group cursor-pointer"
          onClick={onDemos}
        >
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 border-4 border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
              <MonitorPlay size={32} />
            </div>
          </div>
          <h3 className="text-4xl md:text-5xl font-heading font-black mb-6 uppercase tracking-tighter">SEE THE TECH IN ACTION</h3>
          <p className="text-black/60 text-xs font-sans tracking-[0.4em] uppercase font-black mb-10 max-w-sm mx-auto">
            DON'T JUST TAKE OUR WORD FOR IT. VIEW REAL-WORLD SOLUTIONS WE'VE ARCHITECTED FOR CLIENTS.
          </p>
          <div className="inline-flex items-center gap-4 text-xs font-heading font-black uppercase tracking-[0.3em] group-hover:translate-x-3 transition-transform">
            EXPLORE LIVE DEMOS <ArrowRight size={20} />
          </div>
        </motion.div>
      </div>

      <div className="pb-20" />
    </div>
  );
};
