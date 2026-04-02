import { useState } from 'react';
import Icon from '@/components/ui/icon';

type Step = 1 | 2 | 3 | 4 | 5;

const mockEvents = [
  { id: 1, title: 'PUBG Mobile Championship', date: '15 апреля 2026', isPaid: true, pricePerSlot: 500 },
  { id: 2, title: 'Night Raid Season 4', date: '20 апреля 2026', isPaid: false, pricePerSlot: 0 },
  { id: 3, title: 'Arena Cup Spring', date: '28 апреля 2026', isPaid: true, pricePerSlot: 1000 },
];

const MAX_MAIN_SLOTS = 5;
const MAX_RESERVE_SLOTS = 1;
const PLAYERS_PER_SLOT = 4;
const MIN_PLAYERS_PER_SLOT = 3;

export default function RegisterPage() {
  const [step, setStep] = useState<Step>(1);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [password, setPassword] = useState('');
  const [teamName, setTeamName] = useState('');
  const [tgHandle, setTgHandle] = useState('');
  const [mainSlots, setMainSlots] = useState(1);
  const [reserveSlots, setReserveSlots] = useState(0);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState(false);
  const [assignedSlots, setAssignedSlots] = useState<number[]>([]);

  const event = mockEvents.find((e) => e.id === selectedEvent);
  const totalCost = event ? (mainSlots + reserveSlots) * event.pricePerSlot : 0;

  const nextStep = () => {
    setError('');
    if (step === 1) {
      if (!selectedEvent) return setError('Выберите мероприятие');
      if (!password) return setError('Введите пароль');
      if (password !== '1234') return setError('Неверный пароль для регистрации');
      setStep(2);
    } else if (step === 2) {
      if (!teamName.trim()) return setError('Введите название команды');
      if (!tgHandle.trim()) return setError('Введите никнейм ТГ представителя');
      setStep(3);
    } else if (step === 3) {
      const total = mainSlots + reserveSlots;
      if (mainSlots < 1) return setError('Минимум 1 основной слот');
      if (mainSlots > MAX_MAIN_SLOTS) return setError(`Максимум ${MAX_MAIN_SLOTS} основных слотов`);
      if (reserveSlots > MAX_RESERVE_SLOTS) return setError(`Максимум ${MAX_RESERVE_SLOTS} слот для запасных`);
      setStep(4);
    } else if (step === 4) {
      if (!agreed) return setError('Необходимо согласиться с правилами');
      if (event?.isPaid) {
        setStep(5);
      } else {
        doRegister();
      }
    }
  };

  const doRegister = () => {
    const startSlot = 12;
    const slots = Array.from({ length: mainSlots + reserveSlots }, (_, i) => startSlot + i);
    setAssignedSlots(slots);
    setRegistered(true);
  };

  if (registered) {
    return (
      <div className="min-h-screen pt-20 pb-16 px-4 flex items-center justify-center">
        <div className="max-w-lg w-full animate-fade-in">
          <div className="glass-card neon-border rounded-sm p-8 text-center mb-6">
            <div className="w-16 h-16 border border-neon-green/50 flex items-center justify-center mx-auto mb-6">
              <Icon name="CheckCircle" size={32} className="text-neon-green" />
            </div>
            <h2 className="font-rajdhani font-700 text-3xl text-white mb-2">РЕГИСТРАЦИЯ ПРИНЯТА</h2>
            <p className="text-gray-400 font-roboto mb-6">Ваша команда успешно зарегистрирована!</p>

            <div className="border border-dark-border rounded-sm overflow-hidden mb-6">
              <div className="bg-neon-cyan/10 border-b border-dark-border px-4 py-3 flex items-center gap-2">
                <Icon name="Shield" size={16} className="text-neon-cyan" />
                <span className="font-rajdhani font-700 text-neon-cyan tracking-widest uppercase">
                  {teamName}
                </span>
              </div>
              <div className="p-4">
                <div className="text-xs font-rajdhani text-gray-600 tracking-widest uppercase mb-3">
                  Ваши слоты в лобби
                </div>
                <div className="flex flex-wrap gap-2">
                  {assignedSlots.map((slot, i) => (
                    <div
                      key={slot}
                      className={`px-3 py-2 rounded-sm text-center min-w-[60px] ${
                        i >= mainSlots
                          ? 'border border-neon-purple/50 bg-neon-purple/10'
                          : 'border border-neon-cyan/50 bg-neon-cyan/10'
                      }`}
                    >
                      <div className={`font-rajdhani font-700 text-lg ${i >= mainSlots ? 'text-neon-purple' : 'text-neon-cyan'}`}>
                        #{slot}
                      </div>
                      <div className="text-xs text-gray-600 font-roboto">
                        {i >= mainSlots ? 'Запасной' : `Слот ${i + 1}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-4 py-3 border-t border-dark-border grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-600 text-xs font-roboto">Команда</span>
                  <div className="text-white font-rajdhani font-600">{teamName}</div>
                </div>
                <div>
                  <span className="text-gray-600 text-xs font-roboto">Представитель</span>
                  <div className="text-white font-rajdhani font-600">@{tgHandle}</div>
                </div>
                <div>
                  <span className="text-gray-600 text-xs font-roboto">Основных слотов</span>
                  <div className="text-neon-cyan font-rajdhani font-600">{mainSlots}</div>
                </div>
                <div>
                  <span className="text-gray-600 text-xs font-roboto">Слотов запасных</span>
                  <div className="text-neon-purple font-rajdhani font-600">{reserveSlots}</div>
                </div>
              </div>
            </div>

            <div className="bg-neon-cyan/5 border border-neon-cyan/20 rounded-sm p-4 text-left">
              <p className="text-neon-cyan text-sm font-rajdhani font-600 mb-1">ВАЖНО!</p>
              <p className="text-gray-400 text-sm font-roboto">
                При старте занимайте ТОЛЬКО свои слоты: {assignedSlots.join(', ')}.
                Занятие чужих слотов ведёт к дисквалификации.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const steps = [
    { n: 1, label: 'Турнир' },
    { n: 2, label: 'Команда' },
    { n: 3, label: 'Слоты' },
    { n: 4, label: 'Правила' },
    { n: 5, label: 'Оплата' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="font-rajdhani font-700 text-4xl text-white tracking-tight mb-1">РЕГИСТРАЦИЯ</h1>
          <p className="text-gray-500 font-roboto">Зарегистрируй свою команду на турнир</p>
        </div>

        <div className="flex gap-1 mb-8">
          {steps.filter(s => !event?.isPaid || s.n <= 5).map((s) => (
            <div key={s.n} className="flex-1">
              <div
                className={`h-1 rounded-full transition-all duration-300 ${
                  step >= s.n ? 'bg-neon-cyan' : 'bg-dark-border'
                }`}
              />
              <div className={`text-xs font-rajdhani tracking-wider mt-1 text-center hidden sm:block ${
                step >= s.n ? 'text-neon-cyan' : 'text-gray-700'
              }`}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-sm p-6 md:p-8 animate-fade-in">
          {step === 1 && (
            <div>
              <h2 className="font-rajdhani font-700 text-2xl text-white mb-6 flex items-center gap-2">
                <Icon name="Calendar" size={20} className="text-neon-cyan" />
                Выбор мероприятия
              </h2>
              <div className="flex flex-col gap-3 mb-6">
                {mockEvents.map((e) => (
                  <button
                    key={e.id}
                    onClick={() => setSelectedEvent(e.id)}
                    className={`p-4 rounded-sm border text-left transition-all ${
                      selectedEvent === e.id
                        ? 'border-neon-cyan bg-neon-cyan/5'
                        : 'border-dark-border hover:border-neon-cyan/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-rajdhani font-700 text-white tracking-wide">{e.title}</div>
                        <div className="text-gray-500 text-sm font-roboto mt-0.5">{e.date}</div>
                      </div>
                      <div className="text-right">
                        {e.isPaid ? (
                          <span className="text-neon-purple font-rajdhani font-600">{e.pricePerSlot} ₽/слот</span>
                        ) : (
                          <span className="text-neon-green font-rajdhani text-sm">Бесплатно</span>
                        )}
                        {selectedEvent === e.id && (
                          <div className="mt-1">
                            <Icon name="CheckCircle" size={16} className="text-neon-cyan ml-auto" />
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div>
                <label className="text-xs font-rajdhani tracking-widest text-gray-500 uppercase mb-2 block">
                  Пароль для входа
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                  className="w-full bg-dark-bg border border-dark-border rounded-sm px-4 py-3 text-white font-roboto focus:outline-none focus:border-neon-cyan transition-colors"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-rajdhani font-700 text-2xl text-white mb-6 flex items-center gap-2">
                <Icon name="Users" size={20} className="text-neon-cyan" />
                Данные команды
              </h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-rajdhani tracking-widest text-gray-500 uppercase mb-2 block">
                    Название команды
                  </label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Введите название команды"
                    className="w-full bg-dark-bg border border-dark-border rounded-sm px-4 py-3 text-white font-roboto focus:outline-none focus:border-neon-cyan transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-rajdhani tracking-widest text-gray-500 uppercase mb-2 block">
                    Никнейм TG представителя
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-roboto">@</span>
                    <input
                      type="text"
                      value={tgHandle}
                      onChange={(e) => setTgHandle(e.target.value.replace('@', ''))}
                      placeholder="username"
                      className="w-full bg-dark-bg border border-dark-border rounded-sm pl-8 pr-4 py-3 text-white font-roboto focus:outline-none focus:border-neon-cyan transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="font-rajdhani font-700 text-2xl text-white mb-2 flex items-center gap-2">
                <Icon name="Grid" size={20} className="text-neon-cyan" />
                Бронирование слотов
              </h2>
              <p className="text-gray-500 text-sm font-roboto mb-6">
                По {PLAYERS_PER_SLOT} участника в слоте. Минимум {MIN_PLAYERS_PER_SLOT} в каждом слоте.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="border border-dark-border rounded-sm p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon name="Users" size={16} className="text-neon-cyan" />
                    <span className="font-rajdhani font-700 text-white tracking-wide">Основные слоты</span>
                  </div>
                  <p className="text-gray-600 text-xs font-roboto mb-3">Макс. {MAX_MAIN_SLOTS} слотов</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setMainSlots(Math.max(1, mainSlots - 1))}
                      className="w-9 h-9 border border-dark-border flex items-center justify-center text-gray-400 hover:border-neon-cyan hover:text-neon-cyan transition-colors rounded-sm"
                    >
                      <Icon name="Minus" size={14} />
                    </button>
                    <span className="font-rajdhani font-700 text-2xl text-neon-cyan w-8 text-center">{mainSlots}</span>
                    <button
                      onClick={() => setMainSlots(Math.min(MAX_MAIN_SLOTS, mainSlots + 1))}
                      className="w-9 h-9 border border-dark-border flex items-center justify-center text-gray-400 hover:border-neon-cyan hover:text-neon-cyan transition-colors rounded-sm"
                    >
                      <Icon name="Plus" size={14} />
                    </button>
                  </div>
                </div>

                <div className="border border-dark-border rounded-sm p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon name="UserCheck" size={16} className="text-neon-purple" />
                    <span className="font-rajdhani font-700 text-white tracking-wide">Запасные</span>
                  </div>
                  <p className="text-gray-600 text-xs font-roboto mb-3">Макс. {MAX_RESERVE_SLOTS} слот, не обязательно</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setReserveSlots(Math.max(0, reserveSlots - 1))}
                      className="w-9 h-9 border border-dark-border flex items-center justify-center text-gray-400 hover:border-neon-purple hover:text-neon-purple transition-colors rounded-sm"
                    >
                      <Icon name="Minus" size={14} />
                    </button>
                    <span className="font-rajdhani font-700 text-2xl text-neon-purple w-8 text-center">{reserveSlots}</span>
                    <button
                      onClick={() => setReserveSlots(Math.min(MAX_RESERVE_SLOTS, reserveSlots + 1))}
                      className="w-9 h-9 border border-dark-border flex items-center justify-center text-gray-400 hover:border-neon-purple hover:text-neon-purple transition-colors rounded-sm"
                    >
                      <Icon name="Plus" size={14} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-dark-bg border border-dark-border rounded-sm p-4">
                <div className="font-rajdhani text-sm text-gray-500 tracking-wider uppercase mb-3">Итого</div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 font-roboto text-sm">Основных слотов × {PLAYERS_PER_SLOT}</span>
                  <span className="text-white font-rajdhani font-600">{mainSlots} × {PLAYERS_PER_SLOT} = {mainSlots * PLAYERS_PER_SLOT} участников</span>
                </div>
                {reserveSlots > 0 && (
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 font-roboto text-sm">Запасных слотов × {PLAYERS_PER_SLOT}</span>
                    <span className="text-neon-purple font-rajdhani font-600">{reserveSlots} × {PLAYERS_PER_SLOT} = до {reserveSlots * PLAYERS_PER_SLOT} запасных</span>
                  </div>
                )}
                {event?.isPaid && (
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-dark-border">
                    <span className="text-gray-400 font-roboto text-sm">Стоимость</span>
                    <span className="text-neon-cyan font-rajdhani font-700 text-xl">{totalCost} ₽</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="font-rajdhani font-700 text-2xl text-white mb-6 flex items-center gap-2">
                <Icon name="BookOpen" size={20} className="text-neon-cyan" />
                Подтверждение
              </h2>

              <div className="bg-dark-bg border border-dark-border rounded-sm p-4 mb-6 text-sm font-roboto text-gray-400 space-y-2 max-h-48 overflow-y-auto">
                <p className="font-rajdhani font-600 text-white text-base">Правила участия:</p>
                <p>1. Каждый участник должен занимать только свой назначенный слот в лобби.</p>
                <p>2. Занятие чужих слотов ведёт к немедленной дисквалификации команды.</p>
                <p>3. При снятии команды с турнира слоты перераспределяются автоматически.</p>
                <p>4. В каждом слоте должно быть минимум 3 участника (не менее 3 из 4).</p>
                <p>5. Запасные участники вступают в игру только при выбывании основного.</p>
                <p>6. Нарушение правил влечёт дисквалификацию без возврата взноса.</p>
                <p>7. Организаторы вправе изменить расписание с уведомлением за 24 часа.</p>
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <div
                  onClick={() => setAgreed(!agreed)}
                  className={`mt-0.5 w-5 h-5 border flex-shrink-0 flex items-center justify-center transition-colors ${
                    agreed ? 'bg-neon-cyan border-neon-cyan' : 'border-dark-border'
                  }`}
                >
                  {agreed && <Icon name="Check" size={12} className="text-dark-bg" />}
                </div>
                <span className="text-gray-400 font-roboto text-sm">
                  Я ознакомился с правилами турнира и согласен с ними
                </span>
              </label>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="font-rajdhani font-700 text-2xl text-white mb-2 flex items-center gap-2">
                <Icon name="CreditCard" size={20} className="text-neon-cyan" />
                Оплата через ЮКасса
              </h2>
              <p className="text-gray-500 text-sm font-roboto mb-6">Безопасная оплата брони слотов</p>

              <div className="bg-dark-bg border border-dark-border rounded-sm p-5 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-500 font-roboto text-sm">{event?.title}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 font-roboto text-sm">Слотов: {mainSlots + reserveSlots}</span>
                  <span className="text-gray-400 font-roboto text-sm">{event?.pricePerSlot} ₽ × {mainSlots + reserveSlots}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-dark-border mt-2">
                  <span className="font-rajdhani font-700 text-white tracking-wide">К ОПЛАТЕ</span>
                  <span className="font-rajdhani font-700 text-2xl neon-text">{totalCost} ₽</span>
                </div>
              </div>

              <div className="border border-neon-cyan/20 rounded-sm p-4 mb-6 flex items-start gap-3 bg-neon-cyan/5">
                <Icon name="Shield" size={18} className="text-neon-cyan mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-neon-cyan font-rajdhani font-600 text-sm mb-1">Безопасная оплата</p>
                  <p className="text-gray-500 text-xs font-roboto">
                    Платёж обрабатывается через ЮКасса. Регистрация подтверждается после успешной оплаты.
                  </p>
                </div>
              </div>

              <button
                onClick={doRegister}
                className="w-full neon-btn-filled py-4 rounded-sm flex items-center justify-center gap-2 text-base"
              >
                <Icon name="CreditCard" size={18} />
                Оплатить {totalCost} ₽ через ЮКасса
              </button>
            </div>
          )}

          {error && (
            <div className="mt-4 flex items-center gap-2 text-red-400 text-sm font-roboto bg-red-500/10 border border-red-500/20 rounded-sm px-4 py-3">
              <Icon name="AlertCircle" size={16} />
              {error}
            </div>
          )}

          <div className="flex gap-3 mt-6">
            {step > 1 && (
              <button
                onClick={() => { setStep((step - 1) as Step); setError(''); }}
                className="neon-btn px-6 py-3 rounded-sm text-sm flex items-center gap-2"
              >
                <Icon name="ChevronLeft" size={16} />
                Назад
              </button>
            )}
            {step < 5 && (
              <button
                onClick={nextStep}
                className={`flex-1 py-3 rounded-sm font-rajdhani font-700 tracking-widest uppercase text-sm flex items-center justify-center gap-2 transition-all ${
                  step === 4 && event?.isPaid ? 'neon-btn-purple' : 'neon-btn-filled'
                }`}
              >
                {step === 4 && event?.isPaid ? 'К оплате' : 'Продолжить'}
                <Icon name="ChevronRight" size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
