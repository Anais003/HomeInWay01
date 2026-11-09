import React, { useState } from 'react';
import { useFinancial } from '../context/FinancialContext';
import { IllustrationRobotMascot } from './VisualIllustrations';
import {
  TrendingUp,
  Home,
  Clock,
  Coins,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  PiggyBank,
  Building2,
  Baby,
  Bot,
  ShieldCheck,
  CheckCircle2,
  Calculator,
  Percent,
  Check,
  Layers,
  Brain,
  HelpCircle,
  Eye,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface DashboardProps {
  onNavigate: (tab: string) => void;
  onOpenAssistant: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate, onOpenAssistant }) => {
  const {
    userName,
    totalExpenses,
    expenses,
    monthlySavingsCapacity,
    savings,
    housingGoal,
    downPaymentGoal,
    progressPercent,
    currentRent,
    babyExpensesTotal,
  } = useFinancial();

  // Selected slide in the "Tu Balance Mensual" rectangular banner (Ahorro -> Arriendo -> Gastos)
  const [balanceStep, setBalanceStep] = useState(0);

  const balanceItems = [
    {
      id: 'ahorro',
      title: 'Ahorro para el pie',
      amount: monthlySavingsCapacity,
      subtitle: 'acumulando para tu crédito hipotecario',
      icon: '🐷',
      color: '#0C9647',
      bg: '#EBF6EE',
      border: '#C5E8CE',
      textAccent: 'text-[#0C9647]',
      tab: 'ahorro',
    },
    {
      id: 'arriendo',
      title: 'Arriendo actual',
      amount: currentRent,
      subtitle: 'costo fijo mensual en vivienda',
      icon: '🏢',
      color: '#2C70B8',
      bg: '#F0F6FC',
      border: '#D0E2F3',
      textAccent: 'text-[#2C70B8]',
      tab: 'comparador',
    },
    {
      id: 'gastos',
      title: 'Gastos mensuales',
      amount: babyExpensesTotal,
      subtitle: 'estimado del mes para el hogar',
      icon: '🪙',
      color: '#B45309',
      bg: '#FEF9E7',
      border: '#FDEB9E',
      textAccent: 'text-amber-800',
      tab: 'gastos',
    },
  ];

  const currentBalanceItem = balanceItems[balanceStep];

  const handleNextBalance = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBalanceStep((prev) => (prev + 1) % balanceItems.length);
  };

  const handlePrevBalance = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBalanceStep((prev) => (prev - 1 + balanceItems.length) % balanceItems.length);
  };

  // 4 categorías exclusivas para la distribución: Vivienda, Gastos, Alimentación, Salud
  const MACRO_EXPENSES = [
    {
      name: 'Vivienda',
      value: expenses.vivienda,
      color: '#2C70B8',
      bg: '#F0F6FC',
      border: '#D0E2F3',
    },
    {
      name: 'Gastos',
      value: expenses.bebe,
      color: '#0C9647',
      bg: '#EBF6EE',
      border: '#C5E8CE',
    },
    {
      name: 'Alimentación',
      value: expenses.alimentacion,
      color: '#FDD700',
      bg: '#FEF9E7',
      border: '#FDEB9E',
    },
    {
      name: 'Salud',
      value: expenses.salud + expenses.transporte + expenses.deudas + expenses.ocio + expenses.otros,
      color: '#EF3942',
      bg: '#FDEDEE',
      border: '#F8BFC2',
    },
  ];

  return (
    <div className="space-y-4 pb-20">
      {/* 1. HEADER: Saludo limpio + Botón Asistente IA (Prägnanz: figura y fondo contrastante) */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Hola, {userName}
            </h1>
            <span className="text-xl">👋</span>
          </div>
        </div>

        {/* CTA rápido hacia el Asistente IA */}
        <button
          onClick={onOpenAssistant}
          className="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-slate-50 border border-[#E5EAF0] rounded-2xl shadow-[0_1px_3px_rgba(15,23,42,0.03)] transition-all active:scale-95 shrink-0"
        >
          <Bot className="w-4 h-4 text-[#2C70B8]" />
          <span className="text-[11px] font-black text-slate-800 leading-tight">
            Asesor IA
          </span>
        </button>
      </div>


      {/* =========================================================================
          OBJETIVO PRINCIPAL CRÉDITO HIPOTECARIO BCI
      ========================================================================= */}
      <div className="bg-linear-to-br from-[#2C70B8] to-[#1B4E85] text-white rounded-3xl p-4 sm:p-5 shadow-md relative overflow-hidden border border-[#235C9A]">
        {/* Glow de fondo */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#FDD700]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div>
            <h2 className="text-base sm:text-lg font-black leading-tight tracking-tight">
              ¿Listo para pasar del arriendo a tu casa propia?
            </h2>
          </div>

          {/* Cápsula de estado del pie (Prägnanz: figura geométrica nítida) */}
          <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/20 flex items-center justify-between text-xs">
            <div>
              <p className="text-[10px] text-blue-200 uppercase font-semibold">Pie acumulado hoy</p>
              <p className="text-sm font-black font-mono text-white">
                $ {savings.accumulatedSavings.toLocaleString('es-CL')}{' '}
                <span className="text-xs font-normal text-blue-200">
                  / $ {downPaymentGoal.toLocaleString('es-CL')}
                </span>
              </p>
            </div>
            <div className="text-right">
              <span className="text-sm font-black font-mono text-[#FDD700]">
                {progressPercent.toFixed(0)}%
              </span>
              <p className="text-[10px] text-blue-200 font-medium">completado</p>
            </div>
          </div>

          {/* Barra de Progreso del Pie */}
          <div className="w-full bg-black/20 h-2 rounded-full overflow-hidden p-0.5">
            <div
              className="bg-[#0C9647] h-full rounded-full transition-all duration-700"
              style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
            />
          </div>

          {/* Botón Acción Primaria */}
          <div className="pt-0.5">
            <button
              onClick={() => onNavigate('ahorro')}
              className="w-full py-2.5 px-3 bg-[#0C9647] hover:bg-[#097d3b] text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-transform active:scale-95"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Simular mi crédito Bci</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BLOQUE 2: BALANCE MENSUAL (BANNER RECTANGULAR ÚNICO CON NAVEGACIÓN SECUENCIAL)
          1) Ahorro para el pie -> 2) Arriendo actual -> 3) Gastos mensuales
      ========================================================================= */}
      <div className="space-y-2">
        <div className="px-1">
          <span className="text-[11px] font-extrabold uppercase tracking-wide text-slate-600">
            Tu Balance Mensual
          </span>
        </div>

        {/* Burbuja Rectangular Única */}
        <div
          onClick={() => onNavigate(currentBalanceItem.tab)}
          className="p-4 sm:p-5 rounded-3xl border-2 shadow-xs transition-all cursor-pointer relative overflow-hidden"
          style={{ backgroundColor: currentBalanceItem.bg, borderColor: currentBalanceItem.border }}
        >
          <div className="flex items-center justify-between gap-3">
            {/* Ícono + Cifras + Explicación en grande y ordenado */}
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-black/5 flex items-center justify-center text-2xl shrink-0">
                {currentBalanceItem.icon}
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block truncate">
                  {currentBalanceItem.title}
                </span>
                <p className={`text-2xl sm:text-3xl font-black font-mono leading-tight mt-0.5 ${currentBalanceItem.textAccent}`}>
                  ${currentBalanceItem.amount.toLocaleString('es-CL')}
                </p>
                <p className="text-[11px] text-slate-600 font-medium truncate mt-0.5">
                  {currentBalanceItem.subtitle}
                </p>
              </div>
            </div>

            {/* Flechas para avanzar y retroceder */}
            <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={handlePrevBalance}
                className="w-9 h-9 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/90 shadow-2xs flex items-center justify-center text-slate-700 active:scale-95 transition-transform cursor-pointer"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextBalance}
                className="w-9 h-9 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/90 shadow-2xs flex items-center justify-center text-slate-700 active:scale-95 transition-transform cursor-pointer"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Dots de navegación */}
          <div className="flex items-center gap-1.5 mt-3 pt-2.5 border-t border-black/5">
            {balanceItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setBalanceStep(idx);
                }}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  idx === balanceStep ? 'w-7 bg-slate-800' : 'w-2 bg-slate-400/50 hover:bg-slate-400'
                }`}
                aria-label={item.title}
              />
            ))}
            <span className="text-[10px] text-slate-500 font-medium ml-2">
              Usa las flechas para explorar
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          DISTRIBUCIÓN DE GASTOS: RUEDA + 4 GASTOS (SOLO NOMBRES, SIN CIFRAS DUPLICADAS) + GASTO TOTAL GRANDE
      ========================================================================= */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E5EAF0] shadow-[0_2px_12px_rgba(15,23,42,0.04)] space-y-4">
        {/* Total destacado con letra más grande */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-sm sm:text-base font-extrabold text-slate-600 uppercase tracking-wide">
            Gasto Total
          </span>
          <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900 tracking-tight">
            $ {totalExpenses.toLocaleString('es-CL')}
          </span>
        </div>

        {/* Visual Donut Chart agrandado + 4 Gastos sin cifras */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Rueda agrandada */}
          <div className="w-36 h-36 shrink-0 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MACRO_EXPENSES}
                  cx="50%"
                  cy="50%"
                  innerRadius={38}
                  outerRadius={62}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {MACRO_EXPENSES.map((it, idx) => (
                    <Cell key={idx} fill={it.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => [`$${Number(val).toLocaleString('es-CL')}`, 'Gasto']}
                  contentStyle={{ borderRadius: '12px', fontSize: '12px', fontWeight: 700 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Solamente Vivienda, Gastos, Alimentación, Salud (sin cifras duplicadas) */}
          <div className="flex-1 space-y-2">
            {MACRO_EXPENSES.map((it) => (
              <div
                key={it.name}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl border transition-colors shadow-2xs"
                style={{ backgroundColor: it.bg, borderColor: it.border }}
              >
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: it.color }} />
                <span className="text-slate-800 font-bold text-xs sm:text-sm">{it.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* =========================================================================
          ASESOR ANALÍTICO BCI (TERCERA OPINIÓN FINANCIERA)
      ========================================================================= */}
      <div
        className="bg-white rounded-3xl p-5 border border-[#E5EAF0] shadow-[0_2px_12px_rgba(15,23,42,0.04)] relative overflow-hidden space-y-3.5"
      >
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#2C70B8] via-[#0C9647] to-[#FDD700]" />
        
        <div className="flex items-center gap-3.5 pt-0.5">
          <IllustrationRobotMascot size="md" className="shrink-0" />
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Asesor Analítico BCI
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-0.5">
              Tu tercera opinión financiera
            </p>
          </div>
        </div>

        {/* Botón CTA directo al Asesor IA */}
        <button
          onClick={onOpenAssistant}
          className="w-full py-3 px-4 bg-gradient-to-r from-[#2C70B8] to-[#1E5894] hover:from-[#245e9e] hover:to-[#174677] text-white font-extrabold text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-2 shadow-xs transition-transform active:scale-95 cursor-pointer"
        >
          <Bot className="w-4 h-4 text-[#FDD700]" />
          <span>Consulta tus dudas aquí</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
