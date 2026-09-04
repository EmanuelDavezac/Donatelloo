import { useState } from 'react';
import Swal from 'sweetalert2';
import Header from './components/Header';
import DonutBox from './components/DonutBox';
import Checkout from './components/Checkout';

function App() {
  const [paso, setPaso] = useState(1);
  const [paquete, setPaquete] = useState(null);
  const [tipoTab, setTipoTab] = useState('dulces');
  const [pedidos, setPedidos] = useState([]);

  const agregarAlCarrito = (paqueteActual, saboresActuales) => {
    setPedidos((actual) => [...actual, { paquete: paqueteActual, sabores: saboresActuales }]);

    Swal.fire({
      title: '¡Caja agregada!',
      text: '¿Querés agregar otra caja o finalizar tu pedido?',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Finalizar pedido',
      cancelButtonText: 'Agregar otra caja',
      confirmButtonColor: '#04233f',
      cancelButtonColor: '#d99d8f'
    }).then((resultado) => {
      setPaso(resultado.isConfirmed ? 3 : 1);
    });
  };

  const elegirPaquete = (seleccion) => {
    if (seleccion.tipo === 'salada') {
      const cajaArmada = Array(seleccion.cantidad).fill({
        id: 'jamon-y-queso',
        nombre: 'Jamón y Queso',
        img: '/logo.png'
      });
      agregarAlCarrito(seleccion, cajaArmada);
      return;
    }
    setPaquete(seleccion);
    setPaso(2);
  };

  const finalizarCaja = (cajaArmada) => {
    agregarAlCarrito(paquete, cajaArmada);
  };

  const quitarPedido = (index) => {
    setPedidos((actual) => actual.filter((_, i) => i !== index));
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

              {pedidos.length > 0 && (
                <button
                  onClick={() => setPaso(3)}
                  className="w-full flex items-center justify-between bg-[#04233f] text-white rounded-xl px-4 py-3 mb-6 shadow-md active:scale-95 transition-transform"
                >
                  <span className="font-bold text-sm">
                    🛒 {pedidos.length} {pedidos.length === 1 ? 'caja' : 'cajas'} en el carrito
                  </span>
                  <span className="text-[#d99d8f] font-bold text-sm">Ver pedido ›</span>
                </button>
              )}

              {/* Tabs para Dulces y Saladas */}
              <div className="flex bg-gray-100 rounded-xl p-1 mb-6 mt-2">
                <button
                  onClick={() => setTipoTab('dulces')}
                  className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${tipoTab === 'dulces' ? 'bg-white text-[#04233f] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  🍩 Dulces
                </button>
                <button
                  onClick={() => setTipoTab('saladas')}
                  className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${tipoTab === 'saladas' ? 'bg-white text-[#04233f] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  🧀 Saladas
                </button>
              </div>

              {/* --- EL DISEÑO TIPO HAMA (Lista Limpia) --- */}
              <div className="flex flex-col">

                {tipoTab === 'dulces' ? (
                  <>
                    <button onClick={() => elegirPaquete({ cantidad: 4, titulo: "Brocheta", precio: 2500 })} className="flex items-center gap-4 py-4 border-b border-gray-100 w-full text-left bg-white hover:bg-gray-50 transition-colors active:bg-gray-100">
                      {/* Foto cuadrada con bordes redondeados */}
                      <img src="/brocheta.png" alt="Brocheta" className="w-20 h-20 rounded-2xl object-cover bg-gray-50 shadow-sm border border-gray-100" />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-[#04233f]">Brocheta (4)</h3>
                        <p className="text-sm text-gray-500 leading-tight mt-1">Un gustito rápido al paso.</p>
                        <p className="font-bold text-[#d99d8f] mt-2">${2500}</p>
                      </div>
                      {/* Flechita sutil a la derecha */}
                      <span className="text-gray-300 text-3xl font-light pr-2">›</span>
                    </button>

                    {/* <button onClick={() => elegirPaquete({ cantidad: 6, titulo: "Media Docena", precio: 3000 })} className="flex items-center gap-4 py-4 border-b border-gray-100 w-full text-left bg-white hover:bg-gray-50 transition-colors active:bg-gray-100">
                  <img src="/media.png" alt="Media Docena" className="w-20 h-20 rounded-2xl object-cover bg-gray-50 shadow-sm border border-gray-100" />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-[#04233f]">Media Docena (6)</h3>
                    <p className="text-sm text-gray-500 leading-tight mt-1">Perfecta para el antojo.</p>
                    <p className="font-bold text-[#d99d8f] mt-2">${3000}</p>
                  </div>
                  <span className="text-gray-300 text-3xl font-light pr-2">›</span>
                </button> */}

                    <button onClick={() => elegirPaquete({ cantidad: 10, titulo: "Vaso Donatello", precio: 4300 })} className="flex items-center gap-4 py-4 border-b border-gray-100 w-full text-left bg-white hover:bg-gray-50 transition-colors active:bg-gray-100">
                      <img src="/vaso.png" alt="Vaso Donatello" className="w-20 h-20 rounded-2xl object-cover bg-gray-50 shadow-sm border border-gray-100" />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-[#04233f]">Vaso Donatello (10)</h3>
                        <p className="text-sm text-gray-500 leading-tight mt-1">Ideal para ir comiendo.</p>
                        <p className="font-bold text-[#d99d8f] mt-2">${4300}</p>
                      </div>
                      <span className="text-gray-300 text-3xl font-light pr-2">›</span>
                    </button>

                    <button onClick={() => elegirPaquete({ cantidad: 12, titulo: "La Docena", precio: 4800 })} className="flex items-center gap-4 py-4 border-b border-gray-100 w-full text-left bg-white hover:bg-gray-50 transition-colors active:bg-gray-100">
                      <img src="/docena.png" alt="Docena" className="w-20 h-20 rounded-2xl object-cover bg-gray-50 shadow-sm border border-gray-100" />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-[#04233f]">La Docena (12)</h3>
                        <p className="text-sm text-gray-500 leading-tight mt-1">La clásica para llevar a casa.</p>
                        <p className="font-bold text-[#d99d8f] mt-2">${4800}</p>
                      </div>
                      <span className="text-gray-300 text-3xl font-light pr-2">›</span>
                    </button>

                    <button onClick={() => elegirPaquete({ cantidad: 24, titulo: "Caja Fiesta", precio: 9000 })} className="flex items-center gap-4 py-4 w-full text-left bg-white hover:bg-gray-50 transition-colors active:bg-gray-100">
                      <img src="/fiesta.png" alt="Caja Fiesta" className="w-20 h-20 rounded-2xl object-cover bg-gray-50 shadow-sm border border-gray-100" />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-[#04233f]">Caja Fiesta (24)</h3>
                        <p className="text-sm text-gray-500 leading-tight mt-1">Para compartir con todos.</p>
                        <p className="font-bold text-[#d99d8f] mt-2">${9000}</p>
                      </div>
                      <span className="text-gray-300 text-3xl font-light pr-2">›</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => elegirPaquete({ cantidad: 16, titulo: "Caja Salada", precio: 5800, tipo: 'salada' })} className="flex items-center gap-4 py-4 border-b border-gray-100 w-full text-left bg-white hover:bg-gray-50 transition-colors active:bg-gray-100">
                      <img src="/jamonYqueso.png" alt="Caja Salada" className="w-20 h-20 rounded-2xl object-cover bg-gray-50 shadow-sm border border-gray-100" />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-[#04233f]">Caja Salada (16)</h3>
                        <p className="text-sm text-gray-500 leading-tight mt-1">16 mini donitas de Jamón y Queso.</p>
                        <p className="font-bold text-[#d99d8f] mt-2">${5800}</p>
                      </div>
                      <span className="text-gray-300 text-3xl font-light pr-2">›</span>
                    </button>
                  </>
                )}

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
            <Checkout
              pedidos={pedidos}
              onQuitarPedido={quitarPedido}
              onAgregarOtra={() => setPaso(1)}
            />
          )}

        </main>
      </div>
    </div>
  );
}

export default App;