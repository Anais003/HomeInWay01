import React, { useState } from 'react';
import { useFinancial } from '../context/FinancialContext';
import { IllustrationBabyBottle } from './VisualIllustrations';
import {
  TrendingUp,
  ChevronRight,
  Heart,
  Baby,
  Shirt,
  Edit2,
  Check,
  Plus,
  Coins,
  Trash2,
  X,
  Dog,
  Car,
  GraduationCap,
  Dumbbell,
  ShoppingBag,
  Film,
  Sparkles,
  Eye,
  ShieldCheck,
  Tag,
  Receipt,
  Layers,
} from 'lucide-react';

export interface ExpenseCategoryItem {
  id: string;
  name: string;
  categoryKey: string;
  amount: number;
  icon: string | React.ReactNode;
  tagline: string;
  isCustom?: boolean;
  breakdown: {
    id: string;
    label: string;
    amount: number;
    icon?: string;
  }[];
  tip?: string;
}

export const BabyModule: React.FC = () => {
  const { babyExpensesTotal, updateBabyItem, babyItems } = useFinancial();

  // Baby items individual state
  const [panalesAseo, setPanalesAseo] = useState(120000);
  const [alimentacion, setAlimentacion] = useState(80000);
  const [salud, setSalud] = useState(50000);
  const [ropa, setRopa] = useState(30000);
  const [juguetesOtros, setJuguetesOtros] = useState(20000);
  const [isEditingBaby, setIsEditingBaby] = useState(false);

  // Selected category to view "en grande" (Spotlight focus)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('bebe');

  // Pre-configured default categories for young adults / households (22-38 years)
  const [mascotaAmount, setMascotaAmount] = useState<number>(45000);
  const [mascotaBreakdown, setMascotaBreakdown] = useState([
    { id: 'm-1', label: 'Alimento premium balanceado', amount: 25000, icon: '🥩' },
    { id: 'm-2', label: 'Controles veterinarios y vacunas', amount: 12000, icon: '🩺' },
    { id: 'm-3', label: 'Antiparasitarios y accesorios', amount: 8000, icon: '🎾' },
  ]);
  const [isEditingMascota, setIsEditingMascota] = useState(false);

  const [transporteAmount, setTransporteAmount] = useState<number>(60000);
  const [transporteBreakdown, setTransporteBreakdown] = useState([
    { id: 't-1', label: 'Bencina / Combustible', amount: 35000, icon: '⛽' },
    { id: 't-2', label: 'TAG autopistas urbanas', amount: 15000, icon: '🛣️' },
    { id: 't-3', label: 'Metro y Red (Tarjeta Bip!)', amount: 10000, icon: '🚇' },
  ]);
  const [isEditingTransporte, setIsEditingTransporte] = useState(false);

  const [colegioAmount, setColegioAmount] = useState<number>(90000);
  const [colegioBreakdown, setColegioBreakdown] = useState([
    { id: 'c-1', label: 'Matrícula y colegiatura mensual', amount: 70000, icon: '🏫' },
    { id: 'c-2', label: 'Materiales y cuadernos', amount: 12000, icon: '📚' },
    { id: 'c-3', label: 'Talleres extracurriculares', amount: 8000, icon: '🎨' },
  ]);
  const [isEditingColegio, setIsEditingColegio] = useState(false);

  const [saludGymAmount, setSaludGymAmount] = useState<number>(35000);
  const [saludGymBreakdown, setSaludGymBreakdown] = useState([
    { id: 's-1', label: 'Membresía gimnasio / deporte', amount: 25000, icon: '🏋️' },
    { id: 's-2', label: 'Farmacia y suplementos', amount: 10000, icon: '💊' },
  ]);
  const [isEditingSaludGym, setIsEditingSaludGym] = useState(false);

  const [hogarSuperAmount, setHogarSuperAmount] = useState<number>(180000);
  const [hogarSuperBreakdown, setHogarSuperBreakdown] = useState([
    { id: 'h-1', label: 'Canasta básica de alimentos', amount: 110000, icon: '🍞' },
    { id: 'h-2', label: 'Artículos de aseo y limpieza', amount: 40000, icon: '🧼' },
    { id: 'h-3', label: 'Carnes, frutas y verduras frescas', amount: 30000, icon: '🍎' },
  ]);
  const [isEditingHogarSuper, setIsEditingHogarSuper] = useState(false);

  const [ocioAmount, setOcioAmount] = useState<number>(40000);
  const [ocioBreakdown, setOcioBreakdown] = useState([
    { id: 'o-1', label: 'Suscripciones streaming (Netflix, Spotify)', amount: 15000, icon: '📺' },
    { id: 'o-2', label: 'Salidas y cafés fin de semana', amount: 25000, icon: '☕' },
  ]);
  const [isEditingOcio, setIsEditingOcio] = useState(false);

  // Additional dynamic custom expenses
  interface DynamicCustomExpense {
    id: string;
    name: string;
    category: string;
    amount: number;
    icon: string;
    description: string;
  }

  const [customExpenses, setCustomExpenses] = useState<DynamicCustomExpense[]>([]);

  // Modal / drawer to add a new expense
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [newCategory, setNewCategory] = useState('Mascota');
  const [newName, setNewName] = useState('');
  const [newAmount, setNewAmount] = useState<number>(35000);

  const PRESET_CATEGORIES = [
    { label: 'Mascota', defaultName: 'Gastos veterinarios y alimento', icon: '🐾', defaultAmount: 45000 },
    { label: 'Transporte', defaultName: 'Bencina, TAG o Metro', icon: '🚗', defaultAmount: 60000 },
    { label: 'Colegio / Estudios', defaultName: 'Matrícula o cursos online', icon: '🎓', defaultAmount: 90000 },
    { label: 'Salud / Gym', defaultName: 'Gimnasio o entrenamiento', icon: '🏋️', defaultAmount: 35000 },
    { label: 'Ocio / Streaming', defaultName: 'Salidas y suscripciones', icon: '🍿', defaultAmount: 40000 },
    { label: 'Supermercado Hogar', defaultName: 'Abarrotes y limpieza', icon: '🛒', defaultAmount: 50000 },
  ];

  // Baby items sum
  const totalBebe = panalesAseo + alimentacion + salud + ropa + juguetesOtros;

  // Custom expenses sum
  const totalCustom = customExpenses.reduce((sum, item) => sum + item.amount, 0);

  // Consolidated total of all active categories
  const totalGeneralGastos =
    totalBebe +
    mascotaAmount +
    transporteAmount +
    colegioAmount +
    saludGymAmount +
    hogarSuperAmount +
    ocioAmount +
    totalCustom;

  // Handle adding custom expense
  const handleAddExpense = () => {
    const preset = PRESET_CATEGORIES.find((p) => p.label === newCategory);
    const itemToAdd: DynamicCustomExpense = {
      id: `exp-${Date.now()}`,
      name: newName.trim() || preset?.defaultName || newCategory,
      category: newCategory,
      amount: Number(newAmount) || 20000,
      icon: preset?.icon || '🏷️',
      description: preset?.defaultName || 'Gasto registrado',
    };
    setCustomExpenses([...customExpenses, itemToAdd]);
    setSelectedCategoryId(itemToAdd.id); // Automatically view in large
    setIsAddingExpense(false);
    setNewName('');
    setNewAmount(35000);
  };

  const handleDeleteCustomExpense = (id: string) => {
    setCustomExpenses(customExpenses.filter((item) => item.id !== id));
    if (selectedCategoryId === id) {
      setSelectedCategoryId('bebe');
    }
  };

  // Pins for the Baby Bottle Illustration
  const bottlePins = [
    { label: 'Otros', amount: `$ ${juguetesOtros.toLocaleString('es-CL')}`, color: '#94A3B8' },
    { label: 'Salud', amount: `$ ${salud.toLocaleString('es-CL')}`, color: '#EF3942' },
    { label: 'Alimentación', amount: `$ ${alimentacion.toLocaleString('es-CL')}`, color: '#FDD700' },
    { label: 'Pañales y aseo', amount: `$ ${panalesAseo.toLocaleString('es-CL')}`, color: '#2C70B8' },
  ];

  interface BannerCategoryItem {
    id: string;
    name: string;
    icon: string | React.ReactNode;
    amount: number;
    tagline: string;
    color: string;
    isCustom?: boolean;
  }

  // Catalog of categories available for the top banner
  const categoriesList: BannerCategoryItem[] = [
    {
      id: 'bebe',
      name: 'Bebé',
      icon: '🍼',
      amount: totalBebe,
      tagline: 'Pañales, leche, salud',
      color: '#2C70B8',
      isCustom: false,
    },
    {
      id: 'mascota',
      name: 'Mascota',
      icon: '🐾',
      amount: mascotaAmount,
      tagline: 'Veterinario y comida',
      color: '#0C9647',
      isCustom: false,
    },
    {
      id: 'transporte',
      name: 'Transporte',
      icon: '🚗',
      amount: transporteAmount,
      tagline: 'Metro, TAG, bencina',
      color: '#FDD700',
      isCustom: false,
    },
    {
      id: 'colegio',
      name: 'Colegio',
      icon: '🎓',
      amount: colegioAmount,
      tagline: 'Matrícula y libros',
      color: '#EF3942',
      isCustom: false,
    },
    {
      id: 'hogarSuper',
      name: 'Hogar / Super',
      icon: '🛒',
      amount: hogarSuperAmount,
      tagline: 'Canasta y despensa',
      color: '#6366F1',
      isCustom: false,
    },
    {
      id: 'saludGym',
      name: 'Salud / Gym',
      icon: '🏋️',
      amount: saludGymAmount,
      tagline: 'Deporte y medicina',
      color: '#10B981',
      isCustom: false,
    },
    {
      id: 'ocio',
      name: 'Ocio / Salidas',
      icon: '🍿',
      amount: ocioAmount,
      tagline: 'Streaming y cafés',
      color: '#F59E0B',
      isCustom: false,
    },
    ...customExpenses.map((exp) => ({
      id: exp.id,
      name: exp.name,
      icon: exp.icon,
      amount: exp.amount,
      tagline: exp.category,
      color: '#8B5CF6',
      isCustom: true,
    })),
  ];

  const currentSelectedCategory =
    categoriesList.find((cat) => cat.id === selectedCategoryId) || categoriesList[0];

  return (
    <div className="space-y-4 pb-20">
      {/* Main Module Header: Gastos con Iconografía de Gastos / Monedas */}
      <div>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-[#EBF6EE] text-[#0C9647] flex items-center justify-center shadow-xs border border-[#C5E8CE]">
            <Coins className="w-5 h-5 text-[#0C9647]" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Gastos</h1>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BANNER SUPERIOR: SELECTOR PARA ELEGIR QUÉ GASTO VER EN GRANDE
          (Solicitado explícitamente por el usuario)
      ========================================================================= */}
      <div className="bg-white rounded-3xl p-3.5 border border-[#E5EAF0] shadow-[0_2px_12px_rgba(15,23,42,0.04)] space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2C70B8] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2C70B8]"></span>
            </span>
            <span className="text-[11px] font-black uppercase tracking-wide text-slate-700">
              Elige qué gasto ver en grande
            </span>
          </div>
          <span className="text-[10px] font-bold text-[#2C70B8] bg-white px-2.5 py-0.5 rounded-full border border-[#D0E2F3] flex items-center gap-1 shadow-2xs">
            <Eye className="w-3 h-3 text-[#2C70B8]" />
            <span>Viendo: {currentSelectedCategory.name}</span>
          </span>
        </div>

        {/* Carrusel Horizontal de Gastos para el Banner */}
        <div className="flex gap-2.5 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar scroll-smooth">
          {categoriesList.map((cat) => {
            const isSelected = selectedCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`flex-shrink-0 min-w-[125px] p-2.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#2C70B8] shadow-md ring-2 ring-[#2C70B8]/25 scale-[1.02]'
                    : 'bg-white/85 hover:bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xl leading-none">{cat.icon}</span>
                  {isSelected ? (
                    <span className="text-[9px] font-black text-white bg-[#2C70B8] px-1.5 py-0.5 rounded-full shadow-2xs">
                      En grande
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400">Ver</span>
                  )}
                </div>
                <p className="text-xs font-bold text-slate-900 truncate">{cat.name}</p>
                <p className="text-xs font-mono font-black text-[#2C70B8] mt-0.5">
                  ${cat.amount.toLocaleString('es-CL')}
                </p>
                <span className="text-[9px] text-slate-400 font-medium block truncate mt-0.5">
                  {cat.tagline}
                </span>
              </button>
            );
          })}

          {/* Botón rápido para agregar gasto directamente en el banner */}
          <button
            onClick={() => setIsAddingExpense(true)}
            className="flex-shrink-0 min-w-[110px] p-2.5 rounded-2xl border-2 border-dashed border-[#2C70B8]/40 hover:border-[#2C70B8] bg-white/60 hover:bg-white text-slate-600 hover:text-[#2C70B8] flex flex-col items-center justify-center gap-1 transition-all cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-[#2C70B8]/10 flex items-center justify-center text-[#2C70B8]">
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="text-[10px] font-bold text-center leading-tight">
              + Agregar gasto
            </span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          SECCIÓN "VER EN GRANDE" (HERO SPOTLIGHT DE LA CATEGORÍA SELECCIONADA)
      ========================================================================= */}
      <div className="space-y-3">
        {/* Banner indicador del modo Ver en Grande */}
        <div className="flex items-center px-1">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#2C70B8]" />
            <h2 className="text-xs font-black text-slate-900 uppercase tracking-wide">
              Detalle en Grande · {currentSelectedCategory.name}
            </h2>
          </div>
        </div>

        {/* 1. CASO BEBÉ EN GRANDE */}
        {selectedCategoryId === 'bebe' && (
          <div className="space-y-3">
            {/* Hero Visual Card: Baby Bottle with Measurement Level Pins */}
            <IllustrationBabyBottle items={bottlePins} />

            {/* Tarjeta de Cifra Enorme y Desglose Bebé */}
            <div className="bg-white rounded-3xl p-4 border border-[#E5EAF0] shadow-[0_2px_12px_rgba(15,23,42,0.04)] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    Total Mensual Bebé
                  </span>
                  <p className="text-2xl font-black font-mono text-slate-900 leading-tight">
                    $ {totalBebe.toLocaleString('es-CL')}
                  </p>
                </div>
                <button
                  onClick={() => setIsEditingBaby(!isEditingBaby)}
                  className="px-3 py-1.5 bg-[#F0F6FC] hover:bg-[#E1EFFE] text-[#2C70B8] border border-[#D0E2F3] rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  {isEditingBaby ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#0C9647]" />
                      <span className="text-[#0C9647]">Listo</span>
                    </>
                  ) : (
                    <>
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Editar montos</span>
                    </>
                  )}
                </button>
              </div>

              {/* Lista editable de ítems del bebé */}
              <div className="divide-y divide-slate-100 pt-1">
                <div className="py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">🩲</span>
                    <span className="text-xs font-bold text-slate-800">Pañales y toallitas</span>
                  </div>
                  {isEditingBaby ? (
                    <input
                      type="number"
                      step="5000"
                      value={panalesAseo}
                      onChange={(e) => setPanalesAseo(Number(e.target.value) || 0)}
                      className="w-28 text-right px-2 py-1 text-xs font-mono font-bold border border-slate-300 rounded-lg"
                    />
                  ) : (
                    <span className="text-xs font-mono font-bold text-slate-900">
                      $ {panalesAseo.toLocaleString('es-CL')}
                    </span>
                  )}
                </div>

                <div className="py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">🍼</span>
                    <span className="text-xs font-bold text-slate-800">Alimentación y fórmula</span>
                  </div>
                  {isEditingBaby ? (
                    <input
                      type="number"
                      step="5000"
                      value={alimentacion}
                      onChange={(e) => setAlimentacion(Number(e.target.value) || 0)}
                      className="w-28 text-right px-2 py-1 text-xs font-mono font-bold border border-slate-300 rounded-lg"
                    />
                  ) : (
                    <span className="text-xs font-mono font-bold text-slate-900">
                      $ {alimentacion.toLocaleString('es-CL')}
                    </span>
                  )}
                </div>

                <div className="py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                      <Heart className="w-3 h-3 fill-red-500" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">Pediatra y vacunas</span>
                  </div>
                  {isEditingBaby ? (
                    <input
                      type="number"
                      step="5000"
                      value={salud}
                      onChange={(e) => setSalud(Number(e.target.value) || 0)}
                      className="w-28 text-right px-2 py-1 text-xs font-mono font-bold border border-slate-300 rounded-lg"
                    />
                  ) : (
                    <span className="text-xs font-mono font-bold text-slate-900">
                      $ {salud.toLocaleString('es-CL')}
                    </span>
                  )}
                </div>

                <div className="py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Shirt className="w-3 h-3" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">Ropa de temporada</span>
                  </div>
                  {isEditingBaby ? (
                    <input
                      type="number"
                      step="5000"
                      value={ropa}
                      onChange={(e) => setRopa(Number(e.target.value) || 0)}
                      className="w-28 text-right px-2 py-1 text-xs font-mono font-bold border border-slate-300 rounded-lg"
                    />
                  ) : (
                    <span className="text-xs font-mono font-bold text-slate-900">
                      $ {ropa.toLocaleString('es-CL')}
                    </span>
                  )}
                </div>

                <div className="py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">🪇</span>
                    <span className="text-xs font-bold text-slate-800">Estimulación y otros</span>
                  </div>
                  {isEditingBaby ? (
                    <input
                      type="number"
                      step="5000"
                      value={juguetesOtros}
                      onChange={(e) => setJuguetesOtros(Number(e.target.value) || 0)}
                      className="w-28 text-right px-2 py-1 text-xs font-mono font-bold border border-slate-300 rounded-lg"
                    />
                  ) : (
                    <span className="text-xs font-mono font-bold text-slate-900">
                      $ {juguetesOtros.toLocaleString('es-CL')}
                    </span>
                  )}
                </div>
              </div>

              {/* Tip de optimización Bci */}
              <div className="p-3 bg-[#EBF6EE] rounded-2xl border border-[#C5E8CE] flex items-center gap-2.5 text-xs text-[#086A32]">
                <ShieldCheck className="w-4 h-4 text-[#0C9647] shrink-0" />
                <p>
                  <strong>Tip de ahorro:</strong> Comprar pañales y fórmula en pack mensual libera hasta <strong>+$25.000/mes</strong> directo al pie de tu vivienda.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 2. CASO MASCOTA EN GRANDE */}
        {selectedCategoryId === 'mascota' && (
          <div className="space-y-3">
            {/* Visual Hero Card Mascota */}
            <div className="relative w-full h-44 bg-gradient-to-r from-[#FAF5EE] via-[#FFF9F2] to-[#FAF5EE] rounded-3xl p-5 border border-[#EDE3D3] flex items-center justify-between overflow-hidden shadow-xs">
              <div className="space-y-1 z-10">
                <span className="text-3xl">🐾</span>
                <h3 className="text-xl font-black text-slate-900">Mascota del Hogar</h3>
                <p className="text-xs text-slate-500 max-w-[210px]">
                  Presupuesto mensual para alimentación, salud y bienestar animal.
                </p>
                <p className="text-xl font-black font-mono text-[#0C9647] pt-1">
                  $ {mascotaAmount.toLocaleString('es-CL')}
                </p>
              </div>
              <div className="w-28 h-28 rounded-full bg-[#0C9647]/10 flex items-center justify-center shrink-0 border border-[#0C9647]/20">
                <Dog className="w-14 h-14 text-[#0C9647]" />
              </div>
            </div>

            {/* Desglose Mascota */}
            <div className="bg-white rounded-3xl p-4 border border-[#E5EAF0] shadow-[0_2px_12px_rgba(15,23,42,0.04)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase">
                  Desglose de Mascota
                </span>
                <button
                  onClick={() => setIsEditingMascota(!isEditingMascota)}
                  className="text-xs font-bold text-[#2C70B8] flex items-center gap-1 hover:underline"
                >
                  {isEditingMascota ? 'Guardar' : 'Editar'}
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {mascotaBreakdown.map((item, idx) => (
                  <div key={item.id} className="py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{item.icon}</span>
                      <span className="text-xs font-bold text-slate-800">{item.label}</span>
                    </div>
                    {isEditingMascota ? (
                      <input
                        type="number"
                        step="5000"
                        value={item.amount}
                        onChange={(e) => {
                          const val = Number(e.target.value) || 0;
                          const next = [...mascotaBreakdown];
                          next[idx].amount = val;
                          setMascotaBreakdown(next);
                          setMascotaAmount(next.reduce((a, b) => a + b.amount, 0));
                        }}
                        className="w-24 text-right px-2 py-1 text-xs font-mono font-bold border border-slate-300 rounded-lg"
                      />
                    ) : (
                      <span className="text-xs font-mono font-bold text-slate-900">
                        $ {item.amount.toLocaleString('es-CL')}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-3 bg-[#F0F6FC] rounded-2xl border border-[#D0E2F3] text-xs text-[#20558D] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2C70B8] shrink-0" />
                <span>Convenio Bci Seguros: 15% de descuento en clínicas veterinarias adheridas.</span>
              </div>
            </div>
          </div>
        )}

        {/* 3. CASO TRANSPORTE EN GRANDE */}
        {selectedCategoryId === 'transporte' && (
          <div className="space-y-3">
            <div className="relative w-full h-44 bg-gradient-to-r from-[#EFF6FF] via-[#F8FAFC] to-[#EFF6FF] rounded-3xl p-5 border border-[#DBEAFE] flex items-center justify-between overflow-hidden shadow-xs">
              <div className="space-y-1 z-10">
                <span className="text-3xl">🚗</span>
                <h3 className="text-xl font-black text-slate-900">Transporte y Movilidad</h3>
                <p className="text-xs text-slate-500 max-w-[210px]">
                  Traslados diarios, combustible, autopistas y red de transporte.
                </p>
                <p className="text-xl font-black font-mono text-[#2C70B8] pt-1">
                  $ {transporteAmount.toLocaleString('es-CL')}
                </p>
              </div>
              <div className="w-28 h-28 rounded-full bg-[#2C70B8]/10 flex items-center justify-center shrink-0 border border-[#2C70B8]/20">
                <Car className="w-14 h-14 text-[#2C70B8]" />
              </div>
            </div>

            <div className="bg-white rounded-3xl p-4 border border-[#E5EAF0] shadow-[0_2px_12px_rgba(15,23,42,0.04)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase">
                  Desglose de Movilidad
                </span>
                <button
                  onClick={() => setIsEditingTransporte(!isEditingTransporte)}
                  className="text-xs font-bold text-[#2C70B8] flex items-center gap-1 hover:underline"
                >
                  {isEditingTransporte ? 'Guardar' : 'Editar'}
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {transporteBreakdown.map((item, idx) => (
                  <div key={item.id} className="py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{item.icon}</span>
                      <span className="text-xs font-bold text-slate-800">{item.label}</span>
                    </div>
                    {isEditingTransporte ? (
                      <input
                        type="number"
                        step="5000"
                        value={item.amount}
                        onChange={(e) => {
                          const val = Number(e.target.value) || 0;
                          const next = [...transporteBreakdown];
                          next[idx].amount = val;
                          setTransporteBreakdown(next);
                          setTransporteAmount(next.reduce((a, b) => a + b.amount, 0));
                        }}
                        className="w-24 text-right px-2 py-1 text-xs font-mono font-bold border border-slate-300 rounded-lg"
                      />
                    ) : (
                      <span className="text-xs font-mono font-bold text-slate-900">
                        $ {item.amount.toLocaleString('es-CL')}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-3 bg-[#EBF6EE] rounded-2xl border border-[#C5E8CE] text-xs text-[#086A32] flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#0C9647] shrink-0" />
                <span>Combinar Metro con caminata permite ahorrar hasta $20.000/mes en combustible.</span>
              </div>
            </div>
          </div>
        )}

        {/* 4. CASO COLEGIO EN GRANDE */}
        {selectedCategoryId === 'colegio' && (
          <div className="space-y-3">
            <div className="relative w-full h-44 bg-gradient-to-r from-[#FEF2F2] via-[#FFF5F5] to-[#FEF2F2] rounded-3xl p-5 border border-[#FEE2E2] flex items-center justify-between overflow-hidden shadow-xs">
              <div className="space-y-1 z-10">
                <span className="text-3xl">🎓</span>
                <h3 className="text-xl font-black text-slate-900">Colegio y Educación</h3>
                <p className="text-xs text-slate-500 max-w-[210px]">
                  Mensualidades escolares, formación continua y útiles.
                </p>
                <p className="text-xl font-black font-mono text-[#EF3942] pt-1">
                  $ {colegioAmount.toLocaleString('es-CL')}
                </p>
              </div>
              <div className="w-28 h-28 rounded-full bg-[#EF3942]/10 flex items-center justify-center shrink-0 border border-[#EF3942]/20">
                <GraduationCap className="w-14 h-14 text-[#EF3942]" />
              </div>
            </div>

            <div className="bg-white rounded-3xl p-4 border border-[#E5EAF0] shadow-[0_2px_12px_rgba(15,23,42,0.04)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase">
                  Desglose de Educación
                </span>
                <button
                  onClick={() => setIsEditingColegio(!isEditingColegio)}
                  className="text-xs font-bold text-[#2C70B8] flex items-center gap-1 hover:underline"
                >
                  {isEditingColegio ? 'Guardar' : 'Editar'}
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {colegioBreakdown.map((item, idx) => (
                  <div key={item.id} className="py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{item.icon}</span>
                      <span className="text-xs font-bold text-slate-800">{item.label}</span>
                    </div>
                    {isEditingColegio ? (
                      <input
                        type="number"
                        step="5000"
                        value={item.amount}
                        onChange={(e) => {
                          const val = Number(e.target.value) || 0;
                          const next = [...colegioBreakdown];
                          next[idx].amount = val;
                          setColegioBreakdown(next);
                          setColegioAmount(next.reduce((a, b) => a + b.amount, 0));
                        }}
                        className="w-24 text-right px-2 py-1 text-xs font-mono font-bold border border-slate-300 rounded-lg"
                      />
                    ) : (
                      <span className="text-xs font-mono font-bold text-slate-900">
                        $ {item.amount.toLocaleString('es-CL')}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 5. CASO HOGAR / SUPERMERCADO EN GRANDE */}
        {selectedCategoryId === 'hogarSuper' && (
          <div className="space-y-3">
            <div className="relative w-full h-44 bg-gradient-to-r from-[#EEF2FF] via-[#F8FAFF] to-[#EEF2FF] rounded-3xl p-5 border border-[#E0E7FF] flex items-center justify-between overflow-hidden shadow-xs">
              <div className="space-y-1 z-10">
                <span className="text-3xl">🛒</span>
                <h3 className="text-xl font-black text-slate-900">Hogar y Despensa</h3>
                <p className="text-xs text-slate-500 max-w-[210px]">
                  Alimentación de la casa, compras de supermercado y limpieza.
                </p>
                <p className="text-xl font-black font-mono text-[#6366F1] pt-1">
                  $ {hogarSuperAmount.toLocaleString('es-CL')}
                </p>
              </div>
              <div className="w-28 h-28 rounded-full bg-[#6366F1]/10 flex items-center justify-center shrink-0 border border-[#6366F1]/20">
                <ShoppingBag className="w-14 h-14 text-[#6366F1]" />
              </div>
            </div>

            <div className="bg-white rounded-3xl p-4 border border-[#E5EAF0] shadow-[0_2px_12px_rgba(15,23,42,0.04)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase">
                  Desglose del Supermercado
                </span>
                <button
                  onClick={() => setIsEditingHogarSuper(!isEditingHogarSuper)}
                  className="text-xs font-bold text-[#2C70B8] flex items-center gap-1 hover:underline"
                >
                  {isEditingHogarSuper ? 'Guardar' : 'Editar'}
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {hogarSuperBreakdown.map((item, idx) => (
                  <div key={item.id} className="py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{item.icon}</span>
                      <span className="text-xs font-bold text-slate-800">{item.label}</span>
                    </div>
                    {isEditingHogarSuper ? (
                      <input
                        type="number"
                        step="5000"
                        value={item.amount}
                        onChange={(e) => {
                          const val = Number(e.target.value) || 0;
                          const next = [...hogarSuperBreakdown];
                          next[idx].amount = val;
                          setHogarSuperBreakdown(next);
                          setHogarSuperAmount(next.reduce((a, b) => a + b.amount, 0));
                        }}
                        className="w-24 text-right px-2 py-1 text-xs font-mono font-bold border border-slate-300 rounded-lg"
                      />
                    ) : (
                      <span className="text-xs font-mono font-bold text-slate-900">
                        $ {item.amount.toLocaleString('es-CL')}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 6. CASO SALUD / GYM EN GRANDE */}
        {selectedCategoryId === 'saludGym' && (
          <div className="space-y-3">
            <div className="relative w-full h-44 bg-gradient-to-r from-[#ECFDF5] via-[#F6FEFA] to-[#ECFDF5] rounded-3xl p-5 border border-[#D1FAE5] flex items-center justify-between overflow-hidden shadow-xs">
              <div className="space-y-1 z-10">
                <span className="text-3xl">🏋️</span>
                <h3 className="text-xl font-black text-slate-900">Salud y Deporte</h3>
                <p className="text-xs text-slate-500 max-w-[210px]">
                  Gimnasio, medicina preventiva y bienestar personal.
                </p>
                <p className="text-xl font-black font-mono text-[#10B981] pt-1">
                  $ {saludGymAmount.toLocaleString('es-CL')}
                </p>
              </div>
              <div className="w-28 h-28 rounded-full bg-[#10B981]/10 flex items-center justify-center shrink-0 border border-[#10B981]/20">
                <Dumbbell className="w-14 h-14 text-[#10B981]" />
              </div>
            </div>

            <div className="bg-white rounded-3xl p-4 border border-[#E5EAF0] shadow-[0_2px_12px_rgba(15,23,42,0.04)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase">
                  Desglose Salud & Fitness
                </span>
                <button
                  onClick={() => setIsEditingSaludGym(!isEditingSaludGym)}
                  className="text-xs font-bold text-[#2C70B8] flex items-center gap-1 hover:underline"
                >
                  {isEditingSaludGym ? 'Guardar' : 'Editar'}
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {saludGymBreakdown.map((item, idx) => (
                  <div key={item.id} className="py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{item.icon}</span>
                      <span className="text-xs font-bold text-slate-800">{item.label}</span>
                    </div>
                    {isEditingSaludGym ? (
                      <input
                        type="number"
                        step="5000"
                        value={item.amount}
                        onChange={(e) => {
                          const val = Number(e.target.value) || 0;
                          const next = [...saludGymBreakdown];
                          next[idx].amount = val;
                          setSaludGymBreakdown(next);
                          setSaludGymAmount(next.reduce((a, b) => a + b.amount, 0));
                        }}
                        className="w-24 text-right px-2 py-1 text-xs font-mono font-bold border border-slate-300 rounded-lg"
                      />
                    ) : (
                      <span className="text-xs font-mono font-bold text-slate-900">
                        $ {item.amount.toLocaleString('es-CL')}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 7. CASO OCIO / SALIDAS EN GRANDE */}
        {selectedCategoryId === 'ocio' && (
          <div className="space-y-3">
            <div className="relative w-full h-44 bg-gradient-to-r from-[#FFFBEB] via-[#FEFCE8] to-[#FFFBEB] rounded-3xl p-5 border border-[#FEF08A] flex items-center justify-between overflow-hidden shadow-xs">
              <div className="space-y-1 z-10">
                <span className="text-3xl">🍿</span>
                <h3 className="text-xl font-black text-slate-900">Ocio y Suscripciones</h3>
                <p className="text-xs text-slate-500 max-w-[210px]">
                  Plataformas de streaming, cine, comidas y entretenimiento.
                </p>
                <p className="text-xl font-black font-mono text-amber-700 pt-1">
                  $ {ocioAmount.toLocaleString('es-CL')}
                </p>
              </div>
              <div className="w-28 h-28 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20">
                <Film className="w-14 h-14 text-amber-600" />
              </div>
            </div>

            <div className="bg-white rounded-3xl p-4 border border-[#E5EAF0] shadow-[0_2px_12px_rgba(15,23,42,0.04)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase">
                  Desglose de Ocio
                </span>
                <button
                  onClick={() => setIsEditingOcio(!isEditingOcio)}
                  className="text-xs font-bold text-[#2C70B8] flex items-center gap-1 hover:underline"
                >
                  {isEditingOcio ? 'Guardar' : 'Editar'}
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {ocioBreakdown.map((item, idx) => (
                  <div key={item.id} className="py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{item.icon}</span>
                      <span className="text-xs font-bold text-slate-800">{item.label}</span>
                    </div>
                    {isEditingOcio ? (
                      <input
                        type="number"
                        step="5000"
                        value={item.amount}
                        onChange={(e) => {
                          const val = Number(e.target.value) || 0;
                          const next = [...ocioBreakdown];
                          next[idx].amount = val;
                          setOcioBreakdown(next);
                          setOcioAmount(next.reduce((a, b) => a + b.amount, 0));
                        }}
                        className="w-24 text-right px-2 py-1 text-xs font-mono font-bold border border-slate-300 rounded-lg"
                      />
                    ) : (
                      <span className="text-xs font-mono font-bold text-slate-900">
                        $ {item.amount.toLocaleString('es-CL')}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 8. CASO GASTO PERSONALIZADO EN GRANDE */}
        {currentSelectedCategory.isCustom && (
          <div className="space-y-3">
            <div className="relative w-full h-44 bg-gradient-to-r from-[#FAF5FF] via-[#FDF4FF] to-[#FAF5FF] rounded-3xl p-5 border border-[#F3E8FF] flex items-center justify-between overflow-hidden shadow-xs">
              <div className="space-y-1 z-10">
                <span className="text-3xl">{currentSelectedCategory.icon}</span>
                <h3 className="text-xl font-black text-slate-900 truncate max-w-[210px]">
                  {currentSelectedCategory.name}
                </h3>
                <p className="text-xs text-slate-500 max-w-[210px]">
                  {currentSelectedCategory.tagline}
                </p>
                <p className="text-xl font-black font-mono text-purple-700 pt-1">
                  $ {currentSelectedCategory.amount.toLocaleString('es-CL')}
                </p>
              </div>
              <div className="w-24 h-24 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0 border border-purple-500/20 text-3xl">
                {currentSelectedCategory.icon}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-4 border border-[#E5EAF0] shadow-[0_2px_12px_rgba(15,23,42,0.04)] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  Categoría Personalizada
                </span>
                <span className="text-xs font-bold text-slate-800">
                  {currentSelectedCategory.name}
                </span>
              </div>
              <button
                onClick={() => handleDeleteCustomExpense(currentSelectedCategory.id)}
                className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Eliminar gasto</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          RESUMEN CONSOLIDADO: TOTAL GENERAL Y BARRA MULTI-SEGMENTO
      ========================================================================= */}
      <div className="bg-white rounded-3xl p-4 border border-[#E5EAF0] shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
              Total Consolidado Mensual
            </span>
            <p className="text-2xl font-black font-mono text-slate-900 leading-none mt-0.5">
              $ {totalGeneralGastos.toLocaleString('es-CL')}
            </p>
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0C9647] bg-[#EBF6EE] px-2.5 py-1 rounded-full border border-[#C5E8CE] shadow-2xs">
            <TrendingUp className="w-3.5 h-3.5" />
            Presupuesto al día
          </span>
        </div>

        {/* Barra de progreso multi-segmento con los colores de los gastos */}
        <div className="w-full h-3.5 rounded-full overflow-hidden flex gap-0.5 mt-3 bg-slate-100 p-0.5 border border-slate-200/60">
          <div
            className="h-full bg-[#2C70B8] rounded-l-full transition-all"
            style={{ width: `${(totalBebe / (totalGeneralGastos || 1)) * 100}%` }}
            title={`Bebé: $${totalBebe.toLocaleString('es-CL')}`}
          />
          <div
            className="h-full bg-[#0C9647] transition-all"
            style={{ width: `${(mascotaAmount / (totalGeneralGastos || 1)) * 100}%` }}
            title={`Mascota: $${mascotaAmount.toLocaleString('es-CL')}`}
          />
          <div
            className="h-full bg-[#FDD700] transition-all"
            style={{ width: `${(transporteAmount / (totalGeneralGastos || 1)) * 100}%` }}
            title={`Transporte: $${transporteAmount.toLocaleString('es-CL')}`}
          />
          <div
            className="h-full bg-[#EF3942] transition-all"
            style={{ width: `${(colegioAmount / (totalGeneralGastos || 1)) * 100}%` }}
            title={`Colegio: $${colegioAmount.toLocaleString('es-CL')}`}
          />
          <div
            className="h-full bg-[#6366F1] transition-all"
            style={{ width: `${(hogarSuperAmount / (totalGeneralGastos || 1)) * 100}%` }}
            title={`Hogar/Super: $${hogarSuperAmount.toLocaleString('es-CL')}`}
          />
          <div
            className="h-full bg-[#10B981] transition-all"
            style={{ width: `${(saludGymAmount / (totalGeneralGastos || 1)) * 100}%` }}
            title={`Salud: $${saludGymAmount.toLocaleString('es-CL')}`}
          />
          <div
            className="h-full bg-[#F59E0B] rounded-r-full transition-all"
            style={{ width: `${((ocioAmount + totalCustom) / (totalGeneralGastos || 1)) * 100}%` }}
            title={`Ocio y otros: $${(ocioAmount + totalCustom).toLocaleString('es-CL')}`}
          />
        </div>
      </div>

      {/* =========================================================================
          GESTIÓN Y AGREGAR NUEVOS GASTOS DEL HOGAR (22 - 38 AÑOS)
      ========================================================================= */}
      <div className="bg-white rounded-3xl p-4 border border-[#E5EAF0] shadow-[0_2px_12px_rgba(15,23,42,0.04)] space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            Agregar Otros Gastos del Hogar
          </h2>

          <button
            onClick={() => setIsAddingExpense(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2C70B8] hover:bg-[#20558D] text-white rounded-2xl text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
              <Plus className="w-3 h-3 stroke-[3]" />
            </div>
            <span>+ Agregar</span>
          </button>
        </div>

        {/* Modal / Card desplegable para agregar gasto */}
        {isAddingExpense && (
          <div className="p-3 bg-[#F0F6FC] rounded-2xl border border-[#D0E2F3] space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-[#2C70B8] uppercase text-[10px] flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" />
                <span>Nuevo Gasto Mensual</span>
              </span>
              <button
                onClick={() => setIsAddingExpense(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Selector de Categorías (Pills de decisión rápida) */}
            <div>
              <label className="text-[10px] font-bold text-slate-600 block mb-1">
                Categoría Sugerida
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {PRESET_CATEGORIES.map((cat) => (
                  <button
                    key={cat.label}
                    type="button"
                    onClick={() => {
                      setNewCategory(cat.label);
                      if (!newName) setNewName(cat.defaultName);
                      setNewAmount(cat.defaultAmount);
                    }}
                    className={`p-2 rounded-xl text-left border flex flex-col justify-between transition-all ${
                      newCategory === cat.label
                        ? 'bg-white border-[#2C70B8] ring-2 ring-blue-100 font-bold'
                        : 'bg-white/80 border-slate-200 text-slate-700 hover:bg-white'
                    }`}
                  >
                    <span className="text-base">{cat.icon}</span>
                    <span className="text-[10px] leading-tight mt-1">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-bold text-slate-600 block mb-0.5">
                  Descripción
                </label>
                <input
                  type="text"
                  placeholder="Ej: Veterinario / Metro"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 block mb-0.5">
                  Monto mensual ($ CLP)
                </label>
                <input
                  type="number"
                  step="5000"
                  value={newAmount}
                  onChange={(e) => setNewAmount(Number(e.target.value) || 0)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-800 text-right"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsAddingExpense(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200/60 rounded-xl cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleAddExpense}
                className="px-3.5 py-1.5 bg-[#0C9647] hover:bg-[#087336] text-white rounded-xl font-bold text-xs shadow-xs cursor-pointer"
              >
                Guardar y ver en grande
              </button>
            </div>
          </div>
        )}

        {/* Lista de gastos con acción rápida para verlos en grande */}
        <div className="divide-y divide-slate-100">
          {categoriesList.map((cat) => (
            <div
              key={cat.id}
              className="py-2.5 flex items-center justify-between hover:bg-slate-50/60 px-1 rounded-xl transition-colors cursor-pointer"
              onClick={() => setSelectedCategoryId(cat.id)}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{cat.icon}</span>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-800">
                      {cat.name}
                    </span>
                    {selectedCategoryId === cat.id && (
                      <span className="text-[9px] font-bold bg-[#EBF6EE] text-[#0C9647] px-1.5 py-0.2 rounded-full">
                        En grande
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {cat.tagline}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-slate-900">
                  $ {cat.amount.toLocaleString('es-CL')}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Also export as ExpensesModule for semantic clarity
export const ExpensesModule = BabyModule;
