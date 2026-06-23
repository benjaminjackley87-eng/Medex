import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  X,
  Send,
  Terminal,
  Database,
  Activity,
  Eye,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  MessageSquare,
  Palette,
  Layout
} from 'lucide-react';
import { GeminiService } from '../services/geminiService';
import { storage } from '../services/storageService';
import { ECGPattern, RadiologyFinding, AppTheme } from '../types';
import { useAppStore } from '../store/useAppStore';

interface DevAssistantProps {
  onClose?: () => void;
  currentTheme?: AppTheme;
  onUpdateTheme?: (theme: AppTheme) => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  type?: 'ecg' | 'radiology' | 'design' | 'general';
  data?: any;
}

export const DevAssistant: React.FC<DevAssistantProps> = (props) => {
  const navigate = useNavigate();
  const store = useAppStore();
  const onClose = props.onClose ?? (() => navigate(-1));
  const currentTheme = props.currentTheme ?? store.theme;
  const onUpdateTheme = props.onUpdateTheme ?? ((t: AppTheme) => store.setTheme(t));
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Dev Mode Active. I can help you expand content or update the app\'s look. Try "Make the app look more clinical" or "Add an ECG for Hyperkalemia".'
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const gemini = useMemo(() => new GeminiService(), []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsProcessing(true);

    try {
      const lowerMsg = userMessage.toLowerCase();

      // Design/Look intent
      if (
        lowerMsg.includes('look') ||
        lowerMsg.includes('theme') ||
        lowerMsg.includes('color') ||
        lowerMsg.includes('layout') ||
        lowerMsg.includes('design')
      ) {
        const result = await gemini.generateDesignAdvice(userMessage, currentTheme);
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: result.advice,
            type: 'design',
            data: result.theme
          }
        ]);
      }
      // ECG intent
      else if (lowerMsg.includes('ecg') || lowerMsg.includes('electrocardiogram')) {
        const patternName = userMessage.replace(/add|ecg|pattern|for|an/gi, '').trim();
        const data = await gemini.generateECGPattern(patternName);
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: `I've generated a profile for ${data.name}. Would you like to save it to the library?`,
            type: 'ecg',
            data
          }
        ]);
      }
      // Radiology intent
      else if (
        lowerMsg.includes('radiology') ||
        lowerMsg.includes('imaging') ||
        lowerMsg.includes('cxr') ||
        lowerMsg.includes('ct') ||
        lowerMsg.includes('mri')
      ) {
        const findingName = userMessage
          .replace(/add|radiology|finding|for|an|imaging/gi, '')
          .trim();
        const data = await gemini.generateRadiologyFinding(findingName);
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: `I've generated a radiology profile for ${data.name}. Would you like to save it to the library?`,
            type: 'radiology',
            data
          }
        ]);
      }
      // General
      else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content:
              "I can help with content (ECG/Radiology) or design (Theme/Layout). Try 'Add an ECG for Brugada' or 'Make the theme more dark and professional'."
          }
        ]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error while processing that request.'
        }
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApplyTheme = (msgIndex: number) => {
    const msg = messages[msgIndex];
    if (!msg.data) return;

    const newTheme = { ...currentTheme, ...msg.data };
    onUpdateTheme(newTheme);

    setMessages((prev) => {
      const newMsgs = [...prev];
      newMsgs[msgIndex] = {
        ...msg,
        content: `Theme updated successfully! How does the new look feel?`,
        data: null
      };
      return newMsgs;
    });
  };

  const handleSave = async (msgIndex: number) => {
    const msg = messages[msgIndex];
    if (!msg.data) return;

    try {
      if (msg.type === 'ecg') {
        const pattern: ECGPattern = {
          id: `ecg_${Date.now()}`,
          ...msg.data
        };
        await storage.saveECGPattern(pattern);
      } else if (msg.type === 'radiology') {
        const finding: RadiologyFinding = {
          id: `rad_${Date.now()}`,
          ...msg.data
        };
        await storage.saveRadiologyFinding(finding);
      }

      setMessages((prev) => {
        const newMsgs = [...prev];
        newMsgs[msgIndex] = {
          ...msg,
          content: `Successfully saved ${msg.data.name} to the library!`,
          data: null
        };
        return newMsgs;
      });
    } catch (error) {
      console.error(error);
      alert('Failed to save to library.');
    }
  };

  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      className="fixed top-0 right-0 w-96 h-full bg-slate-900 shadow-2xl z-[1000] flex flex-col border-l border-white/10"
    >
      <div className="p-6 border-b border-white/10 flex items-center justify-between bg-slate-950">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-white text-sm font-black uppercase tracking-widest">
              Dev Assistant
            </h2>
            <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest">
              Content Pipeline Active
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-slate-950/40/10 rounded-lg text-white/40 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] p-4 rounded-2xl text-[13px] leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-slate-950/40/5 text-slate-300 border border-white/10 rounded-tl-none'
              }`}
            >
              {msg.content}

              {msg.data && (
                <div className="mt-4 p-3 bg-slate-950/40/5 rounded-xl border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
                      Preview Data
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      {msg.type?.toUpperCase()}
                    </span>
                  </div>
                  <h4 className="font-black text-white">{msg.data.name}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{msg.data.description}</p>

                  {msg.data.imageUrl && (
                    <div className="aspect-video rounded-lg overflow-hidden bg-black/40 border border-white/5">
                      <img
                        src={msg.data.imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}

                  {msg.type === 'design' ? (
                    <button
                      onClick={() => handleApplyTheme(idx)}
                      className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                    >
                      <Palette className="w-3 h-3" /> Apply Theme Changes
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSave(idx)}
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                    >
                      <Database className="w-3 h-3" /> Commit to Library
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-slate-950/40/5 text-slate-300 p-4 rounded-2xl rounded-tl-none border border-white/10 flex items-center gap-3">
              <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />
              <span className="text-[11px] font-bold italic">
                Consulting medical repositories...
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-white/10 bg-slate-950">
        <div className="relative">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Add an ECG for..."
            className="w-full bg-slate-950/40/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:border-blue-500 outline-none transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isProcessing}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-500 hover:text-blue-400 disabled:text-slate-400 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DevAssistant;
