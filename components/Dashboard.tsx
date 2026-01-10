
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Calendar, Activity, CheckCircle, DollarSign, Clock, Send, Plus, Copy, Trash2, User as UserIcon } from 'lucide-react';
import { storage } from '../services/storageService';
import { User, Booking, ProjectLog, Invoice } from '../types';

interface DashboardProps {
  user: User;
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [activeSubTab, setActiveSubTab] = useState<'stats' | 'clients' | 'logs' | 'profile'>('stats');
  const [data, setData] = useState({
    bookings: [] as Booking[],
    logs: [] as ProjectLog[],
    invoices: [] as Invoice[],
    users: [] as User[]
  });
  
  // Admin State
  const [newClient, setNewClient] = useState({ name: '', businessName: '', phone: '', website: '' });
  const [generatedKey, setGeneratedKey] = useState('');
  const [newLog, setNewLog] = useState({ clientId: '', title: '', update: '', progress: 50 });

  useEffect(() => {
    refreshData();
  }, [user]);

  const refreshData = () => {
    setData({
      bookings: storage.getBookings(),
      logs: storage.getLogs(user.role === 'admin' ? undefined : user.id),
      invoices: storage.getInvoices(user.role === 'admin' ? undefined : user.id),
      users: storage.getUsers()
    });
  };

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    const key = storage.createClientPlaceholder(newClient);
    setGeneratedKey(key);
    setNewClient({ name: '', businessName: '', phone: '', website: '' });
    refreshData();
  };

  const handleDeleteClient = (id: string) => {
    if (window.confirm("ARE YOU SURE? THIS WILL PERMANENTLY REVOKE VAULT ACCESS.")) {
      const users = storage.getUsers().filter(u => u.id !== id);
      localStorage.setItem('sal_agency_users_v2', JSON.stringify(users));
      refreshData();
    }
  };

  const handlePushLog = (e: React.FormEvent) => {
    e.preventDefault();
    storage.addLog({
      id: Math.random().toString(36).substr(2, 9),
      clientId: newLog.clientId,
      date: new Date().toLocaleDateString(),
      title: newLog.title,
      update: newLog.update,
      progress: Number(newLog.progress)
    });
    setNewLog({ ...newLog, title: '', update: '', progress: 50 });
    refreshData();
  };

  const isAdmin = user.role === 'admin';

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 md:px-0">
      <div className="mb-20 flex flex-col md:flex-row items-end justify-between gap-16">
        <div className="flex-1">
          <span className="text-[12px] font-sans tracking-[1em] text-white/50 uppercase font-black block mb-8 leading-none">
            {isAdmin ? 'SYSTEM ARCHITECT' : 'CLIENT OPERATIONS'}
          </span>
          <h2 className="text-8xl font-heading font-black text-white uppercase tracking-tighter stark-gradient leading-[0.85]">
            DASHBOARD.
          </h2>
        </div>
      </div>

      <div className="space-y-12">
        {/* Sub Navigation */}
        <div className="flex gap-4 border-b border-white/10 pb-6 overflow-x-auto no-scrollbar">
          {(isAdmin ? ['stats', 'clients', 'logs'] : ['stats', 'logs', 'profile']).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab as any)}
              className={`px-8 py-3 text-[10px] font-heading font-black tracking-widest uppercase transition-all whitespace-nowrap ${
                activeSubTab === tab ? 'bg-white text-black' : 'text-white/40 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* STATS VIEW */}
          {activeSubTab === 'stats' && (
            <motion.div key="stats" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-12">
              {!isAdmin && (
                <div className="brutalist-panel p-16 bg-white text-black border-white shadow-[30px_30px_0_rgba(255,255,255,0.05)]">
                  <h2 className="text-6xl font-heading font-black uppercase tracking-tighter mb-4 leading-none text-black">WELCOME, {user.name.split(' ')[0]}.</h2>
                  <p className="text-sm font-heading font-bold opacity-60 uppercase tracking-widest text-black">PRIVATE ACCESS GRANTED // SECURE CHANNEL ACTIVE</p>
                  <div className="mt-12 h-2 bg-black/10 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '45%' }} className="h-full bg-black" />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {isAdmin ? (
                  <>
                    {[
                      { label: 'Total Clients', value: data.users.filter(u => u.role === 'client').length, icon: <Users size={20} /> },
                      { label: 'Project Logs', value: data.logs.length, icon: <Activity size={20} /> },
                      { label: 'Live Bookings', value: data.bookings.length, icon: <Calendar size={20} /> },
                      { label: 'Vault Revenue', value: `$${data.invoices.reduce((acc, i) => i.status === 'paid' ? acc + i.amount : acc, 0)}`, icon: <DollarSign size={20} /> },
                    ].map((stat, i) => (
                      <div key={i} className="brutalist-panel p-8 border-white/10 bg-white/5">
                        <div className="flex items-center justify-between mb-4 opacity-40">
                          <span className="text-[10px] font-sans tracking-widest font-black uppercase">{stat.label}</span>
                          {stat.icon}
                        </div>
                        <div className="text-4xl font-heading font-black stark-gradient">{stat.value}</div>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {[
                      { label: 'Latest Milestone', value: data.logs[0]?.title || 'Pending Initial Audit', icon: <Activity size={20} /> },
                      { label: 'Project Progress', value: `${data.logs[0]?.progress || 0}%`, icon: <CheckCircle size={20} /> },
                      { label: 'Next Call', value: data.bookings[0]?.time || 'Unscheduled', icon: <Calendar size={20} /> },
                    ].map((stat, i) => (
                      <div key={i} className="brutalist-panel p-8 border-white/10 bg-white/5 md:col-span-1">
                        <div className="flex items-center justify-between mb-4 opacity-40">
                          <span className="text-[10px] font-sans tracking-widest font-black uppercase">{stat.label}</span>
                          {stat.icon}
                        </div>
                        <div className="text-2xl font-heading font-black uppercase text-white truncate">{stat.value}</div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </motion.div>
          )}

          {/* CLIENTS VIEW (ADMIN ONLY) */}
          {isAdmin && activeSubTab === 'clients' && (
            <motion.div key="clients" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4 brutalist-panel p-10 bg-white/5 h-fit">
                <h3 className="text-xl font-heading font-black uppercase mb-8">GENERATE CLIENT KEY</h3>
                <form onSubmit={handleCreateClient} className="space-y-6">
                  <input required placeholder="CLIENT NAME" className="w-full bg-transparent border border-white/10 p-4 text-[10px] font-sans font-black tracking-widest uppercase text-white focus:border-white outline-none" value={newClient.name} onChange={e => setNewClient({...newClient, name: e.target.value})} />
                  <input placeholder="BUSINESS NAME" className="w-full bg-transparent border border-white/10 p-4 text-[10px] font-sans font-black tracking-widest uppercase text-white focus:border-white outline-none" value={newClient.businessName} onChange={e => setNewClient({...newClient, businessName: e.target.value})} />
                  <button type="submit" className="w-full py-5 bg-white text-black font-heading font-black text-[10px] tracking-widest uppercase flex items-center justify-center gap-3 active:scale-95 transition-all shadow-[10px_10px_0_rgba(255,255,255,0.1)]">
                    <Plus size={16} /> GENERATE SECURE KEY
                  </button>
                </form>
                {generatedKey && (
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mt-8 p-6 bg-green-500/10 border border-green-500/20">
                    <span className="text-[8px] font-sans font-black text-green-500/60 uppercase block mb-2">KEY CREATED:</span>
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-black text-lg text-white tracking-widest">{generatedKey}</span>
                      <button onClick={() => { navigator.clipboard.writeText(generatedKey); alert("COPIED!"); }} className="p-2 text-white/40 hover:text-white"><Copy size={14} /></button>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="lg:col-span-8 brutalist-panel p-10 bg-white/5">
                <h3 className="text-xl font-heading font-black uppercase mb-8">CLIENT ROSTER</h3>
                <div className="space-y-4">
                  {data.users.filter(u => u.role === 'client').map(u => (
                    <div key={u.id} className="p-6 bg-black/40 border border-white/10 flex items-center justify-between group hover:border-white/30 transition-all">
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 border border-white/20 flex items-center justify-center bg-white/5">
                          <UserIcon size={20} className="opacity-40" />
                        </div>
                        <div>
                          <div className="text-xs font-heading font-black uppercase tracking-widest text-white">{u.name}</div>
                          <div className="text-[9px] font-sans font-black opacity-30 uppercase text-white/60">{u.businessName || 'INDEPENDENT'}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-right">
                           <div className="text-[10px] font-heading font-black tracking-widest text-white/60 mb-1">{u.registrationKey}</div>
                           <span className={`text-[8px] font-sans font-black px-2 py-0.5 border ${u.isRegistered ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'} uppercase`}>
                             {u.isRegistered ? 'VAULT ACTIVE' : 'AWAITING REG'}
                           </span>
                        </div>
                        <button onClick={() => handleDeleteClient(u.id)} className="p-3 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 transition-all">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* LOGS VIEW (SHARED) */}
          {activeSubTab === 'logs' && (
            <motion.div key="logs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {isAdmin && (
                <div className="lg:col-span-4 brutalist-panel p-10 bg-white/5 h-fit">
                  <h3 className="text-xl font-heading font-black uppercase mb-8">PUSH PROJECT LOG</h3>
                  <form onSubmit={handlePushLog} className="space-y-6">
                    <select 
                      required 
                      className="w-full bg-black border border-white/10 p-4 text-[10px] font-sans font-black tracking-widest uppercase appearance-none text-white outline-none focus:border-white"
                      value={newLog.clientId}
                      onChange={e => setNewLog({...newLog, clientId: e.target.value})}
                    >
                      <option value="">SELECT CLIENT</option>
                      {data.users.filter(u => u.role === 'client').map(u => (
                        <option key={u.id} value={u.id}>{u.name} ({u.businessName})</option>
                      ))}
                    </select>
                    <input required placeholder="UPDATE TITLE" className="w-full bg-transparent border border-white/10 p-4 text-[10px] font-sans font-black tracking-widest uppercase text-white outline-none focus:border-white" value={newLog.title} onChange={e => setNewLog({...newLog, title: e.target.value})} />
                    <textarea required placeholder="UPDATE DESCRIPTION" className="w-full bg-transparent border border-white/10 p-4 text-[10px] font-sans font-black tracking-widest uppercase h-32 text-white outline-none focus:border-white" value={newLog.update} onChange={e => setNewLog({...newLog, update: e.target.value})} />
                    <div>
                       <label className="text-[8px] font-sans font-black text-white/40 uppercase mb-2 block">PROGRESS: {newLog.progress}%</label>
                       <input type="range" className="w-full accent-white" value={newLog.progress} onChange={e => setNewLog({...newLog, progress: Number(e.target.value)})} />
                    </div>
                    <button type="submit" className="w-full py-5 bg-white text-black font-heading font-black text-[10px] tracking-widest uppercase flex items-center justify-center gap-3 active:scale-95 transition-all">
                      <Send size={16} /> BROADCAST LOG
                    </button>
                  </form>
                </div>
              )}
              <div className={`${isAdmin ? 'lg:col-span-8' : 'lg:col-span-12 max-w-4xl mx-auto w-full'} brutalist-panel p-10 bg-white/5 overflow-y-auto max-h-[800px] custom-scrollbar`}>
                 <h3 className="text-xl font-heading font-black uppercase mb-8">{isAdmin ? 'LOG HISTORY' : 'ARCHITECTURE LOGS'}</h3>
                 <div className="space-y-6">
                   {data.logs.length > 0 ? data.logs.map(log => (
                     <div key={log.id} className="p-8 border-l-4 border-white bg-black/40">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-[10px] font-sans font-black text-white/40 uppercase tracking-widest">{log.date}</span>
                          <span className="text-[10px] font-sans font-black text-white uppercase tracking-widest">{log.progress}% COMPLETE</span>
                        </div>
                        <h4 className="text-2xl font-heading font-black uppercase mb-2 text-white">{log.title}</h4>
                        <p className="text-xs font-sans font-bold text-white/60 leading-relaxed uppercase">{log.update}</p>
                     </div>
                   )) : (
                    <div className="py-20 text-center opacity-20">
                      <Clock size={40} className="mx-auto mb-4 text-white" />
                      <span className="text-xs font-sans font-black uppercase tracking-widest text-white">AWAITING INITIAL LOG DROP</span>
                    </div>
                   )}
                 </div>
              </div>
            </motion.div>
          )}

          {/* PROFILE VIEW (CLIENT ONLY) */}
          {!isAdmin && activeSubTab === 'profile' && (
            <motion.div key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="brutalist-panel p-10 bg-white/5 max-w-4xl mx-auto w-full">
               <h3 className="text-2xl font-heading font-black uppercase tracking-tighter mb-12 border-b border-white/10 pb-4">CLIENT IDENTITY PROFILE</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-8">
                     <div>
                        <span className="text-[9px] font-sans font-black text-white/40 uppercase tracking-widest block mb-2">FULL NAME</span>
                        <div className="text-xl font-heading font-black text-white uppercase">{user.name}</div>
                     </div>
                     <div>
                        <span className="text-[9px] font-sans font-black text-white/40 uppercase tracking-widest block mb-2">BUSINESS ENTITY</span>
                        <div className="text-xl font-heading font-black text-white uppercase">{user.businessName || 'NOT SPECIFIED'}</div>
                     </div>
                     <div>
                        <span className="text-[9px] font-sans font-black text-white/40 uppercase tracking-widest block mb-2">CONTACT EMAIL</span>
                        <div className="text-xl font-heading font-black text-white uppercase">{user.email}</div>
                     </div>
                  </div>
                  <div className="space-y-8">
                     <div>
                        <span className="text-[9px] font-sans font-black text-white/40 uppercase tracking-widest block mb-2">UNIQUE REGISTRATION KEY</span>
                        <div className="text-xl font-heading font-black text-white uppercase tracking-[0.2em]">{user.registrationKey}</div>
                     </div>
                     <div>
                        <span className="text-[9px] font-sans font-black text-white/40 uppercase tracking-widest block mb-2">ACCOUNT STATUS</span>
                        <div className="flex items-center gap-2 text-green-500 font-heading font-black text-xl">
                          <CheckCircle size={18} /> ACTIVATED
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
