import { useState } from "react";

export default function MyInput() {
  const [texto, setTexto] = useState("");

  const manejarCambio = (evento) => {
    setTexto(evento.target.value);
  };

  return (
    <div>
      <label>
        Escribe algo:
        <input type="text" value={texto} onChange={manejarCambio} className="width-16"/>
      </label>
    </div>
  );
}
