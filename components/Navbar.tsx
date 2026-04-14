'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Menu, X } from 'lucide-react';
import { toast } from 'sonner';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLaunchSoon = () => {
    toast.info('Tripkopa is launching soon!', {
      description: 'We are putting the final touches on your favorite travel payment system.',
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 ${
        isScrolled ? 'py-4 bg-white/80 backdrop-blur-md border-b border-black/5 shadow-sm' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-11 h-11 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-600/20 group-hover:scale-105 transition-all duration-300 group-hover:rotate-3">
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-6 h-6"
            >
              {/* The "Stealth Wing K" - A unique airplane/chat hybrid */}
              {/* Fuselage (Vertical bar of K) */}
              <path d="M8 3v15" />
              {/* Main Wing (Top arm of K) - Swept back like a jet */}
              <path d="M8 10l10-7" />
              {/* Tail Stabilizer (Bottom arm of K) */}
              <path d="M8 10l7 7" />
              {/* Airplane Details: Wing Tip and Nose */}
              <path d="M18 3l1.5-1" className="opacity-60" />
              <path d="M8 3L7 1" className="opacity-60" />
              {/* The Chat Twist: The fuselage base is a chat bubble tail */}
              <path d="M8 18l-3 3v-3h3z" fill="currentColor" />
            </svg>
          </div>
          <span className="text-2xl font-heading font-bold tracking-tighter text-[#1a1c20]">
            Trip<span className="text-emerald-600">kopa</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={handleLaunchSoon}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold text-sm transition-all shadow-md shadow-emerald-600/10 active:scale-95"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-4.821 4.991c-1.536 0-3.038-.414-4.35-1.198l-.313-.186-3.23.848.863-3.149-.204-.325a9.187 9.187 0 0 1-1.41-4.88c0-5.067 4.122-9.189 9.189-9.189 2.456 0 4.765.956 6.5 2.691a9.132 9.132 0 0 1 2.689 6.498c0 5.067-4.122 9.189-9.189 9.189m8.529-17.718A10.612 10.612 0 0 0 12.65 0C6.655 0 1.779 4.876 1.777 10.873c0 1.917.499 3.787 1.447 5.43L0 22.504l6.305-1.654a10.616 10.616 0 0 0 5.044 1.288h.005c5.994 0 10.87-4.876 10.872-10.874a10.61 10.61 0 0 0-3.227-7.684" />
            </svg>
            <span>Book Now</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-[#1a1c20]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-black/5 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLaunchSoon();
                }}
                className="flex items-center justify-center gap-2 w-full py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-4.821 4.991c-1.536 0-3.038-.414-4.35-1.198l-.313-.186-3.23.848.863-3.149-.204-.325a9.187 9.187 0 0 1-1.41-4.88c0-5.067 4.122-9.189 9.189-9.189 2.456 0 4.765.956 6.5 2.691a9.132 9.132 0 0 1 2.689 6.498c0 5.067-4.122 9.189-9.189 9.189m8.529-17.718A10.612 10.612 0 0 0 12.65 0C6.655 0 1.779 4.876 1.777 10.873c0 1.917.499 3.787 1.447 5.43L0 22.504l6.305-1.654a10.616 10.616 0 0 0 5.044 1.288h.005c5.994 0 10.87-4.876 10.872-10.874a10.61 10.61 0 0 0-3.227-7.684" />
                </svg>
                <span>Book Now</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
