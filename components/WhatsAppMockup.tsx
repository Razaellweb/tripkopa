'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Check, CheckCheck, Phone, Video, MoreVertical, Paperclip, Smile, Mic } from 'lucide-react';
import { toast } from 'sonner';

type MessageType = 'text' | 'quickReplies' | 'flightOptions' | 'installmentPlan' | 'detailsChecklist' | 'paymentDetails';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  time: string;
  status?: 'sent' | 'delivered' | 'read';
  type?: MessageType;
  quickReplies?: string[];
  flightOptions?: {
    airline: string;
    time: string;
    date: string;
    amount: string;
    isCheapest?: boolean;
  }[];
  installmentPlan?: {
    label: string;
    amount: string;
    date: string;
  }[];
  detailsChecklist?: string[];
  paymentDetails?: {
    bank: string;
    accountNumber: string;
    accountName: string;
    amount: string;
    narration: string;
    note: string;
  };
}

const messages: Message[] = [
  {
    id: '1',
    text: 'Hi, I want a flight from Lagos to Abuja.',
    sender: 'user',
    time: '10:00 AM',
    status: 'read',
  },
  {
    id: '2',
    text: 'Where are you travelling from? When do you want to travel, what time works best for you, and which ticket class do you want?',
    sender: 'bot',
    time: '10:00 AM',
  },
  {
    id: '3',
    text: 'Pick one quickly to speed things up:',
    sender: 'bot',
    time: '10:00 AM',
    type: 'quickReplies',
    quickReplies: ['Economy', 'Business', 'First Class'],
  },
  {
    id: '4',
    text: 'I am in Lagos and want to travel on May 4. Morning or afternoon works best, and I prefer Economy.',
    sender: 'user',
    time: '10:01 AM',
    status: 'read',
  },
  {
    id: '5',
    text: 'Here are the best options for your trip.',
    sender: 'bot',
    time: '10:02 AM',
    type: 'flightOptions',
    flightOptions: [
      { airline: 'Air Peace', time: '10:30 AM', date: 'May 4', amount: 'From ₦102,000', isCheapest: true },
      { airline: 'Ibom Air', time: '12:15 PM', date: 'May 4', amount: 'From ₦108,500' },
      { airline: 'United Nigeria', time: '1:40 PM', date: 'May 4', amount: 'From ₦114,000' },
    ],
  },
  {
    id: '6',
    text: "I'll take the 10:30 AM flight.",
    sender: 'user',
    time: '10:03 AM',
    status: 'read',
  },
  {
    id: '7',
    text: 'Great choice. Pay ₦40,000 now to secure your seat. You can spread the remaining balance over 2-4 instalments. Let me know which plan works for you, or I can recommend one.',
    sender: 'bot',
    time: '10:03 AM',
  },
  {
    id: '8',
    text: 'Please recommend one.',
    sender: 'user',
    time: '10:03 AM',
    status: 'read',
  },
  {
    id: '9',
    text: 'Recommended plan based on your route and date:',
    sender: 'bot',
    time: '10:04 AM',
    type: 'installmentPlan',
    installmentPlan: [
      { label: 'First payment', amount: '₦40,000', date: 'Apr 14, 2026 (Today)' },
      { label: 'Next payment', amount: '₦21,000', date: 'May 14, 2026' },
      { label: 'Next payment', amount: '₦21,000', date: 'Jun 14, 2026' },
      { label: 'Final payment', amount: '₦20,000', date: 'Jul 14, 2026' },
    ],
  },
  {
    id: '10',
    text: 'Does this work well for you?',
    sender: 'bot',
    time: '10:04 AM',
  },
  {
    id: '11',
    text: 'Yes, it does.',
    sender: 'user',
    time: '10:05 AM',
    status: 'read',
  },
  {
    id: '12',
    text: 'Fantastic. I need these details to complete your booking:',
    sender: 'bot',
    time: '10:05 AM',
    type: 'detailsChecklist',
    detailsChecklist: [
      'Your full legal name (must match a valid government ID)',
      'Date of birth',
      'Phone number',
      'Email address',
    ],
  },
  {
    id: '13',
    text: 'Shared. Please proceed.',
    sender: 'user',
    time: '10:06 AM',
    status: 'read',
  },
  {
    id: '14',
    text: 'Awesome. Make your first payment with these details:',
    sender: 'bot',
    time: '10:06 AM',
    type: 'paymentDetails',
    paymentDetails: {
      bank: 'Providus Bank',
      accountNumber: '0123456789',
      accountName: 'Tripkopa Travel Services',
      amount: '₦40,000',
      narration: 'TRPK-LOS-ABV-2471',
      note: 'Initial payment is non-refundable. Please use the exact narration.',
    },
  },
  {
    id: '15',
    text: 'Okay.',
    sender: 'user',
    time: '10:07 AM',
    status: 'read',
  },
  {
    id: '16',
    text: "Payment received! You're all set. Your flight is secured ✈️",
    sender: 'bot',
    time: '10:08 AM',
  },
  {
    id: '17',
    text: 'Your booking reference and full ticket details will be sent once your payment plan is completed.',
    sender: 'bot',
    time: '10:08 AM',
  }
];

export function WhatsAppMockup() {
  const chatAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chatArea = chatAreaRef.current;
    if (!chatArea) return;

    let rafId: number | null = null;
    let timeoutId: number | null = null;
    let direction = 1;
    let lastTime = 0;
    let pauseUntil = 0;
    const speedPxPerMs = 0.022;
    const edgePauseMs = 1200;

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
    }, 1600);

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const renderMessageContent = (msg: Message) => {
    if (msg.type === 'quickReplies' && msg.quickReplies) {
      return (
        <div className="px-3 py-3 space-y-2">
          <p className="text-sm leading-relaxed">{msg.text}</p>
          <div className="flex flex-wrap gap-2 pt-1">
            {msg.quickReplies.map((reply) => (
              <span key={reply} className="px-2.5 py-1 rounded-full bg-[#f0f2f5] border border-[#dce3e7] text-[11px] font-semibold text-[#385069]">
                {reply}
              </span>
            ))}
          </div>
        </div>
      );
    }

    if (msg.type === 'flightOptions' && msg.flightOptions) {
      return (
        <div className="px-3 py-3 space-y-3">
          <p className="text-xs text-[#008069] font-bold uppercase tracking-wide">Flight Options</p>
          <div className="space-y-2">
            {msg.flightOptions.map((option) => (
              <div key={`${option.airline}-${option.time}`} className="rounded-lg border border-[#e9edef] bg-[#f8faf9] px-3 py-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[13px] font-semibold text-[#111b21]">{option.airline}</p>
                    <p className="text-[11px] text-[#667781]">{option.time} • {option.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[12px] font-bold text-[#008069]">{option.amount}</p>
                    {option.isCheapest && (
                      <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#daf2e8] text-[#006e5a]">
                        Cheapest
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => toast.info('Demo flow only', { description: 'This chat UI mirrors how selection can feel in WhatsApp.' })}
            className="w-full py-2 bg-[#008069] hover:bg-[#006e5a] text-white rounded-md font-semibold text-xs transition-colors"
          >
            Select 10:30 AM Option
          </button>
        </div>
      );
    }

    if (msg.type === 'installmentPlan' && msg.installmentPlan) {
      return (
        <div className="px-3 py-3 space-y-3">
          <p className="text-xs text-[#008069] font-bold uppercase tracking-wide">Recommended Instalment Plan</p>
          <div className="space-y-2">
            {msg.installmentPlan.map((item) => (
              <div key={`${item.label}-${item.date}`} className="flex items-center justify-between rounded-md bg-[#f5f8fa] border border-[#e9edef] px-2.5 py-2">
                <div>
                  <p className="text-[12px] font-semibold text-[#1f2d36]">{item.label}</p>
                  <p className="text-[10px] text-[#667781]">{item.date}</p>
                </div>
                <p className="text-[12px] font-bold text-[#008069]">{item.amount}</p>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-[#667781]">Does this schedule work well for you?</p>
        </div>
      );
    }

    if (msg.type === 'detailsChecklist' && msg.detailsChecklist) {
      return (
        <div className="px-3 py-3 space-y-2">
          <p className="text-sm leading-relaxed">{msg.text}</p>
          <div className="space-y-1.5">
            {msg.detailsChecklist.map((item) => (
              <div key={item} className="flex items-start gap-2">
                <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-[#008069] shrink-0" />
                <p className="text-[12px] text-[#1f2d36] leading-snug">{item}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (msg.type === 'paymentDetails' && msg.paymentDetails) {
      return (
        <div className="px-3 py-3 space-y-3">
          <p className="text-sm leading-relaxed">{msg.text}</p>
          <div className="rounded-lg border border-[#d8e3de] bg-[#eef8f3] p-3 space-y-2">
            <div className="flex justify-between gap-2">
              <span className="text-[10px] uppercase text-[#667781]">Bank</span>
              <span className="text-[12px] font-semibold text-[#1f2d36]">{msg.paymentDetails.bank}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-[10px] uppercase text-[#667781]">Account Number</span>
              <span className="text-[12px] font-semibold text-[#1f2d36]">{msg.paymentDetails.accountNumber}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-[10px] uppercase text-[#667781]">Account Name</span>
              <span className="text-[12px] font-semibold text-[#1f2d36] text-right">{msg.paymentDetails.accountName}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-[10px] uppercase text-[#667781]">Amount</span>
              <span className="text-[12px] font-bold text-[#008069]">{msg.paymentDetails.amount}</span>
            </div>
            <div className="pt-1 border-t border-[#c9dbd2]">
              <span className="text-[10px] uppercase text-[#667781]">Narration</span>
              <p className="text-[12px] font-bold text-[#1f2d36] tracking-wide">{msg.paymentDetails.narration}</p>
            </div>
          </div>
          <p className="text-[11px] text-[#8a2d2d] bg-[#fff0f0] border border-[#ffd7d7] rounded-md px-2 py-1.5">
            {msg.paymentDetails.note}
          </p>
          <button
            onClick={() => toast.success('Nice! Payment event simulated.', { description: 'In production, this updates from webhook confirmation.' })}
            className="w-full py-2 bg-[#008069] hover:bg-[#006e5a] text-white rounded-md font-semibold text-xs transition-colors"
          >
            I&apos;ve Made Payment
          </button>
        </div>
      );
    }

    return <p className="text-sm leading-relaxed">{msg.text}</p>;
  };

  return (
    <div className="relative w-full max-w-[380px] h-[640px] bg-[#efeae2] rounded-[40px] border-[8px] border-[#f0f2f5] shadow-2xl overflow-hidden flex flex-col font-sans">
      {/* Header */}
      <div className="bg-[#008069] px-4 py-3 flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#008069] font-bold text-lg">
          T
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-medium text-sm truncate">Tripkopa</h3>
          <p className="text-white/80 text-[11px]">online</p>
        </div>
        <div className="flex gap-4 text-white">
          <Video size={18} />
          <Phone size={18} />
          <MoreVertical size={18} />
        </div>
      </div>

      {/* Chat Area */}
      <div ref={chatAreaRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#efeae2] scrollbar-hide">
        {messages.map((msg, index) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.18, duration: 0.32 }}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`relative shadow-sm ${
                msg.sender === 'user'
                  ? 'max-w-[85%] bg-[#dcf8c6] text-[#111b21] rounded-lg rounded-tr-none px-3 py-2'
                  : msg.type && msg.type !== 'text'
                    ? 'max-w-[92%] bg-white text-[#111b21] rounded-lg rounded-tl-none overflow-hidden border border-[#e9edef]'
                    : 'max-w-[85%] bg-white text-[#111b21] rounded-lg rounded-tl-none px-3 py-2'
              }`}
            >
              {renderMessageContent(msg)}

              <div className={`flex items-center justify-end gap-1 ${msg.type && msg.type !== 'text' ? 'px-3 pb-2' : 'mt-1'}`}>
                <span className="text-[10px] text-[#667781]">{msg.time}</span>
                {msg.sender === 'user' && (
                  msg.status === 'read' ? <CheckCheck size={14} className="text-[#53bdeb]" /> : <Check size={14} className="text-[#8696a0]" />
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-[#f0f2f5] p-2 flex items-center gap-2 shrink-0">
        <div className="flex gap-3 px-2 text-[#54656f]">
          <Smile size={24} />
          <Paperclip size={24} className="rotate-45" />
        </div>
        <div className="flex-1 bg-white rounded-lg px-3 py-2 text-[#8696a0] text-sm">
          Type a message
        </div>
        <div className="w-10 h-10 rounded-full bg-[#008069] flex items-center justify-center text-white">
          <Mic size={20} />
        </div>
      </div>
    </div>
  );
}
