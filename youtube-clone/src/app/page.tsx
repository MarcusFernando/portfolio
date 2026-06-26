'use client';

import React, { useState } from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext';

// Mock de vídeos para o Portfólio do Marcus
const MOCK_VIDEOS = [
  {
    id: 1,
    title: 'Orquestrando Multiagentes locais na prática com Git Worktrees',
    channel: 'ECO Lab',
    views: '15K visualizações',
    date: 'há 2 dias',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 2,
    title: 'Como faturar R$ 62k/mês com Canais Faceless e Inteligência Artificial',
    channel: 'ECO Lab',
    views: '8.4K visualizações',
    date: 'há 1 semana',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 3,
    title: 'Batman: O Cavaleiro das Trevas - Trailer Oficial Estreia',
    channel: 'Gotham Globe',
    views: '142M visualizações',
    date: 'há 3 semanas',
    thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=600',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 4,
    title: 'A jornada do leitor: Como ler de forma inteligente e estratégica',
    channel: 'ECO Lab',
    views: '2.1K visualizações',
    date: 'há 5 dias',
    thumbnail: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=600',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'
  }
];

function YouTubeApp() {
  const { user, isLogged, login, logout, signup } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  // States de Formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      signup(name, email);
    } else {
      login(email, 'Marcus Fernando');
    }
    setShowAuthModal(false);
    // Limpa campos
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <div className="bg-[#0f0f0f] text-white min-h-screen font-sans flex flex-col">

      {/* Top Header */}
      <header className="fixed top-0 left-0 w-full h-14 bg-[#0f0f0f] flex items-center justify-between px-4 z-40 border-b border-white/5">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-white/10 rounded-full hidden sm:block">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
          <div className="flex items-center space-x-1">
            <span className="text-xl font-bold tracking-tighter flex items-center font-mono">
              <span className="bg-red-600 px-1.5 py-0.5 rounded text-xs mr-1 text-black font-extrabold">ECO</span>
              Tube
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-[600px] mx-4 flex items-center">
          <div className="w-full flex items-center bg-[#121212] border border-white/10 rounded-l-full px-4 py-1.5 focus-within:border-blue-500">
            <input
              type="text"
              placeholder="Pesquisar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-sm text-white"
            />
          </div>
          <button className="bg-white/5 border-y border-r border-white/10 px-6 py-[7.5px] rounded-r-full hover:bg-white/10">
            <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </button>
        </div>

        {/* User Section */}
        <div className="relative flex items-center space-x-2">
          {isLogged ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-8 h-8 rounded-full overflow-hidden border border-white/20 focus:outline-none focus:border-white"
              >
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" alt="Avatar" className="w-full h-full object-cover" />
              </button>

              {/* Dropdown Menu (Desafio Concluído) */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#212121] border border-white/10 rounded-lg shadow-xl py-2 z-50 text-sm">
                  <div className="px-4 py-2.5 border-b border-white/5">
                    <p className="font-semibold text-white">{user?.name}</p>
                    <p className="text-xs text-white/50 truncate">{user?.email}</p>
                  </div>
                  <a href="#" className="block px-4 py-2 hover:bg-white/5 text-white/80">Meu Canal</a>
                  <a href="#" className="block px-4 py-2 hover:bg-white/5 text-white/80">Configurações</a>
                  <button
                    onClick={() => { logout(); setIsDropdownOpen(false); }}
                    className="w-full text-left block px-4 py-2 hover:bg-white/5 text-red-400 font-semibold border-t border-white/5 mt-1"
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => { setIsSignUp(false); setShowAuthModal(true); }}
              className="flex items-center space-x-2 border border-blue-500/30 text-blue-400 text-sm font-semibold px-3 py-1.5 rounded-full hover:bg-blue-500/10 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              <span>Fazer Login</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex pt-14">

        {/* Sidebar Navigation */}
        <aside className="w-60 bg-[#0f0f0f] hidden md:block px-2 py-4 border-r border-white/5 space-y-1">
          <a href="#" className="flex items-center space-x-5 px-4 py-2 hover:bg-white/10 rounded-lg bg-white/5 font-semibold">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
            <span>Início</span>
          </a>
          <a href="#" className="flex items-center space-x-5 px-4 py-2 hover:bg-white/10 rounded-lg text-white/70">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
            <span>Shorts</span>
          </a>
          <a href="#" className="flex items-center space-x-5 px-4 py-2 hover:bg-white/10 rounded-lg text-white/70">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
            <span>Inscrições</span>
          </a>
        </aside>

        {/* Main Video Feed */}
        <main className="flex-1 bg-[#0f0f0f] px-6 py-8 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-[1600px] mx-auto">
            {MOCK_VIDEOS.map((video) => (
              <div key={video.id} className="flex flex-col group cursor-pointer space-y-2">
                {/* Thumbnail */}
                <div className="aspect-video w-full rounded-xl overflow-hidden bg-white/5 relative">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                </div>
                {/* Details */}
                <div className="flex space-x-3 px-1">
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                    <img src={video.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  {/* Text */}
                  <div className="flex-1 flex flex-col min-w-0">
                    <h3 className="text-sm font-semibold line-clamp-2 text-white/90 leading-tight mb-1">{video.title}</h3>
                    <p className="text-xs text-white/50 font-semibold">{video.channel}</p>
                    <p className="text-xs text-white/50">{video.views} &bull; {video.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Auth Modal (Desafio Concluído) */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#212121] border border-white/10 rounded-xl p-8 max-w-sm w-full relative">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <h2 className="text-2xl font-bold tracking-tight text-center mb-6">
              {isSignUp ? 'Criar Nova Conta' : 'Fazer Login no ECOTube'}
            </h2>
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-xs text-white/60 mb-1">Nome</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#121212] border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm"
                  />
                </div>
              )}
              <div>
                <label className="block text-xs text-white/60 mb-1">E-mail</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#121212] border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-white/60 mb-1">Senha</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#121212] border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm"
                />
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded font-semibold text-sm hover:bg-blue-600 transition">
                {isSignUp ? 'Cadastrar' : 'Entrar'}
              </button>
            </form>
            <div className="mt-6 text-center text-xs text-white/40">
              {isSignUp ? (
                <p>Já possui conta? <button onClick={() => setIsSignUp(false)} className="text-blue-400 hover:underline">Faça login</button></p>
              ) : (
                <p>Novo por aqui? <button onClick={() => setIsSignUp(true)} className="text-blue-400 hover:underline">Cadastre-se</button></p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <AuthProvider>
      <YouTubeApp />
    </AuthProvider>
  );
}
