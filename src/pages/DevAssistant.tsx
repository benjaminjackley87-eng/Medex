import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Send,
  Terminal,
  Database,
  RefreshCw,
  Palette,
  Sparkles,
  Activity,
  Eye,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  MessageSquare,
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
  error?: boolean;
}

const getTimestamp = () => Date.now();

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

  const handleSend = async (messageText?: string) => {
    const activeMsg = messageText || input;
    if (!activeMsg.trim() || isProcessing) return;

    const userMessage = activeMsg.trim();
    if (!messageText) setInput('');

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
          content: 'Sorry, I encountered an error while processing that request.',
          error: true
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
          id: `ecg_${getTimestamp()}`,
          ...msg.data
        };
        await storage.saveECGPattern(pattern);
      } else if (msg.type === 'radiology') {
        const finding: RadiologyFinding = {
          id: `rad_${getTimestamp()}`,
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
      {/* Header */}
      <div className="p-6 border-b border-white/10 flex items-center justify-between bg-slate-950">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-white text-sm font-black uppercase tracking-widest flex items-center gap-1.5">
              Dev Assistant <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            </h2>
            <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest">
              Pipeline Online
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-4 rounded-2xl text-[13px] leading-relaxed relative ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none shadow-md shadow-blue-900/30'
                    : msg.error
                      ? 'bg-red-950/40 text-red-300 border border-red-500/20 rounded-tl-none flex items-start gap-2.5'
                      : 'bg-slate-950/40 text-slate-350 border border-white/10 rounded-tl-none'
                }`}
              >
                {msg.error && <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />}
                <div>{msg.content}</div>

                {/* Proposals and Previews */}
                {msg.data && (
                  <div className="mt-4 p-4 bg-slate-950/60 rounded-2xl border border-white/10 space-y-4 shadow-inner">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-[9px] font-black text-blue-400 uppercase tracking-widest">
                        <Layout className="w-3 h-3" /> Proposal Preview
                      </span>
                      <span className="text-[8px] font-black text-slate-400 px-2 py-0.5 bg-white/5 rounded-md border border-white/5 uppercase">
                        {msg.type}
                      </span>
                    </div>

                    <div className="border-t border-b border-white/5 py-3 space-y-2">
                      <h4 className="font-black text-white text-sm flex items-center gap-2">
                        {msg.type === 'design' ? (
                          <Palette className="w-4 h-4 text-blue-400" />
                        ) : (
                          <MessageSquare className="w-4 h-4 text-indigo-400" />
                        )}
                        {msg.data.name || 'System Recommendation'}
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {msg.data.description || 'Preview parameters compiled successfully.'}
                      </p>
                    </div>

                    {msg.data.imageUrl && (
                      <div className="aspect-video rounded-xl overflow-hidden bg-black/40 border border-white/5 relative group">
                        <img
                          src={msg.data.imageUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-[9px] font-black uppercase text-white flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" /> High-Resolution Link
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-[9px] font-black text-emerald-400 bg-emerald-950/20 border border-emerald-500/10 px-3 py-2 rounded-xl uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Schema Validated</span>
                    </div>

                    {msg.type === 'design' ? (
                      <button
                        onClick={() => handleApplyTheme(idx)}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-950/50"
                      >
                        <Palette className="w-3.5 h-3.5" /> Apply Theme Changes
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSave(idx)}
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/50"
                      >
                        <Database className="w-3.5 h-3.5" /> Commit to Library
                      </button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty State Prompts */}
        {messages.length === 1 && (
          <div className="grid grid-cols-1 gap-3 mt-6">
            <button
              onClick={() => handleSend('Make the theme look more dark and clinical')}
              className="p-4 bg-slate-950/40 hover:bg-slate-950/60 border border-white/5 rounded-2xl text-left transition-all hover:border-blue-500/30 flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-white text-[11px] font-black uppercase tracking-wider">
                    Clinical Theme
                  </p>
                  <p className="text-[10px] text-slate-400">Apply dark-mode clinical styling</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleSend('Add an ECG pattern for Hyperkalemia')}
              className="p-4 bg-slate-950/40 hover:bg-slate-950/60 border border-white/5 rounded-2xl text-left transition-all hover:border-indigo-500/30 flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Activity className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-white text-[11px] font-black uppercase tracking-wider">
                    Hyperkalemia ECG
                  </p>
                  <p className="text-[10px] text-slate-400">Generate and save Hyperkalemia signs</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleSend('Add a radiology finding for Pneumothorax')}
              className="p-4 bg-slate-950/40 hover:bg-slate-950/60 border border-white/5 rounded-2xl text-left transition-all hover:border-emerald-500/30 flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Eye className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-white text-[11px] font-black uppercase tracking-wider">
                    Pneumothorax CXR
                  </p>
                  <p className="text-[10px] text-slate-400">Create pleural line pointers</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-slate-950/40 text-slate-300 p-4 rounded-2xl rounded-tl-none border border-white/5 flex items-center gap-3 shadow-inner">
              <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />
              <span className="text-[11px] font-bold italic flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-450 animate-pulse" /> Consulting medical
                repositories...
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="p-6 border-t border-white/10 bg-slate-950">
        <div className="relative">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Add an ECG for..."
            className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:border-blue-500 outline-none transition-all focus:ring-2 focus:ring-blue-950"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isProcessing}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-500 hover:text-blue-400 disabled:text-slate-400 transition-colors cursor-pointer"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DevAssistant;
