import React, { useState } from 'react';
import { FinancialProvider, useFinancial } from './context/FinancialContext';
import { Logo } from './components/Logo';
import { MobileNav } from './components/MobileNav';
import { Dashboard } from './components/Dashboard';
import { HousingModule } from './components/HousingModule';
import { BabyModule } from './components/BabyModule';
import { RentalComparator } from './components/RentalComparator';
import { SavingsGoalModule } from './components/SavingsGoalModule';
import { AiAssistant } from './components/AiAssistant';
import { Onboarding } from './components/Onboarding';
import {
  ChevronLeft,
  Wifi,
  Battery,
} from 'lucide-react';

function MobileAppShell() {
  const { onboardingCompleted, setOnboardingCompleted } = useFinancial();
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const navigateTo = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (activeTab !== 'dashboard') {
      setActiveTab('dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#E2E6EC] sm:bg-[#D5DCE5] flex items-center justify-center p-0 sm:p-4 select-none">
      {/* Mobile Smartphone Screen Container (Max 420px) with requested #F5F7FA canvas */}
      <div className="w-full sm:max-w-[420px] bg-[#F5F7FA] sm:rounded-[44px] sm:shadow-2xl sm:border-[9px] sm:border-slate-800 flex flex-col min-h-screen sm:min-h-[860px] relative overflow-hidden">
        {/* Unified Top Sticky Bar: iOS Status Bar + Clean HomeInWay Header in #FFFFFF */}
        <div className="sticky top-0 z-40 bg-white border-b border-[#E5EAF0] shadow-[0_1px_3px_rgba(15,23,42,0.03)] shrink-0">
          {/* iOS Dynamic Island & Status Bar (9:41) */}
          <div className="px-6 pt-3 pb-1 flex items-center justify-between text-xs font-bold text-slate-900 border-b border-[#E5EAF0]/60">
            <span className="font-mono text-sm tracking-tighter">9:41</span>

            {/* Notch Pill */}
            <div className="w-24 h-4 bg-black rounded-full hidden sm:block" />

            <div className="flex items-center gap-1.5 text-slate-800">
              <span className="text-[10px] font-black tracking-tighter">5G</span>
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4 fill-slate-800" />
            </div>
          </div>

          {/* Top App Bar Header: HomeInWay in pure #FFFFFF */}
          <header className="px-4 py-2.5 flex items-center justify-between">
            {/* Back button: Only visible when outside dashboard */}
            <div className="w-9 h-9 flex items-center justify-center">
              {activeTab !== 'dashboard' ? (
                <button
                  onClick={handleBack}
                  aria-label="Volver al Inicio"
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors active:scale-95 cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                </button>
              ) : null}
            </div>

            {/* Centered Brand Name: HomeInWay */}
            <button
              onClick={() => navigateTo('dashboard')}
              className="focus:outline-none flex items-center justify-center cursor-pointer"
            >
              <Logo size="sm" showText={true} showSubtitle={false} />
            </button>

            {/* Symmetrical placeholder for visual balance */}
            <div className="w-9 h-9" />
          </header>
        </div>

        {/* Scrollable Viewport Content */}
        <main className={`flex-1 overflow-y-auto ${activeTab === 'asistente' ? 'px-3.5 pt-3 pb-2' : 'px-4 pt-3 pb-8'} bg-[#F5F7FA]`}>
          {!onboardingCompleted ? (
            <Onboarding
              onComplete={() => {
                setOnboardingCompleted(true);
                navigateTo('dashboard');
              }}
            />
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <Dashboard
                  onNavigate={navigateTo}
                  onOpenAssistant={() => navigateTo('asistente')}
                />
              )}
              {activeTab === 'vivienda' && (
                <HousingModule
                  onNavigateToComparator={() => navigateTo('comparador')}
                />
              )}
              {activeTab === 'comparador' && <RentalComparator />}
              {(activeTab === 'gastos' || activeTab === 'bebe') && <BabyModule />}
              {activeTab === 'ahorro' && <SavingsGoalModule />}
              {activeTab === 'asistente' && (
                <AiAssistant onBack={() => navigateTo('dashboard')} />
              )}
            </>
          )}
        </main>

        {/* Bottom Navigation in Soft Bci Blue */}
        {onboardingCompleted && (
          <MobileNav
            activeTab={activeTab}
            setActiveTab={navigateTo}
            onOpenAssistant={() => navigateTo('asistente')}
          />
        )}

        {/* iOS Home Indicator Bar */}
        <div className="w-32 h-1 bg-slate-400/80 rounded-full mx-auto my-1.5 shrink-0 hidden sm:block pointer-events-none" />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <FinancialProvider>
      <MobileAppShell />
    </FinancialProvider>
  );
}
