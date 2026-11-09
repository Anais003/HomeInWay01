import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  FamilyMember,
  IncomeState,
  BabyExpenseItem,
  ExpensesState,
  SavingsState,
  HousingGoalState,
  AIProposal,
} from '../types';

interface FinancialContextType {
  // User & Household
  userName: string;
  setUserName: (name: string) => void;
  familyMembers: FamilyMember[];
  addFamilyMember: (member: Omit<FamilyMember, 'id'>) => void;
  removeFamilyMember: (id: string) => void;

  // Income
  income: IncomeState;
  updateIncome: (fields: Partial<IncomeState>) => void;
  totalIncome: number;

  // Expenses
  expenses: ExpensesState;
  updateExpense: (category: keyof ExpensesState, amount: number) => void;
  totalExpenses: number;

  // Rent
  currentRent: number;
  updateRent: (amount: number) => void;

  // Baby items
  babyItems: BabyExpenseItem[];
  addBabyItem: (category: string, amount: number) => void;
  updateBabyItem: (id: string, amount: number) => void;
  removeBabyItem: (id: string) => void;
  babyExpensesTotal: number;

  // Savings & Goal
  savings: SavingsState;
  updateSavings: (fields: Partial<SavingsState>) => void;
  housingGoal: HousingGoalState;
  updateHousingGoal: (fields: Partial<HousingGoalState>) => void;

  // Calculated Metrics
  monthlySavingsCapacity: number;
  downPaymentGoal: number;
  pendingSavings: number;
  progressPercent: number;
  monthsToGoal: number;
  yearsToGoal: number;

  // Settings & App state
  onboardingCompleted: boolean;
  setOnboardingCompleted: (val: boolean) => void;
  aiConsent: boolean;
  setAiConsent: (val: boolean) => void;

  // Actions
  applyProposal: (proposal: AIProposal) => void;
  resetToCamilaDefaults: () => void;
}

const defaultBabyItems: BabyExpenseItem[] = [
  { id: 'b1', category: 'Pañales y aseo', amount: 80000 },
  { id: 'b2', category: 'Alimentación y fórmulas', amount: 70000 },
  { id: 'b3', category: 'Salud y vacunas', amount: 50000 },
  { id: 'b4', category: 'Ropa y calzado', amount: 40000 },
  { id: 'b5', category: 'Cuidado infantil / Sala cuna', amount: 60000 },
];

const defaultFamilyMembers: FamilyMember[] = [
  { id: 'm1', name: 'Camila', age: 29, relation: 'Titular' },
  { id: 'm2', name: 'Mateo', age: 1, relation: 'Hijo/a' },
];

const STORAGE_KEY = 'homeinway_financial_profile_v2';

const FinancialContext = createContext<FinancialContextType | undefined>(undefined);

export const FinancialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initial state setup with Camila's defaults
  const [userName, setUserName] = useState<string>('Camila');
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(defaultFamilyMembers);

  const [income, setIncome] = useState<IncomeState>({
    mainIncome: 2000000,
    partnerIncome: 0,
    otherIncome: 0,
    variableIncome: 0,
  });

  const [currentRent, setCurrentRent] = useState<number>(600000);

  const [babyItems, setBabyItems] = useState<BabyExpenseItem[]>(defaultBabyItems);

  const [expenses, setExpenses] = useState<ExpensesState>({
    vivienda: 600000,
    alimentacion: 350000,
    transporte: 150000,
    salud: 100000,
    bebe: 300000,
    deudas: 150000,
    ocio: 120000,
    servicios: 80000,
    otros: 0,
  });

  const [savings, setSavings] = useState<SavingsState>({
    accumulatedSavings: 3500000,
    currentMonthlySavings: 150000,
    emergencyFund: 1000000,
  });

  const [housingGoal, setHousingGoal] = useState<HousingGoalState>({
    propertyType: 'Departamento',
    commune: 'Ñuñoa',
    propertyPrice: 100000000, // $100.000.000
    downPaymentPercent: 20, // 20% = $20.000.000
    targetYears: 5,
  });

  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean>(true);
  const [aiConsent, setAiConsent] = useState<boolean>(true);

  // Load from LocalStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.userName) setUserName(parsed.userName);
        if (parsed.familyMembers) setFamilyMembers(parsed.familyMembers);
        if (parsed.income) setIncome(parsed.income);
        if (parsed.currentRent) setCurrentRent(parsed.currentRent);
        if (parsed.babyItems) setBabyItems(parsed.babyItems);
        if (parsed.expenses) setExpenses(parsed.expenses);
        if (parsed.savings) setSavings(parsed.savings);
        if (parsed.housingGoal) setHousingGoal(parsed.housingGoal);
        if (typeof parsed.onboardingCompleted === 'boolean') setOnboardingCompleted(parsed.onboardingCompleted);
        if (typeof parsed.aiConsent === 'boolean') setAiConsent(parsed.aiConsent);
      }
    } catch (e) {
      console.error('Error loading saved state:', e);
    }
  }, []);

  // Save changes to LocalStorage
  useEffect(() => {
    try {
      const stateToSave = {
        userName,
        familyMembers,
        income,
        currentRent,
        babyItems,
        expenses,
        savings,
        housingGoal,
        onboardingCompleted,
        aiConsent,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error('Error persisting state:', e);
    }
  }, [
    userName,
    familyMembers,
    income,
    currentRent,
    babyItems,
    expenses,
    savings,
    housingGoal,
    onboardingCompleted,
    aiConsent,
  ]);

  // Sync baby total expense into global expenses
  const babyExpensesTotal = babyItems.reduce((acc, item) => acc + item.amount, 0);

  useEffect(() => {
    setExpenses((prev) => ({
      ...prev,
      vivienda: currentRent,
      bebe: babyExpensesTotal,
    }));
  }, [currentRent, babyExpensesTotal]);

  // Mathematical computations
  const totalIncome =
    income.mainIncome + income.partnerIncome + income.otherIncome + income.variableIncome;

  const totalExpenses =
    expenses.vivienda +
    expenses.alimentacion +
    expenses.transporte +
    expenses.salud +
    expenses.bebe +
    expenses.deudas +
    expenses.ocio +
    expenses.servicios +
    expenses.otros;

  // Monthly available savings
  const monthlySavingsCapacity = totalIncome - totalExpenses;

  // Down payment goal
  const downPaymentGoal = (housingGoal.propertyPrice * housingGoal.downPaymentPercent) / 100;
  const pendingSavings = Math.max(0, downPaymentGoal - savings.accumulatedSavings);
  const progressPercent = Math.min(100, (savings.accumulatedSavings / downPaymentGoal) * 100);

  // Time to reach down payment
  const monthsToGoal =
    monthlySavingsCapacity > 0 ? Math.ceil(pendingSavings / monthlySavingsCapacity) : Infinity;
  const yearsToGoal = monthsToGoal !== Infinity ? Number((monthsToGoal / 12).toFixed(1)) : Infinity;

  // Methods
  const addFamilyMember = (member: Omit<FamilyMember, 'id'>) => {
    const newMember: FamilyMember = {
      ...member,
      id: `m_${Date.now()}`,
    };
    setFamilyMembers((prev) => [...prev, newMember]);
  };

  const removeFamilyMember = (id: string) => {
    setFamilyMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const updateIncome = (fields: Partial<IncomeState>) => {
    setIncome((prev) => ({ ...prev, ...fields }));
  };

  const updateRent = (amount: number) => {
    setCurrentRent(amount);
    setExpenses((prev) => ({ ...prev, vivienda: amount }));
  };

  const updateExpense = (category: keyof ExpensesState, amount: number) => {
    setExpenses((prev) => ({ ...prev, [category]: amount }));
  };

  const addBabyItem = (category: string, amount: number) => {
    const newItem: BabyExpenseItem = {
      id: `b_${Date.now()}`,
      category,
      amount,
    };
    setBabyItems((prev) => [...prev, newItem]);
  };

  const updateBabyItem = (id: string, amount: number) => {
    setBabyItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, amount } : item))
    );
  };

  const removeBabyItem = (id: string) => {
    setBabyItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateSavings = (fields: Partial<SavingsState>) => {
    setSavings((prev) => ({ ...prev, ...fields }));
  };

  const updateHousingGoal = (fields: Partial<HousingGoalState>) => {
    setHousingGoal((prev) => ({ ...prev, ...fields }));
  };

  const applyProposal = (proposal: AIProposal) => {
    if (proposal.type === 'rent') {
      updateRent(proposal.newValue);
    } else if (proposal.type === 'baby') {
      // Scale baby items proportionally to match proposal newValue
      if (babyExpensesTotal > 0) {
        const factor = proposal.newValue / babyExpensesTotal;
        setBabyItems((prev) =>
          prev.map((item) => ({
            ...item,
            amount: Math.round(item.amount * factor),
          }))
        );
      }
    } else if (proposal.type === 'savings') {
      updateSavings({ currentMonthlySavings: proposal.newValue });
    }
  };

  const resetToCamilaDefaults = () => {
    setUserName('Camila');
    setFamilyMembers(defaultFamilyMembers);
    setIncome({
      mainIncome: 2000000,
      partnerIncome: 0,
      otherIncome: 0,
      variableIncome: 0,
    });
    setCurrentRent(600000);
    setBabyItems(defaultBabyItems);
    setExpenses({
      vivienda: 600000,
      alimentacion: 350000,
      transporte: 150000,
      salud: 100000,
      bebe: 300000,
      deudas: 150000,
      ocio: 120000,
      servicios: 80000,
      otros: 0,
    });
    setSavings({
      accumulatedSavings: 3500000,
      currentMonthlySavings: 150000,
      emergencyFund: 1000000,
    });
    setHousingGoal({
      propertyType: 'Departamento',
      commune: 'Ñuñoa',
      propertyPrice: 100000000,
      downPaymentPercent: 20,
      targetYears: 5,
    });
    setOnboardingCompleted(true);
    setAiConsent(true);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <FinancialContext.Provider
      value={{
        userName,
        setUserName,
        familyMembers,
        addFamilyMember,
        removeFamilyMember,
        income,
        updateIncome,
        totalIncome,
        expenses,
        updateExpense,
        totalExpenses,
        currentRent,
        updateRent,
        babyItems,
        addBabyItem,
        updateBabyItem,
        removeBabyItem,
        babyExpensesTotal,
        savings,
        updateSavings,
        housingGoal,
        updateHousingGoal,
        monthlySavingsCapacity,
        downPaymentGoal,
        pendingSavings,
        progressPercent,
        monthsToGoal,
        yearsToGoal,
        onboardingCompleted,
        setOnboardingCompleted,
        aiConsent,
        setAiConsent,
        applyProposal,
        resetToCamilaDefaults,
      }}
    >
      {children}
    </FinancialContext.Provider>
  );
};

export const useFinancial = () => {
  const context = useContext(FinancialContext);
  if (!context) {
    throw new Error('useFinancial must be used within a FinancialProvider');
  }
  return context;
};
