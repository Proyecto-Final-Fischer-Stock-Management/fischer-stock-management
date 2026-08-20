import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../../../../components/ui/Button";
import { clearCart, loadCart } from "../cartStorage";

export default function OrderPage() {
  const { pathname } = useLocation();
  const [items, setItems] = useState(() => loadCart());
  const isRepositorRoute = pathname.startsWith("/repositor");
  const catalogPath = isRepositorRoute ? "/repositor/catalog" : "/admin/catalog";
  const totalBoxes = items.reduce((total, item) => total + item.boxes, 0);
  const orderDate = useMemo(
    () =>
      new Intl.DateTimeFormat("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      }).format(new Date()),
    [],
  );

  function handleSendByMail() {
    const productLines = items
      .map((item) => `${item.name} (${item.code}) - ${item.boxes} cajas`)
      .join("\n");
    const subject = encodeURIComponent("Pedido sugerido Fischer");
    const body = encodeURIComponent(productLines);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }

  function handleClearCart() {
    clearCart();
    setItems([]);
  }

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
            to={catalogPath}
            aria-label="Volver al catálogo"
            className="flex h-8 w-10 items-center justify-center"
          >
            <img className="h-4 w-4" src="/ep_arrow-left-bold.png" alt="" />
          </Link>
          <div className="text-sm">Pedido sugerido</div>
        </div>

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-4 text-sm">
          <section>
            <h2 className="mb-3 font-medium">Resumen del pedido</h2>
            <div className="border border-gray-300 bg-white p-3 leading-tight text-gray-500 shadow-sm">
              <div>Sucursal: Pendiente</div>
              <div>Fecha: {orderDate}</div>
              <div>Productos: {items.length}</div>
              <div>Cajas: {totalBoxes}</div>
            </div>
          </section>

          <div className="flex items-center gap-3 border border-blue-500 bg-blue-50 px-4 py-3 font-medium text-blue-700">
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-blue-600 text-xs">
              i
            </span>
            <span>Productos en el pedido</span>
          </div>

          <section className="flex min-h-0 flex-1 flex-col">
            <h2 className="mb-3 font-medium">Productos</h2>

            {items.length === 0 ? (
              <div className="border border-gray-300 bg-white p-4 text-gray-500 shadow-sm">
                Todavia no hay productos en el carrito.
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex w-full items-center gap-3 border border-gray-300 bg-white p-2 shadow-sm"
                  >
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white">
                      <img
                        src={item.imageSrc}
                        alt={item.name}
                        className="max-h-12 max-w-12 object-contain"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span>{item.name}</span>
                        <span className="bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                          {item.boxes} Cajas
                        </span>
                      </div>
                      <div className="mt-2 truncate">Código: {item.code}</div>
                    </div>

                    <span className="px-1 text-xl leading-none">›</span>
                  </div>
                ))}
              </div>
            )}
          </section>

          <div className="mt-auto flex flex-col gap-2">
            <Button
              variant="primary"
              fullWidth
              disabled={items.length === 0}
              onClick={handleSendByMail}
            >
              Enviar pedido por mail <span className="ml-auto">›</span>
            </Button>
            {items.length > 0 ? (
              <Button variant="ghost" fullWidth onClick={handleClearCart}>
                Vaciar carrito
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
