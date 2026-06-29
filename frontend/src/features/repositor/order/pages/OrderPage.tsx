import { Link } from "react-router-dom";

export default function OrderPage() {
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
            to="/admin/catalog"
            aria-label="Volver al catálogo"
            className="flex h-8 w-10 items-center justify-center"
          >
            <img className="h-4 w-4" src="/ep_arrow-left-bold.png" alt="" />
          </Link>
          <div className="text-sm">Pedido sugerido</div>
        </div>

        <div className="px-4 py-4 text-sm">
          <div className="bg-white p-4 shadow-sm">
            Todavía no hay productos en el carrito.
          </div>
        </div>
      </div>
    </div>
  );
}
