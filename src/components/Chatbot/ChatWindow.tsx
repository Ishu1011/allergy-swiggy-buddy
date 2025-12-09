import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatDishResults from './ChatDishResults';
import DishActionModal from './DishActionModal';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
  dishes?: any[];
}

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const API_BASE = 'http://localhost:8000';

const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      content: "Hey there! 🍕 I'm your food buddy! Ask me about any dish and I'll help you find the perfect meal. What are you craving today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDish, setSelectedDish] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/chatbot/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.content }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: data.reply || "I couldn't find anything. Try a different query!",
        dishes: data.dishes,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          content: "Oops! Something went wrong. Please try again later. 😅",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/40 backdrop-blur-sm z-[80] transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Chat Window */}
      <div
        className={cn(
          'fixed bottom-20 right-4 left-4 sm:left-auto sm:w-[380px] h-[70vh] max-h-[600px] z-[90] flex flex-col rounded-2xl overflow-hidden transition-all duration-300 swiggy-shadow',
          isOpen
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
        )}
      >
        {/* Animated Food Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-orange-600/90" />
          <div className="absolute inset-0 opacity-20">
            {/* Floating food emojis animation */}
            <div className="animate-float-slow absolute top-10 left-10 text-4xl">🍕</div>
            <div className="animate-float-medium absolute top-20 right-8 text-3xl">🍔</div>
            <div className="animate-float-fast absolute bottom-32 left-8 text-4xl">🌮</div>
            <div className="animate-float-slow absolute bottom-40 right-12 text-3xl">🍜</div>
            <div className="animate-float-medium absolute top-40 left-1/2 text-3xl">🍣</div>
            <div className="animate-float-fast absolute bottom-60 left-20 text-2xl">🥗</div>
          </div>
        </div>

        {/* Header */}
        <div className="relative flex items-center justify-between p-4 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-2xl">
              🤖
            </div>
            <div>
              <h3 className="font-bold text-white">FoodBot</h3>
              <p className="text-xs text-white/70">Your smart food assistant</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Messages */}
        <div className="relative flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((msg) => (
            <div key={msg.id}>
              <ChatMessage role={msg.role} content={msg.content} />
              {msg.dishes && msg.dishes.length > 0 && (
                <ChatDishResults
                  dishes={msg.dishes}
                  onDishClick={(dish) => setSelectedDish(dish)}
                />
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-white/70">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="relative p-3 border-t border-white/20 bg-black/10 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about any food..."
              className="flex-1 px-4 py-2.5 rounded-full bg-white/20 text-white placeholder:text-white/50 outline-none focus:bg-white/30 transition-colors text-sm"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Dish Action Modal */}
      <DishActionModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
    </>
  );
};

export default ChatWindow;
