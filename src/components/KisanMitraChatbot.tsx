import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ChatMessage } from '../types';
import { Bot, Send, User, Sparkles, Sprout, CornerDownLeft, RefreshCw } from 'lucide-react';

export const KisanMitraChatbot: React.FC = () => {
  const { user, token, language, t } = useAuth();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-0',
      sender: 'bot',
      text:
        language === 'te'
          ? `నమస్కారం ${user?.full_name || 'రైతన్న'}! నేను మీ వృక్ష AI కిసాన్ మిత్ర (Kisan Mitra) సహాయకుడిని. మీ పంటల సంరక్షణ, ఎరువుల షెడ్యూల్, చీడపీడల నివారణ లేదా ప్రభుత్వ పథకాలపై ఏదైనా సందేహం ఉంటే అడగండి.`
          : `Namaste ${user?.full_name || 'Farmer'}! I am your VRUKSHA AI Kisan Mitra farming companion. Ask me any agronomy question regarding crop protection, fertilizer schedules, APMC market trends, or government schemes.`,
      timestamp: 'Just now'
    }
  ]);

  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isSending) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsSending(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: textToSend })
      });
      const data = await res.json();

      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: data.reply || 'I am processing your query. Please check soil and weather advisories.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text:
          language === 'te'
            ? 'క్షమించండి, సర్వర్ అనుసంధానంలో చిన్న సమస్య ఏర్పడింది. దయచేసి కాసేపటి తర్వాత మళ్లీ ప్రయత్నించండి.'
            : 'Apologies, temporary network delay. Please verify your query or check back shortly.',
        timestamp: 'Just now'
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsSending(false);
    }
  };

  const sampleChips = [
    { en: 'How to control leaf curl in chilli?', te: 'మిర్చిలో బొబ్బర నివారణ ఎలా?' },
    { en: 'Best fertilizer split dose for paddy?', te: 'వరిలో రెండో దఫా యూరియా ఎప్పుడు వేయాలి?' },
    { en: 'How to prepare organic Jeevamrutham?', te: 'జీవామృతం తయారీ విధానం తెలపండి' },
    { en: 'Drip fertigation tips for cotton', te: 'పత్తిలో డ్రిప్ ద్వారా ఎరువుల యాజమాన్యం' }
  ];

  return (
    <div className="min-h-screen bg-[#071d15] text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-4">
        
        {/* Header */}
        <div className="pb-3 border-b border-emerald-900/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center text-white shadow-md">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                {t.chatHeader}
              </h1>
              <p className="text-xs text-slate-300">
                {t.chatSubtitle}
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-600/40 text-emerald-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Online Agronomist</span>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap gap-2 text-xs">
          {sampleChips.map((chip, i) => (
            <button
              key={i}
              onClick={() => handleSend(language === 'te' ? chip.te : chip.en)}
              className="px-3 py-1.5 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-800/50 text-emerald-300 text-xs transition-colors text-left"
            >
              {language === 'te' ? chip.te : chip.en}
            </button>
          ))}
        </div>

        {/* Chat Conversation Box */}
        <div className="rounded-3xl bg-[#092b1f]/85 border border-emerald-600/30 backdrop-blur-md shadow-2xl p-4 sm:p-6 flex flex-col h-[520px]">
          
          {/* Scrollable Messages Area */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0 mt-1">
                    <Sprout className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-xs leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-tr-none shadow-md'
                      : 'bg-[#062117] border border-emerald-800/50 text-slate-100 rounded-tl-none shadow'
                  }`}
                >
                  <p>{msg.text}</p>
                  <div
                    className={`text-[9px] mt-1.5 ${
                      msg.sender === 'user' ? 'text-emerald-200 text-right' : 'text-slate-400 text-left'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-700/60 text-emerald-300 flex items-center justify-center shrink-0 mt-1 font-bold text-xs">
                    {user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
              </div>
            ))}

            {isSending && (
              <div className="flex gap-3 items-center text-xs text-emerald-300 animate-pulse">
                <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                </div>
                <span>{language === 'te' ? 'కిసాన్ మిత్ర సమాధానం సిద్ధం చేస్తోంది...' : 'Kisan Mitra is formulating agronomy advice...'}</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="pt-4 border-t border-emerald-900/60 mt-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.chatPlaceholder}
                className="flex-1 px-4 py-3 rounded-xl bg-emerald-950/70 border border-emerald-700/60 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-emerald-400"
              />
              <button
                type="submit"
                disabled={!input.trim() || isSending}
                className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs shadow transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                <span>{t.btnSend}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};
