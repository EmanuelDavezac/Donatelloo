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
    <div className="min-h-screen bg-[#fdfbf7] flex justify-center md:py-4">
      {/* Contenedor principal sin bordes raros, súper limpio */}
      <div className="w-full max-w-md bg-white min-h-screen md:min-h-[90vh] md:rounded-3xl shadow-2xl relative flex flex-col">
        
        <Header pasoActual={paso} />

        <main className="px-6 py-4 grow">
          
          {paso === 1 && (
            <div>
              <h2 className="text-xl font-bold text-[#04233f] mb-2 mt-2">
                Nuestras Cajas
              </h2>
              <p className="text-sm text-gray-500 mb-6">Armá tu caja a medida y elegí tus sabores favoritos.</p>
              
              {/* --- EL DISEÑO TIPO HAMA (Lista Limpia) --- */}
              <div className="flex flex-col">
                
                <button onClick={() => elegirPaquete({ cantidad: 3, titulo: "Brocheta", precio: 2000 })} className="flex items-center gap-4 py-4 border-b border-gray-100 w-full text-left bg-white hover:bg-gray-50 transition-colors active:bg-gray-100">
                  {/* Foto cuadrada con bordes redondeados */}
                  <img src="/brocheta.png" alt="Brocheta" className="w-20 h-20 rounded-2xl object-cover bg-gray-50 shadow-sm border border-gray-100" />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-[#04233f]">Brocheta (3)</h3>
                    <p className="text-sm text-gray-500 leading-tight mt-1">Un gustito rápido al paso.</p>
                    <p className="font-bold text-[#d99d8f] mt-2">${2000}</p>
                  </div>
                  {/* Flechita sutil a la derecha */}
                  <span className="text-gray-300 text-3xl font-light pr-2">›</span>
                </button>

                <button onClick={() => elegirPaquete({ cantidad: 6, titulo: "Media Docena", precio: 3000 })} className="flex items-center gap-4 py-4 border-b border-gray-100 w-full text-left bg-white hover:bg-gray-50 transition-colors active:bg-gray-100">
                  <img src="/media.png" alt="Media Docena" className="w-20 h-20 rounded-2xl object-cover bg-gray-50 shadow-sm border border-gray-100" />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-[#04233f]">Media Docena (6)</h3>
                    <p className="text-sm text-gray-500 leading-tight mt-1">Perfecta para el antojo.</p>
                    <p className="font-bold text-[#d99d8f] mt-2">${3000}</p>
                  </div>
                  <span className="text-gray-300 text-3xl font-light pr-2">›</span>
                </button>

                <button onClick={() => elegirPaquete({ cantidad: 10, titulo: "Vaso Donatello", precio: 4700 })} className="flex items-center gap-4 py-4 border-b border-gray-100 w-full text-left bg-white hover:bg-gray-50 transition-colors active:bg-gray-100">
                  <img src="/vaso.png" alt="Vaso Donatello" className="w-20 h-20 rounded-2xl object-cover bg-gray-50 shadow-sm border border-gray-100" />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-[#04233f]">Vaso Donatello (10)</h3>
                    <p className="text-sm text-gray-500 leading-tight mt-1">Ideal para ir comiendo.</p>
                    <p className="font-bold text-[#d99d8f] mt-2">${4700}</p>
                  </div>
                  <span className="text-gray-300 text-3xl font-light pr-2">›</span>
                </button>

                <button onClick={() => elegirPaquete({ cantidad: 12, titulo: "La Docena", precio: 5000 })} className="flex items-center gap-4 py-4 border-b border-gray-100 w-full text-left bg-white hover:bg-gray-50 transition-colors active:bg-gray-100">
                  <img src="/docena.png" alt="Docena" className="w-20 h-20 rounded-2xl object-cover bg-gray-50 shadow-sm border border-gray-100" />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-[#04233f]">La Docena (12)</h3>
                    <p className="text-sm text-gray-500 leading-tight mt-1">La clásica para llevar a casa.</p>
                    <p className="font-bold text-[#d99d8f] mt-2">${5000}</p>
                  </div>
                  <span className="text-gray-300 text-3xl font-light pr-2">›</span>
                </button>

                <button onClick={() => elegirPaquete({ cantidad: 24, titulo: "Caja Fiesta", precio: 9500 })} className="flex items-center gap-4 py-4 w-full text-left bg-white hover:bg-gray-50 transition-colors active:bg-gray-100">
                  <img src="/fiesta.png" alt="Caja Fiesta" className="w-20 h-20 rounded-2xl object-cover bg-gray-50 shadow-sm border border-gray-100" />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-[#04233f]">Caja Fiesta (24)</h3>
                    <p className="text-sm text-gray-500 leading-tight mt-1">Para compartir con todos.</p>
                    <p className="font-bold text-[#d99d8f] mt-2">${9500}</p>
                  </div>
                  <span className="text-gray-300 text-3xl font-light pr-2">›</span>
                </button>

              </div>
            </div>
          )}

          {paso === 2 && (
            <DonutBox 
              capacidad={paquete.cantidad} 
              titulo={paquete.titulo} 
              onFinalizar={finalizarCaja} 
              onVolver={() => setPaso(1)} 
            />
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