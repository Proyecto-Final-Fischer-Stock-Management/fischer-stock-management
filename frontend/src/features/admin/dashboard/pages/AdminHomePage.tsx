import { Link } from "react-router-dom";
import { ButtonLink } from "../../../../components/ui/Button";

const rankingTabs = ["Mas vendido", "Mas quiebres", "Mas pedidos"];

const activity = [
  {
    name: "Juan Perez",
    detail: "Check In en sucursal Centro",
    time: "09:12 AM Hoy",
    status: "ok",
  },
  {
    name: "Pepa Gonzales",
    detail: "Check Out en sucursal Centro",
    time: "08:45 AM Hoy",
    status: "out",
  },
  {
    name: "Pedro Torres",
    detail: "Check Out en sucursal Centro",
    time: "08:30 AM Hoy",
    status: "out",
  },
  {
    name: "Camila Dominguez",
    detail: "Check In en sucursal Centro",
    time: "09:15 AM Hoy",
    status: "ok",
  },
];

export default function AdminHomePage() {
  return (
    <div className="min-h-screen bg-gray-200 px-4 py-6">
      <div className="mx-auto flex min-h-[calc(100vh-48px)] w-full max-w-sm flex-col bg-[#F4F4F4]">
        <div className="bg-white px-4 pt-5 pb-3">
          <img
            className="h-16 w-28 object-contain"
            src="/Logo Fischer  sin fondo.png"
            alt="Fischer"
          />
        </div>

        <div className="flex items-center border-y border-gray-200 bg-white px-1 py-2">
          <Link
            to="/admin"
            aria-label="Pantalla principal"
            className="flex h-8 w-10 items-center justify-center"
          />
          <div className="text-sm">Pantalla Principal - Admin</div>
        </div>

        <div className="flex flex-1 flex-col gap-4 px-4 py-4 text-sm">
          <div className="grid grid-cols-2 gap-3">
            <ButtonLink
              to="/admin/stock/create"
              variant="secondary"
              className="h-12 justify-between rounded-sm px-4 text-xs"
              fullWidth
            >
              Añadir stock <span className="text-xl leading-none">›</span>
            </ButtonLink>
            <ButtonLink
              to="/admin/accounts/create"
              variant="secondary"
              className="h-12 justify-between rounded-sm px-4 text-xs"
              fullWidth
            >
              Crear cuenta <span className="text-xl leading-none">›</span>
            </ButtonLink>
          </div>

          <section>
            <h2 className="mb-2 font-medium">Dashboard</h2>
            <div className="min-h-40 border border-gray-300 bg-white px-4 py-3 shadow-sm">
              <div className="mb-3">Ranking de productos</div>
              <div className="grid grid-cols-3 gap-2">
                {rankingTabs.map((tab, index) => (
                  <button
                    key={tab}
                    type="button"
                    className={[
                      "h-7 border text-[10px]",
                      index === 0
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 bg-white text-gray-800",
                    ].join(" ")}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 font-medium">Historial de actividad</h2>
            <div className="flex flex-col gap-3">
              {activity.map((item) => (
                <div
                  key={`${item.name}-${item.time}`}
                  className="flex items-center gap-3 border border-gray-300 bg-white px-4 py-3 shadow-sm"
                >
                  <div
                    className={[
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-sm",
                      item.status === "ok"
                        ? "border-green-500 text-green-600"
                        : "border-red-500 text-red-600",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    {item.status === "ok" ? "✓" : "−"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-medium">{item.name}</div>
                    <div className="truncate text-[11px]">{item.detail}</div>
                  </div>
                  <div className="shrink-0 text-[10px] text-gray-500">{item.time}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
