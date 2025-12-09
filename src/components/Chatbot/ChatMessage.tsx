import React from 'react';
import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  role: 'user' | 'bot';
  content: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ role, content }) => {
  const isBot = role === 'bot';

  return (
    <div className={cn('flex gap-2 mb-3', isBot ? 'justify-start' : 'justify-end')}>
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-primary" />
        </div>
      )}
      
      <div
        className={cn(
          'max-w-[80%] px-4 py-2.5 rounded-2xl text-sm',
          isBot
            ? 'bg-card/90 backdrop-blur-sm text-foreground rounded-tl-md'
            : 'bg-primary text-primary-foreground rounded-tr-md'
        )}
      >
        {content}
      </div>

      {!isBot && (
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-primary-foreground" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
