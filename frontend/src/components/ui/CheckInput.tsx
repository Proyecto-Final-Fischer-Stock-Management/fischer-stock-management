import { useState, type ChangeEvent } from "react";

type Props = {
  text: string;
  contenido: string;
  imagen?: string;
};

function ChInput({ text, contenido, imagen }: Props) {
  const [texto, setTexto] = useState("");

  const manejarCambio = (evento: ChangeEvent<HTMLInputElement>) => {
    setTexto(evento.target.value);
  };

  return (
    <div className="flex flex-row">
      {imagen && <img src={imagen} alt="" />}
      <label>{text}</label>
      <input
        type="text"
        value={texto}
        onChange={manejarCambio}
        placeholder={contenido}
        className="text-center"
      />
    </div>
  );
}

export default ChInput;
