import { useState } from 'react';

// 1. NUESTRA "BASE DE DATOS" DE SABORES REALES DE DONATELLO
const MENU_SABORES = [
  { id: 'blanco', nombre: 'Choco Blanco', bg: 'bg-[#fdfbf7]', border: 'border-[#e0d6c8]' },
  { id: 'negro', nombre: 'Choco Negro', bg: 'bg-[#3e2723]', border: 'border-[#1b100c]' },
  { id: 'azucarada', nombre: 'Azucarada', bg: 'bg-[#e8c396]', border: 'border-[#cfa75e]' },
  { id: 'blanco_oreo', nombre: 'Oreo en Blanco', bg: 'bg-[#fdfbf7]', border: 'border-[#e0d6c8]', extra: '🍪' },
  { id: 'negro_oreo', nombre: 'Oreo en Negro', bg: 'bg-[#3e2723]', border: 'border-[#1b100c]', extra: '🍪' },
  { id: 'blanco_rocklets', nombre: 'Rocklets Blanco', bg: 'bg-[#fdfbf7]', border: 'border-[#e0d6c8]', extra: '🍬' },
  { id: 'negro_rocklets', nombre: 'Rocklets Negro', bg: 'bg-[#3e2723]', border: 'border-[#1b100c]', extra: '🍬' },
  { id: 'blanco_crocante', nombre: 'Crocante Blanco', bg: 'bg-[#fdfbf7]', border: 'border-[#e0d6c8]', extra: '🥜' },
  { id: 'negro_crocante', nombre: 'Crocante Negro', bg: 'bg-[#3e2723]', border: 'border-[#1b100c]', extra: '🥜' },
  { id: 'blanco_coco', nombre: 'Coco en Blanco', bg: 'bg-[#fdfbf7]', border: 'border-[#e0d6c8]', extra: '🥥' },
  { id: 'marmolado', nombre: 'Marmolado', bg: 'bg-[#5d4037]', border: 'border-[#3e2723]', extra: '〰️' },
];


export default function DonutBox({ capacidad, titulo, onFinalizar }) {
  const [saboresCaja, setSaboresCaja] = useState(Array(capacidad).fill(null));
  const [slotActivo, setSlotActivo] = useState(0);

  const aplicarSabor = (idSabor) => {
    const nuevaCaja = [...saboresCaja];
    nuevaCaja[slotActivo] = idSabor;
    setSaboresCaja(nuevaCaja);

    const siguienteVacio = nuevaCaja.indexOf(null);
    if (siguienteVacio !== -1) {
      setSlotActivo(siguienteVacio);
    }
  };

  // Función para buscar los colores y emojis del sabor guardado
  const getDatosSabor = (id) => MENU_SABORES.find(s => s.id === id);

  return (
    <div className="flex flex-col gap-6">
      
      {/* --- LA CAJA VISUAL --- */}
      <div className="bg-[#fff8e1] p-6 rounded-3xl border-4 border-dashed border-yellow-400 shadow-sm">
        <h2 className="text-center font-bold text-yellow-700 mb-6 text-lg tracking-wide">
          {titulo}
        </h2>
        
        <div className="grid grid-cols-3 gap-4 justify-items-center">
          {saboresCaja.map((saborId, index) => {
            const esActivo = slotActivo === index;
            const datosSabor = saborId ? getDatosSabor(saborId) : null;
            
            return (
              <div 
                key={index} 
                onClick={() => setSlotActivo(index)}
                className={`
                  w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 border-2
                  ${esActivo ? 'ring-4 ring-blue-400 ring-offset-2 scale-110 shadow-lg' : 'shadow-inner hover:scale-105'}
                  ${datosSabor ? `${datosSabor.bg} ${datosSabor.border}` : 'bg-white/60 border-yellow-300'}
                `}
              >
                {/* Mostramos el + si está vacío, o el emoji del topping si lo tiene */}
                {!datosSabor && <span className="text-yellow-400 text-3xl font-bold">+</span>}
                {datosSabor && datosSabor.extra && <span className="text-2xl drop-shadow-md">{datosSabor.extra}</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* --- LOS BOTONES DE SABORES (AHORA DINÁMICOS Y CON SCROLL) --- */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 pb-24">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 text-center">
          Elegí tu menú Donatello
        </h3>
        
        {/* Contenedor con scroll vertical para no romper la pantalla */}
        <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-2">
          
          {/* El .map() recorre nuestra lista y crea los botones automáticamente */}
          {MENU_SABORES.map((sabor) => (
            <button 
              key={sabor.id}
              onClick={() => aplicarSabor(sabor.id)}
              className="flex items-center gap-2 p-2 border-2 border-gray-50 rounded-xl hover:border-pink-300 hover:bg-pink-50 transition-colors text-left"
            >
              <div className={`min-w-6 w-6 h-6 rounded-full border border-gray-200 shadow-sm flex items-center justify-center text-[10px] ${sabor.bg} ${sabor.border}`}>
                {sabor.extra}
              </div>
              <span className="font-bold text-gray-600 text-xs sm:text-sm leading-tight">
                {sabor.nombre}
              </span>
            </button>
          ))}

        </div>
      </div>

      {/* --- BOTÓN CONTINUAR --- */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-white via-white to-transparent">
        <button 
          disabled={saboresCaja.includes(null)} 
          onClick={() => onFinalizar(saboresCaja)}
          className="w-full py-4 rounded-2xl font-bold text-lg text-white transition-all disabled:bg-gray-300 disabled:cursor-not-allowed bg-green-500 hover:bg-green-600 shadow-xl"
        >
          {saboresCaja.includes(null) ? "Faltan donitas..." : "¡Caja Lista! Continuar"}
        </button>
      </div>

    </div>
  );
}