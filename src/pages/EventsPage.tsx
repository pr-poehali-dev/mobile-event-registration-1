import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const mockEvents = [
  {
    id: 1,
    title: 'PUBG Mobile Championship',
    date: '15 апреля 2026',
    time: '20:00 МСК',
    map: 'Erangel',
    slots: 25,
    slotsLeft: 8,
    isPaid: true,
    pricePerSlot: 500,
    status: 'open',
    password: '****',
  },
  {
    id: 2,
    title: 'Night Raid Season 4',
    date: '20 апреля 2026',
    time: '21:00 МСК',
    map: 'Miramar',
    slots: 25,
    slotsLeft: 15,
    isPaid: false,
    pricePerSlot: 0,
    status: 'open',
    password: '****',
  },
  {
    id: 3,
    title: 'Arena Cup Spring',
    date: '28 апреля 2026',
    time: '19:00 МСК',
    map: 'Sanhok',
    slots: 25,
    slotsLeft: 25,
    isPaid: true,
    pricePerSlot: 1000,
    status: 'open',
    password: '****',
  },
  {
    id: 4,
    title: 'Pro League Qualifier',
    date: '5 мая 2026',
    time: '18:00 МСК',
    map: 'Vikendi',
    slots: 25,
    slotsLeft: 0,
    isPaid: true,
    pricePerSlot: 2000,
    status: 'closed',
    password: '****',
  },
];

const statusColors: Record<string, string> = {
  open: 'text-neon-green border-neon-green/40',
  closed: 'text-gray-500 border-gray-700',
};

const statusLabels: Record<string, string> = {
  open: 'Регистрация открыта',
  closed: 'Регистрация закрыта',
};

export default function EventsPage() {
  const [filter, setFilter] = useState<'all' | 'open' | 'paid' | 'free'>('all');

  const filtered = mockEvents.filter((e) => {
    if (filter === 'open') return e.status === 'open';
    if (filter === 'paid') return e.isPaid;
    if (filter === 'free') return !e.isPaid;
    return true;
  });

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 max-w-7xl mx-auto">
      <div className="mb-10 animate-fade-in">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-8 bg-neon-cyan" />
          <h1 className="font-rajdhani font-700 text-4xl md:text-5xl text-white tracking-tight">
            МЕРОПРИЯТИЯ
          </h1>
        </div>
        <p className="text-gray-500 font-roboto ml-4">Выбери турнир и зарегистрируй свою команду</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {[
          { key: 'all', label: 'Все' },
          { key: 'open', label: 'Открытые' },
          { key: 'paid', label: 'Платные' },
          { key: 'free', label: 'Бесплатные' },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key as typeof filter)}
            className={`px-4 py-2 font-rajdhani text-sm tracking-widest uppercase transition-all rounded-sm ${
              filter === f.key
                ? 'bg-neon-cyan text-dark-bg font-700'
                : 'border border-dark-border text-gray-400 hover:border-neon-cyan/50 hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((event, i) => (
          <div
            key={event.id}
            style={{ animationDelay: `${i * 0.08}s` }}
            className="glass-card rounded-sm p-6 animate-fade-in"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-rajdhani font-700 text-xl text-white tracking-wide mb-1">
                  {event.title}
                </h3>
                <span className={`text-xs font-rajdhani tracking-widest uppercase border px-2 py-0.5 rounded-sm ${statusColors[event.status]}`}>
                  {statusLabels[event.status]}
                </span>
              </div>
              {event.isPaid && (
                <div className="text-right">
                  <div className="font-rajdhani font-700 text-lg neon-text-purple">{event.pricePerSlot} ₽</div>
                  <div className="text-gray-600 text-xs">за слот</div>
                </div>
              )}
              {!event.isPaid && (
                <span className="font-rajdhani text-sm neon-text-green border border-neon-green/30 px-2 py-0.5 rounded-sm">
                  БЕСПЛАТНО
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Icon name="Calendar" size={14} className="text-neon-cyan" />
                <span className="font-roboto">{event.date}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Icon name="Clock" size={14} className="text-neon-cyan" />
                <span className="font-roboto">{event.time}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Icon name="Map" size={14} className="text-neon-cyan" />
                <span className="font-roboto">{event.map}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Icon name="Users" size={14} className="text-neon-cyan" />
                <span className="font-roboto">
                  {event.slotsLeft > 0 ? `${event.slotsLeft} / ${event.slots} слотов` : 'Слотов нет'}
                </span>
              </div>
            </div>

            <div className="mb-5">
              <div className="flex justify-between text-xs font-rajdhani text-gray-600 mb-1">
                <span>ЗАНЯТО</span>
                <span>{event.slots - event.slotsLeft} / {event.slots}</span>
              </div>
              <div className="h-1 bg-dark-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple transition-all duration-500"
                  style={{ width: `${((event.slots - event.slotsLeft) / event.slots) * 100}%` }}
                />
              </div>
            </div>

            <Link
              to={event.status === 'open' ? `/register?event=${event.id}` : '#'}
              className={`w-full py-3 font-rajdhani font-700 tracking-widest uppercase text-sm rounded-sm flex items-center justify-center gap-2 transition-all ${
                event.status === 'open' && event.slotsLeft > 0
                  ? 'neon-btn-filled'
                  : 'bg-dark-border text-gray-600 cursor-not-allowed'
              }`}
            >
              {event.status === 'open' && event.slotsLeft > 0 ? (
                <>
                  <Icon name="UserPlus" size={16} />
                  Зарегистрироваться
                </>
              ) : (
                <>
                  <Icon name="Lock" size={16} />
                  Закрыто
                </>
              )}
            </Link>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-600">
          <Icon name="SearchX" size={48} className="mx-auto mb-4 opacity-30" />
          <p className="font-rajdhani text-xl tracking-wide">Мероприятия не найдены</p>
        </div>
      )}
    </div>
  );
}
