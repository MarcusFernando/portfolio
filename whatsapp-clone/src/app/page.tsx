'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  created_at: string;
  user_name: string;
  text: string;
}

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
}

export default function WhatsAppClone() {
  const [userName, setUserName] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      name: 'Grupo de Orquestração ECO',
      avatar: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=100',
      lastMessage: 'Claude Code: Integrando notas...',
      time: '12:35'
    },
    {
      id: '2',
      name: 'Marcus Fernando',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
      lastMessage: 'Valeu, aproxima o design...',
      time: 'Ontem'
    }
  ]);
  const [selectedChat, setSelectedChat] = useState<Chat>(chats[0]);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', created_at: '12:30', user_name: 'Claude Code', text: 'RAG centralizado instalado com sucesso na VPS.' },
    { id: '2', created_at: '12:32', user_name: 'Antigravity', text: 'Sincronização de catálogo rodando com mock.' },
    { id: '3', created_at: '12:35', user_name: 'Claude Code', text: 'Integrando notas de vídeo finalizado. Próxima etapa ativa.' }
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typingUser]);

  // Simulação de recebimento em tempo real (Supabase Realtime Mock)
  useEffect(() => {
    if (isJoined) {
      const timer = setTimeout(() => {
        setTypingUser('Claude Code');

        const stopTypingTimer = setTimeout(() => {
          setTypingUser('');
          const newMsg: Message = {
            id: String(Date.now()),
            created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            user_name: 'Claude Code',
            text: `Excelente ver você no canal, ${userName}! Vamos para a próxima etapa.`
          };
          setMessages(prev => [...prev, newMsg]);

          // Atualiza última mensagem na sidebar (Desafio do curso)
          setChats(prev => prev.map(c => c.id === '1' ? {
            ...c,
            lastMessage: `Claude Code: ${newMsg.text}`,
            time: newMsg.created_at
          } : c));
        }, 3000);

        return () => clearTimeout(stopTypingTimer);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isJoined, userName]);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      setIsJoined(true);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      const newMsg: Message = {
        id: String(Date.now()),
        created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        user_name: userName,
        text: inputText
      };
      setMessages(prev => [...prev, newMsg]);

      // Atualiza última mensagem na sidebar (Desafio do curso)
      setChats(prev => prev.map(c => c.id === selectedChat.id ? {
        ...c,
        lastMessage: `Você: ${newMsg.text}`,
        time: newMsg.created_at
      } : c));

      setInputText('');
      setShowEmojiPicker(false);
    }
  };

  const handleEmojiClick = (emoji: string) => {
    setInputText(prev => prev + emoji);
  };

  if (!isJoined) {
    return (
      <div className="bg-[#0b141a] text-white min-h-screen flex items-center justify-center font-sans">
        <div className="w-full max-w-md p-8 rounded-lg bg-[#111b21] border border-white/5 shadow-2xl text-center space-y-8">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-16 h-16 bg-[#00a884] rounded-full flex items-center justify-center mb-2">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12.012 2C6.5 2 2.012 6.5 2.012 12c0 2.1.6 4 1.8 5.7L2.212 22l4.5-1.6c1.7.9 3.5 1.5 5.3 1.5 5.5 0 10-4.5 10-10S17.512 2 12.012 2zm.1 17.5c-1.8 0-3.5-.5-5-1.4l-.4-.2-2.7.9.9-2.6-.2-.4c-1-1.6-1.5-3.5-1.5-5.4 0-4.7 3.8-8.5 8.5-8.5s8.5 3.8 8.5 8.5-3.8 8.6-8.5 8.6z"/></svg>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">ECO Chat Web</h1>
            <p className="text-sm text-white/50">Insira seu nome de usuário para entrar no chat em tempo real.</p>
          </div>

          <form onSubmit={handleJoin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/60 mb-2 font-semibold">Seu Nome</label>
              <input
                type="text"
                required
                placeholder="Ex: Marcus Fernando"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full bg-[#202c33] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00a884] text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#00a884] text-black font-bold py-3 rounded-lg hover:bg-[#00c298] transition uppercase tracking-wider text-sm"
            >
              Conectar no Servidor
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0b141a] text-[#e9edef] h-screen font-sans flex items-center justify-center p-0 md:p-4">
      <div className="w-full h-full max-w-[1600px] bg-[#111b21] rounded-none md:rounded-lg overflow-hidden flex shadow-2xl border border-white/5">

        {/* Sidebar */}
        <aside className="w-80 md:w-96 border-r border-[#222e35] flex flex-col h-full bg-[#111b21] flex-shrink-0">
          {/* Sidebar Header */}
          <div className="h-16 bg-[#202c33] px-4 flex justify-between items-center flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#00a884] rounded-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <span className="font-semibold text-sm text-[#e9edef]">{userName}</span>
            </div>
            <div className="flex items-center space-x-3 text-[#aebac1]">
              <button className="p-2 hover:bg-white/5 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
              </button>
            </div>
          </div>

          {/* Chats List */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#222e35]">
            {chats.map(chat => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`flex items-center space-x-3 px-4 py-3 cursor-pointer transition ${selectedChat.id === chat.id ? 'bg-[#2a3942]' : 'hover:bg-[#202c33]'}`}
              >
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <img src={chat.avatar} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-semibold truncate text-[#e9edef]">{chat.name}</h3>
                    <span className="text-xs text-[#8696a0]">{chat.time}</span>
                  </div>
                  <p className="text-xs text-[#8696a0] truncate">{chat.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Chat Area */}
        <main className="flex-1 flex flex-col h-full bg-[#0b141a]">
          {/* Chat Header */}
          <div className="h-16 bg-[#202c33] px-4 flex justify-between items-center flex-shrink-0 border-b border-[#222e35]">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src={selectedChat.avatar} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-[#e9edef]">{selectedChat.name}</h3>
                {typingUser ? (
                  <p className="text-xs text-[#00a884] font-semibold animate-pulse">{typingUser} está digitando...</p>
                ) : (
                  <p className="text-xs text-[#8696a0]">online</p>
                )}
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat bg-opacity-[0.03]">
            {messages.map(msg => {
              const isMe = msg.user_name === userName;
              return (
                <div key={msg.id} className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[65%] rounded-lg px-3 py-1.5 shadow text-sm ${isMe ? 'bg-[#005c4b] text-[#e9edef]' : 'bg-[#202c33] text-[#e9edef]'}`}>
                    {!isMe && <p className="text-xs font-bold text-[#00a884] mb-1">{msg.user_name}</p>}
                    <p className="leading-relaxed break-words">{msg.text}</p>
                    <div className="text-[10px] text-[#8696a0] text-right mt-1">{msg.created_at}</div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <footer className="h-16 bg-[#202c33] px-4 flex items-center space-x-3 flex-shrink-0 relative">
            {/* Emoji Button */}
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-2 text-[#8696a0] hover:text-[#e9edef] rounded-full"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.33 0-4.3 1.45-5.11 3.5h1.08c.72-1.5 2.25-2.5 4.03-2.5s3.31 1 4.03 2.5h1.08c-.81-2.05-2.78-3.5-5.11-3.5z"/></svg>
            </button>

            {/* Emoji Picker Panel (Desafio Concluído) */}
            {showEmojiPicker && (
              <div className="absolute bottom-20 left-4 bg-[#2a3942] border border-white/10 rounded-lg p-3 shadow-2xl flex gap-2 z-50">
                {['😀', '😂', '🔥', '🚀', '💻', '👍', '🙏', '🎉'].map(emoji => (
                  <button
                    key={emoji}
                    onClick={() => handleEmojiClick(emoji)}
                    className="text-2xl hover:scale-125 transition"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="flex-1 flex items-center space-x-3">
              <input
                type="text"
                placeholder="Mensagem"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-[#2a3942] border border-white/5 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-transparent"
              />
              <button
                type="submit"
                className="p-2 bg-[#00a884] text-black hover:bg-[#00c298] rounded-full transition"
              >
                <svg className="w-5 h-5 transform rotate-90" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              </button>
            </form>
          </footer>

        </main>
      </div>
    </div>
  );
}
