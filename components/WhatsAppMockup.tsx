'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCheck, Phone, Video, MoreVertical, Paperclip, Smile, Mic, Send } from 'lucide-react';

type MessageType = 'text' | 'flightOptions' | 'installmentPlan' | 'detailsChecklist' | 'paymentDetails';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  time: string;
  status?: 'sent' | 'delivered' | 'read';
  type?: MessageType;
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

type TimelineMessage = Omit<Message, 'id'>;

const PLACEHOLDER_TEXT = 'Type a message';

const timeline: TimelineMessage[] = [
  {
    text: 'Hi, I want a flight from Lagos to Abuja.',
    sender: 'user',
    time: '10:00 AM',
    status: 'read',
  },
  {
    text: 'Great. Where are you travelling from, when do you want to travel, what time works best, and which class do you prefer?',
    sender: 'bot',
    time: '10:00 AM',
  },
  {
    text: 'I am in Lagos, travelling on May 4. Morning or afternoon is fine, and I want Economy.',
    sender: 'user',
    time: '10:01 AM',
    status: 'read',
  },
  {
    text: 'Here are the best options for your trip.',
    sender: 'bot',
    time: '10:02 AM',
    type: 'flightOptions',
    flightOptions: [
      { airline: 'Air Peace', time: '10:30 AM', date: 'May 4', amount: 'From N102,000', isCheapest: true },
      { airline: 'Ibom Air', time: '12:15 PM', date: 'May 4', amount: 'From N108,500' },
      { airline: 'United Nigeria', time: '1:40 PM', date: 'May 4', amount: 'From N114,000' },
    ],
  },
  {
    text: "I'll take the 10:30 AM flight.",
    sender: 'user',
    time: '10:03 AM',
    status: 'read',
  },
  {
    text: 'Great choice. Pay N40,000 now to secure your seat. The balance can be split across 2 to 4 instalments. Want me to recommend a plan?',
    sender: 'bot',
    time: '10:03 AM',
  },
  {
    text: 'Yes, please recommend one.',
    sender: 'user',
    time: '10:04 AM',
    status: 'read',
  },
  {
    text: 'Recommended plan based on your route:',
    sender: 'bot',
    time: '10:04 AM',
    type: 'installmentPlan',
    installmentPlan: [
      { label: 'First payment', amount: 'N40,000', date: 'Apr 14, 2026' },
      { label: 'Next payment', amount: 'N21,000', date: 'May 14, 2026' },
      { label: 'Next payment', amount: 'N21,000', date: 'Jun 14, 2026' },
      { label: 'Final payment', amount: 'N20,000', date: 'Jul 14, 2026' },
    ],
  },
  {
    text: 'Yes, that works for me.',
    sender: 'user',
    time: '10:05 AM',
    status: 'read',
  },
  {
    text: 'Perfect. Please share these details so I can complete your booking:',
    sender: 'bot',
    time: '10:05 AM',
    type: 'detailsChecklist',
    detailsChecklist: [
      'Full legal name (must match your government ID)',
      'Date of birth',
      'Phone number',
      'Email address',
    ],
  },
  {
    text: 'Done. Details sent.',
    sender: 'user',
    time: '10:06 AM',
    status: 'read',
  },
  {
    text: 'Awesome. Please make your first payment with these details:',
    sender: 'bot',
    time: '10:06 AM',
    type: 'paymentDetails',
    paymentDetails: {
      bank: 'Providus Bank',
      accountNumber: '0123456789',
      accountName: 'Tripkopa Travel Services',
      amount: 'N40,000',
      narration: 'TRPK-LOS-ABV-2471',
      note: 'Initial payment is non-refundable. Use the exact narration.',
    },
  },
  {
    text: 'Payment sent.',
    sender: 'user',
    time: '10:07 AM',
    status: 'read',
  },
  {
    text: "Payment received. You're all set. Your flight is secured.",
    sender: 'bot',
    time: '10:08 AM',
  },
  {
    text: 'Your booking reference and full ticket details will be shared as your installments are completed.',
    sender: 'bot',
    time: '10:08 AM',
  },
];

export function WhatsAppMockup() {
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const composerAreaRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [composerText, setComposerText] = useState(PLACEHOLDER_TEXT);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);

  useEffect(() => {
    const chatArea = chatAreaRef.current;
    if (!chatArea) return;

    chatArea.scrollTo({ top: chatArea.scrollHeight, behavior: 'smooth' });
  }, [messages, isBotTyping]);

  useEffect(() => {
    if (!composerAreaRef.current) return;
    composerAreaRef.current.scrollTop = composerAreaRef.current.scrollHeight;
  }, [composerText]);

  useEffect(() => {
    let cancelled = false;
    const timeoutIds: number[] = [];

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = window.setTimeout(resolve, ms);
        timeoutIds.push(id);
      });

    const typeInComposer = async (text: string) => {
      setIsUserTyping(true);
      setComposerText('');

      for (const character of text) {
        if (cancelled) return;

        setComposerText((prev) => prev + character);
        await wait(16 + Math.random() * 24);
      }

      await wait(180);
      setIsUserTyping(false);
    };

    const playConversationLoop = async () => {
      let cycle = 0;

      while (!cancelled) {
        setMessages([]);
        setComposerText(PLACEHOLDER_TEXT);
        setIsUserTyping(false);
        setIsBotTyping(false);

        if (chatAreaRef.current) {
          chatAreaRef.current.scrollTop = 0;
        }

        await wait(700);

        let messageIndex = 0;

        for (const event of timeline) {
          if (cancelled) return;

          const nextMessage: Message = {
            ...event,
            id: `${cycle}-${messageIndex}`,
          };

          messageIndex += 1;

          if (event.sender === 'user') {
            await typeInComposer(event.text);
            if (cancelled) return;

            setMessages((prev) => [...prev, nextMessage]);
            setComposerText(PLACEHOLDER_TEXT);
            await wait(380);
          } else {
            setIsBotTyping(true);
            await wait(680 + Math.min(event.text.length * 12, 1300));

            if (cancelled) return;

            setIsBotTyping(false);
            setMessages((prev) => [...prev, nextMessage]);
            await wait(500);
          }
        }

        await wait(2300);
        cycle += 1;
      }
    };

    playConversationLoop();

    return () => {
      cancelled = true;
      timeoutIds.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const renderMessageContent = (msg: Message) => {
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
                    <p className="text-[11px] text-[#667781]">
                      {option.time} • {option.date}
                    </p>
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
        </div>
      );
    }

    if (msg.type === 'detailsChecklist' && msg.detailsChecklist) {
      return (
        <div className="px-3 py-3 space-y-2">
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{msg.text}</p>
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
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{msg.text}</p>
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
              <span className="text-[10px] uppercase text-[#667781]">Amount</span>
              <span className="text-[12px] font-bold text-[#008069]">{msg.paymentDetails.amount}</span>
            </div>
            <div className="pt-1 border-t border-[#c9dbd2]">
              <span className="text-[10px] uppercase text-[#667781]">Narration</span>
              <p className="text-[12px] font-bold text-[#1f2d36] tracking-wide break-all">{msg.paymentDetails.narration}</p>
            </div>
          </div>
          <p className="text-[11px] text-[#8a2d2d] bg-[#fff0f0] border border-[#ffd7d7] rounded-md px-2 py-1.5">
            {msg.paymentDetails.note}
          </p>
        </div>
      );
    }

    return <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{msg.text}</p>;
  };

  return (
    <div className="relative w-full max-w-[390px] h-[660px] bg-[#efeae2] rounded-[40px] border-[8px] border-[#f0f2f5] shadow-2xl overflow-hidden flex flex-col font-sans">
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

      <div ref={chatAreaRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#efeae2] scrollbar-hide">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.28 }}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`relative shadow-sm ${
                msg.sender === 'user'
                  ? 'max-w-[85%] bg-[#dcf8c6] text-[#111b21] rounded-lg rounded-tr-none px-3 py-2 break-words'
                  : msg.type && msg.type !== 'text'
                    ? 'max-w-[92%] bg-white text-[#111b21] rounded-lg rounded-tl-none overflow-hidden border border-[#e9edef]'
                    : 'max-w-[85%] bg-white text-[#111b21] rounded-lg rounded-tl-none px-3 py-2 break-words'
              }`}
            >
              {renderMessageContent(msg)}

              <div className={`flex items-center justify-end gap-1 ${msg.type && msg.type !== 'text' ? 'px-3 pb-2' : 'mt-1'}`}>
                <span className="text-[10px] text-[#667781]">{msg.time}</span>
                {msg.sender === 'user' && msg.status === 'read' && <CheckCheck size={14} className="text-[#53bdeb]" />}
              </div>
            </div>
          </motion.div>
        ))}

        {isBotTyping && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex justify-start"
          >
            <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 border border-[#e9edef] shadow-sm">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#8696a0] rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-[#8696a0] rounded-full animate-bounce [animation-delay:120ms]" />
                <span className="w-1.5 h-1.5 bg-[#8696a0] rounded-full animate-bounce [animation-delay:240ms]" />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="bg-[#f0f2f5] p-2 flex items-center gap-2 shrink-0">
        <div className="flex gap-3 px-2 text-[#54656f]">
          <Smile size={22} />
          <Paperclip size={22} className="rotate-45" />
        </div>
        <div ref={composerAreaRef} className="flex-1 bg-white rounded-lg px-3 py-2 text-sm min-h-10 max-h-[78px] overflow-y-auto">
          {isUserTyping ? (
            <div className="text-[#1f2d36] whitespace-pre-wrap break-words leading-snug">
              <span>{composerText}</span>
              <span className="ml-1 inline-block h-4 w-px align-middle bg-[#1f2d36] animate-pulse" />
            </div>
          ) : (
            <span className="text-[#8696a0] leading-6">{PLACEHOLDER_TEXT}</span>
          )}
        </div>
        <div className="w-10 h-10 rounded-full bg-[#008069] flex items-center justify-center text-white">
          {isUserTyping ? <Send size={18} /> : <Mic size={20} />}
        </div>
      </div>
    </div>
  );
}
