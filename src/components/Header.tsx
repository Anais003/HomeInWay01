import React from 'react';
import { Logo } from './Logo';
import { useFinancial } from '../context/FinancialContext';
import { RotateCcw, Smartphone, Monitor, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobilePreview: boolean;
  setIsMobilePreview: (val: boolean) => void;
  onOpenAssistant: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isMobilePreview,
  setIsMobilePreview,
  onOpenAssistant,
}) => {
  const { userName, resetToCamilaDefaults } = useFinancial();

  const navItems = [
    { id: 'dashboard', label: 'Inicio' },
    { id: 'vivienda', label: 'Vivienda' },
    { id: 'comparador', label: 'Comparador' },
    { id: 'gastos', label: 'Gastos' },
    { id: 'ahorro', label: 'Meta y Pie' },
    { id: 'hogar', label: 'Mi Hogar' },
  ];

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-8 px-5 lg:px-8 py-3.5 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Zone 1: Single Brand wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => setActiveTab('dashboard')}
          className="text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bci-blue rounded-md"
        >
          <Logo size="md" />
        </button>
      </div>

      {/* Zone 2: Clean single-line text navigation links */}
      <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === item.id
                ? 'text-bci-blue font-bold border-b-2 border-bci-blue'
                : 'hover:text-slate-900'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Zone 3: Primary action + view switchers */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Device preview toggle (simulates mobile/desktop presentation) */}
        <button
          onClick={() => setIsMobilePreview(!isMobilePreview)}
          title={isMobilePreview ? 'Cambiar a vista escritorio' : 'Ver en formato móvil'}
          className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
            isMobilePreview
              ? 'bg-blue-50 border-blue-200 text-bci-blue'
              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
          }`}
        >
          {isMobilePreview ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
          <span>{isMobilePreview ? 'Vista Desktop' : 'Modo Móvil'}</span>
        </button>

        {/* Reset Demo button */}
        <button
          onClick={() => {
            if (confirm('¿Restablecer los datos de Camila a los valores iniciales de demostración?')) {
              resetToCamilaDefaults();
            }
          }}
          title="Restablecer datos demo de Camila"
          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* AI Assistant Quick Trigger */}
        <button
          onClick={onOpenAssistant}
          className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold text-white bg-bci-blue hover:bg-[#235b96] rounded-lg shadow-xs transition-colors shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-bci-yellow fill-bci-yellow" />
          <span>Asistente IA</span>
        </button>

        {/* User profile avatar */}
        <button
          onClick={() => setActiveTab('hogar')}
          className="flex items-center gap-2 pl-2 border-l border-slate-200"
          title="Ver perfil de hogar"
        >
          <div className="w-8 h-8 rounded-full bg-blue-100 text-bci-blue font-bold text-xs flex items-center justify-center border border-blue-200">
            {userName.substring(0, 2).toUpperCase()}
          </div>
          <span className="hidden md:inline text-xs font-semibold text-slate-800">
            {userName}
          </span>
        </button>
      </div>
    </header>
  );
};
