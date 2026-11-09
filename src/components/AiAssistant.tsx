import React, { useState, useRef, useEffect } from 'react';
import { useFinancial } from '../context/FinancialContext';
import { AIProposal } from '../types';
import {
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Bot,
  Building,
  Check,
  Calculator,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

interface AiAssistantProps {
  onBack?: () => void;
}

interface DiagnosticData {
  summary: string;
  que: string;
  como: string;
  cuando: string;
  donde: string;
  pros?: string[];
  contras?: string[];
}

interface MessageItem {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  time: string;
  diagnostic?: DiagnosticData;
  proposal?: AIProposal;
  quickReplies?: string[];
}

// Carousel component to display the 4 quantitative questions + Beneficios detectados
const DiagnosticCarousel: React.FC<{ diagnostic: DiagnosticData; onAskAboutQuestion?: (topic: string) => void }> = ({
  diagnostic,
  onAskAboutQuestion,
}) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const defaultBenefits = [
    'Optimización directa hacia tu pie hipotecario.',
    'Mejora tu relación de endeudamiento ante Banco BCI.',
    'Acelera el cumplimiento de tu meta crediticia.',
  ];

  const benefitsList = (diagnostic.pros && diagnostic.pros.length > 0) ? diagnostic.pros : defaultBenefits;

  const slides = [
    {
      id: 'que',
      type: 'question',
      title: '¿Qué cambia en tus finanzas?',
      content: diagnostic.que,
      badge: 'Variable clave',
      color: '#2C70B8',
      bg: '#F0F6FC',
      border: '#D0E2F3',
    },
    {
      id: 'como',
      type: 'question',
      title: '¿Cómo impacta tu meta de ahorro?',
      content: diagnostic.como,
      badge: 'Cálculo matemático',
      color: '#0C9647',
      bg: '#EBF6EE',
      border: '#C5E8CE',
    },
    {
      id: 'cuando',
      type: 'question',
      title: '¿Cuándo se refleja ante Banco BCI?',
      content: diagnostic.cuando,
      badge: 'Momento de evaluación',
      color: '#D97706',
      bg: '#FEF8EE',
      border: '#FDE68A',
    },
    {
      id: 'donde',
      type: 'question',
      title: '¿Dónde existe margen en tus números?',
      content: diagnostic.donde,
      badge: 'Distribución',
      color: '#7C3AED',
      bg: '#F5F3FF',
      border: '#DDD6FE',
    },
    {
      id: 'beneficios',
      type: 'benefits',
      title: 'Beneficios detectados',
      benefits: benefitsList,
      badge: 'Ventajas BCI',
      color: '#0C9647',
      bg: '#EBF6EE',
      border: '#C5E8CE',
    },
  ];

  const currentSlide = slides[currentCardIndex];

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 40;

  const handleNext = () => {
    setCurrentCardIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentCardIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-[#E5EAF0] shadow-[0_2px_8px_rgba(15,23,42,0.04)] p-4 space-y-3.5">
      {/* Header con título ampliado y sin contadores numéricos */}
      <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
        <div className="w-8 h-8 rounded-xl bg-[#EBF6EE] text-[#0C9647] flex items-center justify-center shrink-0 border border-[#C5E8CE]">
          <Calculator className="w-4 h-4 text-[#0C9647]" />
        </div>
        <h4 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
          Diagnóstico cuantitativo
        </h4>
      </div>

      {/* Resumen principal del diagnóstico */}
      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
        <p className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
          {diagnostic.summary}
        </p>
      </div>

      {/* Tarjeta del Carrusel (Una por vez en grande con soporte para swipe táctil) */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="p-4 rounded-2xl border-2 transition-all space-y-2 relative touch-pan-y"
        style={{ backgroundColor: currentSlide.bg, borderColor: currentSlide.border }}
      >
        <div className="flex items-center justify-between">
          <span
            className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white shadow-2xs"
            style={{ color: currentSlide.color }}
          >
            {currentSlide.badge}
          </span>
        </div>

        <h5 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
          {currentSlide.title}
        </h5>

        {currentSlide.type === 'question' ? (
          <>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium pt-0.5">
              {currentSlide.content}
            </p>
            {onAskAboutQuestion && (
              <button
                onClick={() => onAskAboutQuestion(`Quiero profundizar sobre: ${currentSlide.title}`)}
                className="mt-2 text-xs font-bold flex items-center gap-1 hover:underline cursor-pointer"
                style={{ color: currentSlide.color }}
              >
                <span>Preguntar más sobre este punto</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </>
        ) : (
          /* Slide de Beneficios Detectados */
          <div className="pt-1 space-y-2">
            <ul className="space-y-1.5">
              {currentSlide.benefits?.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 font-semibold leading-snug">
                  <CheckCircle2 className="w-4 h-4 text-[#0C9647] shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Controles de Navegación del Carrusel + Dots (Sin contadores innecesarios) */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={handlePrev}
          className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Anterior</span>
        </button>

        {/* Dots discretos para alternar entre las 5 tarjetas */}
        <div className="flex items-center gap-1.5">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentCardIndex(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === currentCardIndex ? 'w-6 bg-slate-900' : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Ver ${s.title}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="px-3.5 py-1.5 bg-[#2C70B8] hover:bg-[#20558D] text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>Siguiente</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export const AiAssistant: React.FC<AiAssistantProps> = ({ onBack }) => {
  const {
    userName,
    currentRent,
    monthlySavingsCapacity,
    downPaymentGoal,
    savings,
    babyExpensesTotal,
    totalIncome,
    totalExpenses,
    applyProposal,
  } = useFinancial();

  const [inputVal, setInputVal] = useState('');
  const [appliedSimulationId, setAppliedSimulationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initial messages flow with concise, natural and direct responses
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: 'm1',
      role: 'user',
      text: '¿Qué pasaría si me cambio a un arriendo de 500 mil pesos?',
      time: '9:41',
    },
    {
      id: 'm2',
      role: 'assistant',
      text: `Hola ${userName}. Si optimizas tu arriendo a $500.000, liberas $100.000 adicionales cada mes. Esto duplica tu ritmo de ahorro hacia el pie de tu crédito hipotecario Banco BCI.\n\nRevisa el diagnóstico cuantitativo a continuación con los 4 pilares clave:`,
      time: '9:41',
      diagnostic: {
        summary: 'Ajuste de arriendo de $600.000 a $500.000 (+ $100.000/mes de ahorro).',
        que: 'Tu carga fija de arriendo desciende del 30% al 25% de tus ingresos, alineándose con el estándar óptimo de Banco BCI.',
        como: 'Tu ahorro mensual pasa de $150.000 a $250.000. Reduces en 24 meses la llegada a tu meta de pie.',
        cuando: 'Impacta directamente en la precalificación de solvencia crediticia y dividendo.',
        donde: 'En tu presupuesto mensual de vivienda (ahorras $1.200.000 extra al año).',
        pros: [
          'Ahorro adicional de $1.200.000 al año para tu pie.',
          'Mejor relación carga/ingreso ante Banco BCI.',
        ],
        contras: [
          'Considerar costos iniciales de garantía y mudanza.',
        ],
      },
      proposal: {
        type: 'rent',
        title: 'Simulación de arriendo',
        description: '',
        oldValue: 600000,
        newValue: 500000,
        monthlyDifference: 100000,
        newMonthlySavings: 250000,
        newMonthsToGoal: 66,
        diffMonths: 24,
      },
      quickReplies: [
        '¿Cómo influye este arriendo en mi dividendo?',
        '¿Cuánto dividendo me recomendaría Banco BCI?',
        '¿Qué impacto tienen los gastos del bebé?',
      ],
    },
  ]);

  const QUICK_PROMPTS = [
    '¿Cómo influye mi arriendo en mi dividendo BCI?',
    '¿Qué impacto tienen los gastos del hogar en mi crédito?',
    '¿Cuánto dividendo puedo pagar con mi ingreso?',
  ];

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || inputVal;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: MessageItem = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages.slice(-6).map((m) => ({ role: m.role, text: m.text })),
          context: {
            name: userName,
            totalIncome,
            currentRent,
            babyExpensesTotal,
            totalExpenses,
            monthlySavingsCapacity,
            accumulatedSavings: savings.accumulatedSavings,
            downPaymentGoal,
            propertyPrice: 100000000,
          },
        }),
      });

      if (!response.ok) throw new Error('Error de conexión');

      const data = await response.json();

      const assistantMsg: MessageItem = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: data.text,
        time: new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }),
        diagnostic: data.diagnostic,
        proposal: data.proposal,
        quickReplies: data.quickReplies,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      // Fallback conciso
      const fallbackMsg: MessageItem = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: `Diagnóstico para ${userName}: Con tus ingresos de $${totalIncome.toLocaleString('es-CL')}, mantener tus gastos ordenados te permite asegurar una cuota de dividendo saludable para tu crédito hipotecario Banco BCI.`,
        time: new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }),
        diagnostic: {
          summary: 'Capacidad de pago y evaluación crediticia BCI.',
          que: 'Tu tasa de ahorro mensual sobre tus ingresos.',
          como: 'Aumentar tu ahorro reduce el plazo y mejora tu perfil comercial ante BCI.',
          cuando: 'Al momento de solicitar tu pre-aprobación hipotecaria.',
          donde: 'En la optimización de arriendo y gastos fijos.',
          pros: ['Flujo mensual estable sin endeudamiento excesivo.'],
          contras: ['Requiere disciplina de ahorro constante.'],
        },
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplySimulation = (prop: AIProposal, msgId: string) => {
    applyProposal(prop);
    setAppliedSimulationId(msgId);
  };

  return (
    <div className="w-full space-y-4 pb-44">
      {/* Top Header del Asesor */}
      <div className="bg-white rounded-2xl p-3.5 border border-[#E5EAF0] flex items-center justify-between shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
        <div className="flex items-center gap-2.5">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1 -ml-1 text-slate-500 hover:text-slate-900 rounded-lg cursor-pointer"
              title="Volver al inicio"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
          )}
          <div className="w-9 h-9 rounded-xl bg-[#EDF4FB] text-[#2C70B8] border border-[#D0E2F3] flex items-center justify-center shrink-0">
            <Bot className="w-5 h-5 text-[#2C70B8]" />
          </div>
          <div>
            <h2 className="text-base font-black text-slate-900 tracking-tight">
              Asesor Analítico BCI
            </h2>
            <p className="text-xs font-semibold text-slate-500">
              Tu tercera opinión financiera
            </p>
          </div>
        </div>
      </div>

      {/* Flujo único de mensajes integrado directamente en la pantalla */}
      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="space-y-3">
            {/* Mensaje del usuario */}
            {msg.role === 'user' && (
              <div className="flex justify-end">
                <div className="bg-[#2C70B8] text-white rounded-2xl rounded-tr-xs px-4 py-3 max-w-[85%] text-xs sm:text-sm font-semibold shadow-xs">
                  <p>{msg.text}</p>
                  <span className="text-[10px] text-blue-200 block text-right mt-1 font-mono">
                    {msg.time}
                  </span>
                </div>
              </div>
            )}

            {/* Mensaje del Asistente */}
            {msg.role === 'assistant' && (
              <div className="flex flex-col gap-2.5 items-start max-w-[96%] sm:max-w-[92%]">
                {/* 1. Texto de la respuesta con tipografía más grande y legible */}
                <div className="bg-white border border-[#E5EAF0] text-slate-800 rounded-2xl rounded-tl-xs p-4 text-xs sm:text-sm shadow-[0_2px_8px_rgba(15,23,42,0.04)] leading-relaxed space-y-2">
                  <div className="whitespace-pre-line text-slate-800 font-medium">
                    {msg.text}
                  </div>
                </div>

                {/* 2. CARRUSEL INTERACTIVO DE LAS 4 PREGUNTAS DEL DIAGNÓSTICO */}
                {msg.diagnostic && (
                  <DiagnosticCarousel
                    diagnostic={msg.diagnostic}
                    onAskAboutQuestion={(topic) => handleSend(topic)}
                  />
                )}

                {/* 3. Simulación de arriendo compacta */}
                {msg.proposal && (
                  <div className="w-full bg-gradient-to-br from-[#F0F6FC] to-[#EBF6EE] rounded-2xl border-2 border-[#2C70B8] p-3.5 shadow-xs space-y-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-white text-[#2C70B8] flex items-center justify-center shadow-2xs border border-[#D0E2F3] shrink-0">
                        <Building className="w-4 h-4 text-[#2C70B8]" />
                      </div>
                      <h4 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                        Simulación de arriendo
                      </h4>
                    </div>

                    {/* Datos numéricos clave en formato compacto */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">
                        <span className="text-[9px] text-slate-500 uppercase font-bold block">Nuevo arriendo</span>
                        <span className="text-xs sm:text-sm font-black font-mono text-[#2C70B8]">
                          ${msg.proposal.newValue.toLocaleString('es-CL')}
                        </span>
                      </div>
                      <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">
                        <span className="text-[9px] text-slate-500 uppercase font-bold block">Liberado / mes</span>
                        <span className="text-xs sm:text-sm font-black font-mono text-[#0C9647]">
                          +${msg.proposal.monthlyDifference.toLocaleString('es-CL')}
                        </span>
                      </div>
                      <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">
                        <span className="text-[9px] text-slate-500 uppercase font-bold block">Aceleración</span>
                        <span className="text-xs sm:text-sm font-black font-mono text-amber-700">
                          -{msg.proposal.diffMonths} meses
                        </span>
                      </div>
                    </div>

                    <div className="pt-0.5">
                      {appliedSimulationId === msg.id ? (
                        <div className="w-full py-2 bg-[#EBF6EE] text-[#086A32] rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold border border-[#C5E8CE]">
                          <Check className="w-3.5 h-3.5 text-[#0C9647]" />
                          <span>Simulación aplicada en tu presupuesto</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleApplySimulation(msg.proposal!, msg.id)}
                          className="w-full py-2.5 bg-[#0C9647] hover:bg-[#097d3b] text-white rounded-xl flex items-center justify-center gap-1.5 text-xs font-black shadow-xs transition-transform active:scale-95 cursor-pointer"
                        >
                          <Calculator className="w-3.5 h-3.5" />
                          <span>Simular este cambio en 1 clic</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2.5 p-3.5 bg-white rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-600 shadow-xs">
            <Bot className="w-4 h-4 text-[#2C70B8] animate-pulse" />
            <span className="font-semibold">Calculando diagnóstico financiero...</span>
          </div>
        )}

        <div ref={messagesEndRef} className="h-2" />
      </div>

      {/* QUICK PROMPTS & CHAT INPUT - Fixed above the bottom navigation */}
      <div className="fixed bottom-[58px] left-0 right-0 max-w-[420px] mx-auto z-30 bg-white border-t border-[#E5EAF0] p-3 shadow-[0_-2px_10px_rgba(15,23,42,0.03)] space-y-2">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
          {QUICK_PROMPTS.map((promptText, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(promptText)}
              className="text-xs font-semibold bg-[#F0F6FC] hover:bg-[#E4EFFB] text-[#2C70B8] border border-[#D0E2F3] px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors active:scale-95 shrink-0 cursor-pointer"
            >
              {promptText}
            </button>
          ))}
        </div>

        {/* High-visibility Input Bar */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pregunta tus dudas financieras aquí..."
            className="flex-1 px-3.5 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-[#2C70B8] rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2C70B8]/20 transition-all font-medium"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputVal.trim() || isLoading}
            className="h-10 px-4 rounded-xl bg-[#2C70B8] hover:bg-[#20558D] disabled:bg-slate-200 disabled:text-slate-400 text-white flex items-center justify-center gap-1 text-xs font-bold transition-all shrink-0 active:scale-95 shadow-xs cursor-pointer"
            title="Enviar mensaje"
          >
            <span>Enviar</span>
            <ArrowUp className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};
