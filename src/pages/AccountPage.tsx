import { useState } from 'react';
import Icon from '@/components/ui/icon';

type Tab = 'login' | 'register';

export default function AccountPage() {
  const [tab, setTab] = useState<Tab>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  if (loggedIn) {
    return (
      <div className="min-h-screen pt-20 pb-16 px-4 max-w-7xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 bg-neon-cyan" />
            <h1 className="font-rajdhani font-700 text-4xl text-white tracking-tight">КАБИНЕТ</h1>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass-card rounded-sm p-6 animate-fade-in md:col-span-1">
            <div className="w-16 h-16 border border-neon-cyan/40 flex items-center justify-center mx-auto mb-4 bg-neon-cyan/10">
              <Icon name="User" size={28} className="text-neon-cyan" />
            </div>
            <h2 className="font-rajdhani font-700 text-xl text-white text-center mb-1">ProGamer_X</h2>
            <p className="text-gray-500 text-center font-roboto text-sm mb-6">@tg_handle</p>
            <div className="flex flex-col gap-2 text-sm font-roboto">
              <div className="flex justify-between border-b border-dark-border pb-2">
                <span className="text-gray-600">Турниров</span>
                <span className="text-white font-600">3</span>
              </div>
              <div className="flex justify-between border-b border-dark-border pb-2">
                <span className="text-gray-600">Команд</span>
                <span className="text-white font-600">1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Статус</span>
                <span className="text-neon-green font-rajdhani font-600 text-xs tracking-wider">АКТИВЕН</span>
              </div>
            </div>
            <button
              onClick={() => setLoggedIn(false)}
              className="mt-6 w-full py-2.5 border border-dark-border text-gray-500 font-rajdhani text-sm tracking-widest uppercase hover:border-red-500/50 hover:text-red-400 transition-colors rounded-sm"
            >
              Выйти
            </button>
          </div>

          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="glass-card rounded-sm p-6 animate-fade-in">
              <h3 className="font-rajdhani font-700 text-lg text-white mb-4 flex items-center gap-2">
                <Icon name="Calendar" size={18} className="text-neon-cyan" />
                Мои регистрации
              </h3>
              <div className="flex flex-col gap-3">
                {[
                  { event: 'PUBG Mobile Championship', team: 'Phoenix Squad', slots: [12, 13, 14], status: 'active' },
                  { event: 'Night Raid Season 4', team: 'Phoenix Squad', slots: [3, 4], status: 'pending' },
                ].map((reg, i) => (
                  <div key={i} className="border border-dark-border rounded-sm p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex-1">
                      <div className="font-rajdhani font-700 text-white text-sm tracking-wide">{reg.event}</div>
                      <div className="text-gray-500 font-roboto text-xs mt-0.5">{reg.team}</div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {reg.slots.map((s) => (
                        <span key={s} className="px-2 py-0.5 bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan font-rajdhani font-700 text-sm rounded-sm">
                          #{s}
                        </span>
                      ))}
                      <span className={`px-2 py-0.5 font-rajdhani text-xs tracking-widest uppercase rounded-sm border ${
                        reg.status === 'active' ? 'border-neon-green/40 text-neon-green' : 'border-yellow-500/40 text-yellow-500'
                      }`}>
                        {reg.status === 'active' ? 'Активна' : 'Ожидает'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-sm p-6 animate-fade-in">
              <h3 className="font-rajdhani font-700 text-lg text-white mb-4 flex items-center gap-2">
                <Icon name="Bell" size={18} className="text-neon-purple" />
                Уведомления
              </h3>
              <div className="flex flex-col gap-2">
                {[
                  { text: 'Регистрация на PUBG Mobile Championship подтверждена', time: '2 часа назад', read: false },
                  { text: 'Открыта регистрация на Arena Cup Spring', time: '1 день назад', read: true },
                ].map((n, i) => (
                  <div key={i} className={`flex items-start gap-3 p-3 rounded-sm border ${n.read ? 'border-dark-border' : 'border-neon-purple/30 bg-neon-purple/5'}`}>
                    {!n.read && <div className="w-2 h-2 bg-neon-purple rounded-full mt-1.5 flex-shrink-0" />}
                    <div>
                      <p className={`font-roboto text-sm ${n.read ? 'text-gray-500' : 'text-gray-300'}`}>{n.text}</p>
                      <p className="text-gray-700 text-xs font-roboto mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 flex items-center justify-center">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 border border-neon-cyan/40 flex items-center justify-center mx-auto mb-4 bg-neon-cyan/10">
            <Icon name="User" size={28} className="text-neon-cyan" />
          </div>
          <h1 className="font-rajdhani font-700 text-3xl text-white tracking-tight">ЛИЧНЫЙ КАБИНЕТ</h1>
          <p className="text-gray-500 font-roboto text-sm mt-1">Войди или создай аккаунт</p>
        </div>

        <div className="glass-card rounded-sm overflow-hidden">
          <div className="flex border-b border-dark-border">
            <button
              onClick={() => setTab('login')}
              className={`flex-1 py-4 font-rajdhani font-700 text-sm tracking-widest uppercase transition-all ${
                tab === 'login' ? 'text-neon-cyan border-b-2 border-neon-cyan' : 'text-gray-500 hover:text-white'
              }`}
            >
              Войти
            </button>
            <button
              onClick={() => setTab('register')}
              className={`flex-1 py-4 font-rajdhani font-700 text-sm tracking-widest uppercase transition-all ${
                tab === 'register' ? 'text-neon-cyan border-b-2 border-neon-cyan' : 'text-gray-500 hover:text-white'
              }`}
            >
              Регистрация
            </button>
          </div>

          <div className="p-6">
            {tab === 'register' && (
              <div className="mb-4">
                <label className="text-xs font-rajdhani tracking-widest text-gray-500 uppercase mb-2 block">
                  Имя пользователя
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ProGamer_X"
                  className="w-full bg-dark-bg border border-dark-border rounded-sm px-4 py-3 text-white font-roboto focus:outline-none focus:border-neon-cyan transition-colors"
                />
              </div>
            )}

            <div className="mb-4">
              <label className="text-xs font-rajdhani tracking-widest text-gray-500 uppercase mb-2 block">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="player@arena.gg"
                className="w-full bg-dark-bg border border-dark-border rounded-sm px-4 py-3 text-white font-roboto focus:outline-none focus:border-neon-cyan transition-colors"
              />
            </div>

            <div className="mb-6">
              <label className="text-xs font-rajdhani tracking-widest text-gray-500 uppercase mb-2 block">
                Пароль
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-dark-bg border border-dark-border rounded-sm px-4 py-3 text-white font-roboto focus:outline-none focus:border-neon-cyan transition-colors"
              />
            </div>

            <button
              onClick={() => setLoggedIn(true)}
              className="w-full neon-btn-filled py-3.5 rounded-sm font-rajdhani font-700 tracking-widest uppercase"
            >
              {tab === 'login' ? 'Войти' : 'Создать аккаунт'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
