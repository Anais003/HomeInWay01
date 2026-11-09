import React, { useState } from 'react';
import { useFinancial } from '../context/FinancialContext';
import { Logo } from './Logo';
import {
  ChevronRight,
  ChevronLeft,
  Users,
  DollarSign,
  Info,
  Edit2,
  Trash2,
  Plus,
  Home,
  ShoppingCart,
  Car,
  Heart,
  Baby,
  Coins,
  CreditCard,
  Gamepad2,
  MapPin,
} from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const {
    userName,
    setUserName,
    familyMembers,
    addFamilyMember,
    removeFamilyMember,
    income,
    updateIncome,
    expenses,
    updateExpense,
    savings,
    updateSavings,
    housingGoal,
    updateHousingGoal,
    setOnboardingCompleted,
  } = useFinancial();

  const [step, setStep] = useState<number>(1);
  const [hasVariableIncome, setHasVariableIncome] = useState(false);
  const [partnerIncomeInput, setPartnerIncomeInput] = useState(1800000);

  // New member inputs
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberAge, setNewMemberAge] = useState(28);
  const [newMemberRelation, setNewMemberRelation] = useState<'Pareja' | 'Hijo/a' | 'Otro'>('Pareja');
  const [showAddMember, setShowAddMember] = useState(false);

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      setOnboardingCompleted(true);
      onComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleAddMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;
    addFamilyMember({
      name: newMemberName.trim(),
      age: Number(newMemberAge) || 1,
      relation: newMemberRelation,
    });
    setNewMemberName('');
    setShowAddMember(false);
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Top Header: Logo + "Saltar" + Step Progress (Matches PROTOTIPPPPO.png) */}
      <div className="flex items-center justify-between pt-1">
        <Logo size="sm" />
        <button
          onClick={() => {
            setOnboardingCompleted(true);
            onComplete();
          }}
          className="text-xs font-semibold text-slate-400 hover:text-slate-600"
        >
          Saltar
        </button>
      </div>

      {/* Progress Bar 1/6 to 6/6 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 w-36">
          {[1, 2, 3, 4, 5, 6].map((st) => (
            <div
              key={st}
              className={`h-1.5 rounded-full transition-all ${
                st === step
                  ? 'w-8 bg-[#2C70B8]'
                  : st < step
                  ? 'w-3 bg-[#2C70B8]/50'
                  : 'w-2 bg-slate-200'
              }`}
            />
          ))}
        </div>
        <span className="text-[11px] font-bold text-slate-400 font-mono">
          {step}/6
        </span>
      </div>

      {/* STEP 1: INTRODUCCIÓN (From PROTOTIPPPPO.png) */}
      {step === 1 && (
        <div className="space-y-5 pt-2 text-center">
          <div className="text-left">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Comencemos
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Queremos conocerte para crear una experiencia personalizada con HomeInWay y Bci.
            </p>
          </div>

          {/* Family looking at sunset Illustration */}
          <div className="w-full h-56 rounded-3xl overflow-hidden shadow-xs relative border border-slate-100 bg-[#E8EBE6]">
            <img
              src="/src/assets/images/homeinway_family_home_1791826106368.jpg"
              alt="Familia camino a su hogar"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent flex items-end p-4">
              <span className="text-white text-xs font-bold tracking-wide">
                Tu camino a un hogar, juntos.
              </span>
            </div>
          </div>

          <div className="text-left bg-white p-3.5 rounded-2xl border border-slate-100">
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              ¿Cómo te llamas?
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Tu nombre"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900"
            />
          </div>

          <button
            onClick={handleNext}
            className="w-full py-3.5 bg-[#2C70B8] hover:bg-[#20558D] text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <span>Comenzar</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 2: TU HOGAR (From PROTOTIPPPPO.png) */}
      {step === 2 && (
        <div className="space-y-4 pt-1">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Tu hogar
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Cuéntanos sobre tu familia.
            </p>
          </div>

          <p className="text-xs font-bold text-slate-800 uppercase pt-1">
            Integrantes del hogar
          </p>

          <div className="space-y-2">
            {familyMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{member.name}</p>
                    <p className="text-[11px] text-slate-400">
                      {member.age} años · {member.relation}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {member.relation !== 'Titular' && (
                    <button
                      onClick={() => removeFamilyMember(member.id)}
                      className="text-slate-300 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </div>
              </div>
            ))}
          </div>

          {/* Add member button */}
          {showAddMember ? (
            <form onSubmit={handleAddMemberSubmit} className="bg-slate-100 p-3.5 rounded-2xl space-y-2">
              <input
                type="text"
                placeholder="Nombre"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                className="w-full px-3 py-1.5 bg-white rounded-xl text-xs"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Edad"
                  value={newMemberAge}
                  onChange={(e) => setNewMemberAge(Number(e.target.value))}
                  className="px-3 py-1.5 bg-white rounded-xl text-xs"
                />
                <select
                  value={newMemberRelation}
                  onChange={(e) => setNewMemberRelation(e.target.value as any)}
                  className="px-3 py-1.5 bg-white rounded-xl text-xs"
                >
                  <option value="Pareja">Pareja</option>
                  <option value="Hijo/a">Hijo/a</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddMember(false)}
                  className="flex-1 py-1.5 bg-white text-xs font-semibold rounded-xl text-slate-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-1.5 bg-[#2C70B8] text-white text-xs font-bold rounded-xl"
                >
                  Guardar
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setShowAddMember(true)}
              className="w-full py-2.5 bg-white border border-slate-200 text-[#2C70B8] font-bold text-xs rounded-2xl flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Agregar integrante</span>
            </button>
          )}

          <div className="flex items-center gap-3 pt-4">
            <button
              onClick={handleBack}
              className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold text-xs rounded-2xl"
            >
              Volver
            </button>
            <button
              onClick={handleNext}
              className="flex-2 py-3 bg-[#2C70B8] hover:bg-[#20558D] text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: TUS INGRESOS (From PROTOTIPPPPO.png) */}
      {step === 3 && (
        <div className="space-y-4 pt-1">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Tus ingresos
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Así podemos entender tu capacidad de ahorro actual.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs">
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                Ingreso mensual neto
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">$</span>
                <input
                  type="number"
                  step="50000"
                  value={income.mainIncome}
                  onChange={(e) => updateIncome({ mainIncome: Number(e.target.value) || 0 })}
                  className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm font-black text-slate-900"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs">
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                Ingreso de tu pareja (opcional)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">$</span>
                <input
                  type="number"
                  step="50000"
                  value={partnerIncomeInput}
                  onChange={(e) => setPartnerIncomeInput(Number(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm font-black text-slate-900"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-white rounded-2xl border border-slate-100 shadow-xs">
              <span className="text-xs font-bold text-slate-800">¿Tienen ingresos variables?</span>
              <button
                type="button"
                onClick={() => setHasVariableIncome(!hasVariableIncome)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  hasVariableIncome ? 'bg-[#0C9647]' : 'bg-slate-200'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    hasVariableIncome ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="p-3 bg-[#EBF6EE] border border-[#C5E8CE] rounded-2xl flex items-start gap-2.5 text-[11px] text-[#086A32]">
              <Info className="w-4 h-4 text-[#0C9647] shrink-0 mt-0.5" />
              <span>Solo usamos estos datos para tus simulaciones con Bci. Tú decides qué compartir.</span>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <button
              onClick={handleBack}
              className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold text-xs rounded-2xl"
            >
              Volver
            </button>
            <button
              onClick={handleNext}
              className="flex-2 py-3 bg-[#2C70B8] hover:bg-[#20558D] text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: TUS GASTOS (From PROTOTIPPPPO.png) */}
      {step === 4 && (
        <div className="space-y-4 pt-1">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Tus gastos
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Registra tus gastos mensuales promedio.
            </p>
          </div>

          <div className="space-y-2 pt-1 max-h-96 overflow-y-auto pr-1">
            {[
              { key: 'vivienda', label: 'Vivienda (arriendo)', val: expenses.vivienda, icon: Home },
              { key: 'alimentacion', label: 'Alimentación', val: expenses.alimentacion, icon: ShoppingCart },
              { key: 'transporte', label: 'Transporte', val: expenses.transporte, icon: Car },
              { key: 'salud', label: 'Salud', val: expenses.salud, icon: Heart },
              { key: 'bebe', label: 'Gastos del hogar y bebé', val: expenses.bebe, icon: Coins },
              { key: 'deudas', label: 'Deudas', val: expenses.deudas, icon: CreditCard },
              { key: 'ocio', label: 'Ocio y personales', val: expenses.ocio, icon: Gamepad2 },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.key}
                  className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">{item.label}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-900">
                      $ {item.val.toLocaleString('es-CL')}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-3 pt-3">
            <button
              onClick={handleBack}
              className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold text-xs rounded-2xl"
            >
              Volver
            </button>
            <button
              onClick={handleNext}
              className="flex-2 py-3 bg-[#2C70B8] hover:bg-[#20558D] text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: TUS AHORROS (From PROTOTIPPPPO.png) */}
      {step === 5 && (
        <div className="space-y-4 pt-1">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Tus ahorros
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Cuéntanos sobre tu situación actual.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {/* Ahorro mensual actual */}
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#EBF6EE] text-[#0C9647] flex items-center justify-center text-xl shrink-0">
                🐷
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase">
                  Ahorro mensual actual
                </span>
                <p className="text-xl font-black font-mono text-slate-900">
                  $ {savings.currentMonthlySavings.toLocaleString('es-CL')}
                </p>
              </div>
            </div>

            {/* Ahorro acumulado */}
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#FEF9E7] text-amber-600 flex items-center justify-center text-xl shrink-0">
                🪙
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase">
                  Ahorro acumulado
                </span>
                <p className="text-xl font-black font-mono text-slate-900">
                  $ {savings.accumulatedSavings.toLocaleString('es-CL')}
                </p>
              </div>
            </div>

            <div className="p-3 bg-[#EBF6EE] border border-[#C5E8CE] rounded-2xl flex items-start gap-2.5 text-[11px] text-[#086A32]">
              <Info className="w-4 h-4 text-[#0C9647] shrink-0 mt-0.5" />
              <span>Este ahorro nos ayudará a proyectar tu camino hacia el crédito hipotecario Banco Bci.</span>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <button
              onClick={handleBack}
              className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold text-xs rounded-2xl"
            >
              Volver
            </button>
            <button
              onClick={handleNext}
              className="flex-2 py-3 bg-[#2C70B8] hover:bg-[#20558D] text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: TU OBJETIVO DE VIVIENDA (From PROTOTIPPPPO.png) */}
      {step === 6 && (
        <div className="space-y-4 pt-1">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Tu objetivo de vivienda
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Ayúdanos a entender tu meta para simular tu crédito Bci.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs">
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                ¿En cuánto tiempo te gustaría comprar una vivienda?
              </label>
              <select
                value={housingGoal.targetYears}
                onChange={(e) => updateHousingGoal({ targetYears: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
              >
                <option value={3}>3 años</option>
                <option value={5}>5 años</option>
                <option value={7}>7 años</option>
                <option value={10}>10 años</option>
              </select>
            </div>

            <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs">
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                ¿En qué tipo de vivienda estás pensando?
              </label>
              <select
                value={housingGoal.propertyType}
                onChange={(e) => updateHousingGoal({ propertyType: e.target.value as any })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
              >
                <option value="Departamento">Departamento</option>
                <option value="Casa">Casa</option>
              </select>
            </div>

            <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs">
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                ¿En qué comuna o zona?
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={housingGoal.commune}
                  onChange={(e) => updateHousingGoal({ commune: e.target.value })}
                  placeholder="Santiago Centro"
                  className="w-full px-3 py-2 pr-8 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                />
                <MapPin className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
              </div>
            </div>

            <div className="p-3 bg-[#FEF9E7] border border-[#FDEB9E] rounded-2xl flex items-start gap-2 text-[11px] text-amber-900">
              <span>🎯</span>
              <span>Convenio Bci: Podrás simular tu crédito y ajustar las cuotas directamente en la app.</span>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <button
              onClick={handleBack}
              className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold text-xs rounded-2xl"
            >
              Volver
            </button>
            <button
              onClick={handleNext}
              className="flex-2 py-3 bg-[#0C9647] hover:bg-[#097d3b] text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-1.5 shadow-xs transition-colors"
            >
              <span>Ir a mi Plan y Crédito Bci</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
