import React from 'react';
import { LayoutDashboard, Home, Building2, Coins, PiggyBank, Bot } from 'lucide-react';

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAssistant: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const tabs = [
    { id: 'dashboard', label: 'Inicio', icon: LayoutDashboard },
    { id: 'vivienda', label: 'Vivienda', icon: Home },
    { id: 'comparador', label: 'Arriendos', icon: Building2 },
    { id: 'gastos', label: 'Gastos', icon: Coins },
    { id: 'ahorro', label: 'Ahorro', icon: PiggyBank },
    { id: 'asistente', label: 'Asistente', icon: Bot },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-[420px] mx-auto z-40 bg-white border-t border-[#E5EAF0] py-2 px-2 flex items-center justify-around shadow-[0_-2px_10px_rgba(15,23,42,0.03)]">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id || (tab.id === 'gastos' && activeTab === 'bebe');
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-2xl transition-all ${
              isActive
                ? 'text-[#2C70B8] scale-105'
                : 'text-slate-500 hover:text-[#2C70B8]'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                isActive
                  ? 'bg-white text-[#2C70B8] shadow-xs border border-[#D0E2F3]'
                  : 'hover:bg-white/60'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5]' : ''}`} />
            </div>
            <span
              className={`text-[10px] mt-0.5 leading-tight tracking-tight ${
                isActive ? 'font-black text-[#2C70B8]' : 'font-semibold text-slate-500'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
