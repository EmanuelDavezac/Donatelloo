import { useState } from 'react';
import Header from './components/Header';
import DonutBox from './components/DonutBox';
import Checkout from './components/Checkout';

function App() {
  const [paso, setPaso] = useState(1);
  const [paquete, setPaquete] = useState(null);
  const [sabores, setSabores] = useState([]);

  const elegirPaquete = (seleccion) => {
    setPaquete(seleccion);
    setPaso(2);
  };

  const finalizarCaja = (cajaArmada) => {
    setSabores(cajaArmada);
    setPaso(3);
  };

  return (
    // 1. Fondo crema súper elegante en vez de rosa
    <div className="min-h-screen bg-[#fdfbf7] flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative flex flex-col">
        
        <Header pasoActual={paso} />

        <main className="px-6 py-6 grow">
          
          {/* --- PASO 1: SELECCIÓN DE TAMAÑO Y PRECIOS --- */}
          {paso === 1 && (
            <div>
              {/* 2. Textos en tu Azul Noche */}
              <h2 className="text-xl font-bold text-[#04233f] mb-6 text-center">
                Arma tu pedido Donatello
              </h2>
              <div className="flex flex-col gap-3 pb-8">
                
                {/* 3. Botones con hover en color Durazno y títulos en Azul Noche */}
                <button onClick={() => elegirPaquete({ cantidad: 3, titulo: "Brocheta", precio: 2000 })} className="bg-white border-2 border-[#d99d8f]/30 p-4 rounded-2xl shadow-sm hover:border-[#d99d8f] text-left flex justify-between items-center transition-all">
                  <div>
                    <h3 className="font-bold text-lg text-[#04233f]">Brocheta (3)</h3>
                    <p className="text-sm text-gray-500">Un gustito rápido al paso.</p>
                    <p className="font-bold text-green-600 mt-1 text-lg">${2000}</p>
                  </div>
                  <span className="text-3xl">🍢</span>
                </button>

                <button onClick={() => elegirPaquete({ cantidad: 6, titulo: "Media Docena", precio: 3000 })} className="bg-white border-2 border-[#d99d8f]/30 p-4 rounded-2xl shadow-sm hover:border-[#d99d8f] text-left flex justify-between items-center transition-all">
                  <div>
                    <h3 className="font-bold text-lg text-[#04233f]">Media Docena (6)</h3>
                    <p className="text-sm text-gray-500">Perfecta para el antojo.</p>
                    <p className="font-bold text-green-600 mt-1 text-lg">${3000}</p>
                  </div>
                  <span className="text-3xl">🍩</span>
                </button>

                <button onClick={() => elegirPaquete({ cantidad: 10, titulo: "Vaso Donatello", precio: 4700 })} className="bg-white border-2 border-[#d99d8f]/30 p-4 rounded-2xl shadow-sm hover:border-[#d99d8f] text-left flex justify-between items-center transition-all">
                  <div>
                    <h3 className="font-bold text-lg text-[#04233f]">Vaso Donatello (10)</h3>
                    <p className="text-sm text-gray-500">Ideal para ir comiendo.</p>
                    <p className="font-bold text-green-600 mt-1 text-lg">${4700}</p>
                  </div>
                  <span className="text-3xl">🥤</span>
                </button>

                <button onClick={() => elegirPaquete({ cantidad: 12, titulo: "La Docena", precio: 5000 })} className="bg-white border-2 border-[#d99d8f]/30 p-4 rounded-2xl shadow-sm hover:border-[#d99d8f] text-left flex justify-between items-center transition-all">
                  <div>
                    <h3 className="font-bold text-lg text-[#04233f]">Docena (12)</h3>
                    <p className="text-sm text-gray-500">La clásica para llevar a casa.</p>
                    <p className="font-bold text-green-600 mt-1 text-lg">${5000}</p>
                  </div>
                  <span className="text-3xl">📦</span>
                </button>

                <button onClick={() => elegirPaquete({ cantidad: 24, titulo: "Caja Fiesta", precio: 9500 })} className="bg-white border-2 border-[#d99d8f]/30 p-4 rounded-2xl shadow-sm hover:border-[#d99d8f] text-left flex justify-between items-center transition-all">
                  <div>
                    <h3 className="font-bold text-lg text-[#04233f]">Caja Fiesta (24)</h3>
                    <p className="text-sm text-gray-500">Para compartir con todos.</p>
                    <p className="font-bold text-green-600 mt-1 text-lg">${9500}</p>
                  </div>
                  <span className="text-3xl">🎉</span>
                </button>

              </div>
            </div>
          )}

          {/* --- PASOS 2 Y 3 --- */}
          {paso === 2 && (
            <div>
              {/* Botón Volver pintado de color Durazno */}
              <button onClick={() => setPaso(1)} className="text-[#d99d8f] font-bold mb-4 flex items-center gap-1 hover:text-[#b87c6e]">
                <span>❮</span> Cambiar tamaño
              </button>
              <DonutBox capacidad={paquete.cantidad} titulo={paquete.titulo} onFinalizar={finalizarCaja} />
            </div>
          )}

          {paso === 3 && (
            <Checkout paquete={paquete} saboresElegidos={sabores} onVolver={() => setPaso(2)} />
          )}

        </main>
      </div>
    </div>
  );
}

export default App;