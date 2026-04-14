'use client';

import React from 'react';
import { Hero } from '@/components/Hero';
import { Navbar } from '@/components/Navbar';
import { WhatsAppCtaMockup } from '@/components/WhatsAppCtaMockup';
import { motion } from 'motion/react';
import { Plane, CreditCard, CheckCircle2, Wallet, Zap, Calendar, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export default function Home() {
  const handleLaunchSoon = () => {
    toast.info('Tripkopa is launching soon!', {
      description: 'We are putting the final touches on your favorite travel payment system.',
    });
  };

  return (
    <main className="min-h-screen bg-[#f4fbf7] text-[#1a1c20] overflow-x-hidden">
      <Navbar />
      {/* Hero Section */}
      <Hero />

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 px-6 relative z-10 border-t border-black/5 bg-white scroll-mt-20">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-heading font-bold tracking-tight text-[#1a1c20]"
            >
              How Tripkopa Works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[#54656f] max-w-xl mx-auto"
            >
              Booking your next flight is as easy as sending a message to a friend.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-emerald-600">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-4.821 4.991c-1.536 0-3.038-.414-4.35-1.198l-.313-.186-3.23.848.863-3.149-.204-.325a9.187 9.187 0 0 1-1.41-4.88c0-5.067 4.122-9.189 9.189-9.189 2.456 0 4.765.956 6.5 2.691a9.132 9.132 0 0 1 2.689 6.498c0 5.067-4.122 9.189-9.189 9.189m8.529-17.718A10.612 10.612 0 0 0 12.65 0C6.655 0 1.779 4.876 1.777 10.873c0 1.917.499 3.787 1.447 5.43L0 22.504l6.305-1.654a10.616 10.616 0 0 0 5.044 1.288h.005c5.994 0 10.87-4.876 10.872-10.874a10.61 10.61 0 0 0-3.227-7.684" />
                  </svg>
                ),
                title: "Say Hello",
                description: "Message us on WhatsApp with your travel dates and destination."
              },
              {
                icon: <Plane className="text-emerald-600" size={32} />,
                title: "Pick a Flight",
                description: "We'll send you the best options. Choose the one that fits your budget."
              },
              {
                icon: <CreditCard className="text-emerald-600" size={32} />,
                title: "Pay in Parts",
                description: "Book with a small deposit and pay the rest in flexible installments."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="p-8 rounded-2xl bg-[#f8f9fa] border border-black/5 hover:border-emerald-500/20 transition-all group"
              >
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/5 w-fit group-hover:bg-emerald-500/10 transition-colors">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#1a1c20]">{step.title}</h3>
                <p className="text-[#54656f] leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Tripkopa Section */}
      <section className="py-24 px-6 bg-[#f1f9f4]">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-heading font-bold tracking-tight text-[#1a1c20]"
            >
              Why Choose Tripkopa?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[#54656f] max-w-xl mx-auto"
            >
              We&apos;ve reimagined flight booking to make travel accessible for everyone.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Wallet className="text-emerald-600" size={28} />,
                title: "No Full Payment Upfront",
                description: "Start your journey without paying everything at once."
              },
              {
                icon: <Zap className="text-emerald-600" size={28} />,
                title: "Simple & Fast",
                description: "Book your flight directly on WhatsApp in minutes."
              },
              {
                icon: <Calendar className="text-emerald-600" size={28} />,
                title: "Flexible Payments",
                description: "Choose a plan that fits your budget."
              },
              {
                icon: <ShieldCheck className="text-emerald-600" size={28} />,
                title: "Secure & Reliable",
                description: "Your payments and bookings are safe and protected."
              }
            ].map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative p-8 rounded-3xl bg-white border border-black/5 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-500 group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-700" />
                <div className="mb-6 relative">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/5 flex items-center justify-center group-hover:bg-emerald-500/10 transition-colors duration-500">
                    {point.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#1a1c20] relative">{point.title}</h3>
                <p className="text-[#54656f] leading-relaxed relative">{point.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section id="airlines" className="py-24 px-6 bg-[#edf8f2] border-t border-emerald-900/10 scroll-mt-20">
        <div className="container max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl space-y-6">
            <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight text-[#1a1c20]">
              Real Bookings. <br />
              <span className="text-emerald-600">Real Trust.</span>
            </h2>
            <p className="text-[#54656f] leading-relaxed">
              We partner with major airlines and secure payment providers to ensure your travel is safe and your payments are protected.
            </p>
            <div className="space-y-4">
              {[
                "Instant booking confirmation",
                "No hidden interest or fees",
                "24/7 WhatsApp support"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="text-emerald-600" size={20} />
                  <span className="font-medium text-[#1a1c20]">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative w-full md:w-auto">
            <div className="absolute inset-0 bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none" />
            <div className="relative grid grid-cols-2 gap-4">
              {[
                { name: "Travel Start", color: "text-emerald-700", featured: true },
                { name: "Air Peace", color: "text-blue-900" },
                { name: "Ibom Air", color: "text-emerald-800" },
                { name: "Arik Air", color: "text-red-700" },
                { name: "Dana Air", color: "text-blue-700" },
                { name: "United Nigeria", color: "text-blue-900" },
                { name: "ValueJet", color: "text-orange-600" }
              ].map((airline, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`border rounded-2xl p-6 flex items-center justify-center transition-shadow ${
                    airline.featured
                      ? 'col-span-2 bg-white border-emerald-300 shadow-lg shadow-emerald-700/10'
                      : 'bg-white border-black/5 shadow-sm hover:shadow-md group'
                  }`}
                >
                  <span className={`font-heading font-bold tracking-tighter ${
                    airline.featured
                      ? 'text-2xl text-emerald-700'
                      : `${airline.color} text-lg opacity-60 group-hover:opacity-100 transition-opacity`
                  }`}>
                    {airline.name}
                  </span>
                </motion.div>
              ))}
              {/* <div className="col-span-2 mt-4 p-6 rounded-2xl bg-emerald-600 text-white text-center shadow-lg shadow-emerald-600/20">
                <div className="text-3xl font-bold">10k+</div>
                <div className="text-emerald-100 text-sm font-medium">Happy Travelers</div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="support" className="py-28 px-6 relative overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] bg-emerald-500/15 blur-[130px] rounded-full pointer-events-none" />
        
        <div className="container max-w-7xl mx-auto relative z-10 grid lg:grid-cols-[minmax(0,1fr)_minmax(420px,520px)] gap-12 lg:gap-16 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight text-[#1a1c20]">
              Ready to fly?
            </h2>
            <p className="text-xl text-[#54656f] max-w-xl mx-auto lg:mx-0">
              Join thousands of travelers booking their dreams one installment at a time.
            </p>
            <button 
              onClick={handleLaunchSoon}
              className="inline-flex items-center gap-3 px-10 py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-xl transition-all shadow-xl shadow-emerald-600/20 group"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-4.821 4.991c-1.536 0-3.038-.414-4.35-1.198l-.313-.186-3.23.848.863-3.149-.204-.325a9.187 9.187 0 0 1-1.41-4.88c0-5.067 4.122-9.189 9.189-9.189 2.456 0 4.765.956 6.5 2.691a9.132 9.132 0 0 1 2.689 6.498c0 5.067-4.122 9.189-9.189 9.189m8.529-17.718A10.612 10.612 0 0 0 12.65 0C6.655 0 1.779 4.876 1.777 10.873c0 1.917.499 3.787 1.447 5.43L0 22.504l6.305-1.654a10.616 10.616 0 0 0 5.044 1.288h.005c5.994 0 10.87-4.876 10.872-10.874a10.61 10.61 0 0 0-3.227-7.684" />
              </svg>
              <span>Start Chatting Now</span>
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="absolute inset-6 bg-emerald-500/20 blur-[70px] rounded-full pointer-events-none" />
            <WhatsAppCtaMockup />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative overflow-hidden py-10 px-6 border-t border-emerald-900/10 text-[#42545e] text-sm bg-gradient-to-b from-[#e8f6ee] via-[#e9f7ef] to-[#ddf1e7]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(16,185,129,0.22),transparent_42%),radial-gradient(circle_at_85%_85%,rgba(5,150,105,0.18),transparent_46%)]" />
        <div className="container max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="flex flex-col items-center lg:items-start gap-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    {/* The "Stealth Wing K" - A unique airplane/chat hybrid */}
                    <path d="M8 3v15" />
                    <path d="M8 10l10-7" />
                    <path d="M8 10l7 7" />
                    <path d="M18 3l1.5-1" className="opacity-60" />
                    <path d="M8 3L7 1" className="opacity-60" />
                    <path d="M8 18l-3 3v-3h3z" fill="currentColor" />
                  </svg>
                </div>
                <span className="font-heading font-bold text-[#1a1c20] text-xl tracking-tighter">
                  Trip<span className="text-emerald-600">kopa</span>
                </span>
              </div>
              <p className="font-medium text-[#2e444f] text-center lg:text-left">
                Making travel possible, one payment at a time
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-x-7 gap-y-3">
              <a href="#" className="hover:text-[#1a1c20] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#1a1c20] transition-colors">Terms</a>
              <a href="mailto:support@tripkopa.com" className="hover:text-[#1a1c20] transition-colors">Contact</a>
            </div>
          </div>

          <div className="mt-7 pt-5 border-t border-emerald-900/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>© 2026 Tripkopa. All rights reserved.</p>
            <p>
              Contact: <a href="mailto:support@tripkopa.com" className="font-semibold text-emerald-800 hover:text-emerald-900 transition-colors">support@tripkopa.com</a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
