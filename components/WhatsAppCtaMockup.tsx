'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Phone, Video, MoreVertical, Paperclip, Smile, Mic } from 'lucide-react';

interface CtaMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

const previewMessages: CtaMessage[] = [
  { id: '1', sender: 'user', text: 'Hi, I need Lagos to Abuja on May 4.', time: '11:15 AM' },
  { id: '2', sender: 'bot', text: 'Sure. Morning or afternoon flights?', time: '11:15 AM' },
  { id: '3', sender: 'user', text: 'Morning works best.', time: '11:16 AM' },
  { id: '4', sender: 'bot', text: 'Best fare starts from N102,000. First payment: N40,000.', time: '11:16 AM' },
  { id: '5', sender: 'user', text: 'Perfect, recommend an instalment plan.', time: '11:17 AM' },
  { id: '6', sender: 'bot', text: 'Done. 3 follow-up instalments, one each month.', time: '11:17 AM' },
  { id: '7', sender: 'bot', text: 'Seat can be secured once first payment is confirmed.', time: '11:18 AM' },
  { id: '8', sender: 'user', text: 'Proceeding now.', time: '11:18 AM' },
  { id: '9', sender: 'bot', text: 'Great. Send proof and I will confirm instantly.', time: '11:18 AM' },
];

export function WhatsAppCtaMockup() {
  const chatAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chatArea = chatAreaRef.current;
    if (!chatArea) return;

    let rafId: number | null = null;
    let timeoutId: number | null = null;
    let direction = 1;
    let lastTime = 0;
    let pauseUntil = 0;
    const speedPxPerMs = 0.018;
    const edgePauseMs = 1400;

    const step = (currentTime: number) => {
      if (!chatArea.isConnected) return;

      if (!lastTime) lastTime = currentTime;
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      const maxScroll = chatArea.scrollHeight - chatArea.clientHeight;
      if (maxScroll <= 0) {
        rafId = window.requestAnimationFrame(step);
        return;
      }

      if (currentTime < pauseUntil) {
        rafId = window.requestAnimationFrame(step);
        return;
      }

      const nextScrollTop = chatArea.scrollTop + direction * speedPxPerMs * delta;

      if (nextScrollTop >= maxScroll) {
        chatArea.scrollTop = maxScroll;
        direction = -1;
        pauseUntil = currentTime + edgePauseMs;
      } else if (nextScrollTop <= 0) {
        chatArea.scrollTop = 0;
        direction = 1;
        pauseUntil = currentTime + edgePauseMs;
      } else {
        chatArea.scrollTop = nextScrollTop;
      }

      rafId = window.requestAnimationFrame(step);
    };

    timeoutId = window.setTimeout(() => {
      lastTime = performance.now();
      rafId = window.requestAnimationFrame(step);
    }, 1200);

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="relative w-full max-w-[520px] h-[66vh] min-h-[520px] max-h-[760px] bg-[#efeae2] rounded-[44px] border-[10px] border-[#f0f2f5] shadow-2xl shadow-emerald-900/20 overflow-hidden flex flex-col font-sans">
      <div className="bg-[#008069] px-5 py-4 flex items-center gap-3 shrink-0">
        <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-[#008069] font-bold text-lg">
          T
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-base truncate">Tripkopa</h3>
          <p className="text-white/80 text-xs">typically replies instantly</p>
        </div>
        <div className="flex gap-4 text-white">
          <Video size={18} />
          <Phone size={18} />
          <MoreVertical size={18} />
        </div>
      </div>

      <div ref={chatAreaRef} className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#efeae2] scrollbar-hide">
        {previewMessages.map((msg, index) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.35 }}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[84%] rounded-lg px-3.5 py-2.5 shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-[#dcf8c6] rounded-tr-none'
                  : 'bg-white rounded-tl-none border border-[#e9edef]'
              }`}
            >
              <p className="text-sm text-[#111b21] leading-relaxed">{msg.text}</p>
              <p className="text-[10px] text-[#667781] mt-1 text-right">{msg.time}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-[#f0f2f5] p-3 flex items-center gap-2 shrink-0">
        <div className="flex gap-3 px-2 text-[#54656f]">
          <Smile size={22} />
          <Paperclip size={22} className="rotate-45" />
        </div>
        <div className="flex-1 bg-white rounded-lg px-3 py-2 text-[#8696a0] text-sm">Type a message</div>
        <div className="w-10 h-10 rounded-full bg-[#008069] flex items-center justify-center text-white">
          <Mic size={20} />
        </div>
      </div>
    </div>
  );
}
