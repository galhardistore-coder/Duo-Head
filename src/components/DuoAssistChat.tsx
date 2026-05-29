import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  Send, 
  X, 
  ChevronDown, 
  MessageCircle, 
  HelpCircle,
  Sparkles,
  RefreshCw,
  User
} from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

interface DuoAssistChatProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappLink: string;
}

const PREDEFINED_QUESTIONS = [
  "O DUO Head acompanha lâminas?",
  "É compatível com Mach3 e Fusion 5?",
  "Qual o preço dos kits e o frete?",
  "Consigo raspar a nuca sozinho?",
  "O produto é elétrico?"
];

export default function DuoAssistChat({ isOpen, onClose, whatsappLink }: DuoAssistChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'model', 
      text: 'Olá! Sou o **DuoAssist** 🤖, especialista oficial em IA da **DUO Head**.\n\nEstou aqui para tirar suas dúvidas sobre o suporte duplo. Pode perguntar sobre compatibilidade, preços, como funciona e muito mais! Como posso te ajudar hoje?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isOpen]);

  const handleSend = async (messageText: string) => {
    if (!messageText.trim() || isGenerating) return;

    const userMessage = messageText.trim();
    setInput('');
    
    // Add user message to state
    const updatedMessages = [...messages, { role: 'user' as const, text: userMessage }];
    setMessages(updatedMessages);
    setIsGenerating(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          // Limit history to last 6 messages to keep tokens optimal
          history: updatedMessages.slice(1, -1).map(m => ({
            role: m.role,
            text: m.text
          }))
        }),
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: data.text || 'Desculpe, não consegui processar a resposta neste momento.' 
      }]);
    } catch (error) {
      console.error('Error connecting to DuoAssist server:', error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: 'Desculpe, estou com dificuldades para me conectar ao servidor agora. Se preferir uma resposta rápida, você pode conversar diretamente com o nosso suporte oficial no WhatsApp!' 
      }]);
    } finally {
      setIsGenerating(false);
    }
  };

  // Safe markdown style renderer for simple bold formatting
  const renderMessageContent = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return (
      <span className="whitespace-pre-line leading-relaxed text-sm sm:text-base">
        {parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={i} className="font-extrabold text-br-blue dark:text-white">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        })}
      </span>
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend(input);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay background for mobile users to focus on conversation */}
          <div 
            className="fixed inset-0 bg-black/25 backdrop-blur-xs z-[99] md:hidden"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:w-[410px] h-[550px] max-h-[85vh] bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(11,19,43,0.3)] border border-gray-150 flex flex-col z-[100] overflow-hidden"
          >
            {/* Header section with brand theme */}
            <div className="bg-br-blue text-white px-5 py-4 pb-5 flex items-center justify-between relative overflow-hidden">
              {/* Subtle background glow effect */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-br-green/10 rounded-full blur-xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-br-yellow/10 rounded-full blur-xl pointer-events-none" />

              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-linear-to-tr from-br-green to-br-blue border border-br-yellow/40 flex items-center justify-center shadow-md">
                    <Bot size={22} className="text-br-yellow animate-pulse" />
                  </div>
                  {/* Pulsating green dot indicating online availability */}
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#25D366] rounded-full border-2 border-br-blue flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-black text-sm md:text-base tracking-tight uppercase">DuoAssist IA</h3>
                    <Sparkles size={13} className="text-br-yellow fill-current" />
                  </div>
                  <span className="text-xs text-br-green font-bold">Assistente do DUO Head</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/85 hover:text-white transition-all cursor-pointer"
                  title="Fechar Chat"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Conversation Area */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 bg-gray-50/50 space-y-4"
              style={{ contentVisibility: 'auto' }}
            >
              {messages.map((msg, index) => {
                const isUser = msg.role === 'user';
                return (
                  <div 
                    key={index} 
                    className={`flex items-start gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isUser && (
                      <div className="w-8 h-8 rounded-full bg-br-blue flex-shrink-0 flex items-center justify-center text-br-yellow border border-br-yellow/20 text-xs font-bold">
                        D
                      </div>
                    )}
                    <div 
                      className={`max-w-[80%] rounded-[1.5rem] px-4 py-3 shadow-xs ${
                        isUser 
                          ? 'bg-br-green text-white rounded-tr-none font-medium' 
                          : 'bg-white border border-gray-150/70 text-br-blue/90 rounded-tl-none font-normal'
                      }`}
                    >
                      {isUser ? (
                        <p className="text-sm sm:text-base leading-relaxed">{msg.text}</p>
                      ) : (
                        renderMessageContent(msg.text)
                      )}
                    </div>
                    {isUser && (
                      <div className="w-8 h-8 rounded-full bg-br-green flex-shrink-0 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                        <User size={14} />
                      </div>
                    )}
                  </div>
                );
              })}

              {isGenerating && (
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-br-blue flex-shrink-0 flex items-center justify-center text-br-yellow border border-br-yellow/20">
                    <Bot size={15} />
                  </div>
                  <div className="bg-white border border-gray-100 rounded-[1.5rem] rounded-tl-none px-4 py-3.5 flex items-center gap-1 shadow-xs">
                    <div className="w-2.5 h-2.5 bg-br-green rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2.5 h-2.5 bg-br-yellow rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2.5 h-2.5 bg-br-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions scrollable panel */}
            <div className="px-3 py-2 bg-white border-t border-gray-100 flex gap-2 items-center overflow-x-auto no-scrollbar scroll-smooth">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Perguntas:</span>
              {PREDEFINED_QUESTIONS.map((question, i) => (
                <button
                  key={i}
                  disabled={isGenerating}
                  onClick={() => handleSend(question)}
                  className="bg-gray-50 hover:bg-br-green/5 border border-gray-200 hover:border-br-green/30 text-br-blue/80 hover:text-br-green text-xs font-bold py-1.5 px-3 rounded-full whitespace-nowrap transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  {question}
                </button>
              ))}
            </div>

            {/* User Message Input Form */}
            <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-2">
              <input
                type="text"
                placeholder="Digite sua dúvida aqui..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={isGenerating}
                className="flex-1 bg-gray-50 border border-gray-200 focus:border-br-green hover:border-gray-350 rounded-full px-4 py-2.5 text-sm font-medium text-br-blue outline-none transition-all placeholder-gray-400 disabled:opacity-75"
              />
              <button
                onClick={() => handleSend(input)}
                disabled={!input.trim() || isGenerating}
                className="w-10 h-10 rounded-full bg-br-blue hover:bg-[#121c3a] text-br-yellow flex items-center justify-center transition-all cursor-pointer disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
                title="Enviar Mensagem"
              >
                <Send size={16} />
              </button>
            </div>

            {/* Chatbot WhatsApp footer escalation option */}
            <div className="bg-gray-50 px-4 py-2 text-center border-t border-gray-100 flex items-center justify-center gap-1 text-[11px] font-bold text-br-blue/70">
              Precisa de ajuda humana? 
              <a 
                href={whatsappLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#25D366] hover:underline flex items-center gap-0.5 font-extrabold"
              >
                Chame no WhatsApp 🚀
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
