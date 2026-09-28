import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/ui/Button";
import { saveLastCheckIn } from "../checkinStorage";

const visitDate = "20/05/26";
const visitTime = "09:41 AM";

const chains = ["Easy", "Sodimac", "Carrefour", "Coto"];
const branches = ["Easy Vicente Lopez", "Sucursal Centro", "Sucursal Norte"];
const sectors = ["Ferreteria", "Herramientas", "Construccion"];

type SelectFieldProps = {
  label: string;
  icon: string;
  value: string;
  placeholder: string;
  options: string[];
  onChange: (value: string) => void;
};

function SelectField({
  label,
  icon,
  value,
  placeholder,
  options,
  onChange,
}: SelectFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-base">{label}</span>
      <div className="relative">
        <span className="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-2xl text-red-600">
          {icon}
        </span>
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-12 w-full appearance-none rounded-sm border border-gray-300 bg-white pr-12 pl-16 text-base text-gray-700 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute top-1/2 right-5 -translate-y-1/2 text-2xl leading-none text-gray-500">
          ˅
        </span>
      </div>
    </label>
  );
}

export default function CheckInPage() {
  const navigate = useNavigate();
  const [chain, setChain] = useState("");
  const [branch, setBranch] = useState("");
  const [sector, setSector] = useState("");
  const canStartVisit = Boolean(chain && branch && sector);

  function handleStartVisit() {
    saveLastCheckIn({
      date: visitDate,
      time: visitTime,
      chain,
      branch,
      sector,
    });
    navigate("/repositor", { replace: true });
  }

  return (
    <div className="min-h-screen bg-gray-200 px-4 py-6">
      <div className="mx-auto flex min-h-[calc(100vh-48px)] w-full max-w-sm flex-col bg-[#F4F4F4]">
        <div className="bg-red-600 px-6 pt-7 pb-6 text-white">
          <div className="flex items-center justify-between text-sm text-black">
            <span>9:41</span>
            <span className="text-xs">▮▮▮ ᯤ ▭</span>
          </div>
          <img className="mt-4 h-8 w-28 object-contain" src="/fischerLog.png" alt="Fischer" />
        </div>

        <main className="flex flex-1 flex-col px-6 py-12 text-black">
          <h1 className="text-center text-3xl">Check In</h1>

          <div className="mt-8">
            <div className="mb-2 text-base">Fecha y hora</div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex h-10 items-center gap-3 rounded-sm border border-gray-300 bg-white px-4 text-base shadow-sm">
                <span className="text-xl">▣</span>
                <span>{visitDate}</span>
              </div>
              <div className="flex h-10 items-center gap-3 rounded-sm border border-gray-300 bg-white px-4 text-base shadow-sm">
                <span className="text-xl">◷</span>
                <span>{visitTime}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-4">
            <SelectField
              label="Cadena"
              icon="▦"
              value={chain}
              placeholder="Selecciona una cadena"
              options={chains}
              onChange={setChain}
            />
            <SelectField
              label="Sucursal"
              icon="⌖"
              value={branch}
              placeholder="Selecciona una sucursal"
              options={branches}
              onChange={setBranch}
            />
            <SelectField
              label="Sector"
              icon="⌾"
              value={sector}
              placeholder="Selecciona un sector"
              options={sectors}
              onChange={setSector}
            />
          </div>

          <div className="mt-7 flex items-center gap-4 rounded-sm border border-red-500 bg-red-50 px-4 py-3 text-red-600">
            <span className="text-2xl">○</span>
            <div className="text-sm leading-tight">
              <div className="font-semibold">Recuerda</div>
              <div>Realiza el Check out al finalizar tu visita</div>
            </div>
          </div>

          <Button
            variant="primary"
            fullWidth
            className="mt-8 h-12 justify-between rounded-sm font-semibold"
            disabled={!canStartVisit}
            onClick={handleStartVisit}
          >
            <span className="flex-1 text-center">Iniciar visita</span>
            <span>→</span>
          </Button>
        </main>
      </div>
    </div>
  );
}
