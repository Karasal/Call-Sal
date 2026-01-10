
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ArrowRight, Calendar, Clock, CheckCircle, Video, Phone, MapPin } from 'lucide-react';
import { storage } from '../services/storageService';
import { MeetingType, Booking } from '../types';

export const BookingSystem: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [meetingType, setMeetingType] = useState<MeetingType>('zoom');
  const [existingBookings, setExistingBookings] = useState<Booking[]>([]);

  useEffect(() => {
    setExistingBookings(storage.getBookings());
  }, [step]);

  // Logic: 14 days, starting 2 days from now
  const getDates = () => {
    const dates = [];
    const start = new Date();
    start.setDate(start.getDate() + 2);
    for (let i = 0; i < 14; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      dates.push(d);
    }
    return dates;
  };

  // Logic: Half-hour intervals 9AM - 6PM
  const getTimes = () => {
    const slots = [];
    for (let h = 9; h <= 17; h++) {
      slots.push(`${h.toString().padStart(2, '0')}:00`);
      slots.push(`${h.toString().padStart(2, '0')}:30`);
    }
    slots.push("18:00");
    return slots;
  };

  const isSlotUnavailable = (time: string) => {
    if (!selectedDate) return false;
    
    return existingBookings.some(b => {
      if (b.date !== selectedDate) return false;
      
      const bStart = parseInt(b.time.split(':')[0]) * 60 + parseInt(b.time.split(':')[1]);
      const bEnd = bStart + b.duration;
      const sStart = parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1]);
      const sEnd = sStart + (meetingType === 'in-person' ? 120 : 30);

      // Check for overlap
      return (sStart < bEnd && sEnd > bStart);
    });
  };

  const handleConfirm = () => {
    const user = storage.getCurrentUser();
    if (!user) {
      alert("Please login to book a session!");
      return;
    }

    const newBooking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      userName: user.name,
      date: selectedDate!,
      time: selectedTime!,
      type: meetingType,
      duration: meetingType === 'in-person' ? 120 : 30,
      status: 'confirmed'
    };

    storage.addBooking(newBooking);
    setStep(4);
  };

  const formattedDates = getDates();
  const timeSlots = getTimes();

  return (
    <div className="brutalist-panel max-w-4xl mx-auto overflow-hidden">
      <div className="p-8 md:p-16">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex items-center justify-center gap-4 mb-10 opacity-60">
                <Calendar size={14} />
                <span className="text-[11px] font-sans tracking-[0.5em] uppercase font-black">Step 01 / Date</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-heading font-black mb-14 text-white text-center uppercase tracking-tighter">SELECT A DATE</h3>
              
              <div className="grid grid-cols-7 gap-2 md:gap-4 mb-16">
                {formattedDates.map((d, i) => {
                  const dateStr = d.toISOString().split('T')[0];
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedDate(dateStr)}
                      className={`aspect-square flex flex-col items-center justify-center transition-all border ${
                        selectedDate === dateStr 
                        ? 'bg-white text-black border-white' 
                        : 'bg-white/5 text-white/60 border-white/5 hover:border-white/20'
                      }`}
                    >
                      <span className="text-[8px] uppercase tracking-widest font-sans mb-1">{d.toLocaleString('default', { month: 'short' })}</span>
                      <span className="text-xl md:text-2xl font-heading font-black">{d.getDate()}</span>
                    </button>
                  );
                })}
              </div>

              <button 
                disabled={!selectedDate}
                onClick={() => setStep(2)}
                className="w-full py-6 bg-white text-black font-heading font-black text-xs tracking-[0.4em] uppercase hover:bg-white/90 disabled:opacity-20 transition-all"
              >
                NEXT: CHOOSE MEETING TYPE
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex items-center justify-center gap-4 mb-10 opacity-60">
                <Video size={14} />
                <span className="text-[11px] font-sans tracking-[0.5em] uppercase font-black">Step 02 / Modality</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-heading font-black mb-14 text-white text-center uppercase tracking-tighter">HOW SHALL WE MEET?</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {[
                  { id: 'zoom', icon: <Video />, label: 'Zoom Call', desc: '30 Minutes' },
                  { id: 'phone', icon: <Phone />, label: 'Phone Call', desc: '30 Minutes' },
                  { id: 'in-person', icon: <MapPin />, label: 'In-Person', desc: '2 Hours (Calgary Only)' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setMeetingType(t.id as MeetingType)}
                    className={`p-10 border transition-all flex flex-col items-center text-center gap-4 ${
                      meetingType === t.id 
                      ? 'bg-white text-black border-white' 
                      : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30'
                    }`}
                  >
                    {t.icon}
                    <span className="text-lg font-heading font-black uppercase">{t.label}</span>
                    <span className="text-[9px] font-sans font-bold tracking-widest opacity-40">{t.desc}</span>
                  </button>
                ))}
              </div>

              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="flex-1 py-6 border border-white/20 text-white/60 hover:text-white font-heading font-black text-[10px] tracking-widest uppercase">BACK</button>
                <button onClick={() => setStep(3)} className="flex-[2] py-6 bg-white text-black font-heading font-black text-xs tracking-[0.4em] uppercase">NEXT: CHOOSE TIME</button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex items-center justify-center gap-4 mb-10 opacity-60">
                <Clock size={14} />
                <span className="text-[11px] font-sans tracking-[0.5em] uppercase font-black">Step 03 / Time</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-heading font-black mb-14 text-white text-center uppercase tracking-tighter">SELECT A TIME</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16">
                {timeSlots.map((t) => {
                  const unavailable = isSlotUnavailable(t);
                  return (
                    <button
                      key={t}
                      disabled={unavailable}
                      onClick={() => setSelectedTime(t)}
                      className={`p-4 flex flex-col items-center justify-center transition-all border ${
                        selectedTime === t 
                        ? 'bg-white text-black border-white' 
                        : unavailable 
                          ? 'bg-transparent text-white/10 border-white/5 cursor-not-allowed line-through'
                          : 'bg-white/5 text-white/60 border-white/10 hover:border-white/40'
                      }`}
                    >
                      <span className="text-xl font-heading font-black">{t}</span>
                      <span className="text-[8px] font-sans tracking-[0.1em] uppercase font-black opacity-40">
                        {unavailable ? 'BOOKED' : 'AVAILABLE'}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-4">
                <button onClick={() => setStep(2)} className="flex-1 py-6 border border-white/20 text-white/60 hover:text-white font-heading font-black text-[10px] tracking-widest uppercase">BACK</button>
                <button 
                  disabled={!selectedTime}
                  onClick={handleConfirm}
                  className="flex-[2] py-6 bg-white text-black font-heading font-black text-xs tracking-[0.4em] uppercase hover:bg-white/90 disabled:opacity-20"
                >
                  CONFIRM BOOKING
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-16 text-center">
              <div className="w-24 h-24 bg-white text-black flex items-center justify-center mx-auto mb-12">
                <CheckCircle size={40} />
              </div>
              <h3 className="text-5xl md:text-6xl font-heading font-black mb-8 text-white uppercase tracking-tighter stark-gradient">CONFIRMED</h3>
              <p className="text-xl font-heading font-bold text-white/70 mb-12 max-w-sm mx-auto uppercase tracking-tight leading-tight">
                Your {meetingType} session is scheduled for {selectedDate} at {selectedTime}.
              </p>
              <div className="w-20 h-1 bg-white/20 mx-auto" />
              <button 
                onClick={() => setStep(1)}
                className="mt-12 text-[11px] font-sans tracking-[0.8em] text-white/60 uppercase font-black hover:text-white transition-colors"
              >
                NEW BOOKING
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
