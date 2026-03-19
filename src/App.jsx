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
    <div className="min-h-screen bg-pink-50 flex justify-center">
      <div className="w-full max-w-md bg-[#fdfcfc] min-h-screen shadow-2xl relative flex flex-col">
        
        <Header pasoActual={paso} />

        <main className="px-6 py-6 grow">
          
          {/* --- PASO 1: SELECCIÓN DE TAMAÑO Y PRECIOS --- */}
          {paso === 1 && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
                Arma tu pedido Donatello
              </h2>
              <div className="flex flex-col gap-3 pb-8">
                
                {/* 1. BROCHETA (3) */}
                <button onClick={() => elegirPaquete({ cantidad: 3, titulo: "Brocheta", precio: 2000 })} className="bg-white border-2 border-pink-100 p-4 rounded-2xl shadow-sm hover:border-pink-400 text-left flex justify-between items-center transition-all">
                  <div>
                    <h3 className="font-bold text-lg text-pink-600">Brocheta (3)</h3>
                    <p className="text-sm text-gray-500">Un gustito rápido al paso.</p>
                    <p className="font-bold text-green-500 mt-1 text-lg">${2000}</p>
                  </div>
                  <span className="text-3xl">🍢</span>
                </button>

                {/* 2. MEDIA DOCENA (6) */}
                <button onClick={() => elegirPaquete({ cantidad: 6, titulo: "Media Docena", precio: 3000 })} className="bg-white border-2 border-pink-100 p-4 rounded-2xl shadow-sm hover:border-pink-400 text-left flex justify-between items-center transition-all">
                  <div>
                    <h3 className="font-bold text-lg text-pink-600">Media Docena (6)</h3>
                    <p className="text-sm text-gray-500">Perfecta para el antojo.</p>
                    <p className="font-bold text-green-500 mt-1 text-lg">${3000}</p>
                  </div>
                  <span className="text-3xl">🍩</span>
                </button>

                {/* 3. VASO (10) */}
                <button onClick={() => elegirPaquete({ cantidad: 10, titulo: "Vaso Donatello", precio: 4700 })} className="bg-white border-2 border-pink-100 p-4 rounded-2xl shadow-sm hover:border-pink-400 text-left flex justify-between items-center transition-all">
                  <div>
                    <h3 className="font-bold text-lg text-pink-600">Vaso Donatello (10)</h3>
                    <p className="text-sm text-gray-500">Ideal para ir comiendo.</p>
                    <p className="font-bold text-green-500 mt-1 text-lg">${4700}</p>
                  </div>
                  <span className="text-3xl">🥤</span>
                </button>

                {/* 4. DOCENA (12) */}
                <button onClick={() => elegirPaquete({ cantidad: 12, titulo: "La Docena", precio: 5000 })} className="bg-white border-2 border-pink-100 p-4 rounded-2xl shadow-sm hover:border-pink-400 text-left flex justify-between items-center transition-all">
                  <div>
                    <h3 className="font-bold text-lg text-pink-600">Docena (12)</h3>
                    <p className="text-sm text-gray-500">La clásica para llevar a casa.</p>
                    <p className="font-bold text-green-500 mt-1 text-lg">${5000}</p>
                  </div>
                  <span className="text-3xl">📦</span>
                </button>

                {/* 5. CAJA FIESTA (24) - ¡Cambia el 9500 por el precio real! */}
                <button onClick={() => elegirPaquete({ cantidad: 24, titulo: "Caja Fiesta", precio: 9500 })} className="bg-white border-2 border-pink-100 p-4 rounded-2xl shadow-sm hover:border-pink-400 text-left flex justify-between items-center transition-all">
                  <div>
                    <h3 className="font-bold text-lg text-pink-600">Caja Fiesta (24)</h3>
                    <p className="text-sm text-gray-500">Para compartir con todos.</p>
                    <p className="font-bold text-green-500 mt-1 text-lg">${9500}</p>
                  </div>
                  <span className="text-3xl">🎉</span>
                </button>

              </div>
            </div>
          )}

          {/* --- PASOS 2 Y 3 --- */}
          {paso === 2 && (
            <div>
              <button onClick={() => setPaso(1)} className="text-pink-500 font-bold mb-4 flex items-center gap-1 hover:text-pink-700">
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