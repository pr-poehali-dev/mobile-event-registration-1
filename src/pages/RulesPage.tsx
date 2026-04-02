import Icon from '@/components/ui/icon';

const sections = [
  {
    icon: 'Users',
    title: 'Состав команды',
    color: 'neon-cyan',
    borderClass: 'border-neon-cyan/30',
    items: [
      'Каждая команда бронирует от 1 до 5 основных слотов по 4 участника',
      'Дополнительно можно забронировать 1 слот для запасных участников (до 4 человек)',
      'В каждом активном слоте должно быть не менее 3 участников',
      'Слот с 2 и менее участниками не принимается к регистрации',
      'Запасные не обязательны, но не могут превышать 4 человек',
    ],
  },
  {
    icon: 'Hash',
    title: 'Слоты в лобби',
    color: 'neon-purple',
    borderClass: 'border-neon-purple/30',
    items: [
      'При регистрации команде автоматически присваиваются номера слотов',
      'Нумерация начинается с конца доступного диапазона',
      'При отмене регистрации команды слоты освобождаются и другие команды сдвигаются к началу',
      'Необходимо занимать ТОЛЬКО свои назначенные слоты при старте лобби',
      'Занятие чужого слота ведёт к немедленной дисквалификации',
    ],
  },
  {
    icon: 'CreditCard',
    title: 'Оплата',
    color: 'neon-green',
    borderClass: 'border-neon-green/30',
    items: [
      'Оплата производится через сервис ЮКасса',
      'Стоимость за слот указывается при создании мероприятия организатором',
      'Регистрация подтверждается только после успешного платежа',
      'В случае отмены мероприятия организатором — возврат полной суммы',
      'При самостоятельном снятии команды — оплата не возвращается',
    ],
  },
  {
    icon: 'AlertTriangle',
    title: 'Дисквалификация',
    color: 'neon-orange',
    borderClass: 'border-orange-500/30',
    items: [
      'Нарушение правил занятия слотов в лобби',
      'Использование запрещённого ПО (читов, макросов)',
      'Неспортивное поведение по отношению к другим участникам',
      'Предоставление ложных данных при регистрации',
      'Намеренный срыв игрового процесса',
    ],
  },
  {
    icon: 'Shield',
    title: 'Ответственность организатора',
    color: 'neon-cyan',
    borderClass: 'border-neon-cyan/20',
    items: [
      'Организатор вправе изменить расписание с уведомлением за 24 часа',
      'При технических проблемах матч переносится, а не отменяется',
      'Решение судей по спорным ситуациям является окончательным',
      'Организатор не несёт ответственности за технические проблемы на стороне участника',
    ],
  },
];

export default function RulesPage() {
  return (
    <div className="min-h-screen pt-20 pb-16 px-4 max-w-4xl mx-auto">
      <div className="mb-10 animate-fade-in">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-8 bg-neon-green" />
          <h1 className="font-rajdhani font-700 text-4xl md:text-5xl text-white tracking-tight">
            ПРАВИЛА
          </h1>
        </div>
        <p className="text-gray-500 font-roboto ml-4">Ознакомься перед участием — незнание не освобождает от ответственности</p>
      </div>

      <div className="glass-card neon-border rounded-sm p-5 mb-8 flex items-start gap-4 animate-fade-in">
        <Icon name="Info" size={22} className="text-neon-cyan mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-rajdhani font-700 text-white mb-1 tracking-wide">Обязательно к прочтению</p>
          <p className="text-gray-400 font-roboto text-sm leading-relaxed">
            Регистрируясь на турнир, вы автоматически соглашаетесь со всеми правилами ниже.
            Незнание правил не освобождает от ответственности.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {sections.map((section, i) => (
          <div
            key={i}
            style={{ animationDelay: `${i * 0.08}s` }}
            className={`glass-card rounded-sm border ${section.borderClass} p-6 animate-fade-in`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 border ${section.borderClass} flex items-center justify-center`}>
                <Icon name={section.icon} size={18} className={`text-${section.color}`} />
              </div>
              <h2 className={`font-rajdhani font-700 text-xl text-white tracking-wide`}>{section.title}</h2>
              <span className={`font-rajdhani text-xs tracking-widest text-${section.color} ml-auto hidden sm:block`}>
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            <ul className="flex flex-col gap-2">
              {section.items.map((item, j) => (
                <li key={j} className="flex items-start gap-3 text-gray-400 font-roboto text-sm leading-relaxed">
                  <Icon name="ChevronRight" size={14} className={`text-${section.color} mt-0.5 flex-shrink-0`} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <p className="text-gray-600 font-roboto text-sm">
          Версия правил: 1.0 · Обновлено: апрель 2026
        </p>
      </div>
    </div>
  );
}
