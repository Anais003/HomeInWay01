import React from 'react';
import { useFinancial } from '../context/FinancialContext';
import { IllustrationPiggyBank } from './VisualIllustrations';
import {
  Home,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Building2,
} from 'lucide-react';

export const SavingsGoalModule: React.FC = () => {
  const {
    savings,
    housingGoal,
    monthlySavingsCapacity,
    downPaymentGoal,
    progressPercent,
  } = useFinancial();

  return (
    <div className="space-y-4 pb-20">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Ahorro y Meta Bci
        </h1>
      </div>

      {/* Hero Visual Card: Piggy Bank Illustration */}
      <IllustrationPiggyBank
        amount={`$ ${monthlySavingsCapacity.toLocaleString('es-CL')}`}
        subtitle="15% de tus ingresos familiares"
      />

      {/* =========================================================================
          PIE ACUMULADO Y META
      ========================================================================= */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E5EAF0] shadow-[0_2px_12px_rgba(15,23,42,0.04)] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0C9647]" />
            <span className="text-xs font-black uppercase text-slate-700 tracking-wider">
              Pie Acumulado
            </span>
          </div>
          <span className="text-xs font-black font-mono text-[#0C9647]">
            {progressPercent.toFixed(0)}% completado
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl sm:text-3xl font-black font-mono text-slate-900 leading-none">
              $ {savings.accumulatedSavings.toLocaleString('es-CL')}
            </p>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Meta pie hipotecario: ${downPaymentGoal.toLocaleString('es-CL')}
            </p>
          </div>
        </div>

        {/* Progress Bar Verde Bci */}
        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
          <div
            className="bg-[#0C9647] h-full rounded-full transition-all duration-700 shadow-2xs"
            style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-slate-600 pt-0.5">
          <span>Meta: {housingGoal.propertyType} en {housingGoal.commune}</span>
          <span className="font-bold text-[#0C9647] flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>En marcha</span>
          </span>
        </div>
      </div>

      {/* =========================================================================
          CONVENIO PREFERENTE BCI (DESTACADO CON 3 ACELERADORES SIMPLIFICADOS)
      ========================================================================= */}
      <div className="bg-linear-to-br from-[#EBF6EE] via-[#F4FAF6] to-[#E5F5E9] border border-[#C5E8CE] rounded-3xl p-5 shadow-[0_2px_12px_rgba(12,150,71,0.06)] space-y-4">
        {/* Encabezado destacado */}
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#086A32] tracking-tight">
            Convenio preferente BCI
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">
            Tus tres aceleradores de crédito hipotecario recomendados
          </p>
        </div>

        {/* Los tres beneficios limpios y modernos: Solo Ícono + Título */}
        <div className="space-y-2.5">
          {/* Beneficio 1 */}
          <div className="bg-white/95 backdrop-blur-xs p-3.5 rounded-2xl border border-[#D5EEDC] flex items-center gap-3.5 shadow-xs transition-transform hover:scale-[1.01]">
            <div className="w-10 h-10 rounded-xl bg-[#EDF4FB] text-[#2C70B8] flex items-center justify-center shrink-0 shadow-2xs">
              <Home className="w-5 h-5" />
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
              Dividendo menor que tu arriendo actual
            </p>
          </div>

          {/* Beneficio 2 */}
          <div className="bg-white/95 backdrop-blur-xs p-3.5 rounded-2xl border border-[#D5EEDC] flex items-center gap-3.5 shadow-xs transition-transform hover:scale-[1.01]">
            <div className="w-10 h-10 rounded-xl bg-[#EBF6EE] text-[#0C9647] flex items-center justify-center shrink-0 shadow-2xs">
              <ShieldCheck className="w-5 h-5 text-[#0C9647]" />
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
              Cero costo de tasación y estudio de títulos
            </p>
          </div>

          {/* Beneficio 3 */}
          <div className="bg-white/95 backdrop-blur-xs p-3.5 rounded-2xl border border-[#D5EEDC] flex items-center gap-3.5 shadow-xs transition-transform hover:scale-[1.01]">
            <div className="w-10 h-10 rounded-xl bg-[#FEF9E7] text-amber-600 flex items-center justify-center shrink-0 shadow-2xs">
              <Zap className="w-5 h-5 text-[#0C9647]" />
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
              Cada $50.000 ahorrados adelantan tu pie
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
