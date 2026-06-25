import type { InputHTMLAttributes } from "react";
import { useState, type ChangeEvent } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  fullWidth?: boolean;
  text: string;
  contenido: string;
};

const manejarCambio = (evento: ChangeEvent<HTMLInputElement>) => {
    setTexto(evento.target.value);

export default function Input({
  className = "",
  fullWidth = false,
  
  ...props
}: InputProps) {
  return (
    <div className="flex flex-row">
      {imagen && <img src={imagen} alt="" />}
      <label>{text}</label>
    <input
      className={[
        "px-4 py-2 border border-gray-300 shadow-sm text-gray-700 transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400",
        fullWidth ? "w-full" : "w-64",
        className,
        type="text"
        value={texto}
        onChange={manejarCambio}
        placeholder={contenido}
        className="text-center"
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
    </div>
  );
}
