import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Initialize Gemini SDK with User-Agent telemetry
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Fallback deterministic helper for analytical third-party financial opinion
function generateDeterministicResponse(query: string, context: any) {
  const userName = context?.name || 'Camila';
  const totalIncome = context?.totalIncome || 2000000;
  const currentRent = context?.currentRent || 600000;
  const babyExpenses = context?.babyExpensesTotal || 300000;
  const totalExpenses = context?.totalExpenses || 1850000;
  const monthlySavings = context?.monthlySavings || 150000;
  const accumulatedSavings = context?.accumulatedSavings || 3500000;
  const downPaymentGoal = context?.downPaymentGoal || 20000000;
  const pendingSavings = Math.max(0, downPaymentGoal - accumulatedSavings);
  const monthsToGoal = monthlySavings > 0 ? Math.ceil(pendingSavings / monthlySavings) : Infinity;

  const rentRatio = ((currentRent / totalIncome) * 100).toFixed(1);
  const babyRatio = ((babyExpenses / totalIncome) * 100).toFixed(1);

  const q = query.toLowerCase();

  // Case 1: Rent reduction / changes (Option A $500k, or $550k)
  if (q.includes('arriendo') || q.includes('550') || q.includes('500') || q.includes('alquiler') || q.includes('vivienda') || q.includes('opción a') || q.includes('opcion a')) {
    const targetRent = q.includes('500') ? 500000 : 550000;
    const diff = currentRent - targetRent;
    const newSavings = monthlySavings + diff;
    const newMonths = newSavings > 0 ? Math.ceil(pendingSavings / newSavings) : Infinity;
    const savedMonths = monthsToGoal - newMonths;
    const newRentRatio = ((targetRent / totalIncome) * 100).toFixed(1);

    return {
      text: `Análisis cuantitativo de arriendo para ${userName}:\n\n` +
        `Desde una perspectiva estrictamente financiera y sin interferir en tus prioridades de comodidad o ubicación, un ajuste de arriendo desde $${currentRent.toLocaleString('es-CL')} a $${targetRent.toLocaleString('es-CL')} genera un flujo libre mensual de $${diff.toLocaleString('es-CL')}.\n\n` +
        `• Ratio de arriendo sobre ingreso: desciende del ${rentRatio}% al ${newRentRatio}%.\n` +
        `• Capacidad de ahorro mensual: se incrementa de $${monthlySavings.toLocaleString('es-CL')} a $${newSavings.toLocaleString('es-CL')}.\n` +
        `• Tiempo proyectado para el pie: se reduce de ${monthsToGoal} meses a ${newMonths} meses (ganas ${savedMonths} meses de aceleración).`,
      diagnostic: {
        summary: `Ajuste voluntario de arriendo de $${currentRent.toLocaleString('es-CL')} a $${targetRent.toLocaleString('es-CL')}.`,
        que: `La carga fija de arriendo sobre tus ingresos líquidos pasa de ${rentRatio}% a ${newRentRatio}%, liberando $${diff.toLocaleString('es-CL')}/mes.`,
        como: `Aumenta tu ahorro mensual en un ${((diff / monthlySavings) * 100).toFixed(0)}%, acelerando el pie en ${savedMonths} meses y ampliando tu solvencia bancaria.`,
        cuando: `Incide al momento de la pre-aprobación del crédito hipotecario Banco Bci (los bancos evalúan que el arriendo o dividendo no supere el 25%-30% de tus ingresos).`,
        donde: `En el ítem de arriendo mensual (vivienda actual vs opciones alternativas de mercado).`,
        pros: [
          `Ahorro adicional acumulable de +$${(diff * 12).toLocaleString('es-CL')} por año.`,
          `Mejora tu ratio de carga financiera ante el Banco Bci en un ${(Number(rentRatio) - Number(newRentRatio)).toFixed(1)}%.`,
          `Acorta la llegada a tu pie de ${monthsToGoal} a ${newMonths} meses (${(savedMonths / 12).toFixed(1)} años antes).`,
        ],
        contras: [
          `Requiere evaluar costos únicos iniciales de mudanza y garantía del nuevo inmueble.`,
          `Menor metraje o distinta ubicación según la alternativa habitacional elegida.`,
        ],
      },
      hasProposal: true,
      proposal: {
        type: 'rent',
        title: `Simulación opcional: Arriendo a $${targetRent.toLocaleString('es-CL')}`,
        description: `Libera +$${diff.toLocaleString('es-CL')}/mes hacia tu pie de crédito Bci`,
        oldValue: currentRent,
        newValue: targetRent,
        monthlyDifference: diff,
        newMonthlySavings: newSavings,
        newMonthsToGoal: newMonths,
        diffMonths: savedMonths,
      },
      quickReplies: [
        '¿Cómo influye mi arriendo en mi dividendo Bci?',
        '¿Qué impacto tienen los gastos del bebé en mi crédito?',
        '¿Dónde tengo mayor margen de ahorro según mis números?',
      ],
    };
  }

  // Case 2: Baby expenses
  if (q.includes('bebé') || q.includes('bebe') || q.includes('hijo') || q.includes('gasto bebé')) {
    const delta = 40000;
    const optimizedBaby = Math.max(150000, babyExpenses - delta);
    const newSavings = monthlySavings + delta;
    const newMonths = Math.ceil(pendingSavings / newSavings);
    const savedMonths = monthsToGoal - newMonths;

    return {
      text: `Diagnóstico analítico de gastos del bebé para ${userName}:\n\n` +
        `Tus gastos registrados para tu bebé son de $${babyExpenses.toLocaleString('es-CL')} al mes (un ${babyRatio}% del ingreso).\n\n` +
        `Como tercera opinión financiera objetiva, respetamos al 100% el bienestar y cuidado integral de tu hijo/a. Financieramente, no se sugiere reducir la calidad de cuidado, sino examinar si existen compras recurrentes (pañales, fórmulas, vestuario de rotación rápida) donde compras por volumen o convenios generen una holgura de ~$${delta.toLocaleString('es-CL')}/mes.\n\n` +
        `• Impacto matemático: si se captura esa holgura, el ahorro mensual asciende a $${newSavings.toLocaleString('es-CL')}/mes, adelantando el pie en ${savedMonths} meses.`,
      diagnostic: {
        summary: `Análisis cuantitativo de gastos del bebé ($${babyExpenses.toLocaleString('es-CL')}/mes, ${babyRatio}% del ingreso).`,
        que: `Los gastos de crianza representan el ${babyRatio}% de tu ingreso total, siendo un ítem prioritario y protegido en tu presupuesto.`,
        como: `Una optimización cuantitativa de solo $${delta.toLocaleString('es-CL')}/mes (8%-13% en compras mayoristas) aporta $${(delta * 12).toLocaleString('es-CL')} anuales directos al pie hipotecario.`,
        cuando: `Incide en la demostración de capacidad de ahorro sistemático ante Banco Bci durante los 6 a 12 meses previos a la solicitud del crédito.`,
        donde: `En ítems variables no médicos: pañales por volumen, club de compras y convenios de sala cuna.`,
        pros: [
          `No compromete la salud ni la nutrición de tu bebé.`,
          `Genera $${(delta * 12).toLocaleString('es-CL')} extra al año para el pie sin endeudamiento.`,
          `Demuestra estabilidad presupuestaria y disciplina financiera para la evaluación bancaria.`,
        ],
        contras: [
          `Requiere mayor planificación en compras de reposición mensual.`,
          `Los imprevistos de salud pediátrica pueden requerir reasignación temporal de estos fondos.`,
        ],
      },
      hasProposal: true,
      proposal: {
        type: 'baby',
        title: 'Simulación opcional: Optimización en compras de insumos bebé',
        description: `Holgura matemática de +$${delta.toLocaleString('es-CL')}/mes sin afectar salud`,
        oldValue: babyExpenses,
        newValue: optimizedBaby,
        monthlyDifference: delta,
        newMonthlySavings: newSavings,
        newMonthsToGoal: newMonths,
        diffMonths: savedMonths,
      },
      quickReplies: [
        '¿Dónde tengo mayor margen de ahorro según mis números?',
        '¿Cómo influye mi arriendo en mi dividendo Bci?',
        '¿Cuánto dividendo puedo pagar con mi ingreso?',
      ],
    };
  }

  // Case 3: Credit impact, dividend qualification & Bci metrics
  if (q.includes('dividendo') || q.includes('crédito') || q.includes('credito') || q.includes('hipotecario') || q.includes('banco') || q.includes('bci') || q.includes('bancario') || q.includes('calificar')) {
    const maxBciDividend = Math.round(totalIncome * 0.25); // 25% max burden standard
    const currentSurplus = monthlySavings;

    return {
      text: `Diagnóstico de elegibilidad para Crédito Hipotecario Banco Bci:\n\n` +
        `• Ingreso líquido comprobable: $${totalIncome.toLocaleString('es-CL')}/mes.\n` +
        `• Dividendo máximo referencial Bci (25% del ingreso): hasta $${maxBciDividend.toLocaleString('es-CL')}/mes.\n` +
        `• Meta de pie acumulado (20% del valor de vivienda): $${downPaymentGoal.toLocaleString('es-CL')}.\n` +
        `• Avance actual del pie: $${accumulatedSavings.toLocaleString('es-CL')} (${((accumulatedSavings / downPaymentGoal) * 100).toFixed(1)}% reunido).\n\n` +
        `Como tercera opinión financiera, tu situación demuestra un flujo positivo constante. Lo que más beneficia tu crédito hoy es la consolidación del pie bancario, ya que un pie mayor al 20% reduce directamente la tasa y el dividendo final.`,
      diagnostic: {
        summary: `Evaluación de capacidad crediticia para Hipotecario Banco Bci.`,
        que: `Tu capacidad máxima de pago de dividendo según política bancaria Bci es de $${maxBciDividend.toLocaleString('es-CL')}/mes (25% del ingreso líquido).`,
        como: `Cada $50.000 adicionales aportados al pie disminuyen el monto total financiado, reduciendo el dividendo mensual en aproximadamente $3.800/mes durante 25 años.`,
        cuando: `Incide directamente en el momento del scoring crediticio y la tasa de interés preferencial por ser convenio HomeInWay-Bci.`,
        donde: `En la relación entre tu ahorro acumulado ($${accumulatedSavings.toLocaleString('es-CL')}) y el dividendo proyectado vs tu arriendo actual ($${currentRent.toLocaleString('es-CL')}).`,
        pros: [
          `Capacidad para calificar a dividendos de hasta $${maxBciDividend.toLocaleString('es-CL')}/mes.`,
          `Convenio HomeInWay Bci otorga tasa preferencial y gastos operacionales bonificados.`,
          `Tu arriendo actual ($${currentRent.toLocaleString('es-CL')}) ya demuestra capacidad de pago similar al dividendo estimado.`,
        ],
        contras: [
          `Si el pie reunido es inferior al 20%, el banco requiere financiamiento al 90% con seguros de desgravamen y cesantía más elevados.`,
          `Deudas comerciales o tarjetas de crédito no informadas podrían restar capacidad al 25% disponible.`,
        ],
      },
      hasProposal: false,
      quickReplies: [
        '¿Qué arriendo me conviene para acelerar mi pie?',
        '¿Dónde tengo mayor margen de ahorro según mis números?',
        '¿Qué impacto tienen los gastos del bebé en mi crédito?',
      ],
    };
  }

  // Case 4: Where is the savings margin?
  if (q.includes('margen') || q.includes('donde') || q.includes('dónde') || q.includes('ahorrar') || q.includes('afecta más') || q.includes('afecta mas')) {
    const leisureExpense = 150000;
    return {
      text: `Matriz de margen cuantitativo para el presupuesto de ${userName}:\n\n` +
        `Desglose matemático de distribución del ingreso ($${totalIncome.toLocaleString('es-CL')}):\n` +
        `1. Arriendo actual: $${currentRent.toLocaleString('es-CL')} (${rentRatio}% del total) → Margen de optimización potencial: $50.000 a $100.000/mes.\n` +
        `2. Bebé: $${babyExpenses.toLocaleString('es-CL')} (${babyRatio}% del total) → Margen técnico por compras mayoristas: ~$30.000 a $50.000/mes.\n` +
        `3. Ahorro actual: $${monthlySavings.toLocaleString('es-CL')} (${((monthlySavings / totalIncome) * 100).toFixed(1)}% del total).\n\n` +
        `El ítem con mayor palanca matemática individual hacia el crédito Bci es el arriendo, porque $100.000 liberados equivalen al 66% de tu capacidad de ahorro actual.`,
      diagnostic: {
        summary: `Jerarquía analítica de impacto cuantitativo en tu presupuesto.`,
        que: `El arriendo ($${currentRent.toLocaleString('es-CL')}) es el costo unitario más alto de tu presupuesto, seguido por los gastos del bebé ($${babyExpenses.toLocaleString('es-CL')}).`,
        como: `Un ajuste en arriendo tiene 3 veces más impacto en el pie que cualquier recorte en gastos variables cotidianos.`,
        cuando: `Se capitaliza mes a mes en tu cuenta de ahorro Bci para la conformación del pie.`,
        donde: `En la elección habitacional (comparador de arriendos Opción A vs Opción B).`,
        pros: [
          `Identificar el arriendo como palanca principal evita tener que restringir gastos esenciales familiares o del bebé.`,
          `Moverte a $500.000 duplicaría tu capacidad de ahorro mensual a $250.000/mes.`,
        ],
        contras: [
          `El cambio de vivienda implica evaluar conectividad, cercanía a redes familiares y costo de transporte.`,
        ],
      },
      hasProposal: true,
      proposal: {
        type: 'rent',
        title: 'Simulación opcional: Arriendo optimizado a $500.000',
        description: 'Duplica tu ahorro mensual a $250.000/mes hacia el crédito Bci',
        oldValue: currentRent,
        newValue: 500000,
        monthlyDifference: 100000,
        newMonthlySavings: 250000,
        newMonthsToGoal: Math.ceil(pendingSavings / 250000),
        diffMonths: monthsToGoal - Math.ceil(pendingSavings / 250000),
      },
      quickReplies: [
        '¿Cómo influye mi arriendo en mi dividendo Bci?',
        '¿Qué impacto tienen los gastos del bebé en mi crédito?',
        '¿Cuánto dividendo puedo pagar con mi ingreso?',
      ],
    };
  }

  // Default contextual advice
  return {
    text: `Diagnóstico financiero cuantitativo para ${userName} · Tercera Opinión Analítica:\n\n` +
      `• Ingreso líquido: $${totalIncome.toLocaleString('es-CL')}\n` +
      `• Gastos totales: $${totalExpenses.toLocaleString('es-CL')} (Arriendo: $${currentRent.toLocaleString('es-CL')}, Bebé: $${babyExpenses.toLocaleString('es-CL')})\n` +
      `• Ahorro mensual disponible: $${monthlySavings.toLocaleString('es-CL')}/mes\n` +
      `• Ahorro acumulado actual: $${accumulatedSavings.toLocaleString('es-CL')} (${((accumulatedSavings / downPaymentGoal) * 100).toFixed(1)}% de la meta de pie de $${downPaymentGoal.toLocaleString('es-CL')})\n` +
      `• Plazo proyectado al pie: ${monthsToGoal} meses (${(monthsToGoal / 12).toFixed(1)} años).\n\n` +
      `Este reporte analítico evalúa qué decisiones benefician o perjudican matemáticamente tu perfil de crédito hipotecario Banco Bci, sin juzgar tus decisiones familiares.`,
    diagnostic: {
      summary: `Perfil financiero actual de ${userName} para Crédito Hipotecario Bci.`,
      que: `Tus ingresos de $${totalIncome.toLocaleString('es-CL')} cubren holgadamente tus gastos fijos con un margen de ahorro mensual de $${monthlySavings.toLocaleString('es-CL')}.`,
      como: `Tu ahorro actual proyecta la meta en ${monthsToGoal} meses; optimizaciones opcionales pueden acortar este plazo entre 12 y 36 meses.`,
      cuando: `Al evaluar precalificación hipotecaria y tasa de convenio Bci.`,
      donde: `En la distribución de arriendo ($${currentRent.toLocaleString('es-CL')}), bebé ($${babyExpenses.toLocaleString('es-CL')}) y ahorro activo.`,
      pros: [
        `Flujo de caja mensual positivo sin déficit presupuestario.`,
        `Pie acumulado de $${accumulatedSavings.toLocaleString('es-CL')} listo para rentar en instrumentos de bajo riesgo Bci.`,
        `Capacidad para calificar a dividendo hipotecario Bci de hasta $${Math.round(totalIncome * 0.25).toLocaleString('es-CL')}/mes.`,
      ],
      contras: [
        `El arriendo actual absorbe el ${rentRatio}% del ingreso, lo cual limita la velocidad de completación del pie.`,
      ],
    },
    hasProposal: false,
    quickReplies: [
      '¿Qué arriendo me conviene para acelerar mi pie?',
      '¿Cómo influye mi arriendo en mi dividendo Bci?',
      '¿Qué impacto tienen los gastos del bebé en mi crédito?',
    ],
  };
}

// AI Chat endpoint
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message, context, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'El mensaje es requerido' });
    }

    const userName = context?.name || 'Camila';
    const totalIncome = context?.totalIncome || 2000000;
    const currentRent = context?.currentRent || 600000;
    const babyExpenses = context?.babyExpensesTotal || 300000;
    const totalExpenses = context?.totalExpenses || 1850000;
    const monthlySavings = context?.monthlySavings || 150000;
    const accumulatedSavings = context?.accumulatedSavings || 3500000;
    const downPaymentGoal = context?.downPaymentGoal || 20000000;
    const pendingSavings = Math.max(0, downPaymentGoal - accumulatedSavings);
    const monthsToGoal = monthlySavings > 0 ? Math.ceil(pendingSavings / monthlySavings) : Infinity;

    if (!ai) {
      const fallback = generateDeterministicResponse(message, context);
      return res.json(fallback);
    }

    // Call Gemini 3.8 Flash with concise, direct, accessible analytical advice
    const systemInstruction = `Eres el "Asistente Analítico BCI" en la app HomeInWay.
Tu rol es actuar como una TERCERA OPINIÓN FINANCIERA clara, directa, cercana y constructiva.
Te basas fielmente en los datos numéricos provistos para ayudar al usuario a entender cómo tomar mejores decisiones para su crédito hipotecario Banco BCI (pie y dividendo).

REGLAS DE CONDUCTA Y COMUNICACIÓN (OBLIGATORIAS):
1. RESPUESTAS BREVES Y DIRECTAS: Escribe párrafos cortos y legibles (máximo 2 a 3 párrafos). Ve directo al grano sin rodeos.
2. LENGUAJE CERCANO Y CLARO: Evita tecnicismos bancarios densos. Explica de forma sencilla y humana.
3. CERO JUICIOS: Jamás juzgues ni des opiniones morales sobre prioridades familiares o personales.
4. BASADO 100% EN DATOS REALES: No inventes condiciones, tasas ni beneficios no provistos.
5. LAS 4 PREGUNTAS CLAVE (Qué, Cómo, Cuándo, Dónde):
   - QUÉ: Qué cambia en tus finanzas
   - CÓMO: Cómo impacta en tu ahorro y dividendo
   - CUÁNDO: Cuándo se refleja ante Banco BCI
   - DÓNDE: Dónde existe margen financiero en tus números

DATOS FINANCIEROS DEL USUARIO (${userName}):
- Ingreso líquido total mensual: $${totalIncome.toLocaleString('es-CL')} CLP
- Arriendo actual: $${currentRent.toLocaleString('es-CL')} CLP (${((currentRent / totalIncome) * 100).toFixed(1)}% del ingreso)
- Gastos del bebé: $${babyExpenses.toLocaleString('es-CL')} CLP (${((babyExpenses / totalIncome) * 100).toFixed(1)}% del ingreso)
- Gastos totales mensuales: $${totalExpenses.toLocaleString('es-CL')} CLP
- Capacidad de ahorro mensual: $${monthlySavings.toLocaleString('es-CL')} CLP
- Ahorro acumulado actual: $${accumulatedSavings.toLocaleString('es-CL')} CLP
- Meta de pie vivienda: $${downPaymentGoal.toLocaleString('es-CL')} CLP (${((accumulatedSavings / downPaymentGoal) * 100).toFixed(1)}% completado)
- Saldo pendiente de pie: $${pendingSavings.toLocaleString('es-CL')} CLP
- Meses estimados para alcanzar meta con ahorro actual: ${monthsToGoal} meses (${(monthsToGoal / 12).toFixed(1)} años)

FORMATO DE SALIDA ESTRICTO:
Escribe tu respuesta breve en español amigable y neutro, y al final adjunta los bloques:

<<<DIAGNOSTIC_JSON>>>
{
  "summary": "Resumen claro en 1 línea",
  "que": "Qué variable específica cambia en tus finanzas",
  "como": "Cálculo matemático de impacto cuantitativo claro",
  "cuando": "Momento en que se refleja ante Banco BCI",
  "donde": "Ítem donde existe margen de ahorro",
  "pros": ["Punto a favor claro 1", "Punto a favor claro 2"],
  "contras": ["Punto a considerar o evaluar"]
}
<<<DIAGNOSTIC_JSON>>>

Si propones una simulación cuantitativa opcional con cifras numéricas:
<<<PROPOSAL_JSON>>>
{
  "type": "rent" | "baby" | "savings",
  "title": "Breve título de la simulación opcional",
  "description": "Breve resumen cuantitativo",
  "oldValue": number,
  "newValue": number,
  "monthlyDifference": number,
  "newMonthlySavings": number,
  "newMonthsToGoal": number,
  "diffMonths": number
}
<<<PROPOSAL_JSON>>>

Incluye siempre 3 preguntas sugeridas al final:
<<<QUICK_REPLIES>>>
¿Cómo influye mi arriendo en mi dividendo Bci?|¿Qué impacto tienen los gastos del bebé en mi crédito?|¿Dónde tengo mayor margen de ahorro según mis números?
<<<QUICK_REPLIES>>>`;

    const contents = [
      ...(Array.isArray(history) ? history.map((h: any) => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.text }],
      })) : []),
      {
        role: 'user',
        parts: [{ text: message }],
      },
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.3,
      },
    });

    const rawText = response.text || '';

    // Parse diagnostic, proposal and quick replies
    let parsedText = rawText;
    let diagnostic = null;
    let proposal = null;
    let hasProposal = false;
    let quickReplies = [
      '¿Cómo influye mi arriendo en mi dividendo Bci?',
      '¿Qué impacto tienen los gastos del bebé en mi crédito?',
      '¿Dónde tengo mayor margen de ahorro según mis números?',
    ];

    const diagnosticMatch = rawText.match(/<<<DIAGNOSTIC_JSON>>>([\s\S]*?)<<<DIAGNOSTIC_JSON>>>/);
    if (diagnosticMatch) {
      try {
        diagnostic = JSON.parse(diagnosticMatch[1].trim());
        parsedText = parsedText.replace(/<<<DIAGNOSTIC_JSON>>>[\s\S]*?<<<DIAGNOSTIC_JSON>>>/, '').trim();
      } catch (e) {
        console.error('Error parsing diagnostic JSON:', e);
      }
    }

    const proposalMatch = rawText.match(/<<<PROPOSAL_JSON>>>([\s\S]*?)<<<PROPOSAL_JSON>>>/);
    if (proposalMatch) {
      try {
        proposal = JSON.parse(proposalMatch[1].trim());
        hasProposal = true;
        parsedText = parsedText.replace(/<<<PROPOSAL_JSON>>>[\s\S]*?<<<PROPOSAL_JSON>>>/, '').trim();
      } catch (e) {
        console.error('Error parsing proposal JSON:', e);
      }
    }

    const repliesMatch = rawText.match(/<<<QUICK_REPLIES>>>([\s\S]*?)<<<QUICK_REPLIES>>>/);
    if (repliesMatch) {
      quickReplies = repliesMatch[1]
        .split('|')
        .map((r: string) => r.trim())
        .filter(Boolean);
      parsedText = parsedText.replace(/<<<QUICK_REPLIES>>>[\s\S]*?<<<QUICK_REPLIES>>>/, '').trim();
    }

    // If Gemini didn't output a diagnostic block, use fallback diagnostic generator for complete UI
    if (!diagnostic) {
      const fallback = generateDeterministicResponse(message, context);
      diagnostic = fallback.diagnostic;
      if (!proposal && fallback.proposal) {
        proposal = fallback.proposal;
        hasProposal = fallback.hasProposal;
      }
    }

    return res.json({
      text: parsedText,
      diagnostic,
      hasProposal,
      proposal,
      quickReplies,
    });
  } catch (error: any) {
    console.error('Error in AI chat endpoint:', error);
    // Graceful fallback to deterministic response so the UI always works
    const { message, context } = req.body || {};
    const fallback = generateDeterministicResponse(message || '', context);
    return res.json(fallback);
  }
});

async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`HomeInWay server running on http://0.0.0.0:${port}`);
  });
}

startServer();
