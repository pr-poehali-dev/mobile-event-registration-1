import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const navLinks = [
  { path: '/', label: 'Главная', icon: 'Home' },
  { path: '/events', label: 'Мероприятия', icon: 'Calendar' },
  { path: '/register', label: 'Регистрация', icon: 'UserPlus' },
  { path: '/teams', label: 'Команды', icon: 'Users' },
  { path: '/account', label: 'Кабинет', icon: 'User' },
  { path: '/rules', label: 'Правила', icon: 'BookOpen' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-dark-bg/95 backdrop-blur-md border-b border-dark-border' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 border border-neon-cyan flex items-center justify-center animate-glow-pulse">
              <Icon name="Crosshair" size={16} className="text-neon-cyan" />
            </div>
            <span className="font-rajdhani font-700 text-xl tracking-[0.15em] text-white group-hover:text-neon-cyan transition-colors">
              ARENA<span className="text-neon-cyan">.</span>GG
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 font-rajdhani font-600 text-sm tracking-widest uppercase transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'text-neon-cyan border-b border-neon-cyan'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center border border-dark-border hover:border-neon-cyan transition-colors"
            aria-label="Меню"
          >
            <div className="flex flex-col gap-1.5">
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${open ? 'rotate-45 translate-y-2 text-neon-cyan' : 'text-white'}`} />
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${open ? 'opacity-0' : 'text-white'}`} />
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${open ? '-rotate-45 -translate-y-2 text-neon-cyan' : 'text-white'}`} />
            </div>
          </button>
        </div>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-dark-bg/90 backdrop-blur-lg lg:hidden animate-fade-in"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 bottom-0 z-40 w-72 bg-dark-card border-l border-dark-border lg:hidden transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="pt-20 px-6 pb-8 flex flex-col h-full">
          <div className="text-xs font-rajdhani tracking-[0.3em] text-gray-600 uppercase mb-6">
            Навигация
          </div>
          <nav className="flex flex-col gap-1 flex-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.path}
                to={link.path}
                style={{ animationDelay: `${i * 0.05}s` }}
                className={`flex items-center gap-3 px-4 py-3 font-rajdhani font-600 tracking-widest uppercase text-sm transition-all duration-200 border-l-2 animate-fade-in ${
                  location.pathname === link.path
                    ? 'text-neon-cyan border-l-neon-cyan bg-cyan-500/5'
                    : 'text-gray-400 border-l-transparent hover:text-white hover:border-l-gray-600'
                }`}
              >
                <Icon name={link.icon} fallback="Circle" size={16} />
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="text-xs text-gray-700 font-rajdhani tracking-widest">
            ARENA.GG © 2026
          </div>
        </div>
      </div>
    </>
  );
}