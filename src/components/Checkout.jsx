import { useState } from 'react';

export default function Checkout({ paquete, saboresElegidos, onVolver }) {
  // 1. ESTADO: La memoria del formulario
  const [datos, setDatos] = useState({
    nombre: '',
    telefono: '',
    entrega: 'Retiro por el local',
    direccion: ''
  });

  // Diccionario para traducir los códigos a texto lindo para el mensaje
  const nombresSabores = {
    blanco: 'Choco Blanco', negro: 'Choco Negro', azucarada: 'Azucarada',
    blanco_oreo: 'Oreo en Blanco', negro_oreo: 'Oreo en Negro',
    blanco_rocklets: 'Rocklets Blanco', negro_rocklets: 'Rocklets Negro',
    blanco_crocante: 'Crocante Blanco', negro_crocante: 'Crocante Negro',
    blanco_coco: 'Coco en Blanco', marmolado: 'Marmolado'
  };

  // 2. FUNCIÓN: Actualiza la memoria cada vez que el cliente teclea algo
  const manejarCambio = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    });
  };

  // 3. LA MAGIA: Arma el texto y abre WhatsApp
  const enviarPedido = () => {
    // Pequeña validación
    if (datos.nombre.trim() === '') {
      alert("¡Por favor ingresá tu nombre para poder anotar el pedido!");
      return;
    }

    // Convertimos la lista de IDs a nombres legibles separados por coma
    const saboresTexto = saboresElegidos.map(id => nombresSabores[id]).join(', ');

    // Armamos la plantilla del mensaje con negritas de WhatsApp (*)
    const mensaje = `🍩 *¡NUEVO PEDIDO DONATELLO!* 🍩

📦 *Paquete:* ${paquete.titulo} (${paquete.cantidad} un.)
💲 *Total a pagar: $${paquete.precio}*
🎨 *Sabores:* ${saboresTexto}

👤 *Cliente:* ${datos.nombre}
📱 *Celular:* ${datos.telefono}
🛵 *Entrega:* ${datos.entrega}
${datos.entrega === 'Envío a domicilio' ? `📍 *Dirección:* ${datos.direccion}` : ''}

¡Muchas gracias!`;

    // 🚨 PON AQUÍ TU NÚMERO DE TELÉFONO REAL 🚨
    // Debe empezar con 54 9 (código de Argentina y celulares) seguido de tu código de área sin el 0 y tu número sin el 15.
    const numeroWhatsApp = "5493496502191"; 
    
    // Codificamos el texto para que la URL entienda los espacios y emojis
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    
    // Abrimos la app de WhatsApp
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col gap-6">
      
      <button onClick={onVolver} className="text-pink-500 font-bold flex items-center gap-1 hover:text-pink-700 w-fit">
        <span>❮</span> Volver a la caja
      </button>

      {/* Resumen del Pedido */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
          Resumen de tu pedido 📝
        </h2>
        
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold text-gray-600">{paquete.titulo} ({paquete.cantidad})</span>
          {/* Aquí inyectamos el precio dinámico */}
          <span className="font-bold text-green-600 text-lg">${paquete.precio}</span>
        </div>

        <div className="bg-pink-50 p-3 rounded-xl">
          <p className="text-sm text-gray-600 font-semibold mb-2">Tus sabores:</p>
          <div className="flex flex-wrap gap-2">
            {saboresElegidos.map((saborId, index) => (
              <span key={index} className="bg-white px-2 py-1 rounded-md text-xs border border-pink-100 text-gray-500 font-bold">
                {nombresSabores[saborId]}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Formulario de Datos */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-20">
        <h3 className="font-bold text-gray-800 mb-4">Tus Datos para la entrega</h3>
        
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Nombre y Apellido</label>
            <input 
              type="text" 
              name="nombre" 
              value={datos.nombre} 
              onChange={manejarCambio} 
              placeholder="Ej: Juan Pérez" 
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl bg-gray-50 outline-none focus:border-pink-400" 
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">WhatsApp</label>
            <input 
              type="tel" 
              name="telefono" 
              value={datos.telefono} 
              onChange={manejarCambio} 
              placeholder="Ej: 3496 123456" 
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl bg-gray-50 outline-none focus:border-pink-400" 
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">¿Cómo lo recibís?</label>
            <select 
              name="entrega" 
              value={datos.entrega} 
              onChange={manejarCambio} 
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl bg-gray-50 outline-none focus:border-pink-400 text-gray-700 font-bold"
            >
              <option value="Retiro por el local">Retiro por el local</option>
              <option value="Envío a domicilio">Envío a domicilio</option>
            </select>
          </div>

          {/* El campo de dirección solo aparece si elige Envío a domicilio */}
          {datos.entrega === 'Envío a domicilio' && (
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Dirección (Solo Esperanza)</label>
              <input 
                type="text" 
                name="direccion" 
                value={datos.direccion} 
                onChange={manejarCambio} 
                placeholder="Calle y altura (Ej: Sarmiento 1234)" 
                className="w-full mt-1 p-3 border border-gray-200 rounded-xl bg-gray-50 outline-none focus:border-pink-400" 
              />
            </div>
          )}
        </div>
      </div>

      {/* Botón Final */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent">
        <button 
          onClick={enviarPedido} 
          className="w-full py-4 rounded-2xl font-bold text-lg text-white bg-green-500 hover:bg-green-600 shadow-xl flex justify-center items-center gap-2 transition-transform active:scale-95"
        >
          <span>Pedir por WhatsApp</span>
          <span className="text-2xl">💬</span>
        </button>
      </div>

    </div>
  );
}