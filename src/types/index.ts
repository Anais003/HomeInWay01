export interface FamilyMember {
  id: string;
  name: string;
  age: number;
  relation: 'Titular' | 'Pareja' | 'Hijo/a' | 'Otro';
}

export interface IncomeState {
  mainIncome: number;
  partnerIncome: number;
  otherIncome: number;
  variableIncome: number;
}

export interface BabyExpenseItem {
  id: string;
  category: string;
  amount: number;
  iconName?: string;
}

export interface ExpensesState {
  vivienda: number; // Rent + basic home costs
  alimentacion: number;
  transporte: number;
  salud: number;
  bebe: number;
  deudas: number;
  ocio: number;
  servicios: number;
  otros: number;
}

export interface SavingsState {
  accumulatedSavings: number;
  currentMonthlySavings: number;
  emergencyFund: number;
}

export interface HousingGoalState {
  propertyType: 'Departamento' | 'Casa';
  commune: string;
  propertyPrice: number;
  downPaymentPercent: number; // e.g. 20%
  targetYears: number; // e.g. 5
}

export interface RentalOption {
  id: 'option-a' | 'option-b' | 'option-c';
  title: string;
  commune: string;
  rentPrice: number;
  commonExpenses: number;
  bedrooms: number;
  bathrooms: number;
  areaM2: number;
  image: string;
  features: string[];
  petFriendly: boolean;
  familyFriendly: boolean;
  nearMetro: boolean;
  description: string;
}

export interface AIProposal {
  type: 'rent' | 'baby' | 'savings' | 'custom';
  title: string;
  description: string;
  oldValue: number;
  newValue: number;
  monthlyDifference: number; // positive means extra savings
  newMonthlySavings: number;
  newMonthsToGoal: number;
  diffMonths: number;
}

export interface FinancialDiagnostic {
  summary: string;
  que: string; // Qué factor específico incide
  como: string; // Cómo afecta en números concretos
  cuando: string; // Cuándo se refleja en Banco Bci
  donde: string; // Dónde existe margen financiero
  pros: string[]; // Pros medibles para el crédito Bci
  contras: string[]; // Contras o factores que perjudican el crédito Bci
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  diagnostic?: FinancialDiagnostic | null;
  proposal?: AIProposal | null;
  quickReplies?: string[];
  isApplied?: boolean;
  isComparisonCard?: boolean;
  isEvolutionGraph?: boolean;
}
