import React, { useState, useEffect, useRef } from 'react';
import { useFinancial } from '../context/FinancialContext';
import L from 'leaflet';
import {
  Bed,
  Bath,
  TreePine,
  CheckCircle2,
  Building2,
  MapPin,
  Sparkles,
  Info,
  Maximize2,
  Compass,
} from 'lucide-react';

interface RentalOption {
  id: 'A' | 'B' | 'C';
  title: string;
  recommended: boolean;
  price: number;
  commune: string;
  address: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  features: string[];
  lat: number;
  lng: number;
  color: string;
}

export const RentalComparator: React.FC = () => {
  const { currentRent, updateRent, monthlySavingsCapacity, downPaymentGoal } = useFinancial();

  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C'>('A');
  const [appliedNotification, setAppliedNotification] = useState<string | null>(null);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  const rentalOptions: Record<'A' | 'B' | 'C', RentalOption> = {
    A: {
      id: 'A',
      title: 'Opción A',
      recommended: true,
      price: 500000,
      commune: 'Ñuñoa',
      address: 'Sector Plaza Ñuñoa / Parque Juan XXIII',
      type: 'Departamento 2D · 1B',
      bedrooms: 2,
      bathrooms: 1,
      area: 52,
      features: ['Cerca de parque', 'Metro Chile España a 6 min', 'Estacionamiento opcional'],
      lat: -33.4545,
      lng: -70.5995,
      color: '#0C9647',
    },
    B: {
      id: 'B',
      title: 'Opción B',
      recommended: false,
      price: 650000,
      commune: 'Ñuñoa Sur',
      address: 'Eje Irarrázaval / Metro Estadio Nacional',
      type: 'Departamento 3D · 2B',
      bedrooms: 3,
      bathrooms: 2,
      area: 70,
      features: ['Cerca de metro', 'Terraza con vista despejada', 'Bodega incluida'],
      lat: -33.4618,
      lng: -70.6080,
      color: '#D97706',
    },
    C: {
      id: 'C',
      title: 'Opción C',
      recommended: false,
      price: 750000,
      commune: 'Ñuñoa Norte',
      address: 'Sector Sucre / Monseñor Eyzaguirre',
      type: 'Departamento 3D · 2B',
      bedrooms: 3,
      bathrooms: 2,
      area: 82,
      features: ['Cerca de colegios y ciclovías', 'Edificio familiar', 'Seguridad 24/7'],
      lat: -33.4475,
      lng: -70.6045,
      color: '#2C70B8',
    },
  };

  const currentOpt = rentalOptions[selectedOption];

  // Initialize interactive Leaflet map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center in Ñuñoa, Santiago
    const map = L.map(mapContainerRef.current, {
      center: [-33.4545, -70.604],
      zoom: 14,
      zoomControl: true,
      attributionControl: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(map);

    mapInstanceRef.current = map;

    // Create markers for A, B, C
    Object.values(rentalOptions).forEach((opt) => {
      const isSelected = opt.id === selectedOption;
      const markerHtml = `
        <div class="cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95">
          <div style="background-color: ${isSelected ? '#1E293B' : 'white'}; color: ${isSelected ? 'white' : '#0F172A'}; border: 2px solid ${isSelected ? '#0C9647' : '#CBD5E1'};" class="px-2.5 py-1 rounded-full shadow-md font-mono font-black text-xs flex items-center gap-1">
            <span>${opt.id}: $${(opt.price / 1000).toFixed(0)}k</span>
          </div>
        </div>
      `;

      const icon = L.divIcon({
        className: `custom-marker-${opt.id}`,
        html: markerHtml,
        iconSize: [85, 30],
        iconAnchor: [42, 15],
      });

      const marker = L.marker([opt.lat, opt.lng], { icon }).addTo(map);

      marker.on('click', () => {
        setSelectedOption(opt.id);
        map.panTo([opt.lat, opt.lng], { animate: true, duration: 0.5 });
      });

      markersRef.current[opt.id] = marker;
    });

    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 250);

    return () => {
      clearTimeout(timer);
      map.remove();
      mapInstanceRef.current = null;
      markersRef.current = {};
    };
  }, []);

  // Update marker styles when selected option changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    Object.values(rentalOptions).forEach((opt) => {
      const marker = markersRef.current[opt.id];
      if (!marker) return;

      const isSelected = opt.id === selectedOption;
      const markerHtml = `
        <div class="cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95">
          <div style="background-color: ${isSelected ? '#0F172A' : 'white'}; color: ${isSelected ? 'white' : '#0F172A'}; border: 2.5px solid ${isSelected ? (opt.recommended ? '#0C9647' : '#2C70B8') : '#CBD5E1'}; transform: ${isSelected ? 'scale(1.08)' : 'scale(1)'};" class="px-2.5 py-1 rounded-full shadow-lg font-mono font-black text-xs flex items-center gap-1">
            <span>${opt.id}: $${(opt.price / 1000).toFixed(0)}k</span>
            ${isSelected ? '<span class="w-2 h-2 rounded-full bg-[#0C9647]"></span>' : ''}
          </div>
        </div>
      `;

      marker.setIcon(
        L.divIcon({
          className: `custom-marker-${opt.id}`,
          html: markerHtml,
          iconSize: [85, 30],
          iconAnchor: [42, 15],
        })
      );
    });

    const targetOpt = rentalOptions[selectedOption];
    mapInstanceRef.current.panTo([targetOpt.lat, targetOpt.lng], { animate: true, duration: 0.4 });
  }, [selectedOption]);

  const handleApplyToBudget = () => {
    updateRent(currentOpt.price);
    setAppliedNotification(
      `Arriendo de ${currentOpt.title} ($${currentOpt.price.toLocaleString('es-CL')}) aplicado con éxito a tu presupuesto.`
    );
    setTimeout(() => setAppliedNotification(null), 4000);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Toast Notification */}
      {appliedNotification && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2 text-xs text-emerald-900 shadow-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#0C9647] shrink-0" />
          <p className="font-semibold">{appliedNotification}</p>
        </div>
      )}

      {/* Screen Title */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Compara arriendos
        </h1>
      </div>

      {/* =========================================================================
          MAPA INTERACTIVO ESTILO AIRBNB (EXPLORACIÓN EN ÑUÑOA / SANTIAGO)
      ========================================================================= */}
      <div className="bg-white rounded-3xl border border-[#E5EAF0] shadow-[0_2px_12px_rgba(15,23,42,0.04)] overflow-hidden space-y-3 p-3">
        {/* Selector rápido de opciones sobre el mapa */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-[#2C70B8]" />
            <span className="text-xs font-bold text-slate-800">
              Explora en Ñuñoa, Santiago
            </span>
          </div>

          {/* Toggle buttons A, B, C */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl">
            {(['A', 'B', 'C'] as const).map((optKey) => {
              const opt = rentalOptions[optKey];
              const isSelected = selectedOption === optKey;
              return (
                <button
                  key={optKey}
                  onClick={() => setSelectedOption(optKey)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white text-slate-900 shadow-xs font-black'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {opt.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Contenedor del Mapa Leaflet */}
        <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
          <div ref={mapContainerRef} className="w-full h-full z-0" />

          {/* Badge superior indicando interacción estilo Airbnb */}
          <div className="absolute top-2.5 left-2.5 z-[400] bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-xl shadow-xs border border-slate-200 text-[10px] font-bold text-slate-700 flex items-center gap-1 pointer-events-none">
            <MapPin className="w-3 h-3 text-[#2C70B8]" />
            <span>Toca un marcador de precio para ver detalles</span>
          </div>
        </div>

        {/* Tarjeta de información de la vivienda seleccionada */}
        <div className="p-3.5 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200/80 shadow-2xs space-y-2.5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-900">{currentOpt.title}</span>
                {currentOpt.recommended && (
                  <span className="text-[10px] font-bold bg-[#EBF6EE] text-[#0C9647] px-2 py-0.5 rounded-full border border-[#C5E8CE]">
                    Recomendada
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold text-slate-600 mt-0.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{currentOpt.address}</span>
              </p>
            </div>

            <div className="text-right">
              <p className="text-lg sm:text-xl font-black font-mono text-slate-900 leading-tight">
                ${currentOpt.price.toLocaleString('es-CL')}
              </p>
              <span className="text-[10px] text-slate-500 font-medium">al mes</span>
            </div>
          </div>

          {/* Características principales */}
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-700 pt-1 border-t border-slate-200/60">
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-slate-500" />
              <span>{currentOpt.bedrooms} dorm.</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-slate-500" />
              <span>{currentOpt.bathrooms} baño{currentOpt.bathrooms > 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-slate-500" />
              <span>{currentOpt.area} m²</span>
            </div>
          </div>

          {/* Tags de características */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {currentOpt.features.map((feat, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium bg-white px-2 py-0.5 rounded-lg border border-slate-200 text-slate-600"
              >
                {feat}
              </span>
            ))}
          </div>

          {/* Comparación directa con el arriendo actual */}
          <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">
              Frente a tu arriendo actual (${currentRent.toLocaleString('es-CL')}):
            </span>
            <span
              className={`font-mono font-bold ${
                currentRent >= currentOpt.price ? 'text-[#0C9647]' : 'text-slate-700'
              }`}
            >
              {currentRent >= currentOpt.price
                ? `Liberas +$${(currentRent - currentOpt.price).toLocaleString('es-CL')}/mes`
                : `Diferencia de $${(currentOpt.price - currentRent).toLocaleString('es-CL')}/mes`}
            </span>
          </div>

          {/* Botón para aplicar a tu presupuesto */}
          <button
            onClick={handleApplyToBudget}
            className="w-full py-2.5 px-3 bg-[#0C9647] hover:bg-[#097d3b] text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-transform active:scale-95 cursor-pointer mt-1"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Aplicar arriendo de {currentOpt.title} a mi presupuesto</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          SECCIÓN: TU ARRIENDO ACTUAL (SIMPLIFICADA, POSITIVA Y SIN CRÍTICAS)
      ========================================================================= */}
      <div className="bg-white rounded-3xl p-5 border border-[#E5EAF0] shadow-[0_2px_12px_rgba(15,23,42,0.04)] space-y-3">
        <div>
          <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            Tu arriendo actual
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Monto de referencia para tu capacidad de ahorro
          </p>
        </div>

        <div className="flex items-center justify-between p-3.5 bg-[#F0F6FC] rounded-2xl border border-[#D0E2F3]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-[#2C70B8] flex items-center justify-center shadow-xs">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                Pago mensual
              </span>
              <p className="text-xl sm:text-2xl font-black font-mono text-slate-900">
                $ {currentRent.toLocaleString('es-CL')}
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-[#2C70B8] bg-white px-2.5 py-1 rounded-full border border-[#D0E2F3]">
            Vigente
          </span>
        </div>

        {/* Explicación positiva y neutral respaldada por datos */}
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-600 space-y-1.5">
          <div className="flex items-center gap-1.5 text-slate-800 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#0C9647]" />
            <span>Aporte a tu planificación</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            Tu arriendo actual te brinda estabilidad habitacional mientras acumulas tu pie.
            Mantener un pago ordenado y al día respalda tu historial financiero ante Banco BCI.
            Con tu ahorro mensual de <strong>${monthlySavingsCapacity.toLocaleString('es-CL')}</strong>, continúas avanzando de forma constante hacia la meta de tu crédito hipotecario.
          </p>
        </div>
      </div>
    </div>
  );
};
