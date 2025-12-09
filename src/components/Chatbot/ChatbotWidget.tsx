import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import ChatWindow from './ChatWindow';
import { cn } from '@/lib/utils';

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-20 right-4 z-[70] w-14 h-14 rounded-full primary-gradient flex items-center justify-center swiggy-shadow transition-all duration-300 hover:scale-110 active:scale-95',
          isOpen && 'opacity-0 pointer-events-none scale-75'
        )}
      >
        <MessageCircle className="w-6 h-6 text-white" />
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
      </button>

      {/* Chat Window */}
      <ChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default ChatbotWidget;
