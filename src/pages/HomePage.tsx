import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const stats = [
  { label: 'Команд зарегистрировано', value: '1,240+', icon: 'Users' },
  { label: 'Турниров проведено', value: '87', icon: 'Trophy' },
  { label: 'Участников всего', value: '12,000+', icon: 'Gamepad2' },
  { label: 'Призовой фонд', value: '500K ₽', icon: 'Coins' },
];

const features = [
  { icon: 'Calendar', title: 'Мероприятия', desc: 'Открытые и закрытые турниры с бронированием слотов', link: '/events' },
  { icon: 'UserPlus', title: 'Регистрация', desc: 'Быстрая регистрация команды за 2 минуты', link: '/register' },
  { icon: 'Users', title: 'Команды', desc: 'Все зарегистрированные команды и их слоты', link: '/teams' },
  { icon: 'CreditCard', title: 'Оплата', desc: 'Безопасная оплата через ЮКасса', link: '/register' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute top-20 right-10 w-1 h-32 bg-gradient-to-b from-neon-cyan/60 to-transparent" />
          <div className="absolute bottom-20 left-10 w-1 h-24 bg-gradient-to-t from-neon-purple/60 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-neon-cyan/30 bg-neon-cyan/5 rounded-sm mb-8">
            <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
            <span className="font-rajdhani text-sm tracking-[0.2em] text-neon-cyan uppercase">Регистрация открыта</span>
          </div>

          <h1 className="font-rajdhani font-700 text-5xl sm:text-7xl md:text-8xl text-white mb-4 leading-none tracking-tight">
            ДОБРО
            <br />
            <span className="neon-text">ПОЖАЛОВАТЬ</span>
            <br />
            В ARENA
          </h1>

          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 font-roboto leading-relaxed">
            Платформа для организации и участия в киберспортивных турнирах.
            Бронируй слоты, собирай команду, побеждай.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/events"
              className="neon-btn-filled px-8 py-4 text-base rounded-sm font-rajdhani font-700 tracking-widest uppercase inline-flex items-center justify-center gap-2"
            >
              <Icon name="Calendar" size={18} />
              Выбрать турнир
            </Link>
            <Link
              to="/register"
              className="neon-btn px-8 py-4 text-base rounded-sm inline-flex items-center justify-center gap-2"
            >
              <Icon name="UserPlus" size={18} />
              Зарегистрировать команду
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600">
          <span className="font-rajdhani text-xs tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-0.5 h-8 bg-gradient-to-b from-gray-600 to-transparent" />
        </div>
      </section>

      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{ animationDelay: `${i * 0.1}s` }}
              className="glass-card p-6 rounded-sm text-center animate-fade-in"
            >
              <Icon name={stat.icon} size={24} className="text-neon-cyan mx-auto mb-3" />
              <div className="font-rajdhani font-700 text-2xl md:text-3xl neon-text mb-1">{stat.value}</div>
              <div className="text-gray-500 text-xs font-roboto">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-rajdhani font-700 text-4xl md:text-5xl text-white mb-3">
            КАК ЭТО <span className="neon-text">РАБОТАЕТ</span>
          </h2>
          <p className="text-gray-500 font-roboto">Всё просто — выбирай турнир и регистрируй команду</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <Link
              key={i}
              to={f.link}
              style={{ animationDelay: `${i * 0.1}s` }}
              className="glass-card p-6 rounded-sm group animate-fade-in block"
            >
              <div className="w-12 h-12 border border-neon-cyan/30 flex items-center justify-center mb-4 group-hover:border-neon-cyan transition-colors">
                <Icon name={f.icon} size={22} className="text-neon-cyan" />
              </div>
              <h3 className="font-rajdhani font-700 text-lg text-white mb-2 tracking-wide">{f.title}</h3>
              <p className="text-gray-500 text-sm font-roboto leading-relaxed">{f.desc}</p>
              <div className="flex items-center gap-1 mt-4 text-neon-cyan text-xs font-rajdhani tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                Подробнее <Icon name="ArrowRight" size={12} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto glass-card neon-border rounded-sm p-8 md:p-12 text-center scan-line">
          <h2 className="font-rajdhani font-700 text-3xl md:text-4xl text-white mb-4">
            ГОТОВ К <span className="neon-text-purple">БИТВЕ</span>?
          </h2>
          <p className="text-gray-400 font-roboto mb-8 text-lg">
            Зарегистрируй свою команду прямо сейчас и займи свой слот в истории
          </p>
          <Link
            to="/register"
            className="neon-btn-filled px-10 py-4 text-base rounded-sm font-rajdhani font-700 tracking-widest uppercase inline-flex items-center gap-2"
          >
            <Icon name="Zap" size={18} />
            Начать регистрацию
          </Link>
        </div>
      </section>
    </div>
  );
}
