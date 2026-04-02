import { useState } from 'react';
import Icon from '@/components/ui/icon';

const mockTeams = [
  {
    id: 1,
    name: 'Phoenix Squad',
    tg: 'phoenix_lead',
    event: 'PUBG Mobile Championship',
    slots: [12, 13, 14],
    reserveSlots: [],
    players: [
      ['ProSniper_X', 'FasterBullet', 'NightOwl99', 'GhostWalker'],
      ['IronFist22', 'CyberWolf', 'ShadowBlade', 'RedFalcon'],
      ['DarkKnight', 'StormRider', 'ArcLight', 'VoidRunner'],
    ],
    reservePlayers: [],
  },
  {
    id: 2,
    name: 'Shadow Wolves',
    tg: 'wolves_captain',
    event: 'PUBG Mobile Championship',
    slots: [15, 16],
    reserveSlots: [17],
    players: [
      ['WolfAlpha', 'SilentHunter', 'MoonClaw', 'DarkFang'],
      ['NightShade', 'FrostBite', 'ColdSteel', 'IcePick'],
    ],
    reservePlayers: [['SpareOne', 'SpareTwo', 'SpareThree', null]],
  },
  {
    id: 3,
    name: 'Neon Reapers',
    tg: 'neon_lead',
    event: 'Night Raid Season 4',
    slots: [1, 2, 3, 4],
    reserveSlots: [],
    players: [
      ['NeonGhost', 'CyberReap', 'PixelKill', 'CodeBreak'],
      ['DataVoid', 'ByteHunt', 'BitSlayer', 'FrameDrop'],
      ['RenderKill', 'CacheCrash', 'StackSmash', 'HeapHunter'],
      ['ThreadKill', 'SyncBlast', 'AsyncRush', 'LoopBreak'],
    ],
    reservePlayers: [],
  },
];

export default function TeamsPage() {
  const [expandedTeam, setExpandedTeam] = useState<number | null>(null);
  const [filterEvent, setFilterEvent] = useState('all');

  const events = ['all', ...Array.from(new Set(mockTeams.map((t) => t.event)))];
  const filtered = filterEvent === 'all' ? mockTeams : mockTeams.filter((t) => t.event === filterEvent);

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 max-w-7xl mx-auto">
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-8 bg-neon-purple" />
          <h1 className="font-rajdhani font-700 text-4xl md:text-5xl text-white tracking-tight">
            КОМАНДЫ
          </h1>
        </div>
        <p className="text-gray-500 font-roboto ml-4">Все зарегистрированные команды и их слоты</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
        {events.map((ev) => (
          <button
            key={ev}
            onClick={() => setFilterEvent(ev)}
            className={`px-4 py-2 font-rajdhani text-sm tracking-widest uppercase transition-all rounded-sm whitespace-nowrap ${
              filterEvent === ev
                ? 'bg-neon-purple text-white font-700'
                : 'border border-dark-border text-gray-400 hover:border-neon-purple/50 hover:text-white'
            }`}
          >
            {ev === 'all' ? 'Все турниры' : ev}
          </button>
        ))}
      </div>

      <div className="mb-4 flex items-center justify-between">
        <span className="text-gray-600 font-rajdhani tracking-widest text-sm uppercase">
          {filtered.length} команд
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {filtered.map((team, i) => (
          <div
            key={team.id}
            style={{ animationDelay: `${i * 0.07}s` }}
            className="glass-card rounded-sm animate-fade-in"
          >
            <button
              onClick={() => setExpandedTeam(expandedTeam === team.id ? null : team.id)}
              className="w-full p-5 flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-neon-purple/40 flex items-center justify-center bg-neon-purple/10 rounded-sm">
                  <Icon name="Shield" size={18} className="text-neon-purple" />
                </div>
                <div>
                  <div className="font-rajdhani font-700 text-lg text-white tracking-wide">{team.name}</div>
                  <div className="text-gray-500 text-xs font-roboto flex items-center gap-1 mt-0.5">
                    <Icon name="Send" size={10} />
                    @{team.tg}
                    <span className="mx-2 text-gray-700">·</span>
                    {team.event}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex gap-1.5">
                  {team.slots.map((slot) => (
                    <span
                      key={slot}
                      className="px-2 py-1 bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan font-rajdhani font-700 text-sm rounded-sm"
                    >
                      #{slot}
                    </span>
                  ))}
                  {team.reserveSlots.map((slot) => (
                    <span
                      key={slot}
                      className="px-2 py-1 bg-neon-purple/10 border border-neon-purple/30 text-neon-purple font-rajdhani font-700 text-sm rounded-sm"
                    >
                      #{slot}
                    </span>
                  ))}
                </div>
                <Icon
                  name="ChevronDown"
                  size={18}
                  className={`text-gray-500 transition-transform duration-200 ${expandedTeam === team.id ? 'rotate-180' : ''}`}
                />
              </div>
            </button>

            {expandedTeam === team.id && (
              <div className="border-t border-dark-border p-5 animate-fade-in">
                <div className="sm:hidden flex flex-wrap gap-1.5 mb-4">
                  {team.slots.map((slot) => (
                    <span
                      key={slot}
                      className="px-2 py-1 bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan font-rajdhani font-700 text-sm rounded-sm"
                    >
                      Слот #{slot}
                    </span>
                  ))}
                  {team.reserveSlots.map((slot) => (
                    <span
                      key={slot}
                      className="px-2 py-1 bg-neon-purple/10 border border-neon-purple/30 text-neon-purple font-rajdhani font-700 text-sm rounded-sm"
                    >
                      Запасной #{slot}
                    </span>
                  ))}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm font-roboto">
                    <thead>
                      <tr className="border-b border-dark-border">
                        <th className="text-left pb-3 pr-4 text-gray-600 font-rajdhani tracking-widest uppercase text-xs w-20">Слот</th>
                        {[1, 2, 3, 4].map((n) => (
                          <th key={n} className="text-left pb-3 pr-4 text-gray-600 font-rajdhani tracking-widest uppercase text-xs">
                            Игрок {n}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {team.players.map((players, idx) => (
                        <tr key={idx} className="border-b border-dark-border/50 last:border-0">
                          <td className="py-3 pr-4">
                            <span className="font-rajdhani font-700 text-neon-cyan">#{team.slots[idx]}</span>
                          </td>
                          {players.map((player, pi) => (
                            <td key={pi} className="py-3 pr-4 text-gray-300">{player}</td>
                          ))}
                        </tr>
                      ))}
                      {team.reservePlayers.map((players, idx) => (
                        <tr key={`r${idx}`} className="border-b border-dark-border/50 last:border-0 bg-neon-purple/5">
                          <td className="py-3 pr-4">
                            <span className="font-rajdhani font-700 text-neon-purple">#{team.reserveSlots[idx]}</span>
                            <div className="text-gray-600 text-xs">Запасной</div>
                          </td>
                          {players.map((player, pi) => (
                            <td key={pi} className="py-3 pr-4 text-gray-500 italic">
                              {player ?? <span className="text-gray-700">—</span>}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-600">
          <Icon name="Users" size={48} className="mx-auto mb-4 opacity-20" />
          <p className="font-rajdhani text-xl tracking-wide">Команды не найдены</p>
        </div>
      )}
    </div>
  );
}
