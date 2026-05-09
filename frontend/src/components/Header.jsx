export default function Header() {
  return (
    // 1. Fijamos la altura de la cabecera (h-20 para celular, h-24 para PC) 
    // para que el fondo azul NO pueda seguir creciendo.
    <header className="w-full bg-[#04233f] h-20 sm:h-24 rounded-b-3xl mb-8 shadow-md flex justify-center items-center">
      
      <img 
        src="/logo.png" 
        alt="Donatello Logo" 
        // 2. Le metemos scale-150 (zoom del 150%) o scale-[1.7] para PC. 
        // Esto agranda las letras visualmente sin deformar la caja azul.
        className="w-56 sm:w-64 object-contain drop-shadow-md scale-150  sm:scale-[1.0] transition-transform" 
      />
      
    </header>
  );
}