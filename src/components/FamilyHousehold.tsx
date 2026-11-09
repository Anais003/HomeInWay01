import React, { useState } from 'react';
import { useFinancial } from '../context/FinancialContext';
import { Users, UserPlus, Trash2, Shield, Heart } from 'lucide-react';

export const FamilyHousehold: React.FC = () => {
  const {
    userName,
    setUserName,
    familyMembers,
    addFamilyMember,
    removeFamilyMember,
    totalIncome,
    totalExpenses,
    housingGoal,
  } = useFinancial();

  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState(25);
  const [newRelation, setNewRelation] = useState<'Pareja' | 'Hijo/a' | 'Otro'>('Pareja');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    addFamilyMember({
      name: newName.trim(),
      age: Number(newAge) || 1,
      relation: newRelation,
    });
    setNewName('');
    setNewAge(25);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-bci-blue flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Mi Hogar y Familia
            </h1>
            <p className="text-sm text-slate-500">
              Integrantes del grupo familiar vinculados al proyecto de vivienda propia en {housingGoal.commune}.
            </p>
          </div>
        </div>
      </div>

      {/* Household members list */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 mb-4">
          Integrantes Registrados ({familyMembers.length})
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {familyMembers.map((member) => (
            <div
              key={member.id}
              className="p-4 bg-slate-50 border border-slate-200 rounded-2xl relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-9 h-9 rounded-full bg-blue-100 text-bci-blue font-bold text-sm flex items-center justify-center">
                    {member.name.charAt(0)}
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                    {member.relation}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{member.name}</h3>
                <p className="text-xs text-slate-500">{member.age} años de edad</p>
              </div>

              {member.relation !== 'Titular' && (
                <button
                  onClick={() => removeFamilyMember(member.id)}
                  className="mt-3 flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-bci-red transition-colors self-end"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Eliminar</span>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add member form */}
        <form onSubmit={handleAdd} className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5">
          <h3 className="text-xs font-bold text-slate-800 uppercase mb-3 flex items-center gap-1.5">
            <UserPlus className="w-4 h-4 text-bci-blue" />
            <span>+ Agregar Integrante a la Familia</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Nombre</label>
              <input
                type="text"
                placeholder="Nombre del integrante"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Edad</label>
              <input
                type="number"
                value={newAge}
                onChange={(e) => setNewAge(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Parentesco</label>
              <select
                value={newRelation}
                onChange={(e) => setNewRelation(e.target.value as any)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm"
              >
                <option value="Pareja">Pareja</option>
                <option value="Hijo/a">Hijo/a</option>
                <option value="Otro">Otro integrante</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={!newName.trim()}
            className="px-5 py-2 bg-bci-blue hover:bg-[#235b96] text-white font-bold text-xs rounded-xl shadow-xs transition-colors disabled:opacity-50"
          >
            Guardar Integrante
          </button>
        </form>
      </div>
    </div>
  );
};
