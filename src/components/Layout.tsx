import { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      <main>{children}</main>
      <footer className="border-t border-dark-border py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-700 text-xs font-rajdhani tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <span className="text-neon-cyan font-700">ARENA.GG</span>
            <span>— Киберспортивная платформа</span>
          </div>
          <span>© 2026 Все права защищены</span>
        </div>
      </footer>
    </div>
  );
}
