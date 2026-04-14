'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Check, CheckCheck, Send, Phone, Video, MoreVertical, Paperclip, Smile, Mic } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  time: string;
  status?: 'sent' | 'delivered' | 'read';
  type?: 'text' | 'card';
  cardData?: {
    title: string;
    subtitle: string;
    price: string;
    installments: string;
    image?: string;
  };
}

const messages: Message[] = [
  {
    id: '1',
    text: "Hi Tripkopa! I need a flight from Lagos to Abuja for April 15th - 22nd.",
    sender: 'user',
    time: '10:00 AM',
    status: 'read',
  },
  {
    id: '2',
    text: "Hello! Searching for Lagos (LOS) to Abuja (ABV) flights for those dates... ✈️",
    sender: 'bot',
    time: '10:00 AM',
  },
  {
    id: '3',
    text: "Would you prefer Economy or Business class?",
    sender: 'bot',
    time: '10:01 AM',
  },
  {
    id: '4',
    text: "Economy class.",
    sender: 'user',
    time: '10:01 AM',
    status: 'read',
  },
  {
    id: '5',
    text: "I found an Air Peace flight departing at 8:30 AM and returning at 4:15 PM. Does this work?",
    sender: 'bot',
    time: '10:02 AM',
  },
  {
    id: '6',
    text: "Yes, that's perfect!",
    sender: 'user',
    time: '10:02 AM',
    status: 'read',
  },
  {
    id: '7',
    text: "",
    sender: 'bot',
    time: '10:03 AM',
    type: 'card',
    cardData: {
      title: "Air Peace • LOS → ABV",
      subtitle: "Apr 15 - Apr 22 • Economy",
      price: "₦90,000",
      installments: "₦22,500 x 4 months",
    }
  },
  {
    id: '8',
    text: "Excellent! Click the link below to pay your first installment of ₦22,500 and confirm your booking instantly. ✅",
    sender: 'bot',
    time: '10:03 AM',
  }
];

export function WhatsAppMockup() {
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
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#efeae2] scrollbar-hide">
        {messages.map((msg, index) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.4, duration: 0.4 }}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-lg px-3 py-2 relative shadow-sm ${
                msg.sender === 'user' 
                  ? 'bg-[#dcf8c6] text-[#111b21] rounded-tr-none' 
                  : 'bg-white text-[#111b21] rounded-tl-none'
              }`}
            >
              {msg.type === 'card' && msg.cardData ? (
                <div className="space-y-3 py-1">
                   <div className="bg-[#f8f9fa] rounded p-3 border border-[#e9edef]">
                      <p className="text-[10px] text-[#008069] font-mono uppercase tracking-wider mb-1">Recommended</p>
                      <h4 className="font-semibold text-sm">{msg.cardData.title}</h4>
                      <p className="text-xs text-[#667781]">{msg.cardData.subtitle}</p>
                      <div className="mt-3 pt-3 border-t border-[#e9edef] flex justify-between items-end">
                        <div>
                          <p className="text-[10px] text-[#667781] uppercase">Total</p>
                          <p className="font-bold text-sm">{msg.cardData.price}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-[#008069] uppercase font-bold">Installments</p>
                          <p className="font-bold text-sm text-[#008069]">{msg.cardData.installments}</p>
                        </div>
                      </div>
                   </div>
                   <button 
                     onClick={() => toast.info('Tripkopa is launching soon!', {
                       description: 'We are putting the final touches on your favorite travel payment system.',
                     })}
                     className="w-full py-2 bg-[#008069] hover:bg-[#006e5a] text-white rounded font-semibold text-xs transition-colors"
                   >
                     Select Flight
                   </button>
                </div>
              ) : (
                <p className="text-sm leading-relaxed">{msg.text}</p>
              )}
              
              <div className="flex items-center justify-end gap-1 mt-1">
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
