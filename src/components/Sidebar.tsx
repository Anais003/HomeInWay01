import React from 'react';
import {
  LayoutDashboard,
  Home,
  Building2,
  Baby,
  PiggyBank,
  Calculator,
  Bot,
  Users,
  ClipboardList,
  Sparkles,
} from 'lucide-react';
import { useFinancial } from '../context/FinancialContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAssistant: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAssistant,
}) => {
  const {
    userName,
    monthlySavingsCapacity,
    savings,
    downPaymentGoal,
    progressPercent,
    monthsToGoal,
  } = useFinancial();

  const menuItems = [
    { id: 'dashboard', label: 'Inicio', icon: LayoutDashboard },
    { id: 'vivienda', label: 'Vivienda y Arriendo', icon: Home },
    { id: 'comparador', label: 'Comparador de Arriendos', icon: Building2 },
    { id: 'Gastos', label: 'Gastos del Bebé', icon: Baby },
    { id: 'ahorro', label: 'Meta de Vivienda y Pie', icon: PiggyBank },
    { id: 'simulador', label: 'Simulador Hipotecario', icon: Calculator },
    { id: 'hogar', label: 'Mi Hogar y Familia', icon: Users },
    { id: 'onboarding', label: 'Configuración Onboarding', icon: ClipboardList },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 min-h-[calc(100vh-65px)]">
      {/* Navigation list */}
      <div className="p-3.5 space-y-1 flex-1">
        <p className="px-3 pt-2 pb-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Módulos Principales
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-blue-50 text-bci-blue shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${
                  isActive ? 'text-bci-blue' : 'text-slate-400'
                }`}
              />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}

        {/* AI Assistant Special CTA in Sidebar */}
        <div className="pt-3">
          <button
            onClick={onOpenAssistant}
            className="w-full relative group overflow-hidden flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-bold text-slate-800 bg-linear-to-r from-amber-50 to-blue-50 border border-amber-200 hover:border-amber-300 transition-all shadow-xs"
          >
            <div className="w-7 h-7 rounded-lg bg-bci-yellow/30 flex items-center justify-center shrink-0 text-amber-700">
              <Bot className="w-4 h-4" />
            </div>
            <div className="text-left flex-1">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900">Asistente IA</span>
                <Sparkles className="w-3 h-3 text-bci-blue fill-bci-blue" />
              </div>
              <p className="text-[11px] text-slate-500 font-normal leading-tight">
                Simula y optimiza tu ahorro
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Financial Status Summary Pill */}
      <div className="p-3.5 m-3 bg-slate-50 border border-slate-200 rounded-2xl">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-slate-500 font-medium">Ahorro Mensual</span>
          <span className={`font-mono font-bold ${monthlySavingsCapacity > 0 ? 'text-bci-green' : 'text-bci-red'}`}>
            ${monthlySavingsCapacity.toLocaleString('es-CL')}
          </span>
        </div>

        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-1 mb-2">
          <div
            className="bg-bci-green h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span>Meta: {progressPercent.toFixed(1)}%</span>
          <span className="font-mono">
            {monthsToGoal !== Infinity ? `${monthsToGoal} meses` : 'Detenido'}
          </span>
        </div>
      </div>
    </aside>
  );
};
