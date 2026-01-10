
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Lock, Mail, Key, CheckCircle } from 'lucide-react';
import { storage } from '../services/storageService';
import { User as IUser } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: IUser) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [regStep, setRegStep] = useState(1);
  const [keyInput, setKeyInput] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const users = storage.getUsers();
    const user = users.find(u => u.email === formData.email && u.password === formData.password && u.isRegistered);
    if (user) {
      storage.setCurrentUser(user);
      onSuccess(user);
      onClose();
    } else {
      setError("INVALID CREDENTIALS OR ACCOUNT NOT ACTIVATED.");
    }
  };

  const handleKeyValidation = () => {
    setError('');
    const users = storage.getUsers();
    const user = users.find(u => u.registrationKey === keyInput && !u.isRegistered);
    if (user) {
      setRegStep(2);
    } else {
      setError("INVALID OR EXPIRED REGISTRATION KEY.");
    }
  };

  const handleFinalizeReg = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError("PASSWORDS DO NOT MATCH.");
      return;
    }
    const finalizedUser = storage.finalizeRegistration(keyInput, formData.email, formData.password);
    if (finalizedUser) {
      storage.setCurrentUser(finalizedUser);
      onSuccess(finalizedUser);
      onClose();
    } else {
      setError("ERROR FINALIZING REGISTRATION.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className={`relative w-full max-w-xl brutalist-panel overflow-hidden transition-colors duration-500 bg-black border-white`}
          >
            <div className={`p-8 border-b flex items-center justify-between border-white/10 bg-white/5`}>
              <h2 className={`text-3xl font-heading font-black uppercase tracking-tighter text-white`}>
                {mode === 'login' ? 'ACCESS HUB' : 'PRIVATE VAULT'}
              </h2>
              <button onClick={onClose} className={`p-2 transition-colors hover:bg-white/10 text-white`}>
                <X size={20} />
              </button>
            </div>

            <div className="p-10">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mb-8 p-4 bg-red-500/10 border border-red-500/50 text-red-500 text-[10px] font-sans font-black tracking-widest text-center uppercase"
                >
                  {error}
                </motion.div>
              )}

              {mode === 'login' ? (
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                    <input 
                      required
                      type="email"
                      placeholder="EMAIL ADDRESS"
                      className="w-full bg-transparent border-2 border-white/10 p-5 pl-14 focus:border-white outline-none font-heading font-bold uppercase text-xs tracking-widest text-white"
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                    <input 
                      required
                      type="password"
                      placeholder="PASSWORD"
                      className="w-full bg-transparent border-2 border-white/10 p-5 pl-14 focus:border-white outline-none font-heading font-bold uppercase text-xs tracking-widest text-white"
                      onChange={e => setFormData({ ...formData, password: e.target.value })}
                    />
                  </div>
                  <button className="w-full py-6 bg-white text-black font-heading font-black tracking-[0.5em] uppercase hover:bg-white/90 active:scale-95 transition-all shadow-[10px_10px_0_rgba(255,255,255,0.1)]">
                    UNLOCK HUB
                  </button>
                </form>
              ) : (
                <div className="space-y-8">
                  {regStep === 1 ? (
                    <div className="space-y-8 text-center">
                      <div className="w-16 h-16 border-2 border-white/20 flex items-center justify-center mx-auto opacity-40">
                        <Key size={24} />
                      </div>
                      <p className="text-[10px] font-sans font-black tracking-widest text-white/40 uppercase">ENTER THE REGISTRATION KEY PROVIDED BY YOUR ARCHITECT</p>
                      <input 
                        value={keyInput}
                        onChange={e => setKeyInput(e.target.value.toUpperCase())}
                        placeholder="SAL-XXXX-XXXX"
                        className="w-full bg-transparent border-2 border-white/10 p-5 text-center focus:border-white outline-none font-heading font-black uppercase text-xl tracking-[0.2em] text-white"
                      />
                      <button 
                        onClick={handleKeyValidation}
                        className="w-full py-6 bg-white text-black font-heading font-black tracking-[0.5em] uppercase hover:bg-white/90 active:scale-95 transition-all"
                      >
                        VALIDATE KEY
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleFinalizeReg} className="space-y-6">
                      <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 mb-4">
                        <CheckCircle size={16} className="text-green-500" />
                        <span className="text-[9px] font-sans font-black tracking-widest text-white/60 uppercase">KEY VALIDATED. SETUP CREDENTIALS.</span>
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                        <input 
                          required
                          type="email"
                          placeholder="SET LOGIN EMAIL"
                          className="w-full bg-transparent border-2 border-white/10 p-5 pl-14 focus:border-white outline-none font-heading font-bold uppercase text-xs tracking-widest text-white"
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                        <input 
                          required
                          type="password"
                          placeholder="SET PASSWORD"
                          className="w-full bg-transparent border-2 border-white/10 p-5 pl-14 focus:border-white outline-none font-heading font-bold uppercase text-xs tracking-widest text-white"
                          onChange={e => setFormData({ ...formData, password: e.target.value })}
                        />
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                        <input 
                          required
                          type="password"
                          placeholder="CONFIRM PASSWORD"
                          className="w-full bg-transparent border-2 border-white/10 p-5 pl-14 focus:border-white outline-none font-heading font-bold uppercase text-xs tracking-widest text-white"
                          onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                        />
                      </div>
                      <button className="w-full py-6 bg-white text-black font-heading font-black tracking-[0.5em] uppercase hover:bg-white/90 active:scale-95 transition-all">
                        ACTIVATE ACCESS
                      </button>
                    </form>
                  )}
                </div>
              )}

              <div className="text-center pt-10">
                <button 
                  type="button"
                  onClick={() => {
                    setMode(mode === 'login' ? 'register' : 'login');
                    setRegStep(1);
                    setError('');
                  }}
                  className="text-[10px] font-sans font-black tracking-widest uppercase transition-colors text-white/40 hover:text-white"
                >
                  {mode === 'login' ? "HAVE A KEY? REGISTER ACCESS" : "ALREADY REGISTERED? LOGIN HERE"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
