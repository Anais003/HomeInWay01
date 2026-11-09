import React, { useState } from 'react';
import { useFinancial } from '../context/FinancialContext';
import { IllustrationHouse } from './VisualIllustrations';
import {
  Home,
  Lightbulb,
  Droplets,
  Wifi,
  ChevronRight,
  TrendingUp,
  Edit2,
  Check,
  Plus,
  Trash2,
  Building2,
} from 'lucide-react';

interface HousingModuleProps {
  onNavigateToComparator: () => void;
}

interface CustomHousingExpense {
  id: string;
  name: string;
  amount: number;
}

export const HousingModule: React.FC<HousingModuleProps> = () => {
  const { updateRent, updateExpense, totalIncome } = useFinancial();

  // Breakdown values
  const [rent, setRent] = useState(550000);
  const [gastosComunes, setGastosComunes] = useState(30000);
  const [aguaLuzGas, setAguaLuzGas] = useState(15000);
  const [internet, setInternet] = useState(5000);

  // Custom added housing expenses
  const [customExpenses, setCustomExpenses] = useState<CustomHousingExpense[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExpenseName, setNewExpenseName] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState<number>(15000);

  const totalCustom = customExpenses.reduce((sum, item) => sum + item.amount, 0);
  const totalVivienda = rent + gastosComunes + aguaLuzGas + internet + totalCustom;
  const pctGastos = totalIncome > 0 ? Math.round((totalVivienda / totalIncome) * 100) : 30;

  const handleSave = () => {
    updateRent(totalVivienda);
    updateExpense('servicios', aguaLuzGas + internet);
    setIsEditing(false);
    setShowAddForm(false);
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpenseName.trim() || newExpenseAmount <= 0) return;
    const newItem: CustomHousingExpense = {
      id: `custom-house-${Date.now()}`,
      name: newExpenseName.trim(),
      amount: newExpenseAmount,
    };
    setCustomExpenses((prev) => [...prev, newItem]);
    setNewExpenseName('');
    setNewExpenseAmount(15000);
    setShowAddForm(false);
  };

  const handleDeleteCustom = (id: string) => {
    setCustomExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateCustomAmount = (id: string, amount: number) => {
    setCustomExpenses((prev) =>
      prev.map((item) => (item.id === id ? { ...item, amount } : item))
    );
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Screen Title */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Vivienda y Arriendo
        </h1>
      </div>

      {/* Hero Visual Card: House Illustration */}
      <IllustrationHouse
        amount={`$ ${totalVivienda.toLocaleString('es-CL')}`}
        subtitle={`${pctGastos}% de tus ingresos totales`}
      />

      {/* Big Summary Stat & Badge */}
      <div className="bg-white rounded-3xl p-4 border border-[#E5EAF0] shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-2xl font-black font-mono text-slate-900 leading-none">
              $ {totalVivienda.toLocaleString('es-CL')}
            </p>
            <p className="text-xs text-slate-500 font-medium mt-1">
              total mensual en vivienda
            </p>
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#2C70B8] bg-[#F0F6FC] px-2.5 py-1 rounded-full border border-[#D0E2F3] shadow-2xs">
            <TrendingUp className="w-3.5 h-3.5" />
            {pctGastos}% de carga financiera
          </span>
        </div>

        {/* Multi-segment Color Bar */}
        <div className="w-full h-3 rounded-full overflow-hidden flex gap-0.5 mt-3 bg-slate-100 p-0.5 border border-slate-200/60">
          <div className="h-full bg-[#2C70B8] rounded-l-full" style={{ width: `${Math.max(10, (rent / totalVivienda) * 100)}%` }} title="Arriendo" />
          <div className="h-full bg-[#FDD700]" style={{ width: `${Math.max(5, (gastosComunes / totalVivienda) * 100)}%` }} title="Gastos comunes" />
          <div className="h-full bg-[#0C9647]" style={{ width: `${Math.max(5, (aguaLuzGas / totalVivienda) * 100)}%` }} title="Agua, luz y gas" />
          <div className="h-full bg-[#1E5894]" style={{ width: `${Math.max(5, (internet / totalVivienda) * 100)}%` }} title="Internet" />
          {totalCustom > 0 && (
            <div className="h-full bg-[#8B5CF6] rounded-r-full" style={{ width: `${Math.max(5, (totalCustom / totalVivienda) * 100)}%` }} title="Otros gastos" />
          )}
        </div>
      </div>

      {/* Detalle de vivienda */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E5EAF0] shadow-[0_2px_12px_rgba(15,23,42,0.04)] space-y-3.5">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            Desglose de vivienda
          </h2>
          <button
            onClick={() => {
              if (isEditing) handleSave();
              else setIsEditing(true);
            }}
            className="px-3.5 py-1.5 bg-[#F0F6FC] hover:bg-[#E1EFFE] text-[#2C70B8] border border-[#D0E2F3] rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {isEditing ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#0C9647]" />
                <span className="text-[#0C9647]">Guardar</span>
              </>
            ) : (
              <>
                <Edit2 className="w-3.5 h-3.5" />
                <span>Editar</span>
              </>
            )}
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {/* Arriendo */}
          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#EDF4FB] text-[#2C70B8] flex items-center justify-center shadow-2xs">
                <Home className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-800">Arriendo mensual</span>
            </div>
            {isEditing ? (
              <input
                type="number"
                step="10000"
                value={rent}
                onChange={(e) => setRent(Number(e.target.value) || 0)}
                className="w-28 text-right px-2 py-1 text-xs font-mono font-bold border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C70B8]"
              />
            ) : (
              <span className="text-xs sm:text-sm font-mono font-black text-slate-900">
                $ {rent.toLocaleString('es-CL')}
              </span>
            )}
          </div>

          {/* Gastos comunes */}
          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#FEF9E7] text-amber-600 flex items-center justify-center shadow-2xs">
                <Lightbulb className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-800">Gastos comunes</span>
            </div>
            {isEditing ? (
              <input
                type="number"
                step="5000"
                value={gastosComunes}
                onChange={(e) => setGastosComunes(Number(e.target.value) || 0)}
                className="w-28 text-right px-2 py-1 text-xs font-mono font-bold border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C70B8]"
              />
            ) : (
              <span className="text-xs sm:text-sm font-mono font-black text-slate-900">
                $ {gastosComunes.toLocaleString('es-CL')}
              </span>
            )}
          </div>

          {/* Agua, luz y gas */}
          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#EBF6EE] text-[#0C9647] flex items-center justify-center shadow-2xs">
                <Droplets className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-800">Agua, luz y gas</span>
            </div>
            {isEditing ? (
              <input
                type="number"
                step="5000"
                value={aguaLuzGas}
                onChange={(e) => setAguaLuzGas(Number(e.target.value) || 0)}
                className="w-28 text-right px-2 py-1 text-xs font-mono font-bold border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C70B8]"
              />
            ) : (
              <span className="text-xs sm:text-sm font-mono font-black text-slate-900">
                $ {aguaLuzGas.toLocaleString('es-CL')}
              </span>
            )}
          </div>

          {/* Internet */}
          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#EDF4FB] text-[#2C70B8] flex items-center justify-center shadow-2xs">
                <Wifi className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-800">Internet</span>
            </div>
            {isEditing ? (
              <input
                type="number"
                step="2000"
                value={internet}
                onChange={(e) => setInternet(Number(e.target.value) || 0)}
                className="w-28 text-right px-2 py-1 text-xs font-mono font-bold border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C70B8]"
              />
            ) : (
              <span className="text-xs sm:text-sm font-mono font-black text-slate-900">
                $ {internet.toLocaleString('es-CL')}
              </span>
            )}
          </div>

          {/* Gastos personalizados añadidos por el usuario */}
          {customExpenses.map((custom) => (
            <div key={custom.id} className="py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#F5F3FF] text-[#8B5CF6] flex items-center justify-center shadow-2xs">
                  <Building2 className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800">{custom.name}</span>
              </div>
              {isEditing ? (
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    step="5000"
                    value={custom.amount}
                    onChange={(e) => handleUpdateCustomAmount(custom.id, Number(e.target.value) || 0)}
                    className="w-28 text-right px-2 py-1 text-xs font-mono font-bold border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C70B8]"
                  />
                  <button
                    onClick={() => handleDeleteCustom(custom.id)}
                    className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Eliminar"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <span className="text-xs sm:text-sm font-mono font-black text-slate-900">
                  $ {custom.amount.toLocaleString('es-CL')}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Modo edición: Botón para agregar nuevo gasto */}
        {isEditing && (
          <div className="pt-2 border-t border-slate-100">
            {!showAddForm ? (
              <button
                type="button"
                onClick={() => setShowAddForm(true)}
                className="w-full py-2 px-3 border-2 border-dashed border-[#2C70B8]/40 hover:border-[#2C70B8] text-[#2C70B8] bg-[#F0F6FC]/50 hover:bg-[#F0F6FC] rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Agregar nuevo gasto de vivienda (estacionamiento, bodega, etc.)</span>
              </button>
            ) : (
              <form onSubmit={handleAddExpense} className="p-3 bg-[#F8FAFC] rounded-2xl border border-slate-200 space-y-2.5 text-xs">
                <span className="font-bold text-slate-800 block text-xs">
                  Nuevo Gasto de Vivienda
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-semibold text-slate-500 block mb-0.5">
                      Nombre del gasto
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Estacionamiento, Bodega"
                      value={newExpenseName}
                      onChange={(e) => setNewExpenseName(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#2C70B8] text-xs bg-white"
                      autoFocus
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-slate-500 block mb-0.5">
                      Monto mensual ($ CLP)
                    </label>
                    <input
                      type="number"
                      step="5000"
                      value={newExpenseAmount}
                      onChange={(e) => setNewExpenseAmount(Number(e.target.value) || 0)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-xl font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#2C70B8] text-xs bg-white"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-3 py-1 text-slate-500 hover:text-slate-700 font-bold text-xs cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 bg-[#2C70B8] hover:bg-[#20558D] text-white rounded-xl font-bold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Añadir gasto</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
