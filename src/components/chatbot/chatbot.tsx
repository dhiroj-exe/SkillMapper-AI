'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, User, X, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';
import { chatbot } from '@/ai/flows/chatbot';

type Message = {
  id: string;
  text: string;
  role: 'user' | 'bot';
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), text: input, role: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const botResponse = await chatbot({ query: input, history: messages.map(m => ({role: m.role, text: m.text})) });
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          role: 'bot',
        };
        setMessages(prev => [...prev, botMessage]);
    } catch (error) {
        const errorMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: "Sorry, I'm having trouble connecting. Please try again later.",
            role: 'bot',
          };
        setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };


  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 shadow-lg z-50"
        aria-label="Toggle Chatbot"
      >
        {isOpen ? <X className="w-8 h-8" /> : <Bot className="w-8 h-8" />}
      </Button>
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 h-[450px] z-50 flex flex-col glassmorphism animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-headline flex items-center gap-2">
                <Bot className="text-primary" /> SkillMapper Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0">
            <ScrollArea className="h-full" ref={scrollAreaRef}>
              <div className="p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex items-start gap-3',
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {message.role === 'bot' && <Bot className="w-6 h-6 text-primary flex-shrink-0" />}
                    <div
                      className={cn(
                        'p-3 rounded-lg max-w-[80%]',
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary'
                      )}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                    {message.role === 'user' && <User className="w-6 h-6 text-primary flex-shrink-0" />}
                  </div>
                ))}
                {isLoading && (
                    <div className="flex items-start gap-3 justify-start">
                        <Bot className="w-6 h-6 text-primary flex-shrink-0" />
                        <div className="p-3 rounded-lg bg-secondary">
                            <Loader className="w-5 h-5 animate-spin" />
                        </div>
                    </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-4">
            <form onSubmit={handleSendMessage} className="flex w-full gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
