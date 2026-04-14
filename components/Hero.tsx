'use client';

import React from 'react';
import { motion } from 'motion/react';
import { WhatsAppMockup } from './WhatsAppMockup';
import { ArrowRight, ShieldCheck, CreditCard, Globe } from 'lucide-react';
import { toast } from 'sonner';

export function Hero() {
  const handleLaunchSoon = () => {
    toast.info('Tripkopa is launching soon!', {
      description: 'We are putting the final touches on your favorite travel payment system.',
    });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
      {/* Grain Background */}
      <div className="absolute inset-0 bg-grain pointer-events-none z-0" />
      
      {/* Subtle Gradient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">
        {/* Left Content */}
        <div className="flex flex-col items-start text-left space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-heading font-bold leading-[1.05] tracking-tight text-[#1a1c20] max-w-[520px]"
          >
            Book Your Flight. <br />
            <span className="text-emerald-600">Pay Small Small.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#54656f] max-w-[420px] leading-relaxed"
          >
            Search, book, and spread your flight payments directly on WhatsApp. No hidden fees, no stress.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <button 
              onClick={handleLaunchSoon}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-emerald-600/20 group"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-4.821 4.991c-1.536 0-3.038-.414-4.35-1.198l-.313-.186-3.23.848.863-3.149-.204-.325a9.187 9.187 0 0 1-1.41-4.88c0-5.067 4.122-9.189 9.189-9.189 2.456 0 4.765.956 6.5 2.691a9.132 9.132 0 0 1 2.689 6.498c0 5.067-4.122 9.189-9.189 9.189m8.529-17.718A10.612 10.612 0 0 0 12.65 0C6.655 0 1.779 4.876 1.777 10.873c0 1.917.499 3.787 1.447 5.43L0 22.504l6.305-1.654a10.616 10.616 0 0 0 5.044 1.288h.005c5.994 0 10.87-4.876 10.872-10.874a10.61 10.61 0 0 0-3.227-7.684" />
              </svg>
              <span>Chat on WhatsApp</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Trust Signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-black/10 w-full"
          >
            <div className="flex items-start gap-3 py-2">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/15 flex items-center justify-center shrink-0">
                <CreditCard size={24} className="text-emerald-700" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-[#1a1c20]">Installments</h4>
                <p className="text-sm text-[#44515a] font-medium">Pay in 4 easy parts</p>
              </div>
            </div>
            <div className="flex items-start gap-3 py-2">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/15 flex items-center justify-center shrink-0">
                <Globe size={24} className="text-emerald-700" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-[#1a1c20]">Global Reach</h4>
                <p className="text-sm text-[#44515a] font-medium">All major airlines</p>
              </div>
            </div>
            <div className="flex items-start gap-3 py-2">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/15 flex items-center justify-center shrink-0">
                <ShieldCheck size={24} className="text-emerald-700" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-[#1a1c20]">Secure</h4>
                <p className="text-sm text-[#44515a] font-medium">Encrypted payments</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Content - WhatsApp Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="relative flex justify-center lg:justify-end"
        >
          {/* Decorative Elements */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none" />
          
          <WhatsAppMockup />
        </motion.div>
      </div>
    </section>
  );
}
