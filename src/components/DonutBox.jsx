import { useState } from 'react';
import Swal from 'sweetalert2';

export default function DonutBox({ capacidad, titulo, onFinalizar }) {
  const [caja, setCaja] = useState([]);

  // Tu menú de sabores conectado a las fotos
  const saboresDisponibles = [
    { id: 'choco-blanco', nombre: 'Choco Blanco', img: '/choco-blanco.png' },
    { id: 'choco-negro', nombre: 'Choco Negro', img: '/choco-negro.png' },
    { id: 'azucarada', nombre: 'Azucarada', img: '/azucarada.png' },
    { id: 'oreo-blanco', nombre: 'Oreo en Blanco', img: '/oreo-blanco.png' },
    { id: 'oreo-negro', nombre: 'Oreo en Negro', img: '/oreo-negro.png' },
    { id: 'rocklets-blanco', nombre: 'Rocklets Blanco', img: '/rocklets-blanco.png' },
    { id: 'rocklets-negro', nombre: 'Rocklets Negro', img: '/rocklets-negro.png' },
    { id: 'crocante-blanco', nombre: 'Crocante Blanco', img: '/crocante-blanco.png' },
    { id: 'crocante-negro', nombre: 'Crocante Negro', img: '/crocante-negro.png' },
    { id: 'coco-blanco', nombre: 'Coco en Blanco', img: '/coco-blanco.png' },
    { id: 'marmolado', nombre: 'Marmolado', img: '/marmolado.png' },
  ];

  const agregarSabor = (sabor) => {
    if (caja.length < capacidad) {
      setCaja([...caja, sabor]);
    } else {
      Swal.fire({
        title: '¡Caja llena!',
        text: `Ya elegiste tus ${capacidad} donitas. Podés avanzar o quitar alguna de abajo para cambiarla.`,
        icon: 'info',
        confirmButtonColor: '#04233f'
      });
    }
  };

  const quitarSabor = (index) => {
    const nuevaCaja = [...caja];
    nuevaCaja.splice(index, 1);
    setCaja(nuevaCaja);
  };

  const faltantes = capacidad - caja.length;

  return (
    <div className="flex flex-col h-full animate-fade-in">
       {/* Cabecera flotante con el progreso */}
       <div className="bg-[#04233f] text-white p-4 rounded-2xl mb-6 shadow-md text-center sticky top-0 z-10">
          <h2 className="text-xl font-bold mb-1">Armando: {titulo}</h2>
          <p className="text-[#d99d8f] font-medium text-sm">
            {faltantes > 0 ? `Te faltan elegir ${faltantes} donitas` : '¡Caja completa! Lista para pedir'}
          </p>
          {/* Barra de progreso */}
          <div className="w-full bg-white/20 rounded-full h-2 mt-3 overflow-hidden">
            <div 
              className="bg-[#d99d8f] h-2 transition-all duration-300" 
              style={{ width: `${(caja.length / capacidad) * 100}%` }}
            ></div>
          </div>
       </div>

       {/* Grilla Visual de Sabores (Acá está la magia de las fotos) */}
       <h3 className="text-gray-400 font-bold text-xs mb-3 uppercase tracking-wider text-center">Toca para agregar</h3>
       <div className="grid grid-cols-2 gap-3 mb-8 overflow-y-auto pb-4">
          {saboresDisponibles.map((sabor) => {
            // Contamos cuántas veces eligió este sabor específico
            const cantidadElegida = caja.filter(item => item.id === sabor.id).length;

            return (
              <button 
                key={sabor.id}
                onClick={() => agregarSabor(sabor)}
                className={`bg-white border-2 rounded-2xl p-3 flex flex-col items-center justify-center gap-2 transition-all relative shadow-sm active:scale-95 ${cantidadElegida > 0 ? 'border-[#d99d8f] bg-orange-50/30' : 'border-gray-100 hover:border-gray-300'}`}
              >
                {/* Burbuja que muestra la cantidad si eligió más de una */}
                {cantidadElegida > 0 && (
                  <div className="absolute -top-2 -right-2 bg-[#d99d8f] text-[#04233f] w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm shadow-md border-2 border-white">
                    {cantidadElegida}
                  </div>
                )}
                
                {/* La foto sin fondo */}
                <img 
                  src={sabor.img} 
                  alt={sabor.nombre} 
                  className="w-16 h-16 object-contain drop-shadow-md transition-transform hover:scale-110"
                  // Si todavía no subiste la foto, muestra el logo para no romper el diseño
                  onError={(e) => { e.target.src = '/logo.png'; }} 
                />
                <span className="font-bold text-[#04233f] text-sm text-center leading-tight">
                  {sabor.nombre}
                </span>
              </button>
            );
          })}
       </div>

       {/* Botón Finalizar y Lista para Quitar */}
       <div className="mt-auto pt-4 border-t-2 border-gray-100">
         
         {/* Mostrar las elegidas como "etiquetas" abajo para poder quitarlas si se arrepiente */}
         {caja.length > 0 && (
           <div className="mb-4">
             <p className="text-xs font-bold text-gray-400 uppercase mb-2">Tu selección (Toca para quitar):</p>
             <div className="flex flex-wrap gap-2">
               {caja.map((sabor, index) => (
                 <button 
                   key={index}
                   onClick={() => quitarSabor(index)}
                   className="bg-gray-100 px-3 py-1.5 rounded-full text-xs font-bold text-[#04233f] hover:bg-red-100 hover:text-red-600 transition-colors flex items-center gap-1 shadow-sm"
                 >
                   {sabor.nombre} <span className="text-red-500 text-sm ml-1">×</span>
                 </button>
               ))}
             </div>
           </div>
         )}

         <button 
            onClick={() => onFinalizar(caja)}
            disabled={caja.length < capacidad}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-md ${
              caja.length === capacidad 
              ? 'bg-[#d99d8f] text-[#04233f] hover:bg-[#c98d7f]' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
         >
            {caja.length === capacidad ? '¡Confirmar Caja!' : 'Completá la caja para avanzar'}
         </button>
       </div>
    </div>
  );
}