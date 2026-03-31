import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function Checkout({ paquete, saboresElegidos, onVolver }) {
  const [nombre, setNombre] = useState('');
  const [metodoEntrega, setMetodoEntrega] = useState('retiro');
  const [direccion, setDireccion] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState(null); 

  const costoEnvio = 2000;
  const total = paquete.precio + (metodoEntrega === 'envio' ? costoEnvio : 0);

  const saboresAgrupados = saboresElegidos.reduce((acc, sabor) => {
    const nombreSabor = typeof sabor === 'string' ? sabor : (sabor.nombre || 'Donut');
    acc[nombreSabor] = (acc[nombreSabor] || 0) + 1;
    return acc;
  }, {});

  const listaFinalSabores = Object.entries(saboresAgrupados).map(([nombre, cantidad]) => ({
    nombre,
    cantidad
  }));

  // --- CALCULADORA AUTOMÁTICA CON PLAN B ---
  const [feriados, setFeriados] = useState([]);

  useEffect(() => {
    const anioActual = new Date().getFullYear();
    
    // Llamamos a la API nueva
    fetch(`https://api.argentinadatos.com/v1/feriados/${anioActual}`)
      .then(respuesta => respuesta.json())
      .then(datos => {
        // La API nueva ya nos devuelve la fecha en formato YYYY-MM-DD
        const feriadosFormateados = datos.map(feriado => feriado.fecha);
        console.log("¡Éxito! La API nueva trajo estos feriados:", feriadosFormateados);
        setFeriados(feriadosFormateados);
      })
      .catch(error => {
        // EL PLAN B: Si la API falla, usamos esta lista de emergencia
        console.warn("La API falló. Usando feriados de respaldo para no perder ventas.");
        setFeriados([
          '2026-04-02', // Jueves Santo
          '2026-04-03', // Viernes Santo
          '2026-05-01', // Día del Trabajador
          '2026-05-25'  // Revolución de Mayo
        ]);
      });
  }, []); 

  const hoyReal = new Date();
  const diaSemana = hoyReal.getDay(); // 0 es Dom, 4 es Jue, 5 es Vie, 6 es Sab

  const anio = hoyReal.getFullYear();
  const mes = String(hoyReal.getMonth() + 1).padStart(2, '0');
  const dia = String(hoyReal.getDate()).padStart(2, '0');
  const hoyString = `${anio}-${mes}-${dia}`;

  const esFeriado = feriados.includes(hoyString);
  const esFinde = diaSemana === 0 || diaSemana === 5 || diaSemana === 6 || esFeriado;

  const diasDisponibles = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    const sumarDias = esFinde ? i : i + 1;
    d.setDate(d.getDate() + sumarDias);
    return d;
  });

  const esMismoDia = (fecha1, fecha2) => {
    if (!fecha1 || !fecha2) return false;
    return fecha1.toDateString() === fecha2.toDateString();
  };

  const enviarPedido = () => {
    if (!nombre.trim()) {
      Swal.fire({
        title: '¡Falta tu nombre!',
        text: 'Por favor, decinos cómo te llamás para anotar tu pedido.',
        icon: 'warning',
        confirmButtonColor: '#04233f',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    if (!fechaEntrega) {
      Swal.fire({
        title: '¡Falta la fecha!',
        text: 'Por favor, elegí un día para tus donitas.',
        icon: 'warning',
        confirmButtonColor: '#04233f',
        confirmButtonText: 'Entendido'
      });
      return;
    }
    
    if (metodoEntrega === 'envio' && !direccion.trim()) {
      Swal.fire({
        title: '¡Falta la dirección!',
        text: 'Necesitamos saber a dónde enviarte las mini donuts.',
        icon: 'warning',
        confirmButtonColor: '#04233f',
        confirmButtonText: 'Completar'
      });
      return;
    }

    const fechaFormateada = fechaEntrega.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' });

    let texto = `*NUEVO PEDIDO - DONATELLO*\n\n`;
    texto += `*Nombre:* ${nombre}\n`;
    texto += `*Día de entrega:* ${fechaFormateada}\n`;
    texto += `*Tamaño:* ${paquete.titulo} (${paquete.cantidad} un.)\n\n`;
    
    texto += `*Sabores elegidos:*\n`;
    listaFinalSabores.forEach(sabor => {
      texto += `- ${sabor.cantidad}x ${sabor.nombre}\n`;
    });

    texto += `\n*Entrega:* ${metodoEntrega === 'envio' ? 'Envío a domicilio' : 'Retiro por el local'}\n`;
    if (metodoEntrega === 'envio') {
      texto += `*Dirección:* ${direccion}\n`;
    }
    
    texto += `\n*TOTAL:* $${total}\n`;

    const numeroWhatsApp = "5493496502191"; 
    
    // Inyectamos la dona segura en la URL
    const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=%F0%9F%8D%A9%20${encodeURIComponent(texto)}`;
    
    Swal.fire({
      title: '¡Pedido listo!',
      text: 'Te estamos redirigiendo a WhatsApp para confirmar...',
      icon: 'success',
      showConfirmButton: false,
      timer: 2000 
    }).then(() => {
      window.location.href = url;
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-[#d99d8f]/30">
      
      <div className="relative z-50 -mt-2 -ml-2 mb-4">
        <button 
          onClick={(e) => {
            e.preventDefault(); 
            onVolver();
          }} 
          className="text-[#d99d8f] font-bold flex items-center gap-2 py-4 px-4 rounded-xl active:bg-orange-50 transition-colors w-full text-left"
        >
          <span className="text-2xl leading-none">❮</span> 
          <span className="text-lg">Volver a la caja</span>
        </button>
      </div>

      <h2 className="text-xl font-bold text-[#04233f] mb-6">Resumen de tu pedido</h2>
      
      <div className="bg-[#fdfbf7] p-4 rounded-xl mb-6">
        <p className="font-bold text-[#04233f]">{paquete.titulo} - ${paquete.precio}</p>
        <ul className="text-sm text-gray-600 mt-2">
          {listaFinalSabores.map((s, i) => (
            <li key={i}>• {s.cantidad}x {s.nombre}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-6 mb-8">
        <div>
          <label className="block text-sm font-bold text-[#04233f] mb-2">Tu Nombre</label>
          <input 
            type="text" 
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-[#d99d8f]"
            placeholder="Ej: Emanuel..."
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-[#04233f] mb-3">
            {esFinde ? "¿Para qué día querés tus Donitas?" : "¿Para qué día encargás tus Donitas?"}
          </label>
          
          <div className="flex gap-3 overflow-x-auto pb-4 snap-x">
            {diasDisponibles.map((fecha, i) => {
              const seleccionado = esMismoDia(fechaEntrega, fecha);
              const mananaReal = new Date();
              mananaReal.setDate(hoyReal.getDate() + 1);

              let nombreDia = fecha.toLocaleDateString('es-AR', { weekday: 'short' }).replace('.', '');
              if (esMismoDia(fecha, hoyReal)) nombreDia = 'Hoy';
              else if (esMismoDia(fecha, mananaReal)) nombreDia = 'Mañana';
              
              const numeroDia = fecha.getDate();
              const mes = fecha.toLocaleDateString('es-AR', { month: 'short' }).replace('.', '');

              return (
                <button
                  key={i}
                  onClick={() => setFechaEntrega(fecha)}
                  className={`flex flex-col items-center justify-center min-w-[76px] h-24 rounded-2xl border-2 transition-all snap-start shrink-0 ${
                    seleccionado 
                      ? 'border-[#04233f] bg-[#04233f] text-white shadow-lg scale-105' 
                      : 'border-gray-200 bg-white text-gray-500 hover:border-[#d99d8f] hover:bg-orange-50'
                  }`}
                >
                  <span className={`text-[11px] font-bold uppercase mb-1 tracking-wider ${seleccionado ? 'text-[#d99d8f]' : 'text-gray-400'}`}>
                    {nombreDia}
                  </span>
                  <span className="text-2xl font-black leading-none mb-1">{numeroDia}</span>
                  <span className="text-[10px] font-bold uppercase">{mes}</span>
                </button>
              );
            })}
          </div>
          {!esFinde && (
            <p className="text-xs text-[#d99d8f] font-semibold mt-1">
              *De Lunes a Viernes trabajamos únicamente por encargo previo.
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-[#04233f] mb-2">Método de entrega</label>
          <div className="flex gap-2">
            <button 
              onClick={() => setMetodoEntrega('retiro')}
              className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all active:scale-95 ${metodoEntrega === 'retiro' ? 'border-[#04233f] bg-[#04233f] text-white' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
            >
              Retiro
            </button>
            <button 
              onClick={() => setMetodoEntrega('envio')}
              className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all active:scale-95 ${metodoEntrega === 'envio' ? 'border-[#04233f] bg-[#04233f] text-white' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
            >
              Envío
            </button>
          </div>
        </div>

        {metodoEntrega === 'envio' && (
          <div className="animate-fade-in">
            <label className="block text-sm font-bold text-[#04233f] mb-2">Dirección (Esperanza)</label>
            <input 
              type="text" 
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-[#d99d8f]"
              placeholder="Ej: San Martín 1234..."
            />
            <p className="text-xs font-bold text-[#d99d8f] mt-1">+ Costo de envío: ${costoEnvio}</p>
          </div>
        )}
      </div>

      <div className="border-t-2 border-gray-100 pt-4 mb-6 flex justify-between items-center">
        <span className="font-bold text-gray-600">Total a pagar:</span>
        <span className="text-2xl font-bold text-green-600">${total}</span>
      </div>

      <button 
        onClick={enviarPedido}
        className="w-full bg-[#d99d8f] text-[#04233f] text-lg font-bold py-4 rounded-xl shadow-md hover:bg-[#c98d7f] active:scale-95 transition-all"
      >
        Enviar pedido por WhatsApp
      </button>
    </div>
  );
}