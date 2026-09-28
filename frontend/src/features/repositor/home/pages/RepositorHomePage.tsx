import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/ui/Button";
import { useAuth } from "../../../../hooks/useAuth";
import { loadLastCheckIn, type RepositorCheckIn } from "../../checkin/checkinStorage";

export default function RepositorHomePage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [lastCheckIn] = useState<RepositorCheckIn | null>(() => loadLastCheckIn());

  useEffect(() => {
    if (!lastCheckIn) {
      navigate("/repositor/check-in", { replace: true });
    }
  }, [lastCheckIn, navigate]);

  if (!lastCheckIn) {
    return null;
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

        <div className="border-b border-gray-300 bg-white px-7 py-4 text-center text-sm">
          Pantalla principal - repositor
        </div>

        <main className="flex flex-1 flex-col px-6 py-6 text-sm text-black">
          <div>Bienvenido de nuevo</div>

          <section className="mt-6 overflow-hidden rounded-sm border border-gray-300 bg-white shadow-sm">
            <div className="border-b border-gray-300 px-4 py-4 text-center">
              Ultimo Check in
            </div>
            <div className="border-b border-gray-300 px-4 py-5 text-center">
              Sucursal: {lastCheckIn.branch}
            </div>
            <div className="border-b border-gray-300 px-4 py-5 text-center">
              Cadena: {lastCheckIn.chain}
            </div>
            <div className="px-4 py-5 text-center">Sector: {lastCheckIn.sector}</div>
          </section>

          <div className="mt-7 flex flex-col gap-4">
            <button
              type="button"
              onClick={() => navigate("/repositor/check-in")}
              className="flex h-15 items-center gap-7 rounded-sm border border-gray-300 bg-white px-5 text-left shadow-sm transition-colors hover:bg-gray-50"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100 text-2xl text-black">
                ↪
              </span>
              <span>Check Out</span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/repositor/catalog")}
              className="flex h-15 items-center gap-7 rounded-sm border border-gray-300 bg-white px-5 text-left shadow-sm transition-colors hover:bg-gray-50"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100 text-2xl text-black">
                ⌕
              </span>
              <span>Buscar producto</span>
            </button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="mt-auto self-center text-gray-500"
            onClick={logout}
          >
            Log out
          </Button>
        </main>
      </div>
    </div>
  );
}
