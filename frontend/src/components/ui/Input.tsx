import { useState } from "react";

export default function MyInput() {
  const [texto, setTexto] = useState("");

  const manejarCambio = (evento) => {
    setTexto(evento.target.value);
  };

  return (
    <div>
      <label>
        <input type="text" value={texto} onChange={manejarCambio} className=" text-center w-46 px-4 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 transition-colors"/>
      </label>
    </div>
  );
}
