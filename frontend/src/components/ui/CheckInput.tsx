import { useState } from "react";

type Props = {
  text: String;
  contenido: string;
  imagen?: string;
};

function ChInput(props: Props) {
  const { text, contenido, imagen } = props;
  // 1. Creamos el estado para guardar el valor
  const [texto, setTexto] = useState("");

  // 2. Función que se ejecuta cada vez que el usuario escribe
  const manejarCambio = (evento) => {
    setTexto(evento.target.value);
  };

  return (
    <div className="flex flex-row">
      <img src={imagen}></img>
      <label> {text} </label>
      <input
        type="text"
        value={texto}
        onChange={manejarCambio}
        placeholder={contenido}
      />
    </div>
  );
}

export default ChInput;
