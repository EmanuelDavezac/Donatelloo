import { useState } from 'react';
import Swal from 'sweetalert2';

export default function Checkout({ paquete, saboresElegidos, onVolver }) {
  const [nombre, setNombre] = useState('');
  const [metodoEntrega, setMetodoEntrega] = useState('retiro');
  const [direccion, setDireccion] = useState('');

  const costoEnvio = 1500; 
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

    let texto = `🍩 *NUEVO PEDIDO - DONATELLO* 🍩\n\n`;
    texto += `*Nombre:* ${nombre}\n`;
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

    // 🚨 ACORDATE DE PONER TU NÚMERO DE WHATSAPP ACÁ
    const numeroWhatsApp = "5493496502191"; 
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;
    
    Swal.fire({
      title: '¡Pedido listo!',
      text: 'Te estamos redirigiendo a WhatsApp para confirmar...',
      icon: 'success',
      showConfirmButton: false,
      timer: 2000 
    }).then(() => {
      // ESTA ES LA LÍNEA MÁGICA PARA LOS CELULARES
      window.location.href = url;
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-[#d99d8f]/30">
      <button onClick={onVolver} className="text-[#d99d8f] font-bold mb-4 flex items-center gap-1 hover:text-[#b87c6e]">
        <span>❮</span> Volver a la caja
      </button>

      <h2 className="text-xl font-bold text-[#04233f] mb-6">Resumen de tu pedido</h2>
      
      <div className="bg-[#fdfbf7] p-4 rounded-xl mb-6">
        <p className="font-bold text-[#04233f]">{paquete.titulo} - ${paquete.precio}</p>
        <ul className="text-sm text-gray-600 mt-2">
          {listaFinalSabores.map((s, i) => (
            <li key={i}>• {s.cantidad}x {s.nombre}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-4 mb-6">
        <div>
          <label className="block text-sm font-bold text-[#04233f] mb-1">Tu Nombre</label>
          <input 
            type="text" 
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-[#d99d8f]"
            placeholder="Ej: Emanuel..."
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-[#04233f] mb-1">Método de entrega</label>
          <div className="flex gap-2">
            <button 
              onClick={() => setMetodoEntrega('retiro')}
              className={`flex-1 py-2 rounded-xl font-bold border-2 transition-all ${metodoEntrega === 'retiro' ? 'border-[#04233f] bg-[#04233f] text-white' : 'border-gray-200 text-gray-500'}`}
            >
              Retiro
            </button>
            <button 
              onClick={() => setMetodoEntrega('envio')}
              className={`flex-1 py-2 rounded-xl font-bold border-2 transition-all ${metodoEntrega === 'envio' ? 'border-[#04233f] bg-[#04233f] text-white' : 'border-gray-200 text-gray-500'}`}
            >
              Envío
            </button>
          </div>
        </div>

        {metodoEntrega === 'envio' && (
          <div className="animate-fade-in">
            <label className="block text-sm font-bold text-[#04233f] mb-1">Dirección</label>
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
        className="w-full bg-[#d99d8f] text-[#04233f] text-lg font-bold py-4 rounded-xl shadow-md hover:bg-[#c98d7f] transition-colors"
      >
        Enviar pedido por WhatsApp
      </button>
    </div>
  );
}