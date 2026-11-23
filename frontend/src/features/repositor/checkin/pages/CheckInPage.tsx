import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/ui/Button";
import { saveLastCheckIn } from "../checkinStorage";
import { useAuth } from "../../../../hooks/useAuth";
import {
  PushCheckIn,
  GetCheckInInfo,
  type CheckInPlace,
} from "../services/checkinsApi";

type SelectOption = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  label: string;
  icon: string;
  value: string;
  placeholder: string;
  options: SelectOption[];
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
            <option key={option.value} value={option.value}>
              {option.label}
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
  const { token } = useAuth();

  const [places, setPlaces] = useState<CheckInPlace[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [chain, setChain] = useState("");
  const [branch, setBranch] = useState("");
  const [sector, setSector] = useState("");

  useEffect(() => {
    if (!token) {
      setError("No hay una sesión activa.");
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    async function loadPlaces() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await GetCheckInInfo(token);

        if (!cancelled) {
          setPlaces(response);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Error obteniendo información del check-in:", err);
          setError("No se pudo cargar la información de los locales.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadPlaces();

    return () => {
      cancelled = true;
    };
  }, [token]);

  const chains = useMemo(() => {
    return Array.from(
      new Map(
        places.map((place) => [place.franchise.id, place.franchise]),
      ).values(),
    );
  }, [places]);

  const branches = useMemo(() => {
    return Array.from(
      new Map(
        places
          .filter((place) => String(place.franchise.id) === chain)
          .map((place) => [place.branch.id, place.branch]),
      ).values(),
    );
  }, [places, chain]);

  const sectors = places.filter((place) => String(place.branch.id) === branch);

  const canStartVisit = Boolean(chain && branch && sector);

  const ahora: Date = new Date();

  const visitDate: string = ahora.toLocaleDateString("es-AR");
  const visitTime: string = ahora.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  function handleStartVisit() {
    const selectedChain = chains.find((item) => String(item.id) === chain);

    const selectedBranch = branches.find((item) => String(item.id) === branch);

    const selectedSector = sectors.find(
      (item) => String(item.sectorId) === sector,
    );

    if (!selectedChain || !selectedBranch || !selectedSector) {
      return;
    }

    saveLastCheckIn({
      date: visitDate,
      time: visitTime,
      chain: selectedChain.name,
      branch: selectedBranch.direction,
      sector: selectedSector.sector,
    });

    PushCheckIn(token, Number(selectedChain.id));

    navigate("/repositor", { replace: true });
  }

  return (
    <div className="min-h-screen bg-gray-200 px-4 py-6">
      <div className="mx-auto flex min-h-[calc(100vh-48px)] w-full max-w-sm flex-col bg-[#F4F4F4]">
        <div className="bg-red-600 px-5 pt-10 pb-5 text-white">
          <img
            className="h-6 w-18 object-contain"
            src="/fischerLog.png"
            alt="Fischer"
          />
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
            {isLoading && (
              <p className="text-sm text-gray-500">
                Cargando cadenas, sucursales y sectores...
              </p>
            )}

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex flex-col gap-4">
              <SelectField
                label="Cadena"
                icon="▦"
                value={chain}
                placeholder="Selecciona una cadena"
                options={chains.map((item) => ({
                  value: String(item.id),
                  label: item.name,
                }))}
                onChange={(value) => {
                  setChain(value);
                  setBranch("");
                  setSector("");
                }}
              />

              <SelectField
                label="Sucursal"
                icon="⌖"
                value={branch}
                placeholder="Selecciona una sucursal"
                options={branches.map((item) => ({
                  value: String(item.id),
                  label: item.direction,
                }))}
                onChange={(value) => {
                  setBranch(value);
                  setSector("");
                }}
              />

              <SelectField
                label="Sector"
                icon="⌾"
                value={sector}
                placeholder="Selecciona un sector"
                options={sectors.map((item) => ({
                  value: String(item.sectorId),
                  label: item.sector,
                }))}
                onChange={setSector}
              />
            </div>
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
            <span className="flex-1 text-center">Iniciar recorrido</span>
            <span>→</span>
          </Button>
        </main>
      </div>
    </div>
  );
}
