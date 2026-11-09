# HomeInWay: Refinamiento de Interfaz, Iconografía y Experiencia Financiera

Plan de optimización integral para depurar la interfaz de HomeInWay, elevando el contraste de burbujas clave, diferenciando la iconografía entre casa y departamento, integrando la tarjeta de arriendo actual con análisis financiero, permitiendo la adición dinámica de gastos cotidianos para el rango 22-38 años, y rediseñando el acceso al asistente IA analítico.

### User Review & Critical Decisions

> [!IMPORTANT]
> Se han incorporado con precisión las 7 solicitudes del usuario para simplificar visualmente la aplicación, eliminar metadatos técnicos innecesarios y mejorar la legibilidad y operatividad financiera:

- **Inicio (Dashboard)**: Se remueve el encabezado técnico superior del Bloque 1 (`"bloque uno, mesa hipotecaria BCI, departamento Ñuñoa"`), dejando únicamente la pregunta central directa y legible: *"¿Cómo llego a mi meta del 20% para el depto en Ñuñoa?"*.
- **Contraste de Burbujas Flotantes**:
  - *Vivienda*: La burbuja con el monto `$600.000 total vivienda` pasa de fondo translúcido claro a un contenedor oscuro de alto contraste (`bg-slate-900` / carbón con texto blanco nítido y acento Bci), garantizando visibilidad frente a fondos claros.
  - *Ahorro*: La burbuja `$150.000 ahorrado este mes` se actualiza con el mismo tratamiento de alto contraste oscuro (`bg-slate-900 text-white`) para evitar cualquier confusión con el fondo.
- **Iconografía Diferenciada**:
  - *Vivienda*: Casa clásica con geometría cuadrada y techo triangular distintivo (`Home` / silueta clásica).
  - *Arriendos*: Edificio multifamiliar / departamentos en altura (`Building2`).
  - *Asistente IA*: Se reemplaza el robot multicolor por un icono SVG sobrio y limpio (`Bot` / `Sparkles`) uniforme con la barra de navegación.
- **Módulo de Arriendos**: Se retira la etiqueta `"ley de hig"` y se añade bajo las 3 opciones una tarjeta interactiva de **"Tu Arriendo Actual"** que calcula e ilustra el ahorro o pérdida mensual y proyectada hacia el pie hipotecario en comparación con las alternativas.
- **Módulo de Gastos (Bebé + Cotidianos)**:
  - Se eliminan `"optimización BCI"` y `"Estructurado con categorías claras..."`.
  - Se simplifica el título a **"Bebé"** con icono de bebé y gastos con icono monetario.
  - Se añade botón `+` para incorporar categorías de gasto representativas de adultos de 22 a 38 años (Mascota, Transporte, Salud/Gym, Estudio/Colegio, Salidas/Ocio) con montos editables y recálculo automático.
- **Módulo de Ahorro**: Se remueve el texto `"estructurado en tres bloques de decisión hacia tu crédito hipotecario"` y los prefijos `"bloque uno"`, `"bloque dos"`, dejando únicamente títulos claros: *"Pie acumulado"* y *"Convenio preferente"*.
- **Asistente IA**: Se retira `"ley de Miller y Hicks..."` y el botón `"Opciones"`. Se reubica la caja de entrada de chat para que sea visible de inmediato en la parte superior/media de la vista, sin superponerse ni ocultarse tras la barra de navegación.

---

### 1. Overview & Core Concept

- **Qué hace**: Proporciona una suite financiera personal orientada al crédito hipotecario, con una navegación limpia, libre de etiquetas de teoría UX, con alto contraste visual en cifras críticas, comparación transparente de arriendo actual vs. mercado y gestión dinámica de gastos.
- **Público objetivo**: Profesionales y familias jóvenes de 22 a 38 años en Chile evaluando su capacidad crediticia hipotecaria Bci, organizando su ahorro para el pie y controlando gastos fijos (arriendo, hijos, mascotas, transporte).
- **Valor clave**: Claridad numérica inmediata, respeto a la autonomía del usuario, y diagnósticos financieros basados en métricas tangibles sin fricción visual.

---

### 2. User Experience & Visual Design

- **Flujo de Usuario**:
  1. *Dashboard*: Vista limpia sin rótulos superfluos. Tarjeta azul Bci directa con la meta hipotecaria.
  2. *Vivienda*: Ilustración de casa clásica con pin oscuro de alto contraste `$600.000 total vivienda`.
  3. *Arriendos*: Icono de departamentos. 3 alternativas del mercado más panel inferior de "Arriendo Actual" con comparativa de impacto en ahorro para el pie.
  4. *Gastos*: Sección "Bebé" con iconografía dedicada + burbuja `+` para añadir nuevos gastos (ej. Mascota $85.000, Transporte $60.000) recalculando el disponible mensual.
  5. *Ahorro*: Pin de alto contraste `$150.000 ahorrado`, bloques limpios *"Pie acumulado"* y *"Convenio preferente"*.
  6. *Asistente*: Acceso mediante icono SVG minimalista, sin textos accesorios ni menú 'Opciones', con el chat y la barra de mensaje visibles inmediatamente.
- **Paleta y Tipografía**:
  - Fondo global: `#c6c8cf` equilibrado con superficies interiores limpias en blanco y gris suave.
  - Acentos: Azul Bci `#2C70B8`, Verde Ahorro `#0C9647`, Rojo Bci `#EF3942`.
  - Burbujas de alto contraste: `bg-slate-900 text-white font-medium` con indicadores numéricos en fuente tabular (`tabular-nums`).

---

### 3. Key Product Decisions & Trade-Offs

- **Decisión 1: Sustitución de etiquetas metodológicas por claridad directa**
  - *Enfoque*: Remover menciones a "Ley de Hick", "Ley de Miller", "Bloque 1", "Optimización BCI".
  - *Razón*: Las leyes UX deben aplicarse en la arquitectura, no anunciarse al usuario final. El usuario busca información financiera concreta.
- **Decisión 2: Tarjeta de Arriendo Actual dinámica en el comparador**
  - *Enfoque*: Incorporar una tarjeta al pie del comparador con selector de arriendo actual ($420.000 por defecto) que contrasta el diferencial respecto a las opciones mostradas y muestra cuánto capital extra se destinaría al pie hipotecario si se optimiza.
  - *Razón*: Permite al usuario cuantificar de inmediato el costo de oportunidad de su situación habitacional actual.
- **Decisión 3: Extensibilidad de gastos con modal o tarjeta rápida (+)**
  - *Enfoque*: Botón burbuja `+` que despliega selector de categorías populares para jóvenes adultos (Mascota, Transporte, Gimnasio/Salud, Formación, Streaming/Ocio) con monto asignable.
  - *Razón*: Cubre la realidad de usuarios de 22 a 38 años más allá de los gastos parentales.

---

### 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                    HomeInWay App Shell                      │
│     [ Header: Logo HomeInWay | Nav Tab | Feedback Button ]  │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
   ┌───────────▼───────────┐      ┌───────────▼───────────┐
   │    Vistas de Datos    │      │    Asistente IA       │
   ├───────────────────────┤      ├───────────────────────┤
   │ • Dashboard           │      │ • Icono SVG Bot       │
   │ • Vivienda (Casa SVG) │      │ • Input prominente    │
   │ • Arriendos (Deptos)  │      │ • Diagnóstico Bci     │
   │ • Gastos (+ categorías│      │ • Sin textos UX meta  │
   │ • Ahorro (Pie/Convenio│      └───────────────────────┘
   └───────────┬───────────┘
               │
┌──────────────▼──────────────────────────────────────────────┐
│                    Estado Compartido                        │
│ • currentRent ($420.000) & rentSavingsCalculation           │
│ • additionalExpenses (Mascota, Transporte, etc.)            │
│ • accumulatedSavings & monthlyDeposit                       │
└─────────────────────────────────────────────────────────────┘
```

- **Mapeo de Componentes a Modificar**:
  1. `src/components/Dashboard.tsx`: Limpieza de títulos de Bloque 1 en la tarjeta azul.
  2. `src/components/VisualIllustrations.tsx`: Actualización de estilo de pines flotantes en casa y alcancía a `bg-slate-900 text-white`.
  3. `src/components/HousingModule.tsx` y `src/components/MobileNav.tsx`: Diferenciación de iconos (`Home` para Vivienda, `Building2` para Arriendos, `Bot` para Asistente).
  4. `src/components/RentalComparator.tsx`: Eliminación de "ley de hig" y creación de tarjeta "Tu Arriendo Actual".
  5. `src/components/BabyModule.tsx`: Reemplazo de título por "Bebé" con icono + gastos monetarios, y botón `+` para agregar gastos dinámicos.
  6. `src/components/SavingsGoalModule.tsx`: Limpieza de subtítulos y eliminación de prefijos "Bloque uno/dos".
  7. `src/components/AiAssistant.tsx`: Reubicación visual del input de chat, eliminación de opciones y textos accesorios, e icono SVG unificado.
